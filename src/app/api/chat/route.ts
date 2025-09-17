import { NextRequest, NextResponse } from 'next/server'
import { ChatMessage } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const { messages }: { messages: ChatMessage[] } = await request.json()

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: '消息不能为空' },
        { status: 400 }
      )
    }

    const response = await fetch(`${process.env.OPENAI_API_BASE_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        max_tokens: 1000,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('OpenAI API error:', errorData)
      return NextResponse.json(
        { error: 'AI服务暂时不可用，请稍后重试' },
        { status: 500 }
      )
    }

    const data = await response.json()
    const aiMessage = data.choices[0]?.message?.content || '抱歉，我无法生成回复'

    return NextResponse.json({
      message: aiMessage
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    )
  }
}
import { NextRequest, NextResponse } from 'next/server'
import { ChatMessage } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const { messages }: { messages: ChatMessage[] } = await request.json()

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: '消息不能为空' }, { status: 400 })
    }

    const response = await fetch(`${process.env.OPENAI_API_BASE_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gemini-2.5-pro',
        messages: messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        max_tokens: 10000,
        temperature: 0.7,
      }),
    })
    console.info('response status:', response.status)
    if (!response.ok) {
      const errorData = await response.text()
      console.error('API error:', errorData)
      
      // 处理不同的错误状态码
      if (response.status === 503) {
        return NextResponse.json({ error: '模型当前过载，请稍后重试' }, { status: 503 })
      } else if (response.status === 429) {
        return NextResponse.json({ error: '请求过于频繁，请稍后重试' }, { status: 429 })
      } else if (response.status === 401) {
        return NextResponse.json({ error: 'API密钥无效' }, { status: 401 })
      } else {
        return NextResponse.json({ error: 'AI服务暂时不可用，请稍后重试' }, { status: 500 })
      }
    }

    const data = await response.json()
    console.log('API response data:', JSON.stringify(data, null, 2))

    // 检查不同的响应格式
    let aiMessage = '抱歉，我无法生成回复'

    if (data.choices && data.choices[0]?.message?.content) {
      // OpenAI格式
      aiMessage = data.choices[0].message.content
    } else if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      // Gemini格式
      aiMessage = data.candidates[0].content.parts[0].text
    } else if (data.content) {
      // 其他可能的格式
      aiMessage = data.content
    } else if (data.text) {
      aiMessage = data.text
    }

    console.log('Extracted message:', aiMessage)

    return NextResponse.json({
      message: aiMessage,
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json({ error: '服务器内部错误' }, { status: 500 })
  }
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp?: Date
}

export interface ChatResponse {
  message: string
  error?: string
}

export async function sendChatMessage(messages: ChatMessage[]): Promise<ChatResponse> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Chat API error:', error)
    return {
      message: '',
      error: '发送消息失败，请稍后重试'
    }
  }
}
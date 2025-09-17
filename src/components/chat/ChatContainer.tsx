'use client'

import { useState, useRef, useEffect } from 'react'
import { ChatMessage } from './ChatMessage'
import { ChatInput } from './ChatInput'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChatMessage as ChatMessageType, sendChatMessage } from '@/lib/openai'

interface ChatContainerProps {
  userAvatar?: string
}

export function ChatContainer({ userAvatar }: ChatContainerProps) {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      role: 'assistant',
      content: '您好！我是AI助手，有什么可以帮助您的吗？'
    }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // 自动滚动到底部
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  const handleSendMessage = async (content: string) => {
    const userMessage: ChatMessageType = {
      role: 'user',
      content,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await sendChatMessage([...messages, userMessage])
      
      if (response.error) {
        const errorMessage: ChatMessageType = {
          role: 'assistant',
          content: response.error,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, errorMessage])
      } else {
        const aiMessage: ChatMessageType = {
          role: 'assistant',
          content: response.message,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, aiMessage])
      }
    } catch (error) {
      const errorMessage: ChatMessageType = {
        role: 'assistant',
        content: '抱歉，发生了错误，请稍后重试。',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message}
              userAvatar={userAvatar}
            />
          ))}
          {isLoading && (
            <div className="flex gap-3 p-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </div>
              <div className="bg-gray-100 p-3 rounded-lg rounded-bl-sm">
                <p className="text-gray-600">AI正在思考中...</p>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
    </div>
  )
}
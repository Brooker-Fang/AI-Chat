'use client'

import { useState, useEffect } from 'react'
import { ChatMessage as ChatMessageType } from '@/lib/openai'

interface ChatMessageProps {
  message: ChatMessageType
}

export function ChatMessage({ message }: ChatMessageProps) {
  const [, setMounted] = useState(false)
  const isUser = message.role === 'user'

  useEffect(() => {
    setMounted(true)
  }, [])

  if (isUser) {
    return (
      <div className="flex items-start gap-2 mb-3 justify-end">
        {/* Message Bubble */}
        <div className="max-w-xs">
          <div className="relative bg-blue-500 text-white px-4 py-2.5 rounded-2xl">
            {/* 尖角指向头像 */}
            <div className="absolute -right-1 top-2 w-0 h-0 border-l-8 border-l-blue-500 border-t-8 border-t-transparent border-b-8 border-b-transparent"></div>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          </div>
        </div>
        {/* Avatar Label */}
        <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
          你
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-start gap-2 mb-3">
      {/* Avatar Label */}
      <div className="w-6 h-6 rounded-full bg-gray-400 text-white flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
        AI
      </div>
      {/* Message Bubble */}
      <div className="max-w-xs">
        <div className="relative bg-gray-100 text-gray-800 px-4 py-2.5 rounded-2xl">
          {/* 尖角指向头像 */}
          <div className="absolute -left-1 top-2 w-0 h-0 border-r-8 border-r-gray-100 border-t-8 border-t-transparent border-b-8 border-b-transparent"></div>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    </div>
  )
}

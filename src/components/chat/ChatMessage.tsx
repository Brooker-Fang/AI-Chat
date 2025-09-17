'use client'

import { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ChatMessage as ChatMessageType } from '@/lib/openai'
import { User, Bot } from 'lucide-react'

interface ChatMessageProps {
  message: ChatMessageType
  userAvatar?: string
}

export function ChatMessage({ message, userAvatar }: ChatMessageProps) {
  const [mounted, setMounted] = useState(false)
  const isUser = message.role === 'user'

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className={`flex gap-3 p-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <Avatar className="w-8 h-8">
        {isUser ? (
          <>
            <AvatarImage src={userAvatar} />
            <AvatarFallback>
              <User className="w-4 h-4" />
            </AvatarFallback>
          </>
        ) : (
          <AvatarFallback className="bg-blue-500 text-white">
            <Bot className="w-4 h-4" />
          </AvatarFallback>
        )}
      </Avatar>
      
      <div className={`max-w-[70%] ${isUser ? 'text-right' : 'text-left'}`}>
        <div
          className={`inline-block p-3 rounded-lg ${
            isUser
              ? 'bg-blue-500 text-white rounded-br-sm'
              : 'bg-gray-100 text-gray-900 rounded-bl-sm'
          }`}
        >
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
        </div>
        {message.timestamp && mounted && (
          <p className="text-xs text-gray-500 mt-1">
            {message.timestamp.toLocaleTimeString()}
          </p>
        )}
      </div>
    </div>
  )
}
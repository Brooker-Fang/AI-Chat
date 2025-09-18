'use client'

import { useState } from 'react'

interface ChatInputProps {
  onSendMessage: (message: string) => void
  disabled?: boolean
}

export function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !disabled) {
      onSendMessage(message.trim())
      setMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 items-center">
      <div className="flex-1 relative">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          disabled={disabled}
          className="w-full bg-gray-50 rounded-3xl px-4 py-3 text-sm text-gray-700 border border-gray-200 outline-none transition-all duration-200 min-h-12 resize-none placeholder:text-gray-400 focus:bg-white focus:border-gray-300 disabled:opacity-60 disabled:cursor-not-allowed"
          rows={1}
        />
      </div>
      <button
        type="submit"
        disabled={!message.trim() || disabled}
        className="bg-blue-500 text-white border-none rounded-full w-10 h-10 p-0 flex items-center justify-center flex-shrink-0 transition-all duration-200 cursor-pointer hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m22 2-7 20-4-9-9-4Z"/>
          <path d="M22 2 11 13"/>
        </svg>
      </button>
    </form>
  )
}
'use client'

import { useState, useRef, useEffect } from 'react'
import { ChatMessage } from './ChatMessage'
import { ChatInput } from './ChatInput'
import { ChatMessage as ChatMessageType } from '@/lib/openai'

export function ChatContainer() {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      role: 'assistant',
      content: '你好！我是你的AI助手，有什么可以帮助你的吗？',
      timestamp: new Date(),
    },
    {
      role: 'user',
      content: '请介绍一下Next.js框架',
      timestamp: new Date(),
    },
    {
      role: 'assistant',
      content: 'Next.js是一个基于React的全栈框架，提供了服务端渲染、静态生成、API路由等功能，让开发者能够快速构建现代化的Web应用程序。',
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<{ id: string; email: string; name: string } | null>(null)
  const [mounted, setMounted] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  console.info('user==', user)
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages, mounted])

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return

    const userMessage: ChatMessageType = {
      role: 'user',
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      })

      if (!response.ok) {
        throw new Error('网络请求失败')
      }

      const data = await response.json()

      const aiMessage: ChatMessageType = {
        role: 'assistant',
        content: data.message || '抱歉，我现在无法回复。',
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error('发送消息失败:', error)
      const errorMessage: ChatMessageType = {
        role: 'assistant',
        content: '抱歉，发送消息时出现错误。请稍后再试。',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    // 模拟Google登录
    setUser({
      id: 'mock-user',
      email: 'user@gmail.com',
      name: '测试用户',
    })
  }

  if (!mounted) {
    return (
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-lg p-6">
        <div className="text-center text-gray-500">初始化中...</div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-gray-100 flex flex-col h-[600px]">
      {/* Header */}
      <div className="relative px-4 py-3">
        <button 
          onClick={handleGoogleLogin} 
          className="absolute top-3 right-4 flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span>Sign in with Google</span>
        </button>
        <div className="text-center pt-6">
          <h1 className="text-xl font-semibold text-gray-800">AI Chat</h1>
        </div>
      </div>

      {/* Chat Messages */}
      <div ref={scrollAreaRef} className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        {isLoading && (
          <div className="flex items-end gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-gray-400 text-white flex items-center justify-center text-xs font-medium flex-shrink-0 mb-0.5">
              AI
            </div>
            <div className="max-w-xs">
              <div className="bg-gray-100 text-gray-800 px-4 py-2.5 rounded-2xl rounded-bl-md">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chat Input */}
      <div className="p-4">
        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  )
}

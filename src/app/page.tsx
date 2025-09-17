'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { ChatContainer } from '@/components/chat/ChatContainer'
import { ClientOnly } from '@/components/ClientOnly'

// 临时用户类型定义
interface User {
  id: string
  email: string
  name?: string
  avatar_url?: string
  credits?: number
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null)

  const handleLogin = () => {
    // 临时模拟登录
    setUser({
      id: '1',
      email: 'user@example.com',
      name: '测试用户',
      credits: 100
    })
  }

  const handleLogout = () => {
    setUser(null)
  }

  return (
    <ClientOnly fallback={
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-2">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    }>
      <div className="h-screen flex flex-col bg-gray-50">
        <Header 
          user={user} 
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
        <main className="flex-1 max-w-4xl mx-auto w-full bg-white shadow-sm">
          <ChatContainer userAvatar={user?.avatar_url} />
        </main>
      </div>
    </ClientOnly>
  )
}
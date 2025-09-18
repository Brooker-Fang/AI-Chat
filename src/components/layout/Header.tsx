'use client'

import { useState } from 'react'
import { LoginModal } from '@/components/auth/LoginModal'

interface User {
  id: string
  email?: string
  user_metadata?: {
    avatar_url?: string
    full_name?: string
  }
}

interface HeaderProps {
  user?: User | null
  onUserChange?: (user: User | null) => void
}

export function Header({ user, onUserChange }: HeaderProps) {
  const [showLoginModal, setShowLoginModal] = useState(false)

  const handleSignOut = async () => {
    // 模拟登出
    onUserChange?.(null)
    console.log('用户已登出')
  }

  const handleLoginSuccess = (userData: User) => {
    onUserChange?.(userData)
    setShowLoginModal(false)
  }

  return (
    <>
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">AI聊天助手</h1>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  积分: 100
                </div>
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="bg-transparent border-none text-gray-600 text-sm px-3 py-2 rounded-md cursor-pointer transition-colors hover:text-gray-900"
                >
                  退出
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowLoginModal(true)} 
                className="bg-blue-500 text-white border-none px-6 py-2 rounded-lg font-medium cursor-pointer transition-colors hover:bg-blue-600"
              >
                登录
              </button>
            )}
          </div>
        </div>
      </header>

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  )
}
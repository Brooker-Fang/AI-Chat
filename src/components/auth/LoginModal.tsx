'use client'

import { useState } from 'react'

interface User {
  id: string
  email?: string
  user_metadata?: {
    avatar_url?: string
    full_name?: string
  }
}

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onLoginSuccess?: (user: User) => void
}

export function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    
    // 模拟Google登录
    setTimeout(() => {
      const mockUser: User = {
        id: 'mock-user-id',
        email: 'user@gmail.com',
        user_metadata: {
          full_name: '测试用户',
          avatar_url: 'https://via.placeholder.com/40'
        }
      }
      
      onLoginSuccess?.(mockUser)
      setIsLoading(false)
      onClose()
    }, 1000)
  }

  const handleEmailLogin = async () => {
    if (!email.trim()) return
    
    setIsLoading(true)
    
    // 模拟邮箱登录
    setTimeout(() => {
      const mockUser: User = {
        id: 'mock-user-email',
        email: email,
        user_metadata: {
          full_name: email.split('@')[0]
        }
      }
      
      onLoginSuccess?.(mockUser)
      setIsLoading(false)
      onClose()
    }, 1000)
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md m-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="px-6 pt-6">
          <h2 className="text-center text-xl font-semibold m-0 text-gray-900">
            登录到AI聊天助手
          </h2>
        </div>
        
        <div className="p-6 flex flex-col gap-4">
          <p className="text-sm text-gray-600 text-center m-0">
            登录后可以保存聊天记录，获得积分奖励，并解锁更多功能。
          </p>
          
          {/* Google登录按钮 */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full bg-white text-gray-900 border border-gray-300 font-medium p-3 rounded-md flex items-center justify-center cursor-pointer transition-colors hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
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
            {isLoading ? '登录中...' : '使用Google账号登录'}
          </button>
          
          {/* 分割线 */}
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">或</span>
            </div>
          </div>
          
          {/* 邮箱登录 */}
          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="输入您的邮箱地址"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <button
              onClick={handleEmailLogin}
              disabled={isLoading || !email.trim()}
              className="w-full bg-blue-500 text-white border-none font-medium p-3 rounded-md cursor-pointer transition-colors hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? '登录中...' : '使用邮箱登录'}
            </button>
          </div>
          
          <p className="text-xs text-gray-500 text-center m-0">
            登录即表示您同意我们的服务条款和隐私政策
          </p>
        </div>
      </div>
    </div>
  )
}
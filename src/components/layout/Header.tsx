'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { User, LogOut } from 'lucide-react'

interface User {
  id: string
  email: string
  name?: string
  avatar_url?: string
  credits?: number
}

interface HeaderProps {
  user?: User | null
  onLogin?: () => void
  onLogout?: () => void
}

export function Header({ user, onLogin, onLogout }: HeaderProps) {
  const [showLoginDialog, setShowLoginDialog] = useState(false)

  const handleGoogleLogin = () => {
    // TODO: 实现Google登录逻辑
    console.log('Google login clicked')
    setShowLoginDialog(false)
    onLogin?.()
  }

  return (
    <header className="border-b bg-white px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-900">AI聊天助手</h1>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              {user.credits !== undefined && (
                <div className="text-sm text-gray-600">
                  积分: <span className="font-medium text-blue-600">{user.credits}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user.avatar_url} />
                  <AvatarFallback>
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-gray-700">
                  {user.name || user.email}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="text-gray-600 hover:text-gray-900"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
              <DialogTrigger asChild>
                <Button variant="outline">登录</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>登录到AI聊天助手</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    登录后可以保存聊天记录，获得积分奖励，并解锁更多功能。
                  </p>
                  <Button
                    onClick={handleGoogleLogin}
                    className="w-full"
                    variant="outline"
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    使用Google账号登录
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </header>
  )
}
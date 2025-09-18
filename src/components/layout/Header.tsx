'use client'

import { useState } from 'react'
import styles from './Header.module.css'
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
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.logoSection}>
            <div className={styles.logoIcon}>
              <span className={styles.logoText}>AI</span>
            </div>
            <h1 className={styles.title}>AI聊天助手</h1>
          </div>

          <div className={styles.userSection}>
            {user ? (
              <div className={styles.userInfo}>
                <div className={styles.credits}>
                  积分: 100
                </div>
                <div className={styles.avatar}>
                  <span className={styles.avatarText}>
                    {user.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className={styles.signOutButton}
                >
                  退出
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowLoginModal(true)} 
                className={styles.loginButton}
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
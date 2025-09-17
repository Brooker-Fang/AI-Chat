# AI聊天助手项目初始化模板

本文档提供了完整的AI聊天助手项目初始化步骤，基于Next.js、Supabase、Tailwind CSS和shadcn/ui技术栈。

## 前置要求

- Node.js 18+ 
- pnpm (推荐) 或 npm
- Git

## 1. 项目初始化

### 1.1 创建Next.js项目

```bash
# 创建Next.js项目（在目标目录中执行）
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --yes
```

### 1.2 安装核心依赖

```bash
# 安装Supabase和UI相关依赖
pnpm install @supabase/supabase-js @supabase/ssr lucide-react class-variance-authority clsx tailwind-merge @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-avatar @radix-ui/react-scroll-area

# 安装Tailwind动画插件
pnpm add tailwindcss-animate
```

## 2. 配置文件

### 2.1 创建 `components.json`

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

### 2.2 更新 `tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
```

### 2.3 更新 `src/app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 84% 4.9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 84% 4.9%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 94.1%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
  }
}

@layer base {
  * {
    @apply border-gray-200;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

### 2.4 创建环境变量文件 `.env.local`

```bash
# Supabase配置
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# OpenAI API配置
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_API_BASE_URL=https://gemini.brktech.xyz

# Google OAuth配置
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# NextAuth配置
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here
```

## 3. 核心文件结构

### 3.1 工具库文件

#### `src/lib/utils.ts`
```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

#### `src/lib/supabase.ts`
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 用于服务端的Supabase客户端
export const createServerSupabaseClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
```

#### `src/lib/openai.ts`
```typescript
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp?: Date
}

export interface ChatResponse {
  message: string
  error?: string
}

export async function sendChatMessage(messages: ChatMessage[]): Promise<ChatResponse> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Chat API error:', error)
    return {
      message: '',
      error: '发送消息失败，请稍后重试'
    }
  }
}
```

### 3.2 UI组件

需要创建以下UI组件文件：
- `src/components/ui/button.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/avatar.tsx`
- `src/components/ui/scroll-area.tsx`
- `src/components/ui/dialog.tsx`

### 3.3 聊天组件

需要创建以下聊天组件：
- `src/components/chat/ChatMessage.tsx`
- `src/components/chat/ChatInput.tsx`
- `src/components/chat/ChatContainer.tsx`

### 3.4 布局组件

需要创建：
- `src/components/layout/Header.tsx`

### 3.5 API路由

#### `src/app/api/chat/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { ChatMessage } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const { messages }: { messages: ChatMessage[] } = await request.json()

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: '消息不能为空' },
        { status: 400 }
      )
    }

    const response = await fetch(`${process.env.OPENAI_API_BASE_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        max_tokens: 1000,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('OpenAI API error:', errorData)
      return NextResponse.json(
        { error: 'AI服务暂时不可用，请稍后重试' },
        { status: 500 }
      )
    }

    const data = await response.json()
    const aiMessage = data.choices[0]?.message?.content || '抱歉，我无法生成回复'

    return NextResponse.json({
      message: aiMessage
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    )
  }
}
```

### 3.6 页面文件

#### `src/app/layout.tsx`
```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI聊天助手',
  description: '一个简洁、高效的AI聊天界面',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

#### `src/app/page.tsx`
```typescript
'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { ChatContainer } from '@/components/chat/ChatContainer'

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
  )
}
```

## 4. 启动项目

```bash
# 启动开发服务器
pnpm dev
```

访问 http://localhost:3000 查看应用。

## 5. 项目特性

### 已实现功能
- ✅ 现代化UI界面（基于shadcn/ui）
- ✅ 响应式设计
- ✅ 实时聊天功能
- ✅ OpenAI API集成
- ✅ 用户登录界面（UI层面）
- ✅ 消息历史记录
- ✅ 自动滚动到最新消息
- ✅ 加载状态指示

### 待开发功能
- [ ] Google OAuth登录集成
- [ ] Supabase数据库集成
- [ ] 用户管理系统
- [ ] 聊天记录持久化
- [ ] 积分系统
- [ ] 权限管理

## 6. 技术栈

- **前端框架**: Next.js 14 (App Router)
- **数据库**: Supabase
- **样式**: Tailwind CSS
- **UI组件**: shadcn/ui
- **包管理器**: pnpm
- **AI服务**: OpenAI API

## 7. 注意事项

1. 确保所有环境变量都已正确配置
2. 如果使用自定义API端点，确保端点兼容OpenAI API格式
3. 生产环境部署前，请更新所有默认密钥和配置
4. 建议使用TypeScript进行类型安全开发

## 8. 故障排除

### 常见问题

1. **CSS类未找到错误**: 确保tailwindcss-animate已安装且在tailwind.config.ts中正确配置
2. **API调用失败**: 检查环境变量配置和API端点可用性
3. **组件导入错误**: 确保所有UI组件文件都已创建并正确导出

### 调试技巧

- 使用浏览器开发者工具检查网络请求
- 查看终端输出的错误信息
- 确认文件路径和导入语句正确

这个模板提供了完整的AI聊天应用基础架构，可以根据具体需求进行扩展和定制。
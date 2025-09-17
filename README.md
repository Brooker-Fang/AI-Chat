# AI聊天助手

一个基于Next.js和Supabase构建的现代化AI聊天应用。

## 功能特性

- 🚀 **即时聊天**: 无需登录即可开始与AI对话
- 🔐 **Google登录**: 便捷的用户认证系统
- 💎 **积分系统**: 用户积分管理和权限控制
- 📱 **响应式设计**: 适配桌面、平板和移动设备
- 🎨 **现代UI**: 基于Tailwind CSS和shadcn/ui的美观界面

## 技术栈

- **前端框架**: Next.js 14 (App Router)
- **数据库**: Supabase
- **样式**: Tailwind CSS
- **UI组件**: shadcn/ui
- **包管理器**: pnpm
- **AI服务**: OpenAI API (通过自定义端点)

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 环境配置

复制 `.env.local` 文件并填入相应的配置：

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

### 3. 启动开发服务器

```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API路由
│   │   └── chat/          # 聊天API
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── components/            # React组件
│   ├── chat/              # 聊天相关组件
│   │   ├── ChatContainer.tsx
│   │   ├── ChatInput.tsx
│   │   └── ChatMessage.tsx
│   ├── layout/            # 布局组件
│   │   └── Header.tsx
│   └── ui/                # shadcn/ui组件
└── lib/                   # 工具库
    ├── openai.ts          # OpenAI API集成
    └── supabase.ts        # Supabase客户端
```

## 开发计划

### 第一阶段 ✅
- [x] 项目初始化和基础架构
- [x] 聊天界面开发
- [x] OpenAI API集成
- [x] 基础UI组件

### 第二阶段 (待开发)
- [ ] Supabase数据库设计
- [ ] Google OAuth登录集成
- [ ] 用户管理系统
- [ ] 聊天记录存储

### 第三阶段 (待开发)
- [ ] 积分系统实现
- [ ] 权限管理
- [ ] 高级AI模型支持
- [ ] 用户仪表板

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。
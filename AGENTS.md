# 三八零零 - 在线免费工具箱

本项目是一个纯前端的多功能在线工具站，基于 React + TypeScript + Vite + Tailwind CSS + React Router 构建。

## 项目结构

```
FreeTool/
├── App.tsx              # 主应用组件，包含路由配置
├── index.tsx            # 应用入口
├── index.html           # HTML 模板
├── index.css            # 全局样式
├── config/
│   └── tools.ts         # 工具配置和SEO信息
├── components/          # React 组件目录
│   ├── HomePage.tsx     # 首页（工具分类导航）
│   ├── TopNavBar.tsx    # 顶部导航栏
│   ├── ToolLayout.tsx   # 工具页面布局
│   ├── MetaTags.tsx     # SEO 元标签组件
│   ├── NotFoundPage.tsx # 404 页面
│   └── *Tool.tsx        # 各个工具组件
├── services/            # 服务层（API 调用等）
├── utils/               # 工具函数
├── types/               # TypeScript 类型定义
│   └── tools.ts         # 工具相关类型
├── public/              # 静态资源
│   ├── _redirects       # SPA 路由重定向（Cloudflare/Netlify）
│   └── _headers         # 安全头配置
└── styles/              # 样式文件
```

## 构建命令

```bash
# 安装依赖
npm install

# 启动开发服务器（端口 3000）
npm run dev

# 构建生产版本（GitHub Pages，基础路径 /FreeTool/）
npm run build

# 构建 Cloudflare Pages 版本（基础路径 /）
npm run build:cf

# 预览构建结果
npm run preview

# TypeScript 类型检查
npm run typecheck
```

> **注意**：项目当前未配置测试框架。如需添加测试，建议使用 Vitest。

## 路由结构

项目使用 React Router 进行路由管理：

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | HomePage | 首页，工具分类导航 |
| `/translate` | TranslateTool | 在线翻译工具 |
| `/image-converter` | ImageConverterTool | 图片格式转换 |
| `/json-formatter` | JsonFormatterTool | JSON 格式化 |
| ... | ... | 其他工具页面 |
| `*` | NotFoundPage | 404 页面 |

新增工具时，需要在 `config/tools.ts` 中添加配置。

## 环境变量

项目使用以下环境变量：
- `GEMINI_API_KEY`: Google Gemini API 密钥（用于 AI 功能）
- `BASE_URL`: 部署基础路径（可选，默认为 `/FreeTool/`）

创建 `.env` 文件：
```
GEMINI_API_KEY=your_api_key_here
```

## 部署说明

### GitHub Pages
默认配置，基础路径为 `/FreeTool/`：
```bash
npm run build
```

### Cloudflare Pages
使用根路径部署：
```bash
npm run build:cf
# 或设置环境变量 BASE_URL=/
```

### EdgeOne / 其他平台
根据需要设置 `BASE_URL` 环境变量。

## SEO 优化

每个工具页面都包含中文 SEO 元标签：
- 标题：`{工具名称} - 三八零零在线工具`
- 描述：工具功能描述
- 关键词：相关搜索关键词

首页 SEO：
- 标题：`三八零零 - 在线免费工具箱 | 翻译、图片处理、代码高亮、PDF转换`
- 完整的 Open Graph 和 Twitter Card 标签

## 代码风格指南

### 导入规范

```typescript
// 1. React 相关导入（使用命名导入解构）
import React, { useState, useEffect, useCallback, useRef } from 'react';

// 2. 第三方库导入
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";

// 3. 本地组件导入（使用相对路径或 @ 别名）
import TopNavBar from './components/TopNavBar';
import { translateText } from '@/services/translateService';

// 4. 类型导入（使用 type 关键字）
import type { Tool, ToolCategory } from './types/tools';
```

### 命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| 组件 | PascalCase | `JsonFormatterTool`, `HomePage` |
| 函数/变量 | camelCase | `handleCopy`, `inputText` |
| 常量 | UPPER_SNAKE_CASE | `PINNED_TOOLS_KEY`, `ALL_TOOLS` |
| 类型/接口 | PascalCase | `ToolType`, `TranslateResult` |
| 文件名 | PascalCase (组件) | `JsonFormatterTool.tsx` |
| 工具文件 | camelCase | `translateService.ts` |
| 路由路径 | kebab-case | `/json-formatter`, `/image-converter` |

### TypeScript 规范

```typescript
// 接口定义：使用 interface 定义对象类型
interface Tool {
    id: ToolType;
    name: string;
    icon: string;
    path: string;
    description: string;
    keywords: string[];
    component: LazyExoticComponent<FC>;
}

// 类型别名：使用 type 定义联合类型
type ToolType = 'translate' | 'image-converter' | 'code-highlight';

// 组件定义：使用 React.FC
const MyComponent: React.FC = () => {
    // ...
};

// 状态定义：明确指定类型
const [activeTool, setActiveTool] = useState<ToolType>('translate');
const [error, setError] = useState<string | null>(null);
```

### 组件规范

```typescript
const MyComponent: React.FC<MyComponentProps> = ({ prop }) => {
    // 1. Hooks 状态声明
    const [state, setState] = useState<string>('');
    const ref = useRef<HTMLDivElement>(null);
    
    // 2. 回调函数（使用 useCallback 优化性能）
    const handleClick = useCallback(() => {
        setState('active');
    }, []);
    
    // 3. 副作用（useEffect）
    useEffect(() => {
        // 初始化逻辑
    }, []);
    
    // 4. JSX 返回
    return (
        <div className="container">
            {/* 内容 */}
        </div>
    );
};

export default MyComponent;
```

### 样式规范

使用 Tailwind CSS，遵循以下约定：

```tsx
// 1. 使用语义化的类名组合
<button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90">

// 2. 暗色模式支持：使用 dark: 前缀
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">

// 3. 响应式设计：使用 sm:, md:, lg: 前缀
<div className="grid grid-cols-1 lg:grid-cols-2">

// 4. 自定义颜色变量
// primary: #607AFB
<div className="text-primary bg-primary/10">
```

### 错误处理

```typescript
// 1. 使用 try-catch 包装异步操作
try {
    const result = await fetchData();
    setData(result);
} catch (error) {
    console.error('Failed to fetch data:', error);
    setError(error instanceof Error ? error.message : '未知错误');
}

// 2. 提供 fallback 机制
try {
    result = await primaryMethod();
} catch (error) {
    console.error('Primary method failed, trying fallback:', error);
    result = await fallbackMethod();
}
```

### 注释规范

```typescript
// 单行注释：中文说明
// 从 URL 参数读取工具ID
const loadTool = (): ToolType => { ... };

/**
 * 多行注释：用于复杂函数说明
 * @param text - 需要翻译的文本
 * @param targetLang - 目标语言代码
 * @returns 翻译结果对象
 */
export async function translateText(text: string, targetLang: string): Promise<TranslateResult> { ... }
```

### 懒加载规范

```typescript
// 使用 React.lazy 进行组件懒加载
const ToolComponent = lazy(() => import('./components/ToolComponent'));

// 配合 Suspense 使用
<Suspense fallback={<LoadingFallback />}>
    <Component />
</Suspense>
```

## 主题支持

项目支持明暗主题切换：

```typescript
// 检测和设置主题
if (localStorage.getItem('theme') === 'dark' || 
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
}
```

## 添加新工具

1. 在 `components/` 创建工具组件
2. 在 `config/tools.ts` 添加工具配置：
```typescript
{
    id: 'new-tool',
    name: '新工具',
    icon: 'star',
    path: '/new-tool',
    description: '工具描述',
    keywords: ['关键词1', '关键词2'],
    component: NewToolComponent,
}
```
3. 路由会自动生成

## 开发建议

1. **性能优化**：新工具组件应使用懒加载
2. **类型安全**：避免使用 `any`，优先使用具体类型
3. **可访问性**：为交互元素添加适当的 aria 属性
4. **国际化**：用户界面文本使用中文
5. **本地优先**：除翻译功能外，数据处理应在浏览器本地完成
6. **SEO 友好**：每个页面都应有合适的标题和描述

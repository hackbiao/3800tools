# EdgeOne SEO 优化部署指南

## 项目结构

```
FreeTool/
├── functions/               # 边缘函数目录
│   └── seo-handler.js      # SEO 动态渲染函数
├── edgeone.toml            # EdgeOne 配置文件
├── index.html              # 主 HTML 文件（已添加 SEO 占位符）
├── public/                 # 静态资源
│   ├── sitemap.xml
│   ├── robots.txt
│   └── ...
└── deploy-edgeone.md       # 本指南
```

## 部署步骤

### 1. 登录 EdgeOne 控制台

访问 https://console.cloud.tencent.com/edgeone

### 2. 创建 Pages 项目

1. 进入 **边缘安全加速平台** → **Pages**
2. 点击 **新建项目**
3. 选择 **直接上传** 或 **Git 仓库**（推荐 Git）
4. 配置构建命令：
   ```bash
   npm install && npm run build:edgeone
   ```
5. 输出目录：`dist`

### 3. 配置边缘函数

1. 进入项目 → **边缘函数**
2. 创建新函数：
   - 名称：`seo-handler`
   - 代码：复制 `functions/seo-handler.js` 的内容
3. 配置路由规则：
   - 路径匹配：`/*`
   - 关联函数：`seo-handler`

### 4. 上传配置文件

在 Pages 项目根目录上传 `edgeone.toml` 文件

### 5. 环境变量设置

在 Pages 项目设置中添加：
- `BASE_URL` = `/`
- `NODE_VERSION` = `18`

### 6. 部署并验证

1. 点击 **部署**
2. 等待构建完成
3. 访问测试 URL 验证

## 验证方法

### 测试爬虫视角

```bash
# 使用 Googlebot User-Agent 测试
curl -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" \
  https://tools.3800ai.com/translate/

# 验证返回的 HTML 中包含正确的 title
curl -A "Googlebot/2.1" https://tools.3800ai.com/translate/ | grep -o '<title>.*</title>'

# 验证 meta description
curl -A "Googlebot/2.1" https://tools.3800ai.com/translate/ | grep -o 'meta name="description" content="[^"]*"'
```

### 测试普通用户视角

```bash
# 普通用户应该看到正常的 React 应用
curl https://tools.3800ai.com/translate/
```

## 支持的爬虫列表

边缘函数会检测以下爬虫 User-Agent：

- Googlebot
- Bingbot
- Baiduspider（百度）
- Yandex
- DuckDuckBot
- Slurp（Yahoo）
- Facebookexternalhit
- Twitterbot
- LinkedInBot
- WhatsApp
- TelegramBot
- AppleBot
- PetalBot（华为）
- Sogou Spider
- 360Spider
- ByteSpider（字节）
- Yisouspider（神马）

## 页面 SEO 配置

边缘函数支持以下页面的动态 SEO：

### 首页
- `/` - 三八零零工具箱首页

### 分类页面
- `/category/all/` - 全部工具分类
- `/category/calculator/` - 计算工具
- `/category/utility/` - 便民工具
- `/category/text/` - 文本工具
- `/category/image/` - 图片工具
- `/category/data/` - 数据工具
- `/category/media/` - 媒体工具
- `/category/ai/` - AI工具
- `/category/network/` - 网络工具
- `/category/dev/` - 开发工具

### 工具页面（80+ 个）
- `/translate/` - 在线翻译
- `/image-converter/` - 图片格式转换
- `/json-formatter/` - JSON格式化
- `/code-highlight/` - 代码高亮
- `/mortgage-calculator/` - 房贷计算器
- `/qrcode-generator/` - 二维码生成器
- `/password-generator/` - 密码生成器
- `/pdf-to-ppt/` - PDF转PPT
- ... 等等

## 技术说明

### 边缘函数工作原理

1. **请求拦截**：所有请求先经过边缘函数
2. **爬虫检测**：检查 User-Agent 是否匹配爬虫列表
3. **内容注入**：如果是爬虫，获取原始 HTML 并注入该页面特定的 SEO 标签
4. **JSON-LD 注入**：为每个页面生成对应的结构化数据
5. **返回响应**：爬虫看到完整 SEO 优化的 HTML

### 与普通用户的区别

- **爬虫**：看到注入后的 HTML，包含正确的 title、meta、JSON-LD
- **普通用户**：正常加载 React SPA，SEO 标签由客户端 JavaScript 设置

## 故障排除

### 问题：边缘函数未生效

**解决方案**：
1. 检查函数是否已部署
2. 检查路由规则是否配置正确（`/*` 匹配所有路径）
3. 查看边缘函数日志

### 问题：返回 404

**解决方案**：
1. 检查 `edgeone.toml` 中的重定向规则
2. 确保所有工具路径都有对应的重定向规则
3. 验证 `_redirects` 文件存在

### 问题：SEO 标签未被替换

**解决方案**：
1. 使用占位符检查 HTML 结构
2. 验证正则表达式匹配
3. 在边缘函数中添加日志输出调试

## 监控和日志

在 EdgeOne 控制台可以查看：

1. **边缘函数调用次数**
2. **边缘函数执行时间**
3. **错误日志**

## 优化建议

1. **预渲染内容**：在 `<div id="root">` 中注入静态内容供爬虫索引
2. **缓存策略**：对 SEO HTML 启用缓存（当前已配置 1 小时）
3. **增量更新**：工具配置更新后重新部署边缘函数

## 后续维护

添加新工具时：

1. 在 `functions/seo-handler.js` 的 `seoConfig` 中添加新条目
2. 在 `edgeone.toml` 中添加重定向规则
3. 重新部署边缘函数

## 联系支持

如有问题，请联系：
- EdgeOne 技术支持：https://cloud.tencent.com/act/event/edgeone
- 项目维护者：三八零零团队

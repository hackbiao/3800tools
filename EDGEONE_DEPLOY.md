# EdgeOne Pages 部署配置

## 项目配置
- 项目名称: FreeTool
- 构建源: dist/
- 路径前缀: / (EdgeOne Pages 根目录)

## EdgeOne Pages 配置要求

1. **GitHub仓库设置**:
   - 仓库必须是公开的
   - 在GitHub仓库设置中启用GitHub Pages
   - 选择"GitHub Actions"作为部署源

2. **EdgeOne配置**:
   - 连接GitHub仓库
   - 设置部署分支: gh-pages
   - 设置根目录: /
   - 启用自动部署

3. **域名配置**:
   - 在EdgeOne中绑定域名: tools.3800ai.com
   - 确保DNS解析正确

## 构建验证

构建完成后，EdgeOne Pages将包含:
- 93个静态HTML页面
- 深度SEO优化的内容
- AI工具导航指南
- 工具使用心得和对比
- 排行榜和专题页面

## 部署流程

1. 推送代码到main分支
2. GitHub Actions自动构建
3. 部署到gh-pages分支
4. EdgeOne Pages自动拉取
5. 网站更新完成
#!/bin/bash

# EdgeOne Pages 预部署验证脚本
# 在GitHub Actions中用于验证构建质量

echo "🔍 开始预部署验证..."

# 检查dist目录是否存在
if [ ! -d "dist" ]; then
    echo "❌ dist目录不存在"
    exit 1
fi

echo "✅ dist目录存在"

# 检查关键文件
files=(
    "dist/index.html"
    "dist/ranking/index.html"
    "dist/topics/index.html"
    "dist/translate/index.html"
    "dist/sitemap.xml"
    "dist/robots.txt"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file 存在"
    else
        echo "❌ $file 不存在"
        exit 1
    fi
done

# 检查生成的页面数量
total_pages=$(find dist -name "*.html" | wc -l)
echo "📊 总共生成 $total_pages 个HTML页面"

if [ "$total_pages" -lt 90 ]; then
    echo "⚠️  页面数量少于预期（期望93个）"
fi

# 验证首页SEO内容
if grep -q "AI工具导航知识门户" dist/index.html; then
    echo "✅ 首页包含AI工具导航指南"
else
    echo "⚠️  首页缺少AI工具导航指南"
fi

# 验证工具页面SEO内容
if [ -f "dist/translate/index.html" ]; then
    if grep -q "使用心得" dist/translate/index.html; then
        echo "✅ 翻译工具页面包含使用心得"
    else
        echo "⚠️  翻译工具页面缺少使用心得"
    fi
fi

# 检查文件大小
index_size=$(du -h dist/index.html | cut -f1)
echo "📦 首页文件大小: $index_size"

if [ $(du -b dist/index.html | cut -f1) -lt 10000 ]; then
    echo "⚠️  首页文件可能过小，SEO内容可能缺失"
fi

# 验证静态资源
assets_count=$(find dist/assets -type f 2>/dev/null | wc -l)
echo "🎨 静态资源文件: $assets_count 个"

# 检查关键目录结构
dirs=(
    "dist/category"
    "dist/ranking"
    "dist/topics"
    "dist/assets"
    "dist/libs"
)

for dir in "${dirs[@]}"; do
    if [ -d "$dir" ]; then
        echo "✅ $dir 目录存在"
    else
        echo "⚠️  $dir 目录不存在"
    fi
done

echo ""
echo "🎉 预部署验证完成!"
echo "📈 项目已准备好部署到EdgeOne Pages"
echo "🌐 部署后将包含 $total_pages 个SEO优化的静态页面"
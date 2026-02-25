#!/bin/bash

# 批量替换console语句的脚本

files=(
    "components/Base64Tool.tsx"
    "components/BrowserFingerprint.tsx"
    "components/ChineseConverter.tsx"
    "components/ChineseToPinyin.tsx"
    "components/ColorPicker.tsx"
    "components/CryptoTool.tsx"
    "components/CurlGenerator.tsx"
    "components/EncodingConverter.tsx"
    "components/ErrorBoundary.tsx"
    "components/GifCompressor.tsx"
    "components/GifSplitter.tsx"
    "components/HashCalculator.tsx"
    "components/IPConverter.tsx"
    "components/IPSubnetCalculator.tsx"
    "components/JsonFormatterTool.tsx"
    "components/NumberBaseConverter.tsx"
    "components/NumberGenerator.tsx"
    "components/PasswordGenerator.tsx"
    "components/TextDiffTool.tsx"
    "components/TextFormatterTool.tsx"
    "components/TextStatistics.tsx"
    "components/TextTransform.tsx"
    "components/UUIDGenerator.tsx"
    "components/URLParser.tsx"
)

# 为每个文件添加errorHandler import
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        # 检查是否已经导入了errorHandler
        if ! grep -q "import.*errorHandler" "$file"; then
            # 在第一个import后添加errorHandler导入
            sed -i '/^import React/a import { errorHandler } from '"'"'../utils/errorHandler'"'"';' "$file"
        fi
    fi
done

echo "批量添加errorHandler导入完成"
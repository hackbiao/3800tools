import React, { useState, useEffect, useRef, useCallback } from 'react';

const MarkdownEditor: React.FC = () => {
    const [markdown, setMarkdown] = useState(`# Markdown 编辑器示例

## 标题
使用 # 号来创建标题，# 越多标题越小

### 三级标题
#### 四级标题

## 文本样式
**粗体文本**
*斜体文本*
~~删除线~~

## 列表
- 无序列表项 1
- 无序列表项 2
  - 嵌套列表项

1. 有序列表项 1
2. 有序列表项 2

## 代码
行内代码: \`const x = 1;\`

\`\`\`javascript
// 代码块
function hello() {
    console.log("Hello, World!");
}
\`\`\`

## 引用
> 这是一段引用文字
> 可以多行

## 链接和图片
[链接文字](https://example.com)

## 表格
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| A1  | B1  | C1  |
| A2  | B2  | C2  |

## 分割线
---

*以上是 Markdown 基本语法示例*
`);
    const [html, setHtml] = useState('');
    const previewRef = useRef<HTMLDivElement>(null);

    const parseMarkdown = useCallback((text: string): string => {
        let result = text;

        result = result.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>');
        result = result.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
        result = result.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
        result = result.replace(/^### (.+)$/gm, '<h3>$1</h3>');
        result = result.replace(/^## (.+)$/gm, '<h2>$1</h2>');
        result = result.replace(/^# (.+)$/gm, '<h1>$1</h1>');
        result = result.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        result = result.replace(/\*([^*]+)\*/g, '<em>$1</em>');
        result = result.replace(/~~([^~]+)~~/g, '<del>$1</del>');
        result = result.replace(/^\> (.+)$/gm, '<blockquote>$1</blockquote>');
        result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
        result = result.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width:100%">');
        result = result.replace(/^---$/gm, '<hr>');
        result = result.replace(/^\|(.+)\|$/gm, (match, content) => {
            const cells = content.split('|').map((c: string) => c.trim());
            if (cells.some((c: string) => c.match(/^-+$/))) {
                return '';
            }
            return `<tr>${cells.map((c: string) => `<td>${c}</td>`).join('')}</tr>`;
        });
        result = result.replace(/(<tr>.*<\/tr>\n?)+/g, '<table>$&</table>');
        result = result.replace(/^- (.+)$/gm, '<li>$1</li>');
        result = result.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');
        result = result.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');
        result = result.replace(/\n\n/g, '</p><p>');
        result = `<p>${result}</p>`;
        result = result.replace(/<p><(h[1-6]|pre|ul|ol|blockquote|hr|table)/g, '<$1');
        result = result.replace(/<\/(h[1-6]|pre|ul|ol|blockquote|hr|table)><\/p>/g, '</$1>');

        return result;
    }, []);

    useEffect(() => {
        setHtml(parseMarkdown(markdown));
    }, [markdown, parseMarkdown]);

    const handleCopyHtml = () => {
        navigator.clipboard.writeText(html);
    };

    const handleDownloadHtml = () => {
        const fullHtml = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Markdown Export</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
        h1, h2, h3, h4 { margin-top: 1.5em; }
        code { background: #f4f4f4; padding: 2px 6px; border-radius: 4px; }
        pre { background: #f4f4f4; padding: 16px; border-radius: 8px; overflow-x: auto; }
        blockquote { border-left: 4px solid #607AFB; padding-left: 16px; margin-left: 0; color: #666; }
        table { border-collapse: collapse; width: 100%; }
        td, th { border: 1px solid #ddd; padding: 8px; text-align: left; }
        img { max-width: 100%; }
        hr { border: none; border-top: 1px solid #ddd; margin: 2em 0; }
    </style>
</head>
<body>
${html}
</body>
</html>`;
        const blob = new Blob([fullHtml], { type: 'text/html' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'markdown.html';
        a.click();
    };

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-6xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">Markdown 编辑器</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">在线编辑 Markdown，实时预览效果</p>
            </div>

            <div className="w-full max-w-6xl rounded-xl border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/20 shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative flex flex-col border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700/50">
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700/50">
                            <h3 className="text-gray-900 dark:text-white text-base font-semibold flex items-center gap-2">
                                <span className="material-symbols-outlined text-xl">edit_note</span>
                                编辑器
                            </h3>
                            <span className="text-xs text-gray-400">{markdown.length} 字符</span>
                        </div>
                        <textarea
                            value={markdown}
                            onChange={(e) => setMarkdown(e.target.value)}
                            className="flex-1 resize-none bg-transparent text-gray-900 dark:text-gray-100 min-h-[500px] p-4 text-sm leading-relaxed font-mono focus:outline-none placeholder:text-gray-400"
                            placeholder="在此输入 Markdown..."
                        />
                    </div>

                    <div className="relative flex flex-col bg-gray-50/50 dark:bg-gray-800/30">
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700/50">
                            <h3 className="text-gray-900 dark:text-white text-base font-semibold flex items-center gap-2">
                                <span className="material-symbols-outlined text-xl">visibility</span>
                                预览
                            </h3>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleCopyHtml}
                                    className="px-3 py-1 text-xs bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors"
                                >
                                    复制HTML
                                </button>
                                <button
                                    onClick={handleDownloadHtml}
                                    className="px-3 py-1 text-xs bg-green-500/10 text-green-500 rounded hover:bg-green-500/20 transition-colors"
                                >
                                    下载HTML
                                </button>
                            </div>
                        </div>
                        <div
                            ref={previewRef}
                            className="flex-1 p-4 prose dark:prose-invert max-w-none min-h-[500px] overflow-auto"
                            dangerouslySetInnerHTML={{ __html: html }}
                            style={{
                                lineHeight: '1.8',
                            }}
                        />
                    </div>
                </div>
            </div>

            <style>{`
                .prose h1 { font-size: 2em; font-weight: 700; margin: 0.67em 0; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.3em; }
                .prose h2 { font-size: 1.5em; font-weight: 600; margin: 0.83em 0; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.3em; }
                .prose h3 { font-size: 1.25em; font-weight: 600; margin: 1em 0; }
                .prose h4 { font-size: 1em; font-weight: 600; margin: 1.33em 0; }
                .prose p { margin: 1em 0; }
                .prose ul, .prose ol { padding-left: 2em; margin: 1em 0; }
                .prose li { margin: 0.5em 0; }
                .prose blockquote { border-left: 4px solid #607AFB; padding-left: 1em; margin: 1em 0; color: #666; }
                .prose pre { background: #1e1e1e; color: #d4d4d4; padding: 1em; border-radius: 8px; overflow-x: auto; }
                .prose code { background: #f3f4f6; padding: 0.2em 0.4em; border-radius: 4px; font-size: 0.9em; }
                .prose .inline-code { background: #f3f4f6; padding: 0.2em 0.4em; border-radius: 4px; }
                .prose pre code { background: transparent; padding: 0; }
                .prose a { color: #607AFB; text-decoration: none; }
                .prose a:hover { text-decoration: underline; }
                .prose table { border-collapse: collapse; width: 100%; margin: 1em 0; }
                .prose td, .prose th { border: 1px solid #e5e7eb; padding: 8px 12px; text-align: left; }
                .prose th { background: #f9fafb; font-weight: 600; }
                .prose hr { border: none; border-top: 2px solid #e5e7eb; margin: 2em 0; }
                .prose strong { font-weight: 600; }
                .prose del { color: #999; }
            `}</style>
        </div>
    );
};

export default MarkdownEditor;

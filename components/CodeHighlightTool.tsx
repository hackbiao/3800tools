import React, { useState, useCallback } from 'react';
import { highlightCode } from '../services/geminiService';

const LANGUAGES = [
    "JavaScript", "Python", "HTML", "CSS", "SQL", "TypeScript", "JSX", "JSON", "Markdown", "Go", "Rust", "Java", "C++"
];

const CodeHighlightTool: React.FC = () => {
    const [code, setCode] = useState<string>('');
    const [language, setLanguage] = useState<string>(LANGUAGES[0]);
    const [highlightedCode, setHighlightedCode] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [copySuccess, setCopySuccess] = useState<boolean>(false);

    const handleHighlight = useCallback(async () => {
        if (!code) {
            setError("请输入需要高亮的代码。");
            return;
        }
        setIsLoading(true);
        setError(null);
        setHighlightedCode('');

        try {
            const result = await highlightCode(code, language);
            setHighlightedCode(result);
        } catch (err) {
            console.error(err);
            setError("代码高亮失败,请检查控制台获取更多信息。");
        } finally {
            setIsLoading(false);
        }
    }, [code, language]);

    const handleCopyAsText = useCallback(() => {
        if (!highlightedCode) return;

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = highlightedCode.replace(/<br\s*\/?>/gi, '\n');

        navigator.clipboard.writeText(tempDiv.innerText).then(() => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            setError("复制代码失败。");
        });
    }, [highlightedCode]);

    const handleCopyAsHTML = useCallback(() => {
        if (!highlightedCode) return;

        // 创建富文本格式,适合粘贴到Word
        const htmlContent = `
<!DOCTYPE html>
<html>
<head>
<style>
    body { font-family: 'Consolas', 'Monaco', 'Courier New', monospace; font-size: 11pt; line-height: 1.5; }
    pre { background-color: #f5f5f5; padding: 16px; border-radius: 4px; border: 1px solid #ddd; }
</style>
</head>
<body>
<pre>${highlightedCode.replace(/<br\s*\/?>/gi, '\n')}</pre>
</body>
</html>`;

        const blob = new Blob([htmlContent], { type: 'text/html' });
        const clipboardItem = new ClipboardItem({
            'text/html': blob,
            'text/plain': new Blob([code], { type: 'text/plain' })
        });

        navigator.clipboard.write([clipboardItem]).then(() => {
            alert('已复制为富文��格式,可直接粘贴到Word!');
        }).catch(err => {
            console.error('Failed to copy as HTML: ', err);
            // 降级到普通复制
            handleCopyAsText();
        });
    }, [highlightedCode, code, handleCopyAsText]);

    return (
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
            <header>
                <h1 className="text-text-light dark:text-text-dark text-4xl font-black leading-tight tracking-[-0.033em]">代码高亮工具</h1>
                <p className="text-subtle-light dark:text-subtle-dark text-base font-normal leading-normal mt-2">
                    粘贴您的代码,选择语言,然后点击高亮按钮,即可获得可用于文档的格式化代码。
                </p>
            </header>

            <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative w-full sm:w-64">
                    <label className="sr-only" htmlFor="language-select">编程语言</label>
                    <select
                        id="language-select"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full appearance-none rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-4 py-2.5 text-text-light dark:text-text-dark focus:border-primary focus:ring-primary/20 focus:ring-2"
                    >
                        {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-subtle-light dark:text-subtle-dark pointer-events-none">expand_more</span>
                </div>
                <button
                    onClick={handleHighlight}
                    disabled={isLoading}
                    className="flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg font-medium shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? <div className="spinner"></div> : <span className="material-symbols-outlined text-xl">format_paint</span>}
                    <span>{isLoading ? "高亮中..." : "高亮代码"}</span>
                </button>
            </div>

            {error && <p className="text-red-500 bg-red-100 dark:bg-red-900/50 p-3 rounded-lg">{error}</p>}

            <div className="grid grid-cols-1 gap-8">
                <div>
                    <label className="flex flex-col">
                        <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal pb-2">您的代码</p>
                        <textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="form-input flex w-full min-w-0 flex-1 resize-y rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:border-primary min-h-64 placeholder:text-subtle-light dark:placeholder:text-subtle-dark p-[15px] text-base font-mono leading-normal"
                            placeholder="在此处粘贴您的代码..."
                        ></textarea>
                    </label>
                </div>
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-text-light dark:text-text-dark text-base font-medium leading-normal">高亮后的代码</h3>
                        <div className="flex gap-2">
                            <button
                                onClick={handleCopyAsText}
                                disabled={!highlightedCode}
                                className="flex items-center gap-2 px-4 py-2 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg text-sm font-medium hover:bg-border-light dark:hover:bg-border-dark disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="material-symbols-outlined text-lg">content_copy</span>
                                <span>{copySuccess ? "已复制!" : "复制文本"}</span>
                            </button>
                            <button
                                onClick={handleCopyAsHTML}
                                disabled={!highlightedCode}
                                className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="material-symbols-outlined text-lg">description</span>
                                <span>复制到Word</span>
                            </button>
                        </div>
                    </div>
                    <div className="relative bg-surface-light dark:bg-surface-dark rounded-lg border border-border-light dark:border-border-dark min-h-64 p-4 font-mono text-sm overflow-x-auto">
                        <pre><code dangerouslySetInnerHTML={{ __html: highlightedCode || '<span class="text-subtle-light dark:text-subtle-dark">高亮后的代码将显示在此处。</span>' }}></code></pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodeHighlightTool;

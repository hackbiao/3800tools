import React, { useState } from 'react';

type FormatType = 'js' | 'html' | 'css';

const CodeFormatter: React.FC = () => {
    const [code, setCode] = useState('');
    const [formatType, setFormatType] = useState<FormatType>('js');
    const [result, setResult] = useState('');
    const [mode, setMode] = useState<'format' | 'minify'>('format');
    const [error, setError] = useState<string | null>(null);

    const formatJS = (code: string, minify: boolean): string => {
        try {
            let result = code;
            
            result = result.replace(/\/\*[\s\S]*?\*\//g, '');
            result = result.replace(/\/\/.*/g, '');
            
            if (minify) {
                result = result.replace(/\s+/g, ' ');
                result = result.replace(/\s*([{}();,:<>=+\-*\/!?&|])\s*/g, '$1');
                result = result.replace(/\s+/g, ' ');
                result = result.trim();
            } else {
                let indentLevel = 0;
                let formatted = '';
                let inString = false;
                let stringChar = '';
                
                for (let i = 0; i < result.length; i++) {
                    const char = result[i];
                    const prevChar = result[i - 1];
                    
                    if ((char === '"' || char === "'" || char === '`') && prevChar !== '\\') {
                        if (!inString) {
                            inString = true;
                            stringChar = char;
                        } else if (char === stringChar) {
                            inString = false;
                        }
                    }
                    
                    if (!inString) {
                        if (char === '{') {
                            formatted += ' {\n' + '  '.repeat(++indentLevel);
                            continue;
                        }
                        if (char === '}') {
                            formatted += '\n' + '  '.repeat(--indentLevel) + '}\n' + '  '.repeat(indentLevel);
                            continue;
                        }
                        if (char === ';') {
                            formatted += ';\n' + '  '.repeat(indentLevel);
                            continue;
                        }
                        if (char === ',') {
                            formatted += ',\n' + '  '.repeat(indentLevel);
                            continue;
                        }
                    }
                    
                    formatted += char;
                }
                
                result = formatted.replace(/\n\s*\n/g, '\n').trim();
            }
            
            setError(null);
            return result;
        } catch (e) {
            setError(e instanceof Error ? e.message : '格式化失败');
            return code;
        }
    };

    const formatHTML = (code: string, minify: boolean): string => {
        try {
            let result = code;
            
            result = result.replace(/<!--[\s\S]*?-->/g, '');
            
            if (minify) {
                result = result.replace(/\s+/g, ' ');
                result = result.replace(/>\s+</g, '><');
                result = result.replace(/\s+>/g, '>');
                result = result.replace(/<\s+/g, '<');
                result = result.trim();
            } else {
                let indentLevel = 0;
                let formatted = '';
                const tags = result.match(/<[^>]+>|[^<]+/g) || [];
                
                tags.forEach(tag => {
                    if (tag.match(/^<\/\w/)) {
                        indentLevel--;
                        formatted += '  '.repeat(indentLevel) + tag.trim() + '\n';
                    } else if (tag.match(/^<\w[^>]*[^\/]>$/)) {
                        formatted += '  '.repeat(indentLevel) + tag.trim() + '\n';
                        indentLevel++;
                    } else if (tag.match(/^<\w[^>]*\/>$/)) {
                        formatted += '  '.repeat(indentLevel) + tag.trim() + '\n';
                    } else if (tag.match(/^<\w/)) {
                        formatted += '  '.repeat(indentLevel) + tag.trim() + '\n';
                    } else if (tag.trim()) {
                        formatted += '  '.repeat(indentLevel) + tag.trim() + '\n';
                    }
                });
                
                result = formatted.trim();
            }
            
            setError(null);
            return result;
        } catch (e) {
            setError(e instanceof Error ? e.message : '格式化失败');
            return code;
        }
    };

    const formatCSS = (code: string, minify: boolean): string => {
        try {
            let result = code;
            
            result = result.replace(/\/\*[\s\S]*?\*\//g, '');
            
            if (minify) {
                result = result.replace(/\s+/g, ' ');
                result = result.replace(/\s*([{};:,>~+])\s*/g, '$1');
                result = result.replace(/;}/g, '}');
                result = result.trim();
            } else {
                let indentLevel = 0;
                let formatted = '';
                
                result = result.replace(/\{/g, ' {\n');
                result = result.replace(/\}/g, '\n}\n');
                result = result.replace(/;/g, ';\n');
                
                const lines = result.split('\n');
                lines.forEach(line => {
                    line = line.trim();
                    if (!line) return;
                    
                    if (line === '}') {
                        indentLevel--;
                        formatted += '  '.repeat(indentLevel) + '}\n';
                    } else if (line.includes('{')) {
                        formatted += '  '.repeat(indentLevel) + line + '\n';
                        indentLevel++;
                    } else {
                        formatted += '  '.repeat(indentLevel) + line + '\n';
                    }
                });
                
                result = formatted.trim();
            }
            
            setError(null);
            return result;
        } catch (e) {
            setError(e instanceof Error ? e.message : '格式化失败');
            return code;
        }
    };

    const handleFormat = () => {
        const minify = mode === 'minify';
        let formatted: string;

        switch (formatType) {
            case 'js':
                formatted = formatJS(code, minify);
                break;
            case 'html':
                formatted = formatHTML(code, minify);
                break;
            case 'css':
                formatted = formatCSS(code, minify);
                break;
            default:
                formatted = code;
        }

        setResult(formatted);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(result);
    };

    const handleClear = () => {
        setCode('');
        setResult('');
        setError(null);
    };

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-6xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">代码格式化</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">在线格式化或压缩 JS/HTML/CSS 代码</p>
            </div>

            <div className="w-full max-w-6xl space-y-4">
                <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600 dark:text-gray-400">代码类型:</label>
                        <div className="flex gap-1">
                            {(['js', 'html', 'css'] as FormatType[]).map(type => (
                                <button
                                    key={type}
                                    onClick={() => setFormatType(type)}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium ${formatType === type ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                                >
                                    {type.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600 dark:text-gray-400">操作:</label>
                        <div className="flex gap-1">
                            <button
                                onClick={() => setMode('format')}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${mode === 'format' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                            >
                                格式化
                            </button>
                            <button
                                onClick={() => setMode('minify')}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${mode === 'minify' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                            >
                                压缩
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-2 ml-auto">
                        <button
                            onClick={handleClear}
                            className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                            清空
                        </button>
                        <button
                            onClick={handleFormat}
                            className="px-4 py-1.5 bg-primary text-white rounded-lg text-sm hover:bg-primary/90 transition-colors"
                        >
                            {mode === 'format' ? '格式化' : '压缩'}
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="relative">
                        <div className="absolute top-2 left-4 text-xs text-gray-400">原始代码</div>
                        <textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="w-full h-[400px] p-4 pt-8 font-mono text-sm bg-gray-900 text-gray-100 rounded-lg border border-gray-700 focus:outline-none focus:border-primary resize-none"
                            placeholder={`在此粘贴 ${formatType.toUpperCase()} 代码...`}
                        />
                    </div>
                    <div className="relative">
                        <div className="absolute top-2 left-4 right-4 flex justify-between items-center">
                            <span className="text-xs text-gray-400">结果</span>
                            {result && (
                                <button
                                    onClick={handleCopy}
                                    className="text-xs text-primary hover:text-primary/80"
                                >
                                    复制
                                </button>
                            )}
                        </div>
                        <textarea
                            value={result}
                            readOnly
                            className="w-full h-[400px] p-4 pt-8 font-mono text-sm bg-gray-900 text-gray-100 rounded-lg border border-gray-700 resize-none"
                            placeholder="结果将显示在此处..."
                        />
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">使用说明</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• 选择代码类型（JS/HTML/CSS）和操作（格式化/压缩）</li>
                        <li>• 格式化：将压缩的代码转为易读的格式</li>
                        <li>• 压缩：移除空格、换行、注释，减小文件体积</li>
                        <li>• 本工具为基础格式化，复杂代码建议使用专业工具</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CodeFormatter;

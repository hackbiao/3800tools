import React, { useState } from 'react';

const JsonEscapeTool: React.FC = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState<'unescape' | 'escape'>('unescape');
    const [error, setError] = useState<string | null>(null);

    const unescapeJson = (text: string): string => {
        try {
            const result = text
                .replace(/\\r\\n/g, '\n')
                .replace(/\\n/g, '\n')
                .replace(/\\t/g, '\t')
                .replace(/\\"/g, '"')
                .replace(/\\\\/g, '\\');
            
            try {
                const parsed = JSON.parse(result);
                setError(null);
                return JSON.stringify(parsed, null, 2);
            } catch {
                setError(null);
                return result;
            }
        } catch (e) {
            setError(e instanceof Error ? e.message : '处理失败');
            return text;
        }
    };

    const escapeJson = (text: string): string => {
        try {
            let jsonStr = text;
            
            try {
                JSON.parse(text);
            } catch {
                jsonStr = JSON.stringify(text);
            }
            
            const result = jsonStr
                .replace(/\\/g, '\\\\')
                .replace(/"/g, '\\"')
                .replace(/\n/g, '\\n')
                .replace(/\r/g, '\\r')
                .replace(/\t/g, '\\t');
            
            setError(null);
            return result;
        } catch (e) {
            setError(e instanceof Error ? e.message : '处理失败');
            return text;
        }
    };

    const handleProcess = () => {
        if (mode === 'unescape') {
            setOutput(unescapeJson(input));
        } else {
            setOutput(escapeJson(input));
        }
    };

    const handleSwap = () => {
        const temp = input;
        setInput(output);
        setOutput(temp);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
    };

    const handleClear = () => {
        setInput('');
        setOutput('');
        setError(null);
    };

    const sampleInput = mode === 'unescape' 
        ? '{\\"name\\":\\"张三\\",\\"age\\":25,\\"city\\":\\"北京\\"}'
        : '{"name":"张三","age":25,"city":"北京"}';

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-4xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">JSON去反斜杠</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">JSON字符串转义/反转义工具</p>
            </div>

            <div className="w-full max-w-4xl space-y-4">
                <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600 dark:text-gray-400">操作:</label>
                        <div className="flex gap-1">
                            <button
                                onClick={() => setMode('unescape')}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${mode === 'unescape' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                            >
                                去反斜杠
                            </button>
                            <button
                                onClick={() => setMode('escape')}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${mode === 'escape' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                            >
                                添加反斜杠
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
                            onClick={() => setInput(sampleInput)}
                            className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                            示例
                        </button>
                        <button
                            onClick={handleProcess}
                            className="px-4 py-1.5 bg-primary text-white rounded-lg text-sm hover:bg-primary/90 transition-colors"
                        >
                            处理
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
                        <div className="absolute top-2 left-4 text-xs text-gray-400">
                            输入 {mode === 'unescape' ? '（带反斜杠的JSON字符串）' : '（正常JSON）'}
                        </div>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full h-[300px] p-4 pt-8 font-mono text-sm bg-gray-900 text-gray-100 rounded-lg border border-gray-700 focus:outline-none focus:border-primary resize-none"
                            placeholder={mode === 'unescape' ? '{\\"key\\":\\"value\\"}' : '{"key":"value"}'}
                        />
                    </div>
                    <div className="relative">
                        <div className="absolute top-2 left-4 right-4 flex justify-between items-center">
                            <span className="text-xs text-gray-400">
                                输出 {mode === 'unescape' ? '（正常JSON）' : '（带反斜杠的JSON字符串）'}
                            </span>
                            {output && (
                                <button
                                    onClick={handleCopy}
                                    className="text-xs text-primary hover:text-primary/80"
                                >
                                    复制
                                </button>
                            )}
                        </div>
                        <textarea
                            value={output}
                            readOnly
                            className="w-full h-[300px] p-4 pt-8 font-mono text-sm bg-gray-900 text-gray-100 rounded-lg border border-gray-700 resize-none"
                            placeholder="结果将显示在此处..."
                        />
                    </div>
                </div>

                {output && (
                    <div className="flex justify-center">
                        <button
                            onClick={handleSwap}
                            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                            </svg>
                            交换输入输出
                        </button>
                    </div>
                )}

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">使用说明</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• <strong>去反斜杠</strong>：将 \\" 转为 "，将 \\n 转为换行等</li>
                        <li>• <strong>添加反斜杠</strong>：将 " 转为 \\"，将换行转为 \\n 等</li>
                        <li>• 适用于从数据库或日志中提取的JSON字符串处理</li>
                        <li>• 去反斜杠时会自动尝试格式化JSON</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default JsonEscapeTool;

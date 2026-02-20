import React, { useState, useCallback } from 'react';

const Base64Tool: React.FC = () => {
    const [inputText, setInputText] = useState<string>('');
    const [outputText, setOutputText] = useState<string>('');
    const [mode, setMode] = useState<'encode' | 'decode'>('encode');
    const [error, setError] = useState<string>('');

    const handleConvert = useCallback(() => {
        setError('');
        if (!inputText.trim()) {
            setOutputText('');
            return;
        }
        try {
            if (mode === 'encode') {
                setOutputText(btoa(unescape(encodeURIComponent(inputText))));
            } else {
                setOutputText(decodeURIComponent(escape(atob(inputText))));
            }
        } catch (err) {
            setError(mode === 'encode' ? '编码失败，请检查输入内容' : '解码失败，请输入有效的Base64字符串');
            setOutputText('');
        }
    }, [inputText, mode]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(outputText);
        } catch (err) {
            console.error('复制失败:', err);
        }
    };

    const handleClear = () => {
        setInputText('');
        setOutputText('');
        setError('');
    };

    const handleFileEncode = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
            setOutputText(result.split(',')[1]);
            setInputText(`文件: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-3xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">Base64 编码解码</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">文本和图片的Base64编码解码工具，支持中文</p>
            </div>

            <div className="w-full max-w-3xl space-y-6">
                <div className="flex gap-2">
                    <button
                        onClick={() => { setMode('encode'); setOutputText(''); setError(''); }}
                        className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                            mode === 'encode'
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                    >
                        编码
                    </button>
                    <button
                        onClick={() => { setMode('decode'); setOutputText(''); setError(''); }}
                        className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                            mode === 'decode'
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                    >
                        解码
                    </button>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {mode === 'encode' ? '原始文本' : 'Base64 字符串'}
                    </label>
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder={mode === 'encode' ? '输入要编码的文本' : '输入要解码的Base64字符串'}
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    />
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={handleConvert}
                        className="flex-1 py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                    >
                        {mode === 'encode' ? '编码' : '解码'}
                    </button>
                    <button
                        onClick={handleClear}
                        className="py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        清空
                    </button>
                </div>

                {error && (
                    <div className="text-red-500 text-sm">{error}</div>
                )}

                {outputText && (
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                {mode === 'encode' ? 'Base64 结果' : '解码结果'}
                            </label>
                            <button
                                onClick={handleCopy}
                                className="text-primary text-sm hover:underline"
                            >
                                复制结果
                            </button>
                        </div>
                        <textarea
                            value={outputText}
                            readOnly
                            rows={6}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
                        />
                    </div>
                )}

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-4">图片转Base64</h3>
                    <div className="flex items-center gap-4">
                        <label className="flex-1 cursor-pointer">
                            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-primary transition-colors">
                                <svg className="mx-auto h-8 w-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p className="text-sm text-gray-600 dark:text-gray-400">点击选择图片文件</p>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileEncode}
                                className="hidden"
                            />
                        </label>
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">说明</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• Base64 是一种二进制到文本的编码方式</li>
                        <li>• 编码后数据体积会增加约 33%</li>
                        <li>• 常用于在文本协议中传输二进制数据</li>
                        <li>• 图片转Base64可用于CSS内嵌图片</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Base64Tool;

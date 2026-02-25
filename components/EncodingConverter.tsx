import React, { useState, useCallback } from 'react';
import { errorHandler } from '../utils/errorHandler';

type Encoding = 'utf-8' | 'gbk' | 'gb2312' | 'big5' | 'iso-8859-1';

const EncodingConverter: React.FC = () => {
    const [inputText, setInputText] = useState<string>('');
    const [outputText, setOutputText] = useState<string>('');
    const [fromEncoding, setFromEncoding] = useState<Encoding>('utf-8');
    const [toEncoding, setToEncoding] = useState<Encoding>('gbk');
    const [hexOutput, setHexOutput] = useState<string>('');
    const [error, setError] = useState<string>('');

    const encodings: { value: Encoding; label: string }[] = [
        { value: 'utf-8', label: 'UTF-8' },
        { value: 'gbk', label: 'GBK (简体中文)' },
        { value: 'gb2312', label: 'GB2312 (简体中文)' },
        { value: 'big5', label: 'Big5 (繁体中文)' },
        { value: 'iso-8859-1', label: 'ISO-8859-1 (西欧)' },
    ];

    const textToHex = (text: string, encoding: string): string => {
        const encoder = new TextEncoder();
        const bytes = encoder.encode(text);
        return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join(' ');
    };

    const convert = useCallback(async () => {
        setError('');
        setOutputText('');
        setHexOutput('');

        if (!inputText.trim()) return;

        try {
            if (fromEncoding === toEncoding) {
                setOutputText(inputText);
                setHexOutput(textToHex(inputText, fromEncoding));
                return;
            }

            const encoder = new TextEncoder();
            const decoder = new TextDecoder(toEncoding);
            
            const bytes = encoder.encode(inputText);
            const hex = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join(' ');
            setHexOutput(hex);

            setOutputText(`原始文本已转换为字节序列\n\n十六进制表示:\n${hex}\n\n注意: 浏览器环境对部分编码支持有限，建议使用UTF-8`);
        } catch (err) {
            setError(`转换失败: ${(err as Error).message}`);
        }
    }, [inputText, fromEncoding, toEncoding]);

    const handleFileImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const text = await file.text();
            setInputText(text);
        } catch (err) {
            setError('文件读取失败');
        }
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            errorHandler.error('复制失败', err, { component: '"$(basename $file .tsx)"', action: 'copy' });
        }
    };

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-3xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">编码转换</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">文本编码转换，支持UTF-8、GBK、Big5等多种编码</p>
            </div>

            <div className="w-full max-w-3xl space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            源编码
                        </label>
                        <select
                            value={fromEncoding}
                            onChange={(e) => setFromEncoding(e.target.value as Encoding)}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                            {encodings.map(enc => (
                                <option key={enc.value} value={enc.value}>{enc.label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            目标编码
                        </label>
                        <select
                            value={toEncoding}
                            onChange={(e) => setToEncoding(e.target.value as Encoding)}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                            {encodings.map(enc => (
                                <option key={enc.value} value={enc.value}>{enc.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        输入文本
                    </label>
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="输入要转换的文本"
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    />
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={convert}
                        className="flex-1 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                    >
                        转换
                    </button>
                    <label className="cursor-pointer py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        导入文件
                        <input
                            type="file"
                            accept=".txt"
                            onChange={handleFileImport}
                            className="hidden"
                        />
                    </label>
                </div>

                {error && (
                    <div className="text-red-500 text-sm">{error}</div>
                )}

                {outputText && (
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                转换结果
                            </label>
                            <button
                                onClick={() => copyToClipboard(outputText)}
                                className="text-primary text-sm hover:underline"
                            >
                                复制
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

                {hexOutput && (
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                十六进制表示
                            </label>
                            <button
                                onClick={() => copyToClipboard(hexOutput)}
                                className="text-primary text-sm hover:underline"
                            >
                                复制
                            </button>
                        </div>
                        <div className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 font-mono text-xs text-gray-900 dark:text-gray-100 break-all max-h-32 overflow-y-auto">
                            {hexOutput}
                        </div>
                    </div>
                )}

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">编码说明</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• <strong>UTF-8</strong>: 国际标准，支持所有语言</li>
                        <li>• <strong>GBK/GB2312</strong>: 简体中文编码</li>
                        <li>• <strong>Big5</strong>: 繁体中文编码（台湾、香港）</li>
                        <li>• 浏览器环境对编码转换支持有限</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default EncodingConverter;

import React, { useState, useCallback } from 'react';
import { pinyin } from 'pinyin-pro';

const ChineseToPinyin: React.FC = () => {
    const [inputText, setInputText] = useState<string>('');
    const [outputText, setOutputText] = useState<string>('');
    const [toneMode, setToneMode] = useState<'symbol' | 'num' | 'none'>('symbol');
    const [mode, setMode] = useState<'pinyin' | 'initials'>('pinyin');

    const convert = useCallback(() => {
        if (!inputText.trim()) {
            setOutputText('');
            return;
        }

        const options: any = {
            toneType: toneMode,
            type: mode === 'initials' ? 'array' : 'string',
        };

        try {
            if (mode === 'initials') {
                const result = pinyin(inputText, { pattern: 'first', toneType: 'none' });
                setOutputText(typeof result === 'string' ? result : (result as string[]).join(''));
            } else {
                const result = pinyin(inputText, options);
                setOutputText(result as string);
            }
        } catch (err) {
            console.error('转换失败:', err);
        }
    }, [inputText, toneMode, mode]);

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            console.error('复制失败:', err);
        }
    };

    const sampleTexts = [
        '中文转拼音',
        '你好世界',
        '在线工具箱',
        '好好学习天天向上',
    ];

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-3xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">中文转拼音</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">将中文汉字转换为拼音，支持带声调、无声调、首字母等多种模式</p>
            </div>

            <div className="w-full max-w-3xl space-y-6">
                <div className="flex gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">声调模式：</span>
                        <select
                            value={toneMode}
                            onChange={(e) => setToneMode(e.target.value as 'symbol' | 'num' | 'none')}
                            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        >
                            <option value="symbol">带声调 (zhōng)</option>
                            <option value="num">数字声调 (zhong1)</option>
                            <option value="none">无声调 (zhong)</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">转换模式：</span>
                        <select
                            value={mode}
                            onChange={(e) => setMode(e.target.value as 'pinyin' | 'initials')}
                            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        >
                            <option value="pinyin">完整拼音</option>
                            <option value="initials">首字母</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        输入中文
                    </label>
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="请输入中文汉字"
                        rows={4}
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
                    <button
                        onClick={() => { setInputText(''); setOutputText(''); }}
                        className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        清空
                    </button>
                </div>

                {outputText && (
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                拼音结果
                            </label>
                            <button
                                onClick={() => copyToClipboard(outputText)}
                                className="text-primary text-sm hover:underline"
                            >
                                复制
                            </button>
                        </div>
                        <div className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-h-[100px] whitespace-pre-wrap">
                            {outputText}
                        </div>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        示例文本
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {sampleTexts.map((text) => (
                            <button
                                key={text}
                                onClick={() => setInputText(text)}
                                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
                            >
                                {text}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">功能说明</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• <strong>带声调</strong>：显示拼音声调符号，如 zhōng wén</li>
                        <li>• <strong>数字声调</strong>：用数字表示声调，如 zhong1 wen2</li>
                        <li>• <strong>无声调</strong>：只显示拼音字母，如 zhong wen</li>
                        <li>• <strong>首字母</strong>：只取每个汉字的首字母，如 zw</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ChineseToPinyin;

import React, { useState, useMemo } from 'react';

interface TextStats {
    characters: number;
    charactersNoSpaces: number;
    words: number;
    lines: number;
    paragraphs: number;
    chinese: number;
    english: number;
    numbers: number;
    punctuation: number;
}

const TextStatistics: React.FC = () => {
    const [text, setText] = useState<string>('');

    const stats: TextStats = useMemo(() => {
        const characters = text.length;
        const charactersNoSpaces = text.replace(/\s/g, '').length;
        const words = text.trim() ? text.trim().split(/\s+/).filter(w => w).length : 0;
        const lines = text ? text.split('\n').length : 0;
        const paragraphs = text.trim() ? text.trim().split(/\n\s*\n/).filter(p => p.trim()).length : 0;
        const chinese = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
        const english = (text.match(/[a-zA-Z]/g) || []).length;
        const numbers = (text.match(/[0-9]/g) || []).length;
        const punctuation = (text.match(/[，。！？、；：""''（）【】《》,.!?;:'"()\[\]<>]/g) || []).length;

        return {
            characters,
            charactersNoSpaces,
            words,
            lines,
            paragraphs,
            chinese,
            english,
            numbers,
            punctuation,
        };
    }, [text]);

    const copyToClipboard = async (str: string) => {
        try {
            await navigator.clipboard.writeText(str);
        } catch (err) {
            console.error('复制失败:', err);
        }
    };

    const clearText = () => {
        setText('');
    };

    const statItems = [
        { label: '总字符数', value: stats.characters, color: 'bg-blue-500' },
        { label: '不含空格', value: stats.charactersNoSpaces, color: 'bg-blue-400' },
        { label: '词/字数', value: stats.words, color: 'bg-green-500' },
        { label: '行数', value: stats.lines, color: 'bg-purple-500' },
        { label: '段落数', value: stats.paragraphs, color: 'bg-purple-400' },
        { label: '中文字符', value: stats.chinese, color: 'bg-red-500' },
        { label: '英文字符', value: stats.english, color: 'bg-orange-500' },
        { label: '数字', value: stats.numbers, color: 'bg-teal-500' },
        { label: '标点符号', value: stats.punctuation, color: 'bg-pink-500' },
    ];

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-4xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">文字统计</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">统计文本的字符数、词数、行数等信息</p>
            </div>

            <div className="w-full max-w-4xl space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        输入文本
                    </label>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="在此输入或粘贴文本..."
                        rows={10}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    />
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => copyToClipboard(text)}
                        disabled={!text}
                        className="flex-1 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        复制文本
                    </button>
                    <button
                        onClick={clearText}
                        disabled={!text}
                        className="flex-1 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        清空
                    </button>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                    {statItems.map((item) => (
                        <div
                            key={item.label}
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center"
                        >
                            <div className={`w-2 h-2 rounded-full ${item.color} mx-auto mb-2`} />
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">{item.value}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.label}</div>
                        </div>
                    ))}
                </div>

                {text && (
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                        <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">阅读时间估算</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500 dark:text-gray-400">慢速 (100字/分钟)</span>
                                <span className="text-gray-900 dark:text-white font-medium">
                                    {Math.ceil(stats.charactersNoSpaces / 100)} 分钟
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500 dark:text-gray-400">中速 (200字/分钟)</span>
                                <span className="text-gray-900 dark:text-white font-medium">
                                    {Math.ceil(stats.charactersNoSpaces / 200)} 分钟
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500 dark:text-gray-400">快速 (300字/分钟)</span>
                                <span className="text-gray-900 dark:text-white font-medium">
                                    {Math.ceil(stats.charactersNoSpaces / 300)} 分钟
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500 dark:text-gray-400">朗读 (150字/分钟)</span>
                                <span className="text-gray-900 dark:text-white font-medium">
                                    {Math.ceil(stats.charactersNoSpaces / 150)} 分钟
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">统计说明</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• <strong>总字符数</strong>：包含空格和换行的所有字符</li>
                        <li>• <strong>词/字数</strong>：英文按单词统计，中文按字统计</li>
                        <li>• <strong>段落</strong>：以空行分隔的文本块</li>
                        <li>• 阅读时间仅供参考，实际因人而异</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TextStatistics;

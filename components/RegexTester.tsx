import React, { useState, useCallback, useRef } from 'react';
import { errorHandler } from '../utils/errorHandler';

interface MatchResult {
    matches: string[];
    groups: Record<string, string>[];
    count: number;
}

const RegexTester: React.FC = () => {
    const [pattern, setPattern] = useState<string>('');
    const [flags, setFlags] = useState<string>('g');
    const [text, setText] = useState<string>('');
    const [result, setResult] = useState<MatchResult | null>(null);
    const [error, setError] = useState<string>('');
    const [copied, setCopied] = useState(false);
    const textRef = useRef<HTMLPreElement>(null);

    const testRegex = useCallback(() => {
        setError('');
        setResult(null);

        if (!pattern) {
            setError('请输入正则表达式');
            return;
        }

        try {
            const regex = new RegExp(pattern, flags);
            const matches: string[] = [];
            const groups: Record<string, string>[] = [];

            if (flags.includes('g')) {
                let match;
                while ((match = regex.exec(text)) !== null) {
                    matches.push(match[0]);
                    if (match.groups) {
                        groups.push(match.groups);
                    }
                }
            } else {
                const match = regex.exec(text);
                if (match) {
                    matches.push(match[0]);
                    if (match.groups) {
                        groups.push(match.groups);
                    }
                }
            }

            setResult({ matches, groups, count: matches.length });
        } catch (err) {
            setError(`正则表达式错误: ${(err as Error).message}`);
        }
    }, [pattern, flags, text]);

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            errorHandler.error('复制失败', err, { component: '"$(basename $file .tsx)"', action: 'copy' });
        }
    };

    const toggleFlag = (flag: string) => {
        if (flags.includes(flag)) {
            setFlags(flags.replace(flag, ''));
        } else {
            setFlags(flags + flag);
        }
    };

    const flagDescriptions: Record<string, string> = {
        g: '全局匹配',
        i: '忽略大小写',
        m: '多行模式',
        s: '点匹配换行',
    };

    const highlightMatches = () => {
        if (!result || result.matches.length === 0) return text;
        
        let highlighted = text;
        try {
            const regex = new RegExp(`(${pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, flags.includes('g') ? flags : flags + 'g');
            highlighted = text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-600 rounded px-0.5">$1</mark>');
        } catch {
            // fallback
        }
        return highlighted;
    };

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-4xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">正则表达式测试</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">在线测试正则表达式，实时高亮匹配结果</p>
            </div>

            <div className="w-full max-w-4xl space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            正则表达式
                        </label>
                        <input
                            type="text"
                            value={pattern}
                            onChange={(e) => setPattern(e.target.value)}
                            placeholder="输入正则表达式，如：\d+"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-mono focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            修饰符
                        </label>
                        <div className="flex gap-2">
                            {['g', 'i', 'm', 's'].map((flag) => (
                                <button
                                    key={flag}
                                    onClick={() => toggleFlag(flag)}
                                    className={`w-12 h-12 rounded-lg font-mono font-bold transition-colors ${
                                        flags.includes(flag)
                                            ? 'bg-primary text-white'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                    }`}
                                    title={flagDescriptions[flag]}
                                >
                                    {flag}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        测试文本
                    </label>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="输入要匹配的文本"
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    />
                </div>

                <button
                    onClick={testRegex}
                    className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                    测试匹配
                </button>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg">
                        {error}
                    </div>
                )}

                {result && !error && (
                    <div className="space-y-4">
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                                <span className="font-medium text-blue-600 dark:text-blue-400">
                                    匹配到 {result.count} 个结果
                                </span>
                                <button
                                    onClick={() => copyToClipboard(result.matches.join('\n'))}
                                    className={`text-sm ${copied ? 'text-green-500' : 'text-primary hover:underline'}`}
                                >
                                    {copied ? '已复制' : '复制结果'}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                匹配高亮
                            </label>
                            <pre
                                ref={textRef}
                                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 overflow-x-auto whitespace-pre-wrap"
                                dangerouslySetInnerHTML={{ __html: highlightMatches() }}
                            />
                        </div>

                        {result.matches.length > 0 && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    匹配结果列表
                                </label>
                                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg divide-y divide-gray-200 dark:divide-gray-700 max-h-48 overflow-y-auto">
                                    {result.matches.map((match, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between px-4 py-2"
                                        >
                                            <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">#{index + 1}</span>
                                            <code className="font-mono text-sm text-gray-900 dark:text-gray-100 flex-1 truncate">
                                                {match}
                                            </code>
                                            <button
                                                onClick={() => copyToClipboard(match)}
                                                className="text-primary text-sm hover:underline ml-2"
                                            >
                                                复制
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">常用正则表达式</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        {[
                            { name: '邮箱', pattern: '[\\w.-]+@[\\w.-]+\\.\\w+' },
                            { name: '手机号', pattern: '1[3-9]\\d{9}' },
                            { name: '网址', pattern: 'https?://[\\w./-]+' },
                            { name: 'IP地址', pattern: '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}' },
                            { name: '数字', pattern: '\\d+' },
                            { name: '中文字符', pattern: '[\\u4e00-\\u9fa5]+' },
                        ].map(({ name, pattern: p }) => (
                            <button
                                key={name}
                                onClick={() => {
                                    setPattern(p);
                                    setFlags('g');
                                }}
                                className="text-left px-3 py-2 rounded bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-primary transition-colors"
                            >
                                <span className="text-gray-500 dark:text-gray-400">{name}:</span>{' '}
                                <code className="text-primary">{p}</code>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegexTester;

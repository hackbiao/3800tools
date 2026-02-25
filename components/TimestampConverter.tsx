import React, { useState, useEffect } from 'react';
import { errorHandler } from '../utils/errorHandler';

const TimestampConverter: React.FC = () => {
    const [timestamp, setTimestamp] = useState<string>('');
    const [datetime, setDatetime] = useState<string>('');
    const [currentTime, setCurrentTime] = useState<number>(Date.now());
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(Date.now());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatDateTime = (date: Date): string => {
        return date.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        });
    };

    const parseDatetimeLocal = (dateStr: string): Date | null => {
        const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/);
        if (!match) return null;
        return new Date(
            parseInt(match[1]),
            parseInt(match[2]) - 1,
            parseInt(match[3]),
            parseInt(match[4]),
            parseInt(match[5])
        );
    };

    const handleTimestampChange = (value: string) => {
        setTimestamp(value);
        setError('');
        if (!value.trim()) {
            setDatetime('');
            return;
        }
        const ts = parseInt(value);
        if (isNaN(ts)) {
            setError('请输入有效的时间戳');
            return;
        }
        let date: Date;
        if (value.length <= 10) {
            date = new Date(ts * 1000);
        } else {
            date = new Date(ts);
        }
        if (isNaN(date.getTime())) {
            setError('请输入有效的时间戳');
            return;
        }
        setDatetime(formatDateTime(date));
    };

    const handleDatetimeChange = (value: string) => {
        setDatetime(value);
        setError('');
        if (!value.trim()) {
            setTimestamp('');
            return;
        }
        const date = parseDatetimeLocal(value);
        if (!date || isNaN(date.getTime())) {
            setError('请输入有效的日期时间');
            return;
        }
        setTimestamp(Math.floor(date.getTime() / 1000).toString());
    };

    const setCurrentTimestamp = () => {
        const ts = Math.floor(Date.now() / 1000);
        setTimestamp(ts.toString());
        handleTimestampChange(ts.toString());
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            errorHandler.error('复制失败', err, { component: '"$(basename $file .tsx)"', action: 'copy' });
        }
    };

    const dateStr = datetime ? `${datetime.split(' ')[0].replace(/\//g, '-')}T${datetime.split(' ')[1]}` : '';

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-3xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">Unix时间戳转换</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">时间戳与日期时间互转，支持秒级和毫秒级时间戳</p>
            </div>

            <div className="w-full max-w-3xl space-y-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">当前时间戳</span>
                        <span className="font-mono text-lg text-blue-600 dark:text-blue-400">
                            {Math.floor(currentTime / 1000)}
                        </span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-gray-600 dark:text-gray-300">当前时间</span>
                        <span className="text-gray-800 dark:text-gray-200">{formatDateTime(new Date())}</span>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Unix 时间戳（秒/毫秒）
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={timestamp}
                            onChange={(e) => handleTimestampChange(e.target.value)}
                            placeholder="输入时间戳，如：1609459200"
                            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <button
                            onClick={setCurrentTimestamp}
                            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            当前
                        </button>
                    </div>
                </div>

                <div className="flex justify-center">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        日期时间
                    </label>
                    <input
                        type="datetime-local"
                        value={dateStr}
                        onChange={(e) => handleDatetimeChange(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                </div>

                {error && (
                    <div className="text-red-500 text-sm">{error}</div>
                )}

                {timestamp && !error && (
                    <div className="space-y-4">
                        <h3 className="font-medium text-gray-900 dark:text-gray-100">转换结果</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-500 dark:text-gray-400">秒级时间戳</span>
                                    <button
                                        onClick={() => copyToClipboard(timestamp.length > 10 ? timestamp.slice(0, 10) : timestamp)}
                                        className="text-primary text-sm hover:underline"
                                    >
                                        复制
                                    </button>
                                </div>
                                <div className="font-mono text-lg text-gray-900 dark:text-gray-100">
                                    {timestamp.length > 10 ? timestamp.slice(0, 10) : timestamp}
                                </div>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-500 dark:text-gray-400">毫秒级时间戳</span>
                                    <button
                                        onClick={() => copyToClipboard(timestamp.length <= 10 ? timestamp + '000' : timestamp)}
                                        className="text-primary text-sm hover:underline"
                                    >
                                        复制
                                    </button>
                                </div>
                                <div className="font-mono text-lg text-gray-900 dark:text-gray-100">
                                    {timestamp.length <= 10 ? timestamp + '000' : timestamp}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">说明</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• Unix 时间戳是从 1970-01-01 00:00:00 UTC 开始的秒数</li>
                        <li>• 秒级时间戳为 10 位数字，毫秒级为 13 位</li>
                        <li>• 自动识别秒级和毫秒级时间戳</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TimestampConverter;

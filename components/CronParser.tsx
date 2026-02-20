import React, { useState } from 'react';

const CronParser: React.FC = () => {
    const [cronExpression, setCronExpression] = useState<string>('0 0 * * *');
    const [description, setDescription] = useState<string>('');
    const [nextTimes, setNextTimes] = useState<Date[]>([]);
    const [error, setError] = useState<string>('');

    const parseCronField = (field: string, min: number, max: number): number[] => {
        const values: number[] = [];
        
        if (field === '*') {
            for (let i = min; i <= max; i++) values.push(i);
            return values;
        }

        if (field.includes('/')) {
            const [base, step] = field.split('/');
            const stepNum = parseInt(step);
            let start = min;
            
            if (base !== '*') {
                start = parseInt(base);
            }
            
            for (let i = start; i <= max; i += stepNum) {
                values.push(i);
            }
            return values;
        }

        if (field.includes('-')) {
            const [start, end] = field.split('-').map(Number);
            for (let i = start; i <= end; i++) values.push(i);
            return values;
        }

        if (field.includes(',')) {
            return field.split(',').map(Number);
        }

        return [parseInt(field)];
    };

    const generateDescription = (parts: string[]): string => {
        const [min, hour, dayOfMonth, month, dayOfWeek] = parts;
        const desc: string[] = [];

        if (min === '*' && hour === '*' && dayOfMonth === '*' && month === '*' && dayOfWeek === '*') {
            return '每分钟执行';
        }

        if (hour === '*' && dayOfMonth === '*' && month === '*' && dayOfWeek === '*') {
            if (min === '0') return '每小时整点执行';
            return `每小时的第 ${min} 分钟执行`;
        }

        if (dayOfMonth === '*' && month === '*' && dayOfWeek === '*') {
            if (min === '0' && hour === '0') return '每天凌晨 00:00 执行';
            return `每天 ${hour.padStart(2, '0')}:${min.padStart(2, '0')} 执行`;
        }

        if (month === '*' && dayOfWeek === '*') {
            return `每月 ${dayOfMonth} 号 ${hour.padStart(2, '0')}:${min.padStart(2, '0')} 执行`;
        }

        if (month === '*' && dayOfMonth === '*') {
            const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
            return `每${weekDays[parseInt(dayOfWeek)]} ${hour.padStart(2, '0')}:${min.padStart(2, '0')} 执行`;
        }

        return `在 ${hour.padStart(2, '0')}:${min.padStart(2, '0')} 执行`;
    };

    const calculateNextTimes = (parts: string[]): Date[] => {
        const times: Date[] = [];
        const now = new Date();
        now.setSeconds(0);
        now.setMilliseconds(0);

        const minutes = parseCronField(parts[0], 0, 59);
        const hours = parseCronField(parts[1], 0, 23);
        const daysOfMonth = parseCronField(parts[2], 1, 31);
        const months = parseCronField(parts[3], 1, 12);
        const daysOfWeek = parseCronField(parts[4], 0, 6);

        let current = new Date(now.getTime() + 60000);
        let attempts = 0;

        while (times.length < 5 && attempts < 1000) {
            attempts++;
            
            if (!months.includes(current.getMonth() + 1)) {
                current.setMonth(current.getMonth() + 1);
                current.setDate(1);
                current.setHours(0, 0, 0, 0);
                continue;
            }

            if (!daysOfMonth.includes(current.getDate())) {
                current.setDate(current.getDate() + 1);
                current.setHours(0, 0, 0, 0);
                continue;
            }

            if (!daysOfWeek.includes(current.getDay())) {
                current.setDate(current.getDate() + 1);
                current.setHours(0, 0, 0, 0);
                continue;
            }

            if (!hours.includes(current.getHours())) {
                current.setHours(current.getHours() + 1);
                current.setMinutes(0, 0, 0);
                continue;
            }

            if (!minutes.includes(current.getMinutes())) {
                current.setMinutes(current.getMinutes() + 1);
                continue;
            }

            times.push(new Date(current.getTime()));
            current.setMinutes(current.getMinutes() + 1);
        }

        return times;
    };

    const parseCron = () => {
        setError('');
        setDescription('');
        setNextTimes([]);

        const parts = cronExpression.trim().split(/\s+/);
        
        if (parts.length !== 5) {
            setError('Cron 表达式必须有5个字段（分 时 日 月 周）');
            return;
        }

        try {
            const desc = generateDescription(parts);
            setDescription(desc);
            
            const times = calculateNextTimes(parts);
            setNextTimes(times);
        } catch (err) {
            setError(`解析失败: ${(err as Error).message}`);
        }
    };

    const formatDate = (date: Date): string => {
        return date.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            weekday: 'short',
        });
    };

    const commonExpressions = [
        { expr: '0 * * * *', desc: '每小时整点' },
        { expr: '0 0 * * *', desc: '每天凌晨' },
        { expr: '0 9 * * 1-5', desc: '工作日早上9点' },
        { expr: '0 0 1 * *', desc: '每月1号凌晨' },
        { expr: '*/10 * * * *', desc: '每10分钟' },
        { expr: '0 0 * * 0', desc: '每周日凌晨' },
    ];

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-3xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">Cron 表达式解析</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">解析Cron定时任务表达式，显示下次执行时间</p>
            </div>

            <div className="w-full max-w-3xl space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Cron 表达式
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={cronExpression}
                            onChange={(e) => setCronExpression(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && parseCron()}
                            placeholder="分 时 日 月 周，如：0 0 * * *"
                            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-mono text-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <button
                            onClick={parseCron}
                            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                        >
                            解析
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="text-red-500 text-sm">{error}</div>
                )}

                {description && (
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-green-600 dark:text-green-400">check_circle</span>
                            <span className="font-medium text-green-700 dark:text-green-300">{description}</span>
                        </div>
                    </div>
                )}

                {nextTimes.length > 0 && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            下次执行时间
                        </label>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
                            {nextTimes.map((time, index) => (
                                <div key={index} className="flex items-center justify-between px-4 py-3">
                                    <span className="text-sm text-gray-500 dark:text-gray-400">第 {index + 1} 次</span>
                                    <span className="font-mono text-gray-900 dark:text-gray-100">{formatDate(time)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">常用表达式</h3>
                    <div className="grid grid-cols-2 gap-2">
                        {commonExpressions.map(({ expr, desc }) => (
                            <button
                                key={expr}
                                onClick={() => {
                                    setCronExpression(expr);
                                    parseCron();
                                }}
                                className="text-left px-3 py-2 rounded bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-primary transition-colors"
                            >
                                <code className="text-primary text-sm">{expr}</code>
                                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">{desc}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">表达式格式</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-gray-600 dark:text-gray-300">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <th className="text-left py-2 font-medium">字段</th>
                                    <th className="text-left py-2 font-medium">允许值</th>
                                    <th className="text-left py-2 font-medium">特殊字符</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <td className="py-2">分钟</td>
                                    <td className="py-2">0-59</td>
                                    <td className="py-2">* / , -</td>
                                </tr>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <td className="py-2">小时</td>
                                    <td className="py-2">0-23</td>
                                    <td className="py-2">* / , -</td>
                                </tr>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <td className="py-2">日期</td>
                                    <td className="py-2">1-31</td>
                                    <td className="py-2">* / , -</td>
                                </tr>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <td className="py-2">月份</td>
                                    <td className="py-2">1-12</td>
                                    <td className="py-2">* / , -</td>
                                </tr>
                                <tr>
                                    <td className="py-2">星期</td>
                                    <td className="py-2">0-7 (0和7为周日)</td>
                                    <td className="py-2">* / , -</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CronParser;

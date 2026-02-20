import React, { useState } from 'react';

type Operation = 'diff' | 'add' | 'sub';

const DateCalculator: React.FC = () => {
    const [mode, setMode] = useState<'diff' | 'calc'>('diff');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [baseDate, setBaseDate] = useState<string>('');
    const [operation, setOperation] = useState<Operation>('add');
    const [amount, setAmount] = useState<string>('1');
    const [unit, setUnit] = useState<'days' | 'weeks' | 'months' | 'years'>('days');
    const [result, setResult] = useState<{ years: number; months: number; days: number; totalDays: number } | null>(null);
    const [calcResult, setCalcResult] = useState<string>('');

    const calculateDiff = () => {
        if (!startDate || !endDate) return;

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) return;

        let years = end.getFullYear() - start.getFullYear();
        let months = end.getMonth() - start.getMonth();
        let days = end.getDate() - start.getDate();

        if (days < 0) {
            months--;
            const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
            days += prevMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        const totalDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

        setResult({ years, months, days, totalDays: Math.abs(totalDays) });
    };

    const calculateDate = () => {
        if (!baseDate || !amount) return;

        const base = new Date(baseDate);
        if (isNaN(base.getTime())) return;

        const num = parseInt(amount);
        if (isNaN(num)) return;

        const result = new Date(base);

        switch (unit) {
            case 'days':
                result.setDate(result.getDate() + (operation === 'add' ? num : -num));
                break;
            case 'weeks':
                result.setDate(result.getDate() + (operation === 'add' ? num * 7 : -num * 7));
                break;
            case 'months':
                result.setMonth(result.getMonth() + (operation === 'add' ? num : -num));
                break;
            case 'years':
                result.setFullYear(result.getFullYear() + (operation === 'add' ? num : -num));
                break;
        }

        setCalcResult(result.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
        }));
    };

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-3xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">日期计算器</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">计算日期间隔、推算日期，支持加减天数、月份、年份</p>
            </div>

            <div className="w-full max-w-3xl space-y-6">
                <div className="flex gap-2">
                    <button
                        onClick={() => { setMode('diff'); setResult(null); }}
                        className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                            mode === 'diff'
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                    >
                        日期间隔
                    </button>
                    <button
                        onClick={() => { setMode('calc'); setCalcResult(''); }}
                        className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                            mode === 'calc'
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                    >
                        日期推算
                    </button>
                </div>

                {mode === 'diff' ? (
                    <>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    开始日期
                                </label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    结束日期
                                </label>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>
                        </div>

                        <button
                            onClick={calculateDiff}
                            disabled={!startDate || !endDate}
                            className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            计算间隔
                        </button>

                        {result && (
                            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <div className="text-3xl font-bold text-primary">{result.years}</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">年</div>
                                    </div>
                                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <div className="text-3xl font-bold text-primary">{result.months}</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">月</div>
                                    </div>
                                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <div className="text-3xl font-bold text-primary">{result.days}</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">天</div>
                                    </div>
                                    <div className="text-center p-4 bg-primary/10 dark:bg-primary/20 rounded-lg">
                                        <div className="text-3xl font-bold text-primary">{result.totalDays}</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">总天数</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                基准日期
                            </label>
                            <input
                                type="date"
                                value={baseDate}
                                onChange={(e) => setBaseDate(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    操作
                                </label>
                                <select
                                    value={operation}
                                    onChange={(e) => setOperation(e.target.value as Operation)}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                                >
                                    <option value="add">往后推</option>
                                    <option value="sub">往前推</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    数量
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    单位
                                </label>
                                <select
                                    value={unit}
                                    onChange={(e) => setUnit(e.target.value as typeof unit)}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                                >
                                    <option value="days">天</option>
                                    <option value="weeks">周</option>
                                    <option value="months">月</option>
                                    <option value="years">年</option>
                                </select>
                            </div>
                        </div>

                        <button
                            onClick={calculateDate}
                            disabled={!baseDate || !amount}
                            className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            计算日期
                        </button>

                        {calcResult && (
                            <div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-6 text-center">
                                <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">计算结果</div>
                                <div className="text-xl font-bold text-primary">{calcResult}</div>
                            </div>
                        )}
                    </>
                )}

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">使用说明</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• <strong>日期间隔</strong>：计算两个日期之间相差多少年月日</li>
                        <li>• <strong>日期推算</strong>：从某日期加减天数、周数、月数或年数</li>
                        <li>• 支持往前推算和往后推算</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DateCalculator;

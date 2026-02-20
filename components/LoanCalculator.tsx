import React, { useState, useCallback } from 'react';

interface LoanResult {
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
}

const LoanCalculator: React.FC = () => {
    const [principal, setPrincipal] = useState<string>('10000');
    const [rate, setRate] = useState<string>('5');
    const [term, setTerm] = useState<string>('12');
    const [termUnit, setTermUnit] = useState<'months' | 'years'>('months');
    const [result, setResult] = useState<LoanResult | null>(null);

    const calculate = useCallback(() => {
        const p = parseFloat(principal);
        const r = parseFloat(rate) / 100 / 12;
        let t = parseInt(term);
        
        if (termUnit === 'years') {
            t *= 12;
        }

        if (!p || !r || !t || p <= 0 || r <= 0 || t <= 0) {
            return;
        }

        const monthlyPayment = (p * r * Math.pow(1 + r, t)) / (Math.pow(1 + r, t) - 1);
        const totalPayment = monthlyPayment * t;
        const totalInterest = totalPayment - p;

        setResult({
            monthlyPayment: Math.round(monthlyPayment * 100) / 100,
            totalPayment: Math.round(totalPayment * 100) / 100,
            totalInterest: Math.round(totalInterest * 100) / 100,
        });
    }, [principal, rate, term, termUnit]);

    const formatMoney = (value: number): string => {
        return value.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-3xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">贷款计算器</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">计算各类贷款的月供、总利息，通用贷款计算工具</p>
            </div>

            <div className="w-full max-w-3xl space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        贷款金额（元）
                    </label>
                    <input
                        type="number"
                        value={principal}
                        onChange={(e) => setPrincipal(e.target.value)}
                        placeholder="输入贷款金额"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        年利率（%）
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        placeholder="输入年利率"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            贷款期限
                        </label>
                        <input
                            type="number"
                            value={term}
                            onChange={(e) => setTerm(e.target.value)}
                            placeholder="输入期限"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            期限单位
                        </label>
                        <select
                            value={termUnit}
                            onChange={(e) => setTermUnit(e.target.value as 'months' | 'years')}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                            <option value="months">月</option>
                            <option value="years">年</option>
                        </select>
                    </div>
                </div>

                <button
                    onClick={calculate}
                    className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                    计算
                </button>

                {result && (
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                        <div className="bg-primary/10 dark:bg-primary/20 px-4 py-4 text-center">
                            <div className="text-sm text-gray-600 dark:text-gray-400">每月还款</div>
                            <div className="text-3xl font-bold text-primary">
                                ¥{formatMoney(result.monthlyPayment)}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 divide-x divide-gray-200 dark:divide-gray-700">
                            <div className="p-4 text-center">
                                <div className="text-sm text-gray-500 dark:text-gray-400">还款总额</div>
                                <div className="text-xl font-bold text-gray-900 dark:text-white">
                                    ¥{formatMoney(result.totalPayment)}
                                </div>
                            </div>
                            <div className="p-4 text-center">
                                <div className="text-sm text-gray-500 dark:text-gray-400">利息总额</div>
                                <div className="text-xl font-bold text-red-500">
                                    ¥{formatMoney(result.totalInterest)}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">使用说明</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• 适用于车贷、消费贷、经营贷等各类贷款</li>
                        <li>• 采用等额本息还款方式计算</li>
                        <li>• 利息总额 = 还款总额 - 贷款本金</li>
                        <li>• 房贷计算请使用专门的房贷计算器</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default LoanCalculator;

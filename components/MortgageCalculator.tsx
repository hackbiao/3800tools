import React, { useState, useCallback, useMemo } from 'react';

type RepaymentMethod = 'equal-payment' | 'equal-principal';

interface CalculationResult {
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
    schedule: Array<{
        month: number;
        payment: number;
        principal: number;
        interest: number;
        remainingPrincipal: number;
    }>;
}

const MortgageCalculator: React.FC = () => {
    const [loanAmount, setLoanAmount] = useState<string>('100');
    const [loanTerm, setLoanTerm] = useState<string>('30');
    const [interestRate, setInterestRate] = useState<string>('3.1');
    const [method, setMethod] = useState<RepaymentMethod>('equal-payment');
    const [showSchedule, setShowSchedule] = useState(false);

    const calculateEqualPayment = useCallback((principal: number, months: number, rate: number): CalculationResult => {
        const monthlyRate = rate / 100 / 12;
        const monthlyPayment = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
        const totalPayment = monthlyPayment * months;
        const totalInterest = totalPayment - principal;

        const schedule: CalculationResult['schedule'] = [];
        let remainingPrincipal = principal;

        for (let i = 1; i <= months; i++) {
            const interest = remainingPrincipal * monthlyRate;
            const principalPaid = monthlyPayment - interest;
            remainingPrincipal -= principalPaid;

            schedule.push({
                month: i,
                payment: monthlyPayment,
                principal: principalPaid,
                interest: interest,
                remainingPrincipal: Math.max(0, remainingPrincipal),
            });
        }

        return { monthlyPayment, totalPayment, totalInterest, schedule };
    }, []);

    const calculateEqualPrincipal = useCallback((principal: number, months: number, rate: number): CalculationResult => {
        const monthlyRate = rate / 100 / 12;
        const monthlyPrincipal = principal / months;
        let totalInterest = 0;
        const schedule: CalculationResult['schedule'] = [];
        let remainingPrincipal = principal;

        for (let i = 1; i <= months; i++) {
            const interest = remainingPrincipal * monthlyRate;
            totalInterest += interest;
            const payment = monthlyPrincipal + interest;
            remainingPrincipal -= monthlyPrincipal;

            schedule.push({
                month: i,
                payment: payment,
                principal: monthlyPrincipal,
                interest: interest,
                remainingPrincipal: Math.max(0, remainingPrincipal),
            });
        }

        const totalPayment = principal + totalInterest;
        const monthlyPayment = schedule[0]?.payment || 0;

        return { monthlyPayment, totalPayment, totalInterest, schedule };
    }, []);

    const result = useMemo(() => {
        const amount = parseFloat(loanAmount) * 10000;
        const term = parseInt(loanTerm) * 12;
        const rate = parseFloat(interestRate);

        if (!amount || !term || !rate) return null;

        return method === 'equal-payment'
            ? calculateEqualPayment(amount, term, rate)
            : calculateEqualPrincipal(amount, term, rate);
    }, [loanAmount, loanTerm, interestRate, method, calculateEqualPayment, calculateEqualPrincipal]);

    const formatMoney = (value: number) => {
        return value.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const displaySchedule = result?.schedule.slice(0, showSchedule ? undefined : 6) || [];

    return (
        <div className="flex w-full flex-col items-center px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-4xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">
                    房贷计算器
                </p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                    支持等额本息、等额本金两种还款方式，精确计算月供、利息
                </p>
            </div>

            <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 输入区域 */}
                <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/20 shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        贷款信息
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                贷款金额（万元）
                            </label>
                            <input
                                type="number"
                                value={loanAmount}
                                onChange={(e) => setLoanAmount(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary"
                                placeholder="请输入贷款金额"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                贷款期限（年）
                            </label>
                            <select
                                value={loanTerm}
                                onChange={(e) => setLoanTerm(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary"
                            >
                                <option value="5">5年</option>
                                <option value="10">10年</option>
                                <option value="15">15年</option>
                                <option value="20">20年</option>
                                <option value="25">25年</option>
                                <option value="30">30年</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                年利率（%）
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                value={interestRate}
                                onChange={(e) => setInterestRate(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary"
                                placeholder="请输入年利率"
                            />
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                当前公积金贷款利率约2.85%，商业贷款利率约3.1%
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                还款方式
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => setMethod('equal-payment')}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        method === 'equal-payment'
                                            ? 'bg-primary text-white'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                    }`}
                                >
                                    等额本息
                                </button>
                                <button
                                    onClick={() => setMethod('equal-principal')}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        method === 'equal-principal'
                                            ? 'bg-primary text-white'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                    }`}
                                >
                                    等额本金
                                </button>
                            </div>
                            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                {method === 'equal-payment'
                                    ? '等额本息：每月还款金额固定，适合收入稳定的人群'
                                    : '等额本金：每月还款金额递减，前期压力较大，总利息较少'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* 结果区域 */}
                <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/20 shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        计算结果
                    </h3>

                    {result ? (
                        <div className="space-y-4">
                            <div className="p-4 bg-primary/10 rounded-xl">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {method === 'equal-payment' ? '每月还款' : '首月还款'}
                                </p>
                                <p className="text-3xl font-bold text-primary">
                                    ¥{formatMoney(result.monthlyPayment)}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">贷款总额</p>
                                    <p className="text-xl font-semibold text-gray-900 dark:text-white">
                                        ¥{formatMoney(parseFloat(loanAmount) * 10000)}
                                    </p>
                                </div>
                                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">还款总额</p>
                                    <p className="text-xl font-semibold text-gray-900 dark:text-white">
                                        ¥{formatMoney(result.totalPayment)}
                                    </p>
                                </div>
                                <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">支付利息</p>
                                    <p className="text-xl font-semibold text-orange-600 dark:text-orange-400">
                                        ¥{formatMoney(result.totalInterest)}
                                    </p>
                                </div>
                                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">还款月数</p>
                                    <p className="text-xl font-semibold text-gray-900 dark:text-white">
                                        {parseInt(loanTerm) * 12}个月
                                    </p>
                                </div>
                            </div>

                            {method === 'equal-principal' && (
                                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">末月还款</p>
                                    <p className="text-xl font-semibold text-gray-900 dark:text-white">
                                        ¥{formatMoney(result.schedule[result.schedule.length - 1]?.payment || 0)}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        每月递减 ¥{formatMoney(result.schedule[0]?.payment - result.schedule[1]?.payment || 0)}
                                    </p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            请输入贷款信息
                        </div>
                    )}
                </div>
            </div>

            {/* 还款明细 */}
            {result && (
                <div className="w-full max-w-4xl mt-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/20 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            还款明细
                        </h3>
                        <button
                            onClick={() => setShowSchedule(!showSchedule)}
                            className="text-sm text-primary hover:underline"
                        >
                            {showSchedule ? '收起' : '查看全部'}
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">期数</th>
                                    <th className="px-4 py-2 text-right text-gray-600 dark:text-gray-400">月供</th>
                                    <th className="px-4 py-2 text-right text-gray-600 dark:text-gray-400">本金</th>
                                    <th className="px-4 py-2 text-right text-gray-600 dark:text-gray-400">利息</th>
                                    <th className="px-4 py-2 text-right text-gray-600 dark:text-gray-400">剩余本金</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displaySchedule.map((item) => (
                                    <tr key={item.month} className="border-b border-gray-100 dark:border-gray-700/50">
                                        <td className="px-4 py-2 text-gray-900 dark:text-white">第{item.month}期</td>
                                        <td className="px-4 py-2 text-right text-gray-900 dark:text-white">¥{formatMoney(item.payment)}</td>
                                        <td className="px-4 py-2 text-right text-gray-900 dark:text-white">¥{formatMoney(item.principal)}</td>
                                        <td className="px-4 py-2 text-right text-orange-600 dark:text-orange-400">¥{formatMoney(item.interest)}</td>
                                        <td className="px-4 py-2 text-right text-gray-600 dark:text-gray-400">¥{formatMoney(item.remainingPrincipal)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* 说明 */}
            <div className="w-full max-w-4xl mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">计算说明</h4>
                <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                    <li>• 等额本息：每月还款金额相同，包含本金和利息，前期还息多、后期还本多</li>
                    <li>• 等额本金：每月偿还相同本金，利息逐月递减，总利息较等额本息少</li>
                    <li>• 利率以实际银行放款利率为准，本计算结果仅供参考</li>
                </ul>
            </div>
        </div>
    );
};

export default MortgageCalculator;

import React, { useState, useMemo } from 'react';

interface TaxResult {
    taxableIncome: number;
    tax: number;
    afterTax: number;
    rate: number;
    quickDeduction: number;
}

const TAX_BRACKETS = [
    { min: 0, max: 3000, rate: 3, quickDeduction: 0 },
    { min: 3000, max: 12000, rate: 10, quickDeduction: 210 },
    { min: 12000, max: 25000, rate: 20, quickDeduction: 1410 },
    { min: 25000, max: 35000, rate: 25, quickDeduction: 2660 },
    { min: 35000, max: 55000, rate: 30, quickDeduction: 4410 },
    { min: 55000, max: 80000, rate: 35, quickDeduction: 7160 },
    { min: 80000, max: Infinity, rate: 45, quickDeduction: 15160 },
];

const TaxCalculator: React.FC = () => {
    const [salary, setSalary] = useState<string>('15000');
    const [threshold, setThreshold] = useState<string>('5000');
    const [socialSecurity, setSocialSecurity] = useState<string>('1500');
    const [specialDeduction, setSpecialDeduction] = useState<string>('1000');

    const result = useMemo((): TaxResult | null => {
        const salaryNum = parseFloat(salary);
        const thresholdNum = parseFloat(threshold);
        const socialNum = parseFloat(socialSecurity);
        const specialNum = parseFloat(specialDeduction);

        if (!salaryNum) return null;

        const taxableIncome = Math.max(0, salaryNum - thresholdNum - socialNum - specialNum);
        
        let tax = 0;
        let rate = 0;
        let quickDeduction = 0;

        for (const bracket of TAX_BRACKETS) {
            if (taxableIncome > bracket.min) {
                rate = bracket.rate;
                quickDeduction = bracket.quickDeduction;
            }
        }

        tax = taxableIncome * rate / 100 - quickDeduction;
        tax = Math.max(0, tax);

        const afterTax = salaryNum - socialNum - tax;

        return { taxableIncome, tax, afterTax, rate, quickDeduction };
    }, [salary, threshold, socialSecurity, specialDeduction]);

    const formatMoney = (value: number) => {
        return value.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    return (
        <div className="flex w-full flex-col items-center px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-4xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">
                    个税计算器
                </p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                    计算个人所得税，支持专项扣除和起征点设置
                </p>
            </div>

            <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 输入区域 */}
                <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/20 shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        收入信息
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                税前月薪（元）
                            </label>
                            <input
                                type="number"
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary"
                                placeholder="请输入税前月薪"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                起征点（元）
                            </label>
                            <input
                                type="number"
                                value={threshold}
                                onChange={(e) => setThreshold(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary"
                            />
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">目前个税起征点为5000元</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                五险一金（元）
                            </label>
                            <input
                                type="number"
                                value={socialSecurity}
                                onChange={(e) => setSocialSecurity(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary"
                                placeholder="每月五险一金个人缴纳部分"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                专项附加扣除（元）
                            </label>
                            <input
                                type="number"
                                value={specialDeduction}
                                onChange={(e) => setSpecialDeduction(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary"
                                placeholder="子女教育、住房贷款等"
                            />
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                包括子女教育、继续教育、住房贷款利息、住房租金、赡养老人等
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
                                <p className="text-sm text-gray-600 dark:text-gray-400">税后收入</p>
                                <p className="text-3xl font-bold text-primary">
                                    ¥{formatMoney(result.afterTax)}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">应纳税所得额</p>
                                    <p className="text-xl font-semibold text-gray-900 dark:text-white">
                                        ¥{formatMoney(result.taxableIncome)}
                                    </p>
                                </div>
                                <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">应缴个税</p>
                                    <p className="text-xl font-semibold text-orange-600 dark:text-orange-400">
                                        ¥{formatMoney(result.tax)}
                                    </p>
                                </div>
                            </div>

                            <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <p className="text-sm text-gray-600 dark:text-gray-400">适用税率</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xl font-semibold text-gray-900 dark:text-white">
                                        {result.rate}%
                                    </span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        速算扣除数：¥{result.quickDeduction}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            请输入收入信息
                        </div>
                    )}
                </div>
            </div>

            {/* 税率表 */}
            <div className="w-full max-w-4xl mt-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/20 shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    个税税率表（月度）
                </h3>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">应纳税所得额</th>
                                <th className="px-4 py-2 text-center text-gray-600 dark:text-gray-400">税率</th>
                                <th className="px-4 py-2 text-right text-gray-600 dark:text-gray-400">速算扣除数</th>
                            </tr>
                        </thead>
                        <tbody>
                            {TAX_BRACKETS.map((bracket, index) => (
                                <tr 
                                    key={index} 
                                    className={`border-b border-gray-100 dark:border-gray-700/50 ${
                                        result && result.rate === bracket.rate ? 'bg-primary/10' : ''
                                    }`}
                                >
                                    <td className="px-4 py-2 text-gray-900 dark:text-white">
                                        {bracket.max === Infinity 
                                            ? `超过 ${bracket.min.toLocaleString()} 元`
                                            : `${bracket.min.toLocaleString()} - ${bracket.max.toLocaleString()} 元`}
                                    </td>
                                    <td className="px-4 py-2 text-center text-gray-900 dark:text-white">{bracket.rate}%</td>
                                    <td className="px-4 py-2 text-right text-gray-900 dark:text-white">
                                        ¥{bracket.quickDeduction.toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 说明 */}
            <div className="w-full max-w-4xl mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">计算说明</h4>
                <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                    <li>• 应纳税所得额 = 税前工资 - 起征点 - 五险一金 - 专项附加扣除</li>
                    <li>• 应缴个税 = 应纳税所得额 × 税率 - 速算扣除数</li>
                    <li>• 税后收入 = 税前工资 - 五险一金 - 个税</li>
                    <li>• 专项附加扣除包括：子女教育、继续教育、大病医疗、住房贷款利息、住房租金、赡养老人</li>
                </ul>
            </div>
        </div>
    );
};

export default TaxCalculator;

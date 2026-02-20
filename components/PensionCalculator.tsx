import React, { useState, useMemo } from 'react';

const PensionCalculator: React.FC = () => {
    const [currentAge, setCurrentAge] = useState<string>('30');
    const [retireAge, setRetireAge] = useState<string>('60');
    const [monthlySalary, setMonthlySalary] = useState<string>('10000');
    const [personalRate, setPersonalRate] = useState<string>('8');
    const [companyRate, setCompanyRate] = useState<string>('16');
    const [salaryGrowthRate, setSalaryGrowthRate] = useState<string>('5');
    const [averageSalary, setAverageSalary] = useState<string>('8000');

    const result = useMemo(() => {
        const age = parseInt(currentAge);
        const retire = parseInt(retireAge);
        const salary = parseFloat(monthlySalary);
        const pRate = parseFloat(personalRate) / 100;
        const cRate = parseFloat(companyRate) / 100;
        const growth = parseFloat(salaryGrowthRate) / 100;
        const avgSalary = parseFloat(averageSalary);

        if (!age || !retire || !salary || !pRate || !cRate) return null;

        const workYears = retire - age;
        if (workYears <= 0) return null;

        let totalPersonal = 0;
        let totalCompany = 0;
        let currentSalary = salary;

        for (let i = 0; i < workYears; i++) {
            totalPersonal += currentSalary * pRate * 12;
            totalCompany += currentSalary * cRate * 12;
            currentSalary *= (1 + growth);
        }

        const totalPersonalAccount = totalPersonal;
        const monthlyPersonalPension = totalPersonalAccount / 139;

        const basePension = avgSalary * (1 + salary / avgSalary) / 2 * workYears * 0.01;
        const estimatedMonthlyPension = basePension + monthlyPersonalPension;
        const replacementRate = (estimatedMonthlyPension / salary) * 100;

        return {
            workYears,
            totalPersonalAccount,
            totalCompanyContribution: totalCompany,
            monthlyPersonalPension,
            basePension,
            estimatedMonthlyPension,
            replacementRate,
            finalSalary: currentSalary,
        };
    }, [currentAge, retireAge, monthlySalary, personalRate, companyRate, salaryGrowthRate, averageSalary]);

    const formatMoney = (value: number) => {
        return value.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    return (
        <div className="flex w-full flex-col items-center px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-4xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">
                    养老金计算器
                </p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                    估算退休后可领取的养老金，提前规划退休生活
                </p>
            </div>

            <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 输入区域 */}
                <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/20 shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        基本信息
                    </h3>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    当前年龄
                                </label>
                                <input
                                    type="number"
                                    value={currentAge}
                                    onChange={(e) => setCurrentAge(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary"
                                    placeholder="年龄"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    计划退休年龄
                                </label>
                                <select
                                    value={retireAge}
                                    onChange={(e) => setRetireAge(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary"
                                >
                                    <option value="55">55岁（女干部）</option>
                                    <option value="50">50岁（女工人）</option>
                                    <option value="60">60岁（男性）</option>
                                    <option value="63">63岁（延迟退休）</option>
                                    <option value="65">65岁</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                当前月工资（元）
                            </label>
                            <input
                                type="number"
                                value={monthlySalary}
                                onChange={(e) => setMonthlySalary(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary"
                                placeholder="请输入月工资"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    个人缴费比例（%）
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={personalRate}
                                    onChange={(e) => setPersonalRate(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary"
                                />
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">通常为8%</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    单位缴费比例（%）
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={companyRate}
                                    onChange={(e) => setCompanyRate(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary"
                                />
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">通常为16%</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    工资年增长率（%）
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={salaryGrowthRate}
                                    onChange={(e) => setSalaryGrowthRate(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    当地平均工资（元）
                                </label>
                                <input
                                    type="number"
                                    value={averageSalary}
                                    onChange={(e) => setAverageSalary(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 结果区域 */}
                <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/20 shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        估算结果
                    </h3>

                    {result ? (
                        <div className="space-y-4">
                            <div className="p-4 bg-primary/10 rounded-xl">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    预计每月养老金
                                </p>
                                <p className="text-3xl font-bold text-primary">
                                    ¥{formatMoney(result.estimatedMonthlyPension)}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                    养老金替代率：{result.replacementRate.toFixed(1)}%
                                </p>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <span className="text-gray-600 dark:text-gray-400">工作年限</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">{result.workYears}年</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <span className="text-gray-600 dark:text-gray-400">个人账户累计</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">¥{formatMoney(result.totalPersonalAccount)}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <span className="text-gray-600 dark:text-gray-400">单位缴费累计</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">¥{formatMoney(result.totalCompanyContribution)}</span>
                                </div>
                            </div>

                            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">养老金构成：</p>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">基础养老金</span>
                                        <span className="font-medium text-gray-900 dark:text-white">¥{formatMoney(result.basePension)}/月</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">个人账户养老金</span>
                                        <span className="font-medium text-gray-900 dark:text-white">¥{formatMoney(result.monthlyPersonalPension)}/月</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            请输入基本信息
                        </div>
                    )}
                </div>
            </div>

            {/* 说明 */}
            <div className="w-full max-w-4xl mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">计算说明</h4>
                <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                    <li>• 基础养老金 = 当地平均工资 × (1 + 本人平均缴费指数) ÷ 2 × 缴费年限 × 1%</li>
                    <li>• 个人账户养老金 = 个人账户累计储存额 ÷ 计发月数（60岁退休为139个月）</li>
                    <li>• 养老金替代率 = 养老金 ÷ 退休前工资，反映退休后生活水平</li>
                    <li>• 本计算结果仅供参考，实际养老金以社保局核算为准</li>
                </ul>
            </div>
        </div>
    );
};

export default PensionCalculator;

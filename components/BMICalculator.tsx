import React, { useState, useCallback } from 'react';

const BMICalculator: React.FC = () => {
    const [height, setHeight] = useState<string>('');
    const [weight, setWeight] = useState<string>('');
    const [bmi, setBmi] = useState<number | null>(null);
    const [category, setCategory] = useState<string>('');

    const calculateBMI = useCallback(() => {
        const h = parseFloat(height) / 100;
        const w = parseFloat(weight);

        if (!h || !w || h <= 0 || w <= 0) {
            return;
        }

        const bmiValue = w / (h * h);
        setBmi(Math.round(bmiValue * 100) / 100);

        if (bmiValue < 18.5) {
            setCategory('偏瘦');
        } else if (bmiValue < 24) {
            setCategory('正常');
        } else if (bmiValue < 28) {
            setCategory('偏胖');
        } else {
            setCategory('肥胖');
        }
    }, [height, weight]);

    const getBMIColor = (): string => {
        if (!bmi) return 'text-gray-400';
        if (bmi < 18.5) return 'text-blue-500';
        if (bmi < 24) return 'text-green-500';
        if (bmi < 28) return 'text-yellow-500';
        return 'text-red-500';
    };

    const getBMIPosition = (): number => {
        if (!bmi) return 0;
        const minBMI = 15;
        const maxBMI = 35;
        const position = ((bmi - minBMI) / (maxBMI - minBMI)) * 100;
        return Math.min(100, Math.max(0, position));
    };

    const getIdealWeight = (): { min: number; max: number } | null => {
        const h = parseFloat(height) / 100;
        if (!h) return null;
        return {
            min: Math.round(18.5 * h * h * 10) / 10,
            max: Math.round(24 * h * h * 10) / 10,
        };
    };

    const idealWeight = getIdealWeight();

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-3xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">BMI 体重指数计算</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">计算身体质量指数，评估体重是否健康</p>
            </div>

            <div className="w-full max-w-3xl space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            身高 (厘米)
                        </label>
                        <input
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            placeholder="如：170"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            体重 (公斤)
                        </label>
                        <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            placeholder="如：65"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                </div>

                <button
                    onClick={calculateBMI}
                    disabled={!height || !weight}
                    className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    计算 BMI
                </button>

                {bmi !== null && (
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                        <div className="text-center mb-6">
                            <div className={`text-5xl font-bold ${getBMIColor()}`}>{bmi}</div>
                            <div className="text-lg text-gray-600 dark:text-gray-300 mt-2">{category}</div>
                        </div>

                        <div className="relative h-3 bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-red-400 rounded-full mb-2">
                            <div
                                className="absolute w-4 h-4 bg-white border-2 border-gray-800 dark:border-white rounded-full -top-0.5 transform -translate-x-1/2 shadow"
                                style={{ left: `${getBMIPosition()}%` }}
                            />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                            <span>偏瘦</span>
                            <span>正常</span>
                            <span>偏胖</span>
                            <span>肥胖</span>
                        </div>
                    </div>
                )}

                {idealWeight && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            您的身高 <strong>{height}cm</strong> 的理想体重范围是：
                            <strong className="text-primary"> {idealWeight.min} - {idealWeight.max} kg</strong>
                        </p>
                    </div>
                )}

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">BMI 分类标准（中国）</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-blue-500">偏瘦</span>
                            <span className="text-gray-600 dark:text-gray-300">BMI &lt; 18.5</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-green-500">正常</span>
                            <span className="text-gray-600 dark:text-gray-300">18.5 ≤ BMI &lt; 24</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-yellow-500">偏胖</span>
                            <span className="text-gray-600 dark:text-gray-300">24 ≤ BMI &lt; 28</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-red-500">肥胖</span>
                            <span className="text-gray-600 dark:text-gray-300">BMI ≥ 28</span>
                        </div>
                    </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                    <p className="text-sm text-yellow-700 dark:text-yellow-400">
                        注意：BMI 仅作为参考指标，不能完全反映身体健康状况。运动员、老年人等特殊人群可能需要其他评估方法。
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BMICalculator;

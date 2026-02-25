import React, { useState } from 'react';
import { errorHandler } from '../utils/errorHandler';

const NumberGenerator: React.FC = () => {
    const [min, setMin] = useState<string>('1');
    const [max, setMax] = useState<string>('100');
    const [count, setCount] = useState<string>('1');
    const [allowRepeat, setAllowRepeat] = useState<boolean>(false);
    const [results, setResults] = useState<number[]>([]);
    const [history, setHistory] = useState<string[]>([]);

    const generate = () => {
        const minNum = parseInt(min);
        const maxNum = parseInt(max);
        const countNum = parseInt(count);

        if (isNaN(minNum) || isNaN(maxNum) || isNaN(countNum)) {
            return;
        }

        if (minNum > maxNum) {
            return;
        }

        const range = maxNum - minNum + 1;
        const actualCount = allowRepeat ? countNum : Math.min(countNum, range);

        const numbers: number[] = [];
        
        if (allowRepeat) {
            for (let i = 0; i < actualCount; i++) {
                numbers.push(Math.floor(Math.random() * range) + minNum);
            }
        } else {
            const pool = Array.from({ length: range }, (_, i) => minNum + i);
            for (let i = 0; i < actualCount; i++) {
                const index = Math.floor(Math.random() * pool.length);
                numbers.push(pool.splice(index, 1)[0]);
            }
        }

        setResults(numbers);
        setHistory(prev => [`[${minNum}-${maxNum}] ${numbers.join(', ')}`, ...prev].slice(0, 10));
    };

    const copyResults = async () => {
        try {
            await navigator.clipboard.writeText(results.join(', '));
        } catch (err) {
            errorHandler.error('复制失败', err, { component: '"$(basename $file .tsx)"', action: 'copy' });
        }
    };

    const presets = [
        { label: '掷骰子', min: '1', max: '6' },
        { label: '抛硬币', min: '0', max: '1' },
        { label: '双色球红球', min: '1', max: '33' },
        { label: '大乐透前区', min: '1', max: '35' },
    ];

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-3xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">随机数生成</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">生成指定范围内的随机数字，支持不重复抽取</p>
            </div>

            <div className="w-full max-w-3xl space-y-6">
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            最小值
                        </label>
                        <input
                            type="number"
                            value={min}
                            onChange={(e) => setMin(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            最大值
                        </label>
                        <input
                            type="number"
                            value={max}
                            onChange={(e) => setMax(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            生成数量
                        </label>
                        <input
                            type="number"
                            min="1"
                            value={count}
                            onChange={(e) => setCount(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="allowRepeat"
                        checked={allowRepeat}
                        onChange={(e) => setAllowRepeat(e.target.checked)}
                        className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                    />
                    <label htmlFor="allowRepeat" className="text-sm text-gray-700 dark:text-gray-300">
                        允许重复数字
                    </label>
                </div>

                <div className="flex flex-wrap gap-2">
                    {presets.map(preset => (
                        <button
                            key={preset.label}
                            onClick={() => { setMin(preset.min); setMax(preset.max); }}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
                        >
                            {preset.label}
                        </button>
                    ))}
                </div>

                <button
                    onClick={generate}
                    className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium text-lg"
                >
                    生成随机数
                </button>

                {results.length > 0 && (
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm text-gray-500 dark:text-gray-400">生成结果</span>
                            <button
                                onClick={copyResults}
                                className="text-primary text-sm hover:underline"
                            >
                                复制
                            </button>
                        </div>
                        <div className="flex flex-wrap justify-center gap-3">
                            {results.map((num, index) => (
                                <div
                                    key={index}
                                    className="w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center text-2xl font-bold text-primary"
                                >
                                    {num}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {history.length > 0 && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            历史记录
                        </label>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
                            {history.map((h, index) => (
                                <div key={index} className="px-4 py-2 text-sm font-mono text-gray-600 dark:text-gray-300">
                                    {h}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">使用场景</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• 抽奖、抽签、随机点名</li>
                        <li>• 掷骰子、抛硬币模拟</li>
                        <li>• 随机选择、决策辅助</li>
                        <li>• 游戏、教学演示</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NumberGenerator;

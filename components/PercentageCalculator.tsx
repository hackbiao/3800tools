import React, { useState } from 'react';

const PercentageCalculator: React.FC = () => {
    const [mode, setMode] = useState<'percent' | 'change' | 'ratio'>('percent');
    const [value1, setValue1] = useState<string>('');
    const [value2, setValue2] = useState<string>('');
    const [result, setResult] = useState<string>('');

    const calculatePercent = () => {
        const a = parseFloat(value1);
        const b = parseFloat(value2);
        if (isNaN(a) || isNaN(b) || b === 0) {
            setResult('请输入有效数值');
            return;
        }
        const percent = (a / b) * 100;
        setResult(`${a} 是 ${b} 的 ${percent.toFixed(2)}%`);
    };

    const calculateChange = () => {
        const oldVal = parseFloat(value1);
        const newVal = parseFloat(value2);
        if (isNaN(oldVal) || isNaN(newVal) || oldVal === 0) {
            setResult('请输入有效数值');
            return;
        }
        const change = ((newVal - oldVal) / oldVal) * 100;
        const direction = change >= 0 ? '增长' : '下降';
        setResult(`从 ${oldVal} 到 ${newVal}，${direction}了 ${Math.abs(change).toFixed(2)}%`);
    };

    const calculateRatio = () => {
        const percent = parseFloat(value1);
        const total = parseFloat(value2);
        if (isNaN(percent) || isNaN(total)) {
            setResult('请输入有效数值');
            return;
        }
        const value = (percent / 100) * total;
        setResult(`${total} 的 ${percent}% 是 ${value.toFixed(2)}`);
    };

    const handleCalculate = () => {
        switch (mode) {
            case 'percent':
                calculatePercent();
                break;
            case 'change':
                calculateChange();
                break;
            case 'ratio':
                calculateRatio();
                break;
        }
    };

    const getLabels = (): { label1: string; label2: string } => {
        switch (mode) {
            case 'percent':
                return { label1: '数值A', label2: '数值B' };
            case 'change':
                return { label1: '原值', label2: '新值' };
            case 'ratio':
                return { label1: '百分比 (%)', label2: '总数' };
        }
    };

    const labels = getLabels();

    const modes = [
        { id: 'percent', name: '求百分比', desc: 'A是B的百分之几' },
        { id: 'change', name: '增长/下降', desc: '计算增长或下降百分比' },
        { id: 'ratio', name: '求占比值', desc: '总数的百分之几是多少' },
    ];

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-3xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">百分比计算器</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">计算百分比、增长率、占比等常见百分比问题</p>
            </div>

            <div className="w-full max-w-3xl space-y-6">
                <div className="flex gap-2">
                    {modes.map((m) => (
                        <button
                            key={m.id}
                            onClick={() => { setMode(m.id as typeof mode); setResult(''); }}
                            className={`flex-1 py-2 px-3 rounded-lg font-medium transition-colors ${
                                mode === m.id
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                        >
                            <div className="text-sm">{m.name}</div>
                            <div className="text-xs opacity-70">{m.desc}</div>
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {labels.label1}
                        </label>
                        <input
                            type="number"
                            value={value1}
                            onChange={(e) => setValue1(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {labels.label2}
                        </label>
                        <input
                            type="number"
                            value={value2}
                            onChange={(e) => setValue2(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                </div>

                <button
                    onClick={handleCalculate}
                    disabled={!value1 || !value2}
                    className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    计算
                </button>

                {result && (
                    <div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-6 text-center">
                        <div className="text-lg font-medium text-gray-900 dark:text-white">{result}</div>
                    </div>
                )}

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">常用百分比计算</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <button
                            onClick={() => { setMode('ratio'); setValue1('20'); setValue2('500'); }}
                            className="text-left px-3 py-2 rounded bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-primary transition-colors"
                        >
                            500的20%是多少？
                        </button>
                        <button
                            onClick={() => { setMode('percent'); setValue1('30'); setValue2('200'); }}
                            className="text-left px-3 py-2 rounded bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-primary transition-colors"
                        >
                            30是200的百分之几？
                        </button>
                        <button
                            onClick={() => { setMode('change'); setValue1('100'); setValue2('150'); }}
                            className="text-left px-3 py-2 rounded bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-primary transition-colors"
                        >
                            从100涨到150，涨了多少？
                        </button>
                        <button
                            onClick={() => { setMode('change'); setValue1('200'); setValue2('160'); }}
                            className="text-left px-3 py-2 rounded bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-primary transition-colors"
                        >
                            从200降到160，降了多少？
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PercentageCalculator;

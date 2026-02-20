import React, { useState } from 'react';

type Base = 2 | 8 | 10 | 16;

const BASE_NAMES: Record<Base, string> = {
    2: '二进制',
    8: '八进制',
    10: '十进制',
    16: '十六进制',
};

const NumberBaseConverter: React.FC = () => {
    const [fromBase, setFromBase] = useState<Base>(10);
    const [toBase, setToBase] = useState<Base>(2);
    const [inputValue, setInputValue] = useState<string>('');
    const [outputValue, setOutputValue] = useState<string>('');
    const [error, setError] = useState<string>('');

    const validateInput = (value: string, base: Base): boolean => {
        if (!value.trim()) return true;
        const patterns: Record<Base, RegExp> = {
            2: /^[01]+$/,
            8: /^[0-7]+$/,
            10: /^[0-9]+$/,
            16: /^[0-9a-fA-F]+$/,
        };
        return patterns[base].test(value);
    };

    const convert = (value: string, from: Base, to: Base) => {
        setError('');
        setOutputValue('');

        const cleanValue = value.trim();
        if (!cleanValue) return;

        if (!validateInput(cleanValue, from)) {
            setError(`输入的不是有效的${BASE_NAMES[from]}数字`);
            return;
        }

        try {
            const decimal = parseInt(cleanValue, from);
            if (isNaN(decimal)) {
                setError('转换失败');
                return;
            }
            setOutputValue(decimal.toString(to).toUpperCase());
        } catch (err) {
            setError('转换失败');
        }
    };

    const handleInputChange = (value: string) => {
        setInputValue(value);
        convert(value, fromBase, toBase);
    };

    const handleFromBaseChange = (base: Base) => {
        setFromBase(base);
        convert(inputValue, base, toBase);
    };

    const handleToBaseChange = (base: Base) => {
        setToBase(base);
        convert(inputValue, fromBase, base);
    };

    const swapBases = () => {
        const tempBase = fromBase;
        setFromBase(toBase);
        setToBase(tempBase);
        convert(inputValue, toBase, tempBase);
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            console.error('复制失败:', err);
        }
    };

    const showAllConversions = () => {
        if (!inputValue.trim() || error) return null;
        const decimal = parseInt(inputValue, fromBase);
        if (isNaN(decimal)) return null;

        return (
            <div className="grid grid-cols-2 gap-4 mt-4">
                {[2, 8, 10, 16].map((base) => (
                    <div key={base} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-500 dark:text-gray-400">{BASE_NAMES[base as Base]}</span>
                            <button
                                onClick={() => copyToClipboard(decimal.toString(base).toUpperCase())}
                                className="text-primary text-xs hover:underline"
                            >
                                复制
                            </button>
                        </div>
                        <code className="text-sm font-mono text-gray-900 dark:text-gray-100 break-all">
                            {decimal.toString(base).toUpperCase()}
                        </code>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-3xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">进制转换器</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">二进制、八进制、十进制、十六进制互转</p>
            </div>

            <div className="w-full max-w-3xl space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            源进制
                        </label>
                        <select
                            value={fromBase}
                            onChange={(e) => handleFromBaseChange(parseInt(e.target.value) as Base)}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                            {Object.entries(BASE_NAMES).map(([value, name]) => (
                                <option key={value} value={value}>{name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            目标进制
                        </label>
                        <select
                            value={toBase}
                            onChange={(e) => handleToBaseChange(parseInt(e.target.value) as Base)}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                            {Object.entries(BASE_NAMES).map(([value, name]) => (
                                <option key={value} value={value}>{name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        输入数值
                    </label>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => handleInputChange(e.target.value)}
                        placeholder={`输入${BASE_NAMES[fromBase]}数字`}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-mono text-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={swapBases}
                        className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                        <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                    </button>
                </div>

                {error && (
                    <div className="text-red-500 text-sm">{error}</div>
                )}

                {outputValue && !error && (
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                转换结果
                            </label>
                            <button
                                onClick={() => copyToClipboard(outputValue)}
                                className="text-primary text-sm hover:underline"
                            >
                                复制
                            </button>
                        </div>
                        <div className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800">
                            <code className="text-lg font-mono text-gray-900 dark:text-gray-100 break-all">
                                {outputValue}
                            </code>
                        </div>
                    </div>
                )}

                {showAllConversions()}

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">进制说明</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• <strong>二进制</strong>: 只有0和1，计算机底层使用</li>
                        <li>• <strong>八进制</strong>: 0-7，Linux文件权限常用</li>
                        <li>• <strong>十进制</strong>: 日常使用的数字</li>
                        <li>• <strong>十六进制</strong>: 0-9和A-F，颜色值、内存地址常用</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NumberBaseConverter;

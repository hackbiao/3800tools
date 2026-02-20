import React, { useState, useCallback } from 'react';

type UnitCategory = 'length' | 'weight' | 'area' | 'volume' | 'temperature' | 'data' | 'time';

interface Unit {
    name: string;
    symbol: string;
    toBase: (value: number) => number;
    fromBase: (value: number) => number;
}

const UNITS: Record<UnitCategory, Record<string, Unit>> = {
    length: {
        m: { name: '米', symbol: 'm', toBase: (v) => v, fromBase: (v) => v },
        km: { name: '千米', symbol: 'km', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
        cm: { name: '厘米', symbol: 'cm', toBase: (v) => v / 100, fromBase: (v) => v * 100 },
        mm: { name: '毫米', symbol: 'mm', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
        mi: { name: '英里', symbol: 'mi', toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
        ft: { name: '英尺', symbol: 'ft', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
        in: { name: '英寸', symbol: 'in', toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
        yd: { name: '码', symbol: 'yd', toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
        li: { name: '里', symbol: '里', toBase: (v) => v * 500, fromBase: (v) => v / 500 },
        zhang: { name: '丈', symbol: '丈', toBase: (v) => v * 3.333, fromBase: (v) => v / 3.333 },
        chi: { name: '尺', symbol: '尺', toBase: (v) => v * 0.333, fromBase: (v) => v / 0.333 },
    },
    weight: {
        kg: { name: '千克', symbol: 'kg', toBase: (v) => v, fromBase: (v) => v },
        g: { name: '克', symbol: 'g', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
        mg: { name: '毫克', symbol: 'mg', toBase: (v) => v / 1000000, fromBase: (v) => v * 1000000 },
        t: { name: '吨', symbol: 't', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
        lb: { name: '磅', symbol: 'lb', toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
        oz: { name: '盎司', symbol: 'oz', toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
        jin: { name: '斤', symbol: '斤', toBase: (v) => v * 0.5, fromBase: (v) => v / 0.5 },
        liang: { name: '两', symbol: '两', toBase: (v) => v * 0.05, fromBase: (v) => v / 0.05 },
    },
    area: {
        'm2': { name: '平方米', symbol: 'm²', toBase: (v) => v, fromBase: (v) => v },
        'km2': { name: '平方千米', symbol: 'km²', toBase: (v) => v * 1000000, fromBase: (v) => v / 1000000 },
        'cm2': { name: '平方厘米', symbol: 'cm²', toBase: (v) => v / 10000, fromBase: (v) => v * 10000 },
        ha: { name: '公顷', symbol: 'ha', toBase: (v) => v * 10000, fromBase: (v) => v / 10000 },
        mu: { name: '亩', symbol: '亩', toBase: (v) => v * 666.667, fromBase: (v) => v / 666.667 },
        ac: { name: '英亩', symbol: 'ac', toBase: (v) => v * 4046.86, fromBase: (v) => v / 4046.86 },
        'ft2': { name: '平方英尺', symbol: 'ft²', toBase: (v) => v * 0.092903, fromBase: (v) => v / 0.092903 },
    },
    volume: {
        l: { name: '升', symbol: 'L', toBase: (v) => v, fromBase: (v) => v },
        ml: { name: '毫升', symbol: 'mL', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
        'm3': { name: '立方米', symbol: 'm³', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
        gal: { name: '加仑(美)', symbol: 'gal', toBase: (v) => v * 3.78541, fromBase: (v) => v / 3.78541 },
        qt: { name: '夸脱', symbol: 'qt', toBase: (v) => v * 0.946353, fromBase: (v) => v / 0.946353 },
        pt: { name: '品脱', symbol: 'pt', toBase: (v) => v * 0.473176, fromBase: (v) => v / 0.473176 },
    },
    temperature: {
        c: { name: '摄氏度', symbol: '°C', toBase: (v) => v, fromBase: (v) => v },
        f: { name: '华氏度', symbol: '°F', toBase: (v) => (v - 32) * 5 / 9, fromBase: (v) => v * 9 / 5 + 32 },
        k: { name: '开尔文', symbol: 'K', toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
    },
    data: {
        b: { name: '字节', symbol: 'B', toBase: (v) => v, fromBase: (v) => v },
        kb: { name: '千字节', symbol: 'KB', toBase: (v) => v * 1024, fromBase: (v) => v / 1024 },
        mb: { name: '兆字节', symbol: 'MB', toBase: (v) => v * 1024 * 1024, fromBase: (v) => v / (1024 * 1024) },
        gb: { name: '吉字节', symbol: 'GB', toBase: (v) => v * 1024 * 1024 * 1024, fromBase: (v) => v / (1024 * 1024 * 1024) },
        tb: { name: '太字节', symbol: 'TB', toBase: (v) => v * 1024 * 1024 * 1024 * 1024, fromBase: (v) => v / (1024 * 1024 * 1024 * 1024) },
        bit: { name: '比特', symbol: 'bit', toBase: (v) => v / 8, fromBase: (v) => v * 8 },
    },
    time: {
        s: { name: '秒', symbol: 's', toBase: (v) => v, fromBase: (v) => v },
        ms: { name: '毫秒', symbol: 'ms', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
        min: { name: '分钟', symbol: 'min', toBase: (v) => v * 60, fromBase: (v) => v / 60 },
        h: { name: '小时', symbol: 'h', toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
        d: { name: '天', symbol: 'd', toBase: (v) => v * 86400, fromBase: (v) => v / 86400 },
        w: { name: '周', symbol: 'w', toBase: (v) => v * 604800, fromBase: (v) => v / 604800 },
        mo: { name: '月(30天)', symbol: 'mo', toBase: (v) => v * 2592000, fromBase: (v) => v / 2592000 },
        y: { name: '年(365天)', symbol: 'y', toBase: (v) => v * 31536000, fromBase: (v) => v / 31536000 },
    },
};

const CATEGORY_NAMES: Record<UnitCategory, string> = {
    length: '长度',
    weight: '重量',
    area: '面积',
    volume: '体积',
    temperature: '温度',
    data: '数据存储',
    time: '时间',
};

const UnitConverter: React.FC = () => {
    const [category, setCategory] = useState<UnitCategory>('length');
    const [fromUnit, setFromUnit] = useState<string>('m');
    const [toUnit, setToUnit] = useState<string>('km');
    const [fromValue, setFromValue] = useState<string>('1');
    const [toValue, setToValue] = useState<string>('');

    const convert = useCallback((value: string, from: string, to: string, cat: UnitCategory) => {
        const numValue = parseFloat(value);
        if (isNaN(numValue)) {
            setToValue('');
            return;
        }
        const units = UNITS[cat];
        const baseValue = units[from].toBase(numValue);
        const result = units[to].fromBase(baseValue);
        setToValue(result.toPrecision(10).replace(/\.?0+$/, ''));
    }, []);

    const handleCategoryChange = (newCategory: UnitCategory) => {
        setCategory(newCategory);
        const units = Object.keys(UNITS[newCategory]);
        setFromUnit(units[0]);
        setToUnit(units[1] || units[0]);
        setFromValue('1');
        setToValue('');
    };

    const handleFromValueChange = (value: string) => {
        setFromValue(value);
        convert(value, fromUnit, toUnit, category);
    };

    const handleFromUnitChange = (unit: string) => {
        setFromUnit(unit);
        convert(fromValue, unit, toUnit, category);
    };

    const handleToUnitChange = (unit: string) => {
        setToUnit(unit);
        convert(fromValue, fromUnit, unit, category);
    };

    const swapUnits = () => {
        const tempUnit = fromUnit;
        setFromUnit(toUnit);
        setToUnit(tempUnit);
        setFromValue(toValue);
        convert(toValue, toUnit, tempUnit, category);
    };

    const units = UNITS[category];

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-3xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">单位换算器</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">长度、重量、面积、体积、温度、数据存储等单位互转</p>
            </div>

            <div className="w-full max-w-3xl space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        选择类型
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                        {(Object.keys(CATEGORY_NAMES) as UnitCategory[]).map((cat) => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryChange(cat)}
                                className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                                    category === cat
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                            >
                                {CATEGORY_NAMES[cat]}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            输入数值
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="number"
                                value={fromValue}
                                onChange={(e) => handleFromValueChange(e.target.value)}
                                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                            <select
                                value={fromUnit}
                                onChange={(e) => handleFromUnitChange(e.target.value)}
                                className="w-32 px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                                {Object.entries(units).map(([key, unit]) => (
                                    <option key={key} value={key}>
                                        {unit.symbol} {unit.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button
                            onClick={swapUnits}
                            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                            <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                            </svg>
                        </button>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            转换结果
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={toValue}
                                readOnly
                                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-lg"
                            />
                            <select
                                value={toUnit}
                                onChange={(e) => handleToUnitChange(e.target.value)}
                                className="w-32 px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                                {Object.entries(units).map(([key, unit]) => (
                                    <option key={key} value={key}>
                                        {unit.symbol} {unit.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {fromValue && toValue && (
                    <div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-4 text-center">
                        <span className="text-lg">
                            <span className="font-medium text-gray-900 dark:text-white">{fromValue}</span>
                            <span className="text-gray-600 dark:text-gray-300"> {units[fromUnit].symbol}</span>
                            <span className="mx-2">=</span>
                            <span className="font-bold text-primary">{toValue}</span>
                            <span className="text-gray-600 dark:text-gray-300"> {units[toUnit].symbol}</span>
                        </span>
                    </div>
                )}

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">支持的单位类型</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <div>• 长度：米、千米、英里、英尺等</div>
                        <div>• 重量：千克、克、磅、斤等</div>
                        <div>• 面积：平方米、公顷、亩等</div>
                        <div>• 体积：升、毫升、立方米等</div>
                        <div>• 温度：摄氏、华氏、开尔文</div>
                        <div>• 数据：B、KB、MB、GB、TB</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UnitConverter;

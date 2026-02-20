import React, { useState } from 'react';

const AgeCalculator: React.FC = () => {
    const [birthDate, setBirthDate] = useState<string>('');
    const [targetDate, setTargetDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [result, setResult] = useState<{
        years: number;
        months: number;
        days: number;
        totalDays: number;
        totalWeeks: number;
        totalMonths: number;
        nextBirthday: number;
        zodiac: string;
        chineseZodiac: string;
    } | null>(null);

    const ZODIACS = [
        { name: '摩羯座', start: [1, 1], end: [1, 19] },
        { name: '水瓶座', start: [1, 20], end: [2, 18] },
        { name: '双鱼座', start: [2, 19], end: [3, 20] },
        { name: '白羊座', start: [3, 21], end: [4, 19] },
        { name: '金牛座', start: [4, 20], end: [5, 20] },
        { name: '双子座', start: [5, 21], end: [6, 21] },
        { name: '巨蟹座', start: [6, 22], end: [7, 22] },
        { name: '狮子座', start: [7, 23], end: [8, 22] },
        { name: '处女座', start: [8, 23], end: [9, 22] },
        { name: '天秤座', start: [9, 23], end: [10, 23] },
        { name: '天蝎座', start: [10, 24], end: [11, 22] },
        { name: '射手座', start: [11, 23], end: [12, 21] },
        { name: '摩羯座', start: [12, 22], end: [12, 31] },
    ];

    const CHINESE_ZODIACS = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];

    const getZodiac = (month: number, day: number): string => {
        for (const zodiac of ZODIACS) {
            const [startMonth, startDay] = zodiac.start;
            const [endMonth, endDay] = zodiac.end;
            if (
                (month === startMonth && day >= startDay) ||
                (month === endMonth && day <= endDay)
            ) {
                return zodiac.name;
            }
        }
        return ZODIACS[0].name;
    };

    const getChineseZodiac = (year: number): string => {
        return CHINESE_ZODIACS[(year - 4) % 12];
    };

    const calculate = () => {
        if (!birthDate) return;

        const birth = new Date(birthDate);
        const target = new Date(targetDate);

        if (birth > target) {
            return;
        }

        let years = target.getFullYear() - birth.getFullYear();
        let months = target.getMonth() - birth.getMonth();
        let days = target.getDate() - birth.getDate();

        if (days < 0) {
            months--;
            const lastMonth = new Date(target.getFullYear(), target.getMonth(), 0);
            days += lastMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        const totalDays = Math.floor((target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
        const totalWeeks = Math.floor(totalDays / 7);
        const totalMonths = years * 12 + months;

        const nextBirthday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
        if (nextBirthday <= target) {
            nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
        }
        const daysToNextBirthday = Math.ceil((nextBirthday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));

        setResult({
            years,
            months,
            days,
            totalDays,
            totalWeeks,
            totalMonths,
            nextBirthday: daysToNextBirthday,
            zodiac: getZodiac(birth.getMonth() + 1, birth.getDate()),
            chineseZodiac: getChineseZodiac(birth.getFullYear()),
        });
    };

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-3xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">年龄计算器</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">计算精确年龄、星座、生肖，距离下次生日还有多少天</p>
            </div>

            <div className="w-full max-w-3xl space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            出生日期
                        </label>
                        <input
                            type="date"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            计算日期
                        </label>
                        <input
                            type="date"
                            value={targetDate}
                            onChange={(e) => setTargetDate(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                </div>

                <button
                    onClick={calculate}
                    disabled={!birthDate}
                    className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    计算年龄
                </button>

                {result && (
                    <div className="space-y-4">
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center">
                            <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">您的年龄</div>
                            <div className="text-4xl font-bold text-primary mb-2">
                                {result.years} 岁 {result.months} 月 {result.days} 天
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">{result.totalDays.toLocaleString()}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">总天数</div>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">{result.totalWeeks.toLocaleString()}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">总周数</div>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">{result.totalMonths}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">总月数</div>
                            </div>
                            <div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-4 text-center">
                                <div className="text-2xl font-bold text-primary">{result.nextBirthday}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">距下次生日</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
                                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">星座</div>
                                <div className="text-xl font-bold text-gray-900 dark:text-white">{result.zodiac}</div>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
                                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">生肖</div>
                                <div className="text-xl font-bold text-gray-900 dark:text-white">{result.chineseZodiac}</div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">说明</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• 年龄计算精确到年月日</li>
                        <li>• 星座根据出生日期计算</li>
                        <li>• 生肖根据出生年份计算</li>
                        <li>• 下次生日已排除今天</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AgeCalculator;

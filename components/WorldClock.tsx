import React, { useState } from 'react';

const WorldClock: React.FC = () => {
    const [customTimezones, setCustomTimezones] = useState<string[]>([
        'Asia/Shanghai',
        'America/New_York',
        'Europe/London',
        'Asia/Tokyo',
    ]);

    const allTimezones = [
        { id: 'Asia/Shanghai', name: '北京', country: '中国' },
        { id: 'Asia/Hong_Kong', name: '香港', country: '中国' },
        { id: 'Asia/Taipei', name: '台北', country: '中国' },
        { id: 'Asia/Tokyo', name: '东京', country: '日本' },
        { id: 'Asia/Seoul', name: '首尔', country: '韩国' },
        { id: 'Asia/Singapore', name: '新加坡', country: '新加坡' },
        { id: 'Asia/Dubai', name: '迪拜', country: '阿联酋' },
        { id: 'Asia/Kolkata', name: '新德里', country: '印度' },
        { id: 'Europe/London', name: '伦敦', country: '英国' },
        { id: 'Europe/Paris', name: '巴黎', country: '法国' },
        { id: 'Europe/Berlin', name: '柏林', country: '德国' },
        { id: 'Europe/Moscow', name: '莫斯科', country: '俄罗斯' },
        { id: 'America/New_York', name: '纽约', country: '美国' },
        { id: 'America/Los_Angeles', name: '洛杉矶', country: '美国' },
        { id: 'America/Chicago', name: '芝加哥', country: '美国' },
        { id: 'America/Sao_Paulo', name: '圣保罗', country: '巴西' },
        { id: 'Australia/Sydney', name: '悉尼', country: '澳大利亚' },
        { id: 'Pacific/Auckland', name: '奥克兰', country: '新西兰' },
    ];

    const [currentTime, setCurrentTime] = useState(new Date());

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (timezone: string): string => {
        return currentTime.toLocaleTimeString('zh-CN', {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        });
    };

    const formatDate = (timezone: string): string => {
        return currentTime.toLocaleDateString('zh-CN', {
            timeZone: timezone,
            month: 'short',
            day: 'numeric',
            weekday: 'short',
        });
    };

    const getTimeDiff = (timezone: string): string => {
        const localOffset = currentTime.getTimezoneOffset();
        const targetDate = new Date(currentTime.toLocaleString('en-US', { timeZone: timezone }));
        const localDate = new Date(currentTime.toLocaleString('en-US'));
        const diff = (targetDate.getTime() - localDate.getTime()) / (1000 * 60 * 60);
        const sign = diff >= 0 ? '+' : '';
        return `UTC${sign}${diff}`;
    };

    const addTimezone = (tz: string) => {
        if (!customTimezones.includes(tz)) {
            setCustomTimezones([...customTimezones, tz]);
        }
    };

    const removeTimezone = (tz: string) => {
        setCustomTimezones(customTimezones.filter(t => t !== tz));
    };

    const getTimezoneInfo = (id: string) => allTimezones.find(tz => tz.id === id);

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-4xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">世界时钟</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">查看全球各时区当前时间，支持添加多个城市</p>
            </div>

            <div className="w-full max-w-4xl space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {customTimezones.map((tz) => {
                        const info = getTimezoneInfo(tz);
                        return (
                            <div
                                key={tz}
                                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 relative"
                            >
                                <button
                                    onClick={() => removeTimezone(tz)}
                                    className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-lg font-medium text-gray-900 dark:text-white">
                                        {info?.name || tz.split('/')[1]}
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {info?.country}
                                    </span>
                                </div>
                                <div className="font-mono text-3xl text-gray-900 dark:text-white mb-1">
                                    {formatTime(tz)}
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500 dark:text-gray-400">{formatDate(tz)}</span>
                                    <span className="text-primary">{getTimeDiff(tz)}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        添加城市
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {allTimezones
                            .filter(tz => !customTimezones.includes(tz.id))
                            .slice(0, 12)
                            .map((tz) => (
                                <button
                                    key={tz.id}
                                    onClick={() => addTimezone(tz.id)}
                                    className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-left"
                                >
                                    {tz.name}
                                    <span className="text-xs text-gray-400 ml-1">{tz.country}</span>
                                </button>
                            ))}
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">时区说明</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• 显示的时间为各城市的本地时间</li>
                        <li>• UTC偏移量表示与协调世界时的时差</li>
                        <li>• 部分地区有夏令时，时间会自动调整</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default WorldClock;

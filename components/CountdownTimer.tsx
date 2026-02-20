import React, { useState, useEffect, useRef, useCallback } from 'react';

const CountdownTimer: React.FC = () => {
    const [hours, setHours] = useState<string>('0');
    const [minutes, setMinutes] = useState<string>('5');
    const [seconds, setSeconds] = useState<string>('0');
    const [remainingTime, setRemainingTime] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const endTimeRef = useRef<number>(0);

    const totalTime = parseInt(hours || '0') * 3600 + parseInt(minutes || '0') * 60 + parseInt(seconds || '0');

    useEffect(() => {
        if (isRunning && remainingTime > 0) {
            intervalRef.current = setInterval(() => {
                const now = Date.now();
                const remaining = Math.max(0, Math.ceil((endTimeRef.current - now) / 1000));
                setRemainingTime(remaining);
                
                if (remaining <= 0) {
                    setIsRunning(false);
                    clearInterval(intervalRef.current!);
                }
            }, 100);
        } else if (!isRunning && intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isRunning, remainingTime]);

    const startCountdown = useCallback(() => {
        if (totalTime <= 0) return;
        setRemainingTime(totalTime);
        endTimeRef.current = Date.now() + totalTime * 1000;
        setIsRunning(true);
        setIsPaused(false);
    }, [totalTime]);

    const pauseCountdown = useCallback(() => {
        if (isPaused) {
            endTimeRef.current = Date.now() + remainingTime * 1000;
            setIsRunning(true);
            setIsPaused(false);
        } else {
            setIsRunning(false);
            setIsPaused(true);
        }
    }, [isPaused, remainingTime]);

    const resetCountdown = useCallback(() => {
        setIsRunning(false);
        setIsPaused(false);
        setRemainingTime(0);
    }, []);

    const formatTime = (totalSeconds: number): string => {
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const getProgress = (): number => {
        if (totalTime === 0) return 0;
        return ((totalTime - remainingTime) / totalTime) * 100;
    };

    const presets = [
        { label: '1分钟', h: 0, m: 1, s: 0 },
        { label: '5分钟', h: 0, m: 5, s: 0 },
        { label: '10分钟', h: 0, m: 10, s: 0 },
        { label: '25分钟', h: 0, m: 25, s: 0 },
        { label: '30分钟', h: 0, m: 30, s: 0 },
        { label: '1小时', h: 1, m: 0, s: 0 },
    ];

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-3xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">倒计时器</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">设置倒计时，支持暂停、继续和重置</p>
            </div>

            <div className="w-full max-w-3xl space-y-6">
                {!isRunning && !isPaused ? (
                    <>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    小时
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    max="99"
                                    value={hours}
                                    onChange={(e) => setHours(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-center text-2xl focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    分钟
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    max="59"
                                    value={minutes}
                                    onChange={(e) => setMinutes(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-center text-2xl focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    秒
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    max="59"
                                    value={seconds}
                                    onChange={(e) => setSeconds(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-center text-2xl focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 justify-center">
                            {presets.map((preset) => (
                                <button
                                    key={preset.label}
                                    onClick={() => {
                                        setHours(preset.h.toString());
                                        setMinutes(preset.m.toString());
                                        setSeconds(preset.s.toString());
                                    }}
                                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                >
                                    {preset.label}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={startCountdown}
                            disabled={totalTime <= 0}
                            className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            开始倒计时
                        </button>
                    </>
                ) : (
                    <>
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 text-center">
                            <div className="relative w-48 h-48 mx-auto mb-4">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle
                                        cx="96"
                                        cy="96"
                                        r="88"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        className="text-gray-200 dark:text-gray-700"
                                    />
                                    <circle
                                        cx="96"
                                        cy="96"
                                        r="88"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        strokeDasharray={553}
                                        strokeDashoffset={553 - (553 * getProgress()) / 100}
                                        className={`transition-all duration-1000 ${
                                            remainingTime <= 10 ? 'text-red-500' : 'text-primary'
                                        }`}
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className={`font-mono text-4xl ${
                                        remainingTime <= 10 ? 'text-red-500' : 'text-gray-900 dark:text-white'
                                    }`}>
                                        {formatTime(remainingTime)}
                                    </span>
                                </div>
                            </div>
                            {remainingTime === 0 && (
                                <div className="text-2xl font-bold text-green-500 animate-pulse">
                                    时间到！
                                </div>
                            )}
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={pauseCountdown}
                                disabled={remainingTime === 0}
                                className={`flex-1 py-3 rounded-lg font-medium text-lg transition-colors ${
                                    isPaused
                                        ? 'bg-green-500 text-white hover:bg-green-600'
                                        : 'bg-yellow-500 text-white hover:bg-yellow-600'
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {isPaused ? '继续' : '暂停'}
                            </button>
                            <button
                                onClick={resetCountdown}
                                className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium text-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                            >
                                重置
                            </button>
                        </div>
                    </>
                )}

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">使用场景</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• <strong>番茄工作法</strong>：设置25分钟专注工作</li>
                        <li>• <strong>休息提醒</strong>：设置5-10分钟休息时间</li>
                        <li>• <strong>运动计时</strong>：设置运动间歇时间</li>
                        <li>• <strong>烹饪计时</strong>：设置烹饪时间提醒</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CountdownTimer;

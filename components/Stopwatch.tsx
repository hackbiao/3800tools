import React, { useState, useEffect, useRef, useCallback } from 'react';

const Stopwatch: React.FC = () => {
    const [time, setTime] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [laps, setLaps] = useState<number[]>([]);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTime(prev => prev + 10);
            }, 10);
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isRunning]);

    const formatTime = (ms: number): string => {
        const hours = Math.floor(ms / 3600000);
        const minutes = Math.floor((ms % 3600000) / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const milliseconds = Math.floor((ms % 1000) / 10);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
    };

    const handleStartStop = () => {
        setIsRunning(!isRunning);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
        setLaps([]);
    };

    const handleLap = () => {
        setLaps(prev => [...prev, time]);
    };

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-3xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">秒表计时器</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">精确到毫秒的在线秒表，支持计次功能</p>
            </div>

            <div className="w-full max-w-3xl space-y-6">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 text-center">
                    <div className="font-mono text-5xl sm:text-6xl text-gray-900 dark:text-white tracking-wider">
                        {formatTime(time)}
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={handleStartStop}
                        className={`flex-1 py-3 rounded-lg font-medium text-lg transition-colors ${
                            isRunning
                                ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                                : 'bg-green-500 text-white hover:bg-green-600'
                        }`}
                    >
                        {isRunning ? '暂停' : '开始'}
                    </button>
                    <button
                        onClick={handleLap}
                        disabled={!isRunning}
                        className="flex-1 py-3 bg-primary text-white rounded-lg font-medium text-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        计次
                    </button>
                    <button
                        onClick={handleReset}
                        disabled={isRunning}
                        className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium text-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        重置
                    </button>
                </div>

                {laps.length > 0 && (
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                计次记录 ({laps.length})
                            </label>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg divide-y divide-gray-200 dark:divide-gray-700 max-h-64 overflow-y-auto">
                            {[...laps].reverse().map((lap, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between px-4 py-3"
                                >
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        #{laps.length - index}
                                    </span>
                                    <span className="font-mono text-gray-900 dark:text-gray-100">
                                        {formatTime(lap)}
                                    </span>
                                    {index < laps.length - 1 && (
                                        <span className="text-sm text-gray-400 dark:text-gray-500">
                                            +{formatTime(lap - laps[laps.length - 2 - index])}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">使用提示</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• 点击"开始"启动计时，点击"暂停"停止计时</li>
                        <li>• 计时过程中可以点击"计次"记录当前时间</li>
                        <li>• 点击"重置"清零并清除所有计次记录</li>
                        <li>• 时间格式：时:分:秒.毫秒</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Stopwatch;

import React, { useState, useCallback } from 'react';
import { errorHandler } from '../utils/errorHandler';

const UuidGenerator: React.FC = () => {
    const [uuids, setUuids] = useState<string[]>([]);
    const [count, setCount] = useState<number>(5);
    const [version, setVersion] = useState<'v4' | 'v1'>('v4');
    const [uppercase, setUppercase] = useState<boolean>(false);
    const [noHyphens, setNoHyphens] = useState<boolean>(false);

    const generateUUIDv4 = (): string => {
        const array = new Uint8Array(16);
        crypto.getRandomValues(array);
        array[6] = (array[6] & 0x0f) | 0x40;
        array[8] = (array[8] & 0x3f) | 0x80;
        let uuid = '';
        for (let i = 0; i < 16; i++) {
            uuid += array[i].toString(16).padStart(2, '0');
            if (i === 3 || i === 5 || i === 7 || i === 9) {
                uuid += '-';
            }
        }
        return uuid;
    };

    const generateUUIDv1 = (): string => {
        const now = Date.now();
        const timeLow = (now & 0xffffffff).toString(16).padStart(8, '0');
        const timeMid = ((now >> 32) & 0xffff).toString(16).padStart(4, '0');
        const timeHi = ((now >> 48) & 0x0fff).toString(16).padStart(4, '0');
        const clockSeq = (Math.random() * 0x3fff | 0x8000).toString(16).padStart(4, '0');
        const node = Array.from(crypto.getRandomValues(new Uint8Array(6)))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
        return `${timeLow}-${timeMid}-${timeHi}-${clockSeq}-${node}`;
    };

    const generateUUIDs = useCallback(() => {
        const newUUIDs: string[] = [];
        for (let i = 0; i < count; i++) {
            let uuid = version === 'v4' ? generateUUIDv4() : generateUUIDv1();
            if (uppercase) uuid = uuid.toUpperCase();
            if (noHyphens) uuid = uuid.replace(/-/g, '');
            newUUIDs.push(uuid);
        }
        setUuids(newUUIDs);
    }, [count, version, uppercase, noHyphens]);

    const copyAll = async () => {
        try {
            await navigator.clipboard.writeText(uuids.join('\n'));
        } catch (err) {
            errorHandler.error('复制失败', err, { component: '"$(basename $file .tsx)"', action: 'copy' });
        }
    };

    const copyOne = async (uuid: string) => {
        try {
            await navigator.clipboard.writeText(uuid);
        } catch (err) {
            errorHandler.error('复制失败', err, { component: '"$(basename $file .tsx)"', action: 'copy' });
        }
    };

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-3xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">UUID 生成器</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">批量生成UUID/GUID，支持UUID v1和v4版本</p>
            </div>

            <div className="w-full max-w-3xl space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            生成数量
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="100"
                            value={count}
                            onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            UUID 版本
                        </label>
                        <select
                            value={version}
                            onChange={(e) => setVersion(e.target.value as 'v4' | 'v1')}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                            <option value="v4">UUID v4 (随机)</option>
                            <option value="v1">UUID v1 (时间戳)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            格式选项
                        </label>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={uppercase}
                                    onChange={(e) => setUppercase(e.target.checked)}
                                    className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">大写字母</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={noHyphens}
                                    onChange={(e) => setNoHyphens(e.target.checked)}
                                    className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">无连字符</span>
                            </label>
                        </div>
                    </div>
                </div>

                <button
                    onClick={generateUUIDs}
                    className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium text-lg"
                >
                    生成 UUID
                </button>

                {uuids.length > 0 && (
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                生成结果 ({uuids.length} 个)
                            </span>
                            <button
                                onClick={copyAll}
                                className="text-primary text-sm hover:underline"
                            >
                                复制全部
                            </button>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto">
                            {uuids.map((uuid, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    <code className="font-mono text-sm text-gray-900 dark:text-gray-100">
                                        {uuid}
                                    </code>
                                    <button
                                        onClick={() => copyOne(uuid)}
                                        className="text-primary text-sm hover:underline ml-2"
                                    >
                                        复制
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">UUID 说明</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• <strong>UUID v1</strong>: 基于时间戳生成，有序但可能暴露生成时间</li>
                        <li>• <strong>UUID v4</strong>: 完全随机生成，最常用的版本</li>
                        <li>• 格式: 8-4-4-4-12 (共36个字符，含4个连字符)</li>
                        <li>• 常用于数据库主键、会话ID、文件名等场景</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default UuidGenerator;

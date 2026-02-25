import React, { useState, useCallback } from 'react';
import { errorHandler } from '../utils/errorHandler';

const PasswordGenerator: React.FC = () => {
    const [password, setPassword] = useState<string>('');
    const [length, setLength] = useState<number>(16);
    const [options, setOptions] = useState({
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true,
    });
    const [copied, setCopied] = useState(false);

    const charSets = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    };

    const generatePassword = useCallback(() => {
        let chars = '';
        if (options.uppercase) chars += charSets.uppercase;
        if (options.lowercase) chars += charSets.lowercase;
        if (options.numbers) chars += charSets.numbers;
        if (options.symbols) chars += charSets.symbols;

        if (!chars) {
            setPassword('');
            return;
        }

        let result = '';
        const array = new Uint32Array(length);
        crypto.getRandomValues(array);
        for (let i = 0; i < length; i++) {
            result += chars[array[i] % chars.length];
        }
        setPassword(result);
        setCopied(false);
    }, [length, options]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(password);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            errorHandler.error('复制失败', err, { component: '"$(basename $file .tsx)"', action: 'copy' });
        }
    };

    const handleOptionChange = (key: keyof typeof options) => {
        const newOptions = { ...options, [key]: !options[key] };
        const hasSelection = Object.values(newOptions).some(v => v);
        if (hasSelection) {
            setOptions(newOptions);
        }
    };

    const getStrength = (): { level: string; color: string } => {
        if (length < 8) return { level: '弱', color: 'text-red-500' };
        if (length < 12) return { level: '中等', color: 'text-yellow-500' };
        if (length < 16) return { level: '较强', color: 'text-blue-500' };
        return { level: '强', color: 'text-green-500' };
    };

    const strength = getStrength();

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-3xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">随机密码生成器</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">生成安全的随机密码，支持自定义长度和字符类型</p>
            </div>

            <div className="w-full max-w-3xl space-y-6">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                        <span className={`text-sm font-medium ${strength.color}`}>
                            强度: {strength.level}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            长度: {length}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={password}
                            readOnly
                            placeholder="点击生成按钮生成密码"
                            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-mono text-lg focus:outline-none"
                        />
                        <button
                            onClick={handleCopy}
                            disabled={!password}
                            className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                                copied
                                    ? 'bg-green-500 text-white'
                                    : 'bg-primary text-white hover:bg-primary/90'
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            {copied ? '已复制' : '复制'}
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        密码长度: {length}
                    </label>
                    <input
                        type="range"
                        min="6"
                        max="64"
                        value={length}
                        onChange={(e) => setLength(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <span>6</span>
                        <span>64</span>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        包含字符类型
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { key: 'uppercase', label: '大写字母 (A-Z)' },
                            { key: 'lowercase', label: '小写字母 (a-z)' },
                            { key: 'numbers', label: '数字 (0-9)' },
                            { key: 'symbols', label: '特殊符号 (!@#$...)' },
                        ].map(({ key, label }) => (
                            <label
                                key={key}
                                className="flex items-center gap-2 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={options[key as keyof typeof options]}
                                    onChange={() => handleOptionChange(key as keyof typeof options)}
                                    className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <button
                    onClick={generatePassword}
                    className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium text-lg"
                >
                    生成密码
                </button>

                {password && (
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                        <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">密码预览</h3>
                        <div className="font-mono text-sm break-all text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 p-3 rounded border border-gray-200 dark:border-gray-600">
                            {password.split('').map((char, index) => {
                                let color = 'text-gray-900 dark:text-gray-100';
                                if (/[A-Z]/.test(char)) color = 'text-blue-600 dark:text-blue-400';
                                else if (/[a-z]/.test(char)) color = 'text-green-600 dark:text-green-400';
                                else if (/[0-9]/.test(char)) color = 'text-orange-600 dark:text-orange-400';
                                else color = 'text-purple-600 dark:text-purple-400';
                                return (
                                    <span key={index} className={color}>
                                        {char}
                                    </span>
                                );
                            })}
                        </div>
                        <div className="flex gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                            <span className="text-blue-600 dark:text-blue-400">大写</span>
                            <span className="text-green-600 dark:text-green-400">小写</span>
                            <span className="text-orange-600 dark:text-orange-400">数字</span>
                            <span className="text-purple-600 dark:text-purple-400">符号</span>
                        </div>
                    </div>
                )}

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">安全提示</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• 建议使用 16 位以上的密码</li>
                        <li>• 使用密码管理器保存密码</li>
                        <li>• 不同网站使用不同密码</li>
                        <li>• 定期更换重要账户密码</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PasswordGenerator;

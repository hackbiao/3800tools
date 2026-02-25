import React, { useState, useCallback } from 'react';
import { errorHandler } from '../utils/errorHandler';

interface IPInfo {
    ip: string;
    isValid: boolean;
    version: 'IPv4' | 'IPv6';
    type: string;
}

const IPConverter: React.FC = () => {
    const [inputIP, setInputIP] = useState<string>('');
    const [result, setResult] = useState<IPInfo | null>(null);
    const [decimalIP, setDecimalIP] = useState<string>('');
    const [binaryIP, setBinaryIP] = useState<string>('');
    const [hexIP, setHexIP] = useState<string>('');
    const [error, setError] = useState<string>('');

    const isIPv4 = (ip: string): boolean => {
        const pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
        if (!pattern.test(ip)) return false;
        const parts = ip.split('.');
        return parts.every(part => {
            const num = parseInt(part);
            return num >= 0 && num <= 255;
        });
    };

    const isIPv6 = (ip: string): boolean => {
        const pattern = /^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$/;
        return pattern.test(ip) || ip === '::';
    };

    const ipv4ToDecimal = (ip: string): string => {
        const parts = ip.split('.').map(Number);
        return ((parts[0] << 24) + (parts[1] << 16) + (parts[2] << 8) + parts[3]).toString();
    };

    const ipv4ToBinary = (ip: string): string => {
        return ip.split('.')
            .map(part => parseInt(part).toString(2).padStart(8, '0'))
            .join('.');
    };

    const ipv4ToHex = (ip: string): string => {
        return ip.split('.')
            .map(part => parseInt(part).toString(16).toUpperCase().padStart(2, '0'))
            .join(':');
    };

    const decimalToIPv4 = (decimal: string): string => {
        const num = BigInt(decimal);
        const parts = [
            Number((num >> 24n) & 255n),
            Number((num >> 16n) & 255n),
            Number((num >> 8n) & 255n),
            Number(num & 255n),
        ];
        return parts.join('.');
    };

    const convert = useCallback(() => {
        setError('');
        setResult(null);
        setDecimalIP('');
        setBinaryIP('');
        setHexIP('');

        const ip = inputIP.trim();
        if (!ip) {
            setError('请输入IP地址');
            return;
        }

        if (isIPv4(ip)) {
            setResult({
                ip,
                isValid: true,
                version: 'IPv4',
                type: getIPv4Type(ip),
            });
            setDecimalIP(ipv4ToDecimal(ip));
            setBinaryIP(ipv4ToBinary(ip));
            setHexIP(ipv4ToHex(ip));
        } else if (isIPv6(ip)) {
            setResult({
                ip,
                isValid: true,
                version: 'IPv6',
                type: 'IPv6地址',
            });
        } else {
            setResult({
                ip,
                isValid: false,
                version: 'IPv4',
                type: '无效地址',
            });
            setError('无效的IP地址格式');
        }
    }, [inputIP]);

    const getIPv4Type = (ip: string): string => {
        const first = parseInt(ip.split('.')[0]);
        if (first >= 1 && first <= 126) return 'A类地址 (公网)';
        if (first === 127) return '回环地址';
        if (first >= 128 && first <= 191) return 'B类地址 (公网)';
        if (first >= 192 && first <= 223) return 'C类地址 (公网)';
        if (first >= 224 && first <= 239) return 'D类地址 (组播)';
        if (first >= 240 && first <= 255) return 'E类地址 (保留)';

        const parts = ip.split('.').map(Number);
        if (first === 10) return '私有地址 (A类)';
        if (first === 172 && parts[1] >= 16 && parts[1] <= 31) return '私有地址 (B类)';
        if (first === 192 && parts[1] === 168) return '私有地址 (C类)';

        return '公网地址';
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            errorHandler.error('复制失败', err, { component: '"$(basename $file .tsx)"', action: 'copy' });
        }
    };

    const convertDecimalToIP = () => {
        const decimal = decimalIP.trim();
        if (!decimal || isNaN(Number(decimal))) {
            setError('请输入有效的十进制数字');
            return;
        }
        setInputIP(decimalToIPv4(decimal));
    };

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-3xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">IP地址转换</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">IP地址与十进制、二进制、十六进制互转</p>
            </div>

            <div className="w-full max-w-3xl space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        IP地址
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={inputIP}
                            onChange={(e) => setInputIP(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && convert()}
                            placeholder="输入IPv4或IPv6地址，如：192.168.1.1"
                            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-mono focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <button
                            onClick={convert}
                            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                        >
                            转换
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="text-red-500 text-sm">{error}</div>
                )}

                {result && result.isValid && (
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                        <div className="bg-green-50 dark:bg-green-900/20 px-4 py-3">
                            <span className="font-medium text-green-600 dark:text-green-400">
                                ✓ 有效的{result.version}地址
                            </span>
                        </div>
                        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                            <span className="text-gray-500 dark:text-gray-400">类型：</span>
                            <span className="text-gray-900 dark:text-white font-medium">{result.type}</span>
                        </div>
                    </div>
                )}

                {decimalIP && (
                    <div className="space-y-4">
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">十进制</span>
                                <button onClick={() => copyToClipboard(decimalIP)} className="text-primary text-sm hover:underline">复制</button>
                            </div>
                            <code className="text-lg font-mono text-gray-900 dark:text-white">{decimalIP}</code>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">二进制</span>
                                <button onClick={() => copyToClipboard(binaryIP)} className="text-primary text-sm hover:underline">复制</button>
                            </div>
                            <code className="text-sm font-mono text-gray-900 dark:text-white break-all">{binaryIP}</code>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">十六进制</span>
                                <button onClick={() => copyToClipboard(hexIP)} className="text-primary text-sm hover:underline">复制</button>
                            </div>
                            <code className="text-lg font-mono text-gray-900 dark:text-white">{hexIP}</code>
                        </div>
                    </div>
                )}

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-4">十进制转IP</h3>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={decimalIP}
                            onChange={(e) => setDecimalIP(e.target.value)}
                            placeholder="输入十进制数字，如：3232235777"
                            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-mono focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <button
                            onClick={convertDecimalToIP}
                            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                        >
                            转换
                        </button>
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">IP地址类型</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <div>A类: 1.0.0.0 - 126.255.255.255</div>
                        <div>B类: 128.0.0.0 - 191.255.255.255</div>
                        <div>C类: 192.0.0.0 - 223.255.255.255</div>
                        <div>D类: 224.0.0.0 - 239.255.255.255</div>
                        <div>私有: 10.x.x.x</div>
                        <div>私有: 172.16-31.x.x</div>
                        <div>私有: 192.168.x.x</div>
                        <div>回环: 127.x.x.x</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IPConverter;

import React, { useState } from 'react';
import { errorHandler } from '../utils/errorHandler';

const IPSubnetCalculator: React.FC = () => {
    const [ip, setIP] = useState<string>('192.168.1.1');
    const [cidr, setCIDR] = useState<string>('24');
    const [result, setResult] = useState<{
        network: string;
        broadcast: string;
        firstHost: string;
        lastHost: string;
        totalHosts: number;
        usableHosts: number;
        subnetMask: string;
        wildcard: string;
        cidr: string;
    } | null>(null);
    const [error, setError] = useState<string>('');

    const calculate = () => {
        setError('');
        setResult(null);

        const ipParts = ip.split('.').map(Number);
        const prefixLen = parseInt(cidr);

        if (ipParts.length !== 4 || ipParts.some(p => isNaN(p) || p < 0 || p > 255)) {
            setError('无效的IP地址');
            return;
        }

        if (isNaN(prefixLen) || prefixLen < 0 || prefixLen > 32) {
            setError('CIDR必须在0-32之间');
            return;
        }

        const ipNum = (ipParts[0] << 24) + (ipParts[1] << 16) + (ipParts[2] << 8) + ipParts[3];
        
        const mask = prefixLen === 0 ? 0 : (~0 << (32 - prefixLen)) >>> 0;
        const network = (ipNum & mask) >>> 0;
        const broadcast = (network | (~mask >>> 0)) >>> 0;
        const firstHost = prefixLen >= 31 ? network : network + 1;
        const lastHost = prefixLen >= 31 ? broadcast : broadcast - 1;

        const numToIP = (num: number): string => {
            return [
                (num >>> 24) & 255,
                (num >>> 16) & 255,
                (num >>> 8) & 255,
                num & 255,
            ].join('.');
        };

        const totalHosts = Math.pow(2, 32 - prefixLen);
        const usableHosts = prefixLen >= 31 ? totalHosts : totalHosts - 2;

        setResult({
            network: numToIP(network),
            broadcast: numToIP(broadcast),
            firstHost: numToIP(firstHost),
            lastHost: numToIP(lastHost),
            totalHosts,
            usableHosts,
            subnetMask: numToIP(mask),
            wildcard: numToIP(~mask >>> 0),
            cidr: `/${prefixLen}`,
        });
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            errorHandler.error('复制失败', err, { component: '"$(basename $file .tsx)"', action: 'copy' });
        }
    };

    const commonSubnets = [
        { cidr: '8', desc: 'A类' },
        { cidr: '16', desc: 'B类' },
        { cidr: '24', desc: 'C类' },
        { cidr: '25', desc: '128主机' },
        { cidr: '26', desc: '64主机' },
        { cidr: '27', desc: '32主机' },
        { cidr: '28', desc: '16主机' },
        { cidr: '29', desc: '8主机' },
        { cidr: '30', desc: '4主机' },
    ];

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-3xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">IP子网计算器</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">计算IP子网掩码、网络地址、可用主机数等信息</p>
            </div>

            <div className="w-full max-w-3xl space-y-6">
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            IP地址
                        </label>
                        <input
                            type="text"
                            value={ip}
                            onChange={(e) => setIP(e.target.value)}
                            placeholder="如：192.168.1.1"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-mono focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            CIDR前缀
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="32"
                            value={cidr}
                            onChange={(e) => setCIDR(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    {commonSubnets.map(({ cidr: c, desc }) => (
                        <button
                            key={c}
                            onClick={() => setCIDR(c)}
                            className={`px-3 py-1 rounded text-sm ${
                                cidr === c
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                        >
                            /{c} ({desc})
                        </button>
                    ))}
                </div>

                <button
                    onClick={calculate}
                    className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                    计算
                </button>

                {error && (
                    <div className="text-red-500 text-sm">{error}</div>
                )}

                {result && (
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                        <div className="grid grid-cols-2 divide-x divide-gray-200 dark:divide-gray-700">
                            <div className="p-4">
                                <div className="text-sm text-gray-500 dark:text-gray-400">网络地址</div>
                                <div className="font-mono text-lg text-gray-900 dark:text-white">{result.network}</div>
                            </div>
                            <div className="p-4">
                                <div className="text-sm text-gray-500 dark:text-gray-400">广播地址</div>
                                <div className="font-mono text-lg text-gray-900 dark:text-white">{result.broadcast}</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 divide-x divide-gray-200 dark:divide-gray-700 border-t border-gray-200 dark:border-gray-700">
                            <div className="p-4">
                                <div className="text-sm text-gray-500 dark:text-gray-400">第一个主机</div>
                                <div className="font-mono text-lg text-gray-900 dark:text-white">{result.firstHost}</div>
                            </div>
                            <div className="p-4">
                                <div className="text-sm text-gray-500 dark:text-gray-400">最后一个主机</div>
                                <div className="font-mono text-lg text-gray-900 dark:text-white">{result.lastHost}</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 divide-x divide-gray-200 dark:divide-gray-700 border-t border-gray-200 dark:border-gray-700">
                            <div className="p-4">
                                <div className="text-sm text-gray-500 dark:text-gray-400">子网掩码</div>
                                <div className="font-mono text-lg text-gray-900 dark:text-white">{result.subnetMask}</div>
                            </div>
                            <div className="p-4">
                                <div className="text-sm text-gray-500 dark:text-gray-400">通配符掩码</div>
                                <div className="font-mono text-lg text-gray-900 dark:text-white">{result.wildcard}</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 divide-x divide-gray-200 dark:divide-gray-700 border-t border-gray-200 dark:border-gray-700 bg-primary/5 dark:bg-primary/10">
                            <div className="p-4 text-center">
                                <div className="text-sm text-gray-500 dark:text-gray-400">总主机数</div>
                                <div className="text-2xl font-bold text-primary">{result.totalHosts.toLocaleString()}</div>
                            </div>
                            <div className="p-4 text-center">
                                <div className="text-sm text-gray-500 dark:text-gray-400">可用主机数</div>
                                <div className="text-2xl font-bold text-primary">{result.usableHosts.toLocaleString()}</div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">CIDR说明</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• CIDR (无类别域间路由) 用于指定IP地址的网络前缀长度</li>
                        <li>• /24 表示前24位是网络地址，后8位是主机地址</li>
                        <li>• 可用主机数 = 2^(32-CIDR) - 2 (网络地址和广播地址不可用)</li>
                        <li>• /31 和 /32 是特殊情况，用于点对点链路</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default IPSubnetCalculator;

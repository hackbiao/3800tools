import React, { useState, useCallback } from 'react';

const HashCalculator: React.FC = () => {
    const [inputText, setInputText] = useState<string>('');
    const [results, setResults] = useState<Record<string, string>>({});
    const [isCalculating, setIsCalculating] = useState(false);

    const hashText = async (algorithm: string, text: string): Promise<string> => {
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const hashBuffer = await crypto.subtle.digest(algorithm, data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    };

    const calculateHashes = useCallback(async () => {
        if (!inputText.trim()) {
            setResults({});
            return;
        }

        setIsCalculating(true);
        try {
            const [md5, sha1, sha256, sha384, sha512] = await Promise.all([
                hashText('MD5', inputText),
                hashText('SHA-1', inputText),
                hashText('SHA-256', inputText),
                hashText('SHA-384', inputText),
                hashText('SHA-512', inputText),
            ]);
            setResults({ MD5: md5, 'SHA-1': sha1, 'SHA-256': sha256, 'SHA-384': sha384, 'SHA-512': sha512 });
        } catch (err) {
            console.error('Hash calculation error:', err);
        }
        setIsCalculating(false);
    }, [inputText]);

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            console.error('复制失败:', err);
        }
    };

    const handleFileHash = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsCalculating(true);
        setInputText(`文件: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`);

        try {
            const buffer = await file.arrayBuffer();
            const [md5, sha1, sha256, sha384, sha512] = await Promise.all([
                crypto.subtle.digest('MD5', buffer),
                crypto.subtle.digest('SHA-1', buffer),
                crypto.subtle.digest('SHA-256', buffer),
                crypto.subtle.digest('SHA-384', buffer),
                crypto.subtle.digest('SHA-512', buffer),
            ]);

            const toHex = (buf: ArrayBuffer) =>
                Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');

            setResults({
                MD5: toHex(md5),
                'SHA-1': toHex(sha1),
                'SHA-256': toHex(sha256),
                'SHA-384': toHex(sha384),
                'SHA-512': toHex(sha512),
            });
        } catch (err) {
            console.error('File hash error:', err);
        }
        setIsCalculating(false);
    };

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-3xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">Hash 计算器</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">计算文本或文件的MD5、SHA-1、SHA-256等哈希值</p>
            </div>

            <div className="w-full max-w-3xl space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        输入文本
                    </label>
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="输入要计算哈希值的文本"
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    />
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={calculateHashes}
                        disabled={isCalculating || !inputText.trim()}
                        className="flex-1 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isCalculating ? '计算中...' : '计算哈希值'}
                    </button>
                    <label className="cursor-pointer">
                        <div className="py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            选择文件
                        </div>
                        <input
                            type="file"
                            onChange={handleFileHash}
                            className="hidden"
                        />
                    </label>
                </div>

                {Object.keys(results).length > 0 && (
                    <div className="space-y-3">
                        {Object.entries(results).map(([algorithm, hash]) => (
                            <div key={algorithm} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-gray-900 dark:text-white">{algorithm}</span>
                                    <button
                                        onClick={() => copyToClipboard(hash)}
                                        className="text-primary text-sm hover:underline"
                                    >
                                        复制
                                    </button>
                                </div>
                                <code className="block text-xs font-mono text-gray-600 dark:text-gray-300 break-all">
                                    {hash}
                                </code>
                            </div>
                        ))}
                    </div>
                )}

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">哈希算法说明</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• <strong>MD5</strong>: 128位，常用于校验文件完整性，已不推荐用于安全场景</li>
                        <li>• <strong>SHA-1</strong>: 160位，已被证明存在碰撞漏洞</li>
                        <li>• <strong>SHA-256</strong>: 256位，目前最常用的安全哈希算法</li>
                        <li>• <strong>SHA-384/512</strong>: 更长位数的SHA-2系列算法</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default HashCalculator;

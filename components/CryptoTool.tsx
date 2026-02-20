import React, { useState, useCallback } from 'react';

type Algorithm = 'aes-gcm' | 'aes-cbc';

const CryptoTool: React.FC = () => {
    const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
    const [algorithm, setAlgorithm] = useState<Algorithm>('aes-gcm');
    const [inputText, setInputText] = useState<string>('');
    const [key, setKey] = useState<string>('');
    const [outputText, setOutputText] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isProcessing, setIsProcessing] = useState(false);

    const generateKey = async (): Promise<CryptoKey> => {
        const keyData = new TextEncoder().encode(key);
        const hashBuffer = await crypto.subtle.digest('SHA-256', keyData);
        return crypto.subtle.importKey('raw', hashBuffer, { name: algorithm }, false, ['encrypt', 'decrypt']);
    };

    const encrypt = useCallback(async () => {
        if (!inputText || !key) {
            setError('请输入文本和密钥');
            return;
        }

        setIsProcessing(true);
        setError('');
        try {
            const cryptoKey = await generateKey();
            const iv = crypto.getRandomValues(new Uint8Array(12));
            const encodedText = new TextEncoder().encode(inputText);
            
            const encryptedBuffer = await crypto.subtle.encrypt(
                { name: algorithm, iv },
                cryptoKey,
                encodedText
            );

            const encryptedArray = new Uint8Array(encryptedBuffer);
            const combined = new Uint8Array(iv.length + encryptedArray.length);
            combined.set(iv, 0);
            combined.set(encryptedArray, iv.length);

            const base64 = btoa(String.fromCharCode(...combined));
            setOutputText(base64);
        } catch (err) {
            setError(`加密失败: ${(err as Error).message}`);
        }
        setIsProcessing(false);
    }, [inputText, key, algorithm]);

    const decrypt = useCallback(async () => {
        if (!inputText || !key) {
            setError('请输入密文和密钥');
            return;
        }

        setIsProcessing(true);
        setError('');
        try {
            const cryptoKey = await generateKey();
            const combined = Uint8Array.from(atob(inputText), c => c.charCodeAt(0));
            const iv = combined.slice(0, 12);
            const encryptedData = combined.slice(12);

            const decryptedBuffer = await crypto.subtle.decrypt(
                { name: algorithm, iv },
                cryptoKey,
                encryptedData
            );

            const decryptedText = new TextDecoder().decode(decryptedBuffer);
            setOutputText(decryptedText);
        } catch (err) {
            setError(`解密失败: 密钥错误或数据损坏`);
        }
        setIsProcessing(false);
    }, [inputText, key, algorithm]);

    const handleProcess = () => {
        if (mode === 'encrypt') {
            encrypt();
        } else {
            decrypt();
        }
    };

    const generateRandomKey = () => {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        setKey(Array.from(array, b => b.toString(16).padStart(2, '0')).join('').slice(0, 16));
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            console.error('复制失败:', err);
        }
    };

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-3xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">AES 加密解密</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">使用AES算法加密解密文本，数据安全本地处理</p>
            </div>

            <div className="w-full max-w-3xl space-y-6">
                <div className="flex gap-2">
                    <button
                        onClick={() => { setMode('encrypt'); setOutputText(''); setError(''); }}
                        className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                            mode === 'encrypt'
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                    >
                        加密
                    </button>
                    <button
                        onClick={() => { setMode('decrypt'); setOutputText(''); setError(''); }}
                        className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                            mode === 'decrypt'
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                    >
                        解密
                    </button>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        加密算法
                    </label>
                    <select
                        value={algorithm}
                        onChange={(e) => setAlgorithm(e.target.value as Algorithm)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                        <option value="aes-gcm">AES-GCM (推荐)</option>
                        <option value="aes-cbc">AES-CBC</option>
                    </select>
                </div>

                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            密钥
                        </label>
                        <button
                            onClick={generateRandomKey}
                            className="text-primary text-sm hover:underline"
                        >
                            生成随机密钥
                        </button>
                    </div>
                    <input
                        type="text"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                        placeholder="输入加密密钥"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-mono focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {mode === 'encrypt' ? '原始文本' : '密文 (Base64)'}
                    </label>
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder={mode === 'encrypt' ? '输入要加密的文本' : '输入要解密的Base64密文'}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    />
                </div>

                <button
                    onClick={handleProcess}
                    disabled={isProcessing || !inputText || !key}
                    className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isProcessing ? '处理中...' : (mode === 'encrypt' ? '加密' : '解密')}
                </button>

                {error && (
                    <div className="text-red-500 text-sm">{error}</div>
                )}

                {outputText && (
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                {mode === 'encrypt' ? '密文结果' : '解密结果'}
                            </label>
                            <button
                                onClick={() => copyToClipboard(outputText)}
                                className="text-primary text-sm hover:underline"
                            >
                                复制
                            </button>
                        </div>
                        <textarea
                            value={outputText}
                            readOnly
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
                        />
                    </div>
                )}

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">使用说明</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• AES是高级加密标准，安全性高</li>
                        <li>• AES-GCM提供数据完整性验证，更安全</li>
                        <li>• 请妥善保管密钥，丢失无法解密</li>
                        <li>• 所有加密解密在本地浏览器完成</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CryptoTool;

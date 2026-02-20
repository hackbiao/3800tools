import React, { useState, useCallback } from 'react';

interface ParsedURL {
    protocol: string;
    hostname: string;
    port: string;
    pathname: string;
    search: string;
    hash: string;
    origin: string;
    host: string;
    href: string;
    params: Record<string, string>;
}

const URLParser: React.FC = () => {
    const [inputURL, setInputURL] = useState<string>('');
    const [parsedURL, setParsedURL] = useState<ParsedURL | null>(null);
    const [error, setError] = useState<string>('');

    const parseURL = useCallback(() => {
        setError('');
        setParsedURL(null);

        let urlToParse = inputURL.trim();
        if (!urlToParse) {
            setError('请输入URL');
            return;
        }

        if (!urlToParse.match(/^https?:\/\//i)) {
            urlToParse = 'https://' + urlToParse;
        }

        try {
            const url = new URL(urlToParse);
            
            const params: Record<string, string> = {};
            url.searchParams.forEach((value, key) => {
                params[key] = value;
            });

            setParsedURL({
                protocol: url.protocol,
                hostname: url.hostname,
                port: url.port || (url.protocol === 'https:' ? '443' : '80'),
                pathname: url.pathname,
                search: url.search,
                hash: url.hash,
                origin: url.origin,
                host: url.host,
                href: url.href,
                params,
            });
        } catch {
            setError('无效的URL格式');
        }
    }, [inputURL]);

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            console.error('复制失败:', err);
        }
    };

    const encodeURL = () => {
        try {
            setInputURL(encodeURIComponent(inputURL));
        } catch {
            setError('编码失败');
        }
    };

    const decodeURL = () => {
        try {
            setInputURL(decodeURIComponent(inputURL));
        } catch {
            setError('解码失败');
        }
    };

    const urlParts = parsedURL ? [
        { key: '协议', value: parsedURL.protocol },
        { key: '主机名', value: parsedURL.hostname },
        { key: '端口', value: parsedURL.port },
        { key: '路径', value: parsedURL.pathname },
        { key: '查询参数', value: parsedURL.search || '(无)' },
        { key: '哈希', value: parsedURL.hash || '(无)' },
        { key: 'Origin', value: parsedURL.origin },
        { key: 'Host', value: parsedURL.host },
        { key: '完整URL', value: parsedURL.href },
    ] : [];

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-4xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">URL解析器</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">解析URL结构，提取协议、域名、路径、参数等信息</p>
            </div>

            <div className="w-full max-w-4xl space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        输入URL
                    </label>
                    <textarea
                        value={inputURL}
                        onChange={(e) => setInputURL(e.target.value)}
                        placeholder="输入URL，如：https://example.com/path?query=value#hash"
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    />
                </div>

                <div className="flex gap-2 flex-wrap">
                    <button
                        onClick={parseURL}
                        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                    >
                        解析URL
                    </button>
                    <button
                        onClick={encodeURL}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        URL编码
                    </button>
                    <button
                        onClick={decodeURL}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        URL解码
                    </button>
                </div>

                {error && (
                    <div className="text-red-500 text-sm">{error}</div>
                )}

                {parsedURL && (
                    <div className="space-y-4">
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            <div className="bg-gray-50 dark:bg-gray-700 px-4 py-2 font-medium text-gray-900 dark:text-white">
                                URL组成
                            </div>
                            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                {urlParts.map(item => (
                                    <div key={item.key} className="flex items-start justify-between px-4 py-3">
                                        <span className="text-sm text-gray-500 dark:text-gray-400 w-24 flex-shrink-0">{item.key}</span>
                                        <div className="flex items-center gap-2 flex-1 justify-end">
                                            <code className="text-sm text-gray-900 dark:text-white break-all text-right">{item.value}</code>
                                            <button
                                                onClick={() => copyToClipboard(item.value)}
                                                className="text-primary text-sm hover:underline flex-shrink-0"
                                            >
                                                复制
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {Object.keys(parsedURL.params).length > 0 && (
                            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-2 font-medium text-gray-900 dark:text-white">
                                    查询参数 ({Object.keys(parsedURL.params).length}个)
                                </div>
                                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {Object.entries(parsedURL.params).map(([key, value]) => (
                                        <div key={key} className="flex items-center justify-between px-4 py-3">
                                            <code className="text-sm text-primary">{key}</code>
                                            <div className="flex items-center gap-2">
                                                <code className="text-sm text-gray-900 dark:text-white">{value}</code>
                                                <button
                                                    onClick={() => copyToClipboard(value)}
                                                    className="text-primary text-sm hover:underline"
                                                >
                                                    复制
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">URL结构说明</h3>
                    <div className="text-sm text-gray-600 dark:text-gray-300 font-mono break-all">
                        <span className="text-blue-500">https://</span>
                        <span className="text-green-500">example.com</span>
                        <span className="text-orange-500">:443</span>
                        <span className="text-purple-500">/path/to/page</span>
                        <span className="text-red-500">?key=value&amp;foo=bar</span>
                        <span className="text-cyan-500">#section</span>
                    </div>
                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 grid grid-cols-3 gap-2">
                        <span><span className="text-blue-500">协议</span></span>
                        <span><span className="text-green-500">域名</span></span>
                        <span><span className="text-orange-500">端口</span></span>
                        <span><span className="text-purple-500">路径</span></span>
                        <span><span className="text-red-500">查询</span></span>
                        <span><span className="text-cyan-500">哈希</span></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default URLParser;

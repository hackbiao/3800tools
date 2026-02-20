import React, { useState, useCallback } from 'react';

interface CurlCommand {
    method: string;
    url: string;
    headers: Record<string, string>;
    body: string;
}

const CurlGenerator: React.FC = () => {
    const [method, setMethod] = useState<string>('GET');
    const [url, setUrl] = useState<string>('');
    const [headers, setHeaders] = useState<string>(`Content-Type: application/json`);
    const [body, setBody] = useState<string>('');
    const [curlCommand, setCurlCommand] = useState<string>('');

    const generateCurl = useCallback(() => {
        if (!url.trim()) {
            setCurlCommand('');
            return;
        }

        const parts: string[] = ['curl'];
        
        if (method !== 'GET') {
            parts.push(`-X ${method}`);
        }

        const headerLines = headers.split('\n').filter(line => line.trim());
        headerLines.forEach(header => {
            parts.push(`-H '${header}'`);
        });

        if (['POST', 'PUT', 'PATCH'].includes(method) && body.trim()) {
            parts.push(`-d '${body}'`);
        }

        parts.push(`'${url}'`);

        setCurlCommand(parts.join(' \\\n  '));
    }, [method, url, headers, body]);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(curlCommand);
        } catch (err) {
            console.error('复制失败:', err);
        }
    };

    const presets = [
        { label: 'GET请求', method: 'GET', headers: '', body: '' },
        { label: 'POST JSON', method: 'POST', headers: 'Content-Type: application/json', body: '{"key": "value"}' },
        { label: '表单提交', method: 'POST', headers: 'Content-Type: application/x-www-form-urlencoded', body: 'key=value&foo=bar' },
        { label: 'Bearer认证', method: 'GET', headers: 'Authorization: Bearer your_token_here', body: '' },
    ];

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-4xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">Curl命令生成器</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">生成HTTP请求的curl命令，支持自定义请求头和请求体</p>
            </div>

            <div className="w-full max-w-4xl space-y-6">
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            请求方法
                        </label>
                        <select
                            value={method}
                            onChange={(e) => setMethod(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                            <option value="GET">GET</option>
                            <option value="POST">POST</option>
                            <option value="PUT">PUT</option>
                            <option value="PATCH">PATCH</option>
                            <option value="DELETE">DELETE</option>
                            <option value="HEAD">HEAD</option>
                            <option value="OPTIONS">OPTIONS</option>
                        </select>
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            请求URL
                        </label>
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://api.example.com/endpoint"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        请求头（每行一个）
                    </label>
                    <textarea
                        value={headers}
                        onChange={(e) => setHeaders(e.target.value)}
                        placeholder="Content-Type: application/json&#10;Authorization: Bearer token"
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-mono text-sm focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    />
                </div>

                {['POST', 'PUT', 'PATCH'].includes(method) && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            请求体
                        </label>
                        <textarea
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder='{"key": "value"}'
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-mono text-sm focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                        />
                    </div>
                )}

                <div className="flex flex-wrap gap-2">
                    {presets.map(preset => (
                        <button
                            key={preset.label}
                            onClick={() => {
                                setMethod(preset.method);
                                setHeaders(preset.headers);
                                setBody(preset.body);
                            }}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
                        >
                            {preset.label}
                        </button>
                    ))}
                </div>

                <button
                    onClick={generateCurl}
                    disabled={!url}
                    className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    生成Curl命令
                </button>

                {curlCommand && (
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                生成的Curl命令
                            </label>
                            <button
                                onClick={copyToClipboard}
                                className="text-primary text-sm hover:underline"
                            >
                                复制
                            </button>
                        </div>
                        <pre className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto whitespace-pre-wrap">
                            {curlCommand}
                        </pre>
                    </div>
                )}

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">常用选项</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <div><code>-X</code> 指定请求方法</div>
                        <div><code>-H</code> 添加请求头</div>
                        <div><code>-d</code> 发送数据</div>
                        <div><code>-i</code> 显示响应头</div>
                        <div><code>-v</code> 显示详细信息</div>
                        <div><code>-L</code> 跟随重定向</div>
                        <div><code>-o</code> 输出到文件</div>
                        <div><code>-k</code> 跳过SSL验证</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurlGenerator;

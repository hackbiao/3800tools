import React, { useState } from 'react';

const HTTP_STATUS_CODES = [
    { code: 200, name: 'OK', description: '请求成功' },
    { code: 201, name: 'Created', description: '创建成功' },
    { code: 204, name: 'No Content', description: '无内容，成功处理请求' },
    { code: 301, name: 'Moved Permanently', description: '永久重定向' },
    { code: 302, name: 'Found', description: '临时重定向' },
    { code: 304, name: 'Not Modified', description: '资源未修改' },
    { code: 307, name: 'Temporary Redirect', description: '临时重定向，保持请求方法' },
    { code: 308, name: 'Permanent Redirect', description: '永久重定向，保持请求方法' },
    { code: 400, name: 'Bad Request', description: '请求语法错误' },
    { code: 401, name: 'Unauthorized', description: '未授权，需要身份验证' },
    { code: 403, name: 'Forbidden', description: '禁止访问' },
    { code: 404, name: 'Not Found', description: '资源不存在' },
    { code: 405, name: 'Method Not Allowed', description: '请求方法不允许' },
    { code: 408, name: 'Request Timeout', description: '请求超时' },
    { code: 409, name: 'Conflict', description: '请求冲突' },
    { code: 410, name: 'Gone', description: '资源已删除' },
    { code: 413, name: 'Payload Too Large', description: '请求实体过大' },
    { code: 414, name: 'URI Too Long', description: 'URI过长' },
    { code: 415, name: 'Unsupported Media Type', description: '不支持的媒体类型' },
    { code: 418, name: "I'm a teapot", description: '我是一个茶壶' },
    { code: 429, name: 'Too Many Requests', description: '请求过于频繁' },
    { code: 500, name: 'Internal Server Error', description: '服务器内部错误' },
    { code: 501, name: 'Not Implemented', description: '服务器不支持此功能' },
    { code: 502, name: 'Bad Gateway', description: '网关错误' },
    { code: 503, name: 'Service Unavailable', description: '服务不可用' },
    { code: 504, name: 'Gateway Timeout', description: '网关超时' },
    { code: 505, name: 'HTTP Version Not Supported', description: 'HTTP版本不支持' },
];

const StatusCodeLookup: React.FC = () => {
    const [searchCode, setSearchCode] = useState<string>('');
    const [selectedCode, setSelectedCode] = useState<typeof HTTP_STATUS_CODES[0] | null>(null);
    const [filterText, setFilterText] = useState<string>('');

    const handleSearch = () => {
        const code = parseInt(searchCode);
        const found = HTTP_STATUS_CODES.find(item => item.code === code);
        setSelectedCode(found || null);
    };

    const getCategoryInfo = (code: number): { name: string; color: string; bg: string } => {
        if (code >= 200 && code < 300) return { name: '成功响应', color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/30' };
        if (code >= 300 && code < 400) return { name: '重定向', color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30' };
        if (code >= 400 && code < 500) return { name: '客户端错误', color: 'text-orange-600', bg: 'bg-orange-100 dark:bg-orange-900/30' };
        if (code >= 500) return { name: '服务器错误', color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900/30' };
        return { name: '未知', color: 'text-gray-600', bg: 'bg-gray-100' };
    };

    const filteredCodes = HTTP_STATUS_CODES.filter(item => 
        item.code.toString().includes(filterText) ||
        item.name.toLowerCase().includes(filterText.toLowerCase()) ||
        item.description.includes(filterText)
    );

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-4xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">HTTP状态码查询</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">查询HTTP状态码含义，了解常见响应码</p>
            </div>

            <div className="w-full max-w-4xl space-y-6">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={searchCode}
                        onChange={(e) => setSearchCode(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        placeholder="输入状态码，如：404"
                        className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <button
                        onClick={handleSearch}
                        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                    >
                        查询
                    </button>
                </div>

                {selectedCode && (
                    <div className={`rounded-lg p-6 ${getCategoryInfo(selectedCode.code).bg}`}>
                        <div className="flex items-center gap-4 mb-4">
                            <span className={`text-5xl font-bold ${getCategoryInfo(selectedCode.code).color}`}>
                                {selectedCode.code}
                            </span>
                            <div>
                                <div className="text-xl font-bold text-gray-900 dark:text-white">{selectedCode.name}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">{getCategoryInfo(selectedCode.code).name}</div>
                            </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">{selectedCode.description}</p>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        状态码列表
                    </label>
                    <input
                        type="text"
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                        placeholder="搜索状态码..."
                        className="w-full px-4 py-2 mb-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-96 overflow-y-auto">
                        {filteredCodes.map(item => {
                            const cat = getCategoryInfo(item.code);
                            return (
                                <button
                                    key={item.code}
                                    onClick={() => { setSearchCode(item.code.toString()); setSelectedCode(item); }}
                                    className={`flex items-center gap-3 p-3 rounded-lg text-left hover:opacity-80 transition-opacity ${cat.bg}`}
                                >
                                    <span className={`text-2xl font-bold ${cat.color} w-12`}>{item.code}</span>
                                    <div>
                                        <div className="font-medium text-gray-900 dark:text-white text-sm">{item.name}</div>
                                        <div className="text-xs text-gray-600 dark:text-gray-400">{item.description}</div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">状态码分类</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                        <div>
                            <span className="font-medium text-green-600">2xx 成功</span>
                            <p className="text-gray-500 dark:text-gray-400">请求成功处理</p>
                        </div>
                        <div>
                            <span className="font-medium text-blue-600">3xx 重定向</span>
                            <p className="text-gray-500 dark:text-gray-400">需要进一步操作</p>
                        </div>
                        <div>
                            <span className="font-medium text-orange-600">4xx 客户端错误</span>
                            <p className="text-gray-500 dark:text-gray-400">请求语法错误</p>
                        </div>
                        <div>
                            <span className="font-medium text-red-600">5xx 服务器错误</span>
                            <p className="text-gray-500 dark:text-gray-400">服务器处理失败</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatusCodeLookup;

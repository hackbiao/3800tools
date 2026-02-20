import React, { useState } from 'react';

const COMMON_PORTS = [
    { port: 20, name: 'FTP Data', description: '文件传输协议数据端口' },
    { port: 21, name: 'FTP Control', description: '文件传输协议控制端口' },
    { port: 22, name: 'SSH', description: '安全外壳协议' },
    { port: 23, name: 'Telnet', description: '远程登录协议' },
    { port: 25, name: 'SMTP', description: '简单邮件传输协议' },
    { port: 53, name: 'DNS', description: '域名系统' },
    { port: 67, name: 'DHCP Server', description: 'DHCP服务器端口' },
    { port: 68, name: 'DHCP Client', description: 'DHCP客户端端口' },
    { port: 80, name: 'HTTP', description: '超文本传输协议' },
    { port: 110, name: 'POP3', description: '邮局协议第3版' },
    { port: 119, name: 'NNTP', description: '网络新闻传输协议' },
    { port: 123, name: 'NTP', description: '网络时间协议' },
    { port: 143, name: 'IMAP', description: '互联网消息访问协议' },
    { port: 161, name: 'SNMP', description: '简单网络管理协议' },
    { port: 162, name: 'SNMP Trap', description: 'SNMP陷阱' },
    { port: 389, name: 'LDAP', description: '轻量级目录访问协议' },
    { port: 443, name: 'HTTPS', description: '安全超文本传输协议' },
    { port: 445, name: 'SMB', description: 'Server Message Block' },
    { port: 465, name: 'SMTPS', description: 'SMTP over SSL' },
    { port: 514, name: 'Syslog', description: '系统日志' },
    { port: 587, name: 'SMTP Submission', description: 'SMTP提交端口' },
    { port: 636, name: 'LDAPS', description: 'LDAP over SSL' },
    { port: 993, name: 'IMAPS', description: 'IMAP over SSL' },
    { port: 995, name: 'POP3S', description: 'POP3 over SSL' },
    { port: 1080, name: 'SOCKS', description: 'SOCKS代理' },
    { port: 1433, name: 'MSSQL', description: 'Microsoft SQL Server' },
    { port: 1521, name: 'Oracle', description: 'Oracle数据库' },
    { port: 2049, name: 'NFS', description: '网络文件系统' },
    { port: 3306, name: 'MySQL', description: 'MySQL数据库' },
    { port: 3389, name: 'RDP', description: '远程桌面协议' },
    { port: 5432, name: 'PostgreSQL', description: 'PostgreSQL数据库' },
    { port: 5672, name: 'RabbitMQ', description: 'RabbitMQ消息队列' },
    { port: 5900, name: 'VNC', description: '虚拟网络计算' },
    { port: 6379, name: 'Redis', description: 'Redis数据库' },
    { port: 8080, name: 'HTTP Alt', description: 'HTTP备用端口' },
    { port: 8443, name: 'HTTPS Alt', description: 'HTTPS备用端口' },
    { port: 9000, name: 'PHP-FPM', description: 'PHP FastCGI进程管理器' },
    { port: 9200, name: 'Elasticsearch', description: 'Elasticsearch HTTP' },
    { port: 27017, name: 'MongoDB', description: 'MongoDB数据库' },
];

const PortLookup: React.FC = () => {
    const [searchPort, setSearchPort] = useState<string>('');
    const [selectedPort, setSelectedPort] = useState<typeof COMMON_PORTS[0] | null>(null);
    const [filterText, setFilterText] = useState<string>('');

    const handleSearch = () => {
        const port = parseInt(searchPort);
        const found = COMMON_PORTS.find(item => item.port === port);
        setSelectedPort(found || null);
    };

    const getPortType = (port: number): { name: string; range: string } => {
        if (port >= 0 && port <= 1023) return { name: '系统端口', range: '0-1023' };
        if (port >= 1024 && port <= 49151) return { name: '注册端口', range: '1024-49151' };
        return { name: '动态端口', range: '49152-65535' };
    };

    const filteredPorts = COMMON_PORTS.filter(item =>
        item.port.toString().includes(filterText) ||
        item.name.toLowerCase().includes(filterText.toLowerCase()) ||
        item.description.includes(filterText)
    );

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-4xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">常用端口查询</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">查询常用网络端口及其用途</p>
            </div>

            <div className="w-full max-w-4xl space-y-6">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={searchPort}
                        onChange={(e) => setSearchPort(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        placeholder="输入端口号，如：80"
                        className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <button
                        onClick={handleSearch}
                        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                    >
                        查询
                    </button>
                </div>

                {selectedPort && (
                    <div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-6">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-5xl font-bold text-primary">{selectedPort.port}</span>
                            <div>
                                <div className="text-xl font-bold text-gray-900 dark:text-white">{selectedPort.name}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">{getPortType(selectedPort.port).name}</div>
                            </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">{selectedPort.description}</p>
                    </div>
                )}

                {searchPort && !selectedPort && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 rounded-lg p-4">
                        端口 {searchPort} 不在常用端口列表中。{getPortType(parseInt(searchPort)).name}（范围：{getPortType(parseInt(searchPort)).range}）
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        常用端口列表
                    </label>
                    <input
                        type="text"
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                        placeholder="搜索端口..."
                        className="w-full px-4 py-2 mb-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-96 overflow-y-auto">
                        {filteredPorts.map(item => (
                            <button
                                key={item.port}
                                onClick={() => { setSearchPort(item.port.toString()); setSelectedPort(item); }}
                                className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-left transition-colors"
                            >
                                <span className="text-xl font-bold text-primary w-12">{item.port}</span>
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium text-gray-900 dark:text-white text-sm truncate">{item.name}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{item.description}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">端口范围说明</h3>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                            <span className="font-medium text-red-600">系统端口</span>
                            <p className="text-gray-500 dark:text-gray-400">0-1023</p>
                            <p className="text-xs text-gray-400">需要管理员权限</p>
                        </div>
                        <div>
                            <span className="font-medium text-yellow-600">注册端口</span>
                            <p className="text-gray-500 dark:text-gray-400">1024-49151</p>
                            <p className="text-xs text-gray-400">IANA分配</p>
                        </div>
                        <div>
                            <span className="font-medium text-green-600">动态端口</span>
                            <p className="text-gray-500 dark:text-gray-400">49152-65535</p>
                            <p className="text-xs text-gray-400">临时使用</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PortLookup;

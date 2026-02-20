import React, { useState } from 'react';

interface LinuxCommand {
    name: string;
    category: string;
    description: string;
    usage: string;
    examples: string[];
}

const linuxCommands: LinuxCommand[] = [
    { name: 'ls', category: '文件管理', description: '列出目录内容', usage: 'ls [选项] [目录]', examples: ['ls -la', 'ls -lh /home'] },
    { name: 'cd', category: '文件管理', description: '切换工作目录', usage: 'cd [目录路径]', examples: ['cd /home/user', 'cd ..', 'cd ~'] },
    { name: 'pwd', category: '文件管理', description: '显示当前工作目录', usage: 'pwd', examples: ['pwd'] },
    { name: 'mkdir', category: '文件管理', description: '创建目录', usage: 'mkdir [选项] 目录名', examples: ['mkdir test', 'mkdir -p /a/b/c'] },
    { name: 'rm', category: '文件管理', description: '删除文件或目录', usage: 'rm [选项] 文件或目录', examples: ['rm file.txt', 'rm -rf directory'] },
    { name: 'cp', category: '文件管理', description: '复制文件或目录', usage: 'cp [选项] 源 目标', examples: ['cp file1.txt file2.txt', 'cp -r dir1 dir2'] },
    { name: 'mv', category: '文件管理', description: '移动或重命名文件', usage: 'mv 源 目标', examples: ['mv old.txt new.txt', 'mv file.txt /tmp/'] },
    { name: 'touch', category: '文件管理', description: '创建空文件或更新时间戳', usage: 'touch 文件名', examples: ['touch newfile.txt'] },
    { name: 'cat', category: '文件查看', description: '查看文件内容', usage: 'cat [选项] 文件', examples: ['cat file.txt', 'cat -n file.txt'] },
    { name: 'less', category: '文件查看', description: '分页查看文件', usage: 'less 文件', examples: ['less largefile.log'] },
    { name: 'head', category: '文件查看', description: '查看文件开头内容', usage: 'head [选项] 文件', examples: ['head -n 20 file.txt'] },
    { name: 'tail', category: '文件查看', description: '查看文件结尾内容', usage: 'tail [选项] 文件', examples: ['tail -f /var/log/syslog', 'tail -n 100 file.txt'] },
    { name: 'grep', category: '文本处理', description: '搜索文本模式', usage: 'grep [选项] 模式 文件', examples: ['grep "error" log.txt', 'grep -r "TODO" ./'] },
    { name: 'sed', category: '文本处理', description: '流编辑器，文本替换', usage: 'sed [选项] 命令 文件', examples: ['sed "s/old/new/g" file.txt', 'sed -i "s/foo/bar/g" file.txt'] },
    { name: 'awk', category: '文本处理', description: '文本处理工具', usage: 'awk \'程序\' 文件', examples: ['awk \'{print $1}\' file.txt', 'awk -F: \'{print $1}\' /etc/passwd'] },
    { name: 'sort', category: '文本处理', description: '排序文本行', usage: 'sort [选项] 文件', examples: ['sort file.txt', 'sort -n numbers.txt', 'sort -k2 file.txt'] },
    { name: 'uniq', category: '文本处理', description: '去除重复行', usage: 'uniq [选项] 文件', examples: ['sort file.txt | uniq', 'uniq -c file.txt'] },
    { name: 'wc', category: '文本处理', description: '统计行数、词数、字节数', usage: 'wc [选项] 文件', examples: ['wc -l file.txt', 'wc -w file.txt'] },
    { name: 'find', category: '文件搜索', description: '搜索文件', usage: 'find 路径 [选项] 表达式', examples: ['find . -name "*.txt"', 'find / -type f -size +100M'] },
    { name: 'locate', category: '文件搜索', description: '快速定位文件', usage: 'locate 文件名', examples: ['locate nginx.conf'] },
    { name: 'which', category: '文件搜索', description: '查找命令位置', usage: 'which 命令', examples: ['which python', 'which node'] },
    { name: 'chmod', category: '权限管理', description: '修改文件权限', usage: 'chmod [选项] 模式 文件', examples: ['chmod 755 script.sh', 'chmod +x script.sh'] },
    { name: 'chown', category: '权限管理', description: '修改文件所有者', usage: 'chown 用户:组 文件', examples: ['chown user:group file.txt', 'chown -R user:group directory'] },
    { name: 'ps', category: '进程管理', description: '显示进程状态', usage: 'ps [选项]', examples: ['ps aux', 'ps -ef | grep nginx'] },
    { name: 'top', category: '进程管理', description: '实时显示进程状态', usage: 'top', examples: ['top', 'top -u username'] },
    { name: 'kill', category: '进程管理', description: '终止进程', usage: 'kill [信号] PID', examples: ['kill 1234', 'kill -9 1234'] },
    { name: 'killall', category: '进程管理', description: '按名称终止进程', usage: 'killall 进程名', examples: ['killall nginx', 'killall -9 python'] },
    { name: 'df', category: '磁盘管理', description: '显示磁盘使用情况', usage: 'df [选项]', examples: ['df -h', 'df -T'] },
    { name: 'du', category: '磁盘管理', description: '显示目录空间占用', usage: 'du [选项] 目录', examples: ['du -sh /home', 'du -h --max-depth=1'] },
    { name: 'mount', category: '磁盘管理', description: '挂载文件系统', usage: 'mount 设备 挂载点', examples: ['mount /dev/sda1 /mnt', 'mount -t ntfs /dev/sdb1 /mnt'] },
    { name: 'umount', category: '磁盘管理', description: '卸载文件系统', usage: 'umount 挂载点', examples: ['umount /mnt'] },
    { name: 'tar', category: '压缩解压', description: '打包压缩工具', usage: 'tar [选项] 文件', examples: ['tar -czvf archive.tar.gz dir/', 'tar -xzvf archive.tar.gz'] },
    { name: 'gzip', category: '压缩解压', description: 'gzip压缩', usage: 'gzip [选项] 文件', examples: ['gzip file.txt', 'gzip -d file.txt.gz'] },
    { name: 'zip', category: '压缩解压', description: 'zip压缩', usage: 'zip 压缩包 文件', examples: ['zip archive.zip file1 file2', 'unzip archive.zip'] },
    { name: 'ssh', category: '网络工具', description: '远程登录', usage: 'ssh [选项] 用户@主机', examples: ['ssh user@192.168.1.1', 'ssh -p 2222 user@host'] },
    { name: 'scp', category: '网络工具', description: '远程复制文件', usage: 'scp 源 目标', examples: ['scp file.txt user@host:/path/', 'scp user@host:/file.txt .'] },
    { name: 'wget', category: '网络工具', description: '下载文件', usage: 'wget [选项] URL', examples: ['wget https://example.com/file.zip', 'wget -c URL'] },
    { name: 'curl', category: '网络工具', description: '传输数据工具', usage: 'curl [选项] URL', examples: ['curl https://api.example.com', 'curl -X POST -d "data" URL'] },
    { name: 'netstat', category: '网络工具', description: '显示网络状态', usage: 'netstat [选项]', examples: ['netstat -tunlp', 'netstat -an | grep 80'] },
    { name: 'ifconfig', category: '网络工具', description: '配置网络接口', usage: 'ifconfig [接口]', examples: ['ifconfig', 'ifconfig eth0'] },
    { name: 'ping', category: '网络工具', description: '测试网络连通性', usage: 'ping 主机', examples: ['ping google.com', 'ping -c 4 192.168.1.1'] },
    { name: 'systemctl', category: '系统服务', description: '管理系统服务', usage: 'systemctl 命令 服务名', examples: ['systemctl start nginx', 'systemctl enable nginx', 'systemctl status nginx'] },
    { name: 'journalctl', category: '系统服务', description: '查看系统日志', usage: 'journalctl [选项]', examples: ['journalctl -u nginx', 'journalctl -f'] },
    { name: 'crontab', category: '系统服务', description: '管理定时任务', usage: 'crontab [选项]', examples: ['crontab -e', 'crontab -l'] },
    { name: 'apt', category: '包管理', description: 'Debian/Ubuntu包管理器', usage: 'apt 命令 包名', examples: ['apt update', 'apt install nginx', 'apt remove nginx'] },
    { name: 'yum', category: '包管理', description: 'CentOS/RHEL包管理器', usage: 'yum 命令 包名', examples: ['yum update', 'yum install nginx'] },
    { name: 'docker', category: '容器', description: '容器管理工具', usage: 'docker 命令 [选项]', examples: ['docker ps', 'docker run -d nginx', 'docker-compose up -d'] },
];

const LinuxCommandDict: React.FC = () => {
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('全部');
    const [selectedCommand, setSelectedCommand] = useState<LinuxCommand | null>(null);

    const categories = ['全部', ...new Set(linuxCommands.map(cmd => cmd.category))];

    const filteredCommands = linuxCommands.filter(cmd => {
        const matchSearch = cmd.name.includes(search.toLowerCase()) || 
                           cmd.description.toLowerCase().includes(search.toLowerCase());
        const matchCategory = selectedCategory === '全部' || cmd.category === selectedCategory;
        return matchSearch && matchCategory;
    });

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-5xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">Linux命令字典</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">常用Linux命令速查手册</p>
            </div>

            <div className="w-full max-w-5xl space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="搜索命令..."
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-3 py-1.5 rounded-lg text-sm ${selectedCategory === cat ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredCommands.length === 0 ? (
                                <div className="p-8 text-center text-gray-400">未找到匹配的命令</div>
                            ) : (
                                filteredCommands.map((cmd, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setSelectedCommand(cmd)}
                                        className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${selectedCommand?.name === cmd.name ? 'bg-primary/5 dark:bg-primary/10' : ''}`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <code className="text-primary font-mono font-bold">{cmd.name}</code>
                                                <span className="ml-2 text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">{cmd.category}</span>
                                            </div>
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{cmd.description}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        {selectedCommand ? (
                            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 sticky top-4">
                                <h3 className="text-lg font-bold text-primary font-mono mb-2">{selectedCommand.name}</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">{selectedCommand.description}</p>
                                
                                <div className="mb-4">
                                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">用法</h4>
                                    <code className="block bg-gray-100 dark:bg-gray-900 p-2 rounded text-sm font-mono">{selectedCommand.usage}</code>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">示例</h4>
                                    <div className="space-y-2">
                                        {selectedCommand.examples.map((example, i) => (
                                            <code key={i} className="block bg-gray-100 dark:bg-gray-900 p-2 rounded text-sm font-mono text-green-600 dark:text-green-400">
                                                $ {example}
                                            </code>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 text-center text-gray-400">
                                选择一个命令查看详情
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">提示</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• 点击命令查看详细用法和示例</li>
                        <li>• 使用搜索框快速查找命令</li>
                        <li>• 按分类筛选相关命令</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default LinuxCommandDict;

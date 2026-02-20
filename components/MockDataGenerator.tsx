import React, { useState } from 'react';

interface Field {
    name: string;
    type: 'id' | 'name' | 'email' | 'phone' | 'address' | 'company' | 'date' | 'number' | 'string' | 'boolean' | 'uuid';
}

const MockDataGenerator: React.FC = () => {
    const [fields, setFields] = useState<Field[]>([
        { name: 'id', type: 'id' },
        { name: 'name', type: 'name' },
        { name: 'email', type: 'email' },
    ]);
    const [count, setCount] = useState(10);
    const [outputFormat, setOutputFormat] = useState<'json' | 'sql' | 'csv'>('json');
    const [tableName, setTableName] = useState('users');
    const [result, setResult] = useState('');

    const typeOptions: { value: Field['type']; label: string }[] = [
        { value: 'id', label: 'ID' },
        { value: 'name', label: '姓名' },
        { value: 'email', label: '邮箱' },
        { value: 'phone', label: '手机号' },
        { value: 'address', label: '地址' },
        { value: 'company', label: '公司' },
        { value: 'date', label: '日期' },
        { value: 'number', label: '数字' },
        { value: 'string', label: '字符串' },
        { value: 'boolean', label: '布尔值' },
        { value: 'uuid', label: 'UUID' },
    ];

    const generators: Record<Field['type'], () => string | number | boolean> = {
        id: () => Math.floor(Math.random() * 10000),
        name: () => {
            const first = ['张', '李', '王', '刘', '陈', '杨', '赵'][Math.floor(Math.random() * 7)];
            const last = ['伟', '芳', '娜', '敏', '静', '强', '磊'][Math.floor(Math.random() * 7)];
            return first + last;
        },
        email: () => {
            const name = Math.random().toString(36).substring(2, 8);
            const domains = ['qq.com', '163.com', 'gmail.com'];
            return `${name}@${domains[Math.floor(Math.random() * domains.length)]}`;
        },
        phone: () => {
            const prefix = ['138', '139', '186', '187', '150'][Math.floor(Math.random() * 5)];
            return prefix + Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
        },
        address: () => {
            const cities = ['北京市海淀区', '上海市浦东新区', '深圳市南山区', '杭州市西湖区'];
            const street = ['中山路', '人民路', '建设路'][Math.floor(Math.random() * 3)];
            return `${cities[Math.floor(Math.random() * cities.length)]}${street}${Math.floor(Math.random() * 200) + 1}号`;
        },
        company: () => {
            const prefix = ['华', '中', '新', '博', '天'][Math.floor(Math.random() * 5)];
            return `${prefix}云科技有限公司`;
        },
        date: () => {
            const start = new Date(2020, 0, 1);
            const end = new Date();
            const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
            return date.toISOString().split('T')[0];
        },
        number: () => Math.floor(Math.random() * 1000),
        string: () => Math.random().toString(36).substring(2, 10),
        boolean: () => Math.random() > 0.5,
        uuid: () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        }),
    };

    const addField = () => {
        setFields([...fields, { name: `field_${fields.length + 1}`, type: 'string' }]);
    };

    const updateField = (index: number, key: keyof Field, value: string) => {
        const newFields = [...fields];
        newFields[index] = { ...newFields[index], [key]: value };
        setFields(newFields);
    };

    const removeField = (index: number) => {
        setFields(fields.filter((_, i) => i !== index));
    };

    const generateData = () => {
        const data: Record<string, any>[] = [];
        for (let i = 0; i < count; i++) {
            const row: Record<string, any> = {};
            fields.forEach(field => {
                row[field.name] = generators[field.type]();
            });
            data.push(row);
        }

        let output = '';
        switch (outputFormat) {
            case 'json':
                output = JSON.stringify(data, null, 2);
                break;
            case 'sql':
                const columns = fields.map(f => f.name).join(', ');
                const values = data.map(row => {
                    const vals = fields.map(f => {
                        const val = row[f.name];
                        if (typeof val === 'string') return `'${val}'`;
                        return val;
                    }).join(', ');
                    return `(${vals})`;
                }).join(',\n');
                output = `INSERT INTO ${tableName} (${columns})\nVALUES\n${values};`;
                break;
            case 'csv':
                const header = fields.map(f => f.name).join(',');
                const rows = data.map(row => 
                    fields.map(f => {
                        const val = row[f.name];
                        if (typeof val === 'string' && val.includes(',')) return `"${val}"`;
                        return val;
                    }).join(',')
                ).join('\n');
                output = `${header}\n${rows}`;
                break;
        }
        setResult(output);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(result);
    };

    const handleDownload = () => {
        const ext = outputFormat === 'json' ? 'json' : outputFormat === 'sql' ? 'sql' : 'csv';
        const blob = new Blob([result], { type: 'text/plain' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `mock_data.${ext}`;
        a.click();
    };

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-4xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">Mock数据生成器</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">生成SQL、JSON、CSV格式的模拟测试数据</p>
            </div>

            <div className="w-full max-w-4xl space-y-6">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-gray-900 dark:text-white">字段配置</h3>
                        <button
                            onClick={addField}
                            className="px-3 py-1 bg-primary text-white rounded-lg text-sm hover:bg-primary/90"
                        >
                            添加字段
                        </button>
                    </div>
                    <div className="space-y-2">
                        {fields.map((field, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={field.name}
                                    onChange={(e) => updateField(index, 'name', e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                                    placeholder="字段名"
                                />
                                <select
                                    value={field.type}
                                    onChange={(e) => updateField(index, 'type', e.target.value as Field['type'])}
                                    className="w-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                                >
                                    {typeOptions.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                                <button
                                    onClick={() => removeField(index)}
                                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">生成数量: {count}</label>
                        <input
                            type="range"
                            min="1"
                            max="100"
                            value={count}
                            onChange={(e) => setCount(parseInt(e.target.value))}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">输出格式</label>
                        <select
                            value={outputFormat}
                            onChange={(e) => setOutputFormat(e.target.value as 'json' | 'sql' | 'csv')}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                            <option value="json">JSON</option>
                            <option value="sql">SQL INSERT</option>
                            <option value="csv">CSV</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">表名（SQL用）</label>
                        <input
                            type="text"
                            value={tableName}
                            onChange={(e) => setTableName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={generateData}
                        className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        生成数据
                    </button>
                    {result && (
                        <>
                            <button
                                onClick={handleCopy}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                            >
                                复制
                            </button>
                            <button
                                onClick={handleDownload}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                下载
                            </button>
                        </>
                    )}
                </div>

                {result && (
                    <div className="bg-gray-900 rounded-lg p-4 max-h-[400px] overflow-auto">
                        <pre className="text-gray-100 text-sm font-mono whitespace-pre-wrap">{result}</pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MockDataGenerator;

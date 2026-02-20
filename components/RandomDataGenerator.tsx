import React, { useState } from 'react';

type DataType = 'name' | 'phone' | 'email' | 'idcard' | 'address' | 'company' | 'bankcard' | 'ip' | 'url' | 'date' | 'uuid';

const RandomDataGenerator: React.FC = () => {
    const [dataType, setDataType] = useState<DataType>('name');
    const [count, setCount] = useState(10);
    const [result, setResult] = useState<string[]>([]);

    const firstNames = ['张', '李', '王', '刘', '陈', '杨', '赵', '黄', '周', '吴', '徐', '孙', '胡', '朱', '高', '林', '何', '郭', '马', '罗'];
    const lastNames = ['伟', '芳', '娜', '秀英', '敏', '静', '丽', '强', '磊', '军', '洋', '勇', '艳', '杰', '娟', '涛', '明', '超', '秀兰', '霞', '平', '刚', '桂英'];
    
    const provinces = ['北京市', '上海市', '广东省', '浙江省', '江苏省', '山东省', '四川省', '湖北省', '河南省', '陕西省'];
    const cities = ['海淀区', '朝阳区', '浦东新区', '南山区', '西湖区', '江宁区', '高新区', '武侯区', '雁塔区', '郑东新区'];
    const streets = ['中山路', '人民路', '解放路', '建设路', '和平路', '长安街', '复兴路', '科技路', '文化路', '学院路'];

    const companies = ['科技有限公司', '网络技术有限公司', '信息技术有限公司', '软件有限公司', '互联网有限公司', '数据科技有限公司', '智能科技有限公司'];
    const companyPrefixes = ['华', '中', '新', '博', '天', '云', '智', '创', '联', '通', '网', '信', '科', '数', '电'];

    const generateName = (): string => {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        return firstName + lastName;
    };

    const generatePhone = (): string => {
        const prefixes = ['130', '131', '132', '133', '134', '135', '136', '137', '138', '139', '150', '151', '152', '153', '155', '156', '157', '158', '159', '170', '176', '177', '178', '180', '181', '182', '183', '184', '185', '186', '187', '188', '189'];
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        return prefix + Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
    };

    const generateEmail = (): string => {
        const domains = ['qq.com', '163.com', '126.com', 'gmail.com', 'outlook.com', 'sina.com', 'sohu.com', 'foxmail.com'];
        const name = Math.random().toString(36).substring(2, 10);
        const domain = domains[Math.floor(Math.random() * domains.length)];
        return `${name}@${domain}`;
    };

    const generateIdCard = (): string => {
        const provinceCodes = ['110000', '310000', '440000', '330000', '320000', '370000', '510000', '420000', '410000', '610000'];
        const province = provinceCodes[Math.floor(Math.random() * provinceCodes.length)];
        const year = 1960 + Math.floor(Math.random() * 40);
        const month = (Math.floor(Math.random() * 12) + 1).toString().padStart(2, '0');
        const day = (Math.floor(Math.random() * 28) + 1).toString().padStart(2, '0');
        const seq = Math.floor(Math.random() * 999).toString().padStart(3, '0');
        const base = province.substring(0, 2) + '01' + year + month + day + seq;
        
        const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        const checkCodes = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
        let sum = 0;
        for (let i = 0; i < 17; i++) {
            sum += parseInt(base[i]) * weights[i];
        }
        return base + checkCodes[sum % 11];
    };

    const generateAddress = (): string => {
        const province = provinces[Math.floor(Math.random() * provinces.length)];
        const city = cities[Math.floor(Math.random() * cities.length)];
        const street = streets[Math.floor(Math.random() * streets.length)];
        const number = Math.floor(Math.random() * 999) + 1;
        const room = Math.floor(Math.random() * 30) + 1;
        return `${province}${city}${street}${number}号${room}室`;
    };

    const generateCompany = (): string => {
        const prefix1 = companyPrefixes[Math.floor(Math.random() * companyPrefixes.length)];
        const prefix2 = companyPrefixes[Math.floor(Math.random() * companyPrefixes.length)];
        const suffix = companies[Math.floor(Math.random() * companies.length)];
        return prefix1 + prefix2 + suffix;
    };

    const generateBankCard = (): string => {
        const prefixes = ['6222', '6228', '6217', '6225', '6214', '6259'];
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        let card = prefix;
        for (let i = 0; i < 15; i++) {
            card += Math.floor(Math.random() * 10);
        }
        return card;
    };

    const generateIP = (): string => {
        return `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
    };

    const generateURL = (): string => {
        const domains = ['example.com', 'test.org', 'demo.net', 'sample.cn'];
        const paths = ['', '/api', '/user', '/product', '/article', '/news'];
        const domain = domains[Math.floor(Math.random() * domains.length)];
        const path = paths[Math.floor(Math.random() * paths.length)];
        const id = Math.floor(Math.random() * 10000);
        return `https://www.${domain}${path}${path ? '/' + id : ''}`;
    };

    const generateDate = (): string => {
        const start = new Date(2000, 0, 1);
        const end = new Date();
        const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        return date.toISOString().split('T')[0];
    };

    const generateUUID = (): string => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    const generators: Record<DataType, () => string> = {
        name: generateName,
        phone: generatePhone,
        email: generateEmail,
        idcard: generateIdCard,
        address: generateAddress,
        company: generateCompany,
        bankcard: generateBankCard,
        ip: generateIP,
        url: generateURL,
        date: generateDate,
        uuid: generateUUID,
    };

    const dataTypeLabels: Record<DataType, string> = {
        name: '姓名',
        phone: '手机号',
        email: '邮箱',
        idcard: '身份证',
        address: '地址',
        company: '公司名',
        bankcard: '银行卡号',
        ip: 'IP地址',
        url: '网址',
        date: '日期',
        uuid: 'UUID',
    };

    const handleGenerate = () => {
        const generator = generators[dataType];
        const data: string[] = [];
        for (let i = 0; i < count; i++) {
            data.push(generator());
        }
        setResult(data);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(result.join('\n'));
    };

    const handleCopyJSON = () => {
        navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    };

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-4xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">随机数据生成器</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">生成测试用的随机数据，支持多种数据类型</p>
            </div>

            <div className="w-full max-w-4xl space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">数据类型</label>
                        <div className="grid grid-cols-4 gap-2">
                            {(Object.keys(dataTypeLabels) as DataType[]).map(type => (
                                <button
                                    key={type}
                                    onClick={() => setDataType(type)}
                                    className={`px-2 py-2 rounded-lg text-sm ${dataType === type ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                                >
                                    {dataTypeLabels[type]}
                                </button>
                            ))}
                        </div>
                    </div>
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
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={handleGenerate}
                        className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        生成数据
                    </button>
                    {result.length > 0 && (
                        <>
                            <button
                                onClick={handleCopy}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                            >
                                复制
                            </button>
                            <button
                                onClick={handleCopyJSON}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                复制JSON
                            </button>
                        </>
                    )}
                </div>

                {result.length > 0 && (
                    <div className="bg-gray-900 rounded-lg p-4 max-h-[400px] overflow-auto">
                        <pre className="text-gray-100 text-sm font-mono whitespace-pre-wrap">
                            {result.map((item, index) => (
                                <div key={index}>{index + 1}. {item}</div>
                            ))}
                        </pre>
                    </div>
                )}

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">支持的数据类型</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• <strong>姓名</strong>：随机中文姓名</li>
                        <li>• <strong>手机号</strong>：符合规则的11位手机号</li>
                        <li>• <strong>邮箱</strong>：常见邮箱格式的随机邮箱</li>
                        <li>• <strong>身份证</strong>：符合校验规则的18位身份证号</li>
                        <li>• <strong>地址</strong>：随机生成的中文地址</li>
                        <li>• <strong>公司名</strong>：随机生成的公司名称</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default RandomDataGenerator;

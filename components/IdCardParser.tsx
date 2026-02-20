import React, { useState } from 'react';

interface IdCardInfo {
    birthDate: string;
    age: number;
    gender: string;
    province: string;
    isValid: boolean;
}

const AREA_CODES: Record<string, string> = {
    '11': '北京市', '12': '天津市', '13': '河北省', '14': '山西省', '15': '内蒙古自治区',
    '21': '辽宁省', '22': '吉林省', '23': '黑龙江省',
    '31': '上海市', '32': '江苏省', '33': '浙江省', '34': '安徽省', '35': '福建省', '36': '江西省', '37': '山东省',
    '41': '河南省', '42': '湖北省', '43': '湖南省', '44': '广东省', '45': '广西壮族自治区', '46': '海南省',
    '50': '重庆市', '51': '四川省', '52': '贵州省', '53': '云南省', '54': '西藏自治区',
    '61': '陕西省', '62': '甘肃省', '63': '青海省', '64': '宁夏回族自治区', '65': '新疆维吾尔自治区',
    '71': '台湾省', '81': '香港特别行政区', '82': '澳门特别行政区',
};

const IdCardParser: React.FC = () => {
    const [idCard, setIdCard] = useState<string>('');
    const [info, setInfo] = useState<IdCardInfo | null>(null);
    const [error, setError] = useState<string>('');

    const validateAndParse = (id: string) => {
        setError('');
        setInfo(null);

        const cleanId = id.trim().toUpperCase();
        
        if (!/^\d{17}[\dX]$/.test(cleanId)) {
            setError('请输入正确的18位身份证号码');
            return;
        }

        const provinceCode = cleanId.substring(0, 2);
        const province = AREA_CODES[provinceCode];
        if (!province) {
            setError('无效的省份代码');
            return;
        }

        const year = parseInt(cleanId.substring(6, 10));
        const month = parseInt(cleanId.substring(10, 12));
        const day = parseInt(cleanId.substring(12, 14));
        
        const birthDate = new Date(year, month - 1, day);
        if (isNaN(birthDate.getTime()) || birthDate.getFullYear() !== year || 
            birthDate.getMonth() !== month - 1 || birthDate.getDate() !== day) {
            setError('无效的出生日期');
            return;
        }

        const today = new Date();
        let age = today.getFullYear() - year;
        const monthDiff = today.getMonth() - (month - 1);
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < day)) {
            age--;
        }

        const genderCode = parseInt(cleanId.substring(16, 17));
        const gender = genderCode % 2 === 1 ? '男' : '女';

        const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        const checkCodes = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
        let sum = 0;
        for (let i = 0; i < 17; i++) {
            sum += parseInt(cleanId[i]) * weights[i];
        }
        const checkCode = checkCodes[sum % 11];
        const isValid = checkCode === cleanId[17];

        setInfo({
            birthDate: `${year}年${month}月${day}日`,
            age,
            gender,
            province,
            isValid,
        });
    };

    const handleAnalyze = () => {
        validateAndParse(idCard);
    };

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-3xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">身份证号码解析</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">解析身份证号码获取出生日期、性别、籍贯等信息</p>
            </div>

            <div className="w-full max-w-3xl space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        身份证号码
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={idCard}
                            onChange={(e) => setIdCard(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                            placeholder="请输入18位身份证号码"
                            maxLength={18}
                            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-mono text-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <button
                            onClick={handleAnalyze}
                            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                        >
                            解析
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg">
                        {error}
                    </div>
                )}

                {info && (
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                        <div className={`px-4 py-3 ${info.isValid ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
                            <span className={`font-medium ${info.isValid ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                {info.isValid ? '✓ 校验码正确' : '✗ 校验码错误'}
                            </span>
                        </div>
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                            <div className="flex justify-between px-4 py-3">
                                <span className="text-gray-500 dark:text-gray-400">出生日期</span>
                                <span className="font-medium text-gray-900 dark:text-white">{info.birthDate}</span>
                            </div>
                            <div className="flex justify-between px-4 py-3">
                                <span className="text-gray-500 dark:text-gray-400">年龄</span>
                                <span className="font-medium text-gray-900 dark:text-white">{info.age} 岁</span>
                            </div>
                            <div className="flex justify-between px-4 py-3">
                                <span className="text-gray-500 dark:text-gray-400">性别</span>
                                <span className={`font-medium ${info.gender === '男' ? 'text-blue-600 dark:text-blue-400' : 'text-pink-600 dark:text-pink-400'}`}>
                                    {info.gender}
                                </span>
                            </div>
                            <div className="flex justify-between px-4 py-3">
                                <span className="text-gray-500 dark:text-gray-400">籍贯</span>
                                <span className="font-medium text-gray-900 dark:text-white">{info.province}</span>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">身份证号码结构</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• 前6位：地址码（省市区县）</li>
                        <li>• 7-14位：出生日期码</li>
                        <li>• 15-17位：顺序码（第17位奇数为男，偶数为女）</li>
                        <li>• 第18位：校验码（0-9或X）</li>
                    </ul>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                    <p className="text-sm text-yellow-700 dark:text-yellow-400">
                        ⚠️ 本工具仅供学习和参考使用，不会存储任何输入数据。请勿将真实身份证号码用于非必要场景。
                    </p>
                </div>
            </div>
        </div>
    );
};

export default IdCardParser;

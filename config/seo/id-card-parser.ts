import type { SEOPageContent } from '@/types/seo';

const idCardParserSEO: SEOPageContent = {
    id: 'id-card-parser',
    
    intro: {
        what: '身份证解析工具是一款在线身份证号码分析工具，可以从身份证号中提取出生日期、性别、籍贯等信息。',
        problem: '解决需要快速了解身份证号码含义、验证身份证有效性、提取身份信息的需求。',
        capability: '解析出生日期、识别性别、显示籍贯、校验号码有效性。',
        targetUser: 'HR人员、行政人员、数据录入人员、普通用户'
    },
    
    targetAudience: [
        'HR人员',
        '行政人员',
        '数据录入人员',
        '开发测试人员',
        '普通用户'
    ],
    
    useCases: [
        '入职登记 - 快速提取员工基本信息',
        '数据录入 - 验证身份证有效性',
        '系统测试 - 生成测试用身份证',
        '信息核对 - 核实身份证信息',
        '学习了解 - 了解身份证号码规则'
    ],
    
    coreFeatures: [
        '解析出生日期',
        '识别性别',
        '显示籍贯信息',
        '校验号码有效性',
        '显示校验码',
        '支持18位身份证'
    ],
    
    exampleIO: {
        input: '身份证号：11010519900307253X',
        output: '出生日期：1990年3月7日\n性别：男\n籍贯：北京市朝阳区\n校验：有效'
    },
    
    usageSteps: [
        '输入18位身份证号码',
        '点击解析按钮',
        '查看解析出的各项信息'
    ],
    
    faq: [
        { question: '支持15位旧版身份证吗？', answer: '目前主要支持18位新版身份证，15位旧版暂不支持。' },
        { question: '数据会上传吗？', answer: '不会，所有解析在浏览器本地完成，数据安全有保障。' },
        { question: '籍贯信息准确吗？', answer: '根据行政区划代码查询，仅供参考。' }
    ],
    
    relatedTools: ['age-calculator', 'random-data', 'qrcode-generator']
};

export default idCardParserSEO;

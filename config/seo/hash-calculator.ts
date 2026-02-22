import type { SEOPageContent } from '@/types/seo';

const hashCalculatorSEO: SEOPageContent = {
    id: 'hash-calculator',
    
    intro: {
        what: 'Hash计算器是一款在线哈希值计算工具，支持计算MD5、SHA-1、SHA-256等常见哈希算法。',
        problem: '解决文件校验、密码哈希、数据完整性验证等需求。',
        capability: '支持多种哈希算法、文本和文件计算、实时计算显示。',
        targetUser: '开发者、安全人员、运维工程师、普通用户'
    },
    
    targetAudience: [
        '开发者',
        '安全人员',
        '运维工程师',
        '普通用户',
        '数据分析师'
    ],
    
    useCases: [
        '文件校验 - 验证下载文件的完整性',
        '密码安全 - 生成密码的哈希值',
        '数据比对 - 对比数据是否一致',
        'API签名 - 计算接口签名参数',
        '安全检测 - 检查文件是否被篡改'
    ],
    
    coreFeatures: [
        'MD5哈希计算',
        'SHA-1哈希计算',
        'SHA-256哈希计算',
        'SHA-512哈希计算',
        '支持文本输入',
        '支持文件上传'
    ],
    
    exampleIO: {
        input: '文本：Hello World',
        output: 'MD5：b10a8db164e0754105b7a99be72e3fe5\nSHA-256：a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e'
    },
    
    usageSteps: [
        '输入文本或上传文件',
        '选择需要计算的哈希算法',
        '查看并复制计算结果'
    ],
    
    faq: [
        { question: '支持哪些哈希算法？', answer: '支持MD5、SHA-1、SHA-256、SHA-512等常用哈希算法。' },
        { question: 'MD5还安全吗？', answer: 'MD5已不推荐用于安全场景，建议使用SHA-256或更高版本。' },
        { question: '可以计算文件的哈希吗？', answer: '支持，直接上传文件即可计算其哈希值。' }
    ],
    
    relatedTools: ['base64-tool', 'crypto-tool', 'password-generator']
};

export default hashCalculatorSEO;

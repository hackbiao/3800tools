import type { SEOPageContent } from '@/types/seo';

const passwordGeneratorSEO: SEOPageContent = {
    id: 'password-generator',
    
    intro: {
        what: '密码生成器是一款在线随机密码生成工具，可生成高强度随机密码，支持自定义密码长度和字符类型。',
        problem: '解决用户设置弱密码、多个账号使用相同密码、密码容易被破解的安全问题。',
        capability: '支持自定义长度、多种字符类型、批量生成、一键复制、密码强度检测。',
        targetUser: '所有互联网用户、IT管理员、安全人员、开发者'
    },
    
    targetAudience: [
        '普通用户',
        'IT管理员',
        '安全人员',
        '开发者',
        '企业员工'
    ],
    
    useCases: [
        '账号注册 - 生成安全的注册密码',
        '密码更新 - 定期更换高强度密码',
        '系统管理 - 批量生成初始密码',
        'API密钥 - 生成随机的API密钥',
        '安全测试 - 生成测试用密码'
    ],
    
    coreFeatures: [
        '自定义密码长度（4-64位）',
        '包含大小写字母',
        '包含数字',
        '包含特殊符号',
        '批量生成多个密码',
        '一键复制使用'
    ],
    
    exampleIO: {
        input: '长度：16位\n包含：大小写字母 + 数字 + 符号',
        output: '生成的密码：Kx9#mP2$vL7@nQ4!'
    },
    
    usageSteps: [
        '设置密码长度和包含的字符类型',
        '点击生成按钮',
        '复制生成的密码'
    ],
    
    faq: [
        { question: '生成的密码安全吗？', answer: '使用加密随机算法生成，完全随机，无法预测，非常安全。' },
        { question: '密码会被保存吗？', answer: '不会，密码仅在本地生成，不会传输到服务器，关闭页面即清除。' },
        { question: '建议密码长度是多少？', answer: '建议至少12位，包含大小写字母、数字和特殊符号的组合。' }
    ],
    
    relatedTools: ['uuid-generator', 'hash-calculator', 'base64-tool']
};

export default passwordGeneratorSEO;

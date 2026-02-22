import type { SEOPageContent } from '@/types/seo';

const uuidGeneratorSEO: SEOPageContent = {
    id: 'uuid-generator',
    
    intro: {
        what: 'UUID生成器是一款在线UUID/GUID生成工具，可以批量生成唯一标识符，支持UUID v1和v4版本。',
        problem: '解决需要生成唯一标识符、数据库主键、会话ID等场景的需求。',
        capability: '支持UUID v1和v4版本、批量生成、一键复制、支持大小写格式。',
        targetUser: '开发者、数据库管理员、后端工程师、系统架构师'
    },
    
    targetAudience: [
        '开发者',
        '数据库管理员',
        '后端工程师',
        '系统架构师',
        '测试工程师'
    ],
    
    useCases: [
        '数据库主键 - 生成唯一记录ID',
        '会话管理 - 生成会话标识',
        '文件命名 - 生成唯一文件名',
        'API密钥 - 生成唯一标识',
        '分布式系统 - 生成全局唯一ID'
    ],
    
    coreFeatures: [
        'UUID v1版本生成',
        'UUID v4版本生成',
        '批量生成',
        '支持大写/小写格式',
        '一键复制',
        '自定义生成数量'
    ],
    
    exampleIO: {
        input: '选择UUID v4，生成数量：5',
        output: `550e8400-e29b-41d4-a716-446655440000
6ba7b810-9dad-11d1-80b4-00c04fd430c8
f47ac10b-58cc-4372-a567-0e02b2c3d479
...`
    },
    
    usageSteps: [
        '选择UUID版本（v1或v4）',
        '设置生成数量',
        '点击生成并复制结果'
    ],
    
    faq: [
        { question: 'UUID v1和v4有什么区别？', answer: 'v1基于时间戳和MAC地址生成，v4是随机生成。v4更常用，v1可追溯生成时间。' },
        { question: 'UUID真的唯一吗？', answer: 'UUID v4的碰撞概率极低，在正常使用中可以认为是唯一的。' },
        { question: '可以生成多少个UUID？', answer: '支持一次生成最多100个UUID。' }
    ],
    
    relatedTools: ['password-generator', 'hash-calculator', 'number-generator']
};

export default uuidGeneratorSEO;

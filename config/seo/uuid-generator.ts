import type { SEOPageContent } from '@/types/seo';

const uuidGeneratorSEO: SEOPageContent = {
    id: 'uuid-generator',
    
    intro: {
        what: 'UUID生成器是专业的通用唯一标识符创建工具，支持UUID v1、v4、v7等多种版本，提供批量生成、格式转换、唯一性验证等功能，满足分布式系统、数据库设计、微服务架构等场景的唯一标识需求。',
        problem: '开发者常面临需要生成全局唯一ID的场景，如分布式系统主键、消息ID、事务ID等。手动生成难以保证唯一性，系统原生生成方法复杂，缺乏统一的管理工具。',
        capability: '支持UUID v1/v4/v7版本、批量生成1000个、格式转换（大写/小写/无连字符）、唯一性验证、历史记录、自定义命名空间、GUID兼容模式、ULID生成、Base64编码，提供企业级ID生成解决方案。',
        targetUser: '后端开发者、数据库管理员、系统架构师、微服务开发者、DevOps工程师',
        usageExperience: '界面专业简洁，顶部版本选择清晰，支持快速切换不同UUID版本。批量生成模式下可设置1-1000个生成数量，实时显示生成进度。生成的UUID自动分组显示，支持单条或全部复制。唯一性验证功能可检测重复值，确保ID绝对唯一。',
        pros: [
            '支持多种UUID版本，适应不同场景',
            '批量生成效率高，秒级完成1000个',
            '内置唯一性验证，杜绝重复',
            '格式转换灵活，兼容各种系统',
            '支持自定义命名空间'
        ],
        cons: [
            '暂不支持版本3和版本5',
            '生成1000个时可能短暂卡顿',
            '没有持久化存储功能'
        ],
        recommendation: '数据库主键推荐UUID v4，性能最佳；分布式系统推荐v7，时间有序；可追溯场景推荐v1；需要名称空间时可选v3/v5（开发中）。',
        comparison: '与在线UUIDgenerator.org相比，本工具支持更多版本和批量功能，无需注册。与Python uuid库相比，无需编程，操作简单。与数据库自增ID相比，真正保证全局唯一性。'
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
        'UUID v1/v4/v7多版本支持',
        '批量生成最多1000个',
        '格式转换（大写/小写/无连字符）',
        '唯一性验证功能',
        '自定义命名空间',
        'ULID和Base64编码',
        'GUID兼容模式'
    ],
    
    exampleIO: {
        input: '版本：v7 | 数量：10 | 格式：无连字符',
        output: '018f8b9b-5a3f-7f9a-1234-567890abcdef | 唯一性：100% | 时间有序：是'
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

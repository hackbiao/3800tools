import type { SEOPageContent } from '@/types/seo';

const chineseConverterSEO: SEOPageContent = {
    id: 'chinese-converter',
    
    intro: {
        what: '简繁体转换工具是一款在线中文简体与繁体互转服务，支持批量转换，适用于阅读繁体文章、文档转换等场景。',
        problem: '解决简繁体阅读障碍、跨地区文档兼容、内容本地化转换的需求。',
        capability: '支持简体转繁体、繁体转简体、批量转换、保持原文格式。',
        targetUser: '内容创作者、翻译人员、跨境电商、港台地区用户、学术研究者'
    },
    
    targetAudience: [
        '内容创作者',
        '翻译人员',
        '跨境电商',
        '港台地区用户',
        '学术研究者'
    ],
    
    useCases: [
        '文档转换 - 将简体文档转为繁体',
        '内容发布 - 适配不同地区用户',
        '阅读辅助 - 转换繁体文章便于阅读',
        '电商运营 - 产品描述本地化',
        '学术研究 - 处理古籍和文献'
    ],
    
    coreFeatures: [
        '简体转繁体',
        '繁体转简体',
        '支持批量转换',
        '保持原文格式',
        '支持专业词汇',
        '实时转换预览'
    ],
    
    exampleIO: {
        input: '简体：人工智能正在改变世界',
        output: '繁体：人工智慧正在改變世界'
    },
    
    usageSteps: [
        '输入或粘贴需要转换的中文文本',
        '选择转换方向（简转繁/繁转简）',
        '复制转换结果'
    ],
    
    faq: [
        { question: '转换准确吗？', answer: '采用专业词库进行转换，对常用词汇和专业术语都有较好支持。' },
        { question: '支持哪些地区的繁体？', answer: '主要支持台湾繁体标准，部分港式用语可能需要人工调整。' },
        { question: '可以批量转换吗？', answer: '支持，可以一次粘贴大量文本进行批量转换。' }
    ],
    
    relatedTools: ['translate', 'chinese-to-pinyin', 'text-formatter']
};

export default chineseConverterSEO;

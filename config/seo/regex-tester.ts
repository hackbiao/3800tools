import type { SEOPageContent } from '@/types/seo';

const regexTesterSEO: SEOPageContent = {
    id: 'regex-tester',
    
    intro: {
        what: '正则测试工具是一款在线正则表达式测试服务，支持实时匹配测试、高亮显示匹配结果。',
        problem: '解决正则表达式调试困难、难以验证匹配效果、需要快速测试正则的问题。',
        capability: '支持实时匹配、高亮显示、常用正则示例、支持多种模式。',
        targetUser: '开发者、数据处理人员、测试工程师、爬虫开发者'
    },
    
    targetAudience: [
        '开发者',
        '数据处理人员',
        '测试工程师',
        '爬虫开发者',
        '运维人员'
    ],
    
    useCases: [
        '表单验证 - 测试邮箱、手机号正则',
        '数据提取 - 测试数据提取正则',
        '爬虫开发 - 测试页面匹配正则',
        '日志分析 - 测试日志匹配正则',
        '文本处理 - 测试替换规则'
    ],
    
    coreFeatures: [
        '实时正则匹配',
        '高亮显示匹配结果',
        '支持全局/多行等模式',
        '常用正则示例',
        '显示匹配组内容',
        '正则表达式说明'
    ],
    
    exampleIO: {
        input: '正则：\\d{4}-\\d{2}-\\d{2}\n文本：日期格式 2024-01-15 和 2024-12-31',
        output: '匹配结果：2024-01-15, 2024-12-31（高亮显示）'
    },
    
    usageSteps: [
        '输入正则表达式',
        '输入测试文本',
        '查看匹配结果和匹配组'
    ],
    
    faq: [
        { question: '支持哪些正则模式？', answer: '支持全局匹配(g)、多行模式(m)、忽略大小写(i)等常用模式。' },
        { question: '正则语法参考哪里？', answer: '工具提供常用正则示例，也可查阅MDN等文档了解完整语法。' },
        { question: '可以保存正则吗？', answer: '目前不支持保存，建议使用笔记工具记录常用正则。' }
    ],
    
    relatedTools: ['text-formatter', 'text-statistics', 'code-highlight']
};

export default regexTesterSEO;

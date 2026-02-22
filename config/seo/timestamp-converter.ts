import type { SEOPageContent } from '@/types/seo';

const timestampConverterSEO: SEOPageContent = {
    id: 'timestamp-converter',
    
    intro: {
        what: '时间戳转换工具是一款在线Unix时间戳转换服务，支持时间戳与日期时间互相转换，支持秒级和毫秒级。',
        problem: '解决开发中时间戳与日期格式互转、跨时区时间处理、时间格式不统一的问题。',
        capability: '支持时间戳转日期、日期转时间戳、毫秒级精度、多时区支持。',
        targetUser: '开发者、运维人员、数据分析师、测试工程师'
    },
    
    targetAudience: [
        '开发者',
        '运维人员',
        '数据分析师',
        '测试工程师',
        '后端工程师'
    ],
    
    useCases: [
        'API调试 - 转换时间戳参数',
        '日志分析 - 将时间戳转为可读时间',
        '数据库操作 - 时间格式转换',
        '接口对接 - 统一时间格式',
        '数据展示 - 前端显示时间'
    ],
    
    coreFeatures: [
        '时间戳转日期时间',
        '日期时间转时间戳',
        '支持秒级/毫秒级时间戳',
        '显示当前时间戳',
        '批量转换支持',
        '多种日期格式输出'
    ],
    
    exampleIO: {
        input: '时间戳：1703145600',
        output: '日期时间：2023-12-21 16:00:00\n毫秒时间戳：1703145600000'
    },
    
    usageSteps: [
        '输入时间戳或选择日期时间',
        '点击转换按钮',
        '复制转换结果'
    ],
    
    faq: [
        { question: '什么是Unix时间戳？', answer: 'Unix时间戳是从1970年1月1日00:00:00 UTC到现在的秒数，广泛用于计算机系统中表示时间。' },
        { question: '秒级和毫秒级有什么区别？', answer: '秒级时间戳是10位数字，毫秒级是13位数字。JavaScript等语言默认使用毫秒级。' },
        { question: '支持哪些时区？', answer: '默认使用本地时区，也支持切换到UTC时区显示。' }
    ],
    
    relatedTools: ['date-calculator', 'world-clock', 'countdown-timer']
};

export default timestampConverterSEO;

import type { SEOPageContent } from '@/types/seo';

const chineseToPinyinSEO: SEOPageContent = {
    id: 'chinese-to-pinyin',
    
    intro: {
        what: '中文转拼音工具是一款在线汉字转拼音服务，可以将中文汉字转换为拼音，支持声调显示和多音字。',
        problem: '解决拼音输入、汉字注音、语音学习、数据排序等需求。',
        capability: '批量转换、声调显示、首字母提取、支持多音字识别。',
        targetUser: '语文教师、学生、外国人学中文、数据分析师、产品经理'
    },
    
    targetAudience: [
        '语文教师',
        '学生',
        '外国人学中文',
        '数据分析师',
        '产品经理'
    ],
    
    useCases: [
        '汉字注音 - 为生字标注拼音',
        '中文学习 - 帮助学习中文发音',
        '数据排序 - 按拼音首字母排序',
        '搜索优化 - 建立拼音索引',
        '输入法参考 - 查看汉字拼音'
    ],
    
    coreFeatures: [
        '汉字转拼音',
        '支持声调显示',
        '多音字识别',
        '首字母提取',
        '批量转换',
        '多种输出格式'
    ],
    
    exampleIO: {
        input: '中文：你好，世界！',
        output: '拼音：nǐ hǎo ， shì jiè ！\n首字母：n h s j'
    },
    
    usageSteps: [
        '输入或粘贴需要转换的中文文本',
        '选择是否显示声调',
        '查看并复制转换结果'
    ],
    
    faq: [
        { question: '多音字如何处理？', answer: '工具会尝试识别最常见的读音，但部分多音字可能需要人工确认。' },
        { question: '可以去掉声调吗？', answer: '支持选择是否显示声调符号。' },
        { question: '支持多少汉字？', answer: '支持GB2312标准中的6000+常用汉字。' }
    ],
    
    relatedTools: ['chinese-converter', 'translate', 'text-formatter']
};

export default chineseToPinyinSEO;

import type { SEOPageContent } from '@/types/seo';

const textFormatterSEO: SEOPageContent = {
    id: 'text-formatter',
    
    intro: {
        what: '文本格式化工具是一款在线文本处理工具，支持大小写转换、去除空格、字数统计、文本排序等多种文本处理功能。',
        problem: '解决文本格式不统一、需要批量处理文本、文本编辑效率低的问题。',
        capability: '支持大小写转换、去除空格换行、字数统计、文本排序、加密解密等功能。',
        targetUser: '内容编辑、程序员、文案撰写者、学生、办公人员'
    },
    
    targetAudience: [
        '内容编辑',
        '程序员',
        '文案撰写者',
        '学生',
        '办公人员'
    ],
    
    useCases: [
        '文案编辑 - 统一文本格式和大小写',
        '代码处理 - 转换变量命名格式',
        '数据清洗 - 去除多余空格和换行',
        '文章统计 - 统计字数和字符数',
        '文本转换 - 各种格式互相转换'
    ],
    
    coreFeatures: [
        '大小写转换（全大写/全小写/首字母大写）',
        '去除空格和换行',
        '字数和字符统计',
        '文本排序',
        '变量命名转换',
        'Base64编码解码'
    ],
    
    exampleIO: {
        input: 'hello world',
        output: '首字母大写：Hello World\n全大写：HELLO WORLD\n全小写：hello world'
    },
    
    usageSteps: [
        '粘贴或输入需要处理的文本',
        '选择需要的格式化功能',
        '复制处理后的结果'
    ],
    
    faq: [
        { question: '支持哪些文本处理功能？', answer: '支持大小写转换、去空格、字数统计、文本排序、变量命名转换等多种功能。' },
        { question: '文本会被保存吗？', answer: '不会，所有处理在浏览器本地完成，关闭页面后数据即清除。' },
        { question: '可以撤销操作吗？', answer: '建议保留原始文本备份，工具不提供撤销功能。' }
    ],
    
    relatedTools: ['text-statistics', 'text-transform', 'chinese-converter']
};

export default textFormatterSEO;

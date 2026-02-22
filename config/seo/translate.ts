import type { SEOPageContent } from '@/types/seo';

const translateSEO: SEOPageContent = {
    id: 'translate',
    
    intro: {
        what: '在线翻译工具是一款基于AI的多语言翻译服务，支持中英日韩法德西等10+语言实时互译。',
        problem: '解决跨语言沟通、文档翻译、外语阅读等场景的翻译需求，帮助用户快速准确地进行多语言转换。',
        capability: '支持10+语言互译、自动语言检测、实时翻译、专业术语识别，翻译结果准确流畅。',
        targetUser: '翻译工作者、内容创作者、外贸从业者、留学生、跨境电商卖家、程序员（技术文档翻译）'
    },
    
    targetAudience: [
        '翻译工作者',
        '内容创作者',
        '外贸从业者',
        '留学生',
        '跨境电商卖家',
        '程序员'
    ],
    
    useCases: [
        '文档翻译 - 将PDF、Word文档翻译成目标语言',
        '邮件翻译 - 处理国外客户邮件沟通',
        '网页内容翻译 - 阅读外文技术文档和资讯',
        '跨境电商 - 产品描述本地化翻译',
        '学习辅助 - 翻译外文学习资料和论文'
    ],
    
    coreFeatures: [
        '支持中英日韩法德西等10+语言',
        'AI智能翻译，准确率高',
        '自动检测源语言',
        '实时翻译，无需等待',
        '支持长文本批量翻译',
        '本地处理，数据安全'
    ],
    
    exampleIO: {
        input: '人工智能正在改变我们的生活方式，从智能手机到自动驾驶汽车，AI技术无处不在。',
        output: 'Artificial intelligence is changing the way we live, from smartphones to self-driving cars, AI technology is everywhere.'
    },
    
    usageSteps: [
        '输入或粘贴需要翻译的文本内容',
        '选择源语言和目标语言（或使用自动检测）',
        '点击翻译按钮，即刻获得结果并可复制使用'
    ],
    
    faq: [
        { question: '翻译工具是否免费？', answer: '是的，完全免费使用，无需注册登录。' },
        { question: '支持哪些语言？', answer: '支持中文、英语、日语、韩语、法语、德语、西班牙语等10+语言互译。' },
        { question: '翻译数据是否安全？', answer: '所有翻译在浏览器本地完成，数据不会上传到服务器，完全安全。' },
        { question: '可以翻译多长的文本？', answer: '支持单次翻译最多5000字符，可多次使用处理更长内容。' }
    ],
    
    relatedTools: ['text-formatter', 'chinese-converter', 'code-highlight']
};

export default translateSEO;

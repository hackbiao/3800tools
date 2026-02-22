import type { SEOPageContent } from '@/types/seo';

const promptGeneratorSEO: SEOPageContent = {
    id: 'prompt-generator',
    
    intro: {
        what: 'AI提示词生成器是一款智能Prompt生成工具，帮助用户快速生成高质量的AI对话提示词。',
        problem: '解决用户不知道如何编写有效Prompt、AI回答质量不高、沟通效率低等问题。',
        capability: '支持多种场景模板、智能优化提示词、结构化输出、中英文双语支持。',
        targetUser: 'AI工具使用者、内容创作者、SEO从业者、自媒体作者、产品经理、程序员'
    },
    
    targetAudience: [
        'AI工具使用者',
        '内容创作者',
        'SEO从业者',
        '自媒体作者',
        '产品经理',
        '程序员'
    ],
    
    useCases: [
        '内容创作 - 生成写作、翻译、润色等场景的提示词',
        '编程辅助 - 生成代码生成、调试、解释的提示词',
        '学习研究 - 生成知识问答、概念解释的提示词',
        '文案优化 - 生成营销文案、产品描述的提示词',
        '数据分析 - 生成数据处理、报告分析的提示词'
    ],
    
    coreFeatures: [
        '多种场景模板可选',
        '智能优化提示词结构',
        '支持中英文双语',
        '结构化输出格式',
        '一键复制使用',
        '持续更新优化模板'
    ],
    
    exampleIO: {
        input: '场景：写一篇关于人工智能的文章\n要求：800字左右，通俗易懂',
        output: `请帮我写一篇关于人工智能的文章，要求如下：
1. 字数：800字左右
2. 风格：通俗易懂，面向普通读者
3. 结构：包含引言、正文（2-3个要点）、结语
4. 内容：介绍人工智能的基本概念、应用场景和未来发展趋势
5. 语言：使用生动的比喻和实例帮助理解`
    },
    
    usageSteps: [
        '选择使用场景或直接描述需求',
        '点击生成按钮获取优化后的提示词',
        '复制提示词到ChatGPT、Claude等AI工具使用'
    ],
    
    faq: [
        { question: '这个工具是免费的吗？', answer: '是的，完全免费，无需注册即可使用。' },
        { question: '生成的提示词可以用在哪些AI工具？', answer: '适用于ChatGPT、Claude、文心一言、通义千问等主流AI工具。' },
        { question: '支持自定义场景吗？', answer: '支持，可以自由描述您的具体需求，工具会智能优化。' },
        { question: '提示词生成原理是什么？', answer: '基于Prompt Engineering最佳实践，优化提示词结构和表达方式。' }
    ],
    
    relatedTools: ['translate', 'text-formatter', 'resume-generator']
};

export default promptGeneratorSEO;

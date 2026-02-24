import type { SEOPageContent } from '@/types/seo';

const codeHighlightSEO: SEOPageContent = {
    id: 'code-highlight',
    
    intro: {
        what: '代码高亮工具是专业的源代码语法着色和美化服务，支持180+编程语言高亮显示，提供50+流行主题风格、行号显示、语法错误检测、代码折叠等功能，专为技术文档、教学演示、博客写作等场景优化。',
        problem: '开发者和技术创作者需要将代码以美观的方式展示给读者，普通文本展示缺乏语法区分，可读性差。专业IDE环境不适合直接复制到文档中，缺乏轻量级的代码美化解决方案。',
        capability: '支持180+编程语言、50+主题风格、语法错误标识、代码折叠展开、行号自定义、词法分析、自动格式化、批量处理、导出多种格式(HTML/RTF/PNG)、暗色模式适配、实时预览，提供企业级代码展示方案。',
        targetUser: '程序员、技术博主、编程讲师、文档编写者、学习者、开源项目维护者',
        usageExperience: '界面专业简洁，左侧代码输入区支持语法高亮，右侧实时预览效果。语言自动识别准确率高，主题切换即时生效。代码折叠功能便于管理大段代码，错误提示精准定位问题。批量模式可处理多个代码段，导出功能支持嵌入各种文档平台。',
        pros: [
            '支持180+语言，覆盖几乎所有编程领域',
            '50+主题风格，匹配各种展示场景',
            '语法错误检测，提升代码质量',
            '多格式导出，兼容各类平台',
            '批量处理效率高，适合文档整理'
        ],
        cons: [
            '超长代码(>10000行)处理较慢',
            '某些方言语言支持不完整',
            '自定义主题功能正在开发'
        ],
        recommendation: '技术博客推荐使用GitHub或OneDark主题；教学演示推荐使用明亮主题；错误检测适合学习场景；多段代码使用批量功能。',
        comparison: '与GitHub Gist相比，主题选择更丰富，无需登录。与CodePen相比，专注静态展示，更轻量。与Prism.js相比，无需编程，开箱即用。'
    },
    
    targetAudience: [
        '程序员',
        '技术博主',
        '编程讲师',
        '文档编写者',
        '学生',
        '开源贡献者'
    ],
    
    useCases: [
        '博客写作 - 为技术博客添加美观的代码高亮',
        '文档编写 - 美化技术文档中的代码示例',
        '演示分享 - 生成可直接使用的HTML代码',
        '学习笔记 - 整理代码学习笔记',
        '代码分享 - 在社交媒体分享高亮代码'
    ],
    
    coreFeatures: [
        '180+编程语言支持',
        '50+主题风格库',
        '语法错误实时检测',
        '代码折叠展示',
        '批量处理代码段',
        '多格式导出(HTML/RTF/PNG)',
        '自动语言识别',
        '自定义行号设置'
    ],
    
    exampleIO: {
        input: '语言：JavaScript | 主题：OneDark | 代码：10行',
        output: 'HTML格式代码 | 高亮显示 | 行号:1-10 | 可直接嵌入网页'
    },
    
    usageSteps: [
        '选择编程语言类型',
        '粘贴需要高亮的代码',
        '选择主题风格，复制或导出结果'
    ],
    
    faq: [
        { question: '支持哪些编程语言？', answer: '支持Python、JavaScript、Java、C++、Go、Rust、PHP等50+主流编程语言。' },
        { question: '可以自定义主题吗？', answer: '提供多种预设主题，包括GitHub、Monokai、OneDark等流行主题。' },
        { question: '如何使用高亮代码？', answer: '可以一键复制带格式的代码，或导出HTML直接嵌入网页。' },
        { question: '代码会被保存吗？', answer: '不会，代码仅在浏览器本地处理，不会上传到服务器。' }
    ],
    
    relatedTools: ['json-formatter', 'code-formatter', 'markdown-editor']
};

export default codeHighlightSEO;

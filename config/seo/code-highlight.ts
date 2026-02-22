import type { SEOPageContent } from '@/types/seo';

const codeHighlightSEO: SEOPageContent = {
    id: 'code-highlight',
    
    intro: {
        what: '代码高亮工具是一款在线代码语法高亮服务，支持Python、JavaScript、Java、C++等50+编程语言。',
        problem: '解决代码展示不美观、语法高亮需求、博客文章代码美化等问题。',
        capability: '支持多种编程语言、多种主题风格、一键复制高亮代码、导出HTML格式。',
        targetUser: '程序员、技术博主、编程讲师、文档编写者、学生'
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
        '支持50+编程语言语法高亮',
        '多种主题风格可选',
        '显示行号便于讲解',
        '一键复制高亮代码',
        '导出HTML格式直接使用',
        '支持深色/浅色主题'
    ],
    
    exampleIO: {
        input: `function greet(name) {
    console.log('Hello, ' + name + '!');
}
greet('World');`,
        output: '高亮后的代码，带有语法颜色区分、行号显示，可一键复制或导出HTML'
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

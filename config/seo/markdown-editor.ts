import type { SEOPageContent } from '@/types/seo';

const markdownEditorSEO: SEOPageContent = {
    id: 'markdown-editor',
    
    intro: {
        what: 'Markdown编辑器是一款在线Markdown文档编辑工具，支持实时预览、语法高亮、导出HTML等功能。',
        problem: '解决Markdown写作效率低、预览不方便、格式转换困难的问题。',
        capability: '实时预览、语法高亮、表格支持、代码块、导出HTML、本地保存。',
        targetUser: '技术博主、程序员、文档编写者、学生、知识管理爱好者'
    },
    
    targetAudience: [
        '技术博主',
        '程序员',
        '文档编写者',
        '学生',
        '知识管理爱好者'
    ],
    
    useCases: [
        '博客写作 - 撰写技术博客文章',
        '项目文档 - 编写README和项目文档',
        '学习笔记 - 整理技术学习笔记',
        '周报撰写 - 制作工作周报月报',
        '知识整理 - 构建个人知识库'
    ],
    
    coreFeatures: [
        '实时预览效果',
        '语法高亮显示',
        '支持表格和代码块',
        '导出HTML文件',
        '本地自动保存',
        '支持图片链接'
    ],
    
    exampleIO: {
        input: '# 标题\n这是一段**加粗**的文字\n- 列表项1\n- 列表项2',
        output: '实时渲染为格式化的HTML预览，可导出为完整HTML文件'
    },
    
    usageSteps: [
        '在左侧编辑器输入Markdown内容',
        '右侧实时预览渲染效果',
        '导出HTML或复制内容'
    ],
    
    faq: [
        { question: '支持哪些Markdown语法？', answer: '支持标准Markdown语法，包括标题、列表、表格、代码块、链接图片等。' },
        { question: '内容会自动保存吗？', answer: '是的，内容会自动保存到浏览器本地存储。' },
        { question: '可以插入图片吗？', answer: '支持插入图片链接，暂不支持直接上传图片。' }
    ],
    
    relatedTools: ['code-highlight', 'text-formatter', 'mind-map']
};

export default markdownEditorSEO;

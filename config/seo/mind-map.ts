import type { SEOPageContent } from '@/types/seo';

const mindMapSEO: SEOPageContent = {
    id: 'mind-map',
    
    intro: {
        what: '思维导图工具是一款在线思维导图制作工具，帮助用户以图形化的方式整理思路、规划项目、记录笔记。',
        problem: '解决思路混乱、难以系统整理信息、需要可视化展示想法的问题。',
        capability: '支持多种布局样式、自由编辑节点、导出PNG图片、实时保存。',
        targetUser: '学生、教师、产品经理、项目经理、内容创作者、知识工作者'
    },
    
    targetAudience: [
        '学生',
        '教师',
        '产品经理',
        '项目经理',
        '内容创作者',
        '知识工作者'
    ],
    
    useCases: [
        '学习笔记 - 整理知识点和学习内容',
        '项目规划 - 梳理项目结构和任务',
        '头脑风暴 - 记录和整理创意想法',
        '会议记录 - 结构化记录会议要点',
        '读书笔记 - 整理书籍内容框架'
    ],
    
    coreFeatures: [
        '多种布局样式（思维导图/组织架构/树形图）',
        '自由添加编辑节点',
        '自定义节点颜色和样式',
        '支持拖拽调整位置',
        '一键导出PNG图片',
        '本地自动保存'
    ],
    
    exampleIO: {
        input: '中心主题：产品规划\n分支：需求分析、设计、开发、测试、上线',
        output: '生成一个以"产品规划"为中心，包含五个分支的思维导图，可继续展开子节点'
    },
    
    usageSteps: [
        '输入中心主题，创建根节点',
        '添加分支节点，编辑内容',
        '调整布局和样式，导出图片'
    ],
    
    faq: [
        { question: '思维导图会自动保存吗？', answer: '是的，支持本地自动保存，刷新页面后内容不会丢失。' },
        { question: '可以导出什么格式？', answer: '目前支持导出PNG图片格式，方便分享和使用。' },
        { question: '有节点数量限制吗？', answer: '没有限制，可以根据需要添加任意数量的节点。' }
    ],
    
    relatedTools: ['markdown-editor', 'drawing', 'table-converter']
};

export default mindMapSEO;

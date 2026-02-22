import type { SEOPageContent } from '@/types/seo';

const randomDataSEO: SEOPageContent = {
    id: 'random-data',
    
    intro: {
        what: '随机数据生成工具是一款面向开发者的在线工具，提升开发效率。',
        problem: '解决开发过程中的常见问题，提供便捷的在线处理方案。',
        capability: '支持随机数据生成、实时预览、多种格式支持、一键复制结果。',
        targetUser: '前端开发者、后端开发者、全栈工程师、测试工程师'
    },
    
    targetAudience: ["前端开发者","后端开发者","全栈工程师","测试工程师"],
    
    useCases: [
        '随机数据生成 - 快速完成处理任务',
        '日常使用 - 无需安装软件在线处理',
        '批量处理 - 提高工作效率',
        '专业场景 - 满足各类专业需求'
    ],
    
    coreFeatures: [
        '在线处理，无需安装',
        '操作简单，易于使用',
        '处理快速，结果准确',
        '数据安全，本地处理'
    ],
    
    exampleIO: {
        input: '输入需要处理的内容',
        output: '获得处理后的结果'
    },
    
    usageSteps: [
        '输入或上传需要处理的内容',
        '点击处理按钮',
        '查看并复制结果'
    ],
    
    faq: [
        { question: '这个工具是免费的吗？', answer: '是的，完全免费使用，无需注册登录。' },
        { question: '数据安全吗？', answer: '所有处理在浏览器本地完成，数据不会上传到服务器。' },
        { question: '支持哪些格式？', answer: '支持常见的主流格式，具体请查看工具页面说明。' }
    ],
    
    relatedTools: ["code-highlight","json-formatter","markdown-editor"]
};

export default randomDataSEO;

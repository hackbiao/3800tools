import type { SEOPageContent } from '@/types/seo';

const mathFormulaSEO: SEOPageContent = {
    id: 'math-formula',
    
    intro: {
        what: '数学公式编辑工具是一款在线数据处理工具，帮助用户高效处理各类数据。',
        problem: '解决数据格式转换、数据整理、数据可视化等问题。',
        capability: '支持数学公式编辑、实时预览、一键导出、多种格式支持。',
        targetUser: '数据分析师、开发者、办公人员、学生、研究人员'
    },
    
    targetAudience: ["数据分析师","开发者","办公人员","学生","研究人员"],
    
    useCases: [
        '数学公式编辑 - 快速完成处理任务',
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
    
    relatedTools: ["json-formatter","table-converter","mind-map"]
};

export default mathFormulaSEO;

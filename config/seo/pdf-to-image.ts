import type { SEOPageContent } from '@/types/seo';

const pdfToImageSEO: SEOPageContent = {
    id: 'pdf-to-image',
    
    intro: {
        what: 'PDF转长图工具是一款在线媒体文件处理工具，支持视频、PDF等媒体格式转换。',
        problem: '解决媒体文件格式转换、压缩、编辑等需求。',
        capability: '支持PDF转长图、保持原有质量、快速处理、无需安装软件。',
        targetUser: '视频创作者、设计师、办公人员、学生'
    },
    
    targetAudience: ["视频创作者","设计师","办公人员","学生"],
    
    useCases: [
        'PDF转长图 - 快速完成处理任务',
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
    
    relatedTools: ["video-aspect-converter","pdf-to-ppt","pdf-to-image"]
};

export default pdfToImageSEO;

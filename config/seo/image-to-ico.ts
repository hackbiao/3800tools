import type { SEOPageContent } from '@/types/seo';

const imageToIcoSEO: SEOPageContent = {
    id: 'image-to-ico',
    
    intro: {
        what: '图片转ICO工具是一款在线图片处理服务，帮助用户快速完成图片编辑任务。',
        problem: '解决用户对图片转ICO的需求，提供便捷的在线处理方案。',
        capability: '支持图片转ICO处理、本地运行保证数据安全、一键操作简单易用。',
        targetUser: '设计师、自媒体运营、电商卖家、内容创作者、普通用户'
    },
    
    targetAudience: ["设计师","自媒体运营","电商卖家","内容创作者","普通用户"],
    
    useCases: [
        '图片转ICO - 快速完成处理任务',
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
    
    relatedTools: ["image-converter","image-compressor","image-editor"]
};

export default imageToIcoSEO;

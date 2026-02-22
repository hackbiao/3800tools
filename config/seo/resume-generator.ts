import type { SEOPageContent } from '@/types/seo';

const resumeGeneratorSEO: SEOPageContent = {
    id: 'resume-generator',
    
    intro: {
        what: '简历生成器是一款在线简历制作工具，提供多套精美简历模板，帮助求职者快速制作专业简历。',
        problem: '解决求职者不知道如何写简历、简历排版不专业、制作简历效率低的问题。',
        capability: '提供多套模板、可视化编辑、实时预览、一键导出PDF。',
        targetUser: '应届毕业生、跳槽求职者、实习生、自由职业者'
    },
    
    targetAudience: [
        '应届毕业生',
        '跳槽求职者',
        '实习生',
        '自由职业者',
        '职场新人'
    ],
    
    useCases: [
        '应届求职 - 制作第一份专业简历',
        '跳槽跳槽 - 更新优化现有简历',
        '实习申请 - 制作实习简历',
        '兼职求职 - 制作简易简历',
        '职业转型 - 重新包装简历'
    ],
    
    coreFeatures: [
        '多套精美简历模板',
        '可视化在线编辑',
        '实时预览效果',
        '支持导出PDF',
        '自定义颜色和布局',
        '数据本地保存'
    ],
    
    exampleIO: {
        input: '填写：个人信息、教育背景、工作经历、项目经验、技能特长',
        output: '生成一份排版精美、内容完整的PDF简历，可直接投递'
    },
    
    usageSteps: [
        '选择喜欢的简历模板',
        '填写个人信息和工作经历',
        '预览并导出PDF简历'
    ],
    
    faq: [
        { question: '简历模板是免费的吗？', answer: '是的，所有模板完全免费使用，无需付费。' },
        { question: '可以自定义简历样式吗？', answer: '支持自定义颜色、字体大小等样式设置。' },
        { question: '简历数据安全吗？', answer: '所有数据在浏览器本地保存，不会上传到服务器。' }
    ],
    
    relatedTools: ['prompt-generator', 'text-formatter', 'pdf-to-image']
};

export default resumeGeneratorSEO;

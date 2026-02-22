import type { SEOPageContent } from '@/types/seo';

const imageEditorSEO: SEOPageContent = {
    id: 'image-editor',
    
    intro: {
        what: '图片快速编辑工具是一款在线图片编辑服务，支持裁剪、旋转、调整大小、调整亮度对比度等基础编辑功能。',
        problem: '解决日常图片编辑需求、无需安装专业软件、快速处理图片的问题。',
        capability: '支持裁剪、旋转、缩放、调整亮度/对比度/饱和度、添加滤镜。',
        targetUser: '设计师、自媒体运营、电商卖家、普通用户、内容创作者'
    },
    
    targetAudience: [
        '设计师',
        '自媒体运营',
        '电商卖家',
        '内容创作者',
        '普通用户'
    ],
    
    useCases: [
        '社交媒体 - 快速调整图片尺寸',
        '电商主图 - 裁剪调整产品图片',
        '证件照 - 裁剪到指定尺寸',
        '内容配图 - 调整图片亮度色彩',
        '简单修图 - 日常图片处理'
    ],
    
    coreFeatures: [
        '图片裁剪',
        '旋转和翻转',
        '调整大小',
        '亮度/对比度调节',
        '饱和度调节',
        '多种滤镜效果'
    ],
    
    exampleIO: {
        input: '上传一张原始照片',
        output: '裁剪为正方形、调整亮度+20、对比度+10、应用暖色滤镜'
    },
    
    usageSteps: [
        '上传需要编辑的图片',
        '使用工具栏进行裁剪、旋转、调整等操作',
        '下载编辑后的图片'
    ],
    
    faq: [
        { question: '支持哪些图片格式？', answer: '支持JPG、PNG、WebP、GIF等常见图片格式。' },
        { question: '编辑会降低图片质量吗？', answer: '导出时可以选择质量，建议使用较高质量保持图片清晰度。' },
        { question: '可以撤销操作吗？', answer: '支持撤销和重做操作，可以随时恢复到之前的状态。' }
    ],
    
    relatedTools: ['image-converter', 'image-compressor', 'image-watermark']
};

export default imageEditorSEO;

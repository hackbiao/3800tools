import type { SEOPageContent } from '@/types/seo';

const imageCompressorSEO: SEOPageContent = {
    id: 'image-compressor',
    
    intro: {
        what: '图片压缩工具是一款在线图片压缩服务，支持JPG、PNG格式图片压缩，可有效减小图片体积同时保持画质。',
        problem: '解决网页加载慢、图片占用存储空间大、无法上传大图片等问题。',
        capability: '支持有损/无损压缩、自定义压缩质量、批量处理、实时预览效果。',
        targetUser: '前端开发者、设计师、自媒体运营、电商卖家、博客作者'
    },
    
    targetAudience: [
        '前端开发者',
        'UI设计师',
        '自媒体运营',
        '电商卖家',
        '博客作者',
        '摄影师'
    ],
    
    useCases: [
        '网页优化 - 压缩图片提升页面加载速度',
        '存储节省 - 减少图片占用空间',
        '上传限制 - 压缩图片满足平台要求',
        '邮件附件 - 压缩图片便于邮件发送',
        '社交分享 - 压缩图片便于快速分享'
    ],
    
    coreFeatures: [
        '支持JPG、PNG格式压缩',
        '自定义压缩质量',
        '批量压缩处理',
        '实时预览压缩效果',
        '显示压缩前后对比',
        '保持图片清晰度'
    ],
    
    exampleIO: {
        input: '原图：5MB的高清照片',
        output: '压缩后：500KB，画质几乎无变化，体积减少90%'
    },
    
    usageSteps: [
        '上传或拖拽需要压缩的图片',
        '调整压缩质量（可选）',
        '下载压缩后的图片'
    ],
    
    faq: [
        { question: '压缩后会损失画质吗？', answer: '可以根据需要调整压缩质量，选择合适的压缩率可以在保持画质的同时大幅减小体积。' },
        { question: '支持批量压缩吗？', answer: '支持，可以一次上传多张图片批量压缩。' },
        { question: '支持哪些图片格式？', answer: '目前支持JPG/JPEG和PNG格式的图片压缩。' }
    ],
    
    relatedTools: ['image-converter', 'image-editor', 'image-watermark']
};

export default imageCompressorSEO;

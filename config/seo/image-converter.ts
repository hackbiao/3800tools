import type { SEOPageContent } from '@/types/seo';

const imageConverterSEO: SEOPageContent = {
    id: 'image-converter',
    
    intro: {
        what: '图片格式转换工具是一款在线图片格式转换服务，支持PNG、JPG、WebP、GIF、BMP等主流图片格式互转。',
        problem: '解决不同场景下图片格式不兼容的问题，如网页需要WebP格式、证件照需要JPG格式等。',
        capability: '支持批量转换、保持原图质量、自动压缩优化、支持透明背景保留。',
        targetUser: '设计师、前端开发者、自媒体运营、电商卖家、摄影师、普通用户'
    },
    
    targetAudience: [
        'UI设计师',
        '前端开发者',
        '自媒体运营',
        '电商卖家',
        '摄影师',
        '普通用户'
    ],
    
    useCases: [
        '网页优化 - 将图片转换为WebP格式提升加载速度',
        '证件照处理 - 转换为指定格式的证件照',
        '电商上传 - 转换为平台要求的图片格式',
        '社交媒体 - 转换为适合各平台的图片格式',
        '设计稿交付 - 统一转换设计稿格式'
    ],
    
    coreFeatures: [
        '支持PNG、JPG、WebP、GIF、BMP格式互转',
        '批量转换，一次处理多张图片',
        '保持原图质量，无损转换',
        '支持透明背景保留',
        '自动压缩优化图片大小',
        '无需安装软件，在线即可使用'
    ],
    
    exampleIO: {
        input: '上传一张PNG格式的透明背景Logo图片',
        output: '转换为WebP格式，保持透明背景，文件大小减少30%'
    },
    
    usageSteps: [
        '上传或拖拽需要转换的图片文件',
        '选择目标格式（支持PNG、JPG、WebP、GIF、BMP）',
        '点击转换按钮，下载转换后的图片'
    ],
    
    faq: [
        { question: '转换后的图片质量会下降吗？', answer: '不会，工具支持无损转换，保持原图质量。' },
        { question: '支持批量转换吗？', answer: '支持，可以一次上传多张图片批量转换。' },
        { question: '透明背景会丢失吗？', answer: '不会，转换到支持透明度的格式（PNG、WebP）时会保留透明背景。' },
        { question: '转换速度如何？', answer: '本地处理，速度很快，通常几秒内即可完成。' }
    ],
    
    relatedTools: ['image-compressor', 'image-editor', 'image-watermark']
};

export default imageConverterSEO;

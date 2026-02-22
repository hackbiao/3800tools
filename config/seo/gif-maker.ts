import type { SEOPageContent } from '@/types/seo';

const gifMakerSEO: SEOPageContent = {
    id: 'gif-maker',
    
    intro: {
        what: 'GIF制作工具是一款在线动图生成工具，可以将多张静态图片合成为GIF动图。',
        problem: '解决需要制作动图、表情包、产品展示动画等需求。',
        capability: '支持多图合成、自定义帧延迟、调整尺寸、预览效果。',
        targetUser: '自媒体运营、设计师、电商卖家、表情包制作者'
    },
    
    targetAudience: [
        '自媒体运营',
        '设计师',
        '电商卖家',
        '表情包制作者',
        '内容创作者'
    ],
    
    useCases: [
        '表情包制作 - 制作有趣的动态表情',
        '产品展示 - 展示产品的多个角度',
        '教程演示 - 制作操作步骤动图',
        '社交媒体 - 发布吸引眼球的动图',
        '广告素材 - 制作简单的动画广告'
    ],
    
    coreFeatures: [
        '多张图片合成GIF',
        '自定义帧延迟时间',
        '调整输出尺寸',
        '实时预览效果',
        '支持拖拽排序',
        '一键下载GIF'
    ],
    
    exampleIO: {
        input: '上传5张连续动作的照片',
        output: '生成一个循环播放的GIF动图，每帧间隔200毫秒'
    },
    
    usageSteps: [
        '上传需要合成的图片（支持多张）',
        '调整图片顺序和帧延迟',
        '预览并下载生成的GIF'
    ],
    
    faq: [
        { question: '最多支持多少张图片？', answer: '建议不超过50张，过多会导致GIF文件过大。' },
        { question: '生成的GIF清晰吗？', answer: '可以根据需要调整输出尺寸，保持原图画质。' },
        { question: '可以调整播放速度吗？', answer: '可以，通过设置帧延迟时间控制播放速度。' }
    ],
    
    relatedTools: ['gif-compressor', 'gif-splitter', 'image-converter']
};

export default gifMakerSEO;

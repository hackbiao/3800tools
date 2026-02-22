import type { SEOPageContent } from '@/types/seo';

const videoAspectConverterSEO: SEOPageContent = {
    id: 'video-aspect-converter',
    
    intro: {
        what: '视频比例转换工具是一款在线视频比例调整服务，可以将视频转换为适配抖音、快手、B站等不同平台的比例格式。',
        problem: '解决不同视频平台比例要求不同、横屏视频转竖屏、视频裁剪适配需求。',
        capability: '支持16:9、9:16、1:1、4:3等多种比例转换，支持裁剪和填充模式，保持视频画质。',
        targetUser: '短视频创作者、自媒体运营、视频剪辑师、直播主播、内容营销人员'
    },
    
    targetAudience: [
        '短视频创作者',
        '自媒体运营',
        '视频剪辑师',
        '直播主播',
        '内容营销人员'
    ],
    
    useCases: [
        '抖音视频 - 将横屏视频转为9:16竖屏格式',
        'B站投稿 - 转换为16:9标准横屏比例',
        '微信视频号 - 制作1:1正方形视频',
        '快手内容 - 适配平台最佳比例',
        '广告投放 - 制作多尺寸版本'
    ],
    
    coreFeatures: [
        '支持多种视频比例转换',
        '裁剪和填充两种模式',
        '保持原视频画质',
        '支持主流视频格式',
        '实时预览效果',
        '本地处理安全快速'
    ],
    
    exampleIO: {
        input: '原始视频：1920x1080（16:9横屏）',
        output: '转换后：1080x1920（9:16竖屏），适配抖音/快手'
    },
    
    usageSteps: [
        '上传需要转换比例的视频文件',
        '选择目标比例（9:16/16:9/1:1等）',
        '预览效果并下载转换后的视频'
    ],
    
    faq: [
        { question: '支持哪些视频格式？', answer: '支持MP4、WebM、MOV等主流视频格式。' },
        { question: '转换会降低画质吗？', answer: '支持保持原画质转换，可根据需要调整输出质量。' },
        { question: '视频时长有限制吗？', answer: '建议处理5分钟以内的视频，过长视频可能需要较长时间。' }
    ],
    
    relatedTools: ['image-converter', 'gif-maker', 'image-editor']
};

export default videoAspectConverterSEO;

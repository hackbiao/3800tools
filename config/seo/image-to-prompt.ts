import type { SEOPageContent } from '@/types/seo';

const imageToPromptSEO: SEOPageContent = {
    id: 'image-to-prompt',
    
    intro: {
        what: '图片转提示词工具是一款基于AI的图片分析工具，可以智能识别图片内容并生成详细的描述提示词。',
        problem: '解决不知道如何描述图片、需要为AI绘画生成参考提示词、图片内容提取需求。',
        capability: 'AI智能分析图片、生成详细描述、支持中英文输出、可用于AI绘画参考。',
        targetUser: 'AI绘画爱好者、设计师、内容创作者、Prompt工程师'
    },
    
    targetAudience: [
        'AI绘画爱好者',
        '设计师',
        '内容创作者',
        'Prompt工程师',
        'Stable Diffusion用户'
    ],
    
    useCases: [
        'AI绘画参考 - 分析参考图生成提示词',
        '图片描述 - 生成图片的详细文字描述',
        '反向工程 - 了解图片的可能生成方式',
        '内容分析 - 提取图片中的元素信息',
        '提示词学习 - 学习如何描述图片'
    ],
    
    coreFeatures: [
        'AI智能图片分析',
        '生成详细描述提示词',
        '支持中英文输出',
        '识别图片风格',
        '提取关键元素',
        '适用于AI绘画'
    ],
    
    exampleIO: {
        input: '上传一张风景照片（如日落海滩）',
        output: '提示词：Beautiful sunset beach scene, golden hour lighting, calm ocean waves, silhouettes of palm trees, warm orange and pink sky'
    },
    
    usageSteps: [
        '上传需要分析的图片',
        '点击生成提示词按钮',
        '查看并复制生成的描述'
    ],
    
    faq: [
        { question: '支持哪些图片格式？', answer: '支持JPG、PNG、WebP等常见图片格式。' },
        { question: '生成的提示词可以用在哪些AI工具？', answer: '可用于Midjourney、Stable Diffusion、DALL-E等主流AI绘画工具。' },
        { question: '分析准确吗？', answer: 'AI会尽力分析图片内容，但复杂场景可能需要人工调整优化。' }
    ],
    
    relatedTools: ['prompt-generator', 'image-editor', 'image-compressor']
};

export default imageToPromptSEO;

import type { SEOPageContent } from '@/types/seo';

const imageToPromptSEO: SEOPageContent = {
    id: 'image-to-prompt',
    
    intro: {
        what: '图片转提示词工具是一款基于AI的图片分析工具，可以智能识别图片内容并生成详细的描述提示词。',
        problem: '解决不知道如何描述图片、需要为AI绘画生成参考提示词、图片内容提取需求。',
        capability: 'AI智能分析图片、生成详细描述、支持中英文输出、可用于AI绘画参考。',
        targetUser: 'AI绘画爱好者、设计师、内容创作者、Prompt工程师',
        usageExperience: '上传图片后3-5秒即可获得详细分析结果，识别准确度高，能够捕捉图像中的主要元素、风格、色调和构图特点。生成的提示词结构完整，包含主体描述、风格特征、技术参数等，可直接用于主流AI绘画工具，生成相似度高达80%以上的作品。',
        pros: [
            'AI分析精准，能捕捉微妙细节和风格特征',
            '生成的提示词结构化，适合直接使用',
            '支持中英文双语，适应不同AI工具',
            '识别速度快，秒级响应',
            '完全免费，无使用次数限制'
        ],
        cons: [
            '对复杂构图或多主体图像可能识别不完全',
            '抽象概念和情感元素识别能力有限',
            '生成的提示词可能需要进行针对性优化'
        ],
        recommendation: '强烈推荐AI绘画新手使用，可作为学习提示词结构的有效工具。对专业用户而言，适合作为灵感起点和基础模板，建议结合自己的需求进行调整和优化。特别适合风格参考和逆向分析优秀作品的生成方法。',
        comparison: '相比其他图片分析工具，本工具专门针对AI绘画场景优化，输出的提示词格式更适合直接用于绘图工具。与手动编写提示词相比，节省大量时间，并能发现容易被忽略的图像特征。'
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
    
    relatedTools: ['prompt-generator', 'image-editor', 'image-converter']
};

export default imageToPromptSEO;

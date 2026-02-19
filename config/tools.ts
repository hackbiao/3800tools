import { lazy } from 'react';
import type { ToolCategory, ToolSEO, ToolType } from '../types/tools';

const TranslateTool = lazy(() => import('../components/TranslateTool'));
const ImageConverterTool = lazy(() => import('../components/ImageConverterTool'));
const ImageEditorTool = lazy(() => import('../components/ImageEditorTool'));
const ImageComparisonTool = lazy(() => import('../components/ImageComparisonTool'));
const ImageRoundCornerTool = lazy(() => import('../components/ImageRoundCornerTool'));
const PhotoCollageTool = lazy(() => import('../components/PhotoCollageTool'));
const CodeHighlightTool = lazy(() => import('../components/CodeHighlightTool'));
const TextFormatterTool = lazy(() => import('../components/TextFormatterTool'));
const JsonFormatterTool = lazy(() => import('../components/JsonFormatterTool'));
const XmlFormatterTool = lazy(() => import('../components/XmlFormatterTool'));
const MathFormulaEditor = lazy(() => import('../components/MathFormulaEditor'));
const TableConverter = lazy(() => import('../components/TableConverter'));
const VideoAspectConverter = lazy(() => import('../components/VideoAspectConverter'));
const TextDiffTool = lazy(() => import('../components/TextDiffTool'));
const PdfToPptTool = lazy(() => import('../components/PdfToPptTool'));
const PdfToImageTool = lazy(() => import('../components/PdfToImageTool'));
const ResumeGeneratorTool = lazy(() => import('../components/ResumeGeneratorTool'));
const PromptGeneratorTool = lazy(() => import('../components/PromptGeneratorTool'));
const MBTITestTool = lazy(() => import('../components/MBTITestTool'));
const ImageToPromptTool = lazy(() => import('../components/ImageToPromptTool'));
const ImageWatermarkRemoverTool = lazy(() => import('../components/ImageWatermarkRemoverTool'));
const MindMapTool = lazy(() => import('../components/MindMapTool'));
const DrawingTool = lazy(() => import('../components/DrawingTool'));
const VRAMCalculatorTool = lazy(() => import('../components/VRAMCalculatorTool'));

export const TOOL_CATEGORIES: ToolCategory[] = [
    {
        id: 'text',
        name: '文本工具',
        icon: 'text_fields',
        description: '文本处理、格式化、翻译等实用工具',
        tools: [
            {
                id: 'translate',
                name: '在线翻译',
                icon: 'translate',
                path: '/translate',
                description: '免费在线翻译工具，支持中英日韩法德西等多语言实时翻译，自动检测源语言，翻译结果准确快速。',
                keywords: ['在线翻译', '免费翻译', '中英翻译', '多语言翻译', '谷歌翻译', '日语翻译', '韩语翻译', '自动翻译'],
                component: TranslateTool,
            },
            {
                id: 'code-highlight',
                name: '代码高亮',
                icon: 'code',
                path: '/code-highlight',
                description: '在线代码语法高亮工具，支持Python、JavaScript、Java、C++等多种编程语言，一键复制高亮代码。',
                keywords: ['代码高亮', '语法高亮', '代码美化', '程序员工具', '在线代码', '代码显示', '编程工具'],
                component: CodeHighlightTool,
            },
            {
                id: 'text-formatter',
                name: '文本格式化',
                icon: 'description',
                path: '/text-formatter',
                description: '免费在线文本格式化工具，支持大小写转换、去除空格、字数统计、文本排序等多种文本处理功能。',
                keywords: ['文本格式化', '大小写转换', '去空格', '字数统计', '文本处理', '在线文本工具', '文本转换'],
                component: TextFormatterTool,
            },
            {
                id: 'json-formatter',
                name: 'JSON 格式化',
                icon: 'data_object',
                path: '/json-formatter',
                description: '免费在线JSON格式化工具，支持JSON数据格式化、校验、压缩，树形结构展示，开发者必备工具。',
                keywords: ['JSON格式化', 'JSON校验', 'JSON压缩', 'JSON解析', 'JSON在线工具', '开发者工具', 'JSON编辑器'],
                component: JsonFormatterTool,
            },
            {
                id: 'xml-formatter',
                name: 'XML 格式化',
                icon: 'code',
                path: '/xml-formatter',
                description: '免费在线XML格式化工具，支持XML数据格式化、校验、压缩，一键美化XML代码。',
                keywords: ['XML格式化', 'XML校验', 'XML压缩', 'XML解析', 'XML在线工具', 'XML编辑器'],
                component: XmlFormatterTool,
            },
            {
                id: 'text-diff',
                name: '文本差异对比',
                icon: 'compare',
                path: '/text-diff',
                description: '免费在线文本差异对比工具，对比两段文本的差异，高亮显示不同之处，支持代码对比。',
                keywords: ['文本对比', '差异对比', '文本比较', '代码对比', '在线对比工具', '文本差异'],
                component: TextDiffTool,
            },
        ],
    },
    {
        id: 'image',
        name: '图片工具',
        icon: 'image',
        description: '图片处理、转换、编辑等实用工具',
        tools: [
            {
                id: 'image-converter',
                name: '图片格式转换',
                icon: 'image',
                path: '/image-converter',
                description: '免费在线图片格式转换工具，支持PNG、JPG、WebP、GIF、BMP等格式互转，批量转换，无需安装软件。',
                keywords: ['图片转换', '格式转换', 'PNG转JPG', 'WebP转换', '图片格式', '在线图片转换', '批量转换'],
                component: ImageConverterTool,
            },
            {
                id: 'image-editor',
                name: '图片快速编辑',
                icon: 'edit',
                path: '/image-editor',
                description: '免费在线图片编辑工具，支持图片裁剪、旋转、调整大小、调整亮度对比度，无需下载软件。',
                keywords: ['图片编辑', '在线P图', '图片裁剪', '图片旋转', '图片压缩', '在线修图', '图片处理'],
                component: ImageEditorTool,
            },
            {
                id: 'image-comparison',
                name: '多图自由拼接',
                icon: 'layers',
                path: '/image-comparison',
                description: '免费在线多图拼接工具，将多张图片自由拼接成长图，支持横向纵向拼接，自定义布局。',
                keywords: ['图片拼接', '长图制作', '拼图', '多图拼接', '在线拼图', '图片合成', '长图生成'],
                component: ImageComparisonTool,
            },
            {
                id: 'image-round-corner',
                name: '图片圆角处理',
                icon: 'rounded_corner',
                path: '/image-round-corner',
                description: '免费在线图片圆角处理工具，为图片添加圆角效果，支持自定义圆角大小，一键生成圆角图片。',
                keywords: ['圆角图片', '图片圆角', '圆角处理', '头像制作', '圆角生成', '在线圆角'],
                component: ImageRoundCornerTool,
            },
            {
                id: 'photo-collage',
                name: '模板快速拼接',
                icon: 'grid_view',
                path: '/photo-collage',
                description: '免费在线拼图工具，使用预设模板快速拼接多张图片，支持多种拼图模板，一键生成精美拼图。',
                keywords: ['拼图模板', '图片拼贴', '照片拼图', '拼图制作', '在线拼图', '照片拼接', '图片组合'],
                component: PhotoCollageTool,
            },
            {
                id: 'image-watermark-remover',
                name: '图片水印去除',
                icon: 'healing',
                path: '/image-watermark-remover',
                description: '免费在线AI图片水印去除工具，智能识别并去除图片水印，还原图片原貌，效果自然。',
                keywords: ['去水印', '水印去除', '图片修复', 'AI去水印', '在线去水印', '图片处理', '水印清除'],
                component: ImageWatermarkRemoverTool,
            },
        ],
    },
    {
        id: 'data',
        name: '数据工具',
        icon: 'analytics',
        description: '数据处理、表格转换、公式编辑等工具',
        tools: [
            {
                id: 'table-converter',
                name: '表格格式转换',
                icon: 'table_chart',
                path: '/table-converter',
                description: '免费在线表格格式转换工具，支持CSV、Excel、JSON、Markdown、HTML等表格格式互转。',
                keywords: ['表格转换', 'CSV转换', 'Excel转换', '表格格式', '数据转换', '在线表格工具', 'JSON转CSV'],
                component: TableConverter,
            },
            {
                id: 'math-formula',
                name: '数学公式编辑',
                icon: 'functions',
                path: '/math-formula',
                description: '免费在线LaTeX数学公式编辑器，实时预览公式效果，支持导出PNG图片，适合论文写作。',
                keywords: ['数学公式', 'LaTeX', '公式编辑器', '数学符号', '在线公式', '公式生成', '论文公式'],
                component: MathFormulaEditor,
            },
            {
                id: 'mind-map',
                name: '思维导图',
                icon: 'account_tree',
                path: '/mind-map',
                description: '免费在线思维导图制作工具，支持多种布局样式，一键导出PNG图片，适合整理思路、知识梳理。',
                keywords: ['思维导图', '脑图', '流程图', '知识图谱', '在线思维导图', '思维整理', '笔记工具'],
                component: MindMapTool,
            },
            {
                id: 'drawing',
                name: '绘图画布',
                icon: 'draw',
                path: '/drawing',
                description: '免费在线绘图画板工具，支持画笔、形状、文字、橡皮擦，可导出PNG图片，适合简单绘图。',
                keywords: ['画板', '绘图', '白板', '涂鸦', '在线画图', '画图工具', '手绘'],
                component: DrawingTool,
            },
        ],
    },
    {
        id: 'media',
        name: '媒体工具',
        icon: 'perm_media',
        description: '视频、PDF、文档转换等媒体处理工具',
        tools: [
            {
                id: 'video-aspect-converter',
                name: '视频比例转换',
                icon: 'aspect_ratio',
                path: '/video-aspect-converter',
                description: '免费在线视频比例转换工具，调整视频比例适配抖音、快手、B站等不同平台，支持裁剪和填充。',
                keywords: ['视频比例', '视频转换', '视频裁剪', '短视频制作', '视频编辑', '横屏转竖屏', '视频适配'],
                component: VideoAspectConverter,
            },
            {
                id: 'pdf-to-ppt',
                name: 'PDF转PPT',
                icon: 'slideshow',
                path: '/pdf-to-ppt',
                description: '免费在线PDF转PPT工具，将PDF文件转换为可编辑的PowerPoint演示文稿，保留原有排版。',
                keywords: ['PDF转PPT', 'PDF转换', 'PPT制作', '文档转换', '在线转换', 'PDF工具', '演示文稿'],
                component: PdfToPptTool,
            },
            {
                id: 'pdf-to-image',
                name: 'PDF转长图',
                icon: 'photo_library',
                path: '/pdf-to-image',
                description: '免费在线PDF转长图工具，将PDF文档转换为长图，方便分享到微信、微博等社交平台。',
                keywords: ['PDF转图片', 'PDF转长图', 'PDF转换', '长图生成', '在线转换', 'PDF工具', '文档转图片'],
                component: PdfToImageTool,
            },
        ],
    },
    {
        id: 'ai',
        name: 'AI工具',
        icon: 'smart_toy',
        description: 'AI智能工具，提升工作效率',
        tools: [
            {
                id: 'vram-calculator',
                name: '显存计算器',
                icon: 'memory',
                path: '/vram-calculator',
                description: '免费在线AI模型显存计算器，计算训练模型所需显存，优化训练参数，深度学习必备工具。',
                keywords: ['显存计算', 'GPU计算', 'AI训练', '深度学习', '显卡计算', '模型训练', 'CUDA计算'],
                component: VRAMCalculatorTool,
            },
            {
                id: 'image-to-prompt',
                name: '图片转提示词',
                icon: 'image_search',
                path: '/image-to-prompt',
                description: '免费在线AI图片分析工具，智能分析图片内容生成描述提示词，可用于AI绘画参考。',
                keywords: ['图片描述', 'AI提示词', '图片分析', 'AI识别', '图片标签', '图像识别', 'AI绘画'],
                component: ImageToPromptTool,
            },
            {
                id: 'resume-generator',
                name: '简历生成器',
                icon: 'description',
                path: '/resume-generator',
                description: '免费在线简历制作工具，多套精美模板可选，一键导出PDF，助力求职找工作。',
                keywords: ['简历制作', '在线简历', '简历模板', '求职简历', '简历生成', '个人简历', '求职工具'],
                component: ResumeGeneratorTool,
            },
            {
                id: 'prompt-generator',
                name: '提示词生成器',
                icon: 'psychology',
                path: '/prompt-generator',
                description: '免费在线AI提示词生成工具，智能生成优化提示词，提升ChatGPT、Claude等AI工具使用效果。',
                keywords: ['提示词', 'Prompt', 'AI写作', 'ChatGPT提示词', '提示词优化', 'AI工具', '提示词生成'],
                component: PromptGeneratorTool,
            },
            {
                id: 'mbti-test',
                name: 'MBTI人格测试',
                icon: 'mood',
                path: '/mbti-test',
                description: '免费在线MBTI人格测试，专业的性格测试问卷，了解自己的性格类型，职业规划参考。',
                keywords: ['MBTI', '人格测试', '性格测试', '心理测试', '职业测试', '人格类型', '16型人格'],
                component: MBTITestTool,
            },
        ],
    },
];

export const ALL_TOOLS = TOOL_CATEGORIES.flatMap(category => category.tools);

export const getToolByPath = (path: string) => {
    return ALL_TOOLS.find(tool => tool.path === path);
};

export const getToolById = (id: ToolType) => {
    return ALL_TOOLS.find(tool => tool.id === id);
};

export const getToolSEO = (toolId: ToolType): ToolSEO => {
    const tool = getToolById(toolId);
    if (!tool) {
        return {
            title: '叁八零零 - 在线免费工具箱',
            description: '叁八零零提供在线翻译、图片处理、代码高亮等多种免费在线工具，无需注册，数据安全。',
            keywords: '在线工具,免费工具,工具箱,翻译,图片处理',
        };
    }
    return {
        title: `${tool.name} - 叁八零零在线工具`,
        description: tool.description,
        keywords: tool.keywords.join(','),
    };
};

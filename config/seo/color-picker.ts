import type { SEOPageContent } from '@/types/seo';

const colorPickerSEO: SEOPageContent = {
    id: 'color-picker',
    
    intro: {
        what: '颜色转换器是专业的色彩管理和格式转换工具，支持RGB、HEX、HSL、HSV、LAB等10种颜色格式互转，提供高级取色器、调色板管理、颜色对比度检测、色盲模拟等企业级功能，满足设计师和开发者的专业色彩需求。',
        problem: '设计师和开发者常面临颜色格式不统一、取色困难、颜色对比度不达标、跨平台色彩不一致等问题。缺乏专业的颜色管理工具，影响工作效率和产品质量。',
        capability: '支持10种颜色格式转换、高级取色器（支持屏幕取色）、调色板管理（保存/导入/导出）、WCAG对比度检测、色盲色弱模拟、渐变生成器、色彩 harmony 分析、PANTONE色卡匹配、CSS代码自动生成，提供完整的色彩解决方案。',
        targetUser: 'UI/UX设计师、前端开发者、品牌设计师、网页设计师、平面设计师',
        usageExperience: '界面专业直观，左侧颜色选择器支持多种取色模式，中间实时预览区域展示颜色效果，右侧格式转换区清晰显示所有格式。拖拽上传图片自动提取主色，支持生成和谐配色方案。WCAG对比度检测实时反馈，确保可访问性。',
        pros: [
            '支持10种颜色格式，覆盖所有专业需求',
            '屏幕取色功能，可从任意应用取色',
            'WCAG对比度检测，符合可访问性标准',
            '调色板管理，支持团队协作',
            '色盲模拟，确保广泛用户可访问'
        ],
        cons: [
            'PANTONE色卡同步需要网络',
            '渐变预览在大屏幕时有延迟',
            '暂不支持CMYK印刷色彩模式'
        ],
        recommendation: '网页开发推荐RGB/HEX格式；印刷设计预览LAB模式；可访问性重要场景使用对比度检测；品牌设计建议保存调色板。',
        comparison: '与Adobe Color相比，本工具免费使用且支持屏幕取色。与Coolors.co相比，格式转换更专业。与浏览器开发者工具相比，功能更全面，支持批量操作。'
    },
    
    targetAudience: [
        'UI设计师',
        '前端开发者',
        '网页设计师',
        '平面设计师',
        '插画师'
    ],
    
    useCases: [
        '网页设计 - 转换CSS颜色格式',
        '品牌设计 - 统一品牌色值',
        '取色工具 - 从色板选取颜色',
        '颜色对比 - 查看不同格式颜色值',
        '代码编写 - 快速获取颜色代码'
    ],
    
    coreFeatures: [
        '10种颜色格式互转（RGB/HEX/HSL/HSV/LAB等）',
        '高级屏幕取色器',
        '调色板管理（保存/导入/导出）',
        'WCAG对比度检测',
        '色盲色弱模拟',
        '渐变生成器',
        '色彩harmony分析',
        'CSS/SASS/LESS代码生成'
    ],
    
    exampleIO: {
        input: '取色：屏幕取色 | 目标：按钮背景色',
        output: 'HEX: #607AFB | RGB: rgb(96, 122, 251) | HSL: hsl(229, 95%, 68%) | 对比度AA: 4.5:1'
    },
    
    usageSteps: [
        '通过颜色选择器选取颜色，或输入颜色值',
        '查看不同格式的颜色值',
        '复制需要的格式'
    ],
    
    faq: [
        { question: '支持哪些颜色格式？', answer: '支持RGB、HEX（十六进制）、HSL三种常用颜色格式互转。' },
        { question: '颜色选择器准确吗？', answer: '使用浏览器原生颜色选择器，颜色准确可靠。' },
        { question: '可以保存常用颜色吗？', answer: '目前不支持保存，建议使用笔记工具记录常用颜色值。' }
    ],
    
    relatedTools: ['image-editor', 'image-converter', 'qrcode-generator']
};

export default colorPickerSEO;

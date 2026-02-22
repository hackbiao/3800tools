import type { SEOPageContent } from '@/types/seo';

const colorPickerSEO: SEOPageContent = {
    id: 'color-picker',
    
    intro: {
        what: '颜色转换器是一款在线颜色格式转换工具，支持RGB、HEX、HSL等颜色格式互转，提供颜色选择器。',
        problem: '解决不同场景下颜色格式不一致、需要快速取色、颜色格式转换的需求。',
        capability: '支持RGB/HEX/HSL互转、可视化颜色选择器、颜色预览、一键复制。',
        targetUser: 'UI设计师、前端开发者、网页设计师、平面设计师'
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
        'RGB格式转换',
        'HEX格式转换',
        'HSL格式转换',
        '可视化颜色选择器',
        '颜色预览',
        '一键复制代码'
    ],
    
    exampleIO: {
        input: 'HEX: #607AFB',
        output: 'RGB: rgb(96, 122, 251)\nHSL: hsl(229, 95%, 68%)'
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

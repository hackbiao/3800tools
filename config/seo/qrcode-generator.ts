import type { SEOPageContent } from '@/types/seo';

const qrcodeGeneratorSEO: SEOPageContent = {
    id: 'qrcode-generator',
    
    intro: {
        what: '二维码生成器是一款在线二维码制作工具，支持生成网址、文本、名片等多种类型的二维码，可自定义颜色和尺寸。',
        problem: '解决用户需要快速生成二维码、批量制作二维码、美化二维码的需求。',
        capability: '支持多种内容类型、自定义样式、批量生成、高清导出PNG格式。',
        targetUser: '市场营销人员、活动策划者、自媒体运营、电商卖家、设计师'
    },
    
    targetAudience: [
        '市场营销人员',
        '活动策划者',
        '自媒体运营',
        '电商卖家',
        '设计师',
        '普通用户'
    ],
    
    useCases: [
        '营销推广 - 生成活动链接二维码',
        '名片制作 - 生成电子名片二维码',
        '商品展示 - 生成产品详情页二维码',
        '活动签到 - 生成签到二维码',
        '社交分享 - 生成微信/微博二维码'
    ],
    
    coreFeatures: [
        '支持网址、文本、名片等多种类型',
        '自定义二维码颜色',
        '自定义二维码尺寸',
        '支持容错级别设置',
        '一键下载PNG图片',
        '支持批量生成'
    ],
    
    exampleIO: {
        input: '内容：https://tools.3800ai.com\n颜色：蓝色\n尺寸：300x300像素',
        output: '生成一个蓝色的二维码图片，扫描后跳转到 https://tools.3800ai.com'
    },
    
    usageSteps: [
        '输入要生成二维码的内容',
        '自定义颜色、尺寸等样式',
        '点击生成并下载PNG图片'
    ],
    
    faq: [
        { question: '二维码有有效期吗？', answer: '生成的二维码没有有效期限制，可永久使用。但如果是网址二维码，需确保网址有效。' },
        { question: '支持哪些内容类型？', answer: '支持网址、纯文本、电话号码、短信、邮箱、WiFi、名片等多种类型。' },
        { question: '二维码清晰度如何？', answer: '支持高分辨率导出，打印放大后依然清晰可扫描。' }
    ],
    
    relatedTools: ['image-converter', 'image-watermark', 'image-editor']
};

export default qrcodeGeneratorSEO;

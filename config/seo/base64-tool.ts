import type { SEOPageContent } from '@/types/seo';

const base64ToolSEO: SEOPageContent = {
    id: 'base64-tool',
    
    intro: {
        what: 'Base64编解码工具是一款在线Base64编码解码服务，支持文本和图片的Base64互转，方便数据传输和存储。',
        problem: '解决二进制数据传输、图片内嵌、数据编码转换的需求。',
        capability: '支持文本Base64编解码、图片转Base64、支持中文字符、实时转换。',
        targetUser: '开发者、前端工程师、数据处理人员、测试工程师'
    },
    
    targetAudience: [
        '开发者',
        '前端工程师',
        '后端工程师',
        '数据处理人员',
        '测试工程师'
    ],
    
    useCases: [
        '数据传输 - 编码特殊字符',
        '图片内嵌 - 将图片转为Base64嵌入代码',
        'API调试 - 处理Base64编码数据',
        '邮件附件 - 编码附件内容',
        '数据存储 - 将二进制数据转为文本'
    ],
    
    coreFeatures: [
        '文本Base64编码',
        'Base64解码为文本',
        '图片转Base64',
        '支持中文字符',
        '实时转换',
        '一键复制结果'
    ],
    
    exampleIO: {
        input: '原文：Hello, 世界！',
        output: 'Base64编码：SGVsbG8sIOS4lueVjO+8gQ=='
    },
    
    usageSteps: [
        '输入需要编码的文本或上传图片',
        '点击编码或解码按钮',
        '复制转换结果'
    ],
    
    faq: [
        { question: 'Base64编码有什么用？', answer: 'Base64用于在文本协议中传输二进制数据，如邮件、URL、JSON等场景。' },
        { question: '编码后数据会变大吗？', answer: '是的，Base64编码后数据大约增加33%的体积。' },
        { question: '支持多大的图片？', answer: '建议图片不超过2MB，过大的图片可能导致浏览器卡顿。' }
    ],
    
    relatedTools: ['hash-calculator', 'encoding-converter', 'url-parser']
};

export default base64ToolSEO;

import type { SEOPageContent } from '@/types/seo';

const xmlFormatterSEO: SEOPageContent = {
    id: 'xml-formatter',
    
    intro: {
        what: 'XML格式化工具是一款在线XML数据处理工具，支持XML格式化、校验、压缩，帮助开发者处理XML数据。',
        problem: '解决XML数据难以阅读、格式错误难以定位、数据压缩需求等问题。',
        capability: '支持XML格式化美化、语法校验、错误定位、数据压缩、一键复制。',
        targetUser: '后端开发者、数据工程师、API开发人员、配置管理员'
    },
    
    targetAudience: [
        '后端开发者',
        '数据工程师',
        'API开发人员',
        '配置管理员',
        '系统集成工程师'
    ],
    
    useCases: [
        '配置文件 - 美化XML配置文件',
        '数据交换 - 格式化XML数据',
        'API调试 - 处理XML响应',
        '数据校验 - 检查XML格式正确性',
        '文档整理 - 美化XML文档'
    ],
    
    coreFeatures: [
        'XML格式化美化',
        '语法校验',
        '错误行号定位',
        'XML压缩',
        '支持大文件',
        '自定义缩进'
    ],
    
    exampleIO: {
        input: '<root><name>张三</name><age>25</age></root>',
        output: `<?xml version="1.0" encoding="UTF-8"?>
<root>
  <name>张三</name>
  <age>25</age>
</root>`
    },
    
    usageSteps: [
        '粘贴需要处理的XML数据',
        '选择格式化或压缩',
        '查看结果并复制'
    ],
    
    faq: [
        { question: '支持多大的XML文件？', answer: '支持处理数MB大小的XML文件，具体取决于浏览器性能。' },
        { question: '如何处理XML格式错误？', answer: '工具会自动检测并提示错误位置，帮助您快速定位和修复。' },
        { question: '数据安全吗？', answer: '所有处理在浏览器本地完成，数据不会上传到服务器。' }
    ],
    
    relatedTools: ['json-formatter', 'table-converter', 'code-highlight']
};

export default xmlFormatterSEO;

import type { SEOPageContent } from '@/types/seo';

const jsonFormatterSEO: SEOPageContent = {
    id: 'json-formatter',
    
    intro: {
        what: 'JSON格式化工具是一款在线JSON数据处理工具，支持JSON格式化、校验、压缩和树形展示。',
        problem: '解决JSON数据难以阅读、格式错误难以定位、数据压缩需求等问题。',
        capability: '支持JSON格式化美化、语法校验、错误定位、数据压缩、树形结构展示、一键复制。',
        targetUser: '前端开发者、后端开发者、API测试人员、数据分析师、运维工程师'
    },
    
    targetAudience: [
        '前端开发者',
        '后端开发者',
        'API测试人员',
        '数据分析师',
        '运维工程师',
        '编程学习者'
    ],
    
    useCases: [
        'API调试 - 格式化API返回的JSON数据便于阅读',
        '数据校验 - 检查JSON格式是否正确，定位语法错误',
        '代码压缩 - 压缩JSON数据减少传输体积',
        '配置文件 - 美化JSON配置文件提高可读性',
        '学习辅助 - 帮助理解JSON数据结构'
    ],
    
    coreFeatures: [
        'JSON格式化美化，缩进可自定义',
        '语法校验，实时错误提示',
        '错误行号定位，快速修复',
        'JSON压缩，减少数据体积',
        '树形结构展示，直观查看层级',
        '支持大文件处理'
    ],
    
    exampleIO: {
        input: '{"name":"张三","age":25,"hobbies":["编程","阅读"],"address":{"city":"北京","district":"朝阳"}}',
        output: `{
  "name": "张三",
  "age": 25,
  "hobbies": [
    "编程",
    "阅读"
  ],
  "address": {
    "city": "北京",
    "district": "朝阳"
  }
}`
    },
    
    usageSteps: [
        '粘贴或输入需要处理的JSON数据',
        '选择操作：格式化、压缩或校验',
        '查看结果，可一键复制使用'
    ],
    
    faq: [
        { question: '支持多大的JSON文件？', answer: '支持处理数MB大小的JSON文件，具体取决于浏览器性能。' },
        { question: 'JSON格式错误怎么办？', answer: '工具会自动检测并提示错误位置，帮助您快速修复。' },
        { question: '数据会上传到服务器吗？', answer: '不会，所有处理在浏览器本地完成，数据安全有保障。' },
        { question: '支持JSON5格式吗？', answer: '目前支持标准JSON格式，JSON5格式可能无法正确解析。' }
    ],
    
    relatedTools: ['xml-formatter', 'code-highlight', 'text-diff']
};

export default jsonFormatterSEO;

import type { SEOPageContent } from '@/types/seo';

const statusCodeLookupSEO: SEOPageContent = {
    id: 'status-code-lookup',
    
    intro: {
        what: 'HTTP状态码查询工具是一款在线HTTP状态码参考手册，提供完整的状态码含义说明和解决方案。',
        problem: '解决开发调试时需要快速查阅状态码含义、了解错误原因的需求。',
        capability: '覆盖所有HTTP状态码、详细说明含义、提供常见解决方案。',
        targetUser: '开发者、测试工程师、运维人员、API设计师'
    },
    
    targetAudience: [
        '开发者',
        '测试工程师',
        '运维人员',
        'API设计师',
        '技术支持人员'
    ],
    
    useCases: [
        'API调试 - 快速了解接口返回状态',
        '错误排查 - 定位HTTP错误原因',
        '文档编写 - 查询状态码含义',
        '学习参考 - 了解HTTP协议状态码',
        '技术支持 - 解答用户遇到的错误'
    ],
    
    coreFeatures: [
        '1xx信息响应状态码',
        '2xx成功状态码',
        '3xx重定向状态码',
        '4xx客户端错误码',
        '5xx服务器错误码',
        '详细说明和解决方案'
    ],
    
    exampleIO: {
        input: '查询状态码：404',
        output: 'Not Found - 请求的资源不存在\n常见原因：URL错误、资源已删除\n解决方案：检查URL是否正确'
    },
    
    usageSteps: [
        '输入或选择HTTP状态码',
        '查看状态码含义说明',
        '了解常见原因和解决方案'
    ],
    
    faq: [
        { question: '覆盖哪些状态码？', answer: '覆盖所有标准HTTP状态码，包括1xx到5xx系列。' },
        { question: '有解决方案吗？', answer: '常见状态码会附带可能的原因和解决建议。' },
        { question: '支持搜索吗？', answer: '支持输入状态码数字快速查询。' }
    ],
    
    relatedTools: ['curl-generator', 'url-parser', 'browser-fingerprint']
};

export default statusCodeLookupSEO;

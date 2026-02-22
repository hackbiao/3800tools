import type { SEOPageContent } from '@/types/seo';

const curlGeneratorSEO: SEOPageContent = {
    id: 'curl-generator',
    
    intro: {
        what: 'Curl生成器是一款在线Curl命令生成工具，可以帮助开发者快速生成HTTP请求的Curl命令。',
        problem: '解决手写Curl命令容易出错、复杂请求参数难以组织、API调试效率低的问题。',
        capability: '可视化配置请求、自动生成Curl命令、支持各种HTTP方法和请求头。',
        targetUser: '后端开发者、API测试人员、运维工程师、爬虫开发者'
    },
    
    targetAudience: [
        '后端开发者',
        'API测试人员',
        '运维工程师',
        '爬虫开发者',
        '前端工程师'
    ],
    
    useCases: [
        'API调试 - 快速生成测试请求命令',
        '接口文档 - 生成可复制的请求示例',
        '自动化脚本 - 制作批量请求脚本',
        '问题排查 - 复现API请求问题',
        '学习参考 - 了解Curl命令格式'
    ],
    
    coreFeatures: [
        '支持GET/POST/PUT/DELETE等方法',
        '自定义请求头Headers',
        '添加请求体Body',
        '支持URL参数',
        '一键复制Curl命令',
        '支持JSON格式'
    ],
    
    exampleIO: {
        input: '配置：POST请求，URL: https://api.example.com/users，Body: {"name":"test"}',
        output: "curl -X POST 'https://api.example.com/users' -H 'Content-Type: application/json' -d '{\"name\":\"test\"}'"
    },
    
    usageSteps: [
        '配置请求方法和URL',
        '添加请求头和请求体',
        '复制生成的Curl命令'
    ],
    
    faq: [
        { question: '支持哪些HTTP方法？', answer: '支持GET、POST、PUT、DELETE、PATCH等常用HTTP方法。' },
        { question: '可以保存配置吗？', answer: '目前不支持保存，建议复制生成的命令保存到本地。' },
        { question: '命令在哪些系统可用？', answer: '生成的Curl命令可在Linux、macOS、Windows（WSL或Git Bash）中使用。' }
    ],
    
    relatedTools: ['url-parser', 'json-formatter', 'status-code-lookup']
};

export default curlGeneratorSEO;

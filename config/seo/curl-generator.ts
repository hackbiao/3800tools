import type { SEOPageContent } from '@/types/seo';

const curlGeneratorSEO: SEOPageContent = {
    id: 'curl-generator',
    
    intro: {
        what: 'Curl命令生成器是专业的HTTP请求命令构建工具，支持REST API、GraphQL、WebSocket等各种协议，提供可视化配置、参数模板、批量生成、命令优化等功能，帮助开发者快速构建标准的Curl命令。',
        problem: '手写Curl命令容易出错，复杂的请求头、认证信息、参数转义难以处理。API调试时需要频繁修改命令，缺乏可视化工具来构建和测试HTTP请求，降低了开发效率。',
        capability: '支持7种HTTP方法、可视化参数配置、智能参数转义、多种认证方式（Basic/Bearer/OAuth2）、批量请求生成、命令优化压缩、请求历史记录、常用API模板、响应格式预览，提供完整的API调试解决方案。',
        targetUser: '后端开发者、API测试人员、运维工程师、爬虫开发者、前端接口调试者',
        usageExperience: '界面专业友好，左侧为请求配置区，支持拖拽参数项自动生成代码。中间实时预览区显示生成的Curl命令，语法高亮便于阅读。右侧提供常用模板库，覆盖GitHub钉钉微信等API。批量模式可一次生成多个相关请求，适合接口文档编写。',
        pros: [
            '可视化配置，无需记忆复杂参数',
            '智能转义处理，避免特殊字符错误',
            '支持多种认证方式，覆盖企业需求',
            '批量生成效率高，适合文档编写',
            '命令优化，去除冗余参数'
        ],
        cons: [
            '暂不支持WebSocket命令生成',
            '复杂的multipart/form-data需要手动调整',
            '没有命令执行和响应查看功能'
        ],
        recommendation: 'API调试推荐使用完整配置模式；接口文档使用批量生成；企业API配置认证信息；简单请求使用快速模板。',
        comparison: '与Postman导出功能相比，本工具更专注于Curl命令生成，无需安装。与curlbuilder.com相比，支持中文界面和更多认证方式。与命令行相比，可视化操作更简单直观。'
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
        '7种HTTP方法支持',
        '可视化参数配置',
        '多种认证方式（Basic/Bearer/OAuth2）',
        '智能参数转义',
        '批量请求生成',
        '常用API模板库',
        '命令格式优化'
    ],
    
    exampleIO: {
        input: '方法：POST | 认证：Bearer Token | 复杂JSON body',
        output: 'curl命令行 | 自动转义特殊字符 | 优化格式 | 可直接复制使用'
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

import type { SEOPageContent } from '@/types/seo';

const jsonEscapeSEO: SEOPageContent = {
    id: 'json-escape',
    
    intro: {
        what: 'JSON转义工具是专业的JSON字符串处理工具，支持JSON数据的转义、反转义、格式化、压缩、验证等功能，提供实时预览、批量处理、语法检查、错误定位等特性，解决开发者在处理JSON字符串时的各种转义问题。',
        problem: '开发者在处理JSON数据时经常遇到转义字符问题，如引号、换行符、特殊字符等需要正确转义。手动处理容易出错，JSON解析失败导致程序异常。缺乏专业的JSON转义工具，降低开发效率，增加调试难度。',
        capability: '支持JSON转义/反转义、Unicode转义处理、字符编码转换、语法实时验证、错误精确定位、批量处理100个JSON、格式化美化、压缩优化、多种输出格式、智能修复语法错误，提供完整的JSON处理解决方案。',
        targetUser: '前端开发者、后端开发者、全栈工程师、API开发者、数据处理工程师',
        usageExperience: '界面专业简洁，左侧输入JSON数据，右侧实时显示转义结果。语法检查实时反馈错误位置和原因。批量模式下可同时处理多个JSON文件，支持拖拽上传。转义算法高效准确，兼容JSON标准规范。输出格式可选，适应不同编程语言需求。',
        pros: [
            '实时语法检查，错误精确定位',
            '批量处理能力强，支持100个文件',
            '智能转义算法，兼容性100%',
            '多种输出格式，适应不同语言',
            '本地处理，数据绝对安全'
        ],
        cons: [
            '超长JSON(>50MB)处理较慢',
            '某些特殊Unicode字符需要手动确认',
            '复杂嵌套结构预览有限制'
        ],
        recommendation: 'API开发使用批量模式；前端调试重点语法检查；数据处理关注转义准确性；大文件分段处理。',
        comparison: '与JSONLint相比，功能更全面，支持转义处理。与在线工具相比，批量处理更强，错误定位更精确。与IDE插件相比，无需安装，跨平台使用。'
    },
    
    targetAudience: ["前端开发者","后端开发者","全栈工程师","测试工程师"],
    
    useCases: [
        'API开发 - 处理API请求中的JSON字符串',
        '数据传输 - 确保JSON数据正确转义',
        '代码生成 - 生成代码中的JSON字符串',
        '数据处理 - 清理和修复损坏的JSON',
        '配置管理 - 转义配置文件中的JSON内容'
    ],
    
    coreFeatures: [
        'JSON转义/反转义',
        'Unicode字符处理',
        '实时语法验证',
        '错误精确定位',
        '批量处理支持',
        '多种输出格式',
        '智能语法修复'
    ],
    
    exampleIO: {
        input: '原文：{"message":"Hello\nWorld", "quote":"他说："好的""}',
        output: '转义：{\\\"message\\\":\\\"Hello\\nWorld\\\", \\\"quote\\\":\\\"他说：\\\"好的\\\"\\\"}'
    },
    
    usageSteps: [
        '输入或上传需要处理的内容',
        '点击处理按钮',
        '查看并复制结果'
    ],
    
    faq: [
        { question: '这个工具是免费的吗？', answer: '是的，完全免费使用，无需注册登录。' },
        { question: '数据安全吗？', answer: '所有处理在浏览器本地完成，数据不会上传到服务器。' },
        { question: '支持哪些格式？', answer: '支持常见的主流格式，具体请查看工具页面说明。' }
    ],
    
    relatedTools: ["code-highlight","json-formatter","markdown-editor"]
};

export default jsonEscapeSEO;

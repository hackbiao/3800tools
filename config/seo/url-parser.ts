import type { SEOPageContent } from '@/types/seo';

const urlParserSEO: SEOPageContent = {
    id: 'url-parser',
    
    intro: {
        what: 'URL解析器工具是一款在线网络工具，帮助用户处理网络相关的任务。',
        problem: '解决网络配置、调试、分析等场景的需求。',
        capability: '支持URL解析器、实时处理、结果准确、一键复制。',
        targetUser: '开发者、运维人员、网络工程师、测试人员'
    },
    
    targetAudience: ["开发者","运维人员","网络工程师","测试人员"],
    
    useCases: [
        'URL解析器 - 快速完成处理任务',
        '日常使用 - 无需安装软件在线处理',
        '批量处理 - 提高工作效率',
        '专业场景 - 满足各类专业需求'
    ],
    
    coreFeatures: [
        '在线处理，无需安装',
        '操作简单，易于使用',
        '处理快速，结果准确',
        '数据安全，本地处理'
    ],
    
    exampleIO: {
        input: '输入需要处理的内容',
        output: '获得处理后的结果'
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
    
    relatedTools: ["ip-converter","url-parser","curl-generator"]
};

export default urlParserSEO;

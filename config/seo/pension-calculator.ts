import type { SEOPageContent } from '@/types/seo';

const pensionCalculatorSEO: SEOPageContent = {
    id: 'pension-calculator',
    
    intro: {
        what: '养老金计算器工具是一款在线计算工具，提供精确的计算服务。',
        problem: '解决各类数值计算、财务规划、时间计算等需求。',
        capability: '精确计算、支持多种参数、结果详细、操作便捷。',
        targetUser: '学生、财务人员、普通用户、专业人士'
    },
    
    targetAudience: ["学生","财务人员","普通用户","专业人士"],
    
    useCases: [
        '养老金计算器 - 快速完成处理任务',
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
    
    relatedTools: ["mortgage-calculator","tax-calculator","bmi-calculator"]
};

export default pensionCalculatorSEO;

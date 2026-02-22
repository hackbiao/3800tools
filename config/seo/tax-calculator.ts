import type { SEOPageContent } from '@/types/seo';

const taxCalculatorSEO: SEOPageContent = {
    id: 'tax-calculator',
    
    intro: {
        what: '个税计算器是一款在线个人所得税计算工具，基于最新个税税率表，支持五险一金和专项附加扣除计算。',
        problem: '解决职场人士不清楚税后工资、不了解个税计算方式、难以进行薪资谈判的问题。',
        capability: '支持最新个税税率、五险一金计算、专项附加扣除、全年一次性奖金计算。',
        targetUser: '上班族、HR、求职者、自由职业者、企业财务人员'
    },
    
    targetAudience: [
        '上班族',
        'HR人员',
        '求职者',
        '自由职业者',
        '企业财务人员'
    ],
    
    useCases: [
        '薪资谈判 - 了解税后实际到手工资',
        '跳槽决策 - 对比不同offer的税后收入',
        '年终奖规划 - 计算年终奖最优发放方式',
        '专项扣除规划 - 合理利用专项附加扣除',
        '个税申报 - 了解应纳税所得额'
    ],
    
    coreFeatures: [
        '基于最新个税税率表计算',
        '支持五险一金扣除',
        '支持7项专项附加扣除',
        '支持全年一次性奖金计算',
        '显示应纳税额和实发工资',
        '支持累计预扣法计算'
    ],
    
    exampleIO: {
        input: '税前月薪：15000元\n五险一金：个人缴纳2000元\n专项附加扣除：2000元',
        output: '应纳税所得额：5500元\n应缴个税：145元\n税后到手：约12855元'
    },
    
    usageSteps: [
        '输入税前月薪和五险一金',
        '选择适用的专项附加扣除项目',
        '查看个税金额和税后到手工资'
    ],
    
    faq: [
        { question: '专项附加扣除有哪些项目？', answer: '包括子女教育、继续教育、大病医疗、住房贷款利息、住房租金、赡养老人、3岁以下婴幼儿照护共7项。' },
        { question: '年终奖怎么计算个税？', answer: '年终奖可单独计税或并入综合所得，工具支持两种方式对比计算。' },
        { question: '个税起征点是多少？', answer: '目前个税起征点为每月5000元，即年收入6万元以下免征。' }
    ],
    
    relatedTools: ['mortgage-calculator', 'loan-calculator', 'salary-calculator']
};

export default taxCalculatorSEO;

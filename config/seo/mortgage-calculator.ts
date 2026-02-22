import type { SEOPageContent } from '@/types/seo';

const mortgageCalculatorSEO: SEOPageContent = {
    id: 'mortgage-calculator',
    
    intro: {
        what: '房贷计算器是一款在线房贷月供计算工具，支持等额本息和等额本金两种还款方式，帮助购房者精确计算房贷月供和总利息。',
        problem: '解决购房者在贷款前无法预估月供金额、不了解不同还款方式差异、难以做出购房决策的问题。',
        capability: '支持等额本息/等额本金计算、显示还款明细、计算总利息、支持商业贷款和公积金贷款。',
        targetUser: '购房者、房产投资者、房产中介、银行信贷员、理财规划师'
    },
    
    targetAudience: [
        '首次购房者',
        '房产投资者',
        '房产中介',
        '银行信贷员',
        '理财规划师'
    ],
    
    useCases: [
        '购房预算 - 计算自己能承受的房贷月供',
        '贷款比较 - 对比不同贷款方案的成本',
        '还款规划 - 了解还款明细做好资金规划',
        '投资分析 - 计算投资房产的资金成本',
        '提前还款 - 评估提前还款的收益'
    ],
    
    coreFeatures: [
        '支持等额本息和等额本金两种方式',
        '显示每月还款明细',
        '计算总利息和总还款额',
        '支持商业贷款、公积金贷款',
        '支持组合贷款计算',
        '可视化还款图表展示'
    ],
    
    exampleIO: {
        input: '贷款金额：100万元\n贷款期限：30年\n贷款利率：4.2%（年利率）',
        output: '等额本息：月供约4890元，总利息约76万元\n等额本金：首月约6133元（逐月递减），总利息约63万元'
    },
    
    usageSteps: [
        '输入贷款金额、贷款期限',
        '选择还款方式和贷款利率',
        '查看月供、总利息等详细计算结果'
    ],
    
    faq: [
        { question: '等额本息和等额本金哪个更划算？', answer: '等额本金总利息更少，但前期月供较高；等额本息月供固定，更易规划。根据个人收入情况选择。' },
        { question: '公积金贷款利率是多少？', answer: '公积金贷款利率通常低于商业贷款，目前首套房约2.85%，具体以当地政策为准。' },
        { question: '可以提前还款吗？', answer: '大多数银行支持提前还款，但可能有违约金，建议咨询贷款银行。' }
    ],
    
    relatedTools: ['loan-calculator', 'tax-calculator', 'pension-calculator']
};

export default mortgageCalculatorSEO;

import type { SEOPageContent } from '@/types/seo';

const bmiCalculatorSEO: SEOPageContent = {
    id: 'bmi-calculator',
    
    intro: {
        what: 'BMI计算器是一款在线身体质量指数计算工具，根据身高体重计算BMI值，评估体重是否在健康范围内。',
        problem: '解决用户不了解自己的体重状况、不知道理想体重范围、需要健康体重管理的问题。',
        capability: '精确计算BMI值、提供健康评估、给出理想体重建议、支持公制和英制。',
        targetUser: '健身人士、减肥人群、健康管理师、医生、普通用户'
    },
    
    targetAudience: [
        '健身人士',
        '减肥人群',
        '健康管理师',
        '医生',
        '关注健康的用户'
    ],
    
    useCases: [
        '体重评估 - 了解当前体重是否健康',
        '减肥目标 - 设定合理的减肥目标',
        '健身追踪 - 监测健身期间的体重变化',
        '健康体检 - 作为健康指标参考',
        '营养咨询 - 辅助营养师进行评估'
    ],
    
    coreFeatures: [
        '精确计算BMI值',
        '体重状态评估（偏瘦/正常/偏胖/肥胖）',
        '理想体重范围建议',
        '支持公制/英制单位',
        '提供健康建议',
        '可视化结果展示'
    ],
    
    exampleIO: {
        input: '身高：175cm\n体重：70kg',
        output: 'BMI值：22.9\n体重状态：正常\n理想体重范围：56.7-76.6kg'
    },
    
    usageSteps: [
        '输入身高（厘米或英尺英寸）',
        '输入体重（公斤或磅）',
        '查看BMI值和健康评估结果'
    ],
    
    faq: [
        { question: 'BMI多少算正常？', answer: 'BMI在18.5-24.9之间为正常范围，低于18.5偏瘦，25-29.9偏胖，30以上为肥胖。' },
        { question: 'BMI准确吗？', answer: 'BMI是一个参考指标，不考虑肌肉量等因素。运动员可能BMI偏高但身体健康。' },
        { question: '如何改善BMI？', answer: '通过合理饮食和适量运动，逐步调整体重到健康范围内。' }
    ],
    
    relatedTools: ['age-calculator', 'date-calculator', 'percentage-calculator']
};

export default bmiCalculatorSEO;

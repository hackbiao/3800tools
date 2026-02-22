import type { SEOPageContent } from '@/types/seo';

const mbtiTestSEO: SEOPageContent = {
    id: 'mbti-test',
    
    intro: {
        what: 'MBTI人格测试是一款专业的性格测试工具，基于迈尔斯-布里格斯类型指标，帮助用户了解自己的人格类型。',
        problem: '解决对自我性格认知不足、职业规划迷茫、团队协作不畅、人际关系困扰等问题。',
        capability: '专业测试问卷、16种人格类型分析、详细性格报告、职业建议参考。',
        targetUser: '求职者、职场人士、学生、HR、心理咨询需求者'
    },
    
    targetAudience: [
        '求职者',
        '职场人士',
        '学生',
        'HR人员',
        '对心理学感兴趣的人'
    ],
    
    useCases: [
        '职业规划 - 了解适合的职业方向',
        '自我认知 - 深入了解自己的性格',
        '团队协作 - 理解不同性格的同事',
        '求职准备 - 面试中展现自我认知',
        '人际关系 - 改善与他人的沟通'
    ],
    
    coreFeatures: [
        '专业MBTI测试问卷',
        '16种人格类型分析',
        '详细的性格描述',
        '优缺点分析',
        '职业发展建议',
        '免费无限制使用'
    ],
    
    exampleIO: {
        input: '完成60道性格测试题目',
        output: '测试结果：INTJ（建筑师型）\n特点：独立思考、战略规划、追求完美\n适合职业：科学家、工程师、分析师'
    },
    
    usageSteps: [
        '开始测试，诚实回答每个问题',
        '完成所有测试题目',
        '查看详细的人格分析报告'
    ],
    
    faq: [
        { question: 'MBTI测试准确吗？', answer: 'MBTI是广泛使用的性格测试工具，但结果仅供参考，人的性格是多面的。' },
        { question: '测试结果会变吗？', answer: '人的性格可能随时间变化，建议间隔一段时间重新测试。' },
        { question: '测试需要多长时间？', answer: '通常需要10-15分钟完成全部测试题目。' }
    ],
    
    relatedTools: ['resume-generator', 'prompt-generator', 'mind-map']
};

export default mbtiTestSEO;

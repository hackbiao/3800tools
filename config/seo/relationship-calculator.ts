import type { SEOPageContent } from '@/types/seo';

const relationshipCalculatorSEO: SEOPageContent = {
    id: 'relationship-calculator',
    
    intro: {
        what: '亲戚关系计算器是一款在线亲戚称呼计算工具，可以帮助用户计算中国复杂的亲戚关系称呼。',
        problem: '解决走亲访友不知道如何称呼、复杂亲戚关系搞不清楚的问题。',
        capability: '支持多层级关系计算、覆盖常见亲戚关系、方言称呼参考。',
        targetUser: '所有人、年轻人、新婚夫妇、外地工作人士'
    },
    
    targetAudience: [
        '年轻人',
        '新婚夫妇',
        '外地工作人士',
        '学生',
        '所有人'
    ],
    
    useCases: [
        '走亲访友 - 过年拜访亲戚时确认称呼',
        '家庭聚会 - 大型家庭聚会时快速确认关系',
        '婚礼准备 - 确认各种亲戚的称呼',
        '教育孩子 - 教导孩子认识亲戚关系',
        '填写表格 - 确认亲属关系称谓'
    ],
    
    coreFeatures: [
        '多层级关系计算',
        '覆盖常见亲戚关系',
        '支持父系母系',
        '显示关系路径',
        '方言称呼参考',
        '简单易用'
    ],
    
    exampleIO: {
        input: '选择关系：爸爸的妈妈的弟弟',
        output: '称呼：舅公（舅爷爷）\n关系说明：爸爸的舅舅，即奶奶的弟弟'
    },
    
    usageSteps: [
        '选择起始关系人（如爸爸、妈妈）',
        '逐级选择关系（如姐姐、弟弟）',
        '查看计算出的称呼结果'
    ],
    
    faq: [
        { question: '各地称呼不一样怎么办？', answer: '工具提供常见称呼，部分地区可能有方言差异，仅供参考。' },
        { question: '支持多复杂的关系？', answer: '支持最多5层关系计算，覆盖绝大多数常见亲戚关系。' },
        { question: '配偶的亲戚怎么算？', answer: '支持从自己或配偶开始计算双方亲戚关系。' }
    ],
    
    relatedTools: ['age-calculator', 'date-calculator', 'chinese-converter']
};

export default relationshipCalculatorSEO;

import type { SEOPageContent } from '@/types/seo';

const unitConverterSEO: SEOPageContent = {
    id: 'unit-converter',
    
    intro: {
        what: '单位换算工具是一款在线单位转换服务，支持长度、重量、面积、体积、温度、数据存储等多种单位互转。',
        problem: '解决日常生活和工作中不同单位制之间的换算需求。',
        capability: '支持多种单位类型、精确换算、常用单位快捷转换。',
        targetUser: '学生、工程师、外贸从业者、海淘用户、普通用户'
    },
    
    targetAudience: [
        '学生',
        '工程师',
        '外贸从业者',
        '海淘用户',
        '科研人员'
    ],
    
    useCases: [
        '长度换算 - 英寸转厘米、英尺转米',
        '重量换算 - 磅转公斤、盎司转克',
        '温度换算 - 华氏度转摄氏度',
        '数据存储 - MB转GB、TB换算',
        '面积换算 - 平方英尺转平方米'
    ],
    
    coreFeatures: [
        '长度单位换算',
        '重量单位换算',
        '面积单位换算',
        '体积单位换算',
        '温度单位换算',
        '数据存储单位换算'
    ],
    
    exampleIO: {
        input: '长度：10英寸',
        output: '厘米：25.4cm\n毫米：254mm\n英尺：0.833ft'
    },
    
    usageSteps: [
        '选择单位类型',
        '输入数值和原单位',
        '查看转换结果'
    ],
    
    faq: [
        { question: '换算精度如何？', answer: '采用标准换算公式，精度可达小数点后多位。' },
        { question: '支持哪些单位类型？', answer: '支持长度、重量、面积、体积、温度、数据存储等常用单位类型。' },
        { question: '可以批量换算吗？', answer: '目前支持单个数值换算，自动显示所有相关单位的结果。' }
    ],
    
    relatedTools: ['number-base-converter', 'percentage-calculator', 'scientific-calculator']
};

export default unitConverterSEO;

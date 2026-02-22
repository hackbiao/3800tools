import type { SEOPageContent } from '@/types/seo';

const ipConverterSEO: SEOPageContent = {
    id: 'ip-converter',
    
    intro: {
        what: 'IP地址转换工具是一款在线IP地址格式转换服务，支持IP地址与十进制、二进制、十六进制格式互转。',
        problem: '解决不同系统使用不同IP格式、IP地址验证、网络编程中的IP格式转换需求。',
        capability: '支持IPv4地址转换、多种数值格式互转、IP有效性验证、批量转换。',
        targetUser: '网络工程师、开发者、运维人员、网络安全专家'
    },
    
    targetAudience: [
        '网络工程师',
        '后端开发者',
        '运维人员',
        '网络安全专家',
        '系统管理员'
    ],
    
    useCases: [
        '数据库存储 - 将IP转为整数存储节省空间',
        '日志分析 - 处理不同格式的IP数据',
        '网络编程 - 转换IP格式适配不同系统',
        '安全分析 - IP地址格式标准化',
        '配置管理 - 统一IP地址格式'
    ],
    
    coreFeatures: [
        'IP转十进制',
        'IP转二进制',
        'IP转十六进制',
        'IP地址有效性验证',
        '多种格式一键转换',
        '支持IPv4地址'
    ],
    
    exampleIO: {
        input: 'IP地址：192.168.1.1',
        output: '十进制：3232235777\n二进制：11000000.10101000.00000001.00000001\n十六进制：C0.A8.01.01'
    },
    
    usageSteps: [
        '输入IP地址或数值',
        '选择转换方向',
        '查看并复制转换结果'
    ],
    
    faq: [
        { question: '支持IPv6吗？', answer: '目前主要支持IPv4地址转换，IPv6支持即将上线。' },
        { question: '转换结果准确吗？', answer: '完全准确，采用标准算法进行格式转换。' },
        { question: '可以批量转换吗？', answer: '目前支持单次转换，批量功能开发中。' }
    ],
    
    relatedTools: ['ip-subnet-calculator', 'url-parser', 'port-lookup']
};

export default ipConverterSEO;

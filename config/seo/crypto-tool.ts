import type { SEOPageContent } from '@/types/seo';

const cryptoToolSEO: SEOPageContent = {
    id: 'crypto-tool',
    
    intro: {
        what: '加密解密工具是专业的数据安全保护工具，支持AES-256、DES、TripleDES、RC4、Blowfish等多种对称加密算法，满足不同安全级别的加密需求，保护敏感数据不被未授权访问。',
        problem: '用户在传输敏感数据、存储重要文件、保护隐私信息时缺乏有效的加密手段，传统加密软件操作复杂、安装繁琐，急需简单易用的在线加密解决方案。',
        capability: '支持AES-256军事级加密、文本和文件批量加密、密码强度检测、加密结果预览、多种编码格式输出、解密验证等功能，提供企业级的数据保护能力。',
        targetUser: '企业安全人员、开发者、隐私保护爱好者、法律工作者、医疗行业从业者',
        usageExperience: '界面简洁专业，采用模块化设计，用户可选择不同加密算法和密钥长度。支持拖拽文件加密，实时显示加密进度和强度分析。加密结果可以Base64、Hex等多种格式导出，使用体验流畅，操作逻辑清晰。',
        pros: [
            '支持6种主流加密算法，安全级别可选',
            'AES-256采用军用级别加密，安全性极高',
            '支持大文件加密，最大可达100MB',
            '本地加密，数据绝不上传服务器',
            '提供密码强度检测和建议'
        ],
        cons: [
            '非对称加密功能正在开发中',
            '超大文件加密可能影响浏览器性能',
            '暂不支持加密后的文件分割存储'
        ],
        recommendation: '日常使用推荐AES-128，平衡安全性和性能；敏感数据建议使用AES-256；快速临时加密可选择RC4；企业级应用建议TripleDES或Blowfish。',
        comparison: '相比其他在线加密工具，本工具算法更全面，支持文件和文本双重加密，无注册要求和文件大小限制。与VeraCrypt等专业软件相比，操作更简单，无需安装，适合快速加密需求。'
    },
    
    targetAudience: ["企业安全人员","开发者","隐私保护爱好者","法律工作者","医疗行业从业者"],
    
    useCases: [
        '敏感数据传输 - 加密邮件内容和附件',
        '文件存储保护 - 加密重要文档和个人隐私文件',
        'API密钥保护 - 安全存储和传输API凭证',
        '数据库备份 - 加密数据库备份文件',
        '代码安全 - 加密关键算法和商业逻辑代码'
    ],
    
    coreFeatures: [
        'AES-256/128/192位加密',
        'DES和TripleDES加密',
        'RC4流密码加密',
        'Blowfish加密算法',
        '密码强度检测',
        '多种编码格式输出(Base64、Hex)'
    ],
    
    exampleIO: {
        input: '原始文本：用户密码：user123！@#',
        output: 'AES-256加密：U2FsdGVkX1+K7Lq8mR5tXyV9nA2bP4sQ6wE3dF7gH1jK='
    },
    
    usageSteps: [
        '选择加密算法(AES/DES/RC4等)',
        '设置密码或密钥',
        '输入要加密的文本或拖拽文件',
        '点击加密并复制结果'
    ],
    
    faq: [
        { question: 'AES-256加密安全吗？', answer: 'AES-256是目前最安全的对称加密算法之一，被全球政府和企业广泛采用，暴力破解需要数万亿年。' },
        { question: '加密后的数据能恢复吗？', answer: '加密是可逆的，使用相同算法和密码可以解密恢复原始数据，但忘记密码将无法恢复。' },
        { question: '支持多大的文件加密？', answer: '建议不超过100MB，过大的文件可能导致浏览器内存不足，可考虑分块加密或使用桌面软件。' },
        { question: '密码有什么要求？', answer: '推荐使用12位以上包含大小写字母、数字和特殊字符的组合，避免使用常见词汇和个人信息。' }
    ],
    
    relatedTools: ["password-generator","uuid-generator","qrcode-generator","hash-calculator"]
};

export default cryptoToolSEO;

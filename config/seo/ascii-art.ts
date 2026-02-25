import type { SEOPageContent } from '@/types/seo';

const asciiArtSEO: SEOPageContent = {
    id: 'ascii-art',
    
    intro: {
        what: 'ASCII艺术字生成器是专业的创意文本设计工具，支持多种字体样式、字符密度调节、图片转ASCII、文字艺术化处理等功能，提供20+艺术字体、实时预览、自定义输出尺寸等特性，用于终端美化、代码注释、创意设计等场景。',
        problem: '开发者需要美化终端输出、代码注释、README文档，但缺乏专业的ASCII艺术生成工具。手动制作ASCII艺术耗时费力，效果不理想。现有工具字体单一，缺乏创意和个性化选项。',
        capability: '支持20+艺术字体、字符密度1-10级调节、图片转ASCII艺术、文字艺术化处理、实时预览效果、自定义输出尺寸(50-500字符宽)、批量文本处理、多种输出格式(文本/HTML)、字符集选择，提供完整的ASCII艺术创作方案。',
        targetUser: '开发者、系统管理员、设计师、内容创作者、编程爱好者、终端用户',
        usageExperience: '界面创意友好，顶部输入文字立即生成ASCII艺术，字体选择丰富多样。密度滑块实时调节字符密度，找到最佳视觉效果。图片转ASCII支持上传图片自动生成艺术效果，处理速度优化，大图片也能快速转换。输出支持直接复制或下载为文件。',
        pros: [
            '20+艺术字体，风格多样',
            '字符密度精确控制，效果精细',
            '支持图片转ASCII，创意无限',
            '实时预览，即时查看效果',
            '批量处理，提高创作效率'
        ],
        cons: [
            '超大图片转ASCII较慢',
            '某些复杂字体细节有限制',
            '彩色图片转ASCII为单色'
        ],
        recommendation: '终端美化推荐等宽字体；代码注释使用简洁字体；图片转换先调整尺寸；创意设计尝试不同密度组合。',
        comparison: '与ASCII Art Generator相比，字体更丰富，功能更全面。与终端figlet命令相比，界面更友好，实时预览。与在线工具相比，输出质量更高。'
    },
    
    targetAudience: ["内容创作者","编辑","学生","办公人员","程序员"],
    
    useCases: [
        '终端美化 - 生成ASCII艺术标识',
        '代码注释 - 创意化代码说明',
        'README设计 - 美化项目说明文档',
        'Banner制作 - 创建文本艺术横幅',
        '创意设计 - 制作艺术文本作品'
    ],
    
    coreFeatures: [
        '20+艺术字体支持',
        '字符密度精确调节',
        '图片转ASCII艺术',
        '实时预览效果',
        '批量文本处理',
        '自定义输出尺寸',
        '多种输出格式'
    ],
    
    exampleIO: {
        input: '文本：HELLO WORLD | 字体：Block | 密度：5级',
        output: 'ASCII艺术：20行×80字符 | 艺术字体 | 高质量输出'
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
    
    relatedTools: ["text-formatter","translate","text-statistics"]
};

export default asciiArtSEO;

import type { ToolType } from '../types/tools';
import { getExtendedToolSEO } from './seoUtils';

// 旧的SEO内容接口（与现有的使用兼容）
interface LegacySeoContent {
    intro: {
        what: string;
        problem: string;
        capability: string;
        targetUser: string;
        usageExperience: string;
        pros: string[];
        cons: string[];
        recommendation: string;
        comparison: string;
    };
    targetAudience: {
        primary: string[];
        secondary: string[];
    };
    useCases: {
        scenarios: string[];
        examples: string[];
    };
    features: {
        core: string[];
        additional: string[];
    };
    examples: {
        input: string;
        output: string;
        description: string;
    }[];
    steps: {
        title: string;
        description: string;
        tips?: string;
    }[];
    faqs: {
        q: string;
        a: string;
    }[];
    relatedTools: string[];
}

/**
 * 将扩展SEO配置转换为旧的格式，以兼容现有组件
 * 对于未配置扩展SEO的工具，生成默认内容
 */
export const getSEOConfig = (toolId: ToolType): LegacySeoContent => {
    const extendedSEO = getExtendedToolSEO(toolId);
    
    return {
        intro: {
            what: extendedSEO.what || '',
            problem: extendedSEO.problem || '',
            capability: extendedSEO.capability || '',
            targetUser: "开发人员、内容创作者、学生、办公人员等需要处理相关任务的用户", // 默认目标用户
            usageExperience: extendedSEO.usageExperience || '',
            pros: extendedSEO.pros || [],
            cons: extendedSEO.cons || [],
            recommendation: extendedSEO.recommendation || '',
            comparison: extendedSEO.comparison || ''
        },
        targetAudience: {
            primary: ["开发人员", "内容创作者", "学生"],
            secondary: ["研究人员", "办公人员", "个人用户"]
        },
        useCases: {
            scenarios: [
                "日常工作中处理相关任务",
                "提高工作效率",
                "简化操作流程"
            ],
            examples: [
                "批量处理数据",
                "格式转换",
                "内容优化"
            ]
        },
        features: {
            core: (extendedSEO.pros || []).slice(0, 3),
            additional: ["界面简洁", "操作便捷", "结果准确"]
        },
        examples: [
            {
                input: "示例输入",
                output: "示例输出",
                description: "简单示例说明"
            }
        ],
        steps: [
            {
                title: "准备内容",
                description: "准备需要处理的内容",
                tips: "确保内容格式正确"
            },
            {
                title: "执行操作",
                description: "使用工具功能处理内容",
                tips: "注意查看处理结果"
            },
            {
                title: "获取结果",
                description: "下载或复制处理结果",
                tips: "验证结果的准确性"
            }
        ],
        faqs: [
            {
                q: "如何使用此工具？",
                a: "按照页面指引，准备内容，执行操作，获取结果即可。"
            },
            {
                q: "工具是否免费？",
                a: "是的，此工具完全免费使用，无需注册和付费。"
            },
            {
                q: "数据处理是否安全？",
                a: "所有数据处理都在本地浏览器中完成，不会上传到服务器，确保数据安全。"
            }
        ],
        relatedTools: [] // 可以根据需要添加相关工具ID
    };
};
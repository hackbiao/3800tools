import { ToolType, ToolSEO } from '../types/tools';
import { ExtendedToolSEO, EXTENDED_TOOL_SEO } from './extendedSeoConfig';

// 扩展原始SEO接口，包含新增字段
export interface FullToolSEO extends ToolSEO {
    what?: string;
    problem?: string;
    capability?: string;
    usageExperience?: string;
    pros?: string[];
    cons?: string[];
    recommendation?: string;
    comparison?: string;
}

/**
 * 获取工具的完整SEO信息（包含扩展字段）
 */
export const getExtendedToolSEO = (toolId: ToolType): FullToolSEO => {
    const extendedSEO = EXTENDED_TOOL_SEO[toolId] || EXTENDED_TOOL_SEO['translate'];
    
    return {
        title: extendedSEO.title,
        description: extendedSEO.description,
        keywords: extendedSEO.keywords,
        what: extendedSEO.what,
        problem: extendedSEO.problem,
        capability: extendedSEO.capability,
        usageExperience: extendedSEO.usageExperience,
        pros: extendedSEO.pros,
        cons: extendedSEO.cons,
        recommendation: extendedSEO.recommendation,
        comparison: extendedSEO.comparison,
    };
};

/**
 * 获取工具的Meta标签信息（用于HTML头部）
 */
export const getToolMetaTags = (toolId: ToolType) => {
    const seo = getExtendedToolSEO(toolId);
    
    return {
        title: seo.title,
        description: seo.description,
        keywords: seo.keywords,
        ogTitle: seo.title,
        ogDescription: seo.description,
        ogType: 'website',
        ogSiteName: '三八零零 - 在线免费工具箱',
        twitterCard: 'summary_large_image',
        twitterTitle: seo.title,
        twitterDescription: seo.description,
        robots: 'index, follow',
    };
};

/**
 * 获取工具的结构化数据（JSON-LD格式）
 */
export const getToolStructuredData = (toolId: ToolType, toolPath: string) => {
    const seo = getExtendedToolSEO(toolId);
    
    return {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: seo.title,
        description: seo.description,
        url: `https://3800.fans${toolPath}`,
        applicationCategory: 'ProductivityApplication',
        operatingSystem: 'Any',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'CNY'
        },
        featureList: [
            seo.what,
            seo.problem,
            seo.capability
        ].filter(Boolean),
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            ratingCount: '42'
        }
    };
};
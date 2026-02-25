import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getToolByPath, TOOL_CATEGORIES, getToolById, getExtendedToolSEO, getToolMetaTags } from '../config/tools';
import { getSEOConfig } from '../config/seoAdapter';
import MetaTags from './MetaTags';
import TopNavBar from './TopNavBar';
import JsonLdSchema from './seo/JsonLdSchema';
import ToolIntro from './seo/ToolIntro';
import TargetAudience from './seo/TargetAudience';
import UseCases from './seo/UseCases';
import CoreFeatures from './seo/CoreFeatures';
import ExampleIO from './seo/ExampleIO';
import UsageSteps from './seo/UsageSteps';
import FAQSection from './seo/FAQSection';
import SEOEnhancement from './seo/SEOEnhancement';

interface ToolLayoutProps {
    children: React.ReactNode;
}

const ToolLayout: React.FC<ToolLayoutProps> = ({ children }) => {
    const { toolPath } = useParams<{ toolPath: string }>();
    const tool = getToolByPath(`/${toolPath}`);
    const extendedSeo = tool ? getExtendedToolSEO(tool.id) : null;
    const seoContent = tool ? getSEOConfig(tool.id) : null;
    
    // 获取Meta标签信息
    const metaTags = tool ? getToolMetaTags(tool.id) : null;

    const currentCategory = tool
        ? TOOL_CATEGORIES.find((cat) => cat.tools.some((t) => t.id === tool.id))
        : null;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 overflow-x-hidden">
            <TopNavBar />

            {tool && metaTags && (
                <MetaTags
                    title={metaTags.title}
                    description={metaTags.description}
                    keywords={metaTags.keywords}
                />
            )}
            
            {tool && seoContent && (
                <JsonLdSchema
                    toolName={tool.name}
                    toolDescription={seoContent.intro.what}
                    toolId={tool.id}
                />
            )}

            <main className="pt-24 pb-8">
                {tool && currentCategory && (
                    <div className="bg-white/60 dark:bg-gray-800/30 border-b border-gray-200 dark:border-gray-700">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
                            <nav className="flex items-center gap-2 text-sm">
                                <Link
                                    to="/"
                                    className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                                >
                                    首页
                                </Link>
                                <span className="material-symbols-outlined text-gray-300 dark:text-gray-600 text-sm">
                                    chevron_right
                                </span>
                                <Link
                                    to={`/category/${currentCategory.id}`}
                                    className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                                >
                                    {currentCategory.name}
                                </Link>
                                <span className="material-symbols-outlined text-gray-300 dark:text-gray-600 text-sm">
                                    chevron_right
                                </span>
                                <span className="text-gray-900 dark:text-white font-medium">
                                    {tool.name}
                                </span>
                            </nav>
                        </div>
                    </div>
                )}

                <div className="w-full">
                    {children}
                </div>

                {seoContent && (
                    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
                        {/* 根据是否有增强内容来渲染不同的工具介绍 */}
                        {seoContent.intro.usageExperience ? (
                            // 原创增强内容直接内联渲染，确保SEO可爬取
                            <div className="space-y-6">
                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                        {seoContent.intro.what.split('是')[0]}是什么？
                                    </h2>
                                    <div className="prose prose-gray dark:prose-invert max-w-none">
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                            {seoContent.intro.what}
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                            <strong className="text-gray-900 dark:text-white">解决问题：</strong>{seoContent.intro.problem}
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                            <strong className="text-gray-900 dark:text-white">核心能力：</strong>{seoContent.intro.capability}
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                            <strong className="text-gray-900 dark:text-white">适用人群：</strong>{seoContent.intro.targetUser}
                                        </p>
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                        使用心得与评价
                                    </h2>
                                    <div className="prose prose-gray dark:prose-invert max-w-none">
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                            {seoContent.intro.usageExperience}
                                        </p>
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                        工具优缺点分析
                                    </h2>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-3 flex items-center gap-2">
                                                <span className="material-symbols-outlined">thumb_up</span>
                                                优点
                                            </h3>
                                            <ul className="space-y-2">
                                                {seoContent.intro.pros?.map((pro, index) => (
                                                    <li key={index} className="flex items-start gap-2">
                                                        <span className="material-symbols-outlined text-green-500 text-sm mt-0.5">check_circle</span>
                                                        <span className="text-gray-600 dark:text-gray-300">{pro}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-3 flex items-center gap-2">
                                                <span className="material-symbols-outlined">thumb_down</span>
                                                局限性
                                            </h3>
                                            <ul className="space-y-2">
                                                {seoContent.intro.cons?.map((con, index) => (
                                                    <li key={index} className="flex items-start gap-2">
                                                        <span className="material-symbols-outlined text-red-500 text-sm mt-0.5">cancel</span>
                                                        <span className="text-gray-600 dark:text-gray-300">{con}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                        推荐理由
                                    </h2>
                                    <div className="prose prose-gray dark:prose-invert max-w-none">
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                            {seoContent.intro.recommendation}
                                        </p>
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                        与同类工具对比
                                    </h2>
                                    <div className="prose prose-gray dark:prose-invert max-w-none">
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                            {seoContent.intro.comparison}
                                        </p>
                                    </div>
                                </section>
                            </div>
                        ) : (
                            // 标准内容使用现有组件
                            <div className="space-y-10">
                                <ToolIntro intro={seoContent.intro} />
                                <TargetAudience audience={seoContent.targetAudience.primary} />
                                <UseCases useCases={seoContent.useCases.scenarios} />
                                <CoreFeatures features={seoContent.features.core} />
                                <ExampleIO exampleIO={seoContent.examples[0]} />
                                <UsageSteps steps={seoContent.steps.map(step => step.title + ': ' + step.description + (step.tips ? ' (' + step.tips + ')' : ''))} />
                            </div>
                        )}
                        
                        <FAQSection faq={seoContent.faqs.map(f => ({ question: f.q, answer: f.a }))} />
                        
                        {seoContent.relatedTools.length > 0 && (
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    相关工具推荐
                                </h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                                    {seoContent.relatedTools.map((toolId) => {
                                        const relatedTool = getToolById(toolId as any);
                                        if (!relatedTool) return null;
                                        return (
                                            <Link
                                                key={relatedTool.id}
                                                to={relatedTool.path}
                                                className="group flex items-center gap-2 p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary/30 hover:shadow-md transition-all"
                                            >
                                                <span className="material-symbols-outlined text-primary text-lg">
                                                    {relatedTool.icon}
                                                </span>
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate group-hover:text-primary transition-colors">
                                                    {relatedTool.name}
                                                </span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </section>
                )}

                {tool && currentCategory && !seoContent && (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                            相关工具
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                            {currentCategory.tools
                                .filter((t) => t.id !== tool.id)
                                .slice(0, 5)
                                .map((relatedTool) => (
                                    <Link
                                        key={relatedTool.id}
                                        to={relatedTool.path}
                                        className="flex items-center gap-2 p-2.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary hover:shadow-md transition-all"
                                    >
                                        <span className="material-symbols-outlined text-primary text-lg">
                                            {relatedTool.icon}
                                        </span>
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                                            {relatedTool.name}
                                        </span>
                                    </Link>
                                ))}
                        </div>
                    </div>
                )}
            </main>

            <SEOEnhancement />
                
            <footer className="border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <p>© {new Date().getFullYear()} 三八零零 - 在线免费工具箱</p>
                        <div className="flex items-center gap-4">
                            <a href="/sitemap.xml" className="text-xs hover:text-blue-600 dark:hover:text-blue-400">网站地图</a>
                            <a href="/rss.xml" className="text-xs hover:text-blue-600 dark:hover:text-blue-400">RSS订阅</a>
                            <span className="text-xs text-gray-400 dark:text-gray-500">数据安全，本地处理</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ToolLayout;
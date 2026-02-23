import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getToolByPath, TOOL_CATEGORIES, getToolById } from '../config/tools';
import { getSEOConfig } from '../config/seo';
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

interface ToolLayoutProps {
    children: React.ReactNode;
}

const ToolLayout: React.FC<ToolLayoutProps> = ({ children }) => {
    const { toolPath } = useParams<{ toolPath: string }>();
    const tool = getToolByPath(`/${toolPath}`);
    const seoContent = tool ? getSEOConfig(tool.id) : null;

    const currentCategory = tool
        ? TOOL_CATEGORIES.find((cat) => cat.tools.some((t) => t.id === tool.id))
        : null;
    
    const relatedToolObjects = seoContent?.relatedTools
        .map(id => getToolById(id as any))
        .filter(Boolean) || [];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 overflow-x-hidden">
            <TopNavBar />

            {tool && (
                <MetaTags
                    title={`${tool.name} - 在线免费工具 | 三八零零`}
                    description={tool.description}
                    keywords={tool.keywords.join(',')}
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
                        <ToolIntro intro={seoContent.intro} />
                        
                        <TargetAudience audience={seoContent.targetAudience} />
                        
                        <UseCases useCases={seoContent.useCases} />
                        
                        <CoreFeatures features={seoContent.coreFeatures} />
                        
                        <ExampleIO exampleIO={seoContent.exampleIO} />
                        
                        <UsageSteps steps={seoContent.usageSteps} />
                        
                        <FAQSection faq={seoContent.faq} />
                        
                        {relatedToolObjects.length > 0 && (
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    相关工具推荐
                                </h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                                    {relatedToolObjects.map((relatedTool) => (
                                        <Link
                                            key={relatedTool!.id}
                                            to={relatedTool!.path}
                                            className="group flex items-center gap-2 p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary/30 hover:shadow-md transition-all"
                                        >
                                            <span className="material-symbols-outlined text-primary text-lg">
                                                {relatedTool!.icon}
                                            </span>
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate group-hover:text-primary transition-colors">
                                                {relatedTool!.name}
                                            </span>
                                        </Link>
                                    ))}
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

            <footer className="border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <p>© {new Date().getFullYear()} 三八零零 - 在线免费工具箱</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">数据安全，本地处理</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ToolLayout;

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getToolByPath, TOOL_CATEGORIES } from '../config/tools';
import MetaTags from './MetaTags';
import TopNavBar from './TopNavBar';

interface ToolLayoutProps {
    children: React.ReactNode;
}

const ToolLayout: React.FC<ToolLayoutProps> = ({ children }) => {
    const { toolPath } = useParams<{ toolPath: string }>();
    const tool = getToolByPath(`/${toolPath}`);

    const currentCategory = tool
        ? TOOL_CATEGORIES.find((cat) => cat.tools.some((t) => t.id === tool.id))
        : null;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 overflow-x-hidden">
            <TopNavBar />

            {tool && (
                <MetaTags
                    title={`${tool.name} - 叁八零零在线工具`}
                    description={tool.description}
                    keywords={tool.keywords.join(',')}
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

                {tool && currentCategory && (
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
                        <p>© {new Date().getFullYear()} 叁八零零 - 在线免费工具箱</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">数据安全，本地处理</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ToolLayout;

import React from 'react';
import { Link } from 'react-router-dom';
import type { Tool, ToolCategory } from '@/types/tools';

interface RelatedToolsProps {
    tools: (Tool | undefined)[];
    currentCategory?: ToolCategory | null;
}

const RelatedTools: React.FC<RelatedToolsProps> = ({ tools, currentCategory }) => {
    const validTools = tools.filter(Boolean) as Tool[];
    
    if (validTools.length === 0) return null;

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                相关工具推荐
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {validTools.map((tool) => (
                    <Link
                        key={tool.id}
                        to={tool.path}
                        className="group flex items-center gap-2 p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary/30 hover:shadow-md transition-all"
                    >
                        <span className="material-symbols-outlined text-primary text-lg">
                            {tool.icon}
                        </span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate group-hover:text-primary transition-colors">
                            {tool.name}
                        </span>
                    </Link>
                ))}
            </div>
            
            {currentCategory && (
                <div className="mt-4 text-center">
                    <Link
                        to={`/category/${currentCategory.id}`}
                        className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                        查看更多{currentCategory.name}
                        <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default RelatedTools;

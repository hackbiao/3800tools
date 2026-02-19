import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TOOL_CATEGORIES, ALL_TOOLS } from '../config/tools';
import MetaTags from './MetaTags';
import type { ToolCategory, Tool } from '../types/tools';

const gradientColors: Record<string, string> = {
    text: 'from-blue-500 to-cyan-400',
    image: 'from-purple-500 to-pink-400',
    data: 'from-green-500 to-emerald-400',
    media: 'from-orange-500 to-amber-400',
    ai: 'from-rose-500 to-red-400',
};

const CategoryPage: React.FC = () => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const [hoveredTool, setHoveredTool] = useState<string | null>(null);

    if (categoryId === 'all') {
        return (
            <>
                <MetaTags
                    title="全部分类 - 叁八零零在线工具箱"
                    description="浏览叁八零零在线工具箱的所有工具分类，包括文本工具、图片工具、数据工具、媒体工具、AI工具等24+种实用工具。"
                    keywords="在线工具分类,免费工具,文本工具,图片工具,数据工具,媒体工具,AI工具"
                />
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                            全部分类
                        </h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {TOOL_CATEGORIES.map((category) => (
                                <CategoryCard key={category.id} category={category} />
                            ))}
                        </div>
                        <div className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                全部工具
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {ALL_TOOLS.map((tool) => (
                                    <ToolCard
                                        key={tool.id}
                                        tool={tool}
                                        isHovered={hoveredTool === tool.id}
                                        onHover={setHoveredTool}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    const category = TOOL_CATEGORIES.find(c => c.id === categoryId);

    if (!category) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">分类不存在</h1>
                    <Link to="/category/all" className="text-primary hover:underline">查看全部分类</Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <MetaTags
                title={`${category.name} - 叁八零零在线工具箱`}
                description={`${category.description}，包括${category.tools.map(t => t.name).join('、')}等多种实用工具。`}
                keywords={`${category.name},${category.tools.map(t => t.name).join(',')},在线工具,免费工具`}
            />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex items-center gap-4 mb-8">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradientColors[category.id]} flex items-center justify-center shadow-lg`}>
                            <span className="material-symbols-outlined text-white text-2xl">
                                {category.icon}
                            </span>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                {category.name}
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400">
                                {category.description}
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {category.tools.map((tool) => (
                            <ToolCard
                                key={tool.id}
                                tool={tool}
                                isHovered={hoveredTool === tool.id}
                                onHover={setHoveredTool}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

const CategoryCard: React.FC<{ category: ToolCategory }> = ({ category }) => {
    return (
        <Link
            to={`/category/${category.id}`}
            className="group block p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-primary/30 transition-all"
        >
            <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradientColors[category.id]} flex items-center justify-center`}>
                    <span className="material-symbols-outlined text-white text-xl">
                        {category.icon}
                    </span>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                        {category.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {category.tools.length} 个工具
                    </p>
                </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {category.description}
            </p>
            <div className="flex flex-wrap gap-2">
                {category.tools.slice(0, 3).map((tool) => (
                    <span key={tool.id} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-400">
                        {tool.name}
                    </span>
                ))}
                {category.tools.length > 3 && (
                    <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-500 dark:text-gray-400">
                        +{category.tools.length - 3}
                    </span>
                )}
            </div>
        </Link>
    );
};

interface ToolCardProps {
    tool: Tool;
    isHovered: boolean;
    onHover: (id: string | null) => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, isHovered, onHover }) => {
    const category = TOOL_CATEGORIES.find(c => c.tools.some(t => t.id === tool.id));
    const gradientColor = category ? gradientColors[category.id] : 'from-blue-500 to-cyan-400';

    return (
        <Link
            to={tool.path}
            onMouseEnter={() => onHover(tool.id)}
            onMouseLeave={() => onHover(null)}
            className="group block p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-primary/30 transition-all"
        >
            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradientColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <span className="material-symbols-outlined text-white text-lg">
                        {tool.icon}
                    </span>
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors truncate">
                        {tool.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {tool.description}
                    </p>
                </div>
                <span className={`material-symbols-outlined text-gray-300 dark:text-gray-600 text-lg transition-all ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    arrow_forward
                </span>
            </div>
        </Link>
    );
};

export default CategoryPage;

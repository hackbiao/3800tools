import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { TOOL_CATEGORIES } from '../config/tools';
import MetaTags from './MetaTags';
import type { ToolCategory, Tool } from '../types/tools';

const getAssetUrl = (path: string) => {
    const base = import.meta.env.BASE_URL || '/';
    return `${base}${path}`.replace(/\/+/g, '/');
};

const HomePage: React.FC = () => {
    const [hoveredTool, setHoveredTool] = useState<string | null>(null);

const gradientColors: Record<string, string> = {
    calculator: 'from-blue-500 to-cyan-400',
    utility: 'from-purple-500 to-pink-400',
    text: 'from-green-500 to-emerald-400',
    image: 'from-orange-500 to-amber-400',
    data: 'from-teal-500 to-cyan-400',
    media: 'from-pink-500 to-rose-400',
    ai: 'from-violet-500 to-purple-400',
    network: 'from-indigo-500 to-blue-400',
    dev: 'from-rose-500 to-red-400',
};

    const categoryBgColors = [
        'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30',
        'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30',
        'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30',
        'bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30',
        'bg-gradient-to-br from-rose-50 to-red-50 dark:from-rose-950/30 dark:to-red-950/30',
    ];

    return (
        <>
            <MetaTags
                title="叁八零零 - 在线免费工具箱 | 文本翻译、图片处理、代码高亮、PDF转换"
                description="叁八零零是一个免费的在线工具箱，提供在线翻译、图片格式转换、JSON格式化、代码高亮、思维导图、PDF转换等24+种实用工具，所有工具在浏览器本地运行，数据安全有保障，无需注册即可使用。"
                keywords="在线工具,免费工具,翻译工具,图片处理,JSON格式化,代码高亮,思维导图,PDF转换,文本工具,图片编辑,表格转换,简历生成"
            />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
                <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-transparent pb-6">
                    <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2"></div>

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="text-center">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                                <span className="material-symbols-outlined text-base">auto_awesome</span>
                                免费在线工具，无需注册
                            </div>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4 leading-tight">
                                <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                                    叁八零零
                                </span>
                                <span className="hidden sm:inline"> · </span>
                                <span className="sm:block">在线免费工具箱</span>
                            </h1>
                            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-6">
                                一站式在线工具平台，提供文本处理、图片编辑、数据转换等
                                <span className="text-primary font-semibold"> 24+</span> 种实用工具
                            </p>
                            <div className="flex flex-wrap justify-center gap-3">
                                <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="material-symbols-outlined text-green-500 text-base">check_circle</span>
                                    完全免费
                                </div>
                                <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="material-symbols-outlined text-green-500 text-base">check_circle</span>
                                    无需注册
                                </div>
                                <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="material-symbols-outlined text-green-500 text-base">check_circle</span>
                                    本地处理
                                </div>
                                <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="material-symbols-outlined text-green-500 text-base">check_circle</span>
                                    数据安全
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    {TOOL_CATEGORIES.map((category, categoryIndex) => (
                        <CategorySection
                            key={category.id}
                            category={category}
                            categoryIndex={categoryIndex}
                            gradientColors={gradientColors}
                            categoryBgColors={categoryBgColors}
                            hoveredTool={hoveredTool}
                            setHoveredTool={setHoveredTool}
                        />
                    ))}
                </section>

                <footer className="border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex flex-col items-center justify-center gap-3">
                            <div className="flex items-center gap-2">
                                <img
                                    src={getAssetUrl('logo.png')}
                                    alt="叁八零零"
                                    className="w-6 h-6 rounded-lg"
                                />
                                <span className="text-gray-600 dark:text-gray-400 text-sm">
                                    © {new Date().getFullYear()} 叁八零零 - 在线免费工具箱
                                </span>
                            </div>
                            <p className="text-xs text-gray-400 dark:text-gray-500">
                                数据安全，本地处理 | 无需注册，完全免费
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
};

interface CategorySectionProps {
    category: ToolCategory;
    categoryIndex: number;
    gradientColors: Record<string, string>;
    categoryBgColors: string[];
    hoveredTool: string | null;
    setHoveredTool: (id: string | null) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({
    category,
    categoryIndex,
    gradientColors,
    categoryBgColors,
    hoveredTool,
    setHoveredTool,
}) => {
    const categoryGradient = gradientColors[category.id] || 'from-blue-500 to-cyan-400';
    return (
        <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${categoryGradient} flex items-center justify-center shadow-lg`}>
                        <span className="material-symbols-outlined text-white text-xl">
                            {category.icon}
                        </span>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            {category.name}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {category.description}
                        </p>
                    </div>
                </div>
                <Link
                    to={`/category/${category.id}`}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
                >
                    查看全部
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
            </div>

            <div className={`rounded-2xl p-4 ${categoryBgColors[categoryIndex % categoryBgColors.length]}`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {category.tools.slice(0, 6).map((tool) => (
                        <ToolCard
                            key={tool.id}
                            tool={tool}
                            isHovered={hoveredTool === tool.id}
                            onHover={setHoveredTool}
                            gradientColor={categoryGradient}
                        />
                    ))}
                </div>
                {category.tools.length > 6 && (
                    <div className="mt-3 text-center">
                        <Link
                            to={`/category/${category.id}`}
                            className="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
                        >
                            还有 {category.tools.length - 6} 个工具
                            <span className="material-symbols-outlined text-base">expand_more</span>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

interface ToolCardProps {
    tool: Tool;
    isHovered: boolean;
    onHover: (id: string | null) => void;
    gradientColor: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, isHovered, onHover, gradientColor }) => {
    return (
        <Link
            to={tool.path}
            onMouseEnter={() => onHover(tool.id)}
            onMouseLeave={() => onHover(null)}
            className={`
                group relative block p-4 rounded-xl
                bg-white dark:bg-gray-800/50
                border border-gray-200 dark:border-gray-700/50
                shadow-sm hover:shadow-lg
                transition-all duration-200 ease-out
                ${isHovered ? 'scale-[1.01] border-primary/30' : 'scale-100'}
            `}
        >
            <div className="flex items-center gap-3">
                <div className={`
                    w-10 h-10 rounded-lg flex items-center justify-center
                    bg-gradient-to-br ${gradientColor}
                    shadow group-hover:shadow-lg
                    transition-all duration-200
                    ${isHovered ? 'scale-110' : 'scale-100'}
                `}>
                    <span className="material-symbols-outlined text-white text-xl">
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
                <span className={`
                    material-symbols-outlined text-gray-300 dark:text-gray-600 text-lg
                    transition-all duration-200
                    ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-1'}
                `}>
                    arrow_forward
                </span>
            </div>
        </Link>
    );
};

export default HomePage;

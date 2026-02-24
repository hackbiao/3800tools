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
                title="在线工具箱 - 免费工具大全 | 三八零零工具网 (文本, 图片, PDF, AI)"
                description="三八零零是一个功能齐全的免费在线工具箱，提供在线翻译、图片处理、JSON格式化、代码高亮、思维导图、PDF转换、AI助手等120+种实用工具。所有工具本地运行，安全便捷，无需注册即可使用。"
                keywords="在线工具箱,免费工具大全,在线翻译,图片处理,JSON格式化,代码高亮,思维导图,PDF转换,AI工具,文本处理,图片转换"
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
                                    三八零零
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

                {/* AI工具导航指南 - SEO模块 */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                            <span className="material-symbols-outlined text-3xl text-primary">auto_stories</span>
                            AI工具导航指南
                        </h2>
                        <div className="prose prose-gray dark:prose-invert max-w-none space-y-4">
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                                <strong>AI工具是什么</strong>：AI（人工智能）工具是利用机器学习、深度学习、自然语言处理等技术开发的智能应用程序，能够模拟人类的认知能力，实现数据分析、内容创作、图像处理、语音识别等复杂任务。这些工具通过学习大量数据，不断提升自身的准确性和效率，为各行业带来革命性变化。
                            </p>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                                <strong>AI工具分类逻辑</strong>：按照功能和应用场景，常见AI工具可分为文本处理类（写作助手、翻译工具、文本摘要）、图像处理类（图像生成、编辑、识别）、数据分析类（数据可视化、预测分析）、智能交互类（聊天机器人、语音助手）等。了解这些分类有助于根据具体需求选择合适的AI工具，提高工作效率。
                            </p>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                                <strong>适用人群</strong>：AI工具适用于广泛人群。内容创作者可利用写作助手提高创作效率；设计师可通过图像生成工具快速获取创意灵感；数据分析师能借助自动化分析工具节省时间；学生和研究人员可使用AI辅助学习和研究；企业决策者可通过AI洞察数据做出更明智决策。
                            </p>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                                <strong>使用价值</strong>：AI工具的核心价值在于提升效率、降低成本、增强创造力和辅助决策。它们能够自动化重复性任务，让人类专注于更有价值的工作；通过深度分析提供数据支持；提供个性化体验，满足多样化需求；帮助用户突破技能限制，实现原本难以完成的任务。
                            </p>
                        </div>
                    </div>
                </section>

                {/* AI工具应用场景模块 */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-2xl border border-blue-200 dark:border-blue-800 p-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                            <span className="material-symbols-outlined text-3xl text-blue-600">apps</span>
                            AI工具应用场景
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-5">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="material-symbols-outlined text-blue-600 text-xl">edit</span>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">内容创作</h3>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    AI写作助手可生成博客、社交媒体内容，提高创作效率，优化语言表达，解决创作瓶颈问题。
                                </p>
                            </div>
                            <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-5">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="material-symbols-outlined text-green-600 text-xl">code</span>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">编程开发</h3>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    AI代码助手可自动生成代码片段，调试程序，优化代码结构，加速开发流程，提高编程效率。
                                </p>
                            </div>
                            <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-5">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="material-symbols-outlined text-purple-600 text-xl">work</span>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">办公自动化</h3>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    AI工具能自动化文档处理、邮件分类、数据分析，简化日常办公流程，提高工作效率。
                                </p>
                            </div>
                            <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-5">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="material-symbols-outlined text-orange-600 text-xl">brush</span>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">设计</h3>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    AI设计工具可生成图像、优化排版，提供设计灵感，简化专业设计流程，降低设计门槛。
                                </p>
                            </div>
                            <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-5">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="material-symbols-outlined text-red-600 text-xl">campaign</span>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">营销</h3>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    AI营销工具分析用户行为，优化广告投放，自动生成营销内容，提高转化率和营销效果。
                                </p>
                            </div>
                            <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-5">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="material-symbols-outlined text-teal-600 text-xl">school</span>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">教育培训</h3>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    AI教育工具提供个性化学习体验，智能评估学习进度，推荐学习内容，提升学习效果。
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* AI工具选择指南模块 */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                            <span className="material-symbols-outlined text-3xl text-green-600">lightbulb</span>
                            AI工具选择指南
                        </h2>
                        <div className="prose prose-gray dark:prose-invert max-w-none space-y-4">
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                                <strong>如何选择适合自己的AI工具</strong>：首先明确自己的需求和目标，了解工具的核心功能和适用场景。考虑工具的易用性和学习曲线，评估是否有足够的文档和支持。注意数据隐私和安全政策，确保符合个人或企业的安全标准。建议先使用免费版或试用版，验证工具效果后再做长期投入决策。
                            </p>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">免费 vs 付费</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        免费工具通常提供基本功能，适合轻度使用者和初次体验。付费工具往往功能更全面，性能更稳定，提供高级功能和优先支持，适合专业用户和企业场景。根据使用频率和需求深度来平衡成本效益。
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">国内 vs 国外</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        国内工具更符合中文语言习惯和本地化需求，访问速度快，符合国内数据合规要求。国外工具通常技术更先进，功能更丰富，但可能存在网络延迟和数据合规问题，需要根据实际情况权衡选择。
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                                <strong>新手推荐策略</strong>：刚开始使用AI工具的用户建议从界面友好、功能直观的工具入手。先专注于解决具体问题，不要尝试一次性掌握多种工具。充分利用教程模板和社区资源，逐步提升技能。从免费工具开始实践，熟悉基本功能和原理后，再根据需求升级到更专业的工具。
                            </p>
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

                {/* SEO增强链接 - 简化版 */}
                <section className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900/50 dark:to-blue-900/20 border-t border-gray-200 dark:border-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="text-center mb-4">
                            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                                探索更多AI工具
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                发现适合您的AI工具解决方案，提升工作效率
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-3">
                            <Link
                                to="/ranking"
                                className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-primary/30 hover:shadow-md transition-all"
                            >
                                <span className="material-symbols-outlined text-sm align-middle mr-1">emoji_events</span>
                                工具排行榜
                            </Link>
                            <Link
                                to="/topics"
                                className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-primary/30 hover:shadow-md transition-all"
                            >
                                <span className="material-symbols-outlined text-sm align-middle mr-1">topic</span>
                                专题推荐
                            </Link>
                            <Link
                                to="/category/ai"
                                className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-primary/30 hover:shadow-md transition-all"
                            >
                                <span className="material-symbols-outlined text-sm align-middle mr-1">smart_toy</span>
                                AI工具
                            </Link>
                        </div>
                    </div>
                </section>

                <footer className="border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex flex-col items-center justify-center gap-3">
                            <div className="flex items-center gap-2">
                                <img
                                    src={getAssetUrl('logo.png')}
                                    alt="三八零零"
                                    className="w-6 h-6 rounded-lg"
                                />
                                <span className="text-gray-600 dark:text-gray-400 text-sm">
                                    © {new Date().getFullYear()} 三八零零 - 在线免费工具箱
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

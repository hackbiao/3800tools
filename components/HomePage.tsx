import React, { useState, useCallback, useEffect } from 'react';
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
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
    const [visibleItems, setVisibleItems] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const gradientColors: Record<string, string> = {
        calculator: 'from-blue-600 to-cyan-500',
        utility: 'from-purple-600 to-pink-500',
        text: 'from-green-600 to-emerald-500',
        image: 'from-orange-600 to-amber-500',
        data: 'from-teal-600 to-cyan-500',
        media: 'from-pink-600 to-rose-500',
        ai: 'from-violet-600 to-purple-500',
        network: 'from-indigo-600 to-blue-500',
        dev: 'from-rose-600 to-red-500',
    };

    const featuredTools = [
        { id: 'translate', name: '在线翻译', icon: 'translate', color: 'from-blue-600 to-cyan-500', desc: '支持多语言互译' },
        { id: 'image-converter', name: '图片工具', icon: 'image', color: 'from-purple-600 to-pink-500', desc: '格式转换与编辑' },
        { id: 'json-formatter', name: 'JSON工具', icon: 'code', color: 'from-green-600 to-emerald-500', desc: '格式化与验证' },
        { id: 'pdf-tools', name: 'PDF工具', icon: 'picture_as_pdf', color: 'from-orange-600 to-amber-500', desc: 'PDF处理与转换' },
    ];

    const stats = [
        { number: '24+', label: '实用工具', icon: 'build' },
        { number: '100K+', label: '用户使用', icon: 'people' },
        { number: '0', label: '广告干扰', icon: 'block' },
        { number: '100%', label: '本地处理', icon: 'security' },
    ];

    return (
        <>
            <MetaTags
                title="在线工具箱 - 免费工具大全 | 三八零零工具网 (文本, 图片, PDF, AI)"
                description="三八零零是一个功能齐全的免费在线工具箱，提供在线翻译、图片处理、JSON格式化、代码高亮、思维导图、PDF转换、AI助手等120+种实用工具。所有工具本地运行，安全便捷，无需注册即可使用。"
                keywords="在线工具箱,免费工具大全,在线翻译,图片处理,JSON格式化,代码高亮,思维导图,PDF转换,AI工具,文本处理,图片转换"
            />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20 pt-24">
                {/* Animated Background */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
                </div>

                {/* Hero Section */}
                <section className="relative overflow-hidden">
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
                        <div className="text-center lg:text-left lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium mb-4 shadow-lg">
                                        <span className="material-symbols-outlined text-base animate-pulse">auto_awesome</span>
                                        免费在线工具，无需注册
                                    </div>
                                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
                                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                                            三八零零
                                        </span>
                                        <br />
                                        <span className="text-gray-900 dark:text-white text-3xl sm:text-4xl lg:text-5xl">
                                            在线工具箱
                                        </span>
                                    </h1>
                                    <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                                        一站式在线工具平台，提供
                                        <span className="text-blue-600 dark:text-blue-400 font-bold"> 24+</span> 种实用工具
                                        <br />
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            完全免费 · 无需注册 · 本地处理 · 数据安全
                                        </span>
                                    </p>
                                </div>

                                {/* Search Bar */}
                                <div className="relative max-w-md mx-auto lg:mx-0">
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                                            search
                                        </span>
                                        <input
                                            type="text"
                                            placeholder="搜索工具..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur border border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-lg"
                                        />
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                                    <Link
                                        to="/translate"
                                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                                    >
                                        <span className="material-symbols-outlined text-lg align-middle mr-2">translate</span>
                                        开始翻译
                                    </Link>
                                    <Link
                                        to="/image-converter"
                                        className="px-6 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                                    >
                                        <span className="material-symbols-outlined text-lg align-middle mr-2">image</span>
                                        图片工具
                                    </Link>
                                </div>
                            </div>

                            {/* Hero Visual */}
                            <div className="relative mt-12 lg:mt-0">
                                <div className="relative grid grid-cols-2 gap-4 lg:gap-6">
                                    {featuredTools.map((tool, index) => (
                                        <div
                                            key={tool.id}
                                            className="group relative p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur border border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
                                            style={{
                                                animation: `slideUp 0.6s ease-out ${index * 0.1}s both`
                                            }}
                                        >
                                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                                <span className="material-symbols-outlined text-white text-xl">
                                                    {tool.icon}
                                                </span>
                                            </div>
                                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{tool.name}</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{tool.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Stats Bar */}
                        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="text-center p-6 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur border border-gray-200 dark:border-gray-700"
                                    style={{
                                        animation: `slideUp 0.6s ease-out ${index * 0.1 + 0.3}s both`
                                    }}
                                >
                                    <span className="material-symbols-outlined text-3xl text-blue-600 dark:text-blue-400 mb-2">
                                        {stat.icon}
                                    </span>
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.number}</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                                </div>
                            ))}
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

                {/* Categories Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            工具分类
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            按需选择，快速找到适合的工具
                        </p>
                    </div>

                    <div className="grid gap-8 md:gap-12">
                        {TOOL_CATEGORIES.map((category, categoryIndex) => (
                            <CategorySection
                                key={category.id}
                                category={category}
                                categoryIndex={categoryIndex}
                                gradientColors={gradientColors}
                                hoveredTool={hoveredTool}
                                setHoveredTool={setHoveredTool}
                            />
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                        <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 lg:p-12 text-center shadow-2xl">
                            <div className="absolute inset-0 bg-black/10 rounded-3xl"></div>
                            <div className="relative z-10 space-y-6">
                                <h2 className="text-3xl lg:text-4xl font-bold text-white">
                                    开始使用三八零零工具箱
                                </h2>
                                <p className="text-lg text-white/90 max-w-2xl mx-auto">
                                    免费使用所有工具，无需注册，数据本地处理，安全可靠
                                </p>
                                <div className="flex flex-wrap justify-center gap-4 pt-4">
                                    <Link
                                        to="/translate"
                                        className="px-8 py-3 rounded-xl bg-white text-blue-600 font-semibold hover:bg-gray-100 transition-colors shadow-lg"
                                    >
                                        立即开始
                                    </Link>
                                    <Link
                                        to="/topics"
                                        className="px-8 py-3 rounded-xl glassmorphism text-white font-semibold border border-white/30 hover:bg-white/10 transition-colors"
                                    >
                                        查看专题
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <img
                                        src={getAssetUrl('logo.png')}
                                        alt="三八零零"
                                        className="w-8 h-8 rounded-lg"
                                    />
                                    <span className="font-bold text-gray-900 dark:text-white">三八零零</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    免费在线工具箱，提供24+种实用工具
                                </p>
                            </div>
                            
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">常用工具</h4>
                                <ul className="space-y-2 text-sm">
                                    <li><Link to="/translate" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">在线翻译</Link></li>
                                    <li><Link to="/image-converter" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">图片工具</Link></li>
                                    <li><Link to="/json-formatter" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">JSON工具</Link></li>
                                </ul>
                            </div>
                            
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">资源</h4>
                                <ul className="space-y-2 text-sm">
                                    <li><Link to="/ranking" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">工具排行</Link></li>
                                    <li><Link to="/topics" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">专题推荐</Link></li>
                                    <li><Link to="/category/ai" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">AI工具</Link></li>
                                </ul>
                            </div>
                            
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">关于</h4>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                    <li>数据安全，本地处理</li>
                                    <li>无需注册，完全免费</li>
                                    <li>© {new Date().getFullYear()} 三八零零</li>
                                </ul>
                            </div>
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
    hoveredTool: string | null;
    setHoveredTool: (id: string | null) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({
    category,
    categoryIndex,
    gradientColors,
    hoveredTool,
    setHoveredTool,
}) => {
    const categoryGradient = gradientColors[category.id] || 'from-blue-600 to-cyan-500';
    const categoryBgColors = [
        'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30',
        'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30',
        'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30',
        'bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30',
        'bg-gradient-to-br from-rose-50 to-red-50 dark:from-rose-950/30 dark:to-red-950/30',
    ];
    
    return (
        <div className="group">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${categoryGradient} flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform`}>
                        <span className="material-symbols-outlined text-white text-2xl">
                            {category.icon}
                        </span>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {category.name}
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400">
                            {category.description}
                        </p>
                    </div>
                </div>
                <Link
                    to={`/category/${category.id}`}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:shadow-lg transition-all"
                >
                    查看全部
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
            </div>

            <div className={`rounded-3xl p-6 ${categoryBgColors[categoryIndex % categoryBgColors.length]} backdrop-blur`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    <div className="mt-6 text-center">
                        <Link
                            to={`/category/${category.id}`}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all"
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
                group relative block p-5 rounded-2xl
                bg-white/80 dark:bg-gray-800/80 backdrop-blur
                border border-gray-200 dark:border-gray-700/50
                shadow-md hover:shadow-xl
                transition-all duration-300 ease-out
                ${isHovered ? 'scale-[1.02] border-blue-500/50 -translate-y-1' : 'scale-100'}
            `}
        >
            <div className="flex items-center gap-4">
                <div className={`
                    w-12 h-12 rounded-xl flex items-center justify-center
                    bg-gradient-to-br ${gradientColor}
                    shadow-lg group-hover:shadow-xl
                    transition-all duration-300
                    ${isHovered ? 'scale-110 rotate-3' : 'scale-100'}
                `}>
                    <span className="material-symbols-outlined text-white text-2xl">
                        {tool.icon}
                    </span>
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="base font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                        {tool.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                        {tool.description}
                    </p>
                </div>
                <span className={`
                    material-symbols-outlined text-gray-300 dark:text-gray-600 text-xl
                    transition-all duration-300
                    ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-1'}
                `}>
                    arrow_forward
                </span>
            </div>
        </Link>
    );
};

export default HomePage;

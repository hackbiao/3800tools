import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TOOL_CATEGORIES, ALL_TOOLS } from '../config/tools';
import MetaTags from './MetaTags';
import type { ToolCategory, Tool } from '../types/tools';

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

// 分类详细内容配置
const categoryDetails: Record<string, {
    introduction: string;
    usageGuide: string;
    recommendStrategy: string;
}> = {
    calculator: {
        introduction: '计算工具类涵盖了生活和工作中的各种计算需求，包括金融计算、健康计算、数学计算、网络计算等。这些工具通过直观的界面和准确的算法，帮助用户快速完成复杂计算，避免手动计算错误，提高效率和准确性。无论是房贷规划、个税计算还是专业领域的特殊计算，都能提供专业可靠的计算服务。',
        usageGuide: '使用计算工具非常简单：首先选择所需的计算类型，然后输入相关参数或数据，系统会实时显示计算结果。大部分工具支持参数调整后的即时重新计算，用户可以根据不同输入对比结果。计算结果通常可以直接复制或分享，部分工具还支持历史记录和结果导出功能。',
        recommendStrategy: '日常使用建议选择界面简洁、操作直观的计算工具；专业需求则关注计算精度和功能完整性。免费工具通常满足日常计算需求，商业或专业场景可考虑付费版本获得更多功能和技术支持。选择时注意工具的更新频率和用户评价，确保数据的准确性和隐私安全。'
    },
    utility: {
        introduction: '便民工具集合了日常生活中常用的实用小工具，如二维码生成、单位换算、密码生成等。这些工具设计简洁，功能专注，解决用户在工作和生活中的各种小问题。通过本地处理技术，确保用户数据安全性，无需安装任何软件即可直接使用，是提高日常效率的实用助手。',
        usageGuide: '便民工具的使用流程通常为三步：选择工具类型、输入或设置参数、获取结果。大多数工具支持实时预览和即时调整，用户可以根据需求多次尝试不同设置。结果通常支持多种导出格式，如图片、文本等，方便在不同场景使用。',
        recommendStrategy: '根据使用频率选择收藏常用工具；对数据安全要求高的场景选择本地处理工具；专业需求选择功能更全面的工具版本。免费版通常满足基本需求，高级用户可考虑升级获取更多功能和存储空间。选择更新频繁、社区活跃的工具，确保稳定性和持续改进。'
    },
    text: {
        introduction: '文本工具类涵盖了文本处理、格式化、转换、翻译等全流程功能，满足不同场景下的文本处理需求。从简单的格式调整到复杂的机器翻译，这些工具通过智能化处理大大提升文本工作效率。支持多种文本格式和语言，适合内容创作者、编辑、翻译工作者等专业人士使用。',
        usageGuide: '文本工具的使用通常包括：输入文本（粘贴、上传或输入）、选择处理选项、执行操作并获取结果。大部分工具支持批量处理和实时预览，用户可以调整参数直到满意。结果可直接复制、下载或分享，部分工具还支持历史记录和模板保存。',
        recommendStrategy: '简单文本处理选择轻量级工具；专业写作推荐功能全面的编辑工具；翻译需求根据语言对和准确度要求选择相应工具。免费版适合轻度使用，专业用户可考虑付费版本获得更高准确度和更多功能。选择支持多种格式、有良好格式保留能力的工具。'
    },
    image: {
        introduction: '图片工具类提供了一站式图像处理解决方案，包括格式转换、编辑、美化、压缩、合成等功能。通过先进的图像处理算法，用户可以实现专业级的图像效果，无需复杂的设计软件。所有处理在浏览器本地完成，保证图片隐私安全，适合设计师、营销人员和普通用户使用。',
        usageGuide: '图片工具的使用流程：上传图片或输入URL、选择处理选项和参数、预览效果并确认、下载处理结果。大部分工具支持批量处理和实时预览，用户可以多次调整参数。注意保存原图，处理后的图片通常可以立即查看和下载。',
        recommendStrategy: '简单编辑选择在线工具；专业设计考虑功能更全面的软件；批量处理选择支持多图操作的工具。免费版通常适合个人使用，商业用途可能需要授权。选择处理速度快、效果好的工具，注意查看输出质量和文件大小平衡。'
    },
    data: {
        introduction: '数据工具类专注于数据处理、转换、可视化等功能，帮助用户从原始数据中提取有价值的信息。包括表格转换、公式编辑、图表生成、数据分析等多种工具，适合数据分析师、研究人员、商务人士等专业人士。通过直观的界面和强大的功能，让复杂的数据处理变得简单高效。',
        usageGuide: '数据工具的使用通常包括：导入数据（上传文件或输入）、选择处理方式、配置参数、执行操作并查看结果。大部分工具支持多种数据格式和实时预览，用户可以调整参数直到满意。结果通常支持多种导出格式，便于后续使用。',
        recommendStrategy: '简单数据处理选择在线工具；复杂分析选择专业软件；团队协作选择支持共享和版本控制的工具。免费版适合基本需求，高级用户可能需要专业版获得更多功能和支持。选择支持所需数据格式、有良好文档和社区支持的工具。'
    },
    media: {
        introduction: '媒体工具类涵盖视频、音频、PDF等多媒体文件的处理需求，提供格式转换、编辑、压缩等功能。通过优化的算法和处理流程，用户可以快速完成媒体文件处理，无需安装专业软件。支持各种常见格式，适合内容创作者、教育工作者、营销人员等使用。',
        usageGuide: '媒体工具的使用流程：上传媒体文件、选择处理操作和参数、预览效果（如可能）、下载处理结果。大文件处理可能需要较长时间，建议耐心等待。处理前确保网络稳定，重要文件建议先备份。',
        recommendStrategy: '日常处理选择在线工具；专业制作考虑桌面软件；批量处理选择支持队列功能的工具。免费版通常有功能或大小限制，专业用户可能需要付费版。选择处理质量高、速度快的工具，注意查看支持的格式和输出质量。'
    },
    ai: {
        introduction: 'AI工具类集合了最新的人工智能技术，包括文本生成、图像分析、智能助手等功能。通过机器学习算法和深度学习模型，这些工具能够模拟人类智能，完成复杂的分析和创作任务。适合内容创作者、设计师、研究人员、商务人士等需要智能化辅助的专业人士使用。',
        usageGuide: 'AI工具的使用流程：输入需求或上传内容、选择AI模型和参数、执行任务并获取结果。AI处理可能需要一定时间，结果通常可以进一步调整或重新生成。建议明确描述需求，多次尝试不同参数以获得最佳效果。',
        recommendStrategy: '根据具体需求选择专业AI工具；重要场景使用经过验证的成熟模型；考虑数据隐私需求选择本地或云端处理。免费版通常有限额或有基础功能，专业使用可能需要付费获得更多额度和高级功能。选择准确度高、响应速度快的工具。'
    },
    network: {
        introduction: '网络工具类提供了网络相关的诊断、分析、转换等功能，帮助用户理解和优化网络环境。包括IP地址处理、端口查询、状态码检查、URL解析等专业工具，适合网络管理员、开发人员、IT专业人员使用。通过精确的分析和清晰的展示，让复杂的网络问题变得简单明了。',
        usageGuide: '网络工具的使用通常非常直接：输入网络相关的参数（IP、URL等）、选择分析类型、查看结果和解释。大部分工具提供实时查询和详细解释，用户可以根据结果采取相应行动。建议理解基本网络概念，以便更好地使用这些工具。',
        recommendStrategy: '基础需求选择简洁明了的工具；专业诊断选择功能全面的工具；团队使用选择支持批量操作和报告生成的工具。选择更新及时、数据准确、有详细解释的工具，确保分析结果的可靠性。'
    },
    dev: {
        introduction: '开发工具类专为程序员和开发人员设计，提供代码编辑、格式化、测试、数据生成等功能。通过智能化的代码处理和丰富的开发辅助功能，大大提高开发效率和代码质量。支持多种编程语言和框架，适合前端、后端、全栈开发人员使用。',
        usageGuide: '开发工具的使用流程：输入代码或数据、选择处理选项和语言、执行操作并获取结果。大部分工具支持实时预览和语法高亮，用户可以立即看到处理效果。复杂工具建议查看文档或示例，确保正确使用。',
        recommendStrategy: '根据编程语言选择专用工具；团队开发选择支持协作和版本控制的工具；学习初学选择有良好文档和示例的工具。开源工具通常灵活可定制，商业工具提供更多支持和服务。选择活跃维护、社区友好、符合项目需求的工具。'
    }
};

const CategoryPage: React.FC = () => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const [hoveredTool, setHoveredTool] = useState<string | null>(null);

    if (categoryId === 'all') {
        return (
            <>
                <MetaTags
                    title="在线工具箱 - 全部分类 | 三八零零免费工具大全"
                    description="三八零零工具分类大全，包括文本、图片、数据、媒体、AI、网络等120+种实用在线工具，全部免费使用。"
                    keywords="在线工具分类,免费工具,文本工具,图片工具,数据工具,媒体工具,AI工具,网络工具,开发工具"
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
                title={`${category.name}工具 - 在线免费使用 | 三八零零`}
                description={`${category.description}，包括${category.tools.map(t => t.name).join('、')}等多种实用在线工具。完全免费，无需注册。`}
                keywords={`${category.name}工具,${category.tools.map(t => t.name).join(',')},在线工具,免费工具`}
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

                    {/* 分类说明模块 - SEO内容 */}
                    {categoryDetails[category.id] && (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                                <span className="material-symbols-outlined text-2xl text-primary">info</span>
                                {category.name}工具介绍
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {categoryDetails[category.id].introduction}
                            </p>
                        </div>
                    )}

                    {/* 使用指南模块 - SEO内容 */}
                    {categoryDetails[category.id] && (
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-2xl border border-blue-200 dark:border-blue-800 p-8 mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                                <span className="material-symbols-outlined text-2xl text-blue-600">guide</span>
                                {category.name}工具使用指南
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {categoryDetails[category.id].usageGuide}
                            </p>
                        </div>
                    )}

                    {/* 推荐策略模块 - SEO内容 */}
                    {categoryDetails[category.id] && (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                                <span className="material-symbols-outlined text-2xl text-green-600">recommend</span>
                                {category.name}工具选择建议
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {categoryDetails[category.id].recommendStrategy}
                            </p>
                        </div>
                    )}

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

                    {/* SEO增强链接 - 简化版 */}
                    <section className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900/50 dark:to-blue-900/20 border-t border-gray-200 dark:border-gray-800 mt-8 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-6">
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
                                to="/"
                                className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-primary/30 hover:shadow-md transition-all"
                            >
                                <span className="material-symbols-outlined text-sm align-middle mr-1">home</span>
                                回到首页
                            </Link>
                        </div>
                    </section>
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

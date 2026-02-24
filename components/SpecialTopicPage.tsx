import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MetaTags from './MetaTags';
import { ALL_TOOLS, TOOL_CATEGORIES } from '../config/tools';
import { getToolById } from '../config/tools';

// 专题内容配置
const specialTopics = [
    {
        id: 'beginner-friendly',
        title: '最适合新手的AI工具推荐',
        description: '专为初学者精选的入门级AI工具，界面友好，操作简单，快速上手',
        content: `对于刚接触AI工具的用户来说，选择合适的入门工具至关重要。新手友好的工具通常具有直观的界面设计、清晰的操作指引和实用的基础功能。这些工具不需要复杂的技术知识，即使是没有相关经验的用户也能快速掌握并享受AI技术带来的便利。

我们推荐的新手工具都具有以下特点：界面简洁明了，避免复杂的专业术语；提供清晰的操作步骤和提示；功能专注实用，避免过多复杂选项；提供即时反馈和结果预览；有完善的帮助文档和常见问题解答。

建议新手用户从一两个简单工具开始使用，逐步熟悉AI工具的基本原理和操作方式，随着经验积累再尝试更专业的工具。记住，工具的目的是提高效率，不要被复杂的功能分散注意力。`,
        tools: [
            {
                toolId: 'translate',
                reason: '界面直观，支持多种语言，自动检测源语言，翻译结果准确，是体验AI能力的最佳入门工具'
            },
            {
                toolId: 'qrcode-generator',
                reason: '操作简单，功能明确，即时预览结果，实用性高，适合日常使用场景'
            },
            {
                toolId: 'password-generator',
                reason: '功能专一，设置简单，安全实用，帮助新手建立安全意识'
            },
            {
                toolId: 'text-formatter',
                reason: '常见功能集合，界面友好，处理效果直观，文本处理需求广泛'
            },
            {
                toolId: 'color-picker',
                reason: '视觉化操作，结果直观，设计入门必备，色彩理论实践工具'
            }
        ]
    },
    {
        id: 'free-tools',
        title: '免费AI工具推荐',
        description: '完全免费使用的AI工具集合，功能实用，无需付费即可享受AI技术便利',
        content: `免费AI工具为广大用户提供了接触和使用前沿AI技术的机会，降低了技术门槛，让更多人能够体验到AI带来的便利。这些工具虽然免费，但在功能性和实用性上并不逊色于付费产品，许多免费工具甚至提供了足够专业的能力来满足日常需求。

免费AI工具的优势在于：零成本使用，适合个人用户和小团队；功能实用，覆盖日常高频需求；无需注册登录，保障隐私安全；更新频繁，持续优化用户体验；社区活跃，问题解决及时。

选择免费工具时需要注意：了解使用限制，如文件大小、使用次数等；关注数据隐私政策，确保敏感信息安全优先；查看工具更新频率，选择活跃维护的产品；参考用户评价，了解实际使用体验；了解高级功能限制，评估未来升级需求。`,
        tools: [
            {
                toolId: 'json-formatter',
                reason: '开发者必备工具，完全免费，功能强大，支持复杂JSON处理'
            },
            {
                toolId: 'image-converter',
                reason: '支持多种格式转换，批量处理能力，无需安装软件即用'
            },
            {
                toolId: 'unit-converter',
                reason: '全面覆盖常见单位换算，准确可靠，日常实用工具'
            },
            {
                toolId: 'base64-tool',
                reason: '编码解码功能完整，支持文本和图片，技术工作者常用'
            },
            {
                toolId: 'timestamp-converter',
                reason: '时间戳处理工具，程序员和测试人员必备，简单高效'
            }
        ]
    },
    {
        id: 'domestic-tools',
        title: '国内AI工具推荐',
        description: '适合国内用户使用的AI工具，访问速度快，符合本地使用习惯',
        content: `国内AI工具针对中文用户的使用习惯和需求进行了特别优化，在语言理解、文化适应性和服务稳定性方面具有明显优势。这些工具通常部署在国内服务器，访问速度快，符合国内数据合规要求，更适合国内企业和个人用户使用。

国内AI工具的特色：深度优化中文处理能力，理解准确度更高；符合国内用户操作习惯，界面设计更本土化；服务器部署在国内，访问速度快且稳定；遵循国内数据保护法规，使用更安心；支持国内常见平台和格式，兼容性更强。

使用国内工具的优势：无需担心网络连接问题，体验更流畅；客服支持响应及时，沟通无障碍；支付方式多样化，付费更便捷；功能设计更贴合本土需求，实用性更高；定期更新符合国内市场变化，始终保持时效性。`,
        tools: [
            {
                toolId: 'chinese-converter',
                reason: '专门针对中文设计，简繁体转换准确，支持古体字，中文处理专家'
            },
            {
                toolId: 'mbti-test',
                reason: '本地化人格测试，结果解读符合文化背景，职业建议更贴合实际'
            },
            {
                toolId: 'id-card-parser',
                reason: '完全符合国内身份证格式和编码规则，地址信息准确更新'
            },
            {
                toolId: 'relationship-calculator',
                reason: '基于中华文化传统的亲戚关系计算，称谓准确，文化内涵丰富'
            },
            {
                toolId: 'chinese-to-pinyin',
                reason: '中文拼音转换专业，支持多音字处理，声调标注准确'
            }
        ]
    }
];

const gradientColors: Record<string, string> = {
    'beginner-friendly': 'from-green-500 to-emerald-500',
    'free-tools': 'from-blue-500 to-cyan-500',
    'domestic-tools': 'from-red-500 to-rose-500',
};

const SpecialTopicPage: React.FC = () => {
    const [activeTopic, setActiveTopic] = useState('beginner-friendly');

    const currentTopic = specialTopics.find(topic => topic.id === activeTopic);

    return (
        <>
            <MetaTags
                title="AI工具专题 - 深度工具推荐指南 | 三八零零"
                description="三八零零AI工具专题页面，提供新手工具推荐、免费工具推荐、国内工具推荐等专题内容，深度解析各类AI工具的特点和适用场景。"
                keywords="AI工具专题,新手工具推荐,免费AI工具,国内AI工具,工具使用指南,工具选择建议"
            />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
                {/* 页面标题部分 */}
                <section className="bg-gradient-to-b from-purple-500/10 to-transparent pb-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="text-center">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                                <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                                    AI工具专题
                                </span>
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                                深度解析不同场景下的AI工具选择，为您提供专业的工具推荐和使用指南
                            </p>
                        </div>
                    </div>
                </section>

                {/* 专题导航 */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                        {specialTopics.map((topic) => (
                            <button
                                key={topic.id}
                                onClick={() => setActiveTopic(topic.id)}
                                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                                    activeTopic === topic.id
                                        ? `bg-gradient-to-r ${gradientColors[topic.id]} text-white shadow-lg`
                                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary/30'
                                }`}
                            >
                                {topic.title}
                            </button>
                        ))}
                    </div>
                </section>

                {/* 当前专题内容 */}
                {currentTopic && (
                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                        {/* 专题介绍 */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 mb-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradientColors[currentTopic.id]} flex items-center justify-center`}>
                                    <span className="material-symbols-outlined text-white text-xl">topic</span>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {currentTopic.title}
                                    </h2>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        {currentTopic.description}
                                    </p>
                                </div>
                            </div>

                            <div className="prose prose-gray dark:prose-invert max-w-none">
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                    {currentTopic.content}
                                </p>
                            </div>
                        </div>

                        {/* 推荐工具列表 */}
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-2xl border border-purple-200 dark:border-purple-800 p-8 mb-8">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-purple-600">stars</span>
                                专题推荐工具
                            </h3>

                            <div className="grid gap-4">
                                {currentTopic.tools.map((item, index) => {
                                    const tool = getToolById(item.toolId as any);
                                    if (!tool) return null;

                                    const category = TOOL_CATEGORIES.find(cat => cat.tools.some(t => t.id === tool.id));
                                    const categoryGradient = category ? {
                                        calculator: 'from-blue-500 to-cyan-400',
                                        utility: 'from-purple-500 to-pink-400',
                                        text: 'from-green-500 to-emerald-400',
                                        image: 'from-orange-500 to-amber-400',
                                        data: 'from-teal-500 to-cyan-400',
                                        media: 'from-pink-500 to-rose-400',
                                        ai: 'from-violet-500 to-purple-400',
                                        network: 'from-indigo-500 to-blue-400',
                                        dev: 'from-rose-500 to-red-400',
                                    }[category.id] : 'from-blue-500 to-cyan-400';

                                    return (
                                        <div
                                            key={tool.id}
                                            className="flex items-start gap-4 p-4 rounded-xl bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 hover:border-primary/30 hover:shadow-md transition-all"
                                        >
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${categoryGradient}`}>
                                                <span className="material-symbols-outlined text-white text-lg">{tool.icon}</span>
                                            </div>
                                            
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <Link
                                                        to={tool.path}
                                                        className="flex items-center gap-2 hover:text-primary transition-colors"
                                                    >
                                                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                            {tool.name}
                                                        </h4>
                                                    </Link>
                                                    <Link
                                                        to={tool.path}
                                                        className="ml-auto px-3 py-1 rounded-lg text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                                                    >
                                                        立即使用
                                                        <span className="material-symbols-outlined text-sm align-middle ml-1">arrow_forward</span>
                                                    </Link>
                                                </div>
                                                
                                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                                                    {tool.description}
                                                </p>
                                                
                                                <p className="text-gray-500 dark:text-gray-400 text-sm">
                                                    <span className="font-medium">推荐理由：</span>{item.reason}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* SEO增强内容 */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">insights</span>
                                专题总结
                            </h3>
                            <div className="prose prose-gray dark:prose-invert max-w-none">
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    选择合适的AI工具是提升工作效率的关键。新手用户应该从简单实用的工具开始，逐步了解AI技术的基本原理和应用方式。免费工具提供了无门槛的体验机会，而国内工具则更好地满足了本土化需求。无论选择哪种工具，都要注重实用性、安全性和用户体验，让技术真正为工作服务。建议定期关注AI工具的发展动态，及时了解新的功能和改进，持续优化自己的工具组合。
                                </p>
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </>
    );
};

export default SpecialTopicPage;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MetaTags from './MetaTags';
import { ALL_TOOLS, TOOL_CATEGORIES } from '../config/tools';
import { getToolById } from '../config/tools';

// 工具榜单内容配置
const rankingLists = [
    {
        id: 'ai-writing',
        title: 'AI写作工具推荐',
        description: '精选最受欢迎的AI写作助手，提升内容创作效率',
        tools: [
            {
                toolId: 'translate',
                rank: 1,
                recommend: '翻译准确率高，支持多种语言，适合跨语言内容创作',
                scenarios: '多语言内容创作、文档翻译、国际化内容适配'
            },
            {
                toolId: 'prompt-generator',
                rank: 2,
                recommend: 'AI提示词生成专家，优化AI交互效果，提升内容质量',
                scenarios: 'AI写作辅助、内容创作指导、AI提示词优化'
            },
            {
                toolId: 'text-formatter',
                rank: 3,
                recommend: '文本格式化利器，统一文档风格，提高可读性',
                scenarios: '文档排版、内容格式统一、文本美化'
            },
            {
                toolId: 'text-statistics',
                rank: 4,
                recommend: '文字分析工具，了解内容特性，优化内容策略',
                scenarios: '内容分析、阅读时间估算、关键词统计'
            },
            {
                toolId: 'resume-generator',
                rank: 5,
                recommend: 'AI简历生成器，专业简历模板，助力求职成功',
                scenarios: '求职简历制作、个人品牌展示、职业规划'
            }
        ]
    },
    {
        id: 'ai-image',
        title: 'AI图像处理工具推荐',
        description: '优质AI图像工具集合，从编辑到生成一站式解决方案',
        tools: [
            {
                toolId: 'image-watermark-remover',
                rank: 1,
                recommend: 'AI智能去水印，无损图片修复，还原图像真实面貌',
                scenarios: '图片修复、素材清理、商业图片处理'
            },
            {
                toolId: 'image-to-prompt',
                rank: 2,
                recommend: '图像分析生成提示词，AI创作灵感来源',
                scenarios: 'AI绘画参考、图片描述生成、内容标签'
            },
            {
                toolId: 'photo-bg-changer',
                rank: 3,
                recommend: '证件照AI换底色，专业效果，一键完成',
                scenarios: '证件照制作、求职照片、证件处理'
            },
            {
                toolId: 'image-compressor',
                rank: 4,
                recommend: '智能图片压缩，保持清晰度，优化加载速度',
                scenarios: '网页优化、图片存储、网络传输'
            },
            {
                toolId: 'image-converter',
                rank: 5,
                recommend: '多格式图片转换，支持批量处理，格式兼容性强',
                scenarios: '格式转换、批量处理、跨平台使用'
            }
        ]
    },
    {
        id: 'development',
        title: '开发工具推荐',
        description: '程序员工具箱，提升开发效率，简化复杂任务',
        tools: [
            {
                toolId: 'code-highlight',
                rank: 1,
                recommend: '多语言代码高亮，可读性极佳，适合技术文档',
                scenarios: '技术文档、代码展示、教学演示'
            },
            {
                toolId: 'json-formatter',
                rank: 2,
                recommend: 'JSON格式化利器，数据结构清晰，API调试必备',
                scenarios: 'API调试、数据格式化、前后端开发'
            },
            {
                toolId: 'markdown-editor',
                rank: 3,
                recommend: '专业Markdown编辑器，实时预览，文档写作首选',
                scenarios: '文档编写、项目说明、技术笔记'
            },
            {
                toolId: 'linux-command',
                rank: 4,
                recommend: 'Linux命令大全，系统管理必备，运维人员助手',
                scenarios: '系统管理、服务器运维、命令查询'
            },
            {
                toolId: 'regex-tester',
                rank: 5,
                recommend: '正则表达式测试器，模式匹配验证，文本处理利器',
                scenarios: '数据验证、文本匹配、模式测试'
            }
        ]
    },
    {
        id: 'productivity',
        title: '效率工具推荐',
        description: '提升工作效率的实用小工具，简化日常任务',
        tools: [
            {
                toolId: 'mortgage-calculator',
                rank: 1,
                recommend: '房贷计算器，多种还款方式，购房决策好帮手',
                scenarios: '购房规划、贷款比较、财务规划'
            },
            {
                toolId: 'tax-calculator',
                rank: 2,
                recommend: '个税计算器，最新税法政策，工资单分析工具',
                scenarios: '薪资计算、税务规划、财务分析'
            },
            {
                toolId: 'qrcode-generator',
                rank: 3,
                recommend: '二维码生成器，多样自定义，移动营销必备',
                scenarios: '营销推广、信息分享、移动应用'
            },
            {
                toolId: 'password-generator',
                rank: 4,
                recommend: '安全密码生成器，高强度随机，账号安全守护',
                scenarios: '账号安全、密码管理、网络安全'
            },
            {
                toolId: 'unit-converter',
                rank: 5,
                recommend: '万能单位转换器，全面覆盖，工程计算常用',
                scenarios: '工程计算、单位换算、数据转换'
            }
        ]
    }
];

const gradientColors: Record<string, string> = {
    'ai-writing': 'from-purple-500 to-pink-500',
    'ai-image': 'from-orange-500 to-amber-500',
    'development': 'from-blue-500 to-cyan-500',
    'productivity': 'from-green-500 to-emerald-500',
};

const RankingPage: React.FC = () => {
    const [activeList, setActiveList] = useState('ai-writing');
    const [hoveredRank, setHoveredRank] = useState<number | null>(null);

    const currentRanking = rankingLists.find(list => list.id === activeList);

    return (
        <>
            <MetaTags
                title="AI工具排行榜 - 最佳工具推荐 | 三八零零"
                description="三八零零AI工具排行榜，精选优质工具推荐，包括AI写作工具、图像处理工具、开发工具、效率工具等，助您找到最适合的专业工具。"
                keywords="AI工具推荐,工具排行榜,最佳AI工具,工具评测,软件推荐,效率工具"
            />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
                {/* 页面标题部分 */}
                <section className="bg-gradient-to-b from-primary/10 to-transparent pb-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="text-center">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                                <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                                    AI工具排行榜
                                </span>
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                                精选优质工具推荐，经过专业评测和用户反馈，为您找到最适合的AI工具解决方案
                            </p>
                        </div>
                    </div>
                </section>

                {/* 榜单导航 */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                        {rankingLists.map((list) => (
                            <button
                                key={list.id}
                                onClick={() => setActiveList(list.id)}
                                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                                    activeList === list.id
                                        ? `bg-gradient-to-r ${gradientColors[list.id]} text-white shadow-lg`
                                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary/30'
                                }`}
                            >
                                {list.title}
                            </button>
                        ))}
                    </div>
                </section>

                {/* 当前榜单内容 */}
                {currentRanking && (
                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 mb-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradientColors[currentRanking.id]} flex items-center justify-center`}>
                                    <span className="material-symbols-outlined text-white text-xl">emoji_events</span>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {currentRanking.title}
                                    </h2>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        {currentRanking.description}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {currentRanking.tools.map((item) => {
                                    const tool = getToolById(item.toolId as any);
                                    if (!tool) return null;

                                    return (
                                        <div
                                            key={item.toolId}
                                            className="flex items-start gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary/30 hover:shadow-md transition-all"
                                            onMouseEnter={() => setHoveredRank(item.rank)}
                                            onMouseLeave={() => setHoveredRank(null)}
                                        >
                                            {/* 排名标签 */}
                                            <div className={`flex items-center justify-center w-10 h-10 rounded-lg font-bold text-white ${
                                                item.rank === 1 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                                                item.rank === 2 ? 'bg-gradient-to-r from-gray-300 to-gray-500' :
                                                item.rank === 3 ? 'bg-gradient-to-r from-orange-300 to-orange-500' :
                                                'bg-gray-400'
                                            }`}>
                                                {item.rank}
                                            </div>

                                            {/* 工具信息 */}
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <Link
                                                        to={tool.path}
                                                        className="flex items-center gap-2 hover:text-primary transition-colors"
                                                    >
                                                        <span className="material-symbols-outlined text-primary">{tool.icon}</span>
                                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                            {tool.name}
                                                        </h3>
                                                    </Link>
                                                    <Link
                                                        to={tool.path}
                                                        className={`ml-auto px-3 py-1 rounded-lg text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors ${
                                                            hoveredRank === item.rank ? 'opacity-100' : 'opacity-70'
                                                        }`}
                                                    >
                                                        立即使用
                                                        <span className="material-symbols-outlined text-sm align-middle ml-1">arrow_forward</span>
                                                    </Link>
                                                </div>
                                                
                                                <p className="text-gray-600 dark:text-gray-300 mb-2">
                                                    <span className="font-medium">推荐理由：</span>{item.recommend}
                                                </p>
                                                
                                                <p className="text-gray-500 dark:text-gray-400 text-sm">
                                                    <span className="font-medium">适用场景：</span>{item.scenarios}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* SEO增强内容 */}
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-2xl border border-blue-200 dark:border-blue-800 p-8">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-blue-600">tips_and_updates</span>
                                工具选择建议
                            </h3>
                            <div className="prose prose-gray dark:prose-invert max-w-none">
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    选择合适的AI工具需要综合考虑多个因素。首先明确自己的具体需求和使用场景，然后评估工具的功能完整性、易用性和性能稳定性。免费版通常适合轻度使用和初步体验，专业用户和商业场景可能需要付费版本获得更多功能和技术支持。建议先试用再决策，选择更新频繁、社区活跃、数据安全有保障的工具平台。
                                </p>
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </>
    );
};

export default RankingPage;
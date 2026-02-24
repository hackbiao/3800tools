import React from 'react';
import { Link } from 'react-router-dom';

interface SEOEnhancementProps {
    toolCategory?: string;
}

const SEOEnhancement: React.FC<SEOEnhancementProps> = ({ toolCategory }) => {
    return (
        <section className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900/50 dark:to-blue-900/20 border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-primary">psychology</span>
                        AI工具知识扩展
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        AI工具通过机器学习和大数据分析，能够理解用户需求并提供智能解决方案，大大提升了工作效率和创造力。随着技术不断发展，AI工具正在成为各行业不可或缺的生产力工具。
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <Link 
                        to="/ranking" 
                        className="group flex flex-col p-4 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 hover:border-primary/30 hover:shadow-md transition-all"
                    >
                        <span className="material-symbols-outlined text-primary text-xl mb-2">emoji_events</span>
                        <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-primary transition-colors">工具排行榜</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">查看最受欢迎的AI工具推荐</p>
                    </Link>
                    
                    <Link 
                        to="/topics" 
                        className="group flex flex-col p-4 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 hover:border-primary/30 hover:shadow-md transition-all"
                    >
                        <span className="material-symbols-outlined text-purple-600 text-xl mb-2">topic</span>
                        <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-primary transition-colors">专题推荐</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">针对不同使用场景的专题指南</p>
                    </Link>
                    
                    <Link 
                        to="/category/ai" 
                        className="group flex flex-col p-4 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 hover:border-primary/30 hover:shadow-md transition-all"
                    >
                        <span className="material-symbols-outlined text-green-600 text-xl mb-2">smart_toy</span>
                        <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-primary transition-colors">AI工具集合</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">探索更多AI智能应用工具</p>
                    </Link>
                    
                    <Link 
                        to="/" 
                        className="group flex flex-col p-4 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 hover:border-primary/30 hover:shadow-md transition-all"
                    >
                        <span className="material-symbols-outlined text-orange-600 text-xl mb-2">home</span>
                        <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-primary transition-colors">回到首页</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">发现更多实用工具有机集合</p>
                    </Link>
                </div>
                
                <div className="text-center">
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                        三八零零 - 在线免费工具箱 | 持续更新，为您提供最优质的AI工具体验
                    </p>
                </div>
            </div>
        </section>
    );
};

export default SEOEnhancement;
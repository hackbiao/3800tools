import React from 'react';
import { Link } from 'react-router-dom';
import MetaTags from './MetaTags';

const NotFoundPage: React.FC = () => {
    return (
        <>
            <MetaTags
                title="页面未找到 - 叁八零零在线工具"
                description="抱歉，您访问的页面不存在。返回叁八零零首页使用各种免费在线工具。"
                keywords="404,页面未找到,在线工具,免费工具"
            />

            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-900 flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="mb-8">
                        <span className="text-8xl font-black bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                            404
                        </span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        页面未找到
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">
                        抱歉，您访问的页面不存在或已被移除。请返回首页继续使用我们的工具。
                    </p>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
                    >
                        <span className="material-symbols-outlined">home</span>
                        返回首页
                    </Link>
                </div>
            </div>
        </>
    );
};

export default NotFoundPage;

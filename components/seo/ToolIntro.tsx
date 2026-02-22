import React from 'react';

interface ToolIntroProps {
    intro: {
        what: string;
        problem: string;
        capability: string;
        targetUser: string;
    };
}

const ToolIntro: React.FC<ToolIntroProps> = ({ intro }) => {
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                什么是这个工具？
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none space-y-3">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {intro.what}
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    <strong className="text-gray-900 dark:text-white">解决问题：</strong>{intro.problem}
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    <strong className="text-gray-900 dark:text-white">核心能力：</strong>{intro.capability}
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    <strong className="text-gray-900 dark:text-white">适用人群：</strong>{intro.targetUser}
                </p>
            </div>
        </div>
    );
};

export default ToolIntro;

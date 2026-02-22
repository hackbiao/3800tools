import React from 'react';

interface ExampleIOProps {
    exampleIO: {
        input: string;
        output: string;
    };
}

const ExampleIO: React.FC<ExampleIOProps> = ({ exampleIO }) => {
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                示例输入输出
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">input</span>
                        输入示例
                    </h3>
                    <pre className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap overflow-x-auto">
                        {exampleIO.input}
                    </pre>
                </div>
                <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <span className="material-symbols-outlined text-green-500">output</span>
                        输出示例
                    </h3>
                    <pre className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap overflow-x-auto">
                        {exampleIO.output}
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default ExampleIO;

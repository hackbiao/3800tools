import React from 'react';

interface UsageStepsProps {
    steps: string[];
}

const UsageSteps: React.FC<UsageStepsProps> = ({ steps }) => {
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                使用步骤
            </h2>
            <div className="space-y-3">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                    >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-sm">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                            <p className="text-gray-700 dark:text-gray-300 font-medium">
                                {step}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UsageSteps;

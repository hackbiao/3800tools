import React from 'react';

interface UseCasesProps {
    useCases: string[];
}

const UseCases: React.FC<UseCasesProps> = ({ useCases }) => {
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                使用场景
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {useCases.map((useCase, index) => {
                    const [title, ...descParts] = useCase.split(' - ');
                    const description = descParts.join(' - ');
                    
                    return (
                        <div
                            key={index}
                            className="p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary/30 transition-colors"
                        >
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center flex-shrink-0">
                                    <span className="material-symbols-outlined text-white text-sm">check</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                                        {title}
                                    </h3>
                                    {description && (
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            {description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default UseCases;

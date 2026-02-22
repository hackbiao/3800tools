import React from 'react';

interface CoreFeaturesProps {
    features: string[];
}

const CoreFeatures: React.FC<CoreFeaturesProps> = ({ features }) => {
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                核心功能
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {features.map((feature, index) => (
                    <li
                        key={index}
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                    >
                        <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CoreFeatures;

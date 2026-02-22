import React from 'react';

interface TargetAudienceProps {
    audience: string[];
}

const TargetAudience: React.FC<TargetAudienceProps> = ({ audience }) => {
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                适用人群
            </h2>
            <div className="flex flex-wrap gap-2">
                {audience.map((item, index) => (
                    <span
                        key={index}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
                    >
                        <span className="material-symbols-outlined text-base">person</span>
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default TargetAudience;

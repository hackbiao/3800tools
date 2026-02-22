import React, { useState, useEffect } from 'react';

interface FAQSectionProps {
    faq: Array<{
        question: string;
        answer: string;
    }>;
}

const FAQSection: React.FC<FAQSectionProps> = ({ faq }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faq.map(item => ({
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item.answer
                }
            }))
        });
        document.head.appendChild(script);
        
        return () => {
            document.head.removeChild(script);
        };
    }, [faq]);

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                常见问题
            </h2>
            <div className="space-y-2">
                {faq.map((item, index) => (
                    <div
                        key={index}
                        className="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden"
                    >
                        <button
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                        >
                            <span className="font-medium text-gray-900 dark:text-white pr-4">
                                {item.question}
                            </span>
                            <span className={`material-symbols-outlined text-gray-400 transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}>
                                expand_more
                            </span>
                        </button>
                        {openIndex === index && (
                            <div className="px-4 pb-4 text-gray-600 dark:text-gray-300">
                                {item.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQSection;

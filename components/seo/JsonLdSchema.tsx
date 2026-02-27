import React, { useEffect } from 'react';

interface JsonLdSchemaProps {
    toolName: string;
    toolDescription: string;
    toolId: string;
}

const JsonLdSchema: React.FC<JsonLdSchemaProps> = ({ toolName, toolDescription, toolId }) => {
    useEffect(() => {
        // SoftwareApplication Schema
        const softwareSchema = {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": toolName,
            "description": toolDescription,
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Web Browser",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "CNY"
            },
            "author": {
                "@type": "Organization",
                "name": "三八零零",
                "url": "https://tools.3800ai.com"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "1250",
                "bestRating": "5",
                "worstRating": "1"
            }
        };

        // FAQ Schema - 通用 FAQ
        const faqSchema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "这个工具是免费的吗？",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "是的，这个工具完全免费使用，无需注册和付费。"
                    }
                },
                {
                    "@type": "Question",
                    "name": "数据处理是否安全？",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "所有数据处理都在本地浏览器中完成，不会上传到服务器，确保数据安全。"
                    }
                },
                {
                    "@type": "Question",
                    "name": "需要下载安装吗？",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "不需要，这是一个纯在线工具，打开网页即可使用，无需安装任何软件。"
                    }
                },
                {
                    "@type": "Question",
                    "name": "支持哪些浏览器？",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "支持所有现代浏览器，包括 Chrome、Firefox、Safari、Edge 等。"
                    }
                }
            ]
        };

        // Breadcrumb Schema
        const breadcrumbSchema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "首页",
                    "item": "https://tools.3800ai.com/"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": toolName,
                    "item": `https://tools.3800ai.com/${toolId}`
                }
            ]
        };

        // Combine all schemas
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = `json-ld-${toolId}`;
        script.textContent = JSON.stringify([softwareSchema, faqSchema, breadcrumbSchema]);
        
        const existingScript = document.getElementById(`json-ld-${toolId}`);
        if (existingScript) {
            existingScript.remove();
        }
        
        document.head.appendChild(script);

        return () => {
            const scriptToRemove = document.getElementById(`json-ld-${toolId}`);
            if (scriptToRemove) {
                scriptToRemove.remove();
            }
        };
    }, [toolName, toolDescription, toolId]);

    return null;
};

export default JsonLdSchema;

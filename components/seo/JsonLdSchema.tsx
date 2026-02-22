import React, { useEffect } from 'react';

interface JsonLdSchemaProps {
    toolName: string;
    toolDescription: string;
    toolId: string;
}

const JsonLdSchema: React.FC<JsonLdSchemaProps> = ({ toolName, toolDescription, toolId }) => {
    useEffect(() => {
        const schema = {
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

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = `json-ld-${toolId}`;
        script.textContent = JSON.stringify(schema);
        
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

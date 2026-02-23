import { useEffect } from 'react';

interface MetaTagsProps {
    title: string;
    description: string;
    keywords: string;
    canonicalUrl?: string;
    ogImage?: string;
}

const BASE_URL = 'https://tools.3800ai.com';

const MetaTags: React.FC<MetaTagsProps> = ({ 
    title, 
    description, 
    keywords, 
    canonicalUrl,
    ogImage = '/assets/og-image.png'
}) => {
    useEffect(() => {
        document.title = title;

        const updateMeta = (name: string, content: string, isProperty = false) => {
            const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
            let meta = document.querySelector(selector) as HTMLMetaElement;
            if (!meta) {
                meta = document.createElement('meta');
                if (isProperty) {
                    meta.setAttribute('property', name);
                } else {
                    meta.setAttribute('name', name);
                }
                document.head.appendChild(meta);
            }
            meta.setAttribute('content', content);
        };

        updateMeta('description', description);
        updateMeta('keywords', keywords);
        
        updateMeta('og:title', title, true);
        updateMeta('og:description', description, true);
        updateMeta('og:image', `${BASE_URL}${ogImage}`, true);
        
        let path = window.location.pathname;
        if (!path.endsWith('/')) path += '/';
        const currentUrl = canonicalUrl || `${BASE_URL}${path}`;
        
        updateMeta('og:url', currentUrl, true);
        
        updateMeta('twitter:title', title);
        updateMeta('twitter:description', description);
        updateMeta('twitter:image', `${BASE_URL}${ogImage}`);
        updateMeta('twitter:url', currentUrl);

        let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
        if (!canonicalLink) {
            canonicalLink = document.createElement('link');
            canonicalLink.setAttribute('rel', 'canonical');
            document.head.appendChild(canonicalLink);
        }
        canonicalLink.setAttribute('href', canonicalUrl || currentUrl);

        return () => {
        };
    }, [title, description, keywords, canonicalUrl, ogImage]);

    return null;
};

export default MetaTags;

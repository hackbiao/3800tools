import { useEffect } from 'react';

interface MetaTagsProps {
    title: string;
    description: string;
    keywords: string;
    canonicalUrl?: string;
}

const MetaTags: React.FC<MetaTagsProps> = ({ title, description, keywords, canonicalUrl }) => {
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
        updateMeta('twitter:title', title);
        updateMeta('twitter:description', description);

        if (canonicalUrl) {
            let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
            if (!link) {
                link = document.createElement('link');
                link.setAttribute('rel', 'canonical');
                document.head.appendChild(link);
            }
            link.setAttribute('href', canonicalUrl);
        }

        return () => {
        };
    }, [title, description, keywords, canonicalUrl]);

    return null;
};

export default MetaTags;

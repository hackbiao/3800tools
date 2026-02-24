import React, { useState, useRef, useEffect } from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    /** 图片加载中显示的内容 */
    placeholder?: React.ReactNode;
    /** 加载失败显示的内容 */
    fallback?: React.ReactNode;
    /** 根元素类名 */
    className?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
    src,
    alt,
    placeholder,
    fallback = <div className="text-gray-400 text-sm">加载失败</div>,
    className = '',
    ...props
}) => {
    const [imageState, setImageState] = useState<'loading' | 'loaded' | 'error'>('loading');
    const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
    const imgRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        if (!src || !imgRef.current) return;

        const lazyLoad = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setImageSrc(src);
                    observerRef.current?.unobserve(entry.target);
                }
            });
        };

        observerRef.current = new IntersectionObserver(lazyLoad, {
            rootMargin: '100px 0px',
            threshold: 0.01
        });

        observerRef.current.observe(imgRef.current);

        return () => {
            observerRef.current?.disconnect();
        };
    }, [src]);

    const handleLoad = () => {
        setImageState('loaded');
    };

    const handleError = () => {
        setImageState('error');
    };

    const defaultPlaceholder = (
        <div className="flex items-center justify-center w-full h-full bg-gray-100 dark:bg-gray-800 rounded animate-pulse">
            <span className="material-symbols-outlined text-gray-400 text-2xl">image</span>
        </div>
    );

    return (
        <div ref={imgRef} className={`relative ${className}`}>
            {imageSrc && (
                <img
                    src={imageSrc}
                    alt={alt}
                    onLoad={handleLoad}
                    onError={handleError}
                    loading="lazy"
                    style={{
                        display: imageState === 'loaded' ? 'block' : 'none',
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain'
                    }}
                    {...props}
                />
            )}
            
            {imageState === 'loading' && (
                <div style={{ display: imageState === 'loading' ? 'block' : 'none' }}>
                    {placeholder || defaultPlaceholder}
                </div>
            )}
            
            {imageState === 'error' && fallback}
        </div>
    );
};

export default LazyImage;
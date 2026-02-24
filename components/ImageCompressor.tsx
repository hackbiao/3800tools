import React, { useState } from 'react';
import LazyImage from './LazyImage';

const ImageCompressor: React.FC = () => {
    const [images, setImages] = useState<Array<{
        id: number;
        file: File;
        preview: string;
        quality: number;
        compressedBlob: Blob | null;
        compressedUrl: string | null;
        originalSize: number;
        compressedSize: number | null;
    }>>([]);
    const [defaultQuality, setDefaultQuality] = useState<number>(80);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const newImages = Array.from(files).map((file, index) => ({
            id: Date.now() + index,
            file,
            preview: URL.createObjectURL(file),
            quality: defaultQuality,
            compressedBlob: null,
            compressedUrl: null,
            originalSize: file.size,
            compressedSize: null,
        }));

        setImages(prev => [...prev, ...newImages]);
    };

    const compressImage = async (id: number) => {
        const image = images.find(img => img.id === id);
        if (!image) return;

        setIsProcessing(true);

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new window.Image();

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx?.drawImage(img, 0, 0);

            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        setImages(prev => prev.map(img =>
                            img.id === id
                                ? {
                                    ...img,
                                    compressedBlob: blob,
                                    compressedUrl: URL.createObjectURL(blob),
                                    compressedSize: blob.size,
                                }
                                : img
                        ));
                    }
                    setIsProcessing(false);
                },
                'image/jpeg',
                image.quality / 100
            );
        };

        img.src = image.preview;
    };

    const compressAll = async () => {
        for (const image of images) {
            if (!image.compressedBlob) {
                await compressImage(image.id);
            }
        }
    };

    const updateQuality = (id: number, quality: number) => {
        setImages(prev => prev.map(img =>
            img.id === id ? { ...img, quality, compressedBlob: null, compressedUrl: null, compressedSize: null } : img
        ));
    };

    const downloadImage = (id: number) => {
        const image = images.find(img => img.id === id);
        if (!image?.compressedUrl) return;

        const a = document.createElement('a');
        a.href = image.compressedUrl;
        a.download = `compressed_${image.file.name}`;
        a.click();
    };

    const removeImage = (id: number) => {
        setImages(prev => {
            const image = prev.find(img => img.id === id);
            if (image) {
                URL.revokeObjectURL(image.preview);
                if (image.compressedUrl) URL.revokeObjectURL(image.compressedUrl);
            }
            return prev.filter(img => img.id !== id);
        });
    };

    const formatSize = (bytes: number): string => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    };

    const getCompressionRatio = (original: number, compressed: number): string => {
        const ratio = ((original - compressed) / original) * 100;
        return ratio.toFixed(1);
    };

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-4xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">图片压缩</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">在线压缩图片，减小文件大小，支持批量处理</p>
            </div>

            <div className="w-full max-w-4xl space-y-6">
                <div className="flex items-center gap-4">
                    <label className="flex-1 cursor-pointer">
                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-primary transition-colors">
                            <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-gray-600 dark:text-gray-400">点击选择图片或拖拽图片到此处</p>
                            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">支持 JPG、PNG 格式</p>
                        </div>
                        <input
                            type="file"
                            accept="image/jpeg,image/png"
                            multiple
                            onChange={handleFileSelect}
                            className="hidden"
                        />
                    </label>
                </div>

                {images.length > 0 && (
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <label className="text-sm text-gray-600 dark:text-gray-400">默认质量:</label>
                            <input
                                type="range"
                                min="10"
                                max="100"
                                value={defaultQuality}
                                onChange={(e) => setDefaultQuality(parseInt(e.target.value))}
                                className="w-32"
                            />
                            <span className="text-sm text-gray-900 dark:text-white">{defaultQuality}%</span>
                        </div>
                        <button
                            onClick={compressAll}
                            disabled={isProcessing}
                            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                        >
                            {isProcessing ? '压缩中...' : '全部压缩'}
                        </button>
                    </div>
                )}

                <div className="space-y-4">
                    {images.map(image => (
                        <div key={image.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <div className="flex items-start gap-4">
                                <img
                                    src={image.preview}
                                    alt="preview"
                                    className="w-24 h-24 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                    <div className="font-medium text-gray-900 dark:text-white mb-2">{image.file.name}</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                        原始大小: {formatSize(image.originalSize)}
                                    </div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <label className="text-sm text-gray-600 dark:text-gray-400">质量:</label>
                                        <input
                                            type="range"
                                            min="10"
                                            max="100"
                                            value={image.quality}
                                            onChange={(e) => updateQuality(image.id, parseInt(e.target.value))}
                                            className="w-32"
                                        />
                                        <span className="text-sm text-gray-900 dark:text-white">{image.quality}%</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeImage(image.id)}
                                    className="p-2 text-gray-400 hover:text-red-500"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {image.compressedBlob && (
                                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                压缩后: {formatSize(image.compressedSize)} 
                                                <span className="text-green-500 ml-2">
                                                    减少 {getCompressionRatio(image.originalSize, image.compressedSize)}%
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => downloadImage(image.id)}
                                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                        >
                                            下载
                                        </button>
                                    </div>
                                </div>
                            )}

                            {!image.compressedBlob && (
                                <button
                                    onClick={() => compressImage(image.id)}
                                    disabled={isProcessing}
                                    className="mt-4 w-full py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                                >
                                    压缩
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">使用说明</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• 支持 JPG 和 PNG 格式图片压缩</li>
                        <li>• 质量越高，图片越清晰，文件越大</li>
                        <li>• 建议 JPG 质量 70-85%，PNG 质量 80-95%</li>
                        <li>• 所有压缩在本地浏览器完成，不上传服务器</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ImageCompressor;

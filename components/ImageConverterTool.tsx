import React, { useState, useCallback } from 'react';

type ImageFormat = 'png' | 'jpeg' | 'webp' | 'gif' | 'bmp';

const ImageConverterTool: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [targetFormat, setTargetFormat] = useState<ImageFormat>('png');
    const [convertedUrl, setConvertedUrl] = useState<string>('');
    const [isConverting, setIsConverting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setError('请选择图片文件');
            return;
        }

        setSelectedFile(file);
        setError(null);
        setConvertedUrl('');

        const reader = new FileReader();
        reader.onload = (e) => {
            setPreviewUrl(e.target?.result as string);
        };
        reader.readAsDataURL(file);
    }, []);

    const handleConvert = useCallback(async () => {
        if (!selectedFile || !previewUrl) {
            setError('请先选择图片');
            return;
        }

        setIsConverting(true);
        setError(null);

        try {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;

                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    setError('Canvas 上下文创���失败');
                    setIsConverting(false);
                    return;
                }

                ctx.drawImage(img, 0, 0);

                const mimeType = `image/${targetFormat === 'jpeg' ? 'jpeg' : targetFormat}`;
                const quality = targetFormat === 'jpeg' ? 0.9 : undefined;

                canvas.toBlob((blob) => {
                    if (!blob) {
                        setError('图片转换失败');
                        setIsConverting(false);
                        return;
                    }

                    const url = URL.createObjectURL(blob);
                    setConvertedUrl(url);
                    setIsConverting(false);
                }, mimeType, quality);
            };

            img.onerror = () => {
                setError('图片加载失败');
                setIsConverting(false);
            };

            img.src = previewUrl;
        } catch (err) {
            console.error(err);
            setError('转换过程中出现错误');
            setIsConverting(false);
        }
    }, [selectedFile, previewUrl, targetFormat]);

    const handleDownload = useCallback(() => {
        if (!convertedUrl || !selectedFile) return;

        const a = document.createElement('a');
        a.href = convertedUrl;
        const originalName = selectedFile.name.replace(/\.[^/.]+$/, '');
        a.download = `${originalName}.${targetFormat}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }, [convertedUrl, selectedFile, targetFormat]);

    return (
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
            <header>
                <h1 className="text-text-light dark:text-text-dark text-4xl font-black leading-tight tracking-[-0.033em]">图片格式转换</h1>
                <p className="text-subtle-light dark:text-subtle-dark text-base font-normal leading-normal mt-2">
                    支持 PNG、JPEG、WebP、GIF、BMP 等常见图片格式的互相转换。
                </p>
            </header>

            <div className="flex flex-col gap-4">
                <div>
                    <label className="flex items-center justify-center w-full px-6 py-8 border-2 border-dashed border-border-light dark:border-border-dark rounded-lg cursor-pointer hover:border-primary bg-surface-light dark:bg-surface-dark">
                        <div className="flex flex-col items-center gap-2">
                            <span className="material-symbols-outlined text-5xl text-primary">cloud_upload</span>
                            <span className="text-text-light dark:text-text-dark font-medium">
                                {selectedFile ? selectedFile.name : '点击选择图片或拖拽到此处'}
                            </span>
                            <span className="text-subtle-light dark:text-subtle-dark text-sm">
                                支持 PNG, JPEG, WebP, GIF, BMP
                            </span>
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="hidden"
                        />
                    </label>
                </div>

                {error && <p className="text-red-500 bg-red-100 dark:bg-red-900/50 p-3 rounded-lg">{error}</p>}

                {previewUrl && (
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="relative">
                            <label className="text-text-light dark:text-text-dark text-sm font-medium">目标格式</label>
                            <select
                                value={targetFormat}
                                onChange={(e) => setTargetFormat(e.target.value as ImageFormat)}
                                className="mt-1 w-full appearance-none rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-4 py-2.5 text-text-light dark:text-text-dark focus:border-primary focus:ring-primary/20 focus:ring-2"
                            >
                                <option value="png">PNG</option>
                                <option value="jpeg">JPEG</option>
                                <option value="webp">WebP</option>
                                <option value="gif">GIF</option>
                                <option value="bmp">BMP</option>
                            </select>
                        </div>

                        <button
                            onClick={handleConvert}
                            disabled={isConverting}
                            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg font-medium shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                        >
                            {isConverting ? <div className="spinner"></div> : <span className="material-symbols-outlined text-xl">transform</span>}
                            <span>{isConverting ? '转换中...' : '转换'}</span>
                        </button>

                        {convertedUrl && (
                            <button
                                onClick={handleDownload}
                                className="flex items-center justify-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-lg font-medium shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 mt-6"
                            >
                                <span className="material-symbols-outlined text-xl">download</span>
                                <span>下载</span>
                            </button>
                        )}
                    </div>
                )}
            </div>

            {previewUrl && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-text-light dark:text-text-dark text-base font-medium leading-normal mb-2">原图预览</h3>
                        <div className="bg-surface-light dark:bg-surface-dark rounded-lg border border-border-light dark:border-border-dark p-4 flex items-center justify-center min-h-64">
                            <img src={previewUrl} alt="原图" className="max-w-full max-h-96 object-contain" />
                        </div>
                    </div>

                    {convertedUrl && (
                        <div>
                            <h3 className="text-text-light dark:text-text-dark text-base font-medium leading-normal mb-2">转换后预览</h3>
                            <div className="bg-surface-light dark:bg-surface-dark rounded-lg border border-border-light dark:border-border-dark p-4 flex items-center justify-center min-h-64">
                                <img src={convertedUrl} alt="转换后" className="max-w-full max-h-96 object-contain" />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ImageConverterTool;

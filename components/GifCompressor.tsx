import React, { useState, useRef } from 'react';
import { parseGIF, decompressFrames } from 'gifuct-js';

const GifCompressor: React.FC = () => {
    const [originalSize, setOriginalSize] = useState<number>(0);
    const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
    const [compressedSize, setCompressedSize] = useState<number>(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [quality, setQuality] = useState(20);
    const [maxColors, setMaxColors] = useState(256);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setOriginalSize(file.size);
        setCompressedUrl(null);
        setCompressedSize(0);

        await compressGif(file);
    };

    const compressGif = async (file: File) => {
        setIsProcessing(true);

        try {
            const buffer = await file.arrayBuffer();
            const gif = parseGIF(buffer);
            const framesData = decompressFrames(gif, true);

            const canvas = canvasRef.current;
            if (!canvas) return;

            canvas.width = gif.lsd.width;
            canvas.height = gif.lsd.height;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = gif.lsd.width;
            tempCanvas.height = gif.lsd.height;
            const tempCtx = tempCanvas.getContext('2d');
            if (!tempCtx) return;

            const frameImages: { img: HTMLImageElement; delay: number }[] = [];

            for (let i = 0; i < framesData.length; i++) {
                const frame = framesData[i];

                const imageData = new ImageData(
                    new Uint8ClampedArray(frame.patch),
                    frame.dims.width,
                    frame.dims.height
                );

                tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
                tempCtx.putImageData(imageData, frame.dims.left, frame.dims.top);

                if (frame.disposalType === 2) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                }

                ctx.drawImage(tempCanvas, 0, 0);

                const img = new window.Image();
                img.src = canvas.toDataURL('image/png', quality / 100);
                frameImages.push({ img, delay: frame.delay || 100 });

                if (framesData.length > 1 && i < framesData.length - 1) {
                    ctx.drawImage(tempCanvas, 0, 0);
                }
            }

            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gif.js/0.2.0/gif.js';
            script.onload = () => {
                const gifEncoder = new (window as any).GIF({
                    workers: 2,
                    quality: quality,
                    width: canvas.width,
                    height: canvas.height,
                });

                let loadedCount = 0;
                frameImages.forEach((item, index) => {
                    item.img.onload = () => {
                        loadedCount++;
                        if (loadedCount === frameImages.length) {
                            frameImages.forEach(f => {
                                gifEncoder.addFrame(f.img, { delay: f.delay, copy: true });
                            });
                            gifEncoder.render();
                        }
                    };
                    if (item.img.complete) {
                        item.img.onload(new Event('load'));
                    }
                });

                gifEncoder.on('finished', (blob: Blob) => {
                    setCompressedUrl(URL.createObjectURL(blob));
                    setCompressedSize(blob.size);
                    setIsProcessing(false);
                });
            };
            document.head.appendChild(script);
        } catch (error) {
            console.error('Failed to compress GIF:', error);
            setIsProcessing(false);
        }
    };

    const reCompress = async () => {
        const input = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (input?.files?.[0]) {
            await compressGif(input.files[0]);
        }
    };

    const downloadGif = () => {
        if (!compressedUrl) return;
        const a = document.createElement('a');
        a.href = compressedUrl;
        a.download = 'compressed.gif';
        a.click();
    };

    const formatSize = (bytes: number): string => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    };

    const getCompressionRatio = (): string => {
        if (compressedSize === 0) return '0';
        return (((originalSize - compressedSize) / originalSize) * 100).toFixed(1);
    };

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-4xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">GIF压缩</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">在线压缩GIF动图，减小文件大小</p>
            </div>

            <div className="w-full max-w-4xl space-y-6">
                <label className="block cursor-pointer">
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-primary transition-colors">
                        <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-gray-600 dark:text-gray-400">点击选择GIF文件</p>
                        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">支持 GIF 格式</p>
                    </div>
                    <input type="file" accept="image/gif" onChange={handleFileSelect} className="hidden" />
                </label>

                {isProcessing && (
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-gray-600 dark:text-gray-400">正在压缩GIF...</p>
                    </div>
                )}

                {!isProcessing && originalSize > 0 && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    压缩质量: {quality}（值越小压缩率越高）
                                </label>
                                <input
                                    type="range"
                                    min="1"
                                    max="30"
                                    value={quality}
                                    onChange={(e) => setQuality(parseInt(e.target.value))}
                                    className="w-full"
                                />
                            </div>
                            <div className="flex items-end">
                                <button
                                    onClick={reCompress}
                                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                                >
                                    重新压缩
                                </button>
                            </div>
                        </div>

                        {compressedUrl && (
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            原始大小: {formatSize(originalSize)}
                                        </div>
                                        <div className="text-lg font-medium text-gray-900 dark:text-white">
                                            压缩后: {formatSize(compressedSize)}
                                            <span className="text-green-500 ml-2">
                                                减少 {getCompressionRatio()}%
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={downloadGif}
                                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                    >
                                        下载压缩后的GIF
                                    </button>
                                </div>
                                <div className="flex justify-center">
                                    <img src={compressedUrl} alt="Compressed GIF" className="max-w-full max-h-[300px] rounded-lg" />
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <canvas ref={canvasRef} className="hidden" />

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">使用说明</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• 上传GIF文件后自动进行压缩</li>
                        <li>• 质量值越小，压缩率越高，画质越低</li>
                        <li>• 建议质量值在10-20之间，可根据需要调整</li>
                        <li>• 压缩过程在浏览器本地完成，不上传服务器</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default GifCompressor;

import React, { useState } from 'react';
import { errorHandler } from '../utils/errorHandler';
import { parseGIF, decompressFrames } from 'gifuct-js';

interface GifFrame {
    index: number;
    url: string;
    delay: number;
}

const GifSplitter: React.FC = () => {
    const [frames, setFrames] = useState<GifFrame[]>([]);
    const [gifInfo, setGifInfo] = useState<{ width: number; height: number; frameCount: number } | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsProcessing(true);
        setFrames([]);

        try {
            const buffer = await file.arrayBuffer();
            const gif = parseGIF(buffer);
            const framesData = decompressFrames(gif, true);

            setGifInfo({
                width: gif.lsd.width,
                height: gif.lsd.height,
                frameCount: framesData.length,
            });

            const canvas = document.createElement('canvas');
            canvas.width = gif.lsd.width;
            canvas.height = gif.lsd.height;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = gif.lsd.width;
            tempCanvas.height = gif.lsd.height;
            const tempCtx = tempCanvas.getContext('2d');
            if (!tempCtx) return;

            const generatedFrames: GifFrame[] = [];

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

                generatedFrames.push({
                    index: i + 1,
                    url: canvas.toDataURL('image/png'),
                    delay: frame.delay || 100,
                });

                if (framesData.length > 1 && i < framesData.length - 1) {
                    ctx.drawImage(tempCanvas, 0, 0);
                }
            }

            setFrames(generatedFrames);
        } catch (error) {
            errorHandler.error('GIF解析失败', error, { component: 'GifSplitter', action: 'parse' });
        }

        setIsProcessing(false);
    };

    const downloadFrame = (frame: GifFrame) => {
        const a = document.createElement('a');
        a.href = frame.url;
        a.download = `frame_${frame.index.toString().padStart(3, '0')}.png`;
        a.click();
    };

    const downloadAllFrames = () => {
        frames.forEach(frame => {
            setTimeout(() => downloadFrame(frame), 100 * frame.index);
        });
    };

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-4xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">GIF分解工具</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">将GIF动图拆分为单独的帧图片</p>
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
                        <p className="text-gray-600 dark:text-gray-400">正在解析GIF...</p>
                    </div>
                )}

                {gifInfo && (
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-300">
                                <span>尺寸: {gifInfo.width} x {gifInfo.height}</span>
                                <span>帧数: {gifInfo.frameCount}</span>
                            </div>
                            {frames.length > 0 && (
                                <button
                                    onClick={downloadAllFrames}
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                                >
                                    下载全部
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {frames.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="font-medium text-gray-900 dark:text-white">帧列表</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                            {frames.map(frame => (
                                <div key={frame.index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2 group">
                                    <img src={frame.url} alt={`Frame ${frame.index}`} className="w-full aspect-square object-contain rounded" />
                                    <div className="mt-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                        <span>#{frame.index}</span>
                                        <span>{frame.delay}ms</span>
                                    </div>
                                    <button
                                        onClick={() => downloadFrame(frame)}
                                        className="mt-2 w-full py-1 bg-primary/10 text-primary rounded text-xs hover:bg-primary/20 transition-colors"
                                    >
                                        下载
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">使用说明</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• 上传GIF文件后自动分解为所有帧</li>
                        <li>• 每帧显示延迟时间（毫秒）</li>
                        <li>• 可单独下载某一帧或批量下载全部</li>
                        <li>• 输出PNG格式图片</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default GifSplitter;

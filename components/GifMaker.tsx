import React, { useState, useRef } from 'react';

interface Frame {
    id: number;
    file: File;
    url: string;
    delay: number;
}

const GifMaker: React.FC = () => {
    const [frames, setFrames] = useState<Frame[]>([]);
    const [delay, setDelay] = useState(200);
    const [isProcessing, setIsProcessing] = useState(false);
    const [resultUrl, setResultUrl] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const newFrames = Array.from(files).map((file, index) => ({
            id: Date.now() + index,
            file,
            url: URL.createObjectURL(file),
            delay: delay,
        }));

        setFrames(prev => [...prev, ...newFrames]);
    };

    const updateFrameDelay = (id: number, newDelay: number) => {
        setFrames(prev => prev.map(f => f.id === id ? { ...f, delay: newDelay } : f));
    };

    const removeFrame = (id: number) => {
        setFrames(prev => {
            const frame = prev.find(f => f.id === id);
            if (frame) URL.revokeObjectURL(frame.url);
            return prev.filter(f => f.id !== id);
        });
    };

    const moveFrame = (id: number, direction: 'up' | 'down') => {
        setFrames(prev => {
            const index = prev.findIndex(f => f.id === id);
            if (index === -1) return prev;
            if (direction === 'up' && index === 0) return prev;
            if (direction === 'down' && index === prev.length - 1) return prev;

            const newFrames = [...prev];
            const swapIndex = direction === 'up' ? index - 1 : index + 1;
            [newFrames[index], newFrames[swapIndex]] = [newFrames[swapIndex], newFrames[index]];
            return newFrames;
        });
    };

    const createGif = async () => {
        if (frames.length < 2 || !canvasRef.current) return;

        setIsProcessing(true);

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const firstImg = new window.Image();
        firstImg.onload = async () => {
            canvas.width = firstImg.width;
            canvas.height = firstImg.height;

            const encodedFrames: string[] = [];

            for (const frame of frames) {
                const img = new window.Image();
                await new Promise<void>((resolve) => {
                    img.onload = () => {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx.drawImage(img, 0, 0);
                        encodedFrames.push(canvas.toDataURL('image/png'));
                        resolve();
                    };
                    img.src = frame.url;
                });
            }

            const gifScript = document.createElement('script');
            gifScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gif.js/0.2.0/gif.js';
            gifScript.onload = () => {
                const gif = new (window as any).GIF({
                    workers: 2,
                    quality: 10,
                    width: canvas.width,
                    height: canvas.height,
                });

                const loadFrame = (index: number) => {
                    if (index >= encodedFrames.length) {
                        gif.render();
                        return;
                    }

                    const img = new window.Image();
                    img.onload = () => {
                        gif.addFrame(img, { delay: frames[index].delay, copy: true });
                        loadFrame(index + 1);
                    };
                    img.src = encodedFrames[index];
                };

                loadFrame(0);

                gif.on('finished', (blob: Blob) => {
                    setResultUrl(URL.createObjectURL(blob));
                    setIsProcessing(false);
                });
            };
            document.head.appendChild(gifScript);
        };
        firstImg.src = frames[0].url;
    };

    const downloadGif = () => {
        if (!resultUrl) return;
        const a = document.createElement('a');
        a.href = resultUrl;
        a.download = 'animation.gif';
        a.click();
    };

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-4xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">GIF在线制作</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">将多张静态图片合成GIF动图</p>
            </div>

            <div className="w-full max-w-4xl space-y-6">
                <div className="flex items-center gap-4">
                    <label className="flex-1 cursor-pointer">
                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-primary transition-colors">
                            <svg className="mx-auto h-10 w-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <p className="text-gray-600 dark:text-gray-400">添加图片帧</p>
                        </div>
                        <input type="file" accept="image/*" multiple onChange={handleFileSelect} className="hidden" />
                    </label>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600 dark:text-gray-400">默认延迟:</label>
                        <input
                            type="range"
                            min="50"
                            max="2000"
                            value={delay}
                            onChange={(e) => setDelay(parseInt(e.target.value))}
                            className="w-32"
                        />
                        <span className="text-sm text-gray-900 dark:text-white">{delay}ms</span>
                    </div>
                </div>

                {frames.length > 0 && (
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <h3 className="font-medium text-gray-900 dark:text-white">帧列表 ({frames.length})</h3>
                            <button
                                onClick={createGif}
                                disabled={frames.length < 2 || isProcessing}
                                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                            >
                                {isProcessing ? '生成中...' : '生成GIF'}
                            </button>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {frames.map((frame, index) => (
                                <div key={frame.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2">
                                    <img src={frame.url} alt={`Frame ${index + 1}`} className="w-full aspect-square object-cover rounded" />
                                    <div className="mt-2 flex items-center justify-between">
                                        <span className="text-xs text-gray-500">#{index + 1}</span>
                                        <input
                                            type="number"
                                            value={frame.delay}
                                            onChange={(e) => updateFrameDelay(frame.id, parseInt(e.target.value) || 100)}
                                            className="w-16 px-1 py-0.5 text-xs border rounded dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <span className="text-xs text-gray-400">ms</span>
                                    </div>
                                    <div className="mt-1 flex justify-center gap-1">
                                        <button onClick={() => moveFrame(frame.id, 'up')} className="p-1 text-gray-400 hover:text-primary">↑</button>
                                        <button onClick={() => moveFrame(frame.id, 'down')} className="p-1 text-gray-400 hover:text-primary">↓</button>
                                        <button onClick={() => removeFrame(frame.id)} className="p-1 text-gray-400 hover:text-red-500">×</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {resultUrl && (
                    <div className="text-center space-y-4">
                        <img src={resultUrl} alt="Generated GIF" className="max-w-full max-h-[300px] mx-auto rounded-lg shadow-lg" />
                        <button
                            onClick={downloadGif}
                            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        >
                            下载GIF
                        </button>
                    </div>
                )}

                <canvas ref={canvasRef} className="hidden" />

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">使用说明</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• 至少添加2张图片才能生成GIF</li>
                        <li>• 拖动上下箭头调整帧顺序</li>
                        <li>• 延迟时间决定每帧显示时长，单位毫秒</li>
                        <li>• 建议使用相同尺寸的图片以获得最佳效果</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default GifMaker;

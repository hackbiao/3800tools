import React, { useState, useRef } from 'react';

const ImageToICO: React.FC = () => {
    const [image, setImage] = useState<string | null>(null);
    const [size, setSize] = useState(32);
    const [sizes, setSizes] = useState<number[]>([16, 32, 48, 64]);
    const [resultUrl, setResultUrl] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImage(url);
            setResultUrl(null);
        }
    };

    const toggleSize = (s: number) => {
        setSizes(prev => 
            prev.includes(s) 
                ? prev.filter(x => x !== s)
                : [...prev, s].sort((a, b) => a - b)
        );
    };

    const convertToICO = async () => {
        if (!image || !canvasRef.current || sizes.length === 0) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = new window.Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            const pngDataUrls: string[] = [];

            sizes.forEach(targetSize => {
                canvas.width = targetSize;
                canvas.height = targetSize;
                ctx.clearRect(0, 0, targetSize, targetSize);
                ctx.drawImage(img, 0, 0, targetSize, targetSize);
                pngDataUrls.push(canvas.toDataURL('image/png'));
            });

            const mainCanvas = document.createElement('canvas');
            mainCanvas.width = size;
            mainCanvas.height = size;
            const mainCtx = mainCanvas.getContext('2d');
            if (mainCtx) {
                mainCtx.drawImage(img, 0, 0, size, size);
                setResultUrl(mainCanvas.toDataURL('image/png'));
            }
        };
        img.src = image;
    };

    const downloadICO = () => {
        if (!resultUrl) return;
        const a = document.createElement('a');
        a.href = resultUrl;
        a.download = 'favicon.png';
        a.click();
    };

    const downloadPNG = (targetSize: number) => {
        if (!image || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = new window.Image();
        img.onload = () => {
            canvas.width = targetSize;
            canvas.height = targetSize;
            ctx.clearRect(0, 0, targetSize, targetSize);
            ctx.drawImage(img, 0, 0, targetSize, targetSize);
            
            const a = document.createElement('a');
            a.href = canvas.toDataURL('image/png');
            a.download = `favicon_${targetSize}x${targetSize}.png`;
            a.click();
        };
        img.src = image;
    };

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-4xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">图片转ICO图标</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">在线将图片转换为网站图标，支持多种尺寸</p>
            </div>

            <div className="w-full max-w-4xl space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <label className="block">
                            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                                <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p className="text-gray-600 dark:text-gray-400">点击选择图片</p>
                                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">支持 PNG、JPG 格式</p>
                            </div>
                            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        </label>

                        {image && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">选择尺寸（可多选）</label>
                                    <div className="flex flex-wrap gap-2">
                                        {[16, 32, 48, 64, 128, 256].map(s => (
                                            <button
                                                key={s}
                                                onClick={() => toggleSize(s)}
                                                className={`px-3 py-1.5 rounded-lg text-sm ${sizes.includes(s) ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                                            >
                                                {s}x{s}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">预览尺寸: {size}x{size}</label>
                                    <input
                                        type="range"
                                        min="16"
                                        max="256"
                                        value={size}
                                        onChange={(e) => setSize(parseInt(e.target.value))}
                                        className="w-full"
                                    />
                                </div>

                                <button
                                    onClick={convertToICO}
                                    className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                                >
                                    生成图标
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg p-4 min-h-[400px]">
                        {resultUrl ? (
                            <div className="space-y-4 text-center">
                                <div className="flex flex-wrap justify-center gap-4 mb-4">
                                    {sizes.map(s => (
                                        <div key={s} className="text-center">
                                            <img src={resultUrl} alt={`Icon ${s}x${s}`} style={{ width: Math.min(s, 64), height: Math.min(s, 64) }} className="mx-auto rounded shadow" />
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s}x{s}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {sizes.map(s => (
                                        <button
                                            key={s}
                                            onClick={() => downloadPNG(s)}
                                            className="px-3 py-1.5 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors"
                                        >
                                            下载 {s}x{s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : image ? (
                            <img src={image} alt="Preview" className="max-w-full max-h-[300px] rounded-lg" />
                        ) : (
                            <p className="text-gray-400 dark:text-gray-500">预览区域</p>
                        )}
                    </div>
                </div>

                <canvas ref={canvasRef} className="hidden" />

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">使用说明</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• 上传正方形图片效果最佳，非正方形图片会自动居中裁剪</li>
                        <li>• 16x16 是浏览器标签页图标的标准尺寸</li>
                        <li>• 32x32 是 Windows 任务栏图标的常用尺寸</li>
                        <li>• 输出 PNG 格式，可重命名为 .ico 使用</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ImageToICO;

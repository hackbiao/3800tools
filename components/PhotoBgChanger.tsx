import React, { useState, useRef, useCallback } from 'react';

const PhotoBgChanger: React.FC = () => {
    const [image, setImage] = useState<string | null>(null);
    const [targetColor, setTargetColor] = useState('#438EDB');
    const [tolerance, setTolerance] = useState(50);
    const [resultUrl, setResultUrl] = useState<string | null>(null);
    const [originalColor, setOriginalColor] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const presetColors = [
        { name: '蓝色', color: '#438EDB' },
        { name: '红色', color: '#D93A3A' },
        { name: '白色', color: '#FFFFFF' },
        { name: '灰色', color: '#E5E5E5' },
    ];

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (image) {
                URL.revokeObjectURL(image);
            }
            const url = URL.createObjectURL(file);
            setImage(url);
            setResultUrl(null);
            setOriginalColor(null);
        }
    };

    const rgbToHex = (r: number, g: number, b: number): string => {
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    };

    const colorDistance = (r1: number, g1: number, b1: number, r2: number, g2: number, b2: number): number => {
        return Math.sqrt(
            Math.pow(r1 - r2, 2) +
            Math.pow(g1 - g2, 2) +
            Math.pow(b1 - b2, 2)
        );
    };

    const detectBackgroundColor = useCallback(() => {
        if (!image || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        const img = new window.Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const sampleSize = 20;
            const samples: { r: number; g: number; b: number }[] = [];

            const corners = [
                { x: 0, y: 0 },
                { x: img.width - sampleSize, y: 0 },
                { x: 0, y: img.height - sampleSize },
                { x: img.width - sampleSize, y: img.height - sampleSize },
            ];

            corners.forEach(corner => {
                const imageData = ctx.getImageData(corner.x, corner.y, sampleSize, sampleSize);
                const data = imageData.data;
                for (let i = 0; i < data.length; i += 4) {
                    samples.push({ r: data[i], g: data[i + 1], b: data[i + 2] });
                }
            });

            const avgR = Math.round(samples.reduce((sum, s) => sum + s.r, 0) / samples.length);
            const avgG = Math.round(samples.reduce((sum, s) => sum + s.g, 0) / samples.length);
            const avgB = Math.round(samples.reduce((sum, s) => sum + s.b, 0) / samples.length);

            const hex = rgbToHex(avgR, avgG, avgB);
            setOriginalColor(hex);
        };
        img.onerror = () => {
            console.error('图片加载失败');
        };
        img.src = image;
    }, [image]);

    const changeBackground = useCallback(() => {
        if (!image || !canvasRef.current || !originalColor) return;

        setIsProcessing(true);

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) {
            setIsProcessing(false);
            return;
        }

        const img = new window.Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            const width = canvas.width;
            const height = canvas.height;

            const targetR = parseInt(originalColor.slice(1, 3), 16);
            const targetG = parseInt(originalColor.slice(3, 5), 16);
            const targetB = parseInt(originalColor.slice(5, 7), 16);

            let newR: number, newG: number, newB: number;

            if (targetColor.startsWith('gradient-blue')) {
                newR = 67;
                newG = 142;
                newB = 219;
            } else if (targetColor.startsWith('gradient-red')) {
                newR = 217;
                newG = 58;
                newB = 58;
            } else {
                newR = parseInt(targetColor.slice(1, 3), 16);
                newG = parseInt(targetColor.slice(3, 5), 16);
                newB = parseInt(targetColor.slice(5, 7), 16);
            }

            const toleranceSq = tolerance * tolerance;

            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const i = (y * width + x) * 4;
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];

                    const distSq = Math.pow(r - targetR, 2) +
                                   Math.pow(g - targetG, 2) +
                                   Math.pow(b - targetB, 2);

                    if (distSq < toleranceSq) {
                        const ratio = Math.sqrt(distSq) / tolerance;
                        const alpha = Math.pow(ratio, 2);

                        data[i] = Math.round(r * alpha + newR * (1 - alpha));
                        data[i + 1] = Math.round(g * alpha + newG * (1 - alpha));
                        data[i + 2] = Math.round(b * alpha + newB * (1 - alpha));
                    }
                }
            }

            ctx.putImageData(imageData, 0, 0);
            setResultUrl(canvas.toDataURL('image/png'));
            setIsProcessing(false);
        };
        img.onerror = () => {
            console.error('图片加载失败');
            setIsProcessing(false);
        };
        img.src = image;
    }, [image, originalColor, targetColor, tolerance]);

    const downloadImage = () => {
        if (!resultUrl) return;
        const a = document.createElement('a');
        a.href = resultUrl;
        a.download = 'photo_new_bg.png';
        a.click();
    };

    const resetAll = () => {
        if (image) {
            URL.revokeObjectURL(image);
        }
        setImage(null);
        setResultUrl(null);
        setOriginalColor(null);
    };

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-4xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">证件照换底色</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">在线更换证件照背景颜色，支持红底、蓝底、白底</p>
            </div>

            <div className="w-full max-w-4xl space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <label className="block cursor-pointer">
                            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-primary transition-colors">
                                <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p className="text-gray-600 dark:text-gray-400">点击上传证件照</p>
                            </div>
                            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        </label>

                        {image && (
                            <div className="space-y-4">
                                <button
                                    onClick={detectBackgroundColor}
                                    className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                >
                                    检测原始背景色
                                </button>

                                {originalColor && (
                                    <div className="flex items-center gap-2 text-sm p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <span className="text-gray-600 dark:text-gray-400">检测到的背景色:</span>
                                        <div className="w-6 h-6 rounded border border-gray-300 dark:border-gray-600" style={{ backgroundColor: originalColor }}></div>
                                        <span className="text-gray-900 dark:text-white font-mono">{originalColor.toUpperCase()}</span>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">选择新背景色</label>
                                    <div className="flex flex-wrap gap-2">
                                        {presetColors.map(preset => (
                                            <button
                                                key={preset.color}
                                                onClick={() => setTargetColor(preset.color)}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${targetColor === preset.color ? 'ring-2 ring-primary ring-offset-2' : ''} ${preset.color === '#FFFFFF' ? 'bg-white text-gray-700 border border-gray-300' : ''}`}
                                                style={preset.color !== '#FFFFFF' ? { backgroundColor: preset.color, color: '#fff' } : undefined}
                                            >
                                                {preset.name}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="mt-3 flex items-center gap-3">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">自定义颜色:</span>
                                        <input
                                            type="color"
                                            value={targetColor}
                                            onChange={(e) => setTargetColor(e.target.value)}
                                            className="w-10 h-10 rounded cursor-pointer border-0"
                                        />
                                        <span className="text-sm text-gray-500 font-mono">{targetColor.toUpperCase()}</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        容差: {tolerance}
                                        <span className="text-gray-400 font-normal ml-2">(值越大替换范围越广)</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="10"
                                        max="150"
                                        value={tolerance}
                                        onChange={(e) => setTolerance(parseInt(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                                    />
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={changeBackground}
                                        disabled={!originalColor || isProcessing}
                                        className="flex-1 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                                    >
                                        {isProcessing ? '处理中...' : '更换背景'}
                                    </button>
                                    <button
                                        onClick={resetAll}
                                        className="px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                                    >
                                        重置
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg p-4 min-h-[400px]">
                        {resultUrl ? (
                            <div className="space-y-4 w-full">
                                <div className="relative">
                                    <img src={resultUrl} alt="Result" className="max-w-full max-h-[350px] mx-auto rounded-lg shadow-lg" />
                                </div>
                                <button
                                    onClick={downloadImage}
                                    className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                                >
                                    下载图片
                                </button>
                            </div>
                        ) : image ? (
                            <div className="text-center">
                                <img src={image} alt="Preview" className="max-w-full max-h-[350px] rounded-lg shadow" />
                                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">点击"检测原始背景色"开始处理</p>
                            </div>
                        ) : (
                            <div className="text-center">
                                <svg className="mx-auto h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p className="text-gray-400 dark:text-gray-500">上传图片后预览</p>
                            </div>
                        )}
                    </div>
                </div>

                <canvas ref={canvasRef} className="hidden" />

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">使用说明</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• 上传证件照后，点击"检测原始背景色"自动识别背景</li>
                        <li>• 选择需要更换的目标背景颜色（蓝底/红底/白底/自定义）</li>
                        <li>• 调整容差值：值越大，替换的背景范围越广</li>
                        <li>• 点击"更换背景"生成新图片，然后下载保存</li>
                        <li>• 适用于背景颜色较为单一的证件照</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PhotoBgChanger;

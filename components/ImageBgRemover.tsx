import React, { useState, useRef } from 'react';

const ImageBgRemover: React.FC = () => {
    const [image, setImage] = useState<string | null>(null);
    const [tolerance, setTolerance] = useState(30);
    const [bgColor, setBgColor] = useState('#ffffff');
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

    const removeBackground = () => {
        if (!image || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = new window.Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            const targetR = parseInt(bgColor.slice(1, 3), 16);
            const targetG = parseInt(bgColor.slice(3, 5), 16);
            const targetB = parseInt(bgColor.slice(5, 7), 16);

            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];

                const distance = Math.sqrt(
                    Math.pow(r - targetR, 2) +
                    Math.pow(g - targetG, 2) +
                    Math.pow(b - targetB, 2)
                );

                if (distance < tolerance) {
                    data[i + 3] = 0;
                }
            }

            ctx.putImageData(imageData, 0, 0);
            setResultUrl(canvas.toDataURL('image/png'));
        };
        img.src = image;
    };

    const pickColorFromImage = (e: React.MouseEvent<HTMLImageElement>) => {
        if (!canvasRef.current || !image) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = e.target as HTMLImageElement;
        const rect = img.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * img.naturalWidth;
        const y = ((e.clientY - rect.top) / rect.height) * img.naturalHeight;

        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);

        const pixel = ctx.getImageData(Math.floor(x), Math.floor(y), 1, 1).data;
        const hex = `#${pixel[0].toString(16).padStart(2, '0')}${pixel[1].toString(16).padStart(2, '0')}${pixel[2].toString(16).padStart(2, '0')}`;
        setBgColor(hex);
    };

    const downloadImage = () => {
        if (!resultUrl) return;
        const a = document.createElement('a');
        a.href = resultUrl;
        a.download = 'transparent_image.png';
        a.click();
    };

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-4xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">图片去底色</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">在线去除图片背景色，生成透明背景图片</p>
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
                                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">点击图片可吸取颜色</p>
                            </div>
                            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        </label>

                        {image && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">目标颜色（点击图片吸取）</label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="color"
                                            value={bgColor}
                                            onChange={(e) => setBgColor(e.target.value)}
                                            className="w-12 h-10 rounded cursor-pointer"
                                        />
                                        <input
                                            type="text"
                                            value={bgColor}
                                            onChange={(e) => setBgColor(e.target.value)}
                                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">容差: {tolerance}</label>
                                    <input
                                        type="range"
                                        min="1"
                                        max="100"
                                        value={tolerance}
                                        onChange={(e) => setTolerance(parseInt(e.target.value))}
                                        className="w-full"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">值越大，移除的颜色范围越广</p>
                                </div>

                                <button
                                    onClick={removeBackground}
                                    className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                                >
                                    去除背景
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col items-center justify-center rounded-lg p-4 min-h-[400px]" style={{ background: 'repeating-conic-gradient(#ccc 0% 25%, white 0% 50%) 50% / 20px 20px' }}>
                        {resultUrl ? (
                            <div className="space-y-4">
                                <img src={resultUrl} alt="Result" className="max-w-full max-h-[400px] rounded-lg shadow-lg" />
                                <button
                                    onClick={downloadImage}
                                    className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                >
                                    下载透明图片
                                </button>
                            </div>
                        ) : image ? (
                            <img src={image} alt="Preview" className="max-w-full max-h-[400px] rounded-lg cursor-crosshair" onClick={pickColorFromImage} />
                        ) : (
                            <p className="text-gray-400 dark:text-gray-500">预览区域</p>
                        )}
                    </div>
                </div>

                <canvas ref={canvasRef} className="hidden" />

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">使用说明</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• 上传图片后，点击图片可吸取要移除的颜色</li>
                        <li>• 调整容差值可以控制移除颜色的范围</li>
                        <li>• 适用于背景色单一的图片，复杂背景效果有限</li>
                        <li>• 输出 PNG 格式，支持透明背景</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ImageBgRemover;

import React, { useState, useRef } from 'react';

const ImageWatermark: React.FC = () => {
    const [image, setImage] = useState<string | null>(null);
    const [watermarkText, setWatermarkText] = useState('水印文字');
    const [fontSize, setFontSize] = useState(24);
    const [fontColor, setFontColor] = useState('#ffffff');
    const [opacity, setOpacity] = useState(50);
    const [position, setPosition] = useState<'center' | 'tile' | 'bottom-right'>('center');
    const [rotation, setRotation] = useState(-30);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [resultUrl, setResultUrl] = useState<string | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImage(url);
            setResultUrl(null);
        }
    };

    const addWatermark = () => {
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

            ctx.font = `${fontSize}px Arial`;
            ctx.fillStyle = fontColor;
            ctx.globalAlpha = opacity / 100;

            const textWidth = ctx.measureText(watermarkText).width;
            const textHeight = fontSize;

            if (position === 'center') {
                ctx.save();
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.rotate((rotation * Math.PI) / 180);
                ctx.fillText(watermarkText, -textWidth / 2, textHeight / 2);
                ctx.restore();
            } else if (position === 'bottom-right') {
                const padding = 20;
                ctx.fillText(watermarkText, canvas.width - textWidth - padding, canvas.height - padding);
            } else if (position === 'tile') {
                const gapX = textWidth + 100;
                const gapY = textHeight + 80;
                ctx.save();
                for (let y = 0; y < canvas.height + gapY; y += gapY) {
                    for (let x = 0; x < canvas.width + gapX; x += gapX) {
                        ctx.save();
                        ctx.translate(x + textWidth / 2, y + textHeight / 2);
                        ctx.rotate((rotation * Math.PI) / 180);
                        ctx.fillText(watermarkText, -textWidth / 2, textHeight / 2);
                        ctx.restore();
                    }
                }
                ctx.restore();
            }

            ctx.globalAlpha = 1;
            setResultUrl(canvas.toDataURL('image/png'));
        };
        img.src = image;
    };

    const downloadImage = () => {
        if (!resultUrl) return;
        const a = document.createElement('a');
        a.href = resultUrl;
        a.download = 'watermarked_image.png';
        a.click();
    };

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-4xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">图片加水印</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">在线为图片添加文字水印，支持多种样式</p>
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
                            </div>
                            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        </label>

                        {image && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">水印文字</label>
                                    <input
                                        type="text"
                                        value={watermarkText}
                                        onChange={(e) => setWatermarkText(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">字体大小: {fontSize}px</label>
                                        <input
                                            type="range"
                                            min="12"
                                            max="72"
                                            value={fontSize}
                                            onChange={(e) => setFontSize(parseInt(e.target.value))}
                                            className="w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">透明度: {opacity}%</label>
                                        <input
                                            type="range"
                                            min="10"
                                            max="100"
                                            value={opacity}
                                            onChange={(e) => setOpacity(parseInt(e.target.value))}
                                            className="w-full"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">字体颜色</label>
                                        <input
                                            type="color"
                                            value={fontColor}
                                            onChange={(e) => setFontColor(e.target.value)}
                                            className="w-full h-10 rounded cursor-pointer"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">旋转角度: {rotation}°</label>
                                        <input
                                            type="range"
                                            min="-90"
                                            max="90"
                                            value={rotation}
                                            onChange={(e) => setRotation(parseInt(e.target.value))}
                                            className="w-full"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">水印位置</label>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setPosition('center')}
                                            className={`flex-1 px-3 py-2 rounded-lg text-sm ${position === 'center' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                                        >
                                            居中
                                        </button>
                                        <button
                                            onClick={() => setPosition('tile')}
                                            className={`flex-1 px-3 py-2 rounded-lg text-sm ${position === 'tile' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                                        >
                                            平铺
                                        </button>
                                        <button
                                            onClick={() => setPosition('bottom-right')}
                                            className={`flex-1 px-3 py-2 rounded-lg text-sm ${position === 'bottom-right' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                                        >
                                            右下角
                                        </button>
                                    </div>
                                </div>

                                <button
                                    onClick={addWatermark}
                                    className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                                >
                                    添加水印
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg p-4 min-h-[400px]">
                        {resultUrl ? (
                            <div className="space-y-4">
                                <img src={resultUrl} alt="Result" className="max-w-full max-h-[400px] rounded-lg shadow-lg" />
                                <button
                                    onClick={downloadImage}
                                    className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                >
                                    下载图片
                                </button>
                            </div>
                        ) : image ? (
                            <img src={image} alt="Preview" className="max-w-full max-h-[400px] rounded-lg" />
                        ) : (
                            <p className="text-gray-400 dark:text-gray-500">预览区域</p>
                        )}
                    </div>
                </div>

                <canvas ref={canvasRef} className="hidden" />
            </div>
        </div>
    );
};

export default ImageWatermark;

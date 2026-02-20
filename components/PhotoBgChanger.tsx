import React, { useState, useRef } from 'react';

const PhotoBgChanger: React.FC = () => {
    const [image, setImage] = useState<string | null>(null);
    const [targetColor, setTargetColor] = useState('#438EDB');
    const [tolerance, setTolerance] = useState(30);
    const [resultUrl, setResultUrl] = useState<string | null>(null);
    const [originalColor, setOriginalColor] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const presetColors = [
        { name: '蓝色', color: '#438EDB' },
        { name: '红色', color: '#D93A3A' },
        { name: '白色', color: '#FFFFFF' },
        { name: '灰色', color: '#E5E5E5' },
        { name: '渐变蓝', color: 'gradient-blue' },
        { name: '渐变红', color: 'gradient-red' },
    ];

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImage(url);
            setResultUrl(null);
            setOriginalColor(null);
        }
    };

    const detectBackgroundColor = () => {
        if (!image || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = new window.Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const corners = [
                ctx.getImageData(0, 0, 1, 1).data,
                ctx.getImageData(img.width - 1, 0, 1, 1).data,
                ctx.getImageData(0, img.height - 1, 1, 1).data,
                ctx.getImageData(img.width - 1, img.height - 1, 1, 1).data,
            ];

            const avgR = Math.round(corners.reduce((sum, c) => sum + c[0], 0) / 4);
            const avgG = Math.round(corners.reduce((sum, c) => sum + c[1], 0) / 4);
            const avgB = Math.round(corners.reduce((sum, c) => sum + c[2], 0) / 4);

            const hex = `#${avgR.toString(16).padStart(2, '0')}${avgG.toString(16).padStart(2, '0')}${avgB.toString(16).padStart(2, '0')}`;
            setOriginalColor(hex);
        };
        img.src = image;
    };

    const changeBackground = () => {
        if (!image || !canvasRef.current || !originalColor) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = new window.Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;

            if (targetColor === 'gradient-blue') {
                const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
                gradient.addColorStop(0, '#667eea');
                gradient.addColorStop(1, '#764ba2');
                ctx.fillStyle = gradient;
            } else if (targetColor === 'gradient-red') {
                const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
                gradient.addColorStop(0, '#ff416c');
                gradient.addColorStop(1, '#ff4b2b');
                ctx.fillStyle = gradient;
            } else {
                ctx.fillStyle = targetColor;
            }
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            const targetR = parseInt(originalColor.slice(1, 3), 16);
            const targetG = parseInt(originalColor.slice(3, 5), 16);
            const targetB = parseInt(originalColor.slice(5, 7), 16);

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
                    if (targetColor === 'gradient-blue') {
                        const ratio = Math.floor(i / 4 / canvas.width) / canvas.height;
                        data[i] = Math.round(102 + ratio * (118 - 102));
                        data[i + 1] = Math.round(126 + ratio * (75 - 126));
                        data[i + 2] = Math.round(234 + ratio * (162 - 234));
                    } else if (targetColor === 'gradient-red') {
                        const ratio = Math.floor(i / 4 / canvas.width) / canvas.height;
                        data[i] = Math.round(255 + ratio * (255 - 255));
                        data[i + 1] = Math.round(65 + ratio * (75 - 65));
                        data[i + 2] = Math.round(108 + ratio * (43 - 108));
                    } else {
                        data[i] = parseInt(targetColor.slice(1, 3), 16);
                        data[i + 1] = parseInt(targetColor.slice(3, 5), 16);
                        data[i + 2] = parseInt(targetColor.slice(5, 7), 16);
                    }
                }
            }

            ctx.putImageData(imageData, 0, 0);
            setResultUrl(canvas.toDataURL('image/png'));
        };
        img.src = image;
    };

    const downloadImage = () => {
        if (!resultUrl) return;
        const a = document.createElement('a');
        a.href = resultUrl;
        a.download = 'photo_new_bg.png';
        a.click();
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
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">检测到的背景色:</span>
                                        <div className="w-6 h-6 rounded border" style={{ backgroundColor: originalColor }}></div>
                                        <span className="text-gray-900 dark:text-white">{originalColor}</span>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">选择新背景色</label>
                                    <div className="flex flex-wrap gap-2">
                                        {presetColors.map(preset => (
                                            <button
                                                key={preset.color}
                                                onClick={() => setTargetColor(preset.color)}
                                                className={`px-3 py-2 rounded-lg text-sm flex items-center gap-2 ${targetColor === preset.color ? 'ring-2 ring-primary' : ''} ${preset.color === '#FFFFFF' ? 'bg-white text-gray-700 border' : ''}`}
                                                style={preset.color.startsWith('#') ? { backgroundColor: preset.color, color: preset.color === '#FFFFFF' ? '#333' : '#fff' } : { background: preset.color === 'gradient-blue' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)', color: '#fff' }}
                                            >
                                                {preset.name}
                                            </button>
                                        ))}
                                    </div>
                                    {targetColor.startsWith('#') && (
                                        <div className="mt-2 flex items-center gap-2">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">自定义:</span>
                                            <input
                                                type="color"
                                                value={targetColor}
                                                onChange={(e) => setTargetColor(e.target.value)}
                                                className="w-10 h-8 rounded cursor-pointer"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">容差: {tolerance}</label>
                                    <input
                                        type="range"
                                        min="10"
                                        max="100"
                                        value={tolerance}
                                        onChange={(e) => setTolerance(parseInt(e.target.value))}
                                        className="w-full"
                                    />
                                </div>

                                <button
                                    onClick={changeBackground}
                                    disabled={!originalColor}
                                    className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                                >
                                    更换背景
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg p-4 min-h-[400px]">
                        {resultUrl ? (
                            <div className="space-y-4">
                                <img src={resultUrl} alt="Result" className="max-w-full max-h-[350px] rounded-lg shadow-lg" />
                                <button
                                    onClick={downloadImage}
                                    className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                >
                                    下载图片
                                </button>
                            </div>
                        ) : image ? (
                            <img src={image} alt="Preview" className="max-w-full max-h-[350px] rounded-lg" />
                        ) : (
                            <p className="text-gray-400 dark:text-gray-500">预览区域</p>
                        )}
                    </div>
                </div>

                <canvas ref={canvasRef} className="hidden" />

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">使用说明</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• 上传证件照后，先点击"检测原始背景色"</li>
                        <li>• 选择需要更换的目标背景颜色</li>
                        <li>• 调整容差值以获得最佳效果</li>
                        <li>• 适用于背景颜色单一的证件照</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PhotoBgChanger;

import React, { useState, useCallback, useRef, useEffect } from 'react';

interface QRCodeOptions {
    size: number;
    margin: number;
    darkColor: string;
    lightColor: string;
    errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
}

const QRCodeGenerator: React.FC = () => {
    const [text, setText] = useState('https://tools.3800ai.com');
    const [options, setOptions] = useState<QRCodeOptions>({
        size: 256,
        margin: 2,
        darkColor: '#000000',
        lightColor: '#ffffff',
        errorCorrectionLevel: 'M',
    });
    const [dataUrl, setDataUrl] = useState<string>('');
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const generateQRCode = useCallback(async () => {
        if (!text || !canvasRef.current) return;

        try {
            const QRCode = await import('qrcode');
            const canvas = canvasRef.current;
            
            await QRCode.toCanvas(canvas, text, {
                width: options.size,
                margin: options.margin,
                color: {
                    dark: options.darkColor,
                    light: options.lightColor,
                },
                errorCorrectionLevel: options.errorCorrectionLevel,
            });

            setDataUrl(canvas.toDataURL('image/png'));
        } catch (error) {
            console.error('QR Code generation failed:', error);
        }
    }, [text, options]);

    useEffect(() => {
        generateQRCode();
    }, [generateQRCode]);

    const handleDownload = useCallback(() => {
        if (!dataUrl) return;
        
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = dataUrl;
        link.click();
    }, [dataUrl]);

    const handleCopy = useCallback(async () => {
        if (!canvasRef.current) return;
        
        try {
            const blob = await new Promise<Blob>((resolve) => {
                canvasRef.current!.toBlob((b) => resolve(b!), 'image/png');
            });
            await navigator.clipboard.write([
                new ClipboardItem({ 'image/png': blob }),
            ]);
            alert('已复制到剪贴板');
        } catch (error) {
            console.error('Copy failed:', error);
        }
    }, []);

    const presetColors = [
        { dark: '#000000', light: '#ffffff', name: '黑白' },
        { dark: '#607AFB', light: '#ffffff', name: '蓝色' },
        { dark: '#10B981', light: '#ffffff', name: '绿色' },
        { dark: '#EF4444', light: '#ffffff', name: '红色' },
        { dark: '#8B5CF6', light: '#ffffff', name: '紫色' },
        { dark: '#F59E0B', light: '#ffffff', name: '橙色' },
    ];

    return (
        <div className="flex w-full flex-col items-center px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-4xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">
                    二维码生成器
                </p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                    输入文本或链接，一键生成二维码图片
                </p>
            </div>

            <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 输入区域 */}
                <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/20 shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        内容设置
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                二维码内容
                            </label>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                rows={3}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none"
                                placeholder="输入网址、文本或其他内容"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                尺寸大小
                            </label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="range"
                                    min="128"
                                    max="512"
                                    step="32"
                                    value={options.size}
                                    onChange={(e) => setOptions({ ...options, size: parseInt(e.target.value) })}
                                    className="flex-1"
                                />
                                <span className="text-sm text-gray-600 dark:text-gray-400 w-16 text-right">
                                    {options.size}px
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                预设颜色
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {presetColors.map((preset) => (
                                    <button
                                        key={preset.name}
                                        onClick={() => setOptions({
                                            ...options,
                                            darkColor: preset.dark,
                                            lightColor: preset.light,
                                        })}
                                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                            options.darkColor === preset.dark
                                                ? 'bg-primary text-white'
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                        }`}
                                    >
                                        {preset.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    前景色
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="color"
                                        value={options.darkColor}
                                        onChange={(e) => setOptions({ ...options, darkColor: e.target.value })}
                                        className="w-10 h-10 rounded cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        value={options.darkColor}
                                        onChange={(e) => setOptions({ ...options, darkColor: e.target.value })}
                                        className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    背景色
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="color"
                                        value={options.lightColor}
                                        onChange={(e) => setOptions({ ...options, lightColor: e.target.value })}
                                        className="w-10 h-10 rounded cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        value={options.lightColor}
                                        onChange={(e) => setOptions({ ...options, lightColor: e.target.value })}
                                        className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                容错级别
                            </label>
                            <div className="grid grid-cols-4 gap-2">
                                {(['L', 'M', 'Q', 'H'] as const).map((level) => (
                                    <button
                                        key={level}
                                        onClick={() => setOptions({ ...options, errorCorrectionLevel: level })}
                                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                            options.errorCorrectionLevel === level
                                                ? 'bg-primary text-white'
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                        }`}
                                    >
                                        {level === 'L' && '低 (7%)'}
                                        {level === 'M' && '中 (15%)'}
                                        {level === 'Q' && '较高 (25%)'}
                                        {level === 'H' && '高 (30%)'}
                                    </button>
                                ))}
                            </div>
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                容错级别越高，二维码可被遮挡面积越大，但尺寸也会变大
                            </p>
                        </div>
                    </div>
                </div>

                {/* 预览区域 */}
                <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/20 shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        预览
                    </h3>

                    <div className="flex flex-col items-center">
                        <div 
                            className="p-4 rounded-xl"
                            style={{ backgroundColor: options.lightColor }}
                        >
                            <canvas 
                                ref={canvasRef}
                                className="max-w-full"
                            />
                        </div>

                        <div className="flex gap-2 mt-4">
                            <button
                                onClick={handleDownload}
                                disabled={!dataUrl}
                                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="material-symbols-outlined text-lg">download</span>
                                下载图片
                            </button>
                            <button
                                onClick={handleCopy}
                                disabled={!dataUrl}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="material-symbols-outlined text-lg">content_copy</span>
                                复制图片
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 说明 */}
            <div className="w-full max-w-4xl mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">使用说明</h4>
                <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                    <li>• 支持文本、网址、电话、邮箱、WiFi等多种内容</li>
                    <li>• 可自定义颜色、尺寸、容错级别</li>
                    <li>• 建议打印时尺寸不小于 2cm × 2cm 以保证识别率</li>
                    <li>• 二维码生成在本地完成，不上传任何数据</li>
                </ul>
            </div>
        </div>
    );
};

export default QRCodeGenerator;

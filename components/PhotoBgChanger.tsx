import React, { useState, useRef } from 'react';
import { errorHandler } from '../utils/errorHandler';

declare global {
    interface Window {
        bodySegmentation: any;
    }
}

const PhotoBgChanger: React.FC = () => {
    const [image, setImage] = useState<string | null>(null);
    const [targetColor, setTargetColor] = useState('#438EDB');
    const [resultUrl, setResultUrl] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const segmenterRef = useRef<any>(null);

    const presetColors = [
        { name: '蓝色', color: '#438EDB' },
        { name: '红色', color: '#D93A3A' },
        { name: '白色', color: '#FFFFFF' },
        { name: '灰色', color: '#CCCCCC' },
    ];

    const loadModel = async () => {
        if (segmenterRef.current) return;

        setIsProcessing(true);
        setLoadingProgress(10);
        setError(null);

        try {
            if (!window.bodySegmentation) {
                const script1 = document.createElement('script');
                script1.src = 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.17.0/dist/tf.min.js';
                document.head.appendChild(script1);
                await new Promise<void>((resolve, reject) => {
                    script1.onload = () => resolve();
                    script1.onerror = reject;
                });

                setLoadingProgress(30);

                const script2 = document.createElement('script');
                script2.src = 'https://cdn.jsdelivr.net/npm/@tensorflow-models/body-segmentation@1.0.1/dist/body-segmentation.min.js';
                document.head.appendChild(script2);
                await new Promise<void>((resolve, reject) => {
                    script2.onload = () => resolve();
                    script2.onerror = reject;
                });
            }

            setLoadingProgress(50);

            const model = window.bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation;
            const segmenter = await window.bodySegmentation.createSegmenter(model, {
                runtime: 'tfjs',
                solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation'
            });

            segmenterRef.current = segmenter;
            setLoadingProgress(100);
        } catch (err) {
            errorHandler.error('模型加载失败', err, { component: 'PhotoBgChanger', action: 'load-model' });
            setError('AI模型加载失败，请刷新页面重试');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (image) {
                URL.revokeObjectURL(image);
            }
            const url = URL.createObjectURL(file);
            setImage(url);
            setResultUrl(null);
            setError(null);
            
            await loadModel();
        }
    };

    const changeBackground = async () => {
        if (!image || !canvasRef.current) return;

        if (!segmenterRef.current) {
            await loadModel();
            if (!segmenterRef.current) {
                alert('模型加载失败，请刷新页面重试');
                return;
            }
        }

        setIsProcessing(true);
        setLoadingProgress(0);

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) {
            setIsProcessing(false);
            return;
        }

        try {
            const img = new window.Image();
            img.crossOrigin = 'anonymous';
            
            await new Promise<void>((resolve, reject) => {
                img.onload = () => resolve();
                img.onerror = () => reject();
                img.src = image;
            });

            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            setLoadingProgress(30);

            const segmentation = await segmenterRef.current.segmentPeople(img);
            const mask = segmentation[0]?.mask;
            
            if (!mask) {
                throw new Error('Segmentation failed');
            }

            setLoadingProgress(70);

            const maskData = await mask.toImageData();
            const originalData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = originalData.data;
            const width = canvas.width;
            const height = canvas.height;

            const targetR = parseInt(targetColor.slice(1, 3), 16);
            const targetG = parseInt(targetColor.slice(3, 5), 16);
            const targetB = parseInt(targetColor.slice(5, 7), 16);

            const maskCanvas = document.createElement('canvas');
            maskCanvas.width = width;
            maskCanvas.height = height;
            const maskCtx = maskCanvas.getContext('2d');
            if (maskCtx) {
                maskCtx.putImageData(maskData, 0, 0);
            }

            const maskImageData = maskCtx?.getImageData(0, 0, width, height);
            const maskDataArray = maskImageData?.data;

            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const i = (y * width + x) * 4;
                    const confidence = maskDataArray ? maskDataArray[i] / 255 : 0;
                    
                    if (confidence < 0.5) {
                        const blend = Math.pow(confidence, 0.5);
                        data[i] = Math.round(data[i] * blend + targetR * (1 - blend));
                        data[i + 1] = Math.round(data[i + 1] * blend + targetG * (1 - blend));
                        data[i + 2] = Math.round(data[i + 2] * blend + targetB * (1 - blend));
                    }
                }
            }

            ctx.putImageData(originalData, 0, 0);
            setResultUrl(canvas.toDataURL('image/png'));
            setLoadingProgress(100);
        } catch (err) {
            console.error('Processing failed:', err);
            setError('处理失败，请重试');
        } finally {
            setIsProcessing(false);
            setLoadingProgress(0);
        }
    };

    const downloadImage = () => {
        if (!resultUrl) return;
        const a = document.createElement('a');
        a.href = resultUrl;
        a.download = 'photo_bg_changed.png';
        a.click();
    };

    const resetAll = () => {
        if (image) {
            URL.revokeObjectURL(image);
        }
        setImage(null);
        setResultUrl(null);
        setError(null);
    };

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-4xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">证件照换底色</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">AI智能识别，一键更换证件照背景</p>
            </div>

            <div className="w-full max-w-4xl space-y-6">
                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                        <p className="text-red-700 dark:text-red-300">{error}</p>
                    </div>
                )}

                {isProcessing && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-blue-700 dark:text-blue-300">AI处理中...</span>
                            <span className="text-blue-700 dark:text-blue-300">{loadingProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                                className="bg-blue-500 h-2 rounded-full transition-all" 
                                style={{ width: `${loadingProgress}%` }}
                            ></div>
                        </div>
                    </div>
                )}

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
                                        <span className="text-sm text-gray-600 dark:text-gray-400">自定义:</span>
                                        <input
                                            type="color"
                                            value={targetColor}
                                            onChange={(e) => setTargetColor(e.target.value)}
                                            className="w-10 h-10 rounded cursor-pointer border-0"
                                        />
                                        <span className="text-sm text-gray-500 font-mono">{targetColor.toUpperCase()}</span>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={changeBackground}
                                        disabled={isProcessing}
                                        className="flex-1 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
                                    >
                                        {isProcessing ? (
                                            <>
                                                <span className="spinner"></span>
                                                处理中...
                                            </>
                                        ) : (
                                            <>
                                                <span className="material-symbols-outlined">auto_fix_high</span>
                                                更换背景
                                            </>
                                        )}
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
                                    className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center justify-center gap-2"
                                >
                                    <span className="material-symbols-outlined">download</span>
                                    下载图片
                                </button>
                            </div>
                        ) : image ? (
                            <div className="text-center">
                                <img src={image} alt="Preview" className="max-w-full max-h-[350px] rounded-lg shadow" />
                                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">点击"更换背景"开始处理</p>
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
                        <li>• 上传证件照，系统自动加载AI分割模型</li>
                        <li>• 选择目标背景颜色（蓝底/红底/白底/自定义）</li>
                        <li>• 点击"更换背景"自动识别人物并替换背景</li>
                        <li>• 点击下载保存处理后的图片</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PhotoBgChanger;

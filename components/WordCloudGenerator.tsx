import React, { useState, useRef, useEffect } from 'react';

interface WordItem {
    text: string;
    weight: number;
    x: number;
    y: number;
    fontSize: number;
    rotation: number;
    color: string;
}

const WordCloudGenerator: React.FC = () => {
    const [text, setText] = useState('在线工具 三八零零 免费 实用 文本处理 图片工具 开发工具 便民工具 效率 数据处理 前端 后端 JavaScript React TypeScript Python Java');
    const [width, setWidth] = useState(800);
    const [height, setHeight] = useState(400);
    const [minFontSize, setMinFontSize] = useState(14);
    const [maxFontSize, setMaxFontSize] = useState(48);
    const [bgColor, setBgColor] = useState('#ffffff');
    const [textColor, setTextColor] = useState('multi');
    const [wordCloud, setWordCloud] = useState<WordItem[]>([]);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [resultUrl, setResultUrl] = useState<string | null>(null);

    const colors = ['#607AFB', '#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c', '#e67e22'];

    const generateWordCloud = () => {
        const words = text.split(/\s+/).filter(w => w.trim());
        const wordCount: { [key: string]: number } = {};

        words.forEach(word => {
            const normalized = word.trim().toLowerCase();
            wordCount[normalized] = (wordCount[normalized] || 0) + 1;
        });

        const sortedWords = Object.entries(wordCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 100);

        const maxWeight = sortedWords[0]?.[1] || 1;
        const items: WordItem[] = [];
        const placed: { x: number; y: number; w: number; h: number }[] = [];

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        sortedWords.forEach(([word, count], index) => {
            const weight = count / maxWeight;
            const fontSize = minFontSize + (maxFontSize - minFontSize) * weight;
            const rotation = (Math.random() - 0.5) * 0.5;
            const color = textColor === 'multi' ? colors[index % colors.length] : textColor;

            ctx.font = `bold ${fontSize}px Arial`;
            const metrics = ctx.measureText(word);
            const wordWidth = metrics.width * Math.cos(rotation) + fontSize * Math.abs(Math.sin(rotation));
            const wordHeight = fontSize * Math.cos(rotation) + metrics.width * Math.abs(Math.sin(rotation));

            let placed_successfully = false;
            let attempts = 0;
            const maxAttempts = 500;

            while (!placed_successfully && attempts < maxAttempts) {
                const x = Math.random() * (width - wordWidth) + wordWidth / 2;
                const y = Math.random() * (height - wordHeight) + wordHeight / 2;

                const collision = placed.some(p => {
                    return !(
                        x + wordWidth / 2 < p.x - p.w / 2 ||
                        x - wordWidth / 2 > p.x + p.w / 2 ||
                        y + wordHeight / 2 < p.y - p.h / 2 ||
                        y - wordHeight / 2 > p.y + p.h / 2
                    );
                });

                if (!collision) {
                    items.push({
                        text: word,
                        weight: count,
                        x,
                        y,
                        fontSize,
                        rotation: rotation * (180 / Math.PI),
                        color,
                    });
                    placed.push({ x, y, w: wordWidth, h: wordHeight });
                    placed_successfully = true;
                }
                attempts++;
            }
        });

        setWordCloud(items);
        drawWordCloud(items);
    };

    const drawWordCloud = (items: WordItem[]) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = width;
        canvas.height = height;

        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, width, height);

        items.forEach(item => {
            ctx.save();
            ctx.translate(item.x, item.y);
            ctx.rotate((item.rotation * Math.PI) / 180);
            ctx.font = `bold ${item.fontSize}px Arial`;
            ctx.fillStyle = item.color;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(item.text, 0, 0);
            ctx.restore();
        });

        setResultUrl(canvas.toDataURL('image/png'));
    };

    useEffect(() => {
        if (wordCloud.length > 0) {
            drawWordCloud(wordCloud);
        }
    }, [bgColor, width, height]);

    const downloadImage = () => {
        if (!resultUrl) return;
        const a = document.createElement('a');
        a.href = resultUrl;
        a.download = 'wordcloud.png';
        a.click();
    };

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-4xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">词云图生成器</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">输入文字，一键生成精美词云图</p>
            </div>

            <div className="w-full max-w-4xl space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">输入文字（空格分隔）</label>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                rows={5}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                placeholder="输入关键词，用空格分隔..."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">宽度: {width}px</label>
                                <input
                                    type="range"
                                    min="400"
                                    max="1200"
                                    value={width}
                                    onChange={(e) => setWidth(parseInt(e.target.value))}
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">高度: {height}px</label>
                                <input
                                    type="range"
                                    min="200"
                                    max="800"
                                    value={height}
                                    onChange={(e) => setHeight(parseInt(e.target.value))}
                                    className="w-full"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">最小字号: {minFontSize}</label>
                                <input
                                    type="range"
                                    min="10"
                                    max="30"
                                    value={minFontSize}
                                    onChange={(e) => setMinFontSize(parseInt(e.target.value))}
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">最大字号: {maxFontSize}</label>
                                <input
                                    type="range"
                                    min="30"
                                    max="80"
                                    value={maxFontSize}
                                    onChange={(e) => setMaxFontSize(parseInt(e.target.value))}
                                    className="w-full"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">背景颜色</label>
                                <input
                                    type="color"
                                    value={bgColor}
                                    onChange={(e) => setBgColor(e.target.value)}
                                    className="w-full h-10 rounded cursor-pointer"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">文字颜色</label>
                                <select
                                    value={textColor}
                                    onChange={(e) => setTextColor(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                >
                                    <option value="multi">彩色</option>
                                    <option value="#333333">黑色</option>
                                    <option value="#607AFB">蓝色</option>
                                    <option value="#e74c3c">红色</option>
                                </select>
                            </div>
                        </div>

                        <button
                            onClick={generateWordCloud}
                            className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            生成词云
                        </button>
                    </div>

                    <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                        {resultUrl ? (
                            <div className="space-y-4">
                                <img src={resultUrl} alt="Word Cloud" className="max-w-full rounded-lg shadow-lg" />
                                <button
                                    onClick={downloadImage}
                                    className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                >
                                    下载图片
                                </button>
                            </div>
                        ) : (
                            <div className="text-center text-gray-400 dark:text-gray-500">
                                <svg className="mx-auto h-16 w-16 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                </svg>
                                <p>词云预览区域</p>
                            </div>
                        )}
                    </div>
                </div>

                <canvas ref={canvasRef} className="hidden" />
            </div>
        </div>
    );
};

export default WordCloudGenerator;

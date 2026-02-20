import React, { useState, useRef } from 'react';

const GridImageCutter: React.FC = () => {
    const [image, setImage] = useState<string | null>(null);
    const [gridSize, setGridSize] = useState<3 | 4 | 6>(3);
    const [pieces, setPieces] = useState<string[]>([]);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImage(url);
            setPieces([]);
        }
    };

    const cutImage = () => {
        if (!image || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = new window.Image();
        img.onload = () => {
            const size = Math.min(img.width, img.height);
            const pieceSize = size / gridSize;

            const newPieces: string[] = [];

            for (let row = 0; row < gridSize; row++) {
                for (let col = 0; col < gridSize; col++) {
                    canvas.width = pieceSize;
                    canvas.height = pieceSize;

                    ctx.drawImage(
                        img,
                        col * pieceSize,
                        row * pieceSize,
                        pieceSize,
                        pieceSize,
                        0,
                        0,
                        pieceSize,
                        pieceSize
                    );

                    newPieces.push(canvas.toDataURL('image/png'));
                }
            }

            setPieces(newPieces);
        };
        img.src = image;
    };

    const downloadPiece = (index: number) => {
        if (!pieces[index]) return;
        const a = document.createElement('a');
        a.href = pieces[index];
        a.download = `piece_${index + 1}.png`;
        a.click();
    };

    const downloadAll = () => {
        pieces.forEach((piece, index) => {
            setTimeout(() => {
                const a = document.createElement('a');
                a.href = piece;
                a.download = `piece_${index + 1}.png`;
                a.click();
            }, index * 100);
        });
    };

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-4xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">九宫格切图</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">将图片切割成九宫格，适合社交平台分享</p>
            </div>

            <div className="w-full max-w-4xl space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <label className="block cursor-pointer">
                            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-primary transition-colors">
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
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">选择格子</label>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setGridSize(3)}
                                            className={`flex-1 px-3 py-2 rounded-lg text-sm ${gridSize === 3 ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                                        >
                                            九宫格 (3×3)
                                        </button>
                                        <button
                                            onClick={() => setGridSize(4)}
                                            className={`flex-1 px-3 py-2 rounded-lg text-sm ${gridSize === 4 ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                                        >
                                            十六格 (4×4)
                                        </button>
                                        <button
                                            onClick={() => setGridSize(6)}
                                            className={`flex-1 px-3 py-2 rounded-lg text-sm ${gridSize === 6 ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                                        >
                                            三十六格 (6×6)
                                        </button>
                                    </div>
                                </div>

                                <div className="relative">
                                    <img src={image} alt="Preview" className="w-full rounded-lg" style={{ aspectRatio: '1/1', objectFit: 'cover' }} />
                                    <div
                                        className="absolute inset-0 grid gap-0.5 pointer-events-none"
                                        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
                                    >
                                        {Array.from({ length: gridSize * gridSize }).map((_, i) => (
                                            <div key={i} className="border border-white/50" />
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={cutImage}
                                    className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                                >
                                    切割图片
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg p-4 min-h-[400px]">
                        {pieces.length > 0 ? (
                            <div className="space-y-4 w-full">
                                <div
                                    className="grid gap-1"
                                    style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
                                >
                                    {pieces.map((piece, index) => (
                                        <div key={index} className="relative group cursor-pointer" onClick={() => downloadPiece(index)}>
                                            <img src={piece} alt={`Piece ${index + 1}`} className="w-full rounded" />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded">
                                                <span className="text-white text-sm">下载</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={downloadAll}
                                    className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                >
                                    下载全部
                                </button>
                            </div>
                        ) : (
                            <p className="text-gray-400 dark:text-gray-500">切割后的图片将显示在此处</p>
                        )}
                    </div>
                </div>

                <canvas ref={canvasRef} className="hidden" />

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">使用说明</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• 上传图片后选择切割格子数</li>
                        <li>• 建议使用正方形图片，非正方形图片会自动裁剪</li>
                        <li>• 点击单张图片可单独下载</li>
                        <li>• 适合微信朋友圈、微博等社交平台分享</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default GridImageCutter;

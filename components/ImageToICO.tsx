import React, { useState, useRef } from 'react';

interface IconData {
    width: number;
    height: number;
    data: Uint8Array;
}

const ImageToICO: React.FC = () => {
    const [image, setImage] = useState<string | null>(null);
    const [previewSize, setPreviewSize] = useState(32);
    const [sizes, setSizes] = useState<number[]>([16, 32, 48, 64]);
    const [resultUrl, setResultUrl] = useState<string | null>(null);
    const [icoGenerated, setIcoGenerated] = useState<boolean>(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImage(url);
            setResultUrl(null);
            setIcoGenerated(false);
        }
    };

    const toggleSize = (s: number) => {
        setSizes(prev => 
            prev.includes(s) 
                ? prev.filter(x => x !== s)
                : [...prev, s].sort((a, b) => a - b)
        );
    };

    const createPNGData = (canvas: HTMLCanvasElement): Uint8Array => {
        const ctx = canvas.getContext('2d');
        if (!ctx) return new Uint8Array(0);

        const width = canvas.width;
        const height = canvas.height;
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;

        const pngData: number[] = [];

        const writeInt32 = (value: number) => {
            pngData.push((value >> 24) & 0xff);
            pngData.push((value >> 16) & 0xff);
            pngData.push((value >> 8) & 0xff);
            pngData.push(value & 0xff);
        };

        const writeInt32LE = (value: number) => {
            pngData.push(value & 0xff);
            pngData.push((value >> 8) & 0xff);
            pngData.push((value >> 16) & 0xff);
            pngData.push((value >> 24) & 0xff);
        };

        const crcTable: number[] = [];
        for (let n = 0; n < 256; n++) {
            let c = n;
            for (let k = 0; k < 8; k++) {
                c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
            }
            crcTable[n] = c;
        }

        const crc32 = (buf: number[]): number => {
            let c = 0xffffffff;
            for (let i = 0; i < buf.length; i++) {
                c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
            }
            return c ^ 0xffffffff;
        };

        const writeChunk = (type: string, data: number[]) => {
            const typeBytes = type.split('').map(c => c.charCodeAt(0));
            writeInt32LE(data.length);
            pngData.push(...typeBytes);
            pngData.push(...data);
            const crc = crc32([...typeBytes, ...data]);
            writeInt32(crc);
        };

        pngData.push(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a);

        const ihdr: number[] = [];
        ihdr.push((width >> 24) & 0xff);
        ihdr.push((width >> 16) & 0xff);
        ihdr.push((width >> 8) & 0xff);
        ihdr.push(width & 0xff);
        ihdr.push((height >> 24) & 0xff);
        ihdr.push((height >> 16) & 0xff);
        ihdr.push((height >> 8) & 0xff);
        ihdr.push(height & 0xff);
        ihdr.push(8, 6, 0, 0, 0);
        writeChunk('IHDR', ihdr);

        const rawData: number[] = [];
        for (let y = 0; y < height; y++) {
          rawData.push(0);
          for (let x = 0; x < width; x++) {
            const i = (y * width + x) * 4;
            rawData.push(data[i], data[i + 1], data[i + 2], data[i + 3]);
          }
        }

        const compressed = compressDeflate(rawData);
        writeChunk('IDAT', Array.from(compressed));
        writeChunk('IEND', []);

        return new Uint8Array(pngData);
    };

    const compressDeflate = (data: number[]): Uint8Array => {
        const blocks: number[] = [];
        let pos = 0;
        const blockSize = 65535;

        while (pos < data.length) {
            const remaining = data.length - pos;
            const size = Math.min(blockSize, remaining);
            const isLast = pos + size >= data.length;

            blocks.push(isLast ? 1 : 0);
            blocks.push(size & 0xff);
            blocks.push((size >> 8) & 0xff);
            blocks.push((~size) & 0xff);
            blocks.push(((~size) >> 8) & 0xff);

            for (let i = 0; i < size; i++) {
                blocks.push(data[pos + i]);
            }
            pos += size;
        }

        return new Uint8Array(blocks);
    };

    const createICO = async () => {
        if (!image || !canvasRef.current || sizes.length === 0) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = new window.Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            const iconDataList: IconData[] = [];

            sizes.forEach(targetSize => {
                canvas.width = targetSize;
                canvas.height = targetSize;
                ctx.clearRect(0, 0, targetSize, targetSize);
                ctx.drawImage(img, 0, 0, targetSize, targetSize);

                const pngData = createPNGData(canvas);
                iconDataList.push({
                    width: targetSize,
                    height: targetSize,
                    data: pngData
                });
            });

            let totalDataSize = 0;
            iconDataList.forEach(icon => {
                totalDataSize += icon.data.length;
            });

            const headerSize = 6;
            const entrySize = 16;
            const dataOffset = headerSize + entrySize * iconDataList.length;

            const icoBuffer: number[] = [];

            icoBuffer.push(0, 0);
            icoBuffer.push(1);
            icoBuffer.push(iconDataList.length);

            let currentOffset = dataOffset;

            iconDataList.forEach(icon => {
                const w = icon.width >= 256 ? 0 : icon.width;
                const h = icon.height >= 256 ? 0 : icon.height;

                icoBuffer.push(w);
                icoBuffer.push(h);
                icoBuffer.push(0);
                icoBuffer.push(0);
                icoBuffer.push(1);
                icoBuffer.push(32);

                const size = icon.data.length;
                icoBuffer.push(size & 0xff);
                icoBuffer.push((size >> 8) & 0xff);
                icoBuffer.push((size >> 16) & 0xff);
                icoBuffer.push((size >> 24) & 0xff);

                icoBuffer.push(currentOffset & 0xff);
                icoBuffer.push((currentOffset >> 8) & 0xff);
                icoBuffer.push((currentOffset >> 16) & 0xff);
                icoBuffer.push((currentOffset >> 24) & 0xff);

                currentOffset += size;
            });

            iconDataList.forEach(icon => {
                for (let i = 0; i < icon.data.length; i++) {
                    icoBuffer.push(icon.data[i]);
                }
            });

            const blob = new Blob([new Uint8Array(icoBuffer)], { type: 'image/x-icon' });
            const url = URL.createObjectURL(blob);
            setResultUrl(url);
            setIcoGenerated(true);

            const previewCanvas = document.createElement('canvas');
            previewCanvas.width = previewSize;
            previewCanvas.height = previewSize;
            const previewCtx = previewCanvas.getContext('2d');
            if (previewCtx) {
                previewCtx.drawImage(img, 0, 0, previewSize, previewSize);
            }
        };
        img.src = image;
    };

    const downloadICO = () => {
        if (!resultUrl) return;
        const a = document.createElement('a');
        a.href = resultUrl;
        a.download = 'favicon.ico';
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
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">预览尺寸: {previewSize}x{previewSize}</label>
                                    <input
                                        type="range"
                                        min="16"
                                        max="256"
                                        value={previewSize}
                                        onChange={(e) => setPreviewSize(parseInt(e.target.value))}
                                        className="w-full"
                                    />
                                </div>

                                <button
                                    onClick={createICO}
                                    disabled={sizes.length === 0}
                                    className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                                >
                                    生成ICO图标
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg p-4 min-h-[400px]">
                        {resultUrl && icoGenerated ? (
                            <div className="space-y-4 text-center w-full">
                                <div className="bg-white dark:bg-gray-900 rounded-lg p-4 inline-block">
                                    <img 
                                        src={image!} 
                                        alt="Icon Preview" 
                                        style={{ width: Math.min(previewSize, 128), height: Math.min(previewSize, 128) }} 
                                        className="mx-auto rounded shadow" 
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                        ICO 包含 {sizes.length} 个尺寸
                                    </p>
                                </div>
                                
                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={downloadICO}
                                        className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                                    >
                                        下载 favicon.ico
                                    </button>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                                        或下载单独的 PNG 文件：
                                    </div>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {sizes.map(s => (
                                            <button
                                                key={s}
                                                onClick={() => downloadPNG(s)}
                                                className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                                            >
                                                PNG {s}x{s}
                                            </button>
                                        ))}
                                    </div>
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
                        <li>• 生成的 ICO 文件包含所选的全部尺寸</li>
                        <li>• ICO 格式支持透明背景，建议上传 PNG 格式图片</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ImageToICO;

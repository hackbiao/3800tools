import React, { useState, useCallback } from 'react';

interface RGB {
    r: number;
    g: number;
    b: number;
}

interface HSL {
    h: number;
    s: number;
    l: number;
}

const ColorPicker: React.FC = () => {
    const [hex, setHex] = useState<string>('#607AFB');
    const [rgb, setRgb] = useState<RGB>({ r: 96, g: 122, b: 251 });
    const [hsl, setHsl] = useState<HSL>({ h: 229, s: 95, l: 68 });
    const [copied, setCopied] = useState<string>('');

    const hexToRgb = (hex: string): RGB | null => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? {
                  r: parseInt(result[1], 16),
                  g: parseInt(result[2], 16),
                  b: parseInt(result[3], 16),
              }
            : null;
    };

    const rgbToHex = (rgb: RGB): string => {
        return (
            '#' +
            rgb.r.toString(16).padStart(2, '0') +
            rgb.g.toString(16).padStart(2, '0') +
            rgb.b.toString(16).padStart(2, '0')
        ).toUpperCase();
    };

    const rgbToHsl = (rgb: RGB): HSL => {
        const r = rgb.r / 255;
        const g = rgb.g / 255;
        const b = rgb.b / 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h = 0;
        let s = 0;
        const l = (max + min) / 2;

        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
                    break;
                case g:
                    h = ((b - r) / d + 2) / 6;
                    break;
                case b:
                    h = ((r - g) / d + 4) / 6;
                    break;
            }
        }

        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100),
        };
    };

    const hslToRgb = (hsl: HSL): RGB => {
        const h = hsl.h / 360;
        const s = hsl.s / 100;
        const l = hsl.l / 100;

        let r, g, b;

        if (s === 0) {
            r = g = b = l;
        } else {
            const hue2rgb = (p: number, q: number, t: number) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };

            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }

        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255),
        };
    };

    const updateFromHex = useCallback((newHex: string) => {
        const rgbValue = hexToRgb(newHex);
        if (rgbValue) {
            setRgb(rgbValue);
            setHsl(rgbToHsl(rgbValue));
            setHex(newHex.startsWith('#') ? newHex.toUpperCase() : '#' + newHex.toUpperCase());
        }
    }, []);

    const updateFromRgb = useCallback((newRgb: RGB) => {
        setRgb(newRgb);
        setHex(rgbToHex(newRgb));
        setHsl(rgbToHsl(newRgb));
    }, []);

    const updateFromHsl = useCallback((newHsl: HSL) => {
        setHsl(newHsl);
        const rgbValue = hslToRgb(newHsl);
        setRgb(rgbValue);
        setHex(rgbToHex(rgbValue));
    }, []);

    const copyToClipboard = async (text: string, type: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(type);
            setTimeout(() => setCopied(''), 2000);
        } catch (err) {
            console.error('复制失败:', err);
        }
    };

    const presetColors = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
        '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
        '#F8B500', '#00CED1', '#FF69B4', '#32CD32', '#FF4500',
    ];

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-3xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">颜色转换器</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">RGB、HEX、HSL颜色格式互转，支持颜色选择器</p>
            </div>

            <div className="w-full max-w-3xl space-y-6">
                <div className="flex gap-4 items-start">
                    <div 
                        className="w-32 h-32 rounded-lg border border-gray-300 dark:border-gray-600 shadow-lg flex-shrink-0"
                        style={{ backgroundColor: hex }}
                    />
                    <div className="flex-1 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                HEX
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="color"
                                    value={hex}
                                    onChange={(e) => updateFromHex(e.target.value)}
                                    className="w-12 h-10 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
                                />
                                <input
                                    type="text"
                                    value={hex}
                                    onChange={(e) => updateFromHex(e.target.value)}
                                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-mono focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                                <button
                                    onClick={() => copyToClipboard(hex, 'hex')}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                        copied === 'hex' ? 'bg-green-500 text-white' : 'bg-primary text-white hover:bg-primary/90'
                                    }`}
                                >
                                    {copied === 'hex' ? '已复制' : '复制'}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                RGB
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    min="0"
                                    max="255"
                                    value={rgb.r}
                                    onChange={(e) => updateFromRgb({ ...rgb, r: parseInt(e.target.value) || 0 })}
                                    className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-center focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                                <input
                                    type="number"
                                    min="0"
                                    max="255"
                                    value={rgb.g}
                                    onChange={(e) => updateFromRgb({ ...rgb, g: parseInt(e.target.value) || 0 })}
                                    className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-center focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                                <input
                                    type="number"
                                    min="0"
                                    max="255"
                                    value={rgb.b}
                                    onChange={(e) => updateFromRgb({ ...rgb, b: parseInt(e.target.value) || 0 })}
                                    className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-center focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                                <button
                                    onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, 'rgb')}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                        copied === 'rgb' ? 'bg-green-500 text-white' : 'bg-primary text-white hover:bg-primary/90'
                                    }`}
                                >
                                    {copied === 'rgb' ? '已复制' : '复制'}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                HSL
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    min="0"
                                    max="360"
                                    value={hsl.h}
                                    onChange={(e) => updateFromHsl({ ...hsl, h: parseInt(e.target.value) || 0 })}
                                    className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-center focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={hsl.s}
                                    onChange={(e) => updateFromHsl({ ...hsl, s: parseInt(e.target.value) || 0 })}
                                    className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-center focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={hsl.l}
                                    onChange={(e) => updateFromHsl({ ...hsl, l: parseInt(e.target.value) || 0 })}
                                    className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-center focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                                <button
                                    onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, 'hsl')}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                        copied === 'hsl' ? 'bg-green-500 text-white' : 'bg-primary text-white hover:bg-primary/90'
                                    }`}
                                >
                                    {copied === 'hsl' ? '已复制' : '复制'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        预设颜色
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {presetColors.map((color) => (
                            <button
                                key={color}
                                onClick={() => updateFromHex(color)}
                                className="w-8 h-8 rounded-lg border border-gray-300 dark:border-gray-600 hover:scale-110 transition-transform shadow-sm"
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">颜色格式说明</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• <strong>HEX</strong>: 十六进制颜色，如 #FF6B6B</li>
                        <li>• <strong>RGB</strong>: 红、绿、蓝三原色，范围 0-255</li>
                        <li>• <strong>HSL</strong>: 色相(0-360)、饱和度(0-100%)、亮度(0-100%)</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ColorPicker;

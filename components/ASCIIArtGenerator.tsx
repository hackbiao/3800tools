import React, { useState } from 'react';

const ASCII_ART_FONTS: Record<string, string[][]> = {
    standard: [
        ['  ###  ', ' #   # ', '#     #', '#     #', '#     #', ' #   # ', '  ###  '],
        ['  #  ', ' ##  ', '  #  ', '  #  ', '  #  ', '  #  ', ' ### '],
        [' ###  ', '#     #', '      #', '   ## ', ' ##   ', '#      ', '######'],
        [' ##### ', '#     #', '      #', '  ####', '      #', '#     #', ' ##### '],
        ['#    #', '#    #', '#    #', '######', '     #', '     #', '     #'],
        ['######', '#     ', '#     ', '##### ', '     #', '     #', '##### '],
        ['  ###  ', ' #   # ', '#     #', '#####  ', '#     #', ' #   # ', '  ###  '],
        ['######', '     #', '    # ', '   #  ', '  #   ', '  #   ', '  #   '],
        ['  ###  ', ' #   # ', '#     #', '  ###  ', '#     #', ' #   # ', '  ###  '],
        ['  ###  ', ' #   # ', '#     #', '  ####', '      #', ' #   # ', '  ###  '],
    ],
    banner: [
        ['########  ', '#     ### ', '#     ### ', '######  # ', '#     ### ', '#     ### ', '########  '],
        ['  ###  ', '   #   ', '   #   ', '   #   ', '   #   ', '   #   ', '  ###  '],
        [' #####  ', '#     ## ', '      ## ', '   ####  ', ' ##      ', '##      ', '#########'],
        [' #####  ', '#     ## ', '      ## ', '   ####  ', '      ## ', '#     ## ', ' #####  '],
        ['#     ## ', '#     ## ', '#     ## ', '######### ', '      ## ', '      ## ', '      ## '],
        ['######## ', '##      ', '##      ', '######  ', '      ## ', '      ## ', '######  '],
        ['  ##### ', '##      ', '##      ', '######  ', '##    ## ', '##    ## ', ' ###### '],
        ['######## ', '     ## ', '    ##  ', '   ##   ', '   ##   ', '   ##   ', '   ##   '],
        [' ###### ', '##    ## ', '##    ## ', ' ###### ', '##    ## ', '##    ## ', ' ###### '],
        [' #######', '##    ## ', '##    ## ', ' #######', '      ##', '      ##', ' ###### '],
    ],
    block: [
        ['██████╗ ', '██╔════╝ ', '██║  ███╗', '██║   ██║', '╚██████╔╝', ' ╚═════╝ ', '         '],
        ['██╗', '██║', '██║', '██║', '██║', '██║', '██═╗'],
        ['██████╗ ', '╚════██╗', ' █████╔╝', '██╔═══╝ ', '███████╗', '╚══════╝', '        '],
        ['██████╗ ', '╚════██╗', ' █████╔╝', ' ╚═══██╗', '██████╔╝', '╚═════╝ ', '        '],
        ['██╗   ██╗', '██║   ██║', '██║   ██║', '███████║', '╚════██║', '     ██║', '     ╚═╝'],
        ['███████╗', '██╔════╝', '█████╗  ', '██╔══╝  ', '██║     ', '╚═╝     ', '        '],
        [' ██████╗', '██╔════╝', '██║     ', '██║ ███╗', '██║  ██║', '╚█████╔╝', ' ╚═════╝ '],
        ['███████╗', '╚══███╔╝', '  ███╔╝ ', ' ███╔╝  ', '██╔╝    ', '██║     ', '╚═╝     '],
        [' █████╗ ', '██╔══██╗', '╚█████╔╝', '██╔══██╗', '╚█████╔╝', ' ╚════╝ ', '        '],
        ['███████╗', '██╔════╝', '██║     ', '╚██████╗', '     ██║', '███████║', '╚══════╝ '],
    ],
};

const ASCIIArtGenerator: React.FC = () => {
    const [inputText, setInputText] = useState<string>('');
    const [outputText, setOutputText] = useState<string>('');
    const [font, setFont] = useState<keyof typeof ASCII_ART_FONTS>('standard');

    const generateASCII = () => {
        const text = inputText.toUpperCase().trim();
        if (!text) {
            setOutputText('');
            return;
        }

        const fontData = ASCII_ART_FONTS[font];
        const lines: string[] = Array(7).fill('');

        for (const char of text) {
            if (char >= 'A' && char <= 'Z') {
                const index = char.charCodeAt(0) - 65;
                const charArt = fontData[index];
                for (let i = 0; i < 7; i++) {
                    lines[i] += charArt[i] + ' ';
                }
            } else if (char >= '0' && char <= '9') {
                const index = parseInt(char);
                const charArt = fontData[index];
                for (let i = 0; i < 7; i++) {
                    lines[i] += charArt[i] + ' ';
                }
            } else if (char === ' ') {
                for (let i = 0; i < 7; i++) {
                    lines[i] += '    ';
                }
            } else {
                for (let i = 0; i < 7; i++) {
                    lines[i] += char + '  ';
                }
            }
        }

        setOutputText(lines.join('\n'));
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(outputText);
        } catch (err) {
            console.error('复制失败:', err);
        }
    };

    const sampleTexts = ['HELLO', 'TOOLS', 'FREE', 'ASCII'];

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-4xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">ASCII艺术字生成器</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">将文字转换为ASCII艺术字，支持多种字体风格</p>
            </div>

            <div className="w-full max-w-4xl space-y-6">
                <div className="flex items-center gap-4">
                    <label className="text-sm text-gray-600 dark:text-gray-400">字体风格：</label>
                    <select
                        value={font}
                        onChange={(e) => setFont(e.target.value as keyof typeof ASCII_ART_FONTS)}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    >
                        <option value="standard">标准</option>
                        <option value="banner">横幅</option>
                        <option value="block">方块</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        输入文字（仅支持字母和数字）
                    </label>
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value.replace(/[^a-zA-Z0-9\s]/g, ''))}
                        placeholder="输入英文字母或数字"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={generateASCII}
                        className="flex-1 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                    >
                        生成艺术字
                    </button>
                    <button
                        onClick={() => { setInputText(''); setOutputText(''); }}
                        className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        清空
                    </button>
                </div>

                <div className="flex flex-wrap gap-2">
                    {sampleTexts.map((text) => (
                        <button
                            key={text}
                            onClick={() => setInputText(text)}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
                        >
                            {text}
                        </button>
                    ))}
                </div>

                {outputText && (
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                ASCII艺术字
                            </label>
                            <button
                                onClick={copyToClipboard}
                                className="text-primary text-sm hover:underline"
                            >
                                复制
                            </button>
                        </div>
                        <pre className="px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-900 text-green-400 font-mono text-xs overflow-x-auto whitespace-pre">
                            {outputText}
                        </pre>
                    </div>
                )}

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">使用说明</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• 支持输入英文字母（A-Z）和数字（0-9）</li>
                        <li>• 不同字体风格有不同的视觉效果</li>
                        <li>• 复制后可在聊天、代码注释等地方使用</li>
                        <li>• 建议使用等宽字体显示以保持对齐</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ASCIIArtGenerator;

import React, { useState, useCallback, useMemo } from 'react';
import { errorHandler } from '../utils/errorHandler';

type ConversionMode = 's2t' | 't2s';

const S2T_MAP: Record<string, string> = {
    '爱': '愛', '宝': '寶', '笔': '筆', '边': '邊', '测': '測',
    '长': '長', '车': '車', '东': '東', '动': '動', '发': '發',
    '飞': '飛', '风': '風', '关': '關', '国': '國', '过': '過',
    '还': '還', '会': '會', '机': '機', '见': '見', '开': '開',
    '课': '課', '来': '來', '乐': '樂', '龙': '龍', '门': '門',
    '们': '們', '难': '難', '鸟': '鳥', '齐': '齊', '钱': '錢',
    '强': '強', '亲': '親', '区': '區', '权': '權', '让': '讓',
    '认': '認', '实': '實', '师': '師', '时': '時', '书': '書',
    '术': '術', '说': '說', '体': '體', '听': '聽', '头': '頭',
    '图': '圖', '万': '萬', '网': '網', '为': '為', '问': '問',
    '无': '無', '现': '現', '线': '線', '写': '寫', '学': '學',
    '样': '樣', '页': '頁', '义': '義', '语': '語', '云': '雲',
    '这': '這', '种': '種', '周': '週', '专': '專', '传': '傳',
    '创': '創', '纯': '純', '词': '詞', '从': '從', '达': '達',
    '带': '帶', '单': '單', '当': '當', '党': '黨', '导': '導',
    '点': '點', '电': '電', '断': '斷', '对': '對', '儿': '兒',
    '复': '復', '该': '該', '干': '幹', '给': '給', '观': '觀',
    '规': '規', '号': '號', '后': '後', '计': '計', '记': '記',
    '价': '價', '间': '間', '将': '將', '结': '結', '进': '進',
    '经': '經', '旧': '舊', '据': '據', '觉': '覺', '两': '兩',
    '满': '滿', '历': '歷', '气': '氣', '声': '聲', '数': '數',
    '虽': '雖', '题': '題', '压': '壓', '阳': '陽', '业': '業',
    '于': '於', '余': '餘', '与': '與', '员': '員', '远': '遠',
    '运': '運', '则': '則', '张': '張', '着': '著', '证': '證',
    '质': '質', '众': '眾', '属': '屬', '注': '註', '装': '裝',
    '状': '狀', '总': '總', '组': '組', '选': '選', '应': '應',
};

const ChineseConverter: React.FC = () => {
    const [inputText, setInputText] = useState('');
    const [mode, setMode] = useState<ConversionMode>('s2t');

    const T2S_MAP = useMemo(() => {
        const result: Record<string, string> = {};
        for (const [s, t] of Object.entries(S2T_MAP)) {
            result[t] = s;
        }
        return result;
    }, []);

    const convertText = useCallback((text: string, conversionMode: ConversionMode): string => {
        const map = conversionMode === 's2t' ? S2T_MAP : T2S_MAP;
        return text.split('').map(char => map[char] || char).join('');
    }, [T2S_MAP]);

    const outputText = useMemo(() => {
        if (!inputText) return '';
        return convertText(inputText, mode);
    }, [inputText, mode, convertText]);

    const handleCopy = useCallback(async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            alert('已复制到剪贴板');
        } catch (error) {
            console.error('Copy failed:', error);
        }
    }, []);

    const handleClear = useCallback(() => {
        setInputText('');
    }, []);

    const charCount = inputText.length;
    const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;

    return (
        <div className="flex w-full flex-col items-center px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-4xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">
                    简繁体转换
                </p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                    在线简体中文与繁体中文互相转换
                </p>
            </div>

            <div className="w-full max-w-4xl">
                <div className="flex justify-center gap-2 mb-6">
                    <button
                        onClick={() => setMode('s2t')}
                        className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                            mode === 's2t'
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                    >
                        简体 → 繁体
                    </button>
                    <button
                        onClick={() => setMode('t2s')}
                        className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                            mode === 't2s'
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                    >
                        繁体 → 简体
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/20 shadow-sm p-4">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {mode === 's2t' ? '简体中文' : '繁体中文'}
                            </h3>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                字数：{charCount} | 词数：{wordCount}
                            </span>
                        </div>
                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder={mode === 's2t' ? '请输入简体中文...' : '请输入繁体中文...'}
                            className="w-full h-64 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none"
                        />
                        <div className="flex gap-2 mt-2">
                            <button
                                onClick={handleClear}
                                className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                            >
                                清空
                            </button>
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/20 shadow-sm p-4">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {mode === 's2t' ? '繁体中文' : '简体中文'}
                            </h3>
                            <button
                                onClick={() => handleCopy(outputText)}
                                disabled={!outputText}
                                className="flex items-center gap-1 px-3 py-1 text-sm text-primary hover:underline disabled:text-gray-400 disabled:no-underline"
                            >
                                <span className="material-symbols-outlined text-base">content_copy</span>
                                复制
                            </button>
                        </div>
                        <div className="w-full h-64 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white overflow-auto whitespace-pre-wrap">
                            {outputText || <span className="text-gray-400 dark:text-gray-500">转换结果将显示在这里...</span>}
                        </div>
                        <div className="flex gap-2 mt-2">
                            <button
                                onClick={() => {
                                    setInputText(outputText);
                                    setMode(mode === 's2t' ? 't2s' : 's2t');
                                }}
                                disabled={!outputText}
                                className="px-3 py-1.5 text-sm text-primary hover:underline disabled:text-gray-400 disabled:no-underline"
                            >
                                反向转换
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-4xl mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">使用说明</h4>
                <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                    <li>• 支持简体中文与繁体中文的互相转换</li>
                    <li>• 采用常用字库进行转换，可能存在个别生僻字无法转换</li>
                    <li>• 转换在本地完成，不上传任何数据</li>
                    <li>• 可用于文档转换、阅读繁体文章等场景</li>
                </ul>
            </div>
        </div>
    );
};

export default ChineseConverter;

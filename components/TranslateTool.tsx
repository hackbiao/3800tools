import React, { useState, useCallback } from 'react';
import { translateText } from '../services/translateService';

const TranslateTool: React.FC = () => {
    const [inputText, setInputText] = useState<string>('');
    const [translatedText, setTranslatedText] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [detectedLang, setDetectedLang] = useState<string>('');

    const handleTranslate = useCallback(async () => {
        if (!inputText.trim()) {
            setError("请输入需要翻译的文本。");
            return;
        }
        setIsLoading(true);
        setError(null);
        setTranslatedText('');
        setDetectedLang('');

        try {
            const result = await translateText(inputText);
            setTranslatedText(result.translatedText);
            setDetectedLang(result.detectedLang);
        } catch (err) {
            console.error(err);
            setError("翻译失败,请稍后重试。");
        } finally {
            setIsLoading(false);
        }
    }, [inputText]);

    const handleCopy = useCallback(() => {
        if (!translatedText) return;
        navigator.clipboard.writeText(translatedText).then(() => {
            alert('已复制到剪贴板!');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            setError("复制文本失败。");
        });
    }, [translatedText]);

    const handleSwap = useCallback(() => {
        setInputText(translatedText);
        setTranslatedText('');
        setDetectedLang('');
    }, [translatedText]);

    return (
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
            <header>
                <h1 className="text-text-light dark:text-text-dark text-4xl font-black leading-tight tracking-[-0.033em]">在线翻译</h1>
                <p className="text-subtle-light dark:text-subtle-dark text-base font-normal leading-normal mt-2">
                    自动识别语言,智能翻译成中文或英文。支持多种语言互译。
                </p>
            </header>

            <div className="flex items-center gap-4">
                <button
                    onClick={handleTranslate}
                    disabled={isLoading || !inputText.trim()}
                    className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg font-medium shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? <div className="spinner"></div> : <span className="material-symbols-outlined text-xl">translate</span>}
                    <span>{isLoading ? "翻译中..." : "翻译"}</span>
                </button>
                {translatedText && (
                    <button
                        onClick={handleSwap}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg font-medium hover:bg-border-light dark:hover:bg-border-dark"
                    >
                        <span className="material-symbols-outlined text-xl">swap_horiz</span>
                        <span>互换</span>
                    </button>
                )}
            </div>

            {error && <p className="text-red-500 bg-red-100 dark:bg-red-900/50 p-3 rounded-lg">{error}</p>}

            {detectedLang && (
                <p className="text-subtle-light dark:text-subtle-dark text-sm">
                    检测到语言: <span className="font-semibold">{detectedLang}</span>
                </p>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <label className="flex flex-col">
                        <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal pb-2">原文</p>
                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            className="form-input flex w-full min-w-0 flex-1 resize-y rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:border-primary min-h-64 placeholder:text-subtle-light dark:placeholder:text-subtle-dark p-[15px] text-base leading-normal"
                            placeholder="请输入需要翻译的文本..."
                        ></textarea>
                    </label>
                </div>
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-text-light dark:text-text-dark text-base font-medium leading-normal">译文</h3>
                        <button
                            onClick={handleCopy}
                            disabled={!translatedText}
                            className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="material-symbols-outlined text-lg">content_copy</span>
                            <span>复制</span>
                        </button>
                    </div>
                    <div className="relative bg-surface-light dark:bg-surface-dark rounded-lg border border-border-light dark:border-border-dark min-h-64 p-4 text-base overflow-y-auto">
                        <p className="whitespace-pre-wrap">{translatedText || <span className="text-subtle-light dark:text-subtle-dark">翻译结果将显示在此处。</span>}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TranslateTool;

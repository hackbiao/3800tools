import React, { useState, useCallback } from 'react';

const TextFormatterTool: React.FC = () => {
    const [inputText, setInputText] = useState<string>('');
    const [formattedText, setFormattedText] = useState<string>('');
    const [removeNewlines, setRemoveNewlines] = useState<boolean>(true);
    const [removeSpaces, setRemoveSpaces] = useState<boolean>(true);
    const [removeTabs, setRemoveTabs] = useState<boolean>(true);

    const handleFormat = useCallback(() => {
        if (!inputText.trim()) {
            alert("请输入需要格式化的文本。");
            return;
        }

        let result = inputText;

        if (removeNewlines) {
            result = result.replace(/[\r\n]+/g, '');
        }

        if (removeSpaces) {
            result = result.replace(/\s+/g, ' ').trim();
        }

        if (removeTabs) {
            result = result.replace(/\t+/g, '');
        }

        setFormattedText(result);
    }, [inputText, removeNewlines, removeSpaces, removeTabs]);

    const handleCopy = useCallback(() => {
        if (!formattedText) return;
        navigator.clipboard.writeText(formattedText).then(() => {
            alert('已复制到剪贴板!');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    }, [formattedText]);

    const handleClear = useCallback(() => {
        setInputText('');
        setFormattedText('');
    }, []);

    return (
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
            <header>
                <h1 className="text-text-light dark:text-text-dark text-4xl font-black leading-tight tracking-[-0.033em]">文本格式化</h1>
                <p className="text-subtle-light dark:text-subtle-dark text-base font-normal leading-normal mt-2">
                    快速移除文本中的换行、空格和制表符,让文本变得更紧凑。
                </p>
            </header>

            <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={removeNewlines}
                            onChange={(e) => setRemoveNewlines(e.target.checked)}
                            className="w-5 h-5 rounded border-border-light dark:border-border-dark text-primary focus:ring-primary"
                        />
                        <span className="text-text-light dark:text-text-dark text-sm font-medium">移除换行</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={removeSpaces}
                            onChange={(e) => setRemoveSpaces(e.target.checked)}
                            className="w-5 h-5 rounded border-border-light dark:border-border-dark text-primary focus:ring-primary"
                        />
                        <span className="text-text-light dark:text-text-dark text-sm font-medium">移除多余空格</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={removeTabs}
                            onChange={(e) => setRemoveTabs(e.target.checked)}
                            className="w-5 h-5 rounded border-border-light dark:border-border-dark text-primary focus:ring-primary"
                        />
                        <span className="text-text-light dark:text-text-dark text-sm font-medium">移除制表符</span>
                    </label>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={handleFormat}
                        disabled={!inputText.trim()}
                        className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg font-medium shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span className="material-symbols-outlined text-xl">auto_fix_high</span>
                        <span>格式化</span>
                    </button>

                    <button
                        onClick={handleClear}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg font-medium hover:bg-border-light dark:hover:bg-border-dark"
                    >
                        <span className="material-symbols-outlined text-xl">clear</span>
                        <span>清空</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <label className="flex flex-col">
                        <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal pb-2">原文本</p>
                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            className="form-input flex w-full min-w-0 flex-1 resize-y rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:border-primary min-h-64 placeholder:text-subtle-light dark:placeholder:text-subtle-dark p-[15px] text-base leading-normal font-mono"
                            placeholder="请输入需要格式化的文本..."
                        ></textarea>
                    </label>
                    <p className="text-subtle-light dark:text-subtle-dark text-sm mt-2">
                        字符数: {inputText.length}
                    </p>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-text-light dark:text-text-dark text-base font-medium leading-normal">格式化后的文本</h3>
                        <button
                            onClick={handleCopy}
                            disabled={!formattedText}
                            className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="material-symbols-outlined text-lg">content_copy</span>
                            <span>复制</span>
                        </button>
                    </div>
                    <div className="relative bg-surface-light dark:bg-surface-dark rounded-lg border border-border-light dark:border-border-dark min-h-64 p-4 text-base overflow-y-auto font-mono">
                        <p className="whitespace-pre-wrap break-words">{formattedText || <span className="text-subtle-light dark:text-subtle-dark">格式化后的文本将显示在此处。</span>}</p>
                    </div>
                    {formattedText && (
                        <p className="text-subtle-light dark:text-subtle-dark text-sm mt-2">
                            字符数: {formattedText.length}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TextFormatterTool;

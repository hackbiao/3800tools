import React, { useState, useCallback, useEffect, useRef } from 'react';

// Declare KaTeX global
declare global {
    interface Window {
        katex: any;
    }
}

const MathFormulaEditor: React.FC = () => {
    const [latexInput, setLatexInput] = useState<string>('');
    const [renderedHtml, setRenderedHtml] = useState<string>('');
    const [mathmlOutput, setMathmlOutput] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [copyLatexSuccess, setCopyLatexSuccess] = useState<boolean>(false);
    const [copyMathmlSuccess, setCopyMathmlSuccess] = useState<boolean>(false);
    const [isNotificationFadingOut, setIsNotificationFadingOut] = useState<boolean>(false);
    const [notificationMessage, setNotificationMessage] = useState<string>('');

    const renderTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // 自动渲染公式
    const performRender = useCallback((latex: string) => {
        if (!latex.trim()) {
            setRenderedHtml('');
            setMathmlOutput('');
            setError(null);
            return;
        }

        if (!window.katex) {
            setError('KaTeX 库未加载,请刷新页面重试。');
            return;
        }

        try {
            // 渲染为 HTML
            const html = window.katex.renderToString(latex, {
                throwOnError: true,
                displayMode: true,
                output: 'html'
            });
            setRenderedHtml(html);

            // 转换为 MathML
            const mathml = window.katex.renderToString(latex, {
                throwOnError: true,
                displayMode: true,
                output: 'mathml'
            });
            setMathmlOutput(mathml);

            setError(null);
        } catch (err: any) {
            console.error('KaTeX render error:', err);
            setError(err.message || '公式渲染失败');
            setRenderedHtml('');
            setMathmlOutput('');
        }
    }, []);

    // 输入变化时,延迟渲染
    useEffect(() => {
        if (renderTimeoutRef.current) {
            clearTimeout(renderTimeoutRef.current);
        }

        if (latexInput.trim()) {
            renderTimeoutRef.current = setTimeout(() => {
                performRender(latexInput);
            }, 500);
        } else {
            setRenderedHtml('');
            setMathmlOutput('');
            setError(null);
        }

        return () => {
            if (renderTimeoutRef.current) {
                clearTimeout(renderTimeoutRef.current);
            }
        };
    }, [latexInput, performRender]);

    const showNotification = useCallback((message: string) => {
        setNotificationMessage(message);
        setCopyLatexSuccess(message.includes('LaTeX'));
        setCopyMathmlSuccess(message.includes('MathML'));
        setIsNotificationFadingOut(false);

        setTimeout(() => {
            setIsNotificationFadingOut(true);
        }, 1700);

        setTimeout(() => {
            setCopyLatexSuccess(false);
            setCopyMathmlSuccess(false);
            setIsNotificationFadingOut(false);
        }, 2000);
    }, []);

    const handleCopyLatex = useCallback(() => {
        if (!latexInput) return;
        navigator.clipboard.writeText(latexInput).then(() => {
            showNotification('已复制 LaTeX 格式到剪贴板!');
        }).catch(err => {
            console.error('Failed to copy LaTeX: ', err);
            setError('复制失败。');
        });
    }, [latexInput, showNotification]);

    const handleCopyMathML = useCallback(() => {
        if (!mathmlOutput) return;
        navigator.clipboard.writeText(mathmlOutput).then(() => {
            showNotification('已复制 MathML 格式到剪贴板!');
        }).catch(err => {
            console.error('Failed to copy MathML: ', err);
            setError('复制失败。');
        });
    }, [mathmlOutput, showNotification]);

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-6xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">数学公式编辑器</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">输入 LaTeX 格式的数学公式,自动渲染并支持复制为 LaTeX 或 MathML 格式。</p>
            </div>

            {error && <div className="w-full max-w-6xl mb-4"><p className="text-red-500 bg-red-100 dark:bg-red-900/50 p-3 rounded-lg">{error}</p></div>}

            {/* 全��通知 - 固定在顶部中央 */}
            {(copyLatexSuccess || copyMathmlSuccess) && (
                <div className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 ${isNotificationFadingOut ? 'animate-fade-out-up' : 'animate-fade-in-down'}`}>
                    <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
                        <span className="material-symbols-outlined text-xl">check_circle</span>
                        <span className="font-medium">{notificationMessage}</span>
                    </div>
                </div>
            )}

            <div className="w-full max-w-6xl rounded-xl border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/20 shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* 左侧：LaTeX 输入 */}
                    <div className="relative flex flex-col p-4 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700/50">
                        <div className="flex items-center justify-between mb-3 min-h-[36px]">
                            <h3 className="text-gray-900 dark:text-white text-base font-semibold leading-normal flex items-center gap-2">
                                <span className="material-symbols-outlined text-xl">functions</span>
                                LaTeX 输入
                            </h3>
                            <span className="text-xs text-gray-400 dark:text-gray-500">{latexInput.length} 字符</span>
                        </div>
                        <textarea
                            value={latexInput}
                            onChange={(e) => setLatexInput(e.target.value)}
                            className="flex-1 resize-none rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-gray-100 focus:outline-0 focus:ring-2 focus:ring-primary/20 focus:border-primary min-h-[400px] placeholder:text-gray-400 dark:placeholder:text-gray-500 p-4 text-sm font-mono leading-relaxed"
                            placeholder="输入 LaTeX 公式，例如：\n\n\\frac{a}{b}\n\n\\int_{0}^{\\infty} e^{-x} dx\n\n\\sum_{i=1}^{n} x_i"
                        ></textarea>
                        <div className="mt-3">
                            <button
                                onClick={handleCopyLatex}
                                disabled={!latexInput}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
                            >
                                <span className="material-symbols-outlined text-base">content_copy</span>
                                <span>复制 LaTeX</span>
                            </button>
                        </div>
                    </div>

                    {/* 右侧：渲染预览 */}
                    <div className="relative flex flex-col p-4 bg-gray-50/50 dark:bg-gray-800/30">
                        <div className="flex justify-between items-start mb-3 min-h-[36px]">
                            <h3 className="text-gray-900 dark:text-white text-base font-semibold leading-normal flex items-center gap-2">
                                <span className="material-symbols-outlined text-xl">auto_awesome</span>
                                渲染预览
                            </h3>
                            <button
                                onClick={handleCopyMathML}
                                disabled={!mathmlOutput}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-medium hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
                            >
                                <span className="material-symbols-outlined text-base">content_copy</span>
                                <span>复制 MathML</span>
                            </button>
                        </div>
                        <div className="relative bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 min-h-[400px] p-4 text-sm overflow-x-auto">
                            {renderedHtml ? (
                                <div className="flex items-center justify-center h-full">
                                    <div
                                        className="text-gray-900 dark:text-gray-100 text-2xl"
                                        dangerouslySetInnerHTML={{ __html: renderedHtml }}
                                    />
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500">
                                    <div className="text-center">
                                        <span className="material-symbols-outlined text-5xl mb-2 block opacity-50">calculate</span>
                                        <p className="text-sm">渲染后的公式将显示在此处</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* 常用公式模板 */}
            <div className="w-full max-w-6xl mt-6">
                <h4 className="text-gray-900 dark:text-white text-sm font-semibold mb-3">常用模板:</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {[
                        { label: '分数', latex: '\\frac{a}{b}' },
                        { label: '根号', latex: '\\sqrt{x}' },
                        { label: '求和', latex: '\\sum_{i=1}^{n} x_i' },
                        { label: '积分', latex: '\\int_{0}^{\\infty} f(x) dx' },
                        { label: '极限', latex: '\\lim_{x \\to \\infty} f(x)' },
                        { label: '矩阵', latex: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}' },
                        { label: '上标/下标', latex: 'x^2 + y_1' },
                        { label: '希腊字母', latex: '\\alpha + \\beta + \\gamma' },
                    ].map((template, index) => (
                        <button
                            key={index}
                            onClick={() => setLatexInput(template.latex)}
                            className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            {template.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MathFormulaEditor;

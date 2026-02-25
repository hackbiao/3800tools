import React, { useState, useCallback } from 'react';
import { errorHandler } from '../utils/errorHandler';

interface TransformResult {
    uppercase: string;
    lowercase: string;
    capitalize: string;
    titleCase: string;
    reverse: string;
    camelCase: string;
    pascalCase: string;
    snakeCase: string;
    kebabCase: string;
    constantCase: string;
}

const TextTransform: React.FC = () => {
    const [inputText, setInputText] = useState<string>('');
    const [result, setResult] = useState<TransformResult | null>(null);

    const toCamelCase = (str: string): string => {
        return str
            .toLowerCase()
            .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
            .replace(/^(.)/, (c) => c.toLowerCase());
    };

    const toPascalCase = (str: string): string => {
        const camel = toCamelCase(str);
        return camel.replace(/^(.)/, (c) => c.toUpperCase());
    };

    const toSnakeCase = (str: string): string => {
        return str
            .toLowerCase()
            .replace(/\s+/g, '_')
            .replace(/[-\s]+/g, '_')
            .replace(/([a-z])([A-Z])/g, '$1_$2')
            .toLowerCase();
    };

    const toKebabCase = (str: string): string => {
        return str
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[_\s]+/g, '-')
            .replace(/([a-z])([A-Z])/g, '$1-$2')
            .toLowerCase();
    };

    const toConstantCase = (str: string): string => {
        return toSnakeCase(str).toUpperCase();
    };

    const transform = useCallback(() => {
        if (!inputText.trim()) {
            setResult(null);
            return;
        }

        setResult({
            uppercase: inputText.toUpperCase(),
            lowercase: inputText.toLowerCase(),
            capitalize: inputText.replace(/\b\w/g, (c) => c.toUpperCase()),
            titleCase: inputText.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()),
            reverse: inputText.split('').reverse().join(''),
            camelCase: toCamelCase(inputText),
            pascalCase: toPascalCase(inputText),
            snakeCase: toSnakeCase(inputText),
            kebabCase: toKebabCase(inputText),
            constantCase: toConstantCase(inputText),
        });
    }, [inputText]);

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            errorHandler.error('复制失败', err, { component: '"$(basename $file .tsx)"', action: 'copy' });
        }
    };

    const transformItems = result ? [
        { label: '大写', value: result.uppercase },
        { label: '小写', value: result.lowercase },
        { label: '首字母大写', value: result.capitalize },
        { label: '标题格式', value: result.titleCase },
        { label: '反转文本', value: result.reverse },
        { label: '驼峰命名', value: result.camelCase },
        { label: '帕斯卡命名', value: result.pascalCase },
        { label: '下划线命名', value: result.snakeCase },
        { label: '短横线命名', value: result.kebabCase },
        { label: '常量命名', value: result.constantCase },
    ] : [];

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-3xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">文本转换</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">大小写转换、命名风格转换等文本处理</p>
            </div>

            <div className="w-full max-w-3xl space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        输入文本
                    </label>
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="输入要转换的文本"
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    />
                </div>

                <button
                    onClick={transform}
                    disabled={!inputText.trim()}
                    className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    转换
                </button>

                {result && (
                    <div className="space-y-3">
                        {transformItems.map((item) => (
                            <div key={item.label} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
                                    <button
                                        onClick={() => copyToClipboard(item.value)}
                                        className="text-primary text-sm hover:underline"
                                    >
                                        复制
                                    </button>
                                </div>
                                <code className="text-sm text-gray-600 dark:text-gray-300 break-all">
                                    {item.value}
                                </code>
                            </div>
                        ))}
                    </div>
                )}

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">命名风格说明</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• <strong>驼峰命名</strong>: helloWorld（首字母小写）</li>
                        <li>• <strong>帕斯卡命名</strong>: HelloWorld（首字母大写）</li>
                        <li>• <strong>下划线命名</strong>: hello_world</li>
                        <li>• <strong>短横线命名</strong>: hello-world</li>
                        <li>• <strong>常量命名</strong>: HELLO_WORLD</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TextTransform;

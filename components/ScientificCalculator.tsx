import React, { useState } from 'react';

const ScientificCalculator: React.FC = () => {
    const [display, setDisplay] = useState<string>('0');
    const [memory, setMemory] = useState<number>(0);
    const [history, setHistory] = useState<string[]>([]);

    const isOperator = (char: string): boolean => {
        return ['+', '-', '×', '÷'].includes(char);
    };

    const handleClick = (value: string) => {
        if (display === 'Error') {
            setDisplay(value === '.' ? '0.' : value);
            return;
        }

        if (value === '.' && display.includes('.')) {
            const parts = display.split(/[\+\-\×\÷]/);
            if (parts[parts.length - 1].includes('.')) return;
        }

        if (isOperator(value)) {
            const lastChar = display.slice(-1);
            if (isOperator(lastChar)) {
                setDisplay(display.slice(0, -1) + value);
            } else {
                setDisplay(display + value);
            }
            return;
        }

        if (display === '0' && value !== '.') {
            setDisplay(value);
        } else {
            setDisplay(display + value);
        }
    };

    const calculate = () => {
        try {
            let expression = display
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/π/g, Math.PI.toString())
                .replace(/e(?![a-z])/g, Math.E.toString());
            
            const result = Function('"use strict"; return (' + expression + ')')();
            const resultStr = Number.isInteger(result) ? result.toString() : result.toFixed(8).replace(/\.?0+$/, '');
            
            setHistory([...history, `${display} = ${resultStr}`].slice(-10));
            setDisplay(resultStr);
        } catch {
            setDisplay('Error');
        }
    };

    const handleFunction = (fn: string) => {
        try {
            let result: number;
            const num = parseFloat(display);

            switch (fn) {
                case 'sin':
                    result = Math.sin(num * Math.PI / 180);
                    break;
                case 'cos':
                    result = Math.cos(num * Math.PI / 180);
                    break;
                case 'tan':
                    result = Math.tan(num * Math.PI / 180);
                    break;
                case 'log':
                    result = Math.log10(num);
                    break;
                case 'ln':
                    result = Math.log(num);
                    break;
                case 'sqrt':
                    result = Math.sqrt(num);
                    break;
                case 'square':
                    result = num * num;
                    break;
                case 'cube':
                    result = num * num * num;
                    break;
                case 'reciprocal':
                    result = 1 / num;
                    break;
                case 'abs':
                    result = Math.abs(num);
                    break;
                case 'factorial':
                    result = factorial(Math.floor(num));
                    break;
                case 'power':
                    setDisplay(display + '^');
                    return;
                default:
                    return;
            }

            setDisplay(Number.isInteger(result) ? result.toString() : result.toFixed(8).replace(/\.?0+$/, ''));
        } catch {
            setDisplay('Error');
        }
    };

    const factorial = (n: number): number => {
        if (n < 0) return NaN;
        if (n === 0 || n === 1) return 1;
        return n * factorial(n - 1);
    };

    const clear = () => setDisplay('0');
    const backspace = () => setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
    const toggleSign = () => setDisplay(display.startsWith('-') ? display.slice(1) : '-' + display);

    const memoryAdd = () => setMemory(memory + parseFloat(display || '0'));
    const memorySubtract = () => setMemory(memory - parseFloat(display || '0'));
    const memoryRecall = () => setDisplay(memory.toString());
    const memoryClear = () => setMemory(0);

    const buttons = [
        ['MC', 'MR', 'M+', 'M-', 'C'],
        ['sin', 'cos', 'tan', '(', ')'],
        ['log', 'ln', '√', 'x²', 'x³'],
        ['π', 'e', '^', '1/x', '|x|'],
        ['7', '8', '9', '÷', '⌫'],
        ['4', '5', '6', '×', 'n!'],
        ['1', '2', '3', '-', '±'],
        ['0', '.', '=', '+', ''],
    ];

    const getButtonClass = (btn: string): string => {
        if (btn === '=') return 'bg-primary text-white hover:bg-primary/90';
        if (['+', '-', '×', '÷'].includes(btn)) return 'bg-orange-500 text-white hover:bg-orange-600';
        if (['C', '⌫', '±'].includes(btn)) return 'bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white';
        if (['sin', 'cos', 'tan', 'log', 'ln', '√', 'x²', 'x³', 'π', 'e', '^', '1/x', '|x|', 'n!', '(', ')', 'MC', 'MR', 'M+', 'M-'].includes(btn)) {
            return 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600';
        }
        return 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700';
    };

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-md flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">科学计算器</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">支持三角函数、对数、幂运算等科学计算</p>
            </div>

            <div className="w-full max-w-md space-y-4">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                    <div className="text-right text-sm text-gray-500 dark:text-gray-400 h-6 overflow-hidden">
                        {memory !== 0 && <span>M: {memory}</span>}
                    </div>
                    <div className="text-right text-3xl font-mono text-gray-900 dark:text-white overflow-x-auto">
                        {display}
                    </div>
                </div>

                <div className="grid grid-cols-5 gap-2">
                    {buttons.flat().map((btn, index) => {
                        if (btn === '') return <div key={index} />;
                        
                        let onClick: () => void;
                        if (btn === '=') onClick = calculate;
                        else if (btn === 'C') onClick = clear;
                        else if (btn === '⌫') onClick = backspace;
                        else if (btn === '±') onClick = toggleSign;
                        else if (btn === 'MC') onClick = memoryClear;
                        else if (btn === 'MR') onClick = memoryRecall;
                        else if (btn === 'M+') onClick = memoryAdd;
                        else if (btn === 'M-') onClick = memorySubtract;
                        else if (['sin', 'cos', 'tan', 'log', 'ln', '√', 'x²', 'x³', '1/x', '|x|', 'n!'].includes(btn)) {
                            onClick = () => handleFunction(btn);
                        } else if (btn === '^') onClick = () => handleFunction('power');
                        else if (btn === 'π') onClick = () => setDisplay(display === '0' ? 'π' : display + 'π');
                        else if (btn === 'e') onClick = () => setDisplay(display === '0' ? 'e' : display + 'e');
                        else onClick = () => handleClick(btn);

                        return (
                            <button
                                key={index}
                                onClick={onClick}
                                className={`${getButtonClass(btn)} py-3 rounded-lg font-medium transition-colors ${btn === '0' ? 'col-span-1' : ''}`}
                            >
                                {btn}
                            </button>
                        );
                    })}
                </div>

                {history.length > 0 && (
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                        <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">计算历史</h3>
                        <div className="space-y-1 text-sm font-mono">
                            {history.slice(-5).map((h, i) => (
                                <div key={i} className="text-gray-600 dark:text-gray-300">{h}</div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ScientificCalculator;

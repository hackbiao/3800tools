import React, { useState, useEffect } from 'react';

type PrecisionType = 'FP32' | 'FP16' | 'BF16' | 'INT8' | 'INT4';
type ModeType = 'inference' | 'training';
type OptimizerType = 'Adam' | 'AdamW' | 'SGD';

interface CalculationResult {
    modelMemory: number;
    activationMemory: number;
    gradientMemory: number;
    optimizerMemory: number;
    kvCacheMemory: number;
    totalMemory: number;
}

const VRAMCalculatorTool: React.FC = () => {
    // 基础参数
    const [parameters, setParameters] = useState<string>('7');
    const [precision, setPrecision] = useState<PrecisionType>('FP16');
    const [mode, setMode] = useState<ModeType>('inference');

    // 推理参数
    const [batchSize, setBatchSize] = useState<string>('1');
    const [sequenceLength, setSequenceLength] = useState<string>('2048');

    // 训练参数
    const [gradientCheckpointing, setGradientCheckpointing] = useState<boolean>(false);
    const [optimizer, setOptimizer] = useState<OptimizerType>('Adam');
    const [mixedPrecision, setMixedPrecision] = useState<boolean>(false);

    // 计算结果
    const [result, setResult] = useState<CalculationResult | null>(null);

    // 精度对应的字节数
    const precisionBytes: Record<PrecisionType, number> = {
        FP32: 4,
        FP16: 2,
        BF16: 2,
        INT8: 1,
        INT4: 0.5,
    };

    // 计算显存
    useEffect(() => {
        const params = parseFloat(parameters);
        const batch = parseInt(batchSize);
        const seqLen = parseInt(sequenceLength);

        if (!params || params <= 0 || !batch || batch <= 0 || !seqLen || seqLen <= 0) {
            setResult(null);
            return;
        }

        // 转换为实际参数数量（十亿）
        const totalParams = params * 1e9;
        const bytesPerParam = precisionBytes[precision];

        // 1. 模型权重内存（GB）
        const modelMemory = (totalParams * bytesPerParam) / (1024 ** 3);

        // 2. 激活内存估算（简化公式，实际会根据模型架构有所不同）
        // 激活内存 ≈ batch_size × sequence_length × hidden_size × num_layers × 因子
        // 简化估算：每B参数约占用 12 * batch * seqLen / 1000 的激活内存（MB）
        const activationFactor = gradientCheckpointing ? 0.2 : 1.0; // 梯度检查点可大幅降低激活内存
        const activationMemory = (batch * seqLen * params * 12 * activationFactor) / 1000;

        // 3. KV Cache 内存（仅推理）
        // KV Cache ≈ 2 × batch × seq_len × num_layers × hidden_size × bytes
        // 简化：每B参数约占 0.5 * batch * seqLen / 1000 GB
        const kvCacheMemory = mode === 'inference'
            ? (batch * seqLen * params * 0.5 * bytesPerParam) / 2000
            : 0;

        let gradientMemory = 0;
        let optimizerMemory = 0;

        if (mode === 'training') {
            // 4. 梯度内存（与模型权重相同）
            const gradPrecision = mixedPrecision ? 2 : bytesPerParam; // 混合精度训练梯度通常用FP16
            gradientMemory = (totalParams * gradPrecision) / (1024 ** 3);

            // 5. 优化器状态内存
            // Adam/AdamW: 需要两个状态 (momentum + variance)，每个都是FP32
            // SGD: 只需要一个momentum状态
            const optimizerStates = optimizer === 'SGD' ? 1 : 2;
            const optimizerPrecision = 4; // 优化器状态通常用FP32
            optimizerMemory = (totalParams * optimizerStates * optimizerPrecision) / (1024 ** 3);
        }

        // 总显存
        const totalMemory = modelMemory + activationMemory + gradientMemory + optimizerMemory + kvCacheMemory;

        setResult({
            modelMemory,
            activationMemory,
            gradientMemory,
            optimizerMemory,
            kvCacheMemory,
            totalMemory,
        });
    }, [parameters, precision, mode, batchSize, sequenceLength, gradientCheckpointing, optimizer, mixedPrecision]);

    // 格式化显存大小
    const formatMemory = (gb: number): string => {
        if (gb < 1) {
            return `${(gb * 1024).toFixed(2)} MB`;
        }
        return `${gb.toFixed(2)} GB`;
    };

    // 推荐显卡
    const getRecommendedGPU = (totalGB: number): string => {
        if (totalGB <= 8) return 'RTX 3060 Ti (8GB), RTX 4060 Ti (8GB)';
        if (totalGB <= 12) return 'RTX 3060 (12GB), RTX 4060 Ti (16GB)';
        if (totalGB <= 16) return 'RTX 4080 (16GB), RTX 3090 (24GB)';
        if (totalGB <= 24) return 'RTX 3090/4090 (24GB), A5000 (24GB)';
        if (totalGB <= 40) return 'A100 (40GB), A6000 (48GB)';
        if (totalGB <= 48) return 'A6000 (48GB)';
        if (totalGB <= 80) return 'A100 (80GB), H100 (80GB)';
        return '需要多卡并行或模型并行';
    };

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-6xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">
                    显存计算器
                </p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                    计算 AI 模型训练和推理所需的显存大小
                </p>
            </div>

            <div className="w-full max-w-6xl rounded-xl border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/20 shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                    {/* 左侧：参数设置 */}
                    <div className="flex flex-col gap-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined">settings</span>
                                参数设置
                            </h3>

                            {/* 模型参数量 */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    模型参数量 (Billion)
                                </label>
                                <input
                                    type="number"
                                    value={parameters}
                                    onChange={(e) => setParameters(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    placeholder="例如: 7 (7B), 13 (13B), 70 (70B)"
                                    step="0.1"
                                    min="0.01"
                                />
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    常见模型: Llama 7B, Llama 13B, Llama 70B, GPT-3 175B
                                </p>
                            </div>

                            {/* 精度选择 */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    精度 (Precision)
                                </label>
                                <div className="grid grid-cols-5 gap-2">
                                    {(['FP32', 'FP16', 'BF16', 'INT8', 'INT4'] as PrecisionType[]).map((p) => (
                                        <button
                                            key={p}
                                            onClick={() => setPrecision(p)}
                                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                                precision === p
                                                    ? 'bg-primary text-white shadow-md'
                                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                            }`}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {precision === 'FP32' && '32位浮点 (4 bytes) - 最高精度'}
                                    {precision === 'FP16' && '16位浮点 (2 bytes) - 常用于训练和推理'}
                                    {precision === 'BF16' && '16位浮点 (2 bytes) - 更好的数值范围'}
                                    {precision === 'INT8' && '8位整数 (1 byte) - 量化推理'}
                                    {precision === 'INT4' && '4位整数 (0.5 bytes) - 极致量化'}
                                </p>
                            </div>

                            {/* 模式选择 */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    模式 (Mode)
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={() => setMode('inference')}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                            mode === 'inference'
                                                ? 'bg-primary text-white shadow-md'
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                        }`}
                                    >
                                        推理 (Inference)
                                    </button>
                                    <button
                                        onClick={() => setMode('training')}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                            mode === 'training'
                                                ? 'bg-primary text-white shadow-md'
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                        }`}
                                    >
                                        训练 (Training)
                                    </button>
                                </div>
                            </div>

                            {/* Batch Size */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    批次大小 (Batch Size)
                                </label>
                                <input
                                    type="number"
                                    value={batchSize}
                                    onChange={(e) => setBatchSize(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    placeholder="例如: 1, 4, 8, 16"
                                    step="1"
                                    min="1"
                                />
                            </div>

                            {/* Sequence Length */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    序列长度 (Sequence Length)
                                </label>
                                <input
                                    type="number"
                                    value={sequenceLength}
                                    onChange={(e) => setSequenceLength(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    placeholder="例如: 512, 1024, 2048, 4096"
                                    step="128"
                                    min="1"
                                />
                            </div>

                            {/* 训练特定参数 */}
                            {mode === 'training' && (
                                <>
                                    <div className="mb-4">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={gradientCheckpointing}
                                                onChange={(e) => setGradientCheckpointing(e.target.checked)}
                                                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                梯度检查点 (Gradient Checkpointing)
                                            </span>
                                        </label>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-6">
                                            显著降低激活内存，但会增加训练时间
                                        </p>
                                    </div>

                                    <div className="mb-4">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={mixedPrecision}
                                                onChange={(e) => setMixedPrecision(e.target.checked)}
                                                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                混合精度训练 (Mixed Precision)
                                            </span>
                                        </label>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-6">
                                            使用 FP16 梯度降低内存占用
                                        </p>
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            优化器 (Optimizer)
                                        </label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {(['Adam', 'AdamW', 'SGD'] as OptimizerType[]).map((opt) => (
                                                <button
                                                    key={opt}
                                                    onClick={() => setOptimizer(opt)}
                                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                                        optimizer === opt
                                                            ? 'bg-primary text-white shadow-md'
                                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                                    }`}
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            {optimizer === 'SGD' ? 'SGD 占用内存较少' : 'Adam/AdamW 需要额外的动量和方差状态'}
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* 右侧：计算结果 */}
                    <div className="flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined">analytics</span>
                            计算结果
                        </h3>

                        {result ? (
                            <div className="flex-1 space-y-4">
                                {/* 总显存 */}
                                <div className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-6 border border-primary/20">
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">总显存需求</p>
                                    <p className="text-4xl font-bold text-primary mb-2">
                                        {formatMemory(result.totalMemory)}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        推荐显卡: {getRecommendedGPU(result.totalMemory)}
                                    </p>
                                </div>

                                {/* 详细分解 */}
                                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 space-y-3">
                                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                        显存分解
                                    </p>

                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">模型权重</span>
                                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                            {formatMemory(result.modelMemory)}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">激活内存</span>
                                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                            {formatMemory(result.activationMemory)}
                                        </span>
                                    </div>

                                    {mode === 'inference' && result.kvCacheMemory > 0 && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">KV Cache</span>
                                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                {formatMemory(result.kvCacheMemory)}
                                            </span>
                                        </div>
                                    )}

                                    {mode === 'training' && (
                                        <>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600 dark:text-gray-400">梯度内存</span>
                                                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                    {formatMemory(result.gradientMemory)}
                                                </span>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600 dark:text-gray-400">优化器状态</span>
                                                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                    {formatMemory(result.optimizerMemory)}
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* 提示信息 */}
                                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                                    <div className="flex items-start gap-2">
                                        <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-xl">
                                            info
                                        </span>
                                        <div className="flex-1 text-xs text-blue-800 dark:text-blue-300 space-y-1">
                                            <p className="font-medium">注意事项:</p>
                                            <ul className="list-disc list-inside space-y-1 ml-2">
                                                <li>以上计算为估算值，实际显存占用会因模型架构、框架实现等因素有所差异</li>
                                                <li>建议预留 10-20% 的显存余量以应对峰值占用</li>
                                                <li>使用量化技术 (INT8/INT4) 可显著降低显存需求</li>
                                                {mode === 'training' && <li>使用梯度检查点、ZeRO 等技术可进一步优化显存占用</li>}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 flex items-center justify-center text-gray-400 dark:text-gray-500">
                                <div className="text-center">
                                    <span className="material-symbols-outlined text-5xl mb-2 block opacity-50">
                                        calculate
                                    </span>
                                    <p className="text-sm">请输入有效的参数进行计算</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VRAMCalculatorTool;

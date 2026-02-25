import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import { withErrorHandling } from '../utils/errorHandler';

interface ToolWrapperProps {
    toolName: string;
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

const ToolWrapper: React.FC<ToolWrapperProps> = ({ toolName, children, fallback }) => {
    // 为错误边界提供工具特定的错误信息
    const errorFallback = fallback || (
        <div className="min-h-[400px] flex items-center justify-center">
            <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md">
                <span className="material-symbols-outlined text-6xl text-red-500 mb-4">
                    error
                </span>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {toolName} 出现错误
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    抱歉，{toolName}遇到了问题。请刷新页面重试。
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                    刷新页面
                </button>
            </div>
        </div>
    );

    return (
        <ErrorBoundary fallback={errorFallback}>
            {children}
        </ErrorBoundary>
    );
};

// HOC 为组件添加统一错误处理
export const withToolErrorHandler = <P extends object>(
    WrappedComponent: React.ComponentType<P>,
    toolName: string
) => {
    const WithErrorHandler = (props: P) => {
        return (
            <ToolWrapper toolName={toolName}>
                <WrappedComponent {...props} />
            </ToolWrapper>
        );
    };

    WithErrorHandler.displayName = `withToolErrorHandler(${WrappedComponent.displayName || WrappedComponent.name})`;

    return WithErrorHandler;
};

// 生成带有工具包装器的组件的hook
export const useSafeToolOperation = (
    toolName: string,
    operation: () => Promise<void> | void
) => {
    return withErrorHandling(async () => {
        await operation();
    }, `${toolName}执行操作失败`, toolName);
};

export default ToolWrapper;
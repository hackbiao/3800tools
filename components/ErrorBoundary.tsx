import React, { Component, ErrorInfo, ReactNode } from 'react';
import { errorHandler } from '../utils/errorHandler';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        errorHandler.error('组件边界错误', error, {
            component: 'ErrorBoundary',
            action: 'component-did-catch',
            errorInfo: {
                componentStack: errorInfo.componentStack,
                errorBoundary: this.toString()
            }
        });
    }

    render() {
        if (this.state.hasError) {
            // 自定义降级UI
            if (this.props.fallback) {
                return <>{this.props.fallback}</>;
            }
            
            return (
                <div className="min-h-[400px] flex items-center justify-center">
                    <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md">
                        <span className="material-symbols-outlined text-6xl text-red-500 mb-4">
                            error
                        </span>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            出现错误
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            抱歉，这个工具遇到了问题。请刷新页面重试。
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            刷新页面
                        </button>
                        {process.env.NODE_ENV === 'development' && (
                            <details className="mt-4 text-left">
                                <summary className="cursor-pointer text-sm text-gray-500">
                                    查看错误详情
                                </summary>
                                <pre className="mt-2 text-xs text-red-500 whitespace-pre-wrap">
                                    {this.state.error?.stack}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
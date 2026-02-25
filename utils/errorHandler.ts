/**
 * 错误处理工具
 * 统一处理和记录错误，开发环境输出到控制台，生产环境静默
 */

interface ErrorContext {
    component: string;
    action?: string;
    [key: string]: any;
}

class ErrorHandler {
    private isDevelopment: boolean;

    constructor() {
        this.isDevelopment = import.meta.env.DEV;
    }

    /**
     * 错误记录方法
     * @param message - 错误信息
     * @param error - 错误对象或字符串
     * @param context - 错误上下文信息
     */
    error(message: string, error?: unknown, context?: ErrorContext) {
        const errorInfo = {
            timestamp: new Date().toISOString(),
            message,
            error: this.formatError(error),
            context: context || {}
        };

        // 开发环境输出到控制台
        if (this.isDevelopment) {
            console.error(`[Error] ${message}`, error, context);
        }

        // 生产环境可以发送到错误监控服务
        // TODO: 集成Sentry或其他错误监控服务
        this.reportError(errorInfo);
    }

    /**
     * 警告记录方法
     */
    warn(message: string, context?: ErrorContext) {
        if (this.isDevelopment) {
            console.warn(`[Warning] ${message}`, context);
        }
    }

    /**
     * 信息记录方法
     */
    info(message: string, context?: ErrorContext) {
        if (this.isDevelopment) {
            console.info(`[Info] ${message}`, context);
        }
    }

    /**
     * 格式化错误对象
     */
    private formatError(error: unknown): string {
        if (error instanceof Error) {
            return `${error.name}: ${error.message}\n${error.stack}`;
        }
        return String(error);
    }

    /**
     * 上报错误到监控服务
     */
    private reportError(errorInfo: any) {
        // 生产环境实现错误上报
        // 如集成Sentry: Sentry.captureException(new Error(errorInfo.message));
    }
}

// 创建全局错误处理器实例
export const errorHandler = new ErrorHandler();

/**
 * 便捷的错误处理函数
 */
export const handleError = (message: string, error?: unknown, component?: string) => {
    errorHandler.error(message, error, { component });
};

/**
 * 异步操作错误处理装饰器
 */
export const withErrorHandling = async <T>(
    asyncFn: () => Promise<T>,
    errorMessage: string,
    component?: string
): Promise<T | null> => {
    try {
        return await asyncFn();
    } catch (error) {
        handleError(errorMessage, error, component);
        return null;
    }
};

export default errorHandler;
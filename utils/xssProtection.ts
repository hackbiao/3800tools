/**
 * XSS 防护工具
 * 提供输入验证、输出编码和安全操作方法
 */

/**
 * HTML实体编码 - 防止XSS攻击
 */
export const escapeHtml = (text: string): string => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
};

/**
 * 解码HTML实体（谨慎使用）
 */
export const unescapeHtml = (html: string): string => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || '';
};

/**
 * 验证URL是否安全
 */
export const isValidUrl = (url: string): boolean => {
    if (!url || typeof url !== 'string') return false;
    
    try {
        const parsed = new URL(url);
        // 只允许http和https协议
        return ['http:', 'https:'].includes(parsed.protocol);
    } catch {
        return false;
    }
};

/**
 * 清理和验证用户输入
 */
export const sanitizeInput = (input: string, maxLength: number = 10000): string => {
    if (typeof input !== 'string') return '';
    
    // 限制长度
    let cleaned = input.substring(0, maxLength);
    
    // 移除潜在的脚本标签
    cleaned = cleaned.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    
    // 移除危险的HTML属性
    cleaned = cleaned.replace(/on\w+\s*=/gi, '');
    
    // 移除javascript:协议
    cleaned = cleaned.replace(/javascript:/gi, '');
    
    return cleaned.trim();
};

/**
 * 安全的DOM操作
 */
export const safeDOM = {
    /**
     * 安全地创建和插入HTML内容
     */
    insertHTML: (container: Element, content: string, position: InsertPosition = 'beforeend') => {
        const cleanContent = sanitizeInput(content);
        
        // 如果内容包含HTML标签，验证其安全性
        if (/<[^>]*>/.test(cleanContent)) {
            // 允许的HTML标签白名单
            const allowedTags = ['div', 'span', 'p', 'br', 'strong', 'em', 'code', 'pre'];
            const tagRegex = /<(\w+)[^>]*>/g;
            let match;
            
            while ((match = tagRegex.exec(cleanContent)) !== null) {
                const tagName = match[1].toLowerCase();
                if (!allowedTags.includes(tagName)) {
                    console.warn(`不允许的HTML标签: ${tagName}`);
                    return;
                }
            }
        }
        
        container.insertAdjacentHTML(position, cleanContent);
    },

    /**
     * 安全地设置文本内容
     */
    setText: (element: Element, text: string) => {
        element.textContent = text;
    },

    /**
     * 安全地设置HTML内容
     */
    setHTML: (element: Element, html: string) => {
        const cleanHtml = sanitizeInput(html);
        element.innerHTML = cleanHtml;
    }
};

/**
 * 验证和管理用户上传文件
 */
export const fileSecurity = {
    /**
     * 检查文件类型是否安全
     */
    isSafeFileType: (file: File): boolean => {
        const allowedTypes = [
            'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
            'text/plain', 'text/csv', 'application/json',
            'application/pdf', 'application/xml'
        ];
        
        return allowedTypes.includes(file.type);
    },

    /**
     * 检查文件大小是否在限制范围内
     */
    isSafeFileSize: (file: File, maxSizeMB: number = 10): boolean => {
        const maxSizeBytes = maxSizeMB * 1024 * 1024;
        return file.size <= maxSizeBytes;
    },

    /**
     * 安全的文件读取
     */
    readFile: (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            if (!fileSecurity.isSafeFileType(file)) {
                reject(new Error('不支持的文件类型'));
                return;
            }
            
            if (!fileSecurity.isSafeFileSize(file)) {
                reject(new Error('文件大小超出限制'));
                return;
            }
            
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = () => reject(new Error('文件读取失败'));
            reader.readAsText(file);
        });
    }
};

/**
 * 验证和处理API调用
 */
export const apiSecurity = {
    /**
     * 验证API响应的完整性
     */
    validateResponse: (response: any): boolean => {
        if (typeof response !== 'object' || response === null) {
            return false;
        }
        
        // 验证响应的基本结构
        return !('script' in response) && !('javascript:' in JSON.stringify(response));
    },

    /**
     * 创建安全的请求参数
     */
    createSafeParams: (params: Record<string, any>): Record<string, any> => {
        const safeParams: Record<string, any> = {};
        
        for (const [key, value] of Object.entries(params)) {
            // 验证参数键
            if (typeof key === 'string' && !/<script|javascript:|on\w+=/i.test(key)) {
                // 验证参数值
                if (typeof value === 'string') {
                    safeParams[key] = sanitizeInput(value, 1000);
                } else if (typeof value === 'number' || typeof value === 'boolean') {
                    safeParams[key] = value;
                } else {
                    // 忽略复杂对象
                }
            }
        }
        
        return safeParams;
    }
};

// 全局XSS防护检测
if (typeof window !== 'undefined') {
    // 检测潜在的XSS攻击
    const detectXSS = () => {
        const url = window.location.href;
        const query = window.location.search;
        
        // 简单的XSS检测模式
        const xssPatterns = [
            /<script/i,
            /javascript:/i,
            /on\w+\s*=/i,
            /<iframe/i
        ];
        
        for (const pattern of xssPatterns) {
            if (pattern.test(query)) {
                console.warn('检测到潜在的XSS攻击:', query);
                // 可以在这里添加更多的安全处理逻辑
                return true;
            }
        }
        
        return false;
    };
    
    // 页面加载时检查XSS
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', detectXSS);
    } else {
        detectXSS();
    }
}

export default {
    escapeHtml,
    unescapeHtml,
    isValidUrl,
    sanitizeInput,
    safeDOM,
    fileSecurity,
    apiSecurity
};
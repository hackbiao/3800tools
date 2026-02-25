import React, { useState, useEffect } from 'react';
import { errorHandler } from '../utils/errorHandler';

interface BrowserInfo {
    userAgent: string;
    platform: string;
    language: string;
    cookieEnabled: boolean;
    doNotTrack: string | null;
    hardwareConcurrency: number;
    deviceMemory: number | null;
    maxTouchPoints: number;
    screenWidth: number;
    screenHeight: number;
    windowWidth: number;
    windowHeight: number;
    pixelRatio: number;
    colorDepth: number;
    online: boolean;
    connection: {
        effectiveType: string;
        downlink: number;
        rtt: number;
    } | null;
    timezone: string;
    timezoneOffset: number;
    localStorage: boolean;
    sessionStorage: boolean;
    indexedDB: boolean;
    webGL: string | null;
    webGLVendor: string | null;
    cookies: string;
}

const BrowserFingerprint: React.FC = () => {
    const [info, setInfo] = useState<BrowserInfo | null>(null);

    useEffect(() => {
        const getWebGLInfo = (): { renderer: string | null; vendor: string | null } => {
            try {
                const canvas = document.createElement('canvas');
                const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext;
                if (!gl) return { renderer: null, vendor: null };
                
                const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                if (!debugInfo) return { renderer: null, vendor: null };
                
                return {
                    renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL),
                    vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
                };
            } catch {
                return { renderer: null, vendor: null };
            }
        };

        const webGLInfo = getWebGLInfo();
        const nav = navigator as any;

        setInfo({
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            cookieEnabled: navigator.cookieEnabled,
            doNotTrack: navigator.doNotTrack,
            hardwareConcurrency: navigator.hardwareConcurrency || 0,
            deviceMemory: nav.deviceMemory || null,
            maxTouchPoints: navigator.maxTouchPoints || 0,
            screenWidth: screen.width,
            screenHeight: screen.height,
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
            pixelRatio: window.devicePixelRatio,
            colorDepth: screen.colorDepth,
            online: navigator.onLine,
            connection: nav.connection ? {
                effectiveType: nav.connection.effectiveType || 'unknown',
                downlink: nav.connection.downlink || 0,
                rtt: nav.connection.rtt || 0,
            } : null,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            timezoneOffset: new Date().getTimezoneOffset(),
            localStorage: !!window.localStorage,
            sessionStorage: !!window.sessionStorage,
            indexedDB: !!window.indexedDB,
            webGL: webGLInfo.renderer,
            webGLVendor: webGLInfo.vendor,
            cookies: navigator.cookieEnabled ? '已启用' : '已禁用',
        });
    }, []);

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            errorHandler.error('复制失败', err, { component: '"$(basename $file .tsx)"', action: 'copy' });
        }
    };

    const copyAllInfo = async () => {
        if (!info) return;
        const text = JSON.stringify(info, null, 2);
        await copyToClipboard(text);
    };

    const sections = info ? [
        {
            title: '浏览器信息',
            items: [
                { key: 'User Agent', value: info.userAgent },
                { key: '平台', value: info.platform },
                { key: '语言', value: info.language },
                { key: 'Cookies', value: info.cookies },
                { key: 'Do Not Track', value: info.doNotTrack || '未设置' },
            ],
        },
        {
            title: '硬件信息',
            items: [
                { key: 'CPU核心数', value: `${info.hardwareConcurrency} 核` },
                { key: '设备内存', value: info.deviceMemory ? `${info.deviceMemory} GB` : '未知' },
                { key: '触控点数', value: info.maxTouchPoints.toString() },
                { key: 'WebGL渲染器', value: info.webGL || '不支持' },
                { key: 'WebGL厂商', value: info.webGLVendor || '不支持' },
            ],
        },
        {
            title: '屏幕信息',
            items: [
                { key: '屏幕分辨率', value: `${info.screenWidth} × ${info.screenHeight}` },
                { key: '窗口大小', value: `${info.windowWidth} × ${info.windowHeight}` },
                { key: '像素比例', value: info.pixelRatio.toString() },
                { key: '颜色深度', value: `${info.colorDepth} bit` },
            ],
        },
        {
            title: '网络信息',
            items: [
                { key: '在线状态', value: info.online ? '在线' : '离线' },
                { key: '连接类型', value: info.connection?.effectiveType || '未知' },
                { key: '下行带宽', value: info.connection ? `${info.connection.downlink} Mbps` : '未知' },
                { key: '往返延迟', value: info.connection ? `${info.connection.rtt} ms` : '未知' },
            ],
        },
        {
            title: '存储支持',
            items: [
                { key: 'LocalStorage', value: info.localStorage ? '✓ 支持' : '✗ 不支持' },
                { key: 'SessionStorage', value: info.sessionStorage ? '✓ 支持' : '✗ 不支持' },
                { key: 'IndexedDB', value: info.indexedDB ? '✓ 支持' : '✗ 不支持' },
            ],
        },
        {
            title: '时区信息',
            items: [
                { key: '时区', value: info.timezone },
                { key: '时区偏移', value: `${info.timezoneOffset} 分钟` },
            ],
        },
    ] : [];

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-4xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">浏览器指纹</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">查看当前浏览器的详细信息、硬件配置和网络状态</p>
            </div>

            <div className="w-full max-w-4xl space-y-6">
                <div className="flex justify-end">
                    <button
                        onClick={copyAllInfo}
                        disabled={!info}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50"
                    >
                        复制全部信息
                    </button>
                </div>

                {sections.map(section => (
                    <div key={section.title} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-2 font-medium text-gray-900 dark:text-white">
                            {section.title}
                        </div>
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                            {section.items.map(item => (
                                <div key={item.key} className="flex items-start justify-between px-4 py-3">
                                    <span className="text-sm text-gray-500 dark:text-gray-400">{item.key}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-900 dark:text-white text-right break-all max-w-md">{item.value}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">说明</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• 浏览器指纹信息仅供本地查看，不会上传到服务器</li>
                        <li>• 不同浏览器可能显示不同的信息</li>
                        <li>• 部分信息可能因浏览器隐私设置而不显示</li>
                        <li>• 网络信息需要浏览器支持 Network Information API</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BrowserFingerprint;

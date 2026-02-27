import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const isProduction = mode === 'production';
    
    // 优先使用环境变量，否则根据部署平台设置默认值
    const base = process.env.BASE_URL || env.BASE_URL || (isProduction ? '/FreeTool/' : '/');

    console.log('Build config - base:', base);

    return {
        base,
        server: {
            port: 3000,
            host: '0.0.0.0',
        },
        plugins: [
            react(),
            viteCompression({
                algorithm: 'gzip',
                ext: '.gz',
                threshold: 10240,
                deleteOriginFile: false,
            }),
            viteCompression({
                algorithm: 'brotliCompress',
                ext: '.br',
                threshold: 10240,
                deleteOriginFile: false,
            }),
        ],
        define: {
            'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
            'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, '.'),
            }
        },
        build: {
            rollupOptions: {
                output: {
                    manualChunks: {
                        'react-vendor': ['react', 'react-dom', 'react-router-dom'],
                        'pdf-vendor': ['pdfjs-dist', 'pptxgenjs'],
                        'crypto-vendor': ['crypto-js'],
                        'qrcode-vendor': ['qrcode'],
                        'gif-vendor': ['gifuct-js', 'gif.js'],
                        'editor-vendor': ['mammoth'],
                    },
                    assetFileNames: (assetInfo) => {
                        const info = assetInfo.name.split('.');
                        const extType = info[info.length - 1];
                        if (/png|jpe?g|svg|gif|ico|webp/i.test(extType)) {
                            return 'assets/images/[name]-[hash][extname]';
                        }
                        if (/woff2?|ttf|otf/i.test(extType)) {
                            return 'assets/fonts/[name]-[hash][extname]';
                        }
                        return 'assets/[name]-[hash][extname]';
                    },
                    chunkFileNames: 'assets/js/[name]-[hash].js',
                    entryFileNames: 'assets/js/[name]-[hash].js',
                },
            },
            cssCodeSplit: true,
            sourcemap: mode !== 'production',
            chunkSizeWarningLimit: 1500,
            minify: 'terser',
            terserOptions: {
                compress: {
                    drop_console: true,
                    drop_debugger: true,
                },
            },
        },
        optimizeDeps: {
            include: ['react', 'react-dom', 'react-router-dom'],
        },
    };
});

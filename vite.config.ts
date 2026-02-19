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
                    },
                },
            },
            cssCodeSplit: true,
            sourcemap: mode !== 'production',
            chunkSizeWarningLimit: 1000,
        },
    };
});

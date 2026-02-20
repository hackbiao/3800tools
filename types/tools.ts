import type { FC, LazyExoticComponent } from 'react';

export type ToolType =
    | 'translate'
    | 'image-converter'
    | 'image-editor'
    | 'image-comparison'
    | 'image-round-corner'
    | 'photo-collage'
    | 'code-highlight'
    | 'text-formatter'
    | 'json-formatter'
    | 'xml-formatter'
    | 'math-formula'
    | 'table-converter'
    | 'video-aspect-converter'
    | 'text-diff'
    | 'pdf-to-ppt'
    | 'pdf-to-image'
    | 'resume-generator'
    | 'prompt-generator'
    | 'mbti-test'
    | 'image-to-prompt'
    | 'image-watermark-remover'
    | 'mind-map'
    | 'drawing'
    | 'vram-calculator'
    | 'mortgage-calculator'
    | 'pension-calculator'
    | 'tax-calculator'
    | 'qrcode-generator'
    | 'chinese-converter'
    | 'timestamp-converter'
    | 'base64-tool'
    | 'password-generator'
    | 'uuid-generator'
    | 'color-picker'
    | 'id-card-parser'
    | 'unit-converter'
    | 'hash-calculator'
    | 'regex-tester'
    | 'number-base-converter'
    | 'crypto-tool'
    | 'cron-parser'
    | 'bmi-calculator'
    | 'date-calculator'
    | 'stopwatch'
    | 'countdown-timer'
    | 'text-statistics'
    | 'text-transform'
    | 'loan-calculator'
    | 'world-clock'
    | 'percentage-calculator'
    | 'scientific-calculator'
    | 'ip-converter'
    | 'ip-subnet-calculator'
    | 'image-compressor'
    | 'age-calculator'
    | 'encoding-converter'
    | 'number-generator'
    | 'status-code-lookup'
    | 'port-lookup'
    | 'url-parser'
    | 'browser-fingerprint'
    | 'curl-generator'
    | 'image-watermark'
    | 'image-bg-remover'
    | 'image-to-ico'
    | 'gif-maker'
    | 'gif-splitter'
    | 'gif-compressor'
    | 'word-cloud'
    | 'grid-image-cutter'
    | 'photo-bg-changer'
    | 'markdown-editor'
    | 'code-formatter'
    | 'json-escape'
    | 'random-data'
    | 'mock-data'
    | 'linux-command'
    | 'chinese-to-pinyin'
    | 'relationship-calculator'
    | 'ascii-art';

export type CategoryType = 'text' | 'image' | 'data' | 'media' | 'ai' | 'calculator' | 'utility' | 'network' | 'dev';

export interface Tool {
    id: ToolType;
    name: string;
    icon: string;
    path: string;
    description: string;
    keywords: string[];
    component: LazyExoticComponent<FC>;
}

export interface ToolCategory {
    id: CategoryType;
    name: string;
    icon: string;
    description: string;
    tools: Tool[];
}

export interface ToolSEO {
    title: string;
    description: string;
    keywords: string;
}

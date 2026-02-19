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
    | 'vram-calculator';

export type CategoryType = 'text' | 'image' | 'data' | 'media' | 'ai';

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

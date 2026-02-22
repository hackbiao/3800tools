import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://tools.3800ai.com';

const categories = [
    'calculator',
    'utility', 
    'text',
    'image',
    'data',
    'media',
    'ai',
    'network',
    'dev'
];

const tools = [
    'translate',
    'image-converter',
    'image-editor',
    'image-comparison',
    'image-round-corner',
    'photo-collage',
    'code-highlight',
    'text-formatter',
    'json-formatter',
    'xml-formatter',
    'math-formula',
    'table-converter',
    'video-aspect-converter',
    'text-diff',
    'pdf-to-ppt',
    'pdf-to-image',
    'resume-generator',
    'prompt-generator',
    'mbti-test',
    'image-to-prompt',
    'image-watermark-remover',
    'mind-map',
    'drawing',
    'vram-calculator',
    'mortgage-calculator',
    'pension-calculator',
    'tax-calculator',
    'qrcode-generator',
    'chinese-converter',
    'timestamp-converter',
    'base64-tool',
    'password-generator',
    'uuid-generator',
    'color-picker',
    'id-card-parser',
    'unit-converter',
    'hash-calculator',
    'regex-tester',
    'number-base-converter',
    'crypto-tool',
    'cron-parser',
    'bmi-calculator',
    'date-calculator',
    'stopwatch',
    'countdown-timer',
    'text-statistics',
    'text-transform',
    'loan-calculator',
    'world-clock',
    'percentage-calculator',
    'scientific-calculator',
    'ip-converter',
    'ip-subnet-calculator',
    'image-compressor',
    'age-calculator',
    'encoding-converter',
    'number-generator',
    'status-code-lookup',
    'port-lookup',
    'url-parser',
    'browser-fingerprint',
    'curl-generator',
    'image-watermark',
    'image-bg-remover',
    'image-to-ico',
    'gif-maker',
    'gif-splitter',
    'gif-compressor',
    'word-cloud',
    'grid-image-cutter',
    'photo-bg-changer',
    'markdown-editor',
    'code-formatter',
    'json-escape',
    'random-data',
    'mock-data',
    'linux-command',
    'chinese-to-pinyin',
    'relationship-calculator',
    'ascii-art'
];

const today = new Date().toISOString().split('T')[0];

const urlEntries = [
    {
        loc: `${BASE_URL}/`,
        lastmod: today,
        changefreq: 'weekly',
        priority: '1.0'
    },
    {
        loc: `${BASE_URL}/category/all`,
        lastmod: today,
        changefreq: 'weekly',
        priority: '0.9'
    },
    ...categories.map(cat => ({
        loc: `${BASE_URL}/category/${cat}`,
        lastmod: today,
        changefreq: 'weekly',
        priority: '0.8'
    })),
    ...tools.map(tool => ({
        loc: `${BASE_URL}/${tool}`,
        lastmod: today,
        changefreq: 'monthly',
        priority: '0.7'
    }))
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries.map(entry => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

const projectRoot = path.join(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');
const sitemapPath = path.join(publicDir, 'sitemap.xml');

fs.writeFileSync(sitemapPath, sitemap, 'utf-8');

console.log(`Generated sitemap.xml with ${urlEntries.length} URLs`);
console.log(`- 1 homepage`);
console.log(`- ${categories.length + 1} category pages`);
console.log(`- ${tools.length} tool pages`);

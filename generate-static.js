import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, 'dist');

const routes = {
    '/': {
        title: '三八零零 - 在线免费工具箱 | 文本翻译、图片处理、代码高亮、PDF转换',
        description: '三八零零是一个免费的在线工具箱，提供在线翻译、图片格式转换、JSON格式化、代码高亮、思维导图、PDF转换等50+种实用工具，所有工具在浏览器本地运行，数据安全有保障。',
        keywords: '在线工具,免费工具,翻译工具,图片处理,JSON格式化,代码高亮,思维导图,PDF转换,文本工具,图片编辑',
    },
    '/category/calculator': {
        title: '计算工具 - 三八零零在线工具箱',
        description: '房贷计算器、个税计算器、BMI计算器、日期计算器、科学计算器等实用计算工具。',
        keywords: '计算器,房贷计算,个税计算,BMI计算,日期计算',
    },
    '/category/utility': {
        title: '便民工具 - 三八零零在线工具箱',
        description: '时间戳转换、Base64编解码、密码生成器、二维码生成器、单位换算等便民工具。',
        keywords: '便民工具,时间戳转换,Base64,密码生成,二维码',
    },
    '/category/text': {
        title: '文本工具 - 三八零零在线工具箱',
        description: '在线翻译、代码高亮、JSON格式化、文本差异对比、文字统计等文本处理工具。',
        keywords: '文本工具,在线翻译,代码高亮,JSON格式化,文本对比',
    },
    '/category/image': {
        title: '图片工具 - 三八零零在线工具箱',
        description: '图片格式转换、图片编辑、图片拼接、图片压缩、水印去除等图片处理工具。',
        keywords: '图片工具,图片转换,图片编辑,图片压缩,去水印',
    },
    '/category/data': {
        title: '数据工具 - 三八零零在线工具箱',
        description: '表格格式转换、数学公式编辑、思维导图、绘图画布等数据处理工具。',
        keywords: '数据工具,表格转换,数学公式,思维导图',
    },
    '/category/media': {
        title: '媒体工具 - 三八零零在线工具箱',
        description: '视频比例转换、PDF转PPT、PDF转长图等媒体处理工具。',
        keywords: '媒体工具,视频转换,PDF转换,PDF转PPT',
    },
    '/category/ai': {
        title: 'AI工具 - 三八零零在线工具箱',
        description: '图片转提示词、简历生成器、提示词生成器、MBTI人格测试等AI智能工具。',
        keywords: 'AI工具,简历生成,提示词生成,MBTI测试',
    },
    '/category/network': {
        title: '网络工具 - 三八零零在线工具箱',
        description: 'IP地址转换、子网计算、HTTP状态码查询、端口查询、URL解析等网络工具。',
        keywords: '网络工具,IP转换,子网计算,HTTP状态码,端口查询',
    },
};

const tools = [
    { path: '/translate', name: '在线翻译', description: '免费在线翻译工具，支持中英日韩法德西等多语言实时翻译。' },
    { path: '/image-converter', name: '图片格式转换', description: '免费在线图片格式转换工具，支持PNG、JPG、WebP、GIF、BMP等格式互转。' },
    { path: '/image-editor', name: '图片快速编辑', description: '免费在线图片编辑工具，支持图片裁剪、旋转、调整大小。' },
    { path: '/image-comparison', name: '多图自由拼接', description: '免费在线多图拼接工具，将多张图片自由拼接成长图。' },
    { path: '/image-round-corner', name: '图片圆角处理', description: '免费在线图片圆角处理工具，为图片添加圆角效果。' },
    { path: '/photo-collage', name: '模板快速拼接', description: '免费在线拼图工具，使用预设模板快速拼接多张图片。' },
    { path: '/code-highlight', name: '代码高亮', description: '在线代码语法高亮工具，支持Python、JavaScript、Java等多种编程语言。' },
    { path: '/text-formatter', name: '文本格式化', description: '免费在线文本格式化工具，支持大小写转换、去除空格、字数统计。' },
    { path: '/json-formatter', name: 'JSON格式化', description: '免费在线JSON格式化工具，支持JSON数据格式化、校验、压缩。' },
    { path: '/xml-formatter', name: 'XML格式化', description: '免费在线XML格式化工具，支持XML数据格式化、校验、压缩。' },
    { path: '/math-formula', name: '数学公式编辑', description: '免费在线LaTeX数学公式编辑器，实时预览公式效果。' },
    { path: '/table-converter', name: '表格格式转换', description: '免费在线表格格式转换工具，支持CSV、Excel、JSON、Markdown等格式互转。' },
    { path: '/video-aspect-converter', name: '视频比例转换', description: '免费在线视频比例转换工具，调整视频比例适配不同平台。' },
    { path: '/text-diff', name: '文本差异对比', description: '免费在线文本差异对比工具，对比两段文本的差异。' },
    { path: '/pdf-to-ppt', name: 'PDF转PPT', description: '免费在线PDF转PPT工具，将PDF文件转换为可编辑的PowerPoint。' },
    { path: '/pdf-to-image', name: 'PDF转长图', description: '免费在线PDF转长图工具，将PDF文档转换为长图。' },
    { path: '/resume-generator', name: '简历生成器', description: '免费在线简历制作工具，多套精美模板可选。' },
    { path: '/prompt-generator', name: '提示词生成器', description: '免费在线AI提示词生成工具，智能生成优化提示词。' },
    { path: '/mbti-test', name: 'MBTI人格测试', description: '免费在线MBTI人格测试，专业的性格测试问卷。' },
    { path: '/image-to-prompt', name: '图片转提示词', description: '免费在线AI图片分析工具，智能分析图片内容生成描述提示词。' },
    { path: '/image-watermark-remover', name: '图片水印去除', description: '免费在线AI图片水印去除工具，智能识别并去除图片水印。' },
    { path: '/mind-map', name: '思维导图', description: '免费在线思维导图制作工具，支持多种布局样式。' },
    { path: '/drawing', name: '绘图画布', description: '免费在线绘图画板工具，支持画笔、形状、文字。' },
    { path: '/vram-calculator', name: '显存计算器', description: '免费在线AI模型显存计算器，计算训练模型所需显存。' },
    { path: '/mortgage-calculator', name: '房贷计算器', description: '免费在线房贷计算器，支持等额本息、等额本金两种还款方式。' },
    { path: '/pension-calculator', name: '养老金计算器', description: '免费在线养老金计算器，估算退休后可领取的养老金金额。' },
    { path: '/tax-calculator', name: '个税计算器', description: '免费在线个税计算器，计算个人所得税。' },
    { path: '/qrcode-generator', name: '二维码生成器', description: '免费在线二维码生成器，支持自定义颜色、尺寸、容错级别。' },
    { path: '/chinese-converter', name: '简繁体转换', description: '免费在线简繁体转换工具，支持简体中文与繁体中文互相转换。' },
    { path: '/timestamp-converter', name: '时间戳转换', description: '免费在线Unix时间戳转换工具，时间戳与日期时间互转。' },
    { path: '/base64-tool', name: 'Base64编解码', description: '免费在线Base64编码解码工具，支持文本和图片。' },
    { path: '/password-generator', name: '密码生成器', description: '免费在线随机密码生成器，生成高强度随机密码。' },
    { path: '/uuid-generator', name: 'UUID生成器', description: '免费在线UUID/GUID生成器，批量生成UUID。' },
    { path: '/color-picker', name: '颜色转换器', description: '免费在线颜色转换工具，RGB、HEX、HSL颜色格式互转。' },
    { path: '/id-card-parser', name: '身份证解析', description: '免费在线身份证号码解析工具，解析身份证获取出生日期、性别、籍贯等信息。' },
    { path: '/unit-converter', name: '单位换算', description: '免费在线单位换算工具，支持长度、重量、面积、体积、温度等单位互转。' },
    { path: '/hash-calculator', name: 'Hash计算器', description: '免费在线Hash计算工具，计算MD5、SHA-1、SHA-256等哈希值。' },
    { path: '/regex-tester', name: '正则测试', description: '免费在线正则表达式测试工具，实时测试正则匹配。' },
    { path: '/number-base-converter', name: '进制转换', description: '免费在线进制转换工具，支持二进制、八进制、十进制、十六进制互转。' },
    { path: '/crypto-tool', name: 'AES加密解密', description: '免费在线AES加密解密工具，支持AES-GCM和AES-CBC算法。' },
    { path: '/cron-parser', name: 'Cron表达式', description: '免费在线Cron表达式解析工具，解析定时任务表达式。' },
    { path: '/bmi-calculator', name: 'BMI计算器', description: '免费在线BMI体重指数计算器，计算身体质量指数。' },
    { path: '/date-calculator', name: '日期计算器', description: '免费在线日期计算器，计算日期间隔、推算日期。' },
    { path: '/stopwatch', name: '秒表计时', description: '免费在线秒表计时器，精确到毫秒，支持计次功能。' },
    { path: '/countdown-timer', name: '倒计时器', description: '免费在线倒计时器，支持自定义时间。' },
    { path: '/text-statistics', name: '文字统计', description: '免费在线文字统计工具，统计字符数、词数、行数、段落数。' },
    { path: '/text-transform', name: '文本转换', description: '免费在线文本转换工具，大小写转换、命名风格转换。' },
    { path: '/loan-calculator', name: '贷款计算器', description: '免费在线贷款计算器，计算各类贷款的月供、总利息。' },
    { path: '/world-clock', name: '世界时钟', description: '免费在线世界时钟，查看全球各时区当前时间。' },
    { path: '/percentage-calculator', name: '百分比计算', description: '免费在线百分比计算器，计算百分比、增长率、占比。' },
    { path: '/scientific-calculator', name: '科学计算器', description: '免费在线科学计算器，支持三角函数、对数、幂运算。' },
    { path: '/ip-converter', name: 'IP地址转换', description: '免费在线IP地址转换工具，IP地址与十进制、二进制互转。' },
    { path: '/ip-subnet-calculator', name: 'IP子网计算', description: '免费在线IP子网计算器，计算子网掩码、网络地址。' },
    { path: '/image-compressor', name: '图片压缩', description: '免费在线图片压缩工具，支持JPG、PNG格式。' },
    { path: '/age-calculator', name: '年龄计算器', description: '免费在线年龄计算器，计算精确年龄、星座、生肖。' },
    { path: '/encoding-converter', name: '编码转换', description: '免费在线文本编码转换工具，支持UTF-8、GBK、Big5等编码。' },
    { path: '/number-generator', name: '随机数生成', description: '免费在线随机数生成工具，生成指定范围内的随机数字。' },
    { path: '/status-code-lookup', name: 'HTTP状态码', description: '免费在线HTTP状态码查询工具，查询HTTP状态码含义。' },
    { path: '/port-lookup', name: '端口查询', description: '免费在线端口查询工具，查询常用网络端口及其用途。' },
    { path: '/url-parser', name: 'URL解析器', description: '免费在线URL解析工具，解析URL结构，提取协议、域名、路径、参数等信息。' },
    { path: '/browser-fingerprint', name: '浏览器指纹', description: '免费在线浏览器指纹查看工具，查看当前浏览器的详细信息。' },
    { path: '/curl-generator', name: 'Curl生成器', description: '免费在线Curl命令生成器，生成HTTP请求的curl命令。' },
];

const base = process.env.BASE_URL || '/FreeTool/';
const baseUrl = base.endsWith('/') ? base.slice(0, -1) : base;

function generateStaticPages() {
    console.log('Starting static page generation...');
    console.log(`Base URL: ${baseUrl}`);

    const indexPath = path.join(distDir, 'index.html');
    if (!fs.existsSync(indexPath)) {
        console.error('Error: dist/index.html not found. Run npm run build first.');
        process.exit(1);
    }

    let indexHtml = fs.readFileSync(indexPath, 'utf-8');

    const allRoutes = { ...routes };
    tools.forEach(tool => {
        allRoutes[tool.path] = {
            title: `${tool.name} - 三八零零在线工具`,
            description: tool.description,
            keywords: `${tool.name},在线工具,免费工具`,
        };
    });

    console.log(`Generating ${Object.keys(allRoutes).length} static pages...\n`);

    Object.entries(allRoutes).forEach(([routePath, meta]) => {
        let html = indexHtml;

        html = html.replace(
            /<title>.*?<\/title>/i,
            `<title>${meta.title}</title>`
        );

        html = html.replace(
            /<meta\s+name="title"\s+content="[^"]*"\s*\/?>/i,
            `<meta name="title" content="${meta.title}">`
        );

        html = html.replace(
            /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
            `<meta name="description" content="${meta.description}">`
        );

        html = html.replace(
            /<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/i,
            `<meta name="keywords" content="${meta.keywords}">`
        );

        html = html.replace(
            /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
            `<meta property="og:title" content="${meta.title}">`
        );

        html = html.replace(
            /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
            `<meta property="og:description" content="${meta.description}">`
        );

        html = html.replace(
            /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
            `<meta name="twitter:title" content="${meta.title}">`
        );

        html = html.replace(
            /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
            `<meta name="twitter:description" content="${meta.description}">`
        );

        html = html.replace(
            /<meta\s+property="twitter:title"\s+content="[^"]*"\s*\/?>/i,
            `<meta property="twitter:title" content="${meta.title}">`
        );

        html = html.replace(
            /<meta\s+property="twitter:description"\s+content="[^"]*"\s*\/?>/i,
            `<meta property="twitter:description" content="${meta.description}">`
        );

        let outputPath;
        if (routePath === '/') {
            outputPath = path.join(distDir, 'index.html');
        } else {
            const dir = path.join(distDir, routePath.slice(1));
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            outputPath = path.join(dir, 'index.html');
        }

        fs.writeFileSync(outputPath, html);
        console.log(`✓ Generated: ${routePath === '/' ? '/index.html' : `${routePath}/index.html`}`);
    });

    console.log('\n✅ Static page generation complete!');
}

generateStaticPages();

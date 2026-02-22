import { lazy } from 'react';
import type { ToolCategory, ToolSEO, ToolType } from '../types/tools';

const TranslateTool = lazy(() => import('../components/TranslateTool'));
const ImageConverterTool = lazy(() => import('../components/ImageConverterTool'));
const ImageEditorTool = lazy(() => import('../components/ImageEditorTool'));
const ImageComparisonTool = lazy(() => import('../components/ImageComparisonTool'));
const ImageRoundCornerTool = lazy(() => import('../components/ImageRoundCornerTool'));
const PhotoCollageTool = lazy(() => import('../components/PhotoCollageTool'));
const CodeHighlightTool = lazy(() => import('../components/CodeHighlightTool'));
const TextFormatterTool = lazy(() => import('../components/TextFormatterTool'));
const JsonFormatterTool = lazy(() => import('../components/JsonFormatterTool'));
const XmlFormatterTool = lazy(() => import('../components/XmlFormatterTool'));
const MathFormulaEditor = lazy(() => import('../components/MathFormulaEditor'));
const TableConverter = lazy(() => import('../components/TableConverter'));
const VideoAspectConverter = lazy(() => import('../components/VideoAspectConverter'));
const TextDiffTool = lazy(() => import('../components/TextDiffTool'));
const PdfToPptTool = lazy(() => import('../components/PdfToPptTool'));
const PdfToImageTool = lazy(() => import('../components/PdfToImageTool'));
const ResumeGeneratorTool = lazy(() => import('../components/ResumeGeneratorTool'));
const PromptGeneratorTool = lazy(() => import('../components/PromptGeneratorTool'));
const MBTITestTool = lazy(() => import('../components/MBTITestTool'));
const ImageToPromptTool = lazy(() => import('../components/ImageToPromptTool'));
const ImageWatermarkRemoverTool = lazy(() => import('../components/ImageWatermarkRemoverTool'));
const MindMapTool = lazy(() => import('../components/MindMapTool'));
const DrawingTool = lazy(() => import('../components/DrawingTool'));
const VRAMCalculatorTool = lazy(() => import('../components/VRAMCalculatorTool'));
const MortgageCalculator = lazy(() => import('../components/MortgageCalculator'));
const PensionCalculator = lazy(() => import('../components/PensionCalculator'));
const TaxCalculator = lazy(() => import('../components/TaxCalculator'));
const QRCodeGenerator = lazy(() => import('../components/QRCodeGenerator'));
const ChineseConverter = lazy(() => import('../components/ChineseConverter'));
const TimestampConverter = lazy(() => import('../components/TimestampConverter'));
const Base64Tool = lazy(() => import('../components/Base64Tool'));
const PasswordGenerator = lazy(() => import('../components/PasswordGenerator'));
const UuidGenerator = lazy(() => import('../components/UuidGenerator'));
const ColorPicker = lazy(() => import('../components/ColorPicker'));
const IdCardParser = lazy(() => import('../components/IdCardParser'));
const UnitConverter = lazy(() => import('../components/UnitConverter'));
const HashCalculator = lazy(() => import('../components/HashCalculator'));
const RegexTester = lazy(() => import('../components/RegexTester'));
const NumberBaseConverter = lazy(() => import('../components/NumberBaseConverter'));
const CryptoTool = lazy(() => import('../components/CryptoTool'));
const CronParser = lazy(() => import('../components/CronParser'));
const BMICalculator = lazy(() => import('../components/BMICalculator'));
const DateCalculator = lazy(() => import('../components/DateCalculator'));
const Stopwatch = lazy(() => import('../components/Stopwatch'));
const CountdownTimer = lazy(() => import('../components/CountdownTimer'));
const TextStatistics = lazy(() => import('../components/TextStatistics'));
const TextTransform = lazy(() => import('../components/TextTransform'));
const LoanCalculator = lazy(() => import('../components/LoanCalculator'));
const WorldClock = lazy(() => import('../components/WorldClock'));
const PercentageCalculator = lazy(() => import('../components/PercentageCalculator'));
const ScientificCalculator = lazy(() => import('../components/ScientificCalculator'));
const IPConverter = lazy(() => import('../components/IPConverter'));
const IPSubnetCalculator = lazy(() => import('../components/IPSubnetCalculator'));
const ImageCompressor = lazy(() => import('../components/ImageCompressor'));
const AgeCalculator = lazy(() => import('../components/AgeCalculator'));
const EncodingConverter = lazy(() => import('../components/EncodingConverter'));
const NumberGenerator = lazy(() => import('../components/NumberGenerator'));
const StatusCodeLookup = lazy(() => import('../components/StatusCodeLookup'));
const PortLookup = lazy(() => import('../components/PortLookup'));
const URLParser = lazy(() => import('../components/URLParser'));
const BrowserFingerprint = lazy(() => import('../components/BrowserFingerprint'));
const CurlGenerator = lazy(() => import('../components/CurlGenerator'));
const ImageWatermark = lazy(() => import('../components/ImageWatermark'));
const ImageBgRemover = lazy(() => import('../components/ImageBgRemover'));
const ImageToICO = lazy(() => import('../components/ImageToICO'));
const GifMaker = lazy(() => import('../components/GifMaker'));
const GifSplitter = lazy(() => import('../components/GifSplitter'));
const GifCompressor = lazy(() => import('../components/GifCompressor'));
const WordCloudGenerator = lazy(() => import('../components/WordCloudGenerator'));
const GridImageCutter = lazy(() => import('../components/GridImageCutter'));
const PhotoBgChanger = lazy(() => import('../components/PhotoBgChanger'));
const MarkdownEditor = lazy(() => import('../components/MarkdownEditor'));
const CodeFormatter = lazy(() => import('../components/CodeFormatter'));
const JsonEscapeTool = lazy(() => import('../components/JsonEscapeTool'));
const RandomDataGenerator = lazy(() => import('../components/RandomDataGenerator'));
const MockDataGenerator = lazy(() => import('../components/MockDataGenerator'));
const LinuxCommandDict = lazy(() => import('../components/LinuxCommandDict'));
const ChineseToPinyin = lazy(() => import('../components/ChineseToPinyin'));
const RelationshipCalculator = lazy(() => import('../components/RelationshipCalculator'));
const ASCIIArtGenerator = lazy(() => import('../components/ASCIIArtGenerator'));

export const TOOL_CATEGORIES: ToolCategory[] = [
    {
        id: 'calculator',
        name: '计算工具',
        icon: 'calculate',
        description: '房贷、个税、养老金等实用计算器',
        tools: [
            {
                id: 'mortgage-calculator',
                name: '房贷计算器',
                icon: 'home',
                path: '/mortgage-calculator',
                description: '免费在线房贷计算器，支持等额本息、等额本金两种还款方式，精确计算月供、利息总额，买房必备工具。',
                keywords: ['房贷计算器', '房贷计算', '等额本息', '等额本金', '月供计算', '房贷利率', '贷款计算器', '买房贷款'],
                component: MortgageCalculator,
            },
            {
                id: 'pension-calculator',
                name: '养老金计算器',
                icon: 'elderly',
                path: '/pension-calculator',
                description: '免费在线养老金计算器，估算退休后可领取的养老金金额，支持自定义缴费基数、缴费年限等参数。',
                keywords: ['养老金计算器', '退休金计算', '养老金估算', '社保计算', '退休规划', '养老保险', '养老金预测'],
                component: PensionCalculator,
            },
            {
                id: 'tax-calculator',
                name: '个税计算器',
                icon: 'payments',
                path: '/tax-calculator',
                description: '免费在线个税计算器，计算个人所得税，支持五险一金、专项附加扣除，最新个税税率表。',
                keywords: ['个税计算器', '个人所得税', '个税计算', '工资计算', '税后工资', '个税税率', '专项扣除', '五险一金'],
                component: TaxCalculator,
            },
            {
                id: 'vram-calculator',
                name: '显存计算器',
                icon: 'memory',
                path: '/vram-calculator',
                description: '免费在线AI模型显存计算器，计算训练模型所需显存，优化训练参数，深度学习必备工具。',
                keywords: ['显存计算', 'GPU计算', 'AI训练', '深度学习', '显卡计算', '模型训练', 'CUDA计算'],
                component: VRAMCalculatorTool,
            },
            {
                id: 'bmi-calculator',
                name: 'BMI计算器',
                icon: 'monitor_weight',
                path: '/bmi-calculator',
                description: '免费在线BMI体重指数计算器，计算身体质量指数，评估体重是否健康，提供理想体重建议。',
                keywords: ['BMI计算器', '体重指数', 'BMI', '体重计算', '健康体重', '理想体重'],
                component: BMICalculator,
            },
            {
                id: 'date-calculator',
                name: '日期计算器',
                icon: 'event',
                path: '/date-calculator',
                description: '免费在线日期计算器，计算日期间隔、推算日期，支持加减天数、月份、年份。',
                keywords: ['日期计算', '日期间隔', '日期推算', '天数计算', '日期差', '日期工具'],
                component: DateCalculator,
            },
            {
                id: 'percentage-calculator',
                name: '百分比计算',
                icon: 'percent',
                path: '/percentage-calculator',
                description: '免费在线百分比计算器，计算百分比、增长率、占比等常见百分比问题。',
                keywords: ['百分比计算', '百分比', '增长率', '占比计算', '百分比工具'],
                component: PercentageCalculator,
            },
            {
                id: 'scientific-calculator',
                name: '科学计算器',
                icon: 'calculate',
                path: '/scientific-calculator',
                description: '免费在线科学计算器，支持三角函数、对数、幂运算等科学计算功能。',
                keywords: ['科学计算器', '计算器', '三角函数', '对数', '数学计算'],
                component: ScientificCalculator,
            },
            {
                id: 'loan-calculator',
                name: '贷款计算器',
                icon: 'account_balance',
                path: '/loan-calculator',
                description: '免费在线贷款计算器，计算各类贷款的月供、总利息，适用于车贷、消费贷等。',
                keywords: ['贷款计算器', '贷款计算', '月供计算', '利息计算', '车贷计算', '消费贷'],
                component: LoanCalculator,
            },
            {
                id: 'age-calculator',
                name: '年龄计算器',
                icon: 'cake',
                path: '/age-calculator',
                description: '免费在线年龄计算器，计算精确年龄、星座、生肖，距离下次生日还有多少天。',
                keywords: ['年龄计算', '年龄', '生日计算', '星座查询', '生肖查询', '周岁'],
                component: AgeCalculator,
            },
        ],
    },
    {
        id: 'utility',
        name: '便民工具',
        icon: 'widgets',
        description: '二维码生成、单位换算等便民小工具',
        tools: [
            {
                id: 'qrcode-generator',
                name: '二维码生成器',
                icon: 'qr_code_2',
                path: '/qrcode-generator',
                description: '免费在线二维码生成器，支持自定义颜色、尺寸、容错级别，一键下载PNG图片，支持网址、文本等内容。',
                keywords: ['二维码生成', '二维码制作', 'QR码生成', '在线二维码', '二维码工具', '网址二维码', '文本二维码'],
                component: QRCodeGenerator,
            },
            {
                id: 'chinese-converter',
                name: '简繁体转换',
                icon: 'translate',
                path: '/chinese-converter',
                description: '免费在线简繁体转换工具，支持简体中文与繁体中文互相转换，适合阅读繁体文章、文档转换。',
                keywords: ['简繁体转换', '简体转繁体', '繁体转简体', '中文转换', '简体字', '繁体字', '字体转换'],
                component: ChineseConverter,
            },
            {
                id: 'timestamp-converter',
                name: '时间戳转换',
                icon: 'schedule',
                path: '/timestamp-converter',
                description: '免费在线Unix时间戳转换工具，时间戳与日期时间互转，支持秒级和毫秒级时间戳。',
                keywords: ['时间戳转换', 'Unix时间戳', '时间戳', '日期转换', '时间转换', '时间戳工具', '在线转换'],
                component: TimestampConverter,
            },
            {
                id: 'base64-tool',
                name: 'Base64编解码',
                icon: 'code',
                path: '/base64-tool',
                description: '免费在线Base64编码解码工具，支持文本和图片的Base64编解码，支持中文字符。',
                keywords: ['Base64', 'Base64编码', 'Base64解码', '编码工具', '图片Base64', 'Base64转换'],
                component: Base64Tool,
            },
            {
                id: 'password-generator',
                name: '密码生成器',
                icon: 'password',
                path: '/password-generator',
                description: '免费在线随机密码生成器，生成高强度随机密码，支持自定义长度和字符类型，安全可靠。',
                keywords: ['密码生成', '随机密码', '密码工具', '强密码', '密码生成器', '安全密码'],
                component: PasswordGenerator,
            },
            {
                id: 'uuid-generator',
                name: 'UUID生成器',
                icon: 'fingerprint',
                path: '/uuid-generator',
                description: '免费在线UUID/GUID生成器，批量生成UUID，支持UUID v1和v4版本，一键复制。',
                keywords: ['UUID生成', 'GUID', 'UUID', '唯一标识符', 'UUID工具', '批量生成'],
                component: UuidGenerator,
            },
            {
                id: 'color-picker',
                name: '颜色转换器',
                icon: 'palette',
                path: '/color-picker',
                description: '免费在线颜色转换工具，RGB、HEX、HSL颜色格式互转，支持颜色选择器和预设颜色。',
                keywords: ['颜色转换', 'RGB转换', 'HEX转换', 'HSL转换', '取色器', '颜色选择', '颜色工具'],
                component: ColorPicker,
            },
            {
                id: 'id-card-parser',
                name: '身份证解析',
                icon: 'badge',
                path: '/id-card-parser',
                description: '免费在线身份证号码解析工具，解析身份证获取出生日期、性别、籍贯等信息。',
                keywords: ['身份证解析', '身份证查询', '身份证信息', '身份证校验', '身份证工具'],
                component: IdCardParser,
            },
            {
                id: 'unit-converter',
                name: '单位换算',
                icon: 'straighten',
                path: '/unit-converter',
                description: '免费在线单位换算工具，支持长度、重量、面积、体积、温度、数据存储等单位互转。',
                keywords: ['单位换算', '单位转换', '长度换算', '重量换算', '面积换算', '温度转换'],
                component: UnitConverter,
            },
            {
                id: 'hash-calculator',
                name: 'Hash计算器',
                icon: 'fingerprint',
                path: '/hash-calculator',
                description: '免费在线Hash计算工具，计算MD5、SHA-1、SHA-256等哈希值，支持文本和文件。',
                keywords: ['Hash计算', 'MD5', 'SHA256', '哈希值', '文件校验', '哈希工具'],
                component: HashCalculator,
            },
            {
                id: 'regex-tester',
                name: '正则测试',
                icon: 'rule',
                path: '/regex-tester',
                description: '免费在线正则表达式测试工具，实时测试正则匹配，高亮显示匹配结果。',
                keywords: ['正则表达式', '正则测试', 'Regex', '正则工具', '匹配测试'],
                component: RegexTester,
            },
            {
                id: 'number-base-converter',
                name: '进制转换',
                icon: 'functions',
                path: '/number-base-converter',
                description: '免费在线进制转换工具，支持二进制、八进制、十进制、十六进制互转。',
                keywords: ['进制转换', '二进制', '八进制', '十进制', '十六进制', '数制转换'],
                component: NumberBaseConverter,
            },
            {
                id: 'crypto-tool',
                name: 'AES加密解密',
                icon: 'lock',
                path: '/crypto-tool',
                description: '免费在线AES加密解密工具，支持AES-GCM和AES-CBC算法，数据本地处理更安全。',
                keywords: ['AES加密', 'AES解密', '加密工具', '数据加密', '对称加密'],
                component: CryptoTool,
            },
            {
                id: 'cron-parser',
                name: 'Cron表达式',
                icon: 'schedule',
                path: '/cron-parser',
                description: '免费在线Cron表达式解析工具，解析定时任务表达式，显示下次执行时间。',
                keywords: ['Cron表达式', '定时任务', 'Cron解析', '定时器', '任务调度'],
                component: CronParser,
            },
            {
                id: 'stopwatch',
                name: '秒表计时',
                icon: 'timer',
                path: '/stopwatch',
                description: '免费在线秒表计时器，精确到毫秒，支持计次功能，适用于运动、实验等计时场景。',
                keywords: ['秒表', '计时器', '在线秒表', '计次', '运动计时', '精确计时'],
                component: Stopwatch,
            },
            {
                id: 'countdown-timer',
                name: '倒计时器',
                icon: 'hourglass_empty',
                path: '/countdown-timer',
                description: '免费在线倒计时器，支持自定义时间，番茄工作法、休息提醒等场景。',
                keywords: ['倒计时', '计时器', '番茄钟', '定时提醒', '倒计时工具', '专注计时'],
                component: CountdownTimer,
            },
            {
                id: 'world-clock',
                name: '世界时钟',
                icon: 'public',
                path: '/world-clock',
                description: '免费在线世界时钟，查看全球各时区当前时间，支持添加多个城市。',
                keywords: ['世界时钟', '世界时间', '时区查询', '各国时间', '时区转换', '全球时间'],
                component: WorldClock,
            },
            {
                id: 'ip-converter',
                name: 'IP地址转换',
                icon: 'lan',
                path: '/ip-converter',
                description: '免费在线IP地址转换工具，IP地址与十进制、二进制、十六进制互转。',
                keywords: ['IP转换', 'IP地址', '十进制IP', '二进制IP', 'IP工具'],
                component: IPConverter,
            },
            {
                id: 'ip-subnet-calculator',
                name: 'IP子网计算',
                icon: 'hub',
                path: '/ip-subnet-calculator',
                description: '免费在线IP子网计算器，计算子网掩码、网络地址、可用主机数等信息。',
                keywords: ['子网计算', '子网掩码', 'CIDR', '网络地址', '子网划分'],
                component: IPSubnetCalculator,
            },
            {
                id: 'number-generator',
                name: '随机数生成',
                icon: 'casino',
                path: '/number-generator',
                description: '免费在线随机数生成工具，生成指定范围内的随机数字，支持不重复抽取。',
                keywords: ['随机数', '随机数生成', '抽奖', '随机选择', '掷骰子'],
                component: NumberGenerator,
            },
            {
                id: 'encoding-converter',
                name: '编码转换',
                icon: 'code_blocks',
                path: '/encoding-converter',
                description: '免费在线文本编码转换工具，支持UTF-8、GBK、Big5等多种编码格式。',
                keywords: ['编码转换', '字符编码', 'UTF-8', 'GBK', 'Big5', '编码工具'],
                component: EncodingConverter,
            },
            {
                id: 'chinese-to-pinyin',
                name: '中文转拼音',
                icon: 'spellcheck',
                path: '/chinese-to-pinyin',
                description: '免费在线中文转拼音工具，将中文汉字转换为拼音，支持声调显示。',
                keywords: ['中文转拼音', '拼音转换', '汉字拼音', '拼音工具'],
                component: ChineseToPinyin,
            },
            {
                id: 'relationship-calculator',
                name: '亲戚关系计算',
                icon: 'family_restroom',
                path: '/relationship-calculator',
                description: '免费在线亲戚关系计算器，计算中国亲戚关系的称呼，走亲访友必备。',
                keywords: ['亲戚关系', '亲戚称呼', '关系计算', '家庭关系'],
                component: RelationshipCalculator,
            },
        ],
    },
    {
        id: 'text',
        name: '文本工具',
        icon: 'text_fields',
        description: '文本处理、格式化、翻译等实用工具',
        tools: [
            {
                id: 'translate',
                name: '在线翻译',
                icon: 'translate',
                path: '/translate',
                description: '免费在线翻译工具，支持中英日韩法德西等多语言实时翻译，自动检测源语言，翻译结果准确快速。',
                keywords: ['在线翻译', '免费翻译', '中英翻译', '多语言翻译', '谷歌翻译', '日语翻译', '韩语翻译', '自动翻译'],
                component: TranslateTool,
            },
            {
                id: 'code-highlight',
                name: '代码高亮',
                icon: 'code',
                path: '/code-highlight',
                description: '在线代码语法高亮工具，支持Python、JavaScript、Java、C++等多种编程语言，一键复制高亮代码。',
                keywords: ['代码高亮', '语法高亮', '代码美化', '程序员工具', '在线代码', '代码显示', '编程工具'],
                component: CodeHighlightTool,
            },
            {
                id: 'text-formatter',
                name: '文本格式化',
                icon: 'description',
                path: '/text-formatter',
                description: '免费在线文本格式化工具，支持大小写转换、去除空格、字数统计、文本排序等多种文本处理功能。',
                keywords: ['文本格式化', '大小写转换', '去空格', '字数统计', '文本处理', '在线文本工具', '文本转换'],
                component: TextFormatterTool,
            },
            {
                id: 'json-formatter',
                name: 'JSON 格式化',
                icon: 'data_object',
                path: '/json-formatter',
                description: '免费在线JSON格式化工具，支持JSON数据格式化、校验、压缩，树形结构展示，开发者必备工具。',
                keywords: ['JSON格式化', 'JSON校验', 'JSON压缩', 'JSON解析', 'JSON在线工具', '开发者工具', 'JSON编辑器'],
                component: JsonFormatterTool,
            },
            {
                id: 'xml-formatter',
                name: 'XML 格式化',
                icon: 'code',
                path: '/xml-formatter',
                description: '免费在线XML格式化工具，支持XML数据格式化、校验、压缩，一键美化XML代码。',
                keywords: ['XML格式化', 'XML校验', 'XML压缩', 'XML解析', 'XML在线工具', 'XML编辑器'],
                component: XmlFormatterTool,
            },
            {
                id: 'text-diff',
                name: '文本差异对比',
                icon: 'compare',
                path: '/text-diff',
                description: '免费在线文本差异对比工具，对比两段文本的差异，高亮显示不同之处，支持代码对比。',
                keywords: ['文本对比', '差异对比', '文本比较', '代码对比', '在线对比工具', '文本差异'],
                component: TextDiffTool,
            },
            {
                id: 'text-statistics',
                name: '文字统计',
                icon: 'query_stats',
                path: '/text-statistics',
                description: '免费在线文字统计工具，统计字符数、词数、行数、段落数，估算阅读时间。',
                keywords: ['文字统计', '字数统计', '字符统计', '词数统计', '字数计算', '文章统计'],
                component: TextStatistics,
            },
            {
                id: 'text-transform',
                name: '文本转换',
                icon: 'text_fields',
                path: '/text-transform',
                description: '免费在线文本转换工具，大小写转换、命名风格转换，支持驼峰、下划线、短横线等格式。',
                keywords: ['文本转换', '大小写转换', '命名转换', '驼峰命名', '下划线命名', '格式转换'],
                component: TextTransform,
            },
            {
                id: 'ascii-art',
                name: 'ASCII艺术字',
                icon: 'text_fields',
                path: '/ascii-art',
                description: '免费在线ASCII艺术字生成器，将文字转换为ASCII艺术字符画。',
                keywords: ['ASCII艺术', '字符画', '艺术字', 'ASCII生成'],
                component: ASCIIArtGenerator,
            },
        ],
    },
    {
        id: 'image',
        name: '图片工具',
        icon: 'image',
        description: '图片处理、转换、编辑等实用工具',
        tools: [
            {
                id: 'image-converter',
                name: '图片格式转换',
                icon: 'image',
                path: '/image-converter',
                description: '免费在线图片格式转换工具，支持PNG、JPG、WebP、GIF、BMP等格式互转，批量转换，无需安装软件。',
                keywords: ['图片转换', '格式转换', 'PNG转JPG', 'WebP转换', '图片格式', '在线图片转换', '批量转换'],
                component: ImageConverterTool,
            },
            {
                id: 'image-editor',
                name: '图片快速编辑',
                icon: 'edit',
                path: '/image-editor',
                description: '免费在线图片编辑工具，支持图片裁剪、旋转、调整大小、调整亮度对比度，无需下载软件。',
                keywords: ['图片编辑', '在线P图', '图片裁剪', '图片旋转', '图片压缩', '在线修图', '图片处理'],
                component: ImageEditorTool,
            },
            {
                id: 'image-comparison',
                name: '多图自由拼接',
                icon: 'layers',
                path: '/image-comparison',
                description: '免费在线多图拼接工具，将多张图片自由拼接成长图，支持横向纵向拼接，自定义布局。',
                keywords: ['图片拼接', '长图制作', '拼图', '多图拼接', '在线拼图', '图片合成', '长图生成'],
                component: ImageComparisonTool,
            },
            {
                id: 'image-round-corner',
                name: '图片圆角处理',
                icon: 'rounded_corner',
                path: '/image-round-corner',
                description: '免费在线图片圆角处理工具，为图片添加圆角效果，支持自定义圆角大小，一键生成圆角图片。',
                keywords: ['圆角图片', '图片圆角', '圆角处理', '头像制作', '圆角生成', '在线圆角'],
                component: ImageRoundCornerTool,
            },
            {
                id: 'photo-collage',
                name: '模板快速拼接',
                icon: 'grid_view',
                path: '/photo-collage',
                description: '免费在线拼图工具，使用预设模板快速拼接多张图片，支持多种拼图模板，一键生成精美拼图。',
                keywords: ['拼图模板', '图片拼贴', '照片拼图', '拼图制作', '在线拼图', '照片拼接', '图片组合'],
                component: PhotoCollageTool,
            },
            {
                id: 'image-watermark-remover',
                name: '图片水印去除',
                icon: 'healing',
                path: '/image-watermark-remover',
                description: '免费在线AI图片水印去除工具，智能识别并去除图片水印，还原图片原貌，效果自然。',
                keywords: ['去水印', '水印去除', '图片修复', 'AI去水印', '在线去水印', '图片处理', '水印清除'],
                component: ImageWatermarkRemoverTool,
            },
            {
                id: 'image-compressor',
                name: '图片压缩',
                icon: 'compress',
                path: '/image-compressor',
                description: '免费在线图片压缩工具，支持JPG、PNG格式，可调节压缩质量，批量压缩下载。',
                keywords: ['图片压缩', '图片缩小', '压缩图片', '在线压缩', '批量压缩', '图片优化'],
                component: ImageCompressor,
            },
            {
                id: 'image-watermark',
                name: '图片加水印',
                icon: 'water_drop',
                path: '/image-watermark',
                description: '免费在线图片加水印工具，支持文字水印、平铺水印，可自定义字体、颜色、透明度。',
                keywords: ['图片水印', '加水印', '水印工具', '图片保护', '在线水印'],
                component: ImageWatermark,
            },
            {
                id: 'image-bg-remover',
                name: '图片去底色',
                icon: 'layers_clear',
                path: '/image-bg-remover',
                description: '免费在线图片去底色工具，去除图片背景色，生成透明背景图片。',
                keywords: ['去底色', '透明背景', '背景去除', '图片处理'],
                component: ImageBgRemover,
            },
            {
                id: 'image-to-ico',
                name: '图片转ICO',
                icon: 'web',
                path: '/image-to-ico',
                description: '免费在线图片转ICO图标工具，生成网站favicon图标，支持多种尺寸。',
                keywords: ['ICO转换', 'favicon', '网站图标', '图标生成'],
                component: ImageToICO,
            },
            {
                id: 'gif-maker',
                name: 'GIF制作',
                icon: 'gif',
                path: '/gif-maker',
                description: '免费在线GIF制作工具，将多张静态图片合成GIF动图，可调节帧延迟。',
                keywords: ['GIF制作', '动图生成', '图片合成', 'GIF工具'],
                component: GifMaker,
            },
            {
                id: 'gif-splitter',
                name: 'GIF分解',
                icon: 'view_module',
                path: '/gif-splitter',
                description: '免费在线GIF分解工具，将GIF动图拆分为单独的帧图片，可单独下载。',
                keywords: ['GIF分解', '动图拆分', '帧提取', 'GIF工具'],
                component: GifSplitter,
            },
            {
                id: 'gif-compressor',
                name: 'GIF压缩',
                icon: 'compress',
                path: '/gif-compressor',
                description: '免费在线GIF压缩工具，压缩GIF动图减小文件大小，可调节压缩质量。',
                keywords: ['GIF压缩', '动图压缩', 'GIF优化', '文件压缩'],
                component: GifCompressor,
            },
            {
                id: 'word-cloud',
                name: '词云图生成',
                icon: 'cloud',
                path: '/word-cloud',
                description: '免费在线词云图生成工具，输入关键词一键生成精美词云图。',
                keywords: ['词云', '词云图', '文字云', '可视化'],
                component: WordCloudGenerator,
            },
            {
                id: 'grid-image-cutter',
                name: '九宫格切图',
                icon: 'grid_on',
                path: '/grid-image-cutter',
                description: '免费在线九宫格切图工具，将图片切割成九宫格，适合社交平台分享。',
                keywords: ['九宫格', '切图', '图片切割', '社交分享'],
                component: GridImageCutter,
            },
            {
                id: 'photo-bg-changer',
                name: '证件照换底色',
                icon: 'badge',
                path: '/photo-bg-changer',
                description: 'AI智能证件照换底色，支持红底、蓝底、白底，一键更换证件照背景。',
                keywords: ['证件照', '换底色', '背景更换', '证件照处理', 'AI换背景'],
                component: PhotoBgChanger,
            },
        ],
    },
    {
        id: 'data',
        name: '数据工具',
        icon: 'analytics',
        description: '数据处理、表格转换、公式编辑等工具',
        tools: [
            {
                id: 'table-converter',
                name: '表格格式转换',
                icon: 'table_chart',
                path: '/table-converter',
                description: '免费在线表格格式转换工具，支持CSV、Excel、JSON、Markdown、HTML等表格格式互转。',
                keywords: ['表格转换', 'CSV转换', 'Excel转换', '表格格式', '数据转换', '在线表格工具', 'JSON转CSV'],
                component: TableConverter,
            },
            {
                id: 'math-formula',
                name: '数学公式编辑',
                icon: 'functions',
                path: '/math-formula',
                description: '免费在线LaTeX数学公式编辑器，实时预览公式效果，支持导出PNG图片，适合论文写作。',
                keywords: ['数学公式', 'LaTeX', '公式编辑器', '数学符号', '在线公式', '公式生成', '论文公式'],
                component: MathFormulaEditor,
            },
            {
                id: 'mind-map',
                name: '思维导图',
                icon: 'account_tree',
                path: '/mind-map',
                description: '免费在线思维导图制作工具，支持多种布局样式，一键导出PNG图片，适合整理思路、知识梳理。',
                keywords: ['思维导图', '脑图', '流程图', '知识图谱', '在线思维导图', '思维整理', '笔记工具'],
                component: MindMapTool,
            },
            {
                id: 'drawing',
                name: '绘图画布',
                icon: 'draw',
                path: '/drawing',
                description: '免费在线绘图画板工具，支持画笔、形状、文字、橡皮擦，可导出PNG图片，适合简单绘图。',
                keywords: ['画板', '绘图', '白板', '涂鸦', '在线画图', '画图工具', '手绘'],
                component: DrawingTool,
            },
        ],
    },
    {
        id: 'media',
        name: '媒体工具',
        icon: 'perm_media',
        description: '视频、PDF、文档转换等媒体处理工具',
        tools: [
            {
                id: 'video-aspect-converter',
                name: '视频比例转换',
                icon: 'aspect_ratio',
                path: '/video-aspect-converter',
                description: '免费在线视频比例转换工具，调整视频比例适配抖音、快手、B站等不同平台，支持裁剪和填充。',
                keywords: ['视频比例', '视频转换', '视频裁剪', '短视频制作', '视频编辑', '横屏转竖屏', '视频适配'],
                component: VideoAspectConverter,
            },
            {
                id: 'pdf-to-ppt',
                name: 'PDF转PPT',
                icon: 'slideshow',
                path: '/pdf-to-ppt',
                description: '免费在线PDF转PPT工具，将PDF文件转换为可编辑的PowerPoint演示文稿，保留原有排版。',
                keywords: ['PDF转PPT', 'PDF转换', 'PPT制作', '文档转换', '在线转换', 'PDF工具', '演示文稿'],
                component: PdfToPptTool,
            },
            {
                id: 'pdf-to-image',
                name: 'PDF转长图',
                icon: 'photo_library',
                path: '/pdf-to-image',
                description: '免费在线PDF转长图工具，将PDF文档转换为长图，方便分享到微信、微博等社交平台。',
                keywords: ['PDF转图片', 'PDF转长图', 'PDF转换', '长图生成', '在线转换', 'PDF工具', '文档转图片'],
                component: PdfToImageTool,
            },
        ],
    },
    {
        id: 'ai',
        name: 'AI工具',
        icon: 'smart_toy',
        description: 'AI智能工具，提升工作效率',
        tools: [
            {
                id: 'image-to-prompt',
                name: '图片转提示词',
                icon: 'image_search',
                path: '/image-to-prompt',
                description: '免费在线AI图片分析工具，智能分析图片内容生成描述提示词，可用于AI绘画参考。',
                keywords: ['图片描述', 'AI提示词', '图片分析', 'AI识别', '图片标签', '图像识别', 'AI绘画'],
                component: ImageToPromptTool,
            },
            {
                id: 'resume-generator',
                name: '简历生成器',
                icon: 'description',
                path: '/resume-generator',
                description: '免费在线简历制作工具，多套精美模板可选，一键导出PDF，助力求职找工作。',
                keywords: ['简历制作', '在线简历', '简历模板', '求职简历', '简历生成', '个人简历', '求职工具'],
                component: ResumeGeneratorTool,
            },
            {
                id: 'prompt-generator',
                name: '提示词生成器',
                icon: 'psychology',
                path: '/prompt-generator',
                description: '免费在线AI提示词生成工具，智能生成优化提示词，提升ChatGPT、Claude等AI工具使用效果。',
                keywords: ['提示词', 'Prompt', 'AI写作', 'ChatGPT提示词', '提示词优化', 'AI工具', '提示词生成'],
                component: PromptGeneratorTool,
            },
            {
                id: 'mbti-test',
                name: 'MBTI人格测试',
                icon: 'mood',
                path: '/mbti-test',
                description: '免费在线MBTI人格测试，专业的性格测试问卷，了解自己的性格类型，职业规划参考。',
                keywords: ['MBTI', '人格测试', '性格测试', '心理测试', '职业测试', '人格类型', '16型人格'],
                component: MBTITestTool,
            },
        ],
    },
    {
        id: 'network',
        name: '网络工具',
        icon: 'cloud',
        description: 'IP地址、端口、HTTP状态码等网络相关工具',
        tools: [
            {
                id: 'ip-converter',
                name: 'IP地址转换',
                icon: 'lan',
                path: '/ip-converter',
                description: '免费在线IP地址转换工具，IP地址与十进制、二进制、十六进制互转，验证IP地址有效性。',
                keywords: ['IP转换', 'IP地址', '十进制IP', '二进制IP', 'IP工具', 'IP地址验证'],
                component: IPConverter,
            },
            {
                id: 'ip-subnet-calculator',
                name: 'IP子网计算',
                icon: 'hub',
                path: '/ip-subnet-calculator',
                description: '免费在线IP子网计算器，计算子网掩码、网络地址、可用主机数等子网信息。',
                keywords: ['子网计算', '子网掩码', 'CIDR', '网络地址', '子网划分', 'IP子网'],
                component: IPSubnetCalculator,
            },
            {
                id: 'status-code-lookup',
                name: 'HTTP状态码',
                icon: 'http',
                path: '/status-code-lookup',
                description: '免费在线HTTP状态码查询工具，查询HTTP状态码含义，了解常见响应码。',
                keywords: ['HTTP状态码', '状态码查询', 'HTTP响应', 'HTTP错误', '状态码含义'],
                component: StatusCodeLookup,
            },
            {
                id: 'port-lookup',
                name: '端口查询',
                icon: 'settings_ethernet',
                path: '/port-lookup',
                description: '免费在线端口查询工具，查询常用网络端口及其用途，了解端口范围分类。',
                keywords: ['端口查询', '网络端口', '端口号', '常用端口', '端口列表'],
                component: PortLookup,
            },
            {
                id: 'url-parser',
                name: 'URL解析器',
                icon: 'link',
                path: '/url-parser',
                description: '免费在线URL解析工具，解析URL结构，提取协议、域名、路径、参数等信息。',
                keywords: ['URL解析', 'URL编码', 'URL解码', '网址解析', 'URL工具'],
                component: URLParser,
            },
            {
                id: 'browser-fingerprint',
                name: '浏览器指纹',
                icon: 'fingerprint',
                path: '/browser-fingerprint',
                description: '免费在线浏览器指纹查看工具，查看当前浏览器的详细信息、硬件配置和网络状态。',
                keywords: ['浏览器指纹', '浏览器信息', '设备信息', 'UserAgent', '屏幕信息'],
                component: BrowserFingerprint,
            },
            {
                id: 'curl-generator',
                name: 'Curl生成器',
                icon: 'terminal',
                path: '/curl-generator',
                description: '免费在线Curl命令生成器，生成HTTP请求的curl命令，支持自定义请求头和请求体。',
                keywords: ['Curl生成', 'Curl命令', 'HTTP请求', 'API测试', '命令行工具'],
                component: CurlGenerator,
            },
        ],
    },
    {
        id: 'dev',
        name: '开发工具',
        icon: 'code',
        description: '代码编辑、格式化、数据生成等开发工具',
        tools: [
            {
                id: 'markdown-editor',
                name: 'Markdown编辑器',
                icon: 'edit_note',
                path: '/markdown-editor',
                description: '免费在线Markdown编辑器，实时预览效果，支持导出HTML文件。',
                keywords: ['Markdown', '编辑器', 'MD编辑', '文档编辑', '实时预览'],
                component: MarkdownEditor,
            },
            {
                id: 'code-formatter',
                name: '代码格式化',
                icon: 'format_align_left',
                path: '/code-formatter',
                description: '免费在线代码格式化工具，支持JS/HTML/CSS代码格式化和压缩。',
                keywords: ['代码格式化', '代码压缩', 'JS格式化', 'HTML格式化', 'CSS格式化'],
                component: CodeFormatter,
            },
            {
                id: 'json-escape',
                name: 'JSON转义工具',
                icon: 'data_object',
                path: '/json-escape',
                description: '免费在线JSON转义工具，JSON字符串添加或去除反斜杠转义。',
                keywords: ['JSON转义', 'JSON去反斜杠', '字符串转义', 'JSON处理'],
                component: JsonEscapeTool,
            },
            {
                id: 'random-data',
                name: '随机数据生成',
                icon: 'shuffle',
                path: '/random-data',
                description: '免费在线随机数据生成器，生成姓名、手机号、邮箱、地址等测试数据。',
                keywords: ['随机数据', '测试数据', '数据生成', '模拟数据'],
                component: RandomDataGenerator,
            },
            {
                id: 'mock-data',
                name: 'Mock数据生成',
                icon: 'database',
                path: '/mock-data',
                description: '免费在线Mock数据生成器，生成SQL、JSON、CSV格式的模拟测试数据。',
                keywords: ['Mock数据', '数据生成', 'SQL生成', '测试数据'],
                component: MockDataGenerator,
            },
            {
                id: 'linux-command',
                name: 'Linux命令字典',
                icon: 'terminal',
                path: '/linux-command',
                description: '免费在线Linux命令速查手册，常用Linux命令用法和示例。',
                keywords: ['Linux命令', '命令大全', 'Linux教程', '命令速查'],
                component: LinuxCommandDict,
            },
        ],
    },
];

export const ALL_TOOLS = TOOL_CATEGORIES.flatMap(category => category.tools);

export const getToolByPath = (path: string) => {
    return ALL_TOOLS.find(tool => tool.path === path);
};

export const getToolById = (id: ToolType) => {
    return ALL_TOOLS.find(tool => tool.id === id);
};

export const getToolSEO = (toolId: ToolType): ToolSEO => {
    const tool = getToolById(toolId);
    if (!tool) {
        return {
            title: '三八零零 - 在线免费工具箱',
            description: '三八零零提供在线翻译、图片处理、代码高亮等多种免费在线工具，无需注册，数据安全。',
            keywords: '在线工具,免费工具,工具箱,翻译,图片处理',
        };
    }
    return {
        title: `${tool.name} - 三八零零在线工具`,
        description: tool.description,
        keywords: tool.keywords.join(','),
    };
};

// EdgeOne Pages 边缘函数 - SEO 动态渲染
// 使用标准 fetch 事件监听格式
// 版本：适配 EdgeOne 标准，修复 545 错误

// SEO 配置
const seoConfig = {
  '/': {
    title: '三八零零 - 在线免费工具箱 | 80+ 实用工具大全',
    description: '三八零零是功能齐全的免费在线工具箱，提供在线翻译、图片处理、JSON格式化、代码高亮等80+种实用工具。所有工具本地运行，安全便捷。',
    keywords: '在线工具箱,免费工具大全,在线翻译,图片处理,JSON格式化,代码高亮,思维导图,PDF转换,AI工具',
    h1: '三八零零在线工具箱'
  },
  '/translate': {
    title: '在线翻译 - 免费多语言翻译工具 | 三八零零',
    description: '免费在线翻译工具，支持中英日韩法德西等多语言实时翻译，自动检测源语言，翻译结果准确快速。',
    keywords: '在线翻译,免费翻译,中英翻译,多语言翻译,谷歌翻译,日语翻译,韩语翻译',
    h1: '在线翻译工具'
  },
  '/image-converter': {
    title: '图片格式转换 - PNG/JPG/WebP/GIF 互转 | 三八零零',
    description: '免费在线图片格式转换工具，支持PNG、JPG、WebP、GIF、BMP等格式互转，批量转换，无需安装软件。',
    keywords: '图片转换,格式转换,PNG转JPG,WebP转换,图片格式,在线图片转换,批量转换',
    h1: '图片格式转换工具'
  },
  '/json-formatter': {
    title: 'JSON 格式化 - 在线美化/校验/压缩工具 | 三八零零',
    description: '免费在线JSON格式化工具，支持JSON数据格式化、校验、压缩，树形结构展示，开发者必备工具。',
    keywords: 'JSON格式化,JSON校验,JSON压缩,JSON解析,JSON在线工具,开发者工具,JSON编辑器',
    h1: 'JSON 格式化工具'
  },
  '/code-highlight': {
    title: '代码高亮 - 在线语法高亮/美化工具 | 三八零零',
    description: '在线代码语法高亮工具，支持Python、JavaScript、Java、C++等多种编程语言，一键复制高亮代码。',
    keywords: '代码高亮,语法高亮,代码美化,程序员工具,在线代码,代码显示,编程工具',
    h1: '代码高亮工具'
  },
  '/text-formatter': {
    title: '文本格式化 - 大小写转换/去空格/排序 | 三八零零',
    description: '免费在线文本格式化工具，支持大小写转换、去除空格、字数统计、文本排序等多种文本处理功能。',
    keywords: '文本格式化,大小写转换,去空格,字数统计,文本处理,在线文本工具,文本转换',
    h1: '文本格式化工具'
  },
  '/mortgage-calculator': {
    title: '房贷计算器 - 等额本息/本金精确计算 | 三八零零',
    description: '免费在线房贷计算器，支持等额本息、等额本金两种还款方式，精确计算月供、利息总额，买房必备工具。',
    keywords: '房贷计算器,房贷计算,等额本息,等额本金,月供计算,房贷利率,贷款计算器,买房贷款',
    h1: '房贷计算器'
  },
  '/qrcode-generator': {
    title: '二维码生成器 - 免费制作自定义二维码 | 三八零零',
    description: '免费在线二维码生成器，支持自定义颜色、尺寸、容错级别，一键下载PNG图片，支持网址、文本等内容。',
    keywords: '二维码生成,二维码制作,QR码生成,在线二维码,二维码工具,网址二维码,文本二维码',
    h1: '二维码生成器'
  },
  '/password-generator': {
    title: '密码生成器 - 高强度随机密码生成 | 三八零零',
    description: '免费在线随机密码生成器，生成高强度随机密码，支持自定义长度和字符类型，安全可靠。',
    keywords: '密码生成,随机密码,密码工具,强密码,密码生成器,安全密码',
    h1: '密码生成器'
  },
  '/pdf-to-ppt': {
    title: 'PDF转PPT - 在线转换可编辑演示文稿 | 三八零零',
    description: '免费在线PDF转PPT工具，将PDF文件转换为可编辑的PowerPoint演示文稿，保留原有排版。',
    keywords: 'PDF转PPT,PDF转换,PPT制作,文档转换,在线转换,PDF工具,演示文稿',
    h1: 'PDF 转 PPT 工具'
  },
  '/pdf-to-image': {
    title: 'PDF转长图 - 一键生成高清长图 | 三八零零',
    description: '免费在线PDF转长图工具，将PDF文档转换为长图，方便分享到微信、微博等社交平台。',
    keywords: 'PDF转图片,PDF转长图,PDF转换,长图生成,在线转换,PDF工具,文档转图片',
    h1: 'PDF 转长图工具'
  },
  '/image-compressor': {
    title: '图片压缩 - 在线批量压缩 JPG/PNG | 三八零零',
    description: '免费在线图片压缩工具，支持JPG、PNG格式，可调节压缩质量，批量压缩下载。',
    keywords: '图片压缩,图片缩小,压缩图片,在线压缩,批量压缩,图片优化',
    h1: '图片压缩工具'
  },
  '/base64-tool': {
    title: 'Base64 编解码 - 文本图片在线转换 | 三八零零',
    description: '免费在线Base64编码解码工具，支持文本和图片的Base64编解码，支持中文字符。',
    keywords: 'Base64,Base64编码,Base64解码,编码工具,图片Base64,Base64转换',
    h1: 'Base64 编解码工具'
  },
  '/timestamp-converter': {
    title: '时间戳转换 - Unix时间戳与日期互转 | 三八零零',
    description: '免费在线Unix时间戳转换工具，时间戳与日期时间互转，支持秒级和毫秒级时间戳。',
    keywords: '时间戳转换,Unix时间戳,时间戳,日期转换,时间转换,时间戳工具,在线转换',
    h1: '时间戳转换工具'
  },
  '/uuid-generator': {
    title: 'UUID生成器 - 批量生成唯一标识符 | 三八零零',
    description: '免费在线UUID/GUID生成器，批量生成UUID，支持UUID v1和v4版本，一键复制。',
    keywords: 'UUID生成,GUID,UUID,唯一标识符,UUID工具,批量生成',
    h1: 'UUID 生成器'
  },
  '/bmi-calculator': {
    title: 'BMI计算器 - 体重指数健康评估 | 三八零零',
    description: '免费在线BMI体重指数计算器，计算身体质量指数，评估健康状况，提供理想体重参考。',
    keywords: 'BMI计算器,体重指数,BMI,体重计算,健康体重,身体质量指数,健康指标',
    h1: 'BMI 计算器'
  },
  '/tax-calculator': {
    title: '个税计算器 - 个人所得税精确计算 | 三八零零',
    description: '免费在线个税计算器，计算个人所得税，支持五险一金、专项附加扣除，最新个税税率表。',
    keywords: '个税计算器,个人所得税,个税计算,工资计算,税后工资,个税税率,专项扣除,五险一金',
    h1: '个税计算器'
  },
  '/regex-tester': {
    title: '正则表达式测试 - 在线匹配验证工具 | 三八零零',
    description: '免费在线正则表达式测试工具，实时测试正则匹配，高亮显示匹配结果，支持多种正则语法。',
    keywords: '正则表达式,正则测试,Regex,正则工具,匹配测试,正则验证',
    h1: '正则表达式测试工具'
  },
  '/color-picker': {
    title: '颜色选择器 - RGB/HEX/HSL 互转工具 | 三八零零',
    description: '免费在线颜色转换工具，RGB、HEX、HSL颜色格式互转，支持颜色选择器和预设颜色。',
    keywords: '颜色转换,RGB转换,HEX转换,HSL转换,取色器,颜色选择,颜色工具',
    h1: '颜色选择器'
  },
  '/markdown-editor': {
    title: 'Markdown编辑器 - 在线实时预览编辑 | 三八零零',
    description: '免费在线Markdown编辑器，实时预览效果，支持导出HTML和PDF，写作必备工具。',
    keywords: 'Markdown,编辑器,MD编辑,文档编辑,实时预览,Markdown工具',
    h1: 'Markdown 编辑器'
  },
  '/mind-map': {
    title: '思维导图 - 在线制作脑图工具 | 三八零零',
    description: '免费在线思维导图制作工具，支持多种布局样式，一键导出PNG图片，适合整理思路、知识梳理。',
    keywords: '思维导图,脑图,流程图,知识图谱,在线思维导图,思维整理,笔记工具',
    h1: '思维导图工具'
  },
  '/hash-calculator': {
    title: 'Hash计算器 - MD5/SHA1/SHA256计算 | 三八零零',
    description: '免费在线Hash计算工具，计算MD5、SHA-1、SHA-256等哈希值，支持文本和文件。',
    keywords: 'Hash计算,MD5,SHA256,哈希值,文件校验,哈希工具',
    h1: 'Hash 计算器'
  },
  '/stopwatch': {
    title: '秒表计时器 - 在线精确计时工具 | 三八零零',
    description: '免费在线秒表计时器，精确到毫秒，支持计次功能，适用于运动、实验等计时场景。',
    keywords: '秒表,计时器,在线秒表,计次,运动计时,精确计时',
    h1: '秒表计时器'
  },
  '/countdown-timer': {
    title: '倒计时器 - 在线番茄钟定时提醒 | 三八零零',
    description: '免费在线倒计时器，支持自定义时间，番茄工作法、休息提醒等场景。',
    keywords: '倒计时,计时器,番茄钟,定时提醒,倒计时工具,专注计时',
    h1: '倒计时器'
  },
  '/world-clock': {
    title: '世界时钟 - 全球时区时间查询 | 三八零零',
    description: '免费在线世界时钟，查看全球各时区当前时间，支持添加多个城市。',
    keywords: '世界时钟,世界时间,时区查询,各国时间,时区转换,全球时间',
    h1: '世界时钟'
  },
  '/unit-converter': {
    title: '单位换算 - 长度/重量/面积/体积换算 | 三八零零',
    description: '免费在线单位换算工具，支持长度、重量、面积、体积、温度、数据存储等单位互转。',
    keywords: '单位换算,单位转换,长度换算,重量换算,面积换算,温度转换',
    h1: '单位换算工具'
  },
  '/text-diff': {
    title: '文本差异对比 - 在线代码对比工具 | 三八零零',
    description: '免费在线文本差异对比工具，对比两段文本的差异，高亮显示不同之处，支持代码对比。',
    keywords: '文本对比,差异对比,文本比较,代码对比,在线对比工具,文本差异',
    h1: '文本差异对比工具'
  },
  '/chinese-converter': {
    title: '简繁体转换 - 中文简体繁体互转 | 三八零零',
    description: '免费在线简繁体转换工具，支持简体中文与繁体中文互相转换，适合阅读繁体文章、文档转换。',
    keywords: '简繁体转换,简体转繁体,繁体转简体,中文转换,简体字,繁体字,字体转换',
    h1: '简繁体转换工具'
  },
  '/ip-converter': {
    title: 'IP地址转换 - 十进制/二进制/十六进制 | 三八零零',
    description: '免费在线IP地址转换工具，IP地址与十进制、二进制、十六进制互转，验证IP地址有效性。',
    keywords: 'IP转换,IP地址,十进制IP,二进制IP,IP工具,IP地址验证',
    h1: 'IP 地址转换工具'
  },
  '/cron-parser': {
    title: 'Cron表达式解析 - 定时任务时间计算 | 三八零零',
    description: '免费在线Cron表达式解析工具，解析定时任务表达式，显示下次执行时间。',
    keywords: 'Cron表达式,定时任务,Cron解析,定时器,任务调度',
    h1: 'Cron 表达式解析器'
  },
  '/date-calculator': {
    title: '日期计算器 - 日期间隔/推算计算 | 三八零零',
    description: '免费在线日期计算器，计算日期间隔、推算日期，支持加减天数、月份、年份。',
    keywords: '日期计算,日期间隔,日期推算,天数计算,日期差,日期工具',
    h1: '日期计算器'
  },
  '/number-base-converter': {
    title: '进制转换 - 二/八/十/十六进制互转 | 三八零零',
    description: '免费在线进制转换工具，支持二进制、八进制、十进制、十六进制互转。',
    keywords: '进制转换,二进制,八进制,十进制,十六进制,数制转换',
    h1: '进制转换工具'
  },
  '/crypto-tool': {
    title: 'AES加密解密 - 在线数据加密工具 | 三八零零',
    description: '免费在线AES加密解密工具，支持AES-GCM和AES-CBC算法，数据本地处理更安全。',
    keywords: 'AES加密,AES解密,加密工具,数据加密,对称加密',
    h1: 'AES 加密解密工具'
  },
  '/url-parser': {
    title: 'URL解析器 - 网址参数提取分析 | 三八零零',
    description: '免费在线URL解析工具，解析URL结构，提取协议、域名、路径、参数等信息。',
    keywords: 'URL解析,URL编码,URL解码,网址解析,URL工具',
    h1: 'URL 解析器'
  },
  '/status-code-lookup': {
    title: 'HTTP状态码查询 - 错误码含义解释 | 三八零零',
    description: '免费在线HTTP状态码查询工具，完整收录HTTP状态码含义，为开发者提供详细的错误排查指南。',
    keywords: 'HTTP状态码,状态码查询,HTTP响应,HTTP错误,状态码含义,404错误,500错误',
    h1: 'HTTP 状态码查询'
  },
  '/port-lookup': {
    title: '端口查询 - 常用网络端口用途查询 | 三八零零',
    description: '免费在线端口查询工具，查询常用网络端口及其用途，了解端口范围分类。',
    keywords: '端口查询,网络端口,端口号,常用端口,端口列表',
    h1: '端口查询工具'
  },
  '/curl-generator': {
    title: 'Curl命令生成器 - HTTP请求命令生成 | 三八零零',
    description: '免费在线Curl命令生成器，生成HTTP请求的curl命令，支持自定义请求头和请求体。',
    keywords: 'Curl生成,Curl命令,HTTP请求,API测试,命令行工具',
    h1: 'Curl 命令生成器'
  },
  '/browser-fingerprint': {
    title: '浏览器指纹 - 查看浏览器详细信息 | 三八零零',
    description: '免费在线浏览器指纹查看工具，查看当前浏览器的详细信息、硬件配置和网络状态。',
    keywords: '浏览器指纹,浏览器信息,设备信息,UserAgent,屏幕信息',
    h1: '浏览器指纹查看'
  },
  '/image-watermark': {
    title: '图片加水印 - 文字/图片水印添加 | 三八零零',
    description: '免费在线图片加水印工具，为图片添加个性化文字水印，保护作品版权。支持居中、平铺、右下角等多种位置。',
    keywords: '图片水印,加水印,文字水印,版权保护,图片处理,水印制作,在线水印',
    h1: '图片加水印工具'
  },
  '/image-bg-remover': {
    title: '图片去底色 - 智能抠图透明背景 | 三八零零',
    description: '免费在线图片去底色工具，智能去除纯色背景生成透明PNG图片，支持自定义颜色选择。',
    keywords: '去底色,透明背景,背景去除,图片处理,证件照处理,商品图片,PNG透明',
    h1: '图片去底色工具'
  },
  '/gif-maker': {
    title: 'GIF制作 - 多图合成动图工具 | 三八零零',
    description: '免费在线GIF制作工具，将多张静态图片合成GIF动图，可调节帧延迟。',
    keywords: 'GIF制作,动图生成,图片合成,GIF工具',
    h1: 'GIF 制作工具'
  },
  '/gif-splitter': {
    title: 'GIF分解 - 动图拆分为帧序列 | 三八零零',
    description: '免费在线GIF分解工具，将GIF动图拆分为单独的帧图片，可单独下载。',
    keywords: 'GIF分解,动图拆分,帧提取,GIF工具',
    h1: 'GIF 分解工具'
  },
  '/gif-compressor': {
    title: 'GIF压缩 - 减小动图文件大小 | 三八零零',
    description: '免费在线GIF压缩工具，压缩GIF动图减小文件大小，可调节压缩质量。',
    keywords: 'GIF压缩,动图压缩,GIF优化,文件压缩',
    h1: 'GIF 压缩工具'
  },
  '/age-calculator': {
    title: '年龄计算器 - 精确年龄/星座/生肖查询 | 三八零零',
    description: '免费在线年龄计算器，精确计算周岁年龄，智能识别星座生肖，预测距离下次生日天数。',
    keywords: '年龄计算,精确年龄,周岁计算,生日计算,星座查询,生肖查询',
    h1: '年龄计算器'
  },
  '/loan-calculator': {
    title: '贷款计算器 - 车贷/消费贷月供计算 | 三八零零',
    description: '免费在线贷款计算器，计算各类贷款的月供、总利息，适用于车贷、消费贷等。',
    keywords: '贷款计算器,贷款计算,月供计算,利息计算,车贷计算,消费贷',
    h1: '贷款计算器'
  },
  '/percentage-calculator': {
    title: '百分比计算器 - 增长率/占比计算 | 三八零零',
    description: '免费在线百分比计算器，计算百分比、增长率、占比等常见百分比问题。',
    keywords: '百分比计算,百分比,增长率,占比计算,百分比工具',
    h1: '百分比计算器'
  },
  '/scientific-calculator': {
    title: '科学计算器 - 三角函数/对数/幂运算 | 三八零零',
    description: '免费在线科学计算器，支持三角函数、对数、幂运算等科学计算功能。',
    keywords: '科学计算器,计算器,三角函数,对数,数学计算',
    h1: '科学计算器'
  },
  '/ip-subnet-calculator': {
    title: 'IP子网计算器 - CIDR/子网掩码计算 | 三八零零',
    description: '免费在线IP子网计算器，计算子网掩码、网络地址、可用主机数等子网信息。',
    keywords: '子网计算,子网掩码,CIDR,网络地址,子网划分,IP子网',
    h1: 'IP 子网计算器'
  },
  '/id-card-parser': {
    title: '身份证解析 - 号码信息提取查询 | 三八零零',
    description: '免费在线身份证号码解析工具，解析身份证获取出生日期、性别、籍贯等信息。',
    keywords: '身份证解析,身份证查询,身份证信息,身份证校验,身份证工具',
    h1: '身份证解析工具'
  },
  '/encoding-converter': {
    title: '编码转换 - UTF-8/GBK/Big5互转 | 三八零零',
    description: '免费在线文本编码转换工具，支持UTF-8、GBK、Big5等多种编码格式。',
    keywords: '编码转换,字符编码,UTF-8,GBK,Big5,编码工具',
    h1: '编码转换工具'
  },
  '/number-generator': {
    title: '随机数生成器 - 抽奖/随机选择工具 | 三八零零',
    description: '免费在线随机数生成工具，生成指定范围内的随机数字，支持不重复抽取。',
    keywords: '随机数,随机数生成,抽奖,随机选择,掷骰子',
    h1: '随机数生成器'
  },
  '/text-statistics': {
    title: '文字统计 - 字数/字符/段落统计 | 三八零零',
    description: '免费在线文字统计工具，统计字符数、词数、行数、段落数，估算阅读时间。',
    keywords: '文字统计,字数统计,字符统计,词数统计,字数计算,文章统计',
    h1: '文字统计工具'
  },
  '/text-transform': {
    title: '文本转换 - 驼峰/下划线/常量命名 | 三八零零',
    description: '免费在线文本转换工具，一键转换多种文本格式和命名风格，支持驼峰命名、下划线命名等。',
    keywords: '文本转换,大小写转换,命名转换,驼峰命名,下划线命名,格式转换',
    h1: '文本转换工具'
  },
  '/resume-generator': {
    title: '简历生成器 - 精美模板一键生成 | 三八零零',
    description: '免费在线简历制作工具，多套精美模板可选，一键导出PDF，助力求职找工作。',
    keywords: '简历制作,在线简历,简历模板,求职简历,简历生成,个人简历,求职工具',
    h1: '简历生成器'
  },
  '/prompt-generator': {
    title: '提示词生成器 - AI提示词优化工具 | 三八零零',
    description: '免费在线AI提示词生成工具，智能生成优化提示词，提升ChatGPT、Claude等AI工具使用效果。',
    keywords: '提示词,Prompt,AI写作,ChatGPT提示词,提示词优化,AI工具,提示词生成',
    h1: '提示词生成器'
  },
  '/mbti-test': {
    title: 'MBTI人格测试 - 16型性格测试 | 三八零零',
    description: '免费在线MBTI人格测试，专业的性格测试问卷，了解自己的性格类型，职业规划参考。',
    keywords: 'MBTI,人格测试,性格测试,心理测试,职业测试,人格类型,16型人格',
    h1: 'MBTI 人格测试'
  },
  '/image-to-prompt': {
    title: '图片转提示词 - AI图片描述生成 | 三八零零',
    description: '免费在线AI图片分析工具，智能分析图片内容生成描述提示词，可用于AI绘画参考。',
    keywords: '图片描述,AI提示词,图片分析,AI识别,图片标签,图像识别,AI绘画',
    h1: '图片转提示词'
  },
  '/image-watermark-remover': {
    title: '图片去水印 - AI智能水印去除 | 三八零零',
    description: '免费在线AI图片水印去除工具，智能识别并去除图片水印，还原图片原貌，效果自然。',
    keywords: '去水印,水印去除,图片修复,AI去水印,在线去水印,图片处理,水印清除',
    h1: '图片去水印工具'
  },
  '/table-converter': {
    title: '表格转换器 - CSV/Excel/JSON/Markdown | 三八零零',
    description: '免费在线表格格式转换工具，支持CSV、Excel、JSON、Markdown、HTML等表格格式互转。',
    keywords: '表格转换,CSV转换,Excel转换,表格格式,数据转换,在线表格工具,JSON转CSV',
    h1: '表格转换器'
  },
  '/video-aspect-converter': {
    title: '视频比例转换 - 横屏竖屏适配裁剪 | 三八零零',
    description: '免费在线视频比例转换工具，调整视频比例适配抖音、快手、B站等不同平台，支持裁剪和填充。',
    keywords: '视频比例,视频转换,视频裁剪,短视频制作,视频编辑,横屏转竖屏,视频适配',
    h1: '视频比例转换工具'
  },
  '/vram-calculator': {
    title: '显存计算器 - AI模型显存需求计算 | 三八零零',
    description: '专业AI模型显存计算器，精准计算深度学习模型训练和推理所需GPU显存。',
    keywords: '显存计算,GPU计算,AI训练,深度学习,显卡计算,模型训练,CUDA计算',
    h1: '显存计算器'
  },
  '/math-formula': {
    title: '数学公式编辑器 - LaTeX在线编辑 | 三八零零',
    description: '免费在线LaTeX数学公式编辑器，实时预览公式效果，支持导出PNG图片，适合论文写作。',
    keywords: '数学公式,LaTeX,公式编辑器,数学符号,在线公式,公式生成,论文公式',
    h1: '数学公式编辑器'
  },
  '/drawing': {
    title: '绘图画板 - 在线自由绘图工具 | 三八零零',
    description: '免费在线绘图画板，专业级Web绘图工具。支持画笔、几何图形、文字标注等多种绘制工具。',
    keywords: '画板,绘图,白板,涂鸦,在线画图,画图工具,手绘,流程图,草图设计',
    h1: '绘图画板'
  },
  '/pension-calculator': {
    title: '养老金计算器 - 退休金金额估算 | 三八零零',
    description: '免费在线养老金计算器，估算退休后可领取的养老金金额，支持自定义缴费基数、缴费年限等参数。',
    keywords: '养老金计算器,退休金计算,养老金估算,社保计算,退休规划,养老保险,养老金预测',
    h1: '养老金计算器'
  },
  '/word-cloud': {
    title: '词云生成器 - 文本可视化词云图 | 三八零零',
    description: '免费在线词云图生成器，将文字转换为视觉化词云艺术，智能分析文本词频，一键导出高清图片。',
    keywords: '词云,词云图,文字云,数据可视化,词频分析,文本可视化,信息图表',
    h1: '词云生成器'
  },
  '/grid-image-cutter': {
    title: '九宫格切图 - 社交分享图片切割 | 三八零零',
    description: '免费在线九宫格切图工具，将图片切割成九宫格，适合社交平台分享。',
    keywords: '九宫格,切图,图片切割,社交分享',
    h1: '九宫格切图工具'
  },
  '/photo-collage': {
    title: '图片拼图 - 多图拼接模板工具 | 三八零零',
    description: '免费在线拼图工具，使用预设模板快速拼接多张图片，支持多种拼图模板，一键生成精美拼图。',
    keywords: '拼图模板,图片拼贴,照片拼图,拼图制作,在线拼图,照片拼接,图片组合',
    h1: '图片拼图工具'
  },
  '/image-comparison': {
    title: '多图拼接 - 横向/纵向自由拼接 | 三八零零',
    description: '免费在线多图拼接工具，将多张图片自由拼接成长图，支持横向纵向拼接，自定义布局。',
    keywords: '图片拼接,长图制作,拼图,多图拼接,在线拼图,图片合成,长图生成',
    h1: '多图拼接工具'
  },
  '/image-round-corner': {
    title: '图片圆角 - 圆角图片生成处理 | 三八零零',
    description: '免费在线图片圆角处理工具，为图片添加圆角效果，支持自定义圆角大小，一键生成圆角图片。',
    keywords: '圆角图片,图片圆角,圆角处理,头像制作,圆角生成,在线圆角',
    h1: '图片圆角处理工具'
  },
  '/photo-bg-changer': {
    title: '证件照换底色 - AI智能背景替换 | 三八零零',
    description: 'AI智能证件照换底色，支持红底、蓝底、白底，一键更换证件照背景。',
    keywords: '证件照,换底色,背景更换,证件照处理,AI换背景',
    h1: '证件照换底色工具'
  },
  '/image-to-ico': {
    title: '图片转ICO - 网站图标favicon生成 | 三八零零',
    description: '免费在线图片转ICO图标工具，生成网站favicon图标，支持多种尺寸。',
    keywords: 'ICO转换,favicon,网站图标,图标生成',
    h1: '图片转 ICO 工具'
  },
  '/code-formatter': {
    title: '代码格式化 - JS/HTML/CSS美化压缩 | 三八零零',
    description: '免费在线代码格式化工具，支持JavaScript、HTML、CSS代码的美化格式化和压缩优化。',
    keywords: '代码格式化,代码压缩,代码美化,JS格式化,HTML格式化,CSS格式化,JavaScript格式化',
    h1: '代码格式化工具'
  },
  '/json-escape': {
    title: 'JSON转义工具 - 字符串转义/反转义 | 三八零零',
    description: '免费在线JSON转义工具，JSON字符串添加或去除反斜杠转义。',
    keywords: 'JSON转义,JSON去反斜杠,字符串转义,JSON处理',
    h1: 'JSON 转义工具'
  },
  '/random-data': {
    title: '随机数据生成 - 姓名/手机号/邮箱生成 | 三八零零',
    description: '免费在线随机数据生成器，生成姓名、手机号、邮箱、地址等测试数据。',
    keywords: '随机数据,测试数据,数据生成,模拟数据',
    h1: '随机数据生成器'
  },
  '/mock-data': {
    title: 'Mock数据生成 - 测试数据SQL/JSON生成 | 三八零零',
    description: '免费在线Mock数据生成器，专业的测试数据生成工具，支持JSON、SQL、CSV多种格式。',
    keywords: 'Mock数据,数据生成,SQL生成,测试数据,模拟数据,API测试,前端开发,JSON生成',
    h1: 'Mock 数据生成器'
  },
  '/linux-command': {
    title: 'Linux命令大全 - 常用命令速查手册 | 三八零零',
    description: '免费在线Linux命令速查手册，常用Linux命令用法和示例，开发者必备参考工具。',
    keywords: 'Linux命令,命令大全,Linux教程,命令速查,Shell命令',
    h1: 'Linux 命令大全'
  },
  '/chinese-to-pinyin': {
    title: '中文转拼音 - 汉字拼音转换工具 | 三八零零',
    description: '免费在线中文转拼音工具，将中文汉字转换为拼音，支持声调显示。',
    keywords: '中文转拼音,拼音转换,汉字拼音,拼音工具',
    h1: '中文转拼音工具'
  },
  '/relationship-calculator': {
    title: '亲戚关系计算器 - 中国亲属称谓查询 | 三八零零',
    description: '免费在线亲戚关系计算器，专业解决中国复杂亲戚关系称呼难题，支持多级关系链查询。',
    keywords: '亲戚关系,亲戚称呼,关系计算,家庭关系,亲属称谓,家族关系,传统称谓',
    h1: '亲戚关系计算器'
  },
  '/ascii-art': {
    title: 'ASCII艺术字 - 字符画生成工具 | 三八零零',
    description: '免费在线ASCII艺术字生成器，将普通文字转换为复古ASCII字符画艺术，多种字体风格可选。',
    keywords: 'ASCII艺术,字符画,艺术字,ASCII生成,文字艺术,终端装饰,代码注释',
    h1: 'ASCII 艺术字生成器'
  },
  '/category/all': {
    title: '全部工具分类 - 免费在线工具大全 | 三八零零',
    description: '浏览三八零零在线工具箱的所有工具分类，包括文本工具、图片工具、数据工具、媒体工具、AI工具、网络工具、开发工具等80+种实用在线免费工具。',
    keywords: '在线工具分类,免费工具,全部分类,文本工具,图片工具,数据工具,媒体工具,AI工具,网络工具,开发工具',
    h1: '全部工具分类'
  },
  '/category/calculator': {
    title: '在线计算器大全 - 房贷/个税/BMI/科学计算 | 三八零零',
    description: '提供房贷计算器、个税计算器、BMI计算器、日期计算器、科学计算器等多种专业在线计算工具。',
    keywords: '在线计算器,房贷计算,个税计算,BMI计算,日期计算,科学计算',
    h1: '在线计算器大全'
  },
  '/category/utility': {
    title: '便民实用工具 - 时间戳/二维码/密码生成 | 三八零零',
    description: '时间戳转换、Base64编解码、密码生成器、二维码生成器、单位换算、世界时钟等日常便民工具。',
    keywords: '便民工具,时间戳转换,Base64,密码生成,二维码,单位换算',
    h1: '便民实用工具'
  },
  '/category/text': {
    title: '文本处理工具 - 翻译/格式化/对比/统计 | 三八零零',
    description: '在线翻译、代码高亮、JSON格式化、文本差异对比、文字统计、简繁转换等文本处理工具。',
    keywords: '文本工具,在线翻译,代码高亮,JSON格式化,文本对比,文字统计',
    h1: '文本处理工具'
  },
  '/category/image': {
    title: '图片处理工具 - 转换/编辑/压缩/去水印 | 三八零零',
    description: '图片格式转换、图片编辑、图片拼接、图片压缩、水印去除、图片圆角等在线图片处理工具。',
    keywords: '图片工具,图片转换,图片编辑,图片压缩,去水印,图片拼接',
    h1: '图片处理工具'
  },
  '/category/data': {
    title: '数据与图形工具 - 表格/公式/思维导图 | 三八零零',
    description: '表格格式转换、数学公式编辑、思维导图、绘图画布、随机数据生成等数据处理工具。',
    keywords: '数据工具,表格转换,数学公式,思维导图,在线绘图,随机数据',
    h1: '数据与图形工具'
  },
  '/category/media': {
    title: '媒体转换工具 - 视频/PDF转换/处理 | 三八零零',
    description: '视频比例转换、PDF转PPT、PDF转长图等媒体格式转换处理工具。',
    keywords: '媒体工具,视频转换,PDF转换,PDF转PPT,PDF转图',
    h1: '媒体转换工具'
  },
  '/category/ai': {
    title: 'AI智能工具 - 简历/提示词/人格测试 | 三八零零',
    description: '图片转提示词、简历生成器、提示词生成器、MBTI人格测试、AI助手等智能效率工具。',
    keywords: 'AI工具,简历生成,提示词生成,MBTI测试,AI分析',
    h1: 'AI 智能工具'
  },
  '/category/network': {
    title: '网络开发工具 - IP计算/状态码/URL解析 | 三八零零',
    description: 'IP地址转换、子网计算、HTTP状态码查询、端口查询、URL解析、Curl生成器等开发网络工具。',
    keywords: '网络工具,开发工具,IP转换,子网计算,HTTP状态码,URL解析',
    h1: '网络开发工具'
  },
  '/category/dev': {
    title: '编程开发工具 - 代码格式化/正则/JSON | 三八零零',
    description: '代码格式化、正则测试、JSON处理、Hash计算、加密解密等开发者常用编程工具。',
    keywords: '开发工具,编程工具,代码格式化,正则测试,JSON处理,加密解密',
    h1: '编程开发工具'
  },
  '/ranking': {
    title: '工具排行榜 - 热门实用工具推荐 | 三八零零',
    description: '三八零零工具排行榜，精选优质工具推荐，包括AI写作工具、图像处理工具、开发工具、效率工具等。',
    keywords: '工具排行榜,热门工具,工具推荐,最佳工具,效率工具排行',
    h1: '工具排行榜'
  },
  '/topics': {
    title: '工具专题 - 深度工具推荐指南 | 三八零零',
    description: '三八零零工具专题页面，提供新手工具推荐、免费工具推荐、国内工具推荐等专题内容。',
    keywords: '工具专题,新手工具推荐,免费工具,国内工具,工具使用指南',
    h1: '工具专题'
  }
};

// 爬虫列表
const crawlers = [
  'googlebot', 'bingbot', 'baiduspider', 'yandex', 'duckduckbot',
  'slurp', 'facebookexternalhit', 'twitterbot', 'linkedinbot',
  'whatsapp', 'telegrambot', 'applebot', 'petalbot', 'sogou',
  '360spider', 'bytespider', 'yisouspider', 'shenmaspider'
];

// 静态资源扩展名
const staticExtensions = /\.(ico|png|jpg|jpeg|gif|webp|svg|css|js|woff|woff2|ttf|eot|otf|json|xml|txt|pdf|zip|gz|br|map)$/i;

// 主处理函数
async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname;

  // 1. 排除静态资源
  if (staticExtensions.test(path)) {
    return fetch(request);
  }

  // 2. 标准化路径
  let normalizedPath = path.replace(/\/$/, '');
  if (normalizedPath === '') {
    normalizedPath = '/';
  }

  // 3. 检查是否是需要SEO的页面
  const seo = seoConfig[normalizedPath];
  if (!seo) {
    return fetch(request);
  }

  // 4. 检查是否是爬虫
  const userAgent = request.headers.get('User-Agent') || '';
  const isCrawler = crawlers.some(c => userAgent.toLowerCase().includes(c.toLowerCase()));

  if (!isCrawler) {
    return fetch(request);
  }

  // 5. 获取HTML并注入SEO
  try {
    const originResponse = await fetch(`${url.origin}/index.html`);
    if (!originResponse.ok) {
      return fetch(request);
    }

    let html = await originResponse.text();
    const currentUrl = `https://tools.3800ai.com${normalizedPath === '/' ? '' : normalizedPath}/`;

    // 替换SEO标签
    html = html.replace(/<title>.*?<\/title>/i, `<title>${seo.title}</title>`);
    html = html.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, `<meta name="description" content="${seo.description}">`);
    html = html.replace(/<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/i, `<meta name="keywords" content="${seo.keywords}">`);
    html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${currentUrl}">`);

    // Open Graph
    html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${seo.title}">`);
    html = html.replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${seo.description}">`);

    // JSON-LD
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": seo.h1,
      "description": seo.description,
      "url": currentUrl,
      "applicationCategory": "ProductivityApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "CNY"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "128"
      }
    };

    const jsonLdScript = `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;
    html = html.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/i, jsonLdScript);

    // SSR内容
    const ssrContent = `<div data-ssr="true" style="display:none"><h1>${seo.h1}</h1><p>${seo.description}</p></div>`;
    html = html.replace('<div id="root"></div>', `<div id="root">${ssrContent}</div>`);

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  } catch (e) {
    return fetch(request);
  }
}

// EdgeOne 标准入口
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

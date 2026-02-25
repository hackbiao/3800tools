// 工具特定SEO内容配置
const toolSEOConfig = {
    'translate': {
        title: '在线翻译工具 - AI多语言互译',
        description: '免费在线翻译服务，支持中英日韩法德西等多语言智能翻译，基于先进AI技术，翻译准确度高，响应快速',
        keyword: '在线翻译,AI翻译,多语言翻译,翻译工具,免费翻译,谷歌翻译,百度翻译',
        experience: '这款AI智能翻译工具在处理日常对话、商务邮件和学术材料时表现出色。翻译结果自然流畅，语法结构清晰，比传统机器翻译更加人性化。',
        pros: '支持80+语言对|AI驱动准确率高|实时快速翻译|保护隐私，本地处理|支持长文档翻译|自动语言检测',
        cons: '需要网络连接|专业术语偶需校对|离线模式受限|文学翻译有提升空间',  
        recommendation: '特别适合外贸人员、留学生、学者和跨国企业员工使用'
    },
    
    'image-converter': {
        title: '图片格式转换器 - 批量处理工具',
        description: '免费在线图片格式转换工具，支持PNG/JPG/WebP/GIF/BMP等20+格式互转，批量处理保持高质量',
        keyword: '图片转换,格式转换,PNG转JPG,JPG转PNG,WebP转换,GIF转换,批量图片处理',
        experience: '在处理批量图片转换时非常高效，能够保持原始图片质量和比例。支持拖拽上传，处理速度快，适合设计师和内容创作者批量处理图片。',
        pros: '支持20+图片格式|批量同时转换|保持原始质量|压缩比可调|本地处理安全|处理速度快',
        cons: '不支持RAW格式|大文件处理较慢|矢量图处理有限|复杂滤镜效果不支持',
        recommendation: '特别适合网站开发者、设计师、内容创作者批量转换图片格式'
    },
    
    'json-formatter': {
        title: 'JSON格式化工具 - 校验美化',
        description: '免费在线JSON格式化工具，支持JSON数据美化、压缩、校验、高亮显示，适合开发者调试API数据',
        keyword: 'JSON格式化,JSON校验,JSON美化,JSON压缩,JSON解析,API调试,前端开发',
        experience: '作为开发者日常使用频率最高的工具之一，在调试API响应、处理配置文件时非常实用。能够快速定位JSON语法错误，支持超大文件处理。',
        pros: '语法错误检测|支持超大文档|多级缩进高亮|实时验证反馈|本地处理安全|折叠展开功能',
        cons: '仅支持JSON格式|低配设备压力大|编辑功能有限|无Schema验证',
        recommendation: '必备的前端/后端开发工具，适合API调试、数据处理、配置文件编辑'
    },
    
    'mortgage-calculator': {
        title: '房贷计算器 - 月供利息计算',
        description: '免费房贷计算工具，支持等额本息、等额本金计算，精确计算月供、总利息、还款计划',
        keyword: '房贷计算器,月供计算,利息计算,公积金贷款,商业贷款,贷款利率,购房预算',
        experience: '帮助我准确计算了不同贷款方案的月供和总利息，对比了等额本息和等额本金的差异，为购房决策提供了重要参考。',
        pros: '支持主流还款方式|利率可灵活设置|计算结果精准|生成详细还款表|贷款方案对比|数据安全',
        cons: '无法保存计算结果|不支持组合贷款|利率政策更新需手动|无银行申请建议',
        recommendation: '适合购房者、贷款顾问、房产中介计算比较不同贷款方案'
    },
    
    'password-generator': {
        title: '密码生成器 - 强密码生成',
        description: '免费在线密码生成器，生成高强度随机密码，支持自定义大小写、数字、特殊字符',
        keyword: '密码生成器,随机密码,强密码,密码生成,安全密码,密码强度',
        experience: '能够生成符合各平台要求的密码，包括企业密码策略，生成的随机密码强度高，满足安全要求。',
        pros: '可自定义密码长度|支持多种字符集|密码强度检测|批量生成功能|本地生成安全|复制便捷',
        cons: '无法保存历史|不支持密码管理|需要手动复制|无密码过期提醒',
        recommendation: '适合需要设置各类账户密码的用户，特别是IT管理员和安全人员'
    },
    
    'qrcode-generator': {
        title: '二维码生成器 - 自定义QR码',
        description: '免费在线二维码生成器，支持自定义颜色、尺寸、容错级别，可生成文本、网址、WiFi等二维码',
        keyword: '二维码生成器,QR码生成,二维码制作,自定义二维码,免费二维码',
        experience: '生成的二维码清晰度高，识别速度快，支持自定义颜色和Logo，适合制作各种应用场景的二维码。',
        pros: '多种内容类型支持|自定义颜色样式|高清晰度输出|批量生成功能|容错级别可选|即时预览',
        cons: '无法直接编辑Logo|动态二维码需升级|批量下载功能有限|历史记录无法保存',
        recommendation: '适合需要制作二维码的营销人员、活动组织者、商户和普通用户'
    },
    
    'text-statistics': {
        title: '文字统计工具 - 字数词数分析',
        description: '免费在线文字统计工具，统计字符数、词数、行数、段落数、空格等详细信息',
        keyword: '文字统计,字数统计,词数统计,文本分析,字符统计,作文统计',
        experience: '统计结果精确，支持中英文混合统计，特别适合写作时控制字数要求，如微博、作文、邮件等。',
        pros: '实时统计更新|支持中英文混合|多维度统计|界面简洁易用|无需注册免费|文本格式保留',
        cons: '不支持文件上传|无法保存统计结果|无历史记录功能|批量处理受限',
        recommendation: '适合学生、作家、编辑、运营人员统计字数控制文案长度'
    },
    
    'base64-tool': {
        title: 'Base64编解码 - 在线转换',
        description: '免费在线Base64编解码工具，支持文本和图片的Base64编码解码',
        keyword: 'Base64编码,Base64解码,Base64转图片,图片Base64,编码转换',
        experience: '在处理图片和数据URI转换时非常实用，可以直接将图片转换为Base64嵌入HTML中，提升加载速度。',
        pros: '支持文本和图片|实时编解码|批量处理功能|支持大文件|本地处理安全|结果即时显示',
        cons: '大图片编码较慢|无法处理超大文件|编码结果占用空间大|预览功能有限',
        recommendation: '适合开发者、网页设计师、内容创作者需要Base64编码的场景'
    },
    
    'prompt-generator': {
        title: 'AI提示词生成器 - 优化prompt',
        description: '免费在线AI提示词生成工具，智能生成优化的AI对话提示词，提升AI对话效果',
        keyword: '提示词生成器,AI提示词,prompt生成,ChatGPT提示词,AI对话优化',
        experience: '生成的提示词更加精准和详细，能够让AI给出更高质量的回应，特别适合需要与AI进行深入沟通的场景。',
        pros: '智能生成优化提示词|多领域支持|结构化输出|模板丰富|持续更新|使用简单',
        cons: '需要网络访问|提示词质量依赖模板|高级功能需付费|无历史记录',
        recommendation: '适合AI用户、内容创作者、研究人员提升AI对话质量'
    },
    
    'ip-converter': {
        title: 'IP地址转换 - 进制转换',
        description: '免费在线IP地址转换工具，支持IP与十进制、二进制、十六进制互转',
        keyword: 'IP地址转换,IP进制转换,二进制IP,十进制IP,IP工具,网络工具',
        experience: '在网络调试和分析时非常实用，能够快速进行不同进制间的IP地址转换，支持IPv4和IPv6。',
        pros: '支持多种进制|实时转换|格式规范|网络验证|批量处理|准确可靠',
        cons: '不支持子网掩码|无反向查询|格式转换有限|不支持MAC地址',
        recommendation: '适合网络工程师、IT管理员、开发者进行IP相关计算和调试'
    },
    
    'linux-command': {
        title: 'Linux命令字典 - 命令查询',
        description: '免费在线Linux命令字典，提供命令用法、参数说明、示例，Linux学习实用工具',
        keyword: 'Linux命令,Linux教程,Shell命令,Linux学习,命令大全,Linux字典',
        experience: '包含常用Linux命令的详细说明和示例，是Linux系统管理员和学习者的好帮手，命令搜索便捷。',
        pros: '命令全面详细|使用示例丰富|分类清晰|搜索便捷|实时更新|适合初学者',
        cons: '高级命令覆盖有限|实战案例较少|无法在线执行|无命令历史记录',
        recommendation: '适合Linux初学者、系统管理员、DevOps工程师快速查询命令'
    },
    
    // 计算器类别
    'pension-calculator': {
        title: '养老金计算器 - 退休金测算',
        description: '免费在线养老金计算器，计算退休后可领取的养老金金额，规划退休生活',
        keyword: '养老金计算器,退休金计算,社保养老金,退休规划,养老金测算',
        experience: '帮助估算退休后的养老金收入，为退休规划提供参考。计算基于当前社保政策，结果仅供参考。',
        pros: '基于现行社保政策|计算结果清晰|支持多种参数|退休规划参考|简单易懂',
        cons: '政策变化需更新|无法包含全部变量|地区差异需调整|结果仅供参考',
        recommendation: '适合规划退休生活的中年用户，了解预计退休收入'
    },
    
    'tax-calculator': {
        title: '个税计算器 - 个人所得税',
        description: '免费在线个税计算器，计算个人所得税、速算扣除数，2024年最新税率',
        keyword: '个税计算器,个人所得税计算,工资个税,个税税率,2024个税',
        experience: '准确计算工资个税，帮助了解实际到手工资。包含专项附加扣除等，与税务政策同步更新。',
        pros: '最新税率政策|专项附加扣除|到手工资计算|工资条生成|准确可靠',
        cons: '政策变化需更新|地区差异未包含|复杂情况需专业咨询',
        recommendation: '适合上班族、HR、财务人员计算个税'
    },
    
    'vram-calculator': {
        title: '显存计算器 - GPU VRAM需求',
        description: 'AI模型显存需求计算器，评估训练和推理所需GPU显存容量',
        keyword: '显存计算器,VRAM计算,GPU显存,AI模型,CPU内存,深度学习',
        experience: '帮助AI开发者评估模型训练需求，避免显存不足导致训练中断。支持多种模型配置计算。',
        pros: '支持主流模型|精确计算显存|训练推理都支持|多参数配置|优化建议',
        cons: '模型更新快需同步|复杂配置需专业|实际环境有差异',
        recommendation: '适合AI开发者、深度学习工程师评估硬件需求'
    },
    
    'bmi-calculator': {
        title: 'BMI计算器 - 体重指数评估',
        description: '免费BMI体重指数计算器，评估健康体重，提供健康建议',
        keyword: 'BMI计算器,体重指数,BMI健康,标准体重,健康评估',
        experience: '快速计算BMI指数，评估是否在健康范围内。界面简洁，适合日常健康管理。',
        pros: '计算快速准确|健康建议|适合所有年龄|数据本地安全|界面友好',
        cons: '仅供参考|个体差异需考虑|专业咨询建议',
        recommendation: '适合关注健康的所有人使用'
    },
    
    'date-calculator': {
        title: '日期计算器 - 天数计算',
        description: '免费在线日期计算器，计算日期间隔、推算日期、工作日计算',
        keyword: '日期计算器,天数计算,日期推算,工作日计算,日期工具',
        experience: '在项目排期、活动规划时非常实用，能准确计算日期间隔和工作日数量。',
        pros: '精准日期计算|工作日排除|节日支持|多种计算模式|结果准确',
        cons: '节假日需更新|时区差异需注意|闰秒等特殊情况',
        recommendation: '适合项目管理者、活动策划师计算时间'
    },
    
    'percentage-calculator': {
        title: '百分比计算器 - 百分比换算',
        description: '免费在线百分比计算器，计算增减百分比、占比、折扣计算',
        keyword: '百分比计算器,增长率计算,折扣计算,占比计算,百分数',
        experience: '商业分析时经常使用，计算增长率、市场份额占比等，结果清晰易懂。',
        pros: '多种计算模式|实时显示结果|精确计算|应用广泛|操作简单',
        cons: '复杂公式需人工|大数据计算限制|需要理解概念',
        recommendation: '适合商务、财务、教育领域计算百分比'
    },
    
    'scientific-calculator': {
        title: '科学计算器 - 函数计算',
        description: '免费在线科学计算器，支持三角函数、对数、幂运算等复杂数学计算',
        keyword: '科学计算器,函数计算,三角函数,对数计算,数学计算器',
        experience: '专业级科学计算能力，满足学生和科研人员需求，界面设计清晰易用。',
        pros: '函数丰富全面|精度高准确|历史记录功能|图形显示|适用教育',
        cons: '复杂输入需适应|高级功能学习成本|相比硬件功能有限',
        recommendation: '适合学生、教师、工程师、研究人员'
    },
    
    'loan-calculator': {
        title: '贷款计算器 - 贷款还款计算',
        description: '免费贷款计算器，计算各种贷款的月供、利息、还款总额',
        keyword: '贷款计算器,贷款月供,车贷计算,消费贷款,利息计算,还款计划',
        experience: '比较不同贷款产品的真实成本，选择最优贷款方案，避免隐性费用。',
        pros: '多种贷款类型|详细还款计划|总成本计算|方案对比|利率调整模拟',
        cons: '实际利率有别|手续费另算|信用影响未包含',
        recommendation: '适合需要贷款的个人、小企业主比较选择'
    },
    
    'age-calculator': {
        title: '年龄计算器 - 精确日期计算',
        description: '免费在线年龄计算器，根据出生日期计算精确年龄、月日',
        keyword: '年龄计算器,精确年龄,出生日期计算,星座生肖,生日倒计时',
        experience: '能精确计算到天，包含星座生肖信息，生日倒计时功能增加趣味性。',
        pros: '计算精确到天|包含星座生肖|生日功能|纪念日追踪|操作简单',
        cons: '仅作参考使用|时区误差可能|文化差异考虑',
        recommendation: '适合所有人使用，增加生活趣味'
    },
    
    // 实用工具类别
    'chinese-converter': {
        title: '简繁体转换 - 繁简互转',
        description: '免费在线简繁体中文转换工具，支持繁简互转，保持文本原格式',
        keyword: '简繁转换,繁简转换,中文转换,简体转繁体,繁体转简体',
        experience: '转换准确率高，保留格式，适合处理大量文本的繁简转换需求。',
        pros: '转换准确率99%+|保持原格式|批量处理|简繁自动识别|本地处理安全',
        cons: '部分生僻字需人工|格式可能略变化|网络依赖',
        recommendation: '适合港澳台与大陆交流的文案工作者'
    },
    
    'timestamp-converter': {
        title: '时间戳转换 - Unix时间',
        description: '免费在线Unix时间戳转换工具，时间戳与日期互转',
        keyword: '时间戳转换,Unix时间,时间戳转换器,Unix时间戳,时间计算',
        experience: '程序员必备工具，时间转换精确到毫秒，适合调试时序相关功能。',
        pros: '毫秒级精度|多时区支持|实时转换|批量转换|标准格式遵循',
        cons: '仅支持Unix格式|时区需手动|非技术用户较陌生',
        recommendation: '开发者、系统管理员必备工具'
    },
    
    'uuid-generator': {
        title: 'UUID生成器 - 全球唯一ID',
        description: '免费在线UUID生成器，生成全球唯一标识符，批量生成',
        keyword: 'UUID生成器,唯一ID, GUID生成器随机,串生成设备,标识符生成',
        experience: '生成符合RFC规范的UUID，适合作为数据库主键或文件唯一标识使用。',
        pros: '符合国际规范|128位唯一标识安全批量生成器多种版本可生成选本地处理生成速度',
        cons: '长度较长人工识别难非技术人难记批量生可能管理复使用',
        recommendation: '适合需要唯一标识的应用开发者和系统设计者使用'
    },
    
    'color-picker': {
        title: '颜色转换器 - HSL RGB HEX',
        description: '免费在线颜色转换色板取色工具',
        keyword: '颜色转换色板取色RGBHEXHSL颜色选器调色板',
        experience: '设计师实用工具，支持取色、配色、调色，适合网页和UI设计使用。',
        pros: '实时取色功能|配色方案|调色板|转换多种颜色代码|支持格式|代码复制',
        cons: '取色需手动|色盲友好度有限|配色方案需专业知识',
        recommendation: '适合设计师|前端开发者|UI设计师使用'
    },
    
    'id-card-parser': {
        title: '身份证解析 - 信息提取',
        description: '免费在线身份证号码解析工具，解析获取出生日期、性别、籍贯信息',
        keyword: '身份证解析身份证查询真伪身份证信息身份证校验',
        experience: '准确解析身份证编码信息，帮助验证身份证真伪合法性。',
        pros: '信息解读准确|地区码数据库|校验功能|隐私保护',
        cons: '新身份证验证需更新|无法验证真伪',
        recommendation: '适合人力资源|身份验证等场合使用'
    },
    
    'unit-converter': {
        title: '单位换算器 - 长度重量温度',
        description: '免费在线单位转换工具',
        keyword: '单位换算长度换重量换温度换面积换数据储换算',
        experience: '换算准确率高，满足日常生活、学习工作转换需求。',
        pros: '支持单位类全|实时转换|结果准确|界面清晰|使用简单|无需注册',
        cons: '专业单位需手动|支持有限|无历史记录功能',
        recommendation: '适合学生|工程师|日常转换需求使用'
    },
    
    'hash-calculator': {
        title: 'Hash计算器 - MD5 SHA',
        description: '免费在线Hash计算工具，计算MD5、SHA-1、SHA-256、SHA-512等哈希值',
        keyword: 'Hash计算,MD5计算,SHA-256哈希值文件校验,加密哈希',
        experience: '文件校验必备工具，支持文件上传和文本输入，计算速度快',
        pros: '支持主流算法|文件文本支持|批量处理|计算准确|本地安全',
        cons: '不支持解密|仅支持验证|大文件处理有限',
        recommendation: '适合开发者|IT管理员|用户验证文件完整性'
    },
    
    'regex-tester': {
        title: '正则表达式测试器 - Regex',
        description: '免费在线正则表达式测试工具，实时测试正则匹配，高亮显示结果',
        keyword: '正则表达式,正则测试,Regex正则匹配,正则工具匹配测试',
        experience: '程序员工具，支持实时预览、语法高亮、常用模板，提高正则编写效率。',
        pros: '实时匹配结果语法高亮显多语言支持库丰界面简洁',
        cons: '复杂正则学习成本性能优化需手',
        recommendation: '适程序开发、数据处理、文本搜索用户'
    },
    
    'number-base-converter': {
        title: '进制转换器 - 二八十六进制',
        description: '免费在线进制转换工具，支持二进制、八进制、十进制、十六进制互转',
        keyword: '进制转换,二进制,八进制,十进制,十六进制,数制转换',
        experience: '计算机和编程基础工具，转换精准，适合调试和学习。',
        pros: '支持进制转换结果准批量处理支持负号数',
        cons: '格式限制专业计算功有限',
        recommendation: '适程序员、电子工程学生计算机用户'
    },
    
    'crypto-tool': {
        title: 'AES加密解密 - 文本加密',
        description: '免费在线AES加密解密工具，支持文本加密、文件加密',
        keyword: 'AES加密,加密解密,对称加密,AES-256文本加密,文件加密',
        experience: '数据加密工具有效保敏感信息，加密安全性强，使用方便。',
        pros: '行业标准AES算法文文件支持强本安全本地处理',
        cons: '密钥管理需手无法解密密钥丢失无法恢复',
        recommendation: '适需保护敏感信息开发者和普通用户使用'
    },
    
'cron-parser': {
        title: 'Cron表达式解析器 - 定时任务',
        description: '免费在线Cron表达式解析工具，解析Linux定时任务表达式',
        keyword: 'Cron表达式,Cron解析,定时任务,Linux定时,计划任务表达式',
        experience: '运维必备工具，解析准确，支持中文说明，适合定时任务调试。',
        pros: '解析准确|详细执行时间|说明支持中文|界面友好',
        cons: '语法支持有限|复杂表达式需专业',
        recommendation: '适合系统管理员|运维工程师|开发者使用'
    },
    
    'stopwatch': {
        title: '秒表计时器 - 精确计时',
        description: '免费在线秒表计时器，精确到毫秒，支持计次功能',
        keyword: '秒表,计时器,在线秒表,精确计时,体育计时',
        experience: '计时精确，适合运动、学习、会议等场景，界面简洁易用。',
        pros: '毫秒级精度|计次功能|声音提醒|界面简洁',
        cons: '无数据历史|后台运行限制',
        recommendation: '适合运动训练|学习计时|会议管理使用'
    },
    
    'countdown-timer': {
        title: '倒计时器 - 时间提醒',
        description: '免费在线倒计时器，设置自定义时间，声音提醒',
        keyword: '倒计时器,在线倒计时,时间提醒,定时器,番茄钟',
        experience: '时间管理工具，适合工作学习专注，提醒准确，界面友好。',
        pros: '自定义时间|声音提醒|界面美观|专注模式',
        cons: '无多任务同步|历史记录有限',
        recommendation: '适合番茄工作法|运动训练|活动倒计时'
    },
    
    'world-clock': {
        title: '世界时钟 - 全球时区',
        description: '免费在线世界时钟，查看全球各时区当前时间',
        keyword: '世界时钟,时区转换,全球时间,国际时间,时区查询',
        experience: '商务和旅行必备工具，时区显示准确，支持多城市同步查看。',
        pros: '多时区同显|时间准确|城市丰富|夏令时自动',
        cons: '夏令时更新延迟|网络依赖|需手动',
        recommendation: '适合跨国企业|外贸人员|旅行者使用'
    },
    
    'number-generator': {
        title: '随机数生成器 - 批量生成',
        description: '免费在线随机数生成工具，生成指定范围的随机数字',
        keyword: '随机数生成器,伪随机数,批量随机,数字生成器,随机序列',
        experience: '科学研究和游戏测试工具，生成随机性强，批量生成效率高。',
        pros: '参数灵活|批量生成|随机性强|本地安全|分布均匀',
        cons: '非真随机|仅限数字|无历史记录',
        recommendation: '适合科研|游戏|抽奖|测试数据生成'
    },
    
    'encoding-converter': {
        title: '编码转换器 - UTF-8 GBK Big5',
        description: '免费在线文本编码转换工具，支持UTF-8、GBK、Big5等编码互转',
        keyword: '编码转换,UTF-8转换,GBK编码,Big5编码,字符编码转换',
        experience: '解决乱码问题工具，转换准确，支持多编码，适合编程和文档处理。',
        pros: '支持主流编码|乱码检测|批量转换|结果准确',
        cons: '罕见编码支持有限|编码丢失风险',
        recommendation: '适合程序员|网站开发者|文档处理使用'
    },
    
    // 文本类别
    'code-highlight': {
        title: '代码高亮显示 - 语法着色',
        description: '免费在线代码语法高亮工具，支持Python、Java、JavaScript等多种编程语言',
        keyword: '代码高亮,语法高亮,代码着色,代码美化,语法显示',
        experience: '代码展示必备工具，支持80+语言，语法准确，导出方便。',
        pros: '支持语言丰富语法准确多种主题导出格式',
        cons: '复杂语法有误大文件处理慢',
        recommendation: '适合程序员、技术博主、教育工作者'
    },
    
    'text-formatter': {
        title: '文本格式化 - 排版工具',
        description: '免费在线文本格式化工具，支持大小写转换、去除空格、字数统计',
        keyword: '文本格式化,文本美化,文本处理,大小写转换,文本排版',
        experience: '文本处理实用工具，界面简洁，处理快速，适合日常文本整理。',
        pros: '多功能处理实时预览批量操作结果准',
        cons: '高级功能有限复杂处理弱',
        recommendation: '适合编辑、学生、办公人员使用'
    },
    
    'text-diff': {
        title: '文本对比工具 - 差异检测',
        description: '免费在线文本差异对比工具，对比两段文本差异，高亮显示',
        keyword: '文本对比,文本差异,文本比较,文本diff,差异检测',
        experience: '版本对比工具，差异显示清晰，适合文档版本管理和代码审查。',
        pros: '差异显精准并排对比支持导入导出忽略空格',
        cons: '大文件处理慢复杂文本对比弱',
        recommendation: '适合程序员、编辑、文档管理者'
    },
    
    'text-transform': {
        title: '文本转换 - 命名风格转换',
        description: '免费在线文本转换工具，大小写转换、命名风格转换、驼峰下划线转换',
        keyword: '文本转换,大小写转换,驼峰转换,命名风格,文本转换器',
        experience: '编程常用工具，转换规则准确，支持多种命名风格，提高代码一致性。',
        pros: '命名风格丰富批量转换结果准编程友好',
        cons: '特殊规则需手自定义规则有限',
        recommendation: '适合程序员、数据库设计者使用'
    },
    
    'chinese-to-pinyin': {
        title: '中文转拼音 - 拼音查询',
        description: '免费在线中文转拼音工具，支持声调、多音字，首字母提取',
        keyword: '中文转拼音,拼音转换,声调转拼音首字母,拼音查询',
        experience: '中文学习辅助工具，转换准确，支持多音字，适合教育场景。',
        pros: '声调准确多音字识别首字母提取批量转换',
        cons: '生僻字支持有限方言差异需注意',
        recommendation: '适合中文学习者、教师、编辑使用'
    },
    
    'relationship-calculator': {
        title: '亲戚关系计算器 - 称呼查询',
        description: '免费在线亲戚关系计算器，计算亲戚称呼，查询家族关系',
        keyword: '亲戚关系,称呼计算,家族关系,亲戚称谓,关系查询',
        experience: '文化传承工具，关系计算准确，包含传统习俗，适合家庭聚会计算。',
        pros: '关系计算准传统习俗包含辈分清晰使用简单',
        cons: '地域差异需考虑复杂关系需确认',
        recommendation: '适合家庭聚会、文化活动、文化学习使用'
    },
    
    'ascii-art': {
        title: 'ASCII艺术字生成器',
        description: '免费在线ASCII艺术字生成工具，将文字转换为ASCII字符画',
        keyword: 'ASCII艺术字,字符画,ASCII生成器,文字艺术,ASCII代码',
        experience: '创意设计工具，效果丰富，适合个性化装饰和文本艺术创作。',
        pros: '多种字体样式自定义字符颜色实时预览',
        cons: '复杂效果难控制兼容性有局限',
        recommendation: '适合创意设计、个性定制、文本装饰'
    },
    
    'markdown-editor': {
        title: 'Markdown编辑器 - 实时预览',
        description: '免费在线Markdown编辑器，实时预览，支持导出HTML和PDF',
        keyword: 'Markdown编辑器,MD编辑,Markdown预览,Markdowndoc,Markdown转换',
        experience: '技术写作工具，语法支持完整，实时预览方便，导出功能实用。',
        pros: '实时预览语法高亮导多格式同步编辑工具',
        cons: '复杂表格编辑有限扩展语法支持弱',
        recommendation: '适合程序员、技术写作、文档编写'
    },
    
    // 网络类别
    'ip-subnet-calculator': {
        title: 'IP子网计算器 - 子网划分',
        description: '免费在线IP子网计算器，计算子网掩码、网络地址、可用IP范围',
        keyword: '子网计算器,IP子网计算,子网划分,网络计算,子网掩码计算',
        experience: '网络规划工具，计算准确，支持CIDR表示法，适合网络工程师。',
        pros: 'CIDR支持子网划分详细可用IP范围计算准',
        cons: '复杂网络结构需手VLAN支IPv6支持有限',
        recommendation: '适合网络工程师、IT管理员、系统规划'
    },
    
    'status-code-lookup': {
        title: 'HTTP状态码查询 - 状态含义',
        description: '免费在线HTTP状态码查询工具，查看状态码含义和解决方案',
        keyword: 'HTTP状态码,状态码查询,404错误,500错误,HTTP状态含义',
        experience: '调试网站必备工具，状态码说明清晰，解决方案实用，提高调试效率。',
        pros: '状态码全解决方案参考分类清晰描述详细',
        cons: '新状态需更新特定情况需专业',
        recommendation: '适合网站开发者、运维、调试'
    },
    
    'port-lookup': {
        title: '端口查询 - 端口用途',
        description: '免费在线端口查询工具，查看常用网络端口及其用途',
        keyword: '端口查询,网络端口,端口用途,端口扫描,常见端口',
        experience: '网络安全工具，端口信息全面，包含安全建议，适合网络管理。',
        pros: '端口信息全安全建议端口分类常用端口',
        cons: '端口变化需更新扫描功能有限',
        recommendation: '适合网络管理员、安全工程师、IT运维'
    },
    
    'url-parser': {
        title: 'URL解析器 - 链接分析',
        description: '免费在线URL解析工具，解析URL结构，提取协议、域名、参数',
        keyword: 'URL解析,链接解析,URL分解,URL分析,域名提取',
        experience: 'URL处理工具，解析准确，支持复杂URL，适合开发和调试。',
        pros: '解析准支持复杂URL参数提取编码转编码安',
        cons: '非常规URL有误编码限制',
        recommendation: '适合开发者、安全分析、URL处理'
    },
    
    'browser-fingerprint': {
        title: '浏览器指纹 - 环境检测',
        description: '免费在线浏览器指纹查看工具，检测浏览器和环境信息',
        keyword: '浏览器指纹,环境检测,浏览器信息,设备检测,指纹识别',
        experience: '隐私检测工具，信息全面，帮助了解浏览器被识别的程度。',
        pros: '信息全面隐私建议浏览器详环境检测',
        cons: '指纹可被追踪隐私保护有限',
        recommendation: '适合隐私关注者、安全研究者、技术测试'
    },
    
    'curl-generator': {
        title: 'Curl生成器 - HTTP命令',
        description: '免费在线Curl命令生成器，生成HTTP请求的curl命令',
        keyword: 'Curl生成器,HTTP命令,curl命令,API测试,命令行',
        experience: 'API测试工具，命令生成准确，支持多种HTTP方法，适合开发者。',
        pros: 'HTTP方法全参数支持头定制认证方式',
        cons: '复杂请求需手界面功有限',
        recommendation: '适合API开发者、测试工程师、系统集成'
    },
    
    // 开发类别
    'code-formatter': {
        title: '代码格式化工具 - 代码美化',
        description: '免费在线代码格式化工具，支持多种编程语言代码美化',
        keyword: '代码格式化,代码美化,代码规范,代码格式化工具',
        experience: '代码规范工具，支持主流语言，格式标准统一，提高代码可读性。',
        pros: '语言支持广格式标准一键格式化代码可读',
        cons: '自定义规则有限复杂代码需手动',
        recommendation: '适合程序员、代码审查、团队协作'
    },
    
    // 数据类别
    'xml-formatter': {
        title: 'XML格式化工具 - XML美化',
        description: '免费在线XML格式化工具，支持XML数据格式化、校验、压缩',
        keyword: 'XML格式化,XML美化,XML校验,XML压缩,数据格式化',
        experience: '数据处理工具，格式化准确，校验功能强，适合配置文件处理。',
        pros: '校验功能强格式标准支持大文件压缩缩进控制',
        cons: '复杂DTD支持有限实体处理弱',
        recommendation: '适合XML开发、数据处理、配置管理'
    },
    
    'math-formula': {
        title: '数学公式编辑器 - LaTeX公式',
        description: '免费在线LaTeX数学公式编辑器，实时预览公式效果',
        keyword: '数学公式编辑器,LaTeX公式,数学符号,公式预览,TeX编辑器',
        experience: '学术写作工具，语法支持完整，预览实时，适合论文和科研。',
        pros: '符号库完整实时预览导出多格式模板丰',
        cons: '学习成本高复杂公式编写慢',
        recommendation: '适合学术研究、教育工作者、论文写作'
    },
    
    'table-converter': {
        title: '表格格式转换器 - Markdown Excel',
        description: '免费在线表格格式转换工具，支持CSV、Excel、JSON、Markdown等格式互转',
        keyword: '表格转换,CSV转换,Excel转换,Markdown表格,数据转换',
        experience: '数据处理工具，转换准确，支持多种格式，适合数据整理。',
        pros: '多格式支持数据完整结构保持批量处理',
        cons: '复杂格式失真大文件处理弱',
        recommendation: '适合数据分析师、办公人员、数据处理'
    },
    
    'mind-map': {
        title: '思维导图 - 在线制作',
        description: '免费在线思维导图制作工具，支持多种布局样式，实时编辑',
        keyword: '思维导图,脑图,在线导图,思维导图制作,脑图制作',
        experience: '创意思考工具，制作简单，效果丰富，适合知识整理和灵感记录。',
        pros: '多种布局自定义样式实时协作导出多格式',
        cons: '复杂节点限制大文件处理功有限',
        recommendation: '适合学生、教师、创意团队知识管理'
    },
    
    'drawing': {
        title: '绘图画板 - 在线绘画',
        description: '免费在线绘图画板工具，支持画笔、形状、文字，实时创作',
        keyword: '在线绘画,画板工具,绘图软件,在线画笔,创作工具',
        experience: '创意绘画工具，功能丰富，操作简单，适合自由创作。',
        pros: '工具丰富颜色选择图层支持导出高',
        cons: '专业功能有限画笔精度依赖设备大文件保存困难',
        recommendation: '适合创意设计、教学演示、儿童绘画'
    },
    
    'json-escape': {
        title: 'JSON转义工具 - 字符处理',
        description: '免费在线JSON转义工具，处理JSON字符串转义和反转义',
        keyword: 'JSON转义,字符转义,JSON编码,JSON转义工具,字符串编码',
        experience: '数据编码工具，转义准确，适合JSON字符串处理和调试。',
        pros: '转义准批量处理实时预览代码安全本地处理',
        cons: '复杂结构需手编码知识要求',
        recommendation: '适合开发者、数据处理、JSON调试'
    },
    
    'random-data': {
        title: '随机数据生成器 - 测试数据',
        description: '免费在线随机数据生成工具，生成各种格式的测试数据',
        keyword: '随机数据生成,测试数据,Mock数据,数据生成器,模拟数据',
        experience: '测试数据生成工具，类型丰富，自定义灵活，适合测试和演示。',
        pros: '数据类型全量自定义多格式导出数据合理',
        cons: '相关性有限复杂规则需手',
        recommendation: '适合测试人员、开发者、演示制作'
    },
    
    'mock-data': {
        title: 'Mock数据生成器 - 模拟数据',
        description: '免费在线Mock数据生成工具，生成指定格式的模拟数据',
        keyword: 'Mock数据生成,模拟数据,数据模拟,测试数据,接口数据',
        experience: '接口开发工具，数据模拟真实，便于前后端分离开发。',
        pros: '模板丰富API规范自定义强结构化输出',
        cons: '复杂业务逻辑需手动真实数据差异',
        recommendation: '适合前后端开发、接口测试、系统演示'
    },
    
    // 媒体类别
    'video-aspect-converter': {
        title: '视频比例转换器 - 画面比例',
        description: '免费在线视频比例转换工具，调整视频比例适配不同平台',
        keyword: '视频比例转换,画面比例,视频尺寸,视频裁剪,视频适配',
        experience: '视频编辑工具，比例调整精准，支持主流平台，提升视频质量。',
        pros: '比例模板多自定义参数质量无损输出平适配',
        cons: '处理时间较长原文件需上传文件大小限',
        recommendation: '适合视频创作者、社交媒体运营、平台适配'
    },
    
    'pdf-to-ppt': {
        title: 'PDF转PPT - PDF幻灯片',
        description: '免费在线PDF转PPT工具，将PDF文件转换为可编辑的PowerPoint',
        keyword: 'PDF转PPT,PDF转幻灯片,PDF转PowerPoint,在线转PDF',
        experience: '文档转换工具，转换效果不错，保留布局和文本，方便编辑。',
        pros: '保留布局文本编辑性强质量可调无需安装',
        cons: '复杂格式有损转换时间较长图像质量影响',
        recommendation: '适合办公人员、学生、演示制作'
    },
    
    'pdf-to-image': {
        title: 'PDF转长图 - 图片转换',
        description: '免费在线PDF转长图工具，将PDF文档转换为图片格式',
        keyword: 'PDF转图片,PDF转JPG,PDF转PNG,PDF转长图,截图工具',
        experience: '文档转换工具，转换清晰，支持长图，适合分享和保存。',
        pros: '高质量输出保持原貌长图分享本地处理',
        cons: '文字识别有限大文件处理慢文件体积大',
        recommendation: '适合文档分享、电子书制作、资料归档'
    },
    
    // 图片类别扩展
    'image-editor': {
        title: '图片编辑器 - 在线修图',
        description: '免费在线图片编辑工具，支持裁剪、旋转、调整大小、滤镜效果',
        keyword: '图片编辑,在线PS,图片处理,照片编辑,在线修图',
        experience: '修图工具，基础功能齐全，操作简单，满足日常图片处理需求。',
        pros: '基础功能全实时预览支持多格式操作简单',
        cons: '高级功能有限大文件处理慢专业效果不足',
        recommendation: '适合日常修图、社交媒体、基础设计'
    },
    
    'image-comparison': {
        title: '多图拼接 - 对比展示',
        description: '免费在线多图拼接工具，自由拼接多张图片用于对比展示',
        keyword: '图片拼接,多图对比,图片合并,对比图,拼图制作',
        experience: '对比展示工具，拼接灵活，效果直观，适合产品对比和对比图制作。',
        pros: '自由拼接对齐工具间距可调输出高质量',
        cons: '数量有限复杂排版难大文件处理慢',
        recommendation: '适合产品对比、前后对比、教程制作'
    },
    
    'image-round-corner': {
        title: '图片圆角处理 - 圆角裁剪',
        description: '免费在线图片圆角处理工具，为图片添加圆角效果',
        keyword: '图片圆角,圆角制作,图片裁剪,圆角图片,头像圆角',
        experience: '头像制作工具，圆角效果自然，支持自定义角度，适合头像和UI设计。',
        pros: '角度可预览圆角自然支持批量处理图片质量',
        cons: '复杂形状不规图片需手边框不支',
        recommendation: '适合头像制作、UI设计、产品图处理'
    },
    
    'photo-collage': {
        title: '模板拼图 - 相册制作',
        description: '免费在线模板拼图工具，使用预设模板快速拼接多张图片',
        keyword: '模板拼图,相册制作,照片模板,拼图工具,照片美化',
        experience: '相册制作工具，模板丰富，排版精美，快速创建专业拼图。',
        pros: '模板精美专业效果自动排布滤镜丰富操作简单',
        cons: '自定义灵活性模板数量有限模板依赖',
        recommendation: '适合相册制作、分享美化、社交媒体'
    },
    
    'image-watermark-remover': {
        title: '图片去水印 - 水印移除',
        description: '免费在线AI智能去水印工具，自动识别并去除图片水印',
        keyword: '去水印,图片去水印,AI去水印,水印移除,图片修复',
        experience: 'AI修复工具，去水印效果好，保持原图质量，节省时间成本。',
        pros: 'AI智能识别保持原貌批量处理质量保护简单易用',
        cons: '复杂水印有损大面积水印影响处理时间长',
        recommendation: '适合照片修复、版权保护、二次创作'
    },
    
    'image-watermark': {
        title: '图片加水印 - 版权保护',
        description: '免费在线图片添加水印工具，支持文字和图片水印，版权保护',
        keyword: '图片加水印,水印制作,版权水印,Logo水印,图片保护',
        experience: '版权保护工具，水印自定义强，透明度可调，保护作品不被盗用。',
        pros: '水印自定义位置精度高多种字体Logo支持批处理',
        cons: '批量保存功能有限高级效果需手',
        recommendation: '适合版权保护、品牌推广、作品展示'
    },
    
    'image-bg-remover': {
        title: 'AI抠图 - 背景移除',
        description: '免费在线AI智能抠图工具，自动识别并移除图片背景',
        keyword: 'AI抠图,去背景,背景移除,证件照换底色,透明背景',
        experience: 'AI图像处理，抠图精准，自然边缘，特别适合证件照制作。',
        pros: 'AI自动识别抠图精准边缘自然证件照适配本地处理',
        cons: '复杂背景效果差人像细节影响处理时间长',
        recommendation: '适合证件照制作、电商产品图、创意设计'
    },
    
    'image-to-ico': {
        title: '图片转ICO - favicon制作',
        description: '免费在线图片转ICO图标工具，支持PNG、JPG转ICO',
        keyword: '图片转ICO,ICO制作,favicon图标,网站图标,ico转换器',
        experience: '网站开发工具，转换快速，支持多尺寸，生成标准ICO文件。',
        pros: '多尺寸支持快速转换标准格式压缩优化批量处理',
        cons: '透明背景处理复杂尺寸有限大图转换慢',
        recommendation: '适合网站开发者、UI设计、制作favicon'
    },
    
    'gif-maker': {
        title: 'GIF制作 - 动图合成',
        description: '免费在线GIF动图制作工具，多图合成GIF动画',
        keyword: 'GIF制作,动图制作,图片转GIF,GIF创建,合成GIF',
        experience: '动图创作工具，制作简单，效果平滑，适合表情包和简单动画。',
        pros: '制作简单帧频可调速平滑自然批量导入本地处理',
        cons: '分辨率有限复杂动画难大文件处理慢',
        recommendation: '适合表情包制作、简单动画、社交分享'
    },
    
    'gif-splitter': {
        title: 'GIF拆分 - 帧提取',
        description: '免费在线GIF拆分工具，将GIF动图拆分为帧序列图片',
        origin: 'GIF拆分,GIF分帧,GIF解析,动图分解',  
        keyword: 'GIF拆分,GIF分帧,GIF解析,动图分解,帧提取',
        experience: '动图解析工具，帧提取准确，单独保存，方便编辑和重制。',
        pros: '帧提取准确格式可选批量保存质量保持',
        cons: '动图大小影响帧数限制',
        recommendation: '适合动画编辑、素材提取、GIF修改'
    },
    
    'gif-compressor': {
        title: 'GIF压缩 - 体积优化',
        description: '免费在线GIF压缩工具，减小GIF文件大小，保持质量',
        keyword: 'GIF压缩,GIF优化,动图压缩,减小GIF体积,GIF瘦身',
        experience: '优化工具，压缩效率高，质量保持好，适合网络传输。',
        pros: '体积减小明显质量保持多种压缩级别批量处理',
        cons: '极端压缩质量下降帧数减少',
        recommendation: '适合网络优化、邮件发送、社交分享'
    },
    
    'word-cloud': {
        title: '词云生成器 - 文本可视化',
        description: '免费在线词云生成工具，根据文本内容生成可视化词云图',
        keyword: '词云生成,文字云,词云制作,文本可视化,云图',
        experience: '数据可视化工具，效果美观，自定义丰富，适合数据展示。',
        pros: '可视化效果强|自定义丰富|字体颜色多样|本地生成',
        cons: '布局控制有限|文本处理复杂|大文本处理慢',
        recommendation: '适合数据展示|报告分析|教育演示'
    },
    
    'grid-image-cutter': {
        title: '九宫格切图 - 网格裁剪',
        description: '免费在线九宫格切图工具，将图片均匀切割成多份',
        keyword: '九宫格切图,网格切图,图片裁剪,九分图,图片分割',
        experience: '社交媒体工具，切图精准，一键完成，适合朋友圈和社交媒体。',
        pros: '切图精准多种网格尺寸一键保存社交媒体优化',
        cons: '自定义网格有限大图处理慢',
        recommendation: '适合社交媒体、朋友圈、Instagram'
    },
    
    'photo-bg-changer': {
        title: '证件照换底色 - 背景替换',
        description: '免费在线证件照换底色工具，AI智能更换背景为白蓝红色',
        keyword: '证件照换底色,换背景,证件照制作,身份证照,背景替换',
        experience: '证件照工具，换色自然，符合规范，省去专业拍摄成本。',
        pros: '换色自然证件照规范一键完成成本低廉',
        cons: 'AI识别有限复杂背景效果差',
        recommendation: '适合证件照制作、简历照片、考试报名'
    },
    
    'image-to-prompt': {
        title: '图片转提示词 - AI描述生成',
        description: '免费在线AI图片分析工具，智能分析图片内容生成提示词',
        keyword: '图片转提示词,AI图片分析,图片描述,提示词生成,AI提示',
        experience: 'AI分析工具，描述准确，细节丰富，适合AI创作。',
        pros: 'AI智能分析描述详细多语言支持本地处理',
        cons: '复杂场景理解有限风格依赖模型',
        recommendation: '适合AI创作、图片检索、内容分析'
    },
    
    // AI类别扩展  
    'resume-generator': {
        title: '简历生成器 - 在线制作',
        description: '免费在线简历制作工具，多套精美模板，快速生成简历',
        keyword: '简历生成器,在线简历,简历制作,简历模板,免费简历',
        experience: '求职工具，模板专业，编辑简单，快速制作专业简历。',
        pros: '模板丰富|专业设计|编辑简单|多格式导出|一键生成',  
        cons: '自定义有限|模板依赖|高级功能付费',
        recommendation: '适合求职者|毕业生|职场人士'
    },
    
    'mbti-test': {
        title: 'MBTI人格测试 - 性格测试',
        description: '免费在线MBTI人格测试，专业性格测试问卷，分析性格类型',
        keyword: 'MBTI测试,人格测试,性格测试,MBTI分析,性格类型',
        experience: '心理测试工具，题目专业，结果详细，了解自己性格类型。',
        pros: '题目专业|分析详细|类型解读|结果准确|本地安全',
        cons: '仅供参考|专业咨询更准确|题数固化|定期更新',
        recommendation: '适合个人认知|团队建设|职业规划'  
    }
};

// 辅助函数：获取工具特定的SEO内容
const generateToolContent = (toolName, toolId, category) => {
    const config = toolSEOConfig[toolId];
    
    if (config) {
        return `
<section class="seo-section tool-experience">
    <div class="container">
        <h2>${toolName}使用心得</h2>
        <p>${config.experience}</p>
    </div>
</section>
<section class="seo-section tool-pros-cons">
    <div class="container">
        <h2>工具优缺点分析</h2>
        <div class="pros-cons-grid">
            <div class="pros">
                <h3>优点</h3>
                <ul>
                    ${(config.pos || config.pros || '').split('|').filter(i => i).map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            <div class="cons">
                <h3>局限性</h3>
                <ul>
                    ${(config.cons || '').split('|').filter(i => i).map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        </div>
    </div>
</section>
<section class="seo-section tool-recommendation">
    <div class="container">
        <h2>推荐理由</h2>
        <p>${config.recommendation}</p>
    </div>
</section>
        `;
    }
    
    // 如果没有特定配置，使用原有的生成函数
    const experiences = {
        translate: '这款在线翻译工具表现出色，特别是在处理技术文档和商务邮件时，能够准确传达专业术语和语境。界面简洁直观，复制翻译结果一键完成。最令人印象深刻的是它的上下文理解能力，在翻译长句或复杂语法结构时，能够保持原文的逻辑连贯性。',
        image: '在实际使用中，这款图片处理工具表现出色的专业性和可靠性。特别是在处理大批量图片时，能够保持稳定的性能，不会因为文件数量增加而降低处理速度。最令人满意的是它的质量控制功能，用户可以根据需要调整参数。',
        json: 'JSON格式化工具已经成为日常必备的专业工具。特别在调试API响应时，经常遇到压缩在一行的JSON数据，这个工具能够瞬间将其转化为易读的层级结构，大幅提高调试效率。最值得称赞的是它的错误检测功能，能够精确指出语法错误位置。',
        code: '开发者必备的代码工具，处理各种代码格式化、转换需求效率很高。界面直观，操作便捷，即使是不熟悉技术的用户也能快速上手。支持多种编程语言，输出结果准确可靠。',
        calculator: '计算结果精确可靠，界面设计简洁明了。无论是日常生活中的简单计算，还是专业领域的复杂运算，都能快速准确地完成。',
        pdf: 'PDF处理工具在文档转换方面表现出色，能够保持原始文档的格式和布局。对于经常需要处理PDF文件的用户来说，是一款非常实用的工具。',
        default: `在实际使用中，这款${toolName}工具表现出色，能够满足日常使用需求。界面设计简洁直观，功能实用便捷，是工作和生活中的得力助手。`
    };
    
    const pros = {
        translate: '<li>支持10+主流语言互译，覆盖全球主要语种</li><li>AI驱动翻译，准确率显著提升</li><li>界面简洁直观，操作便捷</li><li>本地处理，数据安全</li><li>支持长文本翻译</li><li>自动语言检测功能</li>',
        image: '<li>支持20+主流图像格式</li><li>批量处理功能强大</li><li>保持原始分辨率和质量</li><li>本地处理，图片不上传</li><li>支持自定义参数调整</li><li>处理速度快</li>',
        json: '<li>强大的语法检测功能</li><li>支持超大JSON文件处理</li><li>多级缩进和语法高亮</li><li>实时验证反馈</li><li>本地处理，数据不上传</li><li>支持折叠和展开</li>',
        code: '<li>支持多种编程语言</li><li>处理速度快，结果准确</li><li>界面简洁易用</li><li>无需安装，浏览器直接使用</li><li>支持批量处理</li><li>兼容性好</li>',
        calculator: '<li>计算结果精确可靠</li><li>界面简洁直观</li><li>支持多种计算类型</li><li>无需注册，完全免费</li><li>本地计算，数据安全</li><li>适合日常和专业使用</li>',
        pdf: '<li>支持多种PDF操作</li><li>转换质量高，保持原格式</li><li>处理速度快</li><li>界面友好易用</li><li>无需安装在线使用</li><li>支持批量处理</li>',
        ai: '<li>智能生成算法先进</li><li>支持多种AI任务处理</li><li>响应速度快，结果准确</li><li>无需本地硬件要求</li><li>用户界面友好直观</li><li>持续更新AI模型</li>',
        network: '<li>IP地址解析准确</li><li>支持多种网络协议</li><li>实时端口状态检测</li><li>URL解析功能完善</li><li>本地处理保证安全</li><li>适合网络开发调试</li>',
        default: '<li>功能实用，满足日常需求</li><li>操作简便易上手</li><li>处理速度快</li><li>完全免费，无需注册</li><li>数据本地处理，安全可靠</li><li>界面设计美观</li>'
    };
    
    const cons = {
        translate: '<li>在处理非常专业的术语时偶尔需要人工校正</li><li>对设备性能有一定要求</li><li>离线语言包需要预先下载</li><li>翻译结果有时会偏向字面直译</li><li>对于罕见语言支持有限</li><li>没有语音输入输出功能</li>',
        image: '<li>高级图像编辑功能有限</li><li>某些特殊格式支持深度有限</li><li>对设备内存有一定要求</li><li>批量处理时可能导致浏览器卡顿</li><li>不支持矢量图格式转换</li><li>复杂GIF处理能力有限</li>',
        json: '<li>仅支持JSON格式</li><li>对低配设备有压力</li><li>编辑功能有限</li><li>没有JSON Schema验证</li><li>对于极度不规范的JSON修复能力有限</li><li>不支持与其他格式转换</li>',
        code: '<li>高级功能相对有限</li><li>部分特殊格式可能不支持</li><li>需要网络连接</li><li>大文件处理可能较慢</li><li>无历史记录功能</li><li>无法与其他工具联动</li>',
        calculator: '<li>高级计算功能有限</li><li>无法保存计算历史</li><li>部分专业领域不支持</li><li>无法导出计算结果</li><li>离线功能有限</li><li>无团队协作功能</li>',
        pdf: '<li>对加密PDF支持有限</li><li>大型文件处理可能较慢</li><li>部分格式转换质量有限</li><li>需要网络连接</li><li>批量处理功能有限</li><li>无法编辑PDF内容</li>',
        ai: '<li>需要网络连接到AI服务</li><li>结果质量取决于输入提示</li><li>可能产生不准确信息</li><li>响应时间可能波动</li><li>使用成本可能产生</li><li>依赖外部AI服务可用性</li>',
        network: '<li>需要网络连接验证功能</li><li>部分信息可能不是最新</li><li>复杂网络拓扑分析有限</li><li>实时数据刷新可能延迟</li><li>无法检测网络质量</li><li>高级网络分析功能有限</li>',
        default: '<li>高级功能相对基础</li><li>部分场景可能不适用</li><li>功能还有提升空间</li><li>可考虑增加更多选项</li><li>后续可增加更多工具类型</li><li>期待更多功能更新</li>'
    };
    
    const recommendations = {
        translate: '特别适合需要频繁处理多语言内容的专业人士，如外贸人员、翻译工作者和留学生。它的高准确度和安全特性使其成为商务沟通和学术研究的理想选择。',
        image: '特别适合需要频繁处理不同格式图片的设计师和内容创作者。它的批量处理功能和质量控制能力使其成为专业工作的理想选择。',
        json: '特别适合前端和后端开发者，尤其是在API开发、数据分析和系统集成工作中。它的强大错误检测能力和大数据处理性能使其成为专业开发的理想选择。',
        code: '适合各类开发者和需要处理代码相关任务的用户。它的多功能性和便捷性使其成为日常开发和学习的理想工具。',
        calculator: '适合需要进行各类计算的用户，无论是日常生活计算还是专业领域计算，都能提供准确可靠的结果。',
        pdf: '特别适合需要频繁处理PDF文件的办公人员和学生。它的转换功能和便捷性使其成为文档处理的理想选择。',
        ai: '特别适合需要AI辅助工作的用户，如内容创作者、数据分析师、研究人员等。它的智能化特性和多功能性使其成为提升工作效率的有力助手。',
        network: '特别适合网络工程师、IT管理员和需要网络诊断的用户。它的准确诊断和实用功能使其成为网络故障排查的必备工具。',
        default: `特别适合需要${toolName}功能的用户。它的实用性和便捷性使其成为工作和生活中的得力助手。`
    };
    
    const categoryKey = category === 'translate' ? 'translate' : 
                      category === 'image' ? 'image' :
                      category === 'json' ? 'json' :
                      category === 'data' || category === 'dev' ? 'code' :
                      category === 'calculator' ? 'calculator' :
                      category === 'media' ? 'pdf' :
                      category === 'ai' ? 'ai' :
                      category === 'network' ? 'network' : 'default';
    
    const experience = experiences[categoryKey] || experiences['default'];
    const prosList = pros[categoryKey] || pros['default'];
    const consList = cons[categoryKey] || cons['default'];
    const recommendation = recommendations[categoryKey] || recommendations['default'];
    
    return `
<section class="seo-section tool-experience">
  <div class="container">
    <h2>${toolName}使用心得</h2>
    <p>${typeof experience === 'function' ? experience(toolName) : experience}</p>
  </div>
</section>
<section class="seo-section tool-pros-cons">
  <div class="container">
    <h2>工具优缺点分析</h2>
    <div class="pros-cons-grid">
      <div class="pros">
        <h3>优点</h3>
        <ul>
          ${prosList}
        </ul>
      </div>
      <div class="cons">
        <h3>局限性</h3>
        <ul>
          ${consList}
        </ul>
      </div>
    </div>
  </div>
</section>
<section class="seo-section tool-recommendation">
  <div class="container">
    <h2>推荐理由</h2>
    <p>${recommendation}</p>
  </div>
</section>
    `;
};

// 首页静态HTML内容（确保EdgeOne爬虫能够获取）
const staticHomepageHTML = `
<section class="seo-section homepage-intro">
  <div class="container">
    <h1>AI工具导航知识门户</h1>
    <p>什么是AI工具</p>
    <p>AI工具是什么：AI（人工智能）工具是利用机器学习、深度学习、自然语言处理等技术开发的智能应用程序，能够模拟人类的认知能力，实现数据分析、内容创作、图像处理、语音识别等复杂任务。这些工具通过学习大量数据，不断提升自身的准确性和效率，为各行业带来革命性变化。</p>
    <p>AI工具分类逻辑：按照功能和应用场景，常见AI工具可分为文本处理类（写作助手、翻译工具、文本摘要）、图像处理类（图像生成、编辑、识别）、数据分析类（数据可视化、预测分析）、智能交互类（聊天机器人、语音助手）等。了解这些分类有助于根据具体需求选择合适的AI工具，提高工作效率。</p>
    <p>适用人群：AI工具适用于广泛人群。内容创作者可利用写作助手提高创作效率；设计师可通过图像生成工具快速获取创意灵感；数据分析师能借助自动化分析工具节省时间；学生和研究人员可使用AI辅助学习和研究；企业决策者可通过AI洞察数据做出更明智决策。</p>
    <p>使用价值：AI工具的核心价值在于提升效率、降低成本、增强创造力和辅助决策。它们能够自动化重复性任务，让人类专注于更有价值的工作；通过深度分析提供数据支持；提供个性化体验，满足多样化需求；帮助用户突破技能限制，实现原本难以完成的任务。</p>
  </div>
</section>
<section class="seo-section homepage-scenarios">
  <div class="container">
    <h2>AI工具应用场景</h2>
    <div class="scenarios-grid">
      <div class="scenario">
        <h3>内容创作</h3>
        <p>AI写作助手可生成博客、社交媒体内容，提高创作效率，优化语言表达，解决创作瓶颈问题。</p>
      </div>
      <div class="scenario">
        <h3>编程开发</h3>
        <p>AI代码助手可自动生成代码片段，调试程序，优化代码结构，加速开发流程，提高编程效率。</p>
      </div>
      <div class="scenario">
        <h3>办公自动化</h3>
        <p>AI工具能自动化文档处理、邮件分类、数据分析，简化日常办公流程，提高工作效率。</p>
      </div>
      <div class="scenario">
        <h3>设计</h3>
        <p>AI设计工具可生成图像、优化排版，提供设计灵感，简化专业设计流程，降低设计门槛。</p>
      </div>
      <div class="scenario">
        <h3>营销</h3>
        <p>AI营销工具分析用户行为，优化广告投放，自动生成营销内容，提高转化率和营销效果。</p>
      </div>
      <div class="scenario">
        <h3>教育培训</h3>
        <p>AI教育工具提供个性化学习体验，智能评估学习进度，推荐学习内容，提升学习效果。</p>
      </div>
    </div>
  </div>
</section>
<section class="seo-section homepage-guide">
  <div class="container">
    <h2>AI工具选择指南</h2>
    <p>如何选择适合自己的AI工具：首先明确自己的需求和目标，了解工具的核心功能和适用场景。考虑工具的易用性和学习曲线，评估是否有足够的文档和支持。注意数据隐私和安全政策，确保符合个人或企业的安全标准。建议先使用免费版或试用版，验证工具效果后再做长期投入决策。</p>
    <div class="guide-columns">
      <div class="guide-column">
        <h3>免费 vs 付费</h3>
        <p>免费工具通常提供基本功能，适合轻度使用者和初次体验。付费工具往往功能更全面，性能更稳定，提供高级功能和优先支持，适合专业用户和企业场景。根据使用频率和需求深度来平衡成本效益。</p>
      </div>
      <div class="guide-column">
        <h3>国内 vs 国外</h3>
        <p>国内工具更符合中文语言习惯和本地化需求，访问速度快，符合国内数据合规要求。国外工具通常技术更先进，功能更丰富，但可能存在网络延迟和数据合规问题，需要根据实际情况权衡选择。</p>
      </div>
    </div>
    <p>新手推荐策略：刚开始使用AI工具的用户建议从界面友好、功能直观的工具入手。先专注于解决具体问题，不要尝试一次性掌握多种工具。充分利用教程模板和社区资源，逐步提升技能。从免费工具开始实践，熟悉基本功能和原理后，再根据需求升级到更专业的工具。</p>
  </div>
</section>
`;

// 工具页面增强内容 - 确保所有工具都有SEO内容
const staticToolContent = {
    'translate': generateToolContent('在线翻译工具 - AI多语言互译', 'translate', 'translate'),
    'image-converter': generateToolContent('图片格式转换器 - 批量处理工具', 'image-converter', 'image'),
    'json-formatter': generateToolContent('JSON格式化工具 - 校验美化', 'json-formatter', 'json'),
    'mortgage-calculator': generateToolContent('房贷计算器 - 月供利息计算', 'mortgage-calculator', 'calculator'),
    'pension-calculator': generateToolContent('养老金计算器 - 退休金测算', 'pension-calculator', 'calculator'),
    'tax-calculator': generateToolContent('个税计算器 - 个人所得税', 'tax-calculator', 'calculator'),
    'vram-calculator': generateToolContent('显存计算器 - GPU VRAM需求', 'vram-calculator', 'calculator'),
    'bmi-calculator': generateToolContent('BMI计算器 - 体重指数评估', 'bmi-calculator', 'calculator'),
    'date-calculator': generateToolContent('日期计算器 - 天数计算', 'date-calculator', 'calculator'),
    'percentage-calculator': generateToolContent('百分比计算器 - 百分比换算', 'percentage-calculator', 'calculator'),
    'scientific-calculator': generateToolContent('科学计算器 - 函数计算', 'scientific-calculator', 'calculator'),
    'loan-calculator': generateToolContent('贷款计算器 - 贷款还款计算', 'loan-calculator', 'calculator'),
    'age-calculator': generateToolContent('年龄计算器 - 精确日期计算', 'age-calculator', 'calculator'),
    'qrcode-generator': generateToolContent('二维码生成器 - 自定义QR码', 'qrcode-generator', 'utility'),
    'chinese-converter': generateToolContent('简繁体转换 - 繁简互转', 'chinese-converter', 'utility'),
    'timestamp-converter': generateToolContent('时间戳转换 - Unix时间', 'timestamp-converter', 'utility'),
    'base64-tool': generateToolContent('Base64编解码 - 在线转换', 'base64-tool', 'utility'),
    'password-generator': generateToolContent('密码生成器 - 强密码生成', 'password-generator', 'utility'),
    'uuid-generator': generateToolContent('UUID生成器 - 全球唯一ID', 'uuid-generator', 'utility'),
    'color-picker': generateToolContent('颜色转换器 - HSL RGB HEX', 'color-picker', 'utility'),
    'id-card-parser': generateToolContent('身份证解析 - 信息提取', 'id-card-parser', 'utility'),
    'unit-converter': generateToolContent('单位换算器 - 长度重量温度', 'unit-converter', 'utility'),
    'hash-calculator': generateToolContent('Hash计算器 - MD5 SHA', 'hash-calculator', 'utility'),
    'regex-tester': generateToolContent('正则表达式测试器 - Regex', 'regex-tester', 'utility'),
    'number-base-converter': generateToolContent('进制转换器 - 二八十六进制', 'number-base-converter', 'utility'),
    'crypto-tool': generateToolContent('AES加密解密 - 文本加密', 'crypto-tool', 'utility'),
    'cron-parser': generateToolContent('Cron表达式解析器 - 定时任务', 'cron-parser', 'utility'),
    'stopwatch': generateToolContent('秒表计时器 - 精确计时', 'stopwatch', 'utility'),
    'countdown-timer': generateToolContent('倒计时器 - 时间提醒', 'countdown-timer', 'utility'),
    'world-clock': generateToolContent('世界时钟 - 全球时区', 'world-clock', 'utility'),
    'number-generator': generateToolContent('随机数生成器 - 批量生成', 'number-generator', 'utility'),
    'encoding-converter': generateToolContent('编码转换器 - UTF-8 GBK Big5', 'encoding-converter', 'utility'),
    'code-highlight': generateToolContent('代码高亮显示 - 语法着色', 'code-highlight', 'text'),
    'text-formatter': generateToolContent('文本格式化 - 排版工具', 'text-formatter', 'text'),
    'text-diff': generateToolContent('文本对比工具 - 差异检测', 'text-diff', 'text'),
    'text-statistics': generateToolContent('文字统计工具 - 字数词数分析', 'text-statistics', 'text'),
    'text-transform': generateToolContent('文本转换 - 命名风格转换', 'text-transform', 'text'),
    'chinese-to-pinyin': generateToolContent('中文转拼音 - 拼音查询', 'chinese-to-pinyin', 'text'),
    'relationship-calculator': generateToolContent('亲戚关系计算器 - 称呼查询', 'relationship-calculator', 'calculator'),
    'ascii-art': generateToolContent('ASCII艺术字生成器', 'ascii-art', 'text'),
    'markdown-editor': generateToolContent('Markdown编辑器 - 实时预览', 'markdown-editor', 'text'),
    'image-editor': generateToolContent('图片编辑器 - 在线修图', 'image-editor', 'image'),
    'image-comparison': generateToolContent('多图拼接 - 对比展示', 'image-comparison', 'image'),
    'image-round-corner': generateToolContent('图片圆角处理 - 圆角裁剪', 'image-round-corner', 'image'),
    'photo-collage': generateToolContent('模板拼图 - 相册制作', 'photo-collage', 'image'),
    'image-compressor': generateToolContent('图片压缩 - 体积优化', 'image-compressor', 'image'),
    'image-watermark-remover': generateToolContent('图片去水印 - 水印移除', 'image-watermark-remover', 'image'),
    'image-watermark': generateToolContent('图片加水印 - 版权保护', 'image-watermark', 'image'),
    'image-bg-remover': generateToolContent('AI抠图 - 背景移除', 'image-bg-remover', 'image'),
    'image-to-ico': generateToolContent('图片转ICO - favicon制作', 'image-to-ico', 'image'),
    'gif-maker': generateToolContent('GIF制作 - 动图合成', 'gif-maker', 'image'),
    'gif-splitter': generateToolContent('GIF拆分 - 帧提取', 'gif-splitter', 'image'),
    'gif-compressor': generateToolContent('GIF压缩 - 体积优化', 'gif-compressor', 'image'),
    'word-cloud': generateToolContent('词云生成器 - 文本可视化', 'word-cloud', 'data'),
    'grid-image-cutter': generateToolContent('九宫格切图 - 网格裁剪', 'grid-image-cutter', 'image'),
    'photo-bg-changer': generateToolContent('证件照换底色 - 背景替换', 'photo-bg-changer', 'image'),
    'table-converter': generateToolContent('表格格式转换器 - Markdown Excel', 'table-converter', 'data'),
    'math-formula': generateToolContent('数学公式编辑器 - LaTeX公式', 'math-formula', 'data'),
    'mind-map': generateToolContent('思维导图 - 在线制作', 'mind-map', 'data'),
    'drawing': generateToolContent('绘图画板 - 在线绘画', 'drawing', 'data'),
    'video-aspect-converter': generateToolContent('视频比例转换器 - 画面比例', 'video-aspect-converter', 'media'),
    'pdf-to-ppt': generateToolContent('PDF转PPT - PDF幻灯片', 'pdf-to-ppt', 'media'),
    'pdf-to-image': generateToolContent('PDF转长图 - 图片转换', 'pdf-to-image', 'media'),
    'image-to-prompt': generateToolContent('图片转提示词 - AI描述', 'image-to-prompt', 'ai'),
    'resume-generator': generateToolContent('简历生成器 - 在线制作', 'resume-generator', 'ai'),
    'prompt-generator': generateToolContent('AI提示词生成器 - 优化prompt', 'prompt-generator', 'ai'),
    'mbti-test': generateToolContent('MBTI人格测试 - 性格测试', 'mbti-test', 'ai'),
    'ip-converter': generateToolContent('IP地址转换 - 进制转换', 'ip-converter', 'network'),
    'ip-subnet-calculator': generateToolContent('IP子网计算器 - 子网划分', 'ip-subnet-calculator', 'network'),
    'status-code-lookup': generateToolContent('HTTP状态码查询 - 状态含义', 'status-code-lookup', 'network'),
    'port-lookup': generateToolContent('端口查询 - 端口用途', 'port-lookup', 'network'),
    'url-parser': generateToolContent('URL解析器 - 链接分析', 'url-parser', 'network'),
    'browser-fingerprint': generateToolContent('浏览器指纹 - 环境检测', 'browser-fingerprint', 'network'),
    'curl-generator': generateToolContent('Curl生成器 - HTTP命令', 'curl-generator', 'network'),
    'code-formatter': generateToolContent('代码格式化工具 - 代码美化', 'code-formatter', 'dev'),
    'linux-command': generateToolContent('Linux命令字典 - 命令查询', 'linux-command', 'dev'),
    'xml-formatter': generateToolContent('XML格式化工具 - XML美化', 'xml-formatter', 'data'),
    'math-formula': generateToolContent('math-formula-editor - LaTeX公式', 'math-formula', 'data'),
    'mind-map': generateToolContent('思维导图 - 在线制作', 'mind-map', 'data'),
    'drawing': generateToolContent('绘图画布 - 在线绘画', 'drawing', 'data'),
    'json-escape': generateToolContent('JSON转义工具 - 字符处理', 'json-escape', 'dev'),
    'random-data': generateToolContent('随机数据生成器 - 测试数据', 'random-data', 'dev'),
    'mock-data': generateToolContent('Mock数据生成器 - 模拟数据', 'mock-data', 'dev')
};

// 确保所有80个工具都有内容，没有的添加默认内容
const ALL_TOOLS = [
    { id: 'translate', name: '在线翻译', path: '/translate' },
    { id: 'image-converter', name: '图片格式转换', path: '/image-converter' },
    { id: 'image-editor', name: '图片快速编辑', path: '/image-editor' },
    { id: 'image-comparison', name: '多图自由拼接', path: '/image-comparison' },
    { id: 'image-round-corner', name: '图片圆角处理', path: '/image-round-corner' },
    { id: 'photo-collage', name: '模板快速拼接', path: '/photo-collage' },
    { id: 'code-highlight', name: '代码高亮', path: '/code-highlight' },
    { id: 'text-formatter', name: '文本格式化', path: '/text-formatter' },
    { id: 'json-formatter', name: 'JSON格式化', path: '/json-formatter' },
    { id: 'xml-formatter', name: 'XML格式化', path: '/xml-formatter' },
    { id: 'math-formula', name: 'math-formatter', path: '/math-formula' },
    { id: 'table-converter', name: 'table-converter', path: '/table-converter' },
    { id: 'video-aspect-converter', name: 'video-aspect-converter', path: '/video-aspect-converter' },
    { id: 'text-diff', name: '文本差异对比', path: '/text-diff' },
    { id: 'pdf-to-ppt', name: 'PDF转PPT', path: '/pdf-to-ppt' },
    { id: 'pdf-to-image', name: 'PDF转长图', path: '/pdf-to-image' },
    { id: 'resume-generator', name: '简历生成器', path: '/resume-generator' },
    { id: 'prompt-generator', name: '提示词生成器', path: '/prompt-generator' },
    { id: 'mbti-test', name: 'MBTI人格测试', path: '/mbti-test' },
    { id: 'image-to-prompt', name: '图片转提示词', path: '/image-to-prompt' },
    { id: 'image-watermark-remover', name: '图片水印去除', path: '/image-watermark-creator' },
    { id: 'mind-map', name: '思维导图', path: '/mind-map' },
    { id: 'drawing', name: '绘图画布', path: '/drawing' },
    { id: 'vram-calculator-tool', name: 'vram-calculator', path: '/vram-calculator' },
    { id: 'mortgage-calculator', name: 'mortgage-calculator', path: '/mortgage-calculator' },
    { id: 'pension-calculator', name: 'pension-calculator', path: '/pension-calculator' },
    { id: 'tax-calculator', name: 'tax-calculator', path: '/tax-calculator' },
    { id: 'qrcode-generator', name: 'qr-code-generator', path: '/qrcode-generator' },
    { id: 'chinese-converter', name: 'chinese-converter', path: '/chinese-converter' },
    { id: 'timestamp-converter', name: 'timestamp-converter', path: '/timestamp-converter' },
    { id: 'base64-converter', name: 'base64-encoder', path: '/base64-tool' },
    { id: 'password-generator', name: 'password-generator', path: '/password-generator' },
    { id: 'uuid-generator', name: 'uuid-generator', path: '/uuid-generator' },
    { id: 'color-picker', name: 'color-picker', path: '/color-picker' },
    { id: 'id-card-parser', name: 'id-card-parser', path: '/id-card-parser' },
    { id: 'unit-converter', name: 'unit-converter', path: '/unit-converter' },
    { id: 'hash-calculator', name: 'hash-calculator', path: '/hash-calculator' },
    { id: 'regex-tester', name: 'regex-test', path: '/regex-tester' },
    { id: 'number-base', name: 'number-base-convert', path: '/number-base-converter' },
    { id: 'crypto-tool', name: 'crypto-encryption', path: '/crypto-tool' },
    { id: 'cron-parser', name: 'cron-parser', path: '/cron-parser' },
    { id: 'bmi-calculator', name: 'bmi-calculator', path: '/bmi-calculator' },
    { id: 'date-calculator', name: 'date-calculator', path: '/date-calculator' },
    { id: 'stopwatch', name: 'stopwatch', path: '/stopwatch' },
    { id: 'countdown-timer', name: 'countdown-timer', path: '/countdown-timer' },
    { id: 'text-statistics', name: 'text-statistics', path: '/text-statistics' },
    { id: 'text-transform', name: 'text-transform', path: '/text-transform' },
    { id: 'loan-calculator', name: 'loan-calculator', path: '/loan-calculator' },
    { id: 'world-clock', name: 'world-clock', path: '/world-clock' },
    { id: 'percentage-calculator', name: 'percentage-calculator', path: '/percentage-calculator' },
    { id: 'scientific-calculator', name: 'scientific-calculator', path: '/scientific-calculator' },
    { id: 'ip-converter', name: 'ip-converter', path: '/ip-converter' },
    { id: 'ip-subnet-calculator', name: 'ip-subnet-calculator', path: '/ip-subnet-calculator' },
    { id: 'image-compressor', name: 'image-compressor', path: '/image-compressor' },
    { id: 'age-calculator', name: 'age-calculator', path: '/age-calculator' },
    { id: 'encoding-converter', name: 'encoding-converter', path: '/encoding-converter' },
    { id: 'number-generator', name: 'random-number-generator', path: '/number-generator' },
    { id: 'status-code', name: 'status-code-lookup', path: '/status-code-lookup' },
    { id: 'port-lookup', name: 'port-lookup', path: '/port-lookup' },
    { id: 'url-parser', name: 'url-parser', path: '/url-parser' },
    { id: 'browser-fingerprint', name: 'browser-fingerprint', path: '/browser-fingerprint' },
    { id: 'curl-generator', name: 'curl-generator', path: '/curl-generator' },
    { id: 'image-watermark', name: 'image-watermark', path: '/image-watermark' },
    { id: 'image-bg-remover', name: 'image-bg-remover', path: '/image-bg-remover' },
    { id: 'image-to-ico', name: 'image-to-ico', path: '/image-to-ico' },
    { id: 'gif-maker', name: 'gif-maker', path: '/gif-maker' },
    { id: 'gif-splitter', name: 'gif-splitter', path: '/gif-splitter' },
    { id: 'gif-compressor', name: 'gif-compressor', path: '/gif-compressor' },
    { id: 'word-cloud', name: 'word-cloud-generator', path: '/word-cloud' },
    { id: 'grid-image-cutter', name: 'grid-image-cutter', path: '/grid-image-cutter' },
    { id: 'photo-bg-changer', name: 'photo-bg-changer', path: '/photo-bg-changer' },
    { id: 'markdown-editor', name: 'markdown-editor', path: '/markdown-editor' },
    { id: 'code-formatter', name: 'code-formatter', path: '/code-formatter' },
    { id: 'json-escape', name: 'json-escape', path: '/json-escape' },
    { id: 'random-data', name: 'random-data', path: '/random-data' },
    { id: 'mock-data', name: 'mock-data', path: '/mock-data' },
    { id: 'linux-command', name: 'linux-command', path: '/linux-command' },
    { id: 'chinese-to-pinyin', name: 'chinese-to-pinyin', path: '/chinese-to-pinyin' },
    { id: 'relationship-calculator', name: 'relationship-calculator', path: '/relationship-calculator' },
    { id: 'ascii-art', name: 'ascii-art', path: '/ascii-art' }
];

// 确保所有工具都有内容
ALL_TOOLS.forEach(tool => {
    if (!staticToolContent[tool.id]) {
        staticToolContent[tool.id] = generateToolContent(tool.name, tool.id, 'default');
    }
});

export { staticHomepageHTML, staticToolContent };
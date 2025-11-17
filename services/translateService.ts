// 使用 Google Translate API (通过公共代理)
// 注意:这是使用非官方API,生产环境建议使用官方 Google Cloud Translation API

interface TranslateResult {
    translatedText: string;
    detectedLang: string;
}

// 语言代码映射
const LANG_MAP: Record<string, string> = {
    'zh-CN': '中文',
    'zh-TW': '繁体中文',
    'en': '英语',
    'ja': '日语',
    'ko': '韩语',
    'fr': '法语',
    'de': '德语',
    'es': '西班牙语',
    'ru': '俄语',
    'ar': '阿拉伯语',
    'pt': '葡萄牙语',
    'it': '意大利语',
};

// 检测语言是否为中文
function isChinese(text: string): boolean {
    const chineseRegex = /[\u4e00-\u9fa5]/;
    return chineseRegex.test(text);
}

// 使用 MyMemory Translation API (免费,无需API密钥)
async function translateWithMyMemory(text: string, sourceLang: string, targetLang: string): Promise<string> {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.responseStatus === 200 && data.responseData) {
            return data.responseData.translatedText;
        }
        throw new Error('Translation failed');
    } catch (error) {
        console.error('MyMemory translation error:', error);
        throw error;
    }
}

// 使用 LibreTranslate API (开源免费翻译API)
async function translateWithLibre(text: string, sourceLang: string, targetLang: string): Promise<string> {
    const url = 'https://libretranslate.de/translate';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                q: text,
                source: sourceLang === 'auto' ? 'auto' : sourceLang,
                target: targetLang,
                format: 'text'
            })
        });

        const data = await response.json();

        if (data.translatedText) {
            return data.translatedText;
        }
        throw new Error('Translation failed');
    } catch (error) {
        console.error('LibreTranslate error:', error);
        throw error;
    }
}

export async function translateText(text: string): Promise<TranslateResult> {
    if (!text.trim()) {
        throw new Error('请输入需要翻译的文本');
    }

    // 自动检测语言并决定目标语言
    const containsChinese = isChinese(text);
    const sourceLang = 'auto';
    const targetLang = containsChinese ? 'en' : 'zh';

    let detectedLangCode = containsChinese ? 'zh-CN' : 'en';
    let translatedText = '';

    try {
        // 优先尝试 LibreTranslate (更稳定)
        translatedText = await translateWithLibre(text, sourceLang, targetLang);

        // 如果翻译失败或结果为空,尝试备用方案
        if (!translatedText || translatedText === text) {
            translatedText = await translateWithMyMemory(text, sourceLang, targetLang);
        }
    } catch (error) {
        console.error('Primary translation failed, trying fallback:', error);

        try {
            // 降级到 MyMemory
            translatedText = await translateWithMyMemory(text, sourceLang, targetLang);
        } catch (fallbackError) {
            console.error('All translation methods failed:', fallbackError);
            throw new Error('翻译服务暂时不可用,请稍后重试');
        }
    }

    return {
        translatedText,
        detectedLang: LANG_MAP[detectedLangCode] || detectedLangCode
    };
}

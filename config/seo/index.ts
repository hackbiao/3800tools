import type { SEOPageContent } from '@/types/seo';

import translateSEO from './translate';
import imageConverterSEO from './image-converter';
import imageEditorSEO from './image-editor';
import imageComparisonSEO from './image-comparison';
import imageRoundCornerSEO from './image-round-corner';
import photoCollageSEO from './photo-collage';
import codeHighlightSEO from './code-highlight';
import textFormatterSEO from './text-formatter';
import jsonFormatterSEO from './json-formatter';
import xmlFormatterSEO from './xml-formatter';
import mathFormulaSEO from './math-formula';
import tableConverterSEO from './table-converter';
import videoAspectConverterSEO from './video-aspect-converter';
import textDiffSEO from './text-diff';
import pdfToPptSEO from './pdf-to-ppt';
import pdfToImageSEO from './pdf-to-image';
import resumeGeneratorSEO from './resume-generator';
import promptGeneratorSEO from './prompt-generator';
import mbtiTestSEO from './mbti-test';
import imageToPromptSEO from './image-to-prompt';
import imageWatermarkRemoverSEO from './image-watermark-remover';
import mindMapSEO from './mind-map';
import drawingSEO from './drawing';
import vramCalculatorSEO from './vram-calculator';
import mortgageCalculatorSEO from './mortgage-calculator';
import pensionCalculatorSEO from './pension-calculator';
import taxCalculatorSEO from './tax-calculator';
import qrcodeGeneratorSEO from './qrcode-generator';
import chineseConverterSEO from './chinese-converter';
import timestampConverterSEO from './timestamp-converter';
import base64ToolSEO from './base64-tool';
import passwordGeneratorSEO from './password-generator';
import uuidGeneratorSEO from './uuid-generator';
import colorPickerSEO from './color-picker';
import idCardParserSEO from './id-card-parser';
import unitConverterSEO from './unit-converter';
import hashCalculatorSEO from './hash-calculator';
import regexTesterSEO from './regex-tester';
import numberBaseConverterSEO from './number-base-converter';
import cryptoToolSEO from './crypto-tool';
import cronParserSEO from './cron-parser';
import bmiCalculatorSEO from './bmi-calculator';
import dateCalculatorSEO from './date-calculator';
import stopwatchSEO from './stopwatch';
import countdownTimerSEO from './countdown-timer';
import textStatisticsSEO from './text-statistics';
import textTransformSEO from './text-transform';
import loanCalculatorSEO from './loan-calculator';
import worldClockSEO from './world-clock';
import percentageCalculatorSEO from './percentage-calculator';
import scientificCalculatorSEO from './scientific-calculator';
import ipConverterSEO from './ip-converter';
import ipSubnetCalculatorSEO from './ip-subnet-calculator';
import imageCompressorSEO from './image-compressor';
import ageCalculatorSEO from './age-calculator';
import encodingConverterSEO from './encoding-converter';
import numberGeneratorSEO from './number-generator';
import statusCodeLookupSEO from './status-code-lookup';
import portLookupSEO from './port-lookup';
import urlParserSEO from './url-parser';
import browserFingerprintSEO from './browser-fingerprint';
import curlGeneratorSEO from './curl-generator';
import imageWatermarkSEO from './image-watermark';
import imageBgRemoverSEO from './image-bg-remover';
import imageToIcoSEO from './image-to-ico';
import gifMakerSEO from './gif-maker';
import gifSplitterSEO from './gif-splitter';
import gifCompressorSEO from './gif-compressor';
import wordCloudSEO from './word-cloud';
import gridImageCutterSEO from './grid-image-cutter';
import photoBgChangerSEO from './photo-bg-changer';
import markdownEditorSEO from './markdown-editor';
import codeFormatterSEO from './code-formatter';
import jsonEscapeSEO from './json-escape';
import randomDataSEO from './random-data';
import mockDataSEO from './mock-data';
import linuxCommandSEO from './linux-command';
import chineseToPinyinSEO from './chinese-to-pinyin';
import relationshipCalculatorSEO from './relationship-calculator';
import asciiArtSEO from './ascii-art';

export const SEO_CONFIGS: Record<string, SEOPageContent> = {
    'translate': translateSEO,
    'image-converter': imageConverterSEO,
    'image-editor': imageEditorSEO,
    'image-comparison': imageComparisonSEO,
    'image-round-corner': imageRoundCornerSEO,
    'photo-collage': photoCollageSEO,
    'code-highlight': codeHighlightSEO,
    'text-formatter': textFormatterSEO,
    'json-formatter': jsonFormatterSEO,
    'xml-formatter': xmlFormatterSEO,
    'math-formula': mathFormulaSEO,
    'table-converter': tableConverterSEO,
    'video-aspect-converter': videoAspectConverterSEO,
    'text-diff': textDiffSEO,
    'pdf-to-ppt': pdfToPptSEO,
    'pdf-to-image': pdfToImageSEO,
    'resume-generator': resumeGeneratorSEO,
    'prompt-generator': promptGeneratorSEO,
    'mbti-test': mbtiTestSEO,
    'image-to-prompt': imageToPromptSEO,
    'image-watermark-remover': imageWatermarkRemoverSEO,
    'mind-map': mindMapSEO,
    'drawing': drawingSEO,
    'vram-calculator': vramCalculatorSEO,
    'mortgage-calculator': mortgageCalculatorSEO,
    'pension-calculator': pensionCalculatorSEO,
    'tax-calculator': taxCalculatorSEO,
    'qrcode-generator': qrcodeGeneratorSEO,
    'chinese-converter': chineseConverterSEO,
    'timestamp-converter': timestampConverterSEO,
    'base64-tool': base64ToolSEO,
    'password-generator': passwordGeneratorSEO,
    'uuid-generator': uuidGeneratorSEO,
    'color-picker': colorPickerSEO,
    'id-card-parser': idCardParserSEO,
    'unit-converter': unitConverterSEO,
    'hash-calculator': hashCalculatorSEO,
    'regex-tester': regexTesterSEO,
    'number-base-converter': numberBaseConverterSEO,
    'crypto-tool': cryptoToolSEO,
    'cron-parser': cronParserSEO,
    'bmi-calculator': bmiCalculatorSEO,
    'date-calculator': dateCalculatorSEO,
    'stopwatch': stopwatchSEO,
    'countdown-timer': countdownTimerSEO,
    'text-statistics': textStatisticsSEO,
    'text-transform': textTransformSEO,
    'loan-calculator': loanCalculatorSEO,
    'world-clock': worldClockSEO,
    'percentage-calculator': percentageCalculatorSEO,
    'scientific-calculator': scientificCalculatorSEO,
    'ip-converter': ipConverterSEO,
    'ip-subnet-calculator': ipSubnetCalculatorSEO,
    'image-compressor': imageCompressorSEO,
    'age-calculator': ageCalculatorSEO,
    'encoding-converter': encodingConverterSEO,
    'number-generator': numberGeneratorSEO,
    'status-code-lookup': statusCodeLookupSEO,
    'port-lookup': portLookupSEO,
    'url-parser': urlParserSEO,
    'browser-fingerprint': browserFingerprintSEO,
    'curl-generator': curlGeneratorSEO,
    'image-watermark': imageWatermarkSEO,
    'image-bg-remover': imageBgRemoverSEO,
    'image-to-ico': imageToIcoSEO,
    'gif-maker': gifMakerSEO,
    'gif-splitter': gifSplitterSEO,
    'gif-compressor': gifCompressorSEO,
    'word-cloud': wordCloudSEO,
    'grid-image-cutter': gridImageCutterSEO,
    'photo-bg-changer': photoBgChangerSEO,
    'markdown-editor': markdownEditorSEO,
    'code-formatter': codeFormatterSEO,
    'json-escape': jsonEscapeSEO,
    'random-data': randomDataSEO,
    'mock-data': mockDataSEO,
    'linux-command': linuxCommandSEO,
    'chinese-to-pinyin': chineseToPinyinSEO,
    'relationship-calculator': relationshipCalculatorSEO,
    'ascii-art': asciiArtSEO,
};

export function getSEOConfig(toolId: string): SEOPageContent | undefined {
    return SEO_CONFIGS[toolId];
}

export default SEO_CONFIGS;

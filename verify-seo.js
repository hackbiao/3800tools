/**
 * SEO 验证脚本
 * 用于在部署前验证 SEO 配置是否正确
 *
 * 使用方法：
 * node verify-seo.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

function log(message, type = 'info') {
  const color = type === 'success' ? colors.green : type === 'error' ? colors.red : type === 'warning' ? colors.yellow : colors.blue;
  console.log(`${color}${message}${colors.reset}`);
}

// 检查文件是否存在
function checkFile(filePath, description) {
  const fullPath = path.join(__dirname, filePath);
  if (fs.existsSync(fullPath)) {
    log(`✓ ${description} 存在`, 'success');
    return true;
  } else {
    log(`✗ ${description} 不存在: ${filePath}`, 'error');
    return false;
  }
}

// 检查 index.html 中的 SEO 占位符
function checkIndexHtml() {
  const indexPath = path.join(__dirname, 'index.html');
  if (!fs.existsSync(indexPath)) {
    log('✗ index.html 不存在', 'error');
    return false;
  }

  const content = fs.readFileSync(indexPath, 'utf-8');
  const checks = [
    { pattern: /<meta name="seo:title"/g, desc: 'SEO Title 占位符' },
    { pattern: /<meta name="seo:description"/g, desc: 'SEO Description 占位符' },
    { pattern: /<meta name="seo:keywords"/g, desc: 'SEO Keywords 占位符' },
    { pattern: /<meta name="seo:canonical"/g, desc: 'SEO Canonical 占位符' },
    { pattern: /<title>/g, desc: 'Title 标签' },
    { pattern: /<meta name="description"/g, desc: 'Meta Description' },
    { pattern: /<meta name="keywords"/g, desc: 'Meta Keywords' },
    { pattern: /<link rel="canonical"/g, desc: 'Canonical 链接' },
    { pattern: /application\/ld\+json/g, desc: 'JSON-LD 结构化数据' },
    { pattern: /<meta property="og:/g, desc: 'Open Graph 标签' },
    { pattern: /<div id="root"><\/div>/g, desc: 'Root 容器' }
  ];

  let allPassed = true;
  checks.forEach(check => {
    if (content.match(check.pattern)) {
      log(`✓ ${check.desc} 已配置`, 'success');
    } else {
      log(`✗ ${check.desc} 未找到`, 'error');
      allPassed = false;
    }
  });

  return allPassed;
}

// 检查边缘函数
function checkEdgeFunction() {
  const funcPath = path.join(__dirname, 'functions', 'seo-handler.js');
  if (!fs.existsSync(funcPath)) {
    log('✗ 边缘函数不存在', 'error');
    return false;
  }

  const content = fs.readFileSync(funcPath, 'utf-8');

  // 检查关键配置
  const checks = [
    { pattern: /onRequest\s*\(/g, desc: 'onRequest 导出函数' },
    { pattern: /seoConfig\s*=/g, desc: 'SEO 配置对象' },
    { pattern: /User-Agent/g, desc: 'User-Agent 检测' },
    { pattern: /googlebot/gi, desc: 'Googlebot 检测' },
    { pattern: /baiduspider/gi, desc: 'Baiduspider 检测' },
    { pattern: /<title>/g, desc: 'Title 替换逻辑' },
    { pattern: /WebApplication/g, desc: 'JSON-LD WebApplication 类型' },
    { pattern: /AggregateRating/g, desc: 'JSON-LD 评分数据' }
  ];

  let allPassed = true;
  checks.forEach(check => {
    if (content.match(check.pattern)) {
      log(`✓ ${check.desc} 已配置`, 'success');
    } else {
      log(`✗ ${check.desc} 未找到`, 'warning');
    }
  });

  // 统计配置的工具数量
  const toolMatches = content.match(/'\/[\w-]+':/g);
  const toolCount = toolMatches ? toolMatches.length : 0;
  log(`ℹ 边缘函数中配置了 ${toolCount} 个页面的 SEO`, 'info');

  return true;
}

// 检查 EdgeOne 配置
function checkEdgeOneConfig() {
  const configPath = path.join(__dirname, 'edgeone.toml');
  if (!fs.existsSync(configPath)) {
    log('✗ edgeone.toml 不存在', 'error');
    return false;
  }

  const content = fs.readFileSync(configPath, 'utf-8');

  const checks = [
    { pattern: /\[\[edge_functions\]\]/g, desc: '边缘函数配置区块' },
    { pattern: /function\s*=\s*"seo-handler"/g, desc: '关联 seo-handler 函数' },
    { pattern: /\[\[headers\]\]/g, desc: '响应头配置' },
    { pattern: /\[\[redirects\]\]/g, desc: '重定向配置' },
    { pattern: /Cache-Control/g, desc: '缓存控制头' }
  ];

  let allPassed = true;
  checks.forEach(check => {
    if (content.match(check.pattern)) {
      log(`✓ ${check.desc} 已配置`, 'success');
    } else {
      log(`✗ ${check.desc} 未找到`, 'warning');
    }
  });

  // 统计重定向规则数量
  const redirectMatches = content.match(/\[\[redirects\]\]/g);
  const redirectCount = redirectMatches ? redirectMatches.length : 0;
  log(`ℹ 配置了 ${redirectCount} 条重定向规则`, 'info');

  return true;
}

// 检查 sitemap.xml
function checkSitemap() {
  const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    log('✗ sitemap.xml 不存在', 'error');
    return false;
  }

  const content = fs.readFileSync(sitemapPath, 'utf-8');

  // 统计 URL 数量
  const urlMatches = content.match(/<url>/g);
  const urlCount = urlMatches ? urlMatches.length : 0;
  log(`ℹ sitemap.xml 包含 ${urlCount} 个 URL`, 'info');

  // 检查必要的 URL 结构
  const hasLoc = content.includes('<loc>');
  const hasLastmod = content.includes('<lastmod>');
  const hasPriority = content.includes('<priority>');

  if (hasLoc && hasLastmod) {
    log('✓ Sitemap 结构正确', 'success');
    return true;
  } else {
    log('✗ Sitemap 结构不完整', 'error');
    return false;
  }
}

// 检查 robots.txt
function checkRobotsTxt() {
  const robotsPath = path.join(__dirname, 'public', 'robots.txt');
  if (!fs.existsSync(robotsPath)) {
    log('✗ robots.txt 不存在', 'error');
    return false;
  }

  const content = fs.readFileSync(robotsPath, 'utf-8');

  const checks = [
    { pattern: /User-agent:\s*\*/gi, desc: '允许所有爬虫' },
    { pattern: /Allow:\s*\//gi, desc: '允许根目录' },
    { pattern: /Sitemap:/gi, desc: 'Sitemap 声明' }
  ];

  let allPassed = true;
  checks.forEach(check => {
    if (content.match(check.pattern)) {
      log(`✓ ${check.desc} 已配置`, 'success');
    } else {
      log(`✗ ${check.desc} 未找到`, 'error');
      allPassed = false;
    }
  });

  return allPassed;
}

// 主验证函数
function main() {
  log('\n========================================', 'info');
  log('   三八零零 SEO 配置验证工具', 'info');
  log('========================================\n', 'info');

  const results = {
    indexHtml: checkIndexHtml(),
    edgeFunction: checkEdgeFunction(),
    edgeOneConfig: checkEdgeOneConfig(),
    sitemap: checkSitemap(),
    robotsTxt: checkRobotsTxt(),
    files: {
      index: checkFile('index.html', '主 HTML 文件'),
      func: checkFile('functions/seo-handler.js', '边缘函数'),
      config: checkFile('edgeone.toml', 'EdgeOne 配置'),
      deployGuide: checkFile('deploy-edgeone.md', '部署指南')
    }
  };

  log('\n========================================', 'info');
  log('   验证结果汇总', 'info');
  log('========================================\n', 'info');

  const allPassed = Object.values(results).every(r => r === true || (typeof r === 'object' && Object.values(r).every(v => v === true)));

  if (allPassed) {
    log('✓ 所有检查项通过！可以部署到 EdgeOne。', 'success');
    log('\n部署命令：', 'info');
    log('  1. 构建项目: npm run build:edgeone', 'info');
    log('  2. 上传 dist 目录到 EdgeOne Pages', 'info');
    log('  3. 在控制台配置边缘函数和路由', 'info');
    log('\n详细步骤请参考: deploy-edgeone.md', 'info');
  } else {
    log('✗ 部分检查未通过，请根据提示修复后再部署。', 'error');
    process.exit(1);
  }
}

main();

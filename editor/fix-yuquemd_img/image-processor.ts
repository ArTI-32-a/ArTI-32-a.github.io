/// <reference types="node" />

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * 递归获取所有 .md 文件
 */
function getAllMarkdownFiles(dir: string): string[] {
    const files: string[] = [];
    
    if (!fs.existsSync(dir)) {
        return files;
    }
    
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            files.push(...getAllMarkdownFiles(fullPath));
        } else if (item.endsWith('.md')) {
            files.push(fullPath);
        }
    }
    
    return files;
}

/**
 * 解析 frontmatter
 */
function parseFrontmatter(content: string): { hasFrontmatter: boolean; data: any; content: string } {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
    const match = content.match(frontmatterRegex);
    
    if (!match) {
        return {
            hasFrontmatter: false,
            data: {},
            content: content
        };
    }
    
    const frontmatterStr = match[1];
    const data: any = {};
    
    // 简单的 YAML 解析
    const lines = frontmatterStr.split('\n');
    for (const line of lines) {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
            const key = line.substring(0, colonIndex).trim();
            let value = line.substring(colonIndex + 1).trim();
            
            // 移除引号
            if ((value.startsWith('"') && value.endsWith('"')) ||
                (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }
            
            data[key] = value;
        }
    }
    
    return {
        hasFrontmatter: true,
        data,
        content: content.substring(match[0].length)
    };
}

/**
 * 下载图片并转换为 base64
 */
async function downloadImageAsBase64(url: string): Promise<string | null> {
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            return null;
        }
        
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        // 获取 MIME 类型
        const contentType = response.headers.get('content-type') || 'image/png';
        
        const base64 = buffer.toString('base64');
        
        return `data:${contentType};base64,${base64}`;
    } catch (error) {
        return null;
    }
}

/**
 * 替换 markdown 中的图片链接为 base64 格式
 */
async function replaceImages(content: string): Promise<string> {
    // 匹配 markdown 图片语法: ![alt](url)
    const imageRegex = /!\[([^\]]*)\]\((https?:\/\/[^)]+)\)/g;
    
    const matches: Array<{ full: string; alt: string; url: string }> = [];
    let match;
    
    while ((match = imageRegex.exec(content)) !== null) {
        matches.push({
            full: match[0],
            alt: match[1],
            url: match[2]
        });
    }
    
    // 下载并替换每个图片
    for (const imgMatch of matches) {
        const base64 = await downloadImageAsBase64(imgMatch.url);
        
        if (base64) {
            const htmlImg = `<img src="${base64}" alt="${imgMatch.alt}" style="max-width: 80%; height: auto;">`;
            content = content.replace(imgMatch.full, htmlImg);
        }
    }
    
    return content;
}

/**
 * 替换链接为 base64 格式（针对附件）
 */
async function replaceLinks(content: string): Promise<string> {
    // 匹配 markdown 链接语法: [text](url)
    const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
    
    const matches: Array<{ full: string; text: string; url: string }> = [];
    let match;
    
    while ((match = linkRegex.exec(content)) !== null) {
        // 跳过已经被处理过的（包含 data: 的）
        if (!match[2].startsWith('data:')) {
            matches.push({
                full: match[0],
                text: match[1],
                url: match[2]
            });
        }
    }
    
    // 下载并替换每个链接
    for (const linkMatch of matches) {
        const base64 = await downloadImageAsBase64(linkMatch.url);
        
        if (base64) {
            // 根据文件类型决定如何显示
            if (linkMatch.url.includes('/attachments/')) {
                // 附件链接，保持原样或转换
                const htmlLink = `<a href="${base64}" download="${linkMatch.text}">${linkMatch.text}</a>`;
                content = content.replace(linkMatch.full, htmlLink);
            }
        }
    }
    
    return content;
}

/**
 * 处理单个文件
 */
async function processFile(filePath: string): Promise<void> {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // 解析 frontmatter（如果有）
        const parsed = parseFrontmatter(content);
        
        // 检查 status 是否为 draft（如果有 frontmatter）
        if (parsed.hasFrontmatter && parsed.data.status !== 'draft') {
            return; // 跳过非 draft 文件
        }
        
        // 替换图片和链接
        let newContent = await replaceImages(parsed.content);
        newContent = await replaceLinks(newContent);
        
        // 重新组装文件内容
        let newFileContent: string;
        
        if (parsed.hasFrontmatter) {
            const frontmatterLines = Object.entries(parsed.data)
                .map(([key, value]) => `${key}: "${value}"`)
                .join('\n');
            
            newFileContent = `---\n${frontmatterLines}\n---${newContent}`;
        } else {
            newFileContent = newContent;
        }
        
        // 写回文件
        fs.writeFileSync(filePath, newFileContent, 'utf-8');
        
        console.log(`${path.basename(filePath)} complete`);
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error);
    }
}

/**
 * 主函数
 */
export async function entry(): Promise<void> {
    const prepareDir = path.join(process.cwd(), 'src', 'content', '_Prepare');
    
    // 检查目录是否存在
    if (!fs.existsSync(prepareDir)) {
        console.log('Directory not found:', prepareDir);
        return;
    }
    
    // 获取所有 markdown 文件
    const mdFiles = getAllMarkdownFiles(prepareDir);
    
    if (mdFiles.length === 0) {
        console.log('No markdown files found');
        return;
    }
    
    console.log(`Found ${mdFiles.length} markdown files`);
    
    // 处理每个文件
    for (const filePath of mdFiles) {
        await processFile(filePath);
    }
    
    console.log('All files processed');
}

// 如果直接运行此脚本（ESM 模式）
if (import.meta.url === `file://${process.argv[1].replace(/\\/g, '/')}`) {
    entry().catch(console.error);
}
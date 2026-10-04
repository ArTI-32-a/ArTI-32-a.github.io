import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from "fs";
import { join, dirname, basename, extname } from "path";
import { parse, HTMLElement, Node, TextNode } from "node-html-parser";
import matter from "gray-matter";


import type { ContentBlock } from "../../src/utils/Common/Type.d.ts";


const SOURCE_DIR: string = "src/_Prepare/_Infboard";
const OUTPUT_PATH: string = "src/data/InfBoard/contacts.json";


// 类型定义



function isBlankText(node: Node): boolean
{
    return node.nodeType === 3 && (node.textContent ?? "").trim() === "";
}

function parseChildren(el: HTMLElement): ContentBlock[]
{
    const blocks: ContentBlock[] = [];

    for (const child of el.childNodes)
    {
        if (isBlankText(child)) continue;

        if (child instanceof TextNode)
        {
            blocks.push({ type: "text", text: child.textContent });
            continue;
        }

        if (child instanceof HTMLElement)
        {
            blocks.push(elementToBlock(child));
        }
    }

    return blocks;
}

function elementToBlock(el: HTMLElement): ContentBlock
{
    const tag = el.tagName.toLowerCase();

    // h1 ~ h6
    if (/^h[1-6]$/.test(tag))
    {
        return {
            type: "title",
            level: Number(tag[1]),
            text: el.textContent,
        };
    }

    // p：递归子节点
    if (tag === "p")
    {
        return {
            type: "paragraph",
            children: parseChildren(el),
        };
    }

    // img
    if (tag === "img")
    {
        const src = el.getAttribute("src") ?? "";
        const altEl = el.getAttribute("alt");

        let alt: string | undefined = undefined;

        if (altEl) alt = altEl;
        
        return alt !== undefined
            ? { type: "image", src, alt }
            : { type: "image", src };
    }

    // a
    if (tag === "a")
    {
        return {
            type: "link",
            text: el.textContent,
            href: el.getAttribute("href") ?? "",
        };
    }

    // 兜底
    return { type: "other", text: el.textContent };
}



function parseBlocks(source: string): ContentBlock[]
{
    const { content } = matter(source);
    const root = parse(content);

    return parseChildren(root);
}

function entry(): void
{
    if (!existsSync(SOURCE_DIR))
    {
        console.error(`目录不存在: ${SOURCE_DIR}`);
        return;
    }

    let result: Record<string, ContentBlock[]> = {};
    if (existsSync(OUTPUT_PATH))
    {
        try
        {
            const raw = readFileSync(OUTPUT_PATH, "utf-8");
            result = JSON.parse(raw) as Record<string, ContentBlock[]>;
        }
        catch
        {
            console.warn("[InfBoard] 旧 JSON 读取失败，从空开始");
        }
    }

    const entries = readdirSync(SOURCE_DIR, { withFileTypes: true });

    for (const e of entries)
    {
        if (!e.isFile()) continue;

        const ext = extname(e.name).toLowerCase();
        if (ext !== ".html" && ext !== ".astro") continue;

        const nameNoExt = basename(e.name, ext);

        // 文件名必须是纯数字
        if (!/^\d+$/.test(nameNoExt)) continue;

        const fullPath = join(SOURCE_DIR, e.name);
        const source = readFileSync(fullPath, "utf-8");
        const blocks = parseBlocks(source);

        result[nameNoExt] = blocks;
    }

    const outputDir = dirname(OUTPUT_PATH);
    if (!existsSync(outputDir))
    {
        mkdirSync(outputDir, { recursive: true });
    }
    writeFileSync(OUTPUT_PATH, JSON.stringify(result, null, 4), "utf-8");
    console.log(`[InfBoard] 已写入: ${OUTPUT_PATH}`);
}


export { entry };
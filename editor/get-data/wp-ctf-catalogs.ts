import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from "fs";
import { join, dirname, relative, sep } from "path";
import matter from "gray-matter";

import type { WPCTFFormatter, WPInfo } from "../../src/utils/Common/Type";
import { ToolBox as TB } from "../../src/utils/Common/ToolBox.ts";


const CTF_DIR: string = "src/content/CTF";
const OUTPUT_PATH: string = "src/data/Content/WPs/CTF/catalog.json";


/**
 * 递归读取所有 .md 文件，跳过 _ 开头的目录和文件。
 * key 是相对于 CTF_DIR 的路径（用 / 分隔），value 是文件原始内容。
 */
function readAllMarkdowns(dir: string): Record<string, string>
{
    const result: Record<string, string> = {};

    function walk(current: string): void
    {
        const entries = readdirSync(current, { withFileTypes: true });

        for (const entry of entries)
        {
            if (entry.name.startsWith("_"))
            {
                continue;
            }

            const fullPath: string = join(current, entry.name);

            if (entry.isDirectory())
            {
                walk(fullPath);
            }
            else if (entry.isFile() && entry.name.endsWith(".md"))
            {
                const rel: string = relative(CTF_DIR, fullPath).split(sep).join("/");
                result[rel] = readFileSync(fullPath, "utf-8");
            }
        }
    }

    walk(dir);
    return result;
}


/**
 * 解析 frontmatter，失败则返回 null 并警告
 */
function parseFrontmatter(content: string, filePath: string): WPCTFFormatter | null
{
    try
    {
        const parsed = matter(content);

        return {
            title: parsed.data.title,
            pubDate: parsed.data.pubDate,
            tags: parsed.data.tags,
            type: parsed.data.type,
            status: parsed.data.status,
        } as WPCTFFormatter;
    }
    catch (e)
    {
        console.warn(`[build-catalog] 解析失败，跳过: ${filePath}`);
        return null;
    }
}


/**
 * 从文件集合构建树
 */
function buildTree(files: Record<string, string>): WPInfo[]
{
    const root: WPInfo[] = [];

    for (const [relPath, content] of Object.entries(files))
    {
        const parts: string[] = relPath.split("/");
        const fileName: string = parts.pop() ?? "";
        const fileNameWithoutExt: string = fileName.replace(/\.md$/, "");
        const href: string = `/wps/CTF/${TB.normalizedPaths(relPath)}`;

        let currentLevel: WPInfo[] = root;

        for (const folderName of parts)
        {
            let existing: WPInfo | undefined = currentLevel.find((n) => n.key === folderName);

            if (!existing)
            {
                const newNode: WPInfo = {
                    key: folderName,
                    href: null,
                    data: null,
                    children: [],
                };
                currentLevel.push(newNode);
                existing = newNode;
            }

            if (!existing.children)
            {
                existing.children = [];
            }
            currentLevel = existing.children;
        }

        const data: WPCTFFormatter | null = parseFrontmatter(content, relPath);

        currentLevel.push({
            key: fileNameWithoutExt,
            href: href,
            data: data,
            children: null,
        });
    }

    return root;
}


/**
 * 排序：文件夹优先，同类型按名称字母序
 */
function sortTree(nodes: WPInfo[]): void
{
    nodes.sort((a, b) =>
    {
        const aIsFolder: boolean = a.children !== null;
        const bIsFolder: boolean = b.children !== null;

        if (aIsFolder && !bIsFolder) return -1;
        if (!aIsFolder && bIsFolder) return 1;

        return a.key.localeCompare(b.key);
    });

    for (const node of nodes)
    {
        if (node.children)
        {
            sortTree(node.children);
        }
    }
}


function entry(): void
{
    if (!existsSync(CTF_DIR))
    {
        console.error(`目录不存在: ${CTF_DIR}`);
        process.exit(1);
    }

    console.log(`扫描: ${CTF_DIR}`);
    const files = readAllMarkdowns(CTF_DIR);
    console.log(`找到 ${Object.keys(files).length} 个 markdown 文件`);

    const tree = buildTree(files);
    sortTree(tree);

    const outputDir: string = dirname(OUTPUT_PATH);
    if (!existsSync(outputDir))
    {
        mkdirSync(outputDir, { recursive: true });
    }

    writeFileSync(OUTPUT_PATH, JSON.stringify(tree, null, 4), "utf-8");
    console.log(`已写入: ${OUTPUT_PATH}`);
}


export { entry };
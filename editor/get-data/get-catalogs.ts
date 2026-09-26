import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from "fs";
import { join, dirname, relative, sep } from "path";
import matter from "gray-matter";

import type { WPCTFFormatter, WPInfo } from "../../src/utils/Common/Type";
import { ToolBox as TB } from "../../src/utils/Common/ToolBox.ts";


function getContentDir(collectionName: string): string
{
    return `src/content/${collectionName}`;
}

function getOutputPath(collectionName: string): string
{
    return `src/data/Content/WPs/${collectionName}/catalog.json`;
}


/**
 * 递归读取所有 .md 文件，跳过 _ 开头的目录和文件。
 * key 是相对于 baseDir 的路径（用 / 分隔），value 是文件原始内容。
 */
function readAllMarkdowns(baseDir: string, currentDir: string): Record<string, string>
{
    const result: Record<string, string> = {};

    const entries = readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries)
    {
        if (entry.name.startsWith("_"))
        {
            continue;
        }

        const fullPath: string = join(currentDir, entry.name);

        if (entry.isDirectory())
        {
            const subResult = readAllMarkdowns(baseDir, fullPath);
            Object.assign(result, subResult);
        }
        else if (entry.isFile() && entry.name.endsWith(".md"))
        {
            const rel: string = relative(baseDir, fullPath).split(sep).join("/");
            result[rel] = readFileSync(fullPath, "utf-8");
        }
    }

    return result;
}


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
    catch
    {
        console.warn(`[build-catalog] 解析失败，跳过: ${filePath}`);
        return null;
    }
}


function buildTree(files: Record<string, string>, collectionName: string): WPInfo[]
{
    const root: WPInfo[] = [];

    for (const [relPath, content] of Object.entries(files))
    {
        const parts: string[] = relPath.split("/");
        const fileName: string = parts.pop() ?? "";
        const fileNameWithoutExt: string = fileName.replace(/\.md$/, "");
        const href: string = `/wps/${collectionName}/${TB.normalizedPaths(relPath)}`;

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


function entry(collectionName: string): void
{
    const contentDir: string = getContentDir(collectionName);
    const outputPath: string = getOutputPath(collectionName);

    if (!existsSync(contentDir))
    {
        console.error(`目录不存在: ${contentDir}`);
        process.exit(1);
    }

    console.log(`[${collectionName}] 扫描: ${contentDir}`);
    const files = readAllMarkdowns(contentDir, contentDir);
    console.log(`[${collectionName}] 找到 ${Object.keys(files).length} 个 markdown 文件`);

    const tree = buildTree(files, collectionName);
    sortTree(tree);

    const outputDir: string = dirname(outputPath);
    if (!existsSync(outputDir))
    {
        mkdirSync(outputDir, { recursive: true });
    }

    writeFileSync(outputPath, JSON.stringify(tree, null, 4), "utf-8");
    console.log(`[${collectionName}] 已写入: ${outputPath}`);
}


export { entry };
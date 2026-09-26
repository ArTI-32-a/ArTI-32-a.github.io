import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { remark } from "remark";
import { visit } from "unist-util-visit";
import type { Heading, RootContent } from "mdast";

import matter from "gray-matter";


function getContentDir(collectionName: string): string
{
    return `src/content/${collectionName}`;
}

function getDataPath(collectionName: string): string
{
    return `src/data/Content/WPs/${collectionName}/questions.json`;
}


function stripHtmlTags(text: string): string
{
    return text.replace(/<[^>]*>/g, "").trim();
}


function normalizedPaths(raw: string): string
{
    let key: string = "";

    key = raw.replace(/\\/g, "/");
    key = key.replace(/\.md$/i, "");
    key = key.replace(/\./g, "");
    key = key.replace(/ /g, "-");
    key = key.toLowerCase();

    return key;
}


function getQuestions(markdown: string): string[] | undefined
{
    const { content } = matter(markdown);

    let minDepth = Infinity;
    const texts: string[] = [];

    const ast = remark().parse(content);

    visit(ast, "heading", (node: Heading) =>
    {
        if (node.depth >= 2)
        {
            const raw = node.children
                .map((child: RootContent) => ("value" in child ? child.value : ""))
                .join("")
                .trim();

            const text = stripHtmlTags(raw);

            if (text)
            {
                if (node.depth < minDepth)
                {
                    minDepth = node.depth;
                    texts.length = 0;
                    texts.push(text);
                }
                else if (node.depth === minDepth)
                {
                    texts.push(text);
                }
            }
        }
    });

    return texts.length > 0 ? texts : undefined;
}


function readAllMarkdowns(dir: string, basePath: string = ""): Record<string, string>
{
    const result: Record<string, string> = {};
    const entries = readdirSync(dir, { withFileTypes: true });

    for (const entry of entries)
    {
        // 跳过 _ 开头的目录和文件
        if (entry.name.startsWith("_"))
        {
            continue;
        }

        const fullPath = join(dir, entry.name);
        const relativePath = basePath ? join(basePath, entry.name) : entry.name;

        if (entry.isDirectory())
        {
            const subResult = readAllMarkdowns(fullPath, relativePath);
            Object.assign(result, subResult);
        }
        else if (entry.isFile() && entry.name.endsWith(".md"))
        {
            const content = readFileSync(fullPath, "utf-8");
            result[relativePath] = content;
        }
    }

    return result;
}


function buildQuestionsCache(files: Record<string, string>): Record<string, string[] | undefined>
{
    const cache: Record<string, string[] | undefined> = {};

    for (const [path, content] of Object.entries(files))
    {
        const normalizedPath = normalizedPaths(path);
        const questions = getQuestions(content);
        cache[normalizedPath] = questions ?? undefined;

        console.log(normalizedPath);
    }

    return cache;
}


function writeCacheToFile(cache: Record<string, string[] | undefined>, outputPath: string): boolean
{
    const outputDir = dirname(outputPath);

    if (!existsSync(outputDir))
    {
        mkdirSync(outputDir, { recursive: true });
    }

    writeFileSync(outputPath, JSON.stringify(cache, null, 4), "utf-8");

    return true;
}


function entry(collectionName: string): void
{
    const contentDir: string = getContentDir(collectionName);
    const dataPath: string = getDataPath(collectionName);

    console.log(`[${collectionName}] 扫描: ${contentDir}`);

    const dir: Record<string, string> = readAllMarkdowns(contentDir);
    const cache: Record<string, string[] | undefined> = buildQuestionsCache(dir);
    const success: boolean = writeCacheToFile(cache, dataPath);

    console.log(`[${collectionName}] success: ${success}`);
}


export { entry };
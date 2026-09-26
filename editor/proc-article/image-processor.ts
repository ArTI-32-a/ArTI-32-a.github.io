import * as fs from "fs";
import * as path from "path";


function getPrepareDir(collectionName: string): string
{
    return path.join(process.cwd(), "src", "content", collectionName, "_Prepare");
}


function getAllMarkdownFiles(dir: string): string[]
{
    if (!fs.existsSync(dir))
    {
        return [];
    }

    const files: string[] = [];
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items)
    {
        const fullPath: string = path.join(dir, item.name);

        if (item.isDirectory())
        {
            files.push(...getAllMarkdownFiles(fullPath));
        }
        else if (item.isFile() && item.name.endsWith(".md"))
        {
            files.push(fullPath);
        }
    }

    return files;
}


/**
 * 剥离 frontmatter，返回 { frontmatter, body }
 */
function splitFrontmatter(content: string): { frontmatter: string; body: string }
{
    const match: RegExpMatchArray | null = content.match(/^(---\n[\s\S]*?\n---\n?)/);

    if (!match)
    {
        return { frontmatter: "", body: content };
    }

    return {
        frontmatter: match[1],
        body: content.substring(match[1].length),
    };
}


async function downloadAsBase64(url: string): Promise<string | null>
{
    try
    {
        const response = await fetch(url);

        if (!response.ok)
        {
            return null;
        }

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const contentType = response.headers.get("content-type") || "image/png";

        return `data:${contentType};base64,${buffer.toString("base64")}`;
    }
    catch
    {
        return null;
    }
}


async function replaceImages(content: string): Promise<string>
{
    const regex: RegExp = /!\[([^\]]*)\]\((https?:\/\/[^)]+)\)/g;

    const matches: Array<{ full: string; alt: string; url: string }> = [];
    let match: RegExpExecArray | null;

    while ((match = regex.exec(content)) !== null)
    {
        matches.push({
            full: match[0],
            alt: match[1],
            url: match[2],
        });
    }

    for (const img of matches)
    {
        const base64 = await downloadAsBase64(img.url);

        if (base64)
        {
            const html = `<img src="${base64}" alt="${img.alt}" style="max-width: 80%; height: auto;">`;
            content = content.replace(img.full, html);
        }
    }

    return content;
}


async function replaceLinks(content: string): Promise<string>
{
    const regex: RegExp = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;

    const matches: Array<{ full: string; text: string; url: string }> = [];
    let match: RegExpExecArray | null;

    while ((match = regex.exec(content)) !== null)
    {
        if (!match[2].startsWith("data:"))
        {
            matches.push({
                full: match[0],
                text: match[1],
                url: match[2],
            });
        }
    }

    for (const link of matches)
    {
        if (!link.url.includes("/attachments/"))
        {
            continue;
        }

        const base64 = await downloadAsBase64(link.url);

        if (base64)
        {
            const html = `<a href="${base64}" download="${link.text}">${link.text}</a>`;
            content = content.replace(link.full, html);
        }
    }

    return content;
}


async function processFile(filePath: string): Promise<void>
{
    const original: string = fs.readFileSync(filePath, "utf-8");

    const { frontmatter, body } = splitFrontmatter(original);

    let newBody: string = await replaceImages(body);
    newBody = await replaceLinks(newBody);

    const newContent: string = frontmatter + newBody;

    if (original !== newContent)
    {
        fs.writeFileSync(filePath, newContent, "utf-8");
        console.log(`已处理: ${filePath}`);
    }
}


export async function entry(collectionName: string): Promise<void>
{
    const prepareDir: string = getPrepareDir(collectionName);

    if (!fs.existsSync(prepareDir))
    {
        console.log(`目录不存在: ${prepareDir}`);
        return;
    }

    const files: string[] = getAllMarkdownFiles(prepareDir);
    console.log(`[${collectionName}] 找到 ${files.length} 个 markdown 文件`);

    for (const file of files)
    {
        await processFile(file);
    }

    console.log(`[${collectionName}] 完成`);
}
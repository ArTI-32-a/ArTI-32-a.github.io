import * as fs from "fs";
import * as path from "path";
import * as readline from "readline/promises";


type ReadlineInterface = ReturnType<typeof readline.createInterface>;

const PICTURE_ROOT = path.join(process.cwd(), "public", "Picture");


function getPrepareDir(collectionName: string): string
{
    return path.join(process.cwd(), "src", "content", collectionName, "_Prepare");
}


function getAllMarkdownFiles(dir: string): string[]
{
    if (!fs.existsSync(dir)) return [];

    const files: string[] = [];
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items)
    {
        const fullPath = path.join(dir, item.name);
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


function splitFrontmatter(content: string): { frontmatter: string; body: string }
{
    const match = content.match(/^(---\r?\n[\s\S]*?\r?\n---\r?\n?)/);
    if (!match)
    {
        return { frontmatter: "", body: content };
    }
    return {
        frontmatter: match[1],
        body: content.substring(match[1].length),
    };
}


function extFromContentType(ct: string): string
{
    const sub = ct.split("/")[1] ?? "png";
    return sub === "jpeg" ? "jpg" : sub;
}


function extFromUrl(url: string): string
{
    const m = url.match(/\.([a-zA-Z0-9]+)(?:\?|#|$)/);
    return m ? m[1].toLowerCase() : "png";
}


async function downloadImage(url: string): Promise<{ buffer: Buffer; ext: string } | null>
{
    try
    {
        const res = await fetch(url);
        if (!res.ok) return null;

        const ab = await res.arrayBuffer();
        const buffer = Buffer.from(ab);
        const ct = res.headers.get("content-type") ?? "";

        const ext = ct.startsWith("image/") ? extFromContentType(ct) : extFromUrl(url);
        return { buffer, ext };
    }
    catch
    {
        return null;
    }
}


function parseDataUrl(dataUrl: string): { buffer: Buffer; ext: string } | null
{
    const m = dataUrl.match(/^data:image\/([a-zA-Z0-9]+);base64,(.+)$/);
    if (!m) return null;
    const ext = m[1] === "jpeg" ? "jpg" : m[1];
    return { buffer: Buffer.from(m[2], "base64"), ext };
}


interface FoundImage
{
    full: string;
    src: string;
    alt: string;
    isMarkdown: boolean;
}


function findImages(content: string): FoundImage[]
{
    const result: FoundImage[] = [];
    const seen = new Set<string>();
    let m: RegExpExecArray | null;

    // Markdown 格式：![alt](url 或 data:...)
    const mdRegex = /!\[([^\]]*)\]\((https?:\/\/[^)]+|data:image\/[^)]+)\)/g;
    while ((m = mdRegex.exec(content)) !== null)
    {
        if (seen.has(m[0])) continue;
        seen.add(m[0]);
        result.push({ full: m[0], src: m[2], alt: m[1], isMarkdown: true });
    }

    // HTML 格式：<img ... src="url 或 data:..." ...>
    const htmlRegex = /<img\s+[^>]*src="(https?:\/\/[^"]+|data:image\/[^"]+)"[^>]*\/?>/g;
    while ((m = htmlRegex.exec(content)) !== null)
    {
        if (seen.has(m[0])) continue;
        seen.add(m[0]);
        const altMatch = m[0].match(/\balt="([^"]*)"/);
        result.push({
            full: m[0],
            src: m[1],
            alt: altMatch ? altMatch[1] : "",
            isMarkdown: false,
        });
    }

    return result;
}


async function processFile(
    rl: ReadlineInterface,
    filePath: string,
    index: number,
    total: number
): Promise<void>
{
    const original = fs.readFileSync(filePath, "utf-8");
    const { frontmatter, body } = splitFrontmatter(original);

    const images = findImages(body);

    if (images.length === 0)
    {
        return;
    }

    const relativePath = path.relative(process.cwd(), filePath);
    console.log(`\n[${index}/${total}] ${relativePath}`);
    console.log(`  找到 ${images.length} 张图片`);

    console.log("路径: public/Picture/");
    const userPath = await rl.question("> ");
    const trimPath = userPath.trim().replace(/^\/+|\/+$/g, "").split("\\").join("/");

    if (!trimPath)
    {
        console.log("  路径为空，跳过");
        return;
    }

    const targetDir = path.join(PICTURE_ROOT, trimPath);
    if (!fs.existsSync(targetDir))
    {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    // 从项目根算起，用 @ 别名
    const publicRoot = path.join(process.cwd(), "public");
    const relFromMd = "/" + path.relative(publicRoot, targetDir).split(path.sep).join("/");

    let newBody = body;
    let successIndex = 0;

    for (const img of images)
    {
        let data: { buffer: Buffer; ext: string } | null;

        if (img.src.startsWith("data:image/"))
        {
            data = parseDataUrl(img.src);
        }
        else
        {
            data = await downloadImage(img.src);
        }

        if (!data)
        {
            console.log(`  下载失败: ${img.src.slice(0, 60)}...`);
            continue;
        }

        successIndex++;
        const fileName = `${successIndex}.${data.ext}`;
        const outPath = path.join(targetDir, fileName);
        fs.writeFileSync(outPath, data.buffer);

        const newRef = `${relFromMd}/${fileName}`;

        let replacement: string;
        if (img.isMarkdown)
        {
            replacement = `![${img.alt}](${newRef})`;
        }
        else
        {
            replacement = img.full.replace(img.src, newRef);
        }

        newBody = newBody.replace(img.full, replacement);
        console.log(`  [${successIndex}] → ${fileName}`);
    }

    const newContent = frontmatter + newBody;

    if (original !== newContent)
    {
        fs.writeFileSync(filePath, newContent, "utf-8");
        console.log(`  已更新`);
    }
}


export async function entry(collectionName: string): Promise<void>
{
    const dir = getPrepareDir(collectionName);

    if (!fs.existsSync(dir))
    {
        console.log(`目录不存在: ${dir}`);
        return;
    }

    const files = getAllMarkdownFiles(dir);
    console.log(`[${collectionName}] 找到 ${files.length} 个文件`);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    try
    {
        for (let i = 0; i < files.length; i++)
        {
            await processFile(rl, files[i], i + 1, files.length);
        }
    }
    finally
    {
        rl.close();
    }

    console.log(`\n[${collectionName}] 完成`);
}
import * as fs from "fs";
import * as path from "path";
import * as readline from "readline/promises";
import matter from "gray-matter";


type ReadlineInterface = ReturnType<typeof readline.createInterface>;

const TITLE_REGEX_CTF = /^(Reverse|Misc|Crypto|Pwn|PWN|Web|Digit Safety|\d+\.\d+\s+.+)$/;
const TITLE_REGEX_DF = /^\d+ - [a-zA-Z\u4e00-\u9fa5_]+( - [a-zA-Z\u4e00-\u9fa5_]+)?$/;

const TYPE_OPTIONS = ["Misc", "Crypto", "Reverse", "Web", "PWN", "Digit Safety"];


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


function parseFrontmatterFields(frontmatter: string): Record<string, unknown>
{
    return matter(frontmatter).data;
}


function formatDate(input: string): string | null
{
    const trimmed = input.trim();
    const m = trimmed.match(/^(\d{4})[-.](\d{2})[-.](\d{2})$/);
    if (!m) return null;
    const formatted = `${m[1]}-${m[2]}-${m[3]}`;
    const date = new Date(`${formatted}T00:00:00.000Z`);
    if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== formatted) return null;
    return formatted;
}


function formatTags(input: string): string[] | null
{
    const trimmed = input.trim();
    if (!trimmed) return [];
    const parts = trimmed
        .split(/[,.\-·\\\/;]+/)
        .map((s) => s.trim())
        .filter(Boolean);
    return parts.length > 0 ? parts : null;
}


function parseTypeInput(input: string): string | null
{
    const trimmed = input.trim();
    if (/^[1-6]$/.test(trimmed)) return TYPE_OPTIONS[Number(trimmed) - 1];
    if (/^[a-fA-F]$/.test(trimmed)) return TYPE_OPTIONS["abcdef".indexOf(trimmed.toLowerCase())];
    const found = TYPE_OPTIONS.find((t) => t.toLowerCase() === trimmed.toLowerCase());
    return found ?? null;
}


function parseStatusInput(input: string): string | null
{
    const trimmed = input.trim().toLowerCase();
    if (trimmed === "a" || trimmed === "1") return "draft";
    if (trimmed === "b" || trimmed === "2") return "published";
    if (trimmed === "draft" || trimmed === "published") return trimmed;
    return null;
}


function getAllMarkdownFiles(dir: string): string[]
{
    const result: string[] = [];
    if (!fs.existsSync(dir)) return result;

    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries)
    {
        if (entry.name.startsWith("_")) continue;
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory())
        {
            result.push(...getAllMarkdownFiles(fullPath));
        }
        else if (entry.isFile() && entry.name.endsWith(".md"))
        {
            result.push(fullPath);
        }
    }
    return result;
}


async function processFile(
    rl: ReadlineInterface,
    filePath: string,
    collectionName: string
): Promise<void>
{
    const relativePath = path.relative(process.cwd(), filePath);
    const original = fs.readFileSync(filePath, "utf-8");
    const { frontmatter, body } = splitFrontmatter(original);
    let data: Record<string, unknown>;
    try
    {
        data = frontmatter ? parseFrontmatterFields(frontmatter) : {};
    }
    catch (error)
    {
        console.error(`元数据解析失败，未修改: ${relativePath}`, error);
        process.exitCode = 1;
        return;
    }

    console.log(`\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`📄 ${relativePath}`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);

    const titleRegex = collectionName === "CTF" ? TITLE_REGEX_CTF : TITLE_REGEX_DF;

    // ---------- title ----------
    let title: string;
    const curTitle = typeof data.title === "string" ? data.title : "";
    if (curTitle && titleRegex.test(curTitle))
    {
        title = curTitle;
    }
    else
    {
        const hint = collectionName === "CTF"
            ? "Reverse / Misc / Crypto / Pwn / PWN / Web / Digit Safety，或 数字.数字 空格 任意内容"
            : "数字 - 名字[ - 名字]";
        console.log(`title 缺失或格式不符（当前: "${curTitle}"）`);
        while (true)
        {
            console.log(`title（${hint}）`);
            const input = await rl.question("> ");
            const trimmed = input.trim();
            if (titleRegex.test(trimmed))
            {
                title = trimmed;
                break;
            }
            console.log("格式不符，请重新输入");
        }
    }

    // ---------- status ----------
    let status: string;
    const curStatus = typeof data.status === "string" ? data.status : "";
    if (curStatus === "draft" || curStatus === "published")
    {
        status = curStatus;
    }
    else
    {
        console.log(`status 缺失或无效（当前: "${curStatus}"）`);
        console.log(`  1/a=draft，2/b=published，或直接输入 draft/published`);
        while (true)
        {
            const input = await rl.question("> ");
            const parsed = parseStatusInput(input);
            if (parsed)
            {
                status = parsed;
                break;
            }
            console.log("无效的状态，请重新输入");
        }
    }

    // ---------- pubDate ----------
    let pubDate: string | null = null;
    const curPubDate = data.pubDate;
    let curPubDateStr = "";
    if (curPubDate instanceof Date)
    {
        curPubDateStr = curPubDate.toISOString().slice(0, 10);
    }
    else if (typeof curPubDate === "string")
    {
        curPubDateStr = curPubDate;
    }
    const validCur = formatDate(curPubDateStr);

    if (validCur)
    {
        pubDate = validCur;
    }
    else if (status === "published")
    {
        console.log(`pubDate 缺失或格式不符（当前: "${curPubDateStr}"）`);
        while (true)
        {
            console.log(`pubDate（yyyy-mm-dd / yyyy.mm.dd）`);
            const input = await rl.question("> ");
            const parsed = formatDate(input);
            if (parsed)
            {
                pubDate = parsed;
                break;
            }
            console.log("格式不符，请重新输入");
        }
    }
    else
    {
        console.log(`pubDate 可留空（当前: "${curPubDateStr}"）`);
        while (true)
        {
            console.log(`pubDate（yyyy-mm-dd / yyyy.mm.dd，回车或 . 留空）`);
            const input = await rl.question("> ");
            const trimmed = input.trim();
            if (trimmed === "" || /^\.+$/.test(trimmed))
            {
                pubDate = null;
                break;
            }
            const parsed = formatDate(trimmed);
            if (parsed)
            {
                pubDate = parsed;
                break;
            }
            console.log("格式不符，请重新输入");
        }
    }

    // ---------- type（仅 CTF） ----------
    let type: string | null = null;
    if (collectionName === "CTF")
    {
        const curType = typeof data.type === "string" ? data.type : "";
        if (TYPE_OPTIONS.includes(curType))
        {
            type = curType;
        }
        else
        {
            console.log(`type 缺失或无效（当前: "${curType}"）`);
            console.log(`  1/a=Misc，2/b=Crypto，3/c=Reverse，4/d=Web，5/e=PWN，6/f=Digit Safety`);
            while (true)
            {
                const input = await rl.question("> ");
                const parsed = parseTypeInput(input);
                if (parsed)
                {
                    type = parsed;
                    break;
                }
                console.log("无效的类型，请重新输入");
            }
        }
    }

    // ---------- tags ----------
    let tags: string[];
    const curTags = data.tags;
    if (Array.isArray(curTags) && curTags.every((t) => typeof t === "string"))
    {
        tags = curTags as string[];
    }
    else
    {
        console.log(`tags 缺失或无效`);
        while (true)
        {
            console.log(`tags（用 , . · - \\ / ; 分隔）`);
            const input = await rl.question("> ");
            const parsed = formatTags(input);
            if (parsed)
            {
                tags = parsed;
                break;
            }
            console.log("无法解析，请重新输入");
        }
    }

    // ---------- 构建新 frontmatter ----------
    const updatedData: Record<string, unknown> = { ...data, title, tags, status };
    if (pubDate)
    {
        // 使用 YAML 日期类型，保持与内容集合的 z.date() 一致。
        updatedData.pubDate = new Date(`${pubDate}T00:00:00.000Z`);
    }
    else
    {
        delete updatedData.pubDate;
    }
    if (type !== null)
    {
        updatedData.type = type;
    }
    // 只序列化元数据，去掉空正文的占位换行，保留原正文不变。
    const newFrontmatter = matter.stringify("", updatedData).replace(/\n$/, "");
    const newContent = newFrontmatter + body;

    if (original !== newContent)
    {
        fs.writeFileSync(filePath, newContent, "utf-8");
        console.log(`已更新: ${filePath}`);
    }
    else
    {
        console.log(`未变化: ${filePath}`);
    }
}


async function run(collectionName: string): Promise<void>
{
    const prepareDir = path.join(process.cwd(), "src", "content", collectionName, "_Prepare");

    if (!fs.existsSync(prepareDir))
    {
        console.log(`目录不存在: ${prepareDir}`);
        return;
    }

    const files = getAllMarkdownFiles(prepareDir);
    console.log(`[${collectionName}] 找到 ${files.length} 个文件`);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    try
    {
        for (const file of files)
        {
            await processFile(rl, file, collectionName);
        }
    }
    finally
    {
        rl.close();
    }

    console.log(`\n[${collectionName}] 完成`);
}


export async function entryCTF(): Promise<void>
{
    await run("CTF");
}

export async function entryDF(): Promise<void>
{
    await run("DF");
}

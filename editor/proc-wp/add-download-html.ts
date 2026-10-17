import * as fs from "node:fs";
import * as path from "node:path";
import * as readline from "node:readline/promises";


type ReadlineInterface = ReturnType<typeof readline.createInterface>;

interface AnswerPosition
{
    offset: number;
    title: string;
}

const PROJECT_ROOT: string = process.cwd();
const PUBLIC_ROOT: string = path.join(PROJECT_ROOT, "public");
const DOWNLOAD_ROOT: string = path.join(PUBLIC_ROOT, "Download", "WpCTF");
const PREPARE_ROOT: string = path.join(
    PROJECT_ROOT, "src", "content", "CTF", "_Prepare"
);


/** 递归查找待处理文章，跳过以下划线开头的文件和目录。 */
function getMarkdownFiles(directory: string): string[]
{
    if (!fs.existsSync(directory))
    {
        return [];
    }

    const files: string[] = [];

    for (const item of fs.readdirSync(directory, { withFileTypes: true }))
    {
        if (item.name.startsWith("_"))
        {
            continue;
        }

        const fullPath: string = path.join(directory, item.name);

        if (item.isDirectory())
        {
            files.push(...getMarkdownFiles(fullPath));
        }
        else if (item.isFile() && /\.md$/i.test(item.name))
        {
            files.push(fullPath);
        }
    }

    return files.sort();
}


/** 查找答案标题，记录其在原文中的位置，跳过围栏代码块。 */
function findAnswerPositions(content: string): AnswerPosition[]
{
    const positions: AnswerPosition[] = [];
    const lines = content.match(/[^\r\n]*(?:\r\n|\n|$)/g) ?? [];

    let offset: number = 0;
    let title: string = "未命名题目";
    let fenceCharacter: string | null = null;
    let fenceLength: number = 0;

    for (const line of lines)
    {
        const text: string = line.replace(/\r?\n$/, "");
        const fence = text.match(/^ {0,3}(`{3,}|~{3,})(.*)$/);

        if (fence)
        {
            const marker: string = fence[1];

            if (fenceCharacter === null)
            {
                fenceCharacter = marker[0];
                fenceLength = marker.length;
            }
            else if (
                marker[0] === fenceCharacter &&
                marker.length >= fenceLength &&
                fence[2].trim() === ""
            )
            {
                fenceCharacter = null;
            }

            offset += line.length;
            continue;
        }

        if (fenceCharacter === null)
        {
            // 同时兼容 ### 标题 和 **### 标题**。
            const normalized: string = text.trim()
                .replace(/^\*\*(.*?)\*\*$/, "$1");

            const question = normalized.match(/^###\s+(.+?)\s*#*\s*$/);

            if (question)
            {
                title = question[1];
            }

            if (/^####\s+答案\s*#*\s*$/.test(normalized))
            {
                positions.push({ offset, title });
            }
        }

        offset += line.length;
    }

    return positions;
}


/** 0 → a，25 → z，26 → aa。 */
function letterLabel(index: number): string
{
    let value: number = index + 1;
    let result: string = "";

    while (value > 0)
    {
        value--;
        result = String.fromCharCode(97 + value % 26) + result;
        value = Math.floor(value / 26);
    }

    return result;
}


/** 优先匹配完整文件名，再匹配数字或字母编号。 */
function parseSelection(input: string, files: string[]): string | null
{
    const exact = files.find(file => file === input);

    if (exact !== undefined)
    {
        return exact;
    }

    if (/^\d+$/.test(input))
    {
        return files[Number(input) - 1] ?? null;
    }

    const lower: string = input.toLowerCase();
    const index: number = files.findIndex(
        (_, i) => letterLabel(i) === lower
    );

    return index >= 0 ? files[index] : null;
}


function escapeAttribute(value: string): string
{
    return value.replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}


/** 将 public 下的实际文件路径转换成浏览器地址。 */
function getDownloadUrl(filePath: string): string
{
    const relative: string = path.relative(PUBLIC_ROOT, filePath);

    return "/" + relative.split(path.sep)
        .map(segment => encodeURIComponent(segment))
        .join("/");
}


/** 输入附件目录，只列举这一层的文件，不进入子目录。 */
async function selectDirectory(
    rl: ReadlineInterface
): Promise<{ directory: string; files: string[] } | null>
{
    while (true)
    {
        console.log("附件目录：public/Download/WpCTF/（输入后续路径，回车跳过本文）");
        const input: string = (await rl.question("> "))
            .trim()
            .replace(/^"(.*)"$/, "$1");

        if (!input)
        {
            return null;
        }

        const directory: string = path.resolve(DOWNLOAD_ROOT, input);
        const relative: string = path.relative(DOWNLOAD_ROOT, directory);

        if (
            relative === ".." ||
            relative.startsWith(`..${path.sep}`) ||
            path.isAbsolute(relative)
        )
        {
            console.log("目录不能超出 public/Download/WpCTF。");
            continue;
        }

        if (
            !fs.existsSync(directory) ||
            !fs.statSync(directory).isDirectory()
        )
        {
            console.log("目录不存在，请重新输入。");
            continue;
        }

        const files: string[] = fs.readdirSync(
            directory, { withFileTypes: true }
        )
            .filter(item => item.isFile())
            .map(item => item.name)
            .sort((a, b) => a.localeCompare(b, "zh-CN"));

        if (files.length === 0)
        {
            console.log("该目录没有文件，文件夹不会计入。");
            continue;
        }

        console.log("\n可选附件：");

        files.forEach((file, index) =>
        {
            console.log(
                `  ${index + 1}/${letterLabel(index)}  ${file}`
            );
        });

        return { directory, files };
    }
}


async function processFile(
    rl: ReadlineInterface,
    filePath: string
): Promise<void>
{
    const original: string = fs.readFileSync(filePath, "utf8");
    const positions: AnswerPosition[] = findAnswerPositions(original);

    console.log(`\n文章：${path.relative(PROJECT_ROOT, filePath)}`);

    if (positions.length === 0)
    {
        console.log("没有找到 #### 答案，跳过。");
        return;
    }

    const selection = await selectDirectory(rl);

    if (!selection)
    {
        return;
    }

    const { directory, files } = selection;
    const newline: string = original.includes("\r\n") ? "\r\n" : "\n";

    let updated: string = "";
    let cursor: number = 0;
    let inserted: number = 0;

    for (let index = 0; index < positions.length; index++)
    {
        const answer = positions[index];

        updated += original.slice(cursor, answer.offset);
        cursor = answer.offset;

        console.log(
            `\n[${index + 1}/${positions.length}] ${answer.title}`
        );

        while (true)
        {
            console.log("选择附件：数字 / 字母 / 完整文件名；回车跳过");
            const input: string = (await rl.question("> ")).trim();

            if (!input)
            {
                break;
            }

            const fileName = parseSelection(input, files);

            if (fileName === null)
            {
                console.log("没有找到对应文件，请重新输入。");
                continue;
            }

            const href: string = escapeAttribute(
                getDownloadUrl(path.join(directory, fileName))
            );

            updated += [
                "",
                `<a href="${href}" download>`,
                "    文件",
                "</a>",
                "",
                "",
            ].join(newline);

            inserted++;
            console.log(`已选择：${fileName}`);
            break;
        }
    }

    updated += original.slice(cursor);

    if (inserted > 0)
    {
        fs.writeFileSync(filePath, updated, "utf8");
        console.log(`已更新：${filePath}，插入 ${inserted} 个下载链接`);
    }
    else
    {
        console.log("未选择附件，文章保持不变。");
    }
}


export async function entry(): Promise<void>
{
    const files: string[] = getMarkdownFiles(PREPARE_ROOT);

    console.log(`[CTF Download] 找到 ${files.length} 个文件`);

    if (files.length === 0)
    {
        return;
    }

    const rl = readline.createInterface(
    {
        input: process.stdin,
        output: process.stdout,
    });

    try
    {
        for (const file of files)
        {
            await processFile(rl, file);
        }
    }
    finally
    {
        rl.close();
    }

    console.log("\n[CTF Download] 完成");
}
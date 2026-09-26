import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

const SRC_DIR: string = path.resolve(__dirname, "../../src");
const EDITOR_DIR: string = path.resolve(__dirname, "..");

const IGNORED_FILES: Set<string> = new Set([
    path.resolve(__filename),
]);


function getAllFiles(dir: string, extensions: string[]): string[]
{
    const files: string[] = [];

    function traverse(currentDir: string): void
    {
        const items: string[] = fs.readdirSync(currentDir);

        for (const item of items)
        {
            // 跳过 _ 开头的文件/目录
            if (item.startsWith("_"))
            {
                continue;
            }

            const fullPath: string = path.join(currentDir, item);
            const stat: fs.Stats = fs.statSync(fullPath);

            if (stat.isDirectory())
            {
                traverse(fullPath);
            }
            else if (stat.isFile())
            {
                const ext: string = path.extname(item);
                if (extensions.includes(ext))
                {
                    files.push(fullPath);
                }
            }
        }
    }

    traverse(dir);
    return files;
}


/**
 * 判断 / 是正则的开始还是除法
 * 依据：前一个非空白字符是否属于"运算符或括号"
 */
function isRegexStart(prev: string): boolean
{
    if (prev === "") return true;
    return "(,=:[!&|?{};+-*/%<>~^".includes(prev);
}


function replaceSingleQuotes(content: string): string
{
    const result: string[] = [];
    let i: number = 0;
    const len: number = content.length;
    let lastNonWhitespace: string = "";

    while (i < len)
    {
        const ch: string = content[i];
        const next: string = content[i + 1];

        // 1. 行注释 // ...
        if (ch === "/" && next === "/")
        {
            const end: number = content.indexOf("\n", i);
            if (end === -1)
            {
                result.push(content.slice(i));
                break;
            }
            result.push(content.slice(i, end));
            i = end;
            continue;
        }

        // 2. 块注释 /* ... */
        if (ch === "/" && next === "*")
        {
            const end: number = content.indexOf("*/", i + 2);
            if (end === -1)
            {
                result.push(content.slice(i));
                break;
            }
            result.push(content.slice(i, end + 2));
            i = end + 2;
            continue;
        }

        // 3. 单引号字符串 → 替换成双引号
        if (ch === "'")
        {
            const inner: string[] = [];
            let j: number = i + 1;

            while (j < len)
            {
                if (content[j] === "\\")
                {
                    inner.push(content[j], content[j + 1]);
                    j += 2;
                    continue;
                }
                if (content[j] === "'")
                {
                    break;
                }
                inner.push(content[j]);
                j++;
            }

            const innerStr: string = inner.join("");
            // 把内部未转义的 " 转义，避免和外层 " 冲突
            const escaped: string = innerStr.replace(/(?<!\\)"/g, '\\"');

            result.push(`"${escaped}"`);
            i = j + 1;
            lastNonWhitespace = '"';
            continue;
        }

        // 4. 双引号字符串 → 原样保留
        if (ch === '"')
        {
            const start: number = i;
            let j: number = i + 1;
            while (j < len)
            {
                if (content[j] === "\\")
                {
                    j += 2;
                    continue;
                }
                if (content[j] === '"')
                {
                    break;
                }
                j++;
            }
            result.push(content.slice(start, j + 1));
            i = j + 1;
            lastNonWhitespace = '"';
            continue;
        }

        // 5. 模板字符串 `...` → 原样保留
        if (ch === "`")
        {
            const start: number = i;
            let j: number = i + 1;
            while (j < len)
            {
                if (content[j] === "\\")
                {
                    j += 2;
                    continue;
                }
                if (content[j] === "`")
                {
                    break;
                }
                j++;
            }
            result.push(content.slice(start, j + 1));
            i = j + 1;
            lastNonWhitespace = "`";
            continue;
        }

        // 6. 正则字面量 /.../flags → 原样保留
        if (ch === "/" && isRegexStart(lastNonWhitespace))
        {
            const start: number = i;
            let j: number = i + 1;
            let inCharClass: boolean = false;

            while (j < len)
            {
                const c: string = content[j];

                if (c === "\\")
                {
                    j += 2;
                    continue;
                }
                if (c === "[")
                {
                    inCharClass = true;
                    j++;
                    continue;
                }
                if (c === "]" && inCharClass)
                {
                    inCharClass = false;
                    j++;
                    continue;
                }
                if (c === "/" && !inCharClass)
                {
                    break;
                }
                if (c === "\n")
                {
                    break;
                }
                j++;
            }

            j++;

            while (j < len && /[a-zA-Z]/.test(content[j]))
            {
                j++;
            }

            result.push(content.slice(start, j));
            i = j;
            lastNonWhitespace = "/";
            continue;
        }

        // 7. 普通字符
        result.push(ch);
        if (!/\s/.test(ch))
        {
            lastNonWhitespace = ch;
        }
        i++;
    }

    return result.join("");
}


function processFile(filePath: string): boolean
{
    const content: string = fs.readFileSync(filePath, "utf-8");
    const newContent: string = replaceSingleQuotes(content);

    if (content !== newContent)
    {
        fs.writeFileSync(filePath, newContent, "utf-8");
        return true;
    }
    return false;
}


function entry(): void
{
    const extensions: string[] = [".ts", ".js", ".astro", ".mjs"];

    const srcFiles: string[] = getAllFiles(SRC_DIR, extensions);
    const editorFiles: string[] = getAllFiles(EDITOR_DIR, extensions);

    const allFiles: string[] = [...srcFiles, ...editorFiles];

    console.log(`Found ${allFiles.length} files to process.`);

    const modifiedFiles: string[] = [];

    for (const file of allFiles)
    {
        if (IGNORED_FILES.has(file))
        {
            continue;
        }
        if (processFile(file))
        {
            modifiedFiles.push(file);
        }
    }

    if (modifiedFiles.length > 0)
    {
        console.log(`\n${modifiedFiles.length} files need to modify:`);
        for (const file of modifiedFiles)
        {
            console.log(`  - ${file}`);
        }
        console.log("\nAll files have been processed.");
    }
    else
    {
        console.log("\nNo files need to modify.");
    }
}


export { entry };
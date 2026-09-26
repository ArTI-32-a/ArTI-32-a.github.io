import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

const SRC_DIR: string = path.resolve(__dirname, "../../src");
const EDITOR_DIR: string = path.resolve(__dirname, "..");

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

function replaceSingleQuotes(content: string): string
{
    // 匹配 'xxx' 形式，xxx 里允许 \' 这种转义
    // (?:[^'\\]|\\.)* 表示：要么是非引号非反斜杠的普通字符，要么是 \ 后跟任意字符（转义序列）
    const regex: RegExp = /'(?:[^'\\]|\\.)*'/g;

    return content.replace(regex, (match: string): string =>
    {
        // 去掉外层两个单引号
        const inner: string = match.slice(1, -1);

        // 把内部未转义的 " 转成 \"，因为外层要从 ' 变 "
        const escaped: string = inner.replace(/"/g, '\\"');

        return `"${escaped}"`;
    });
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
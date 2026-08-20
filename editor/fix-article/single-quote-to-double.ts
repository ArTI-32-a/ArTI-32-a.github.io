import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

const SRC_DIR: string = path.resolve(__dirname, "../../src");

function getAllFiles(dir: string, extensions: string[]): string[]
{
    const files: string[] = [];

    function traverse(currentDir: string): void
    {
        const items: string[] = fs.readdirSync(currentDir);

        for (const item of items)
        {
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
    const lines: string[] = content.split("\n");
    const result: string[] = [];

    for (const line of lines)
    {
        let newLine: string = line;

        const stringLiteralRegex: RegExp = /'([^'\\]*(\\.[^'\\]*)*)'/g;
        newLine = newLine.replace(stringLiteralRegex, (_match: string, p1: string) =>
        {
            return `"${p1}"`;
        });

        result.push(newLine);
    }

    return result.join("\n");
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
    const extensions: string[] = [".ts", ".js", ".astro"];
    const files: string[] = getAllFiles(SRC_DIR, extensions);

    console.log(`Found ${files.length} files to process.`);

    const modifiedFiles: string[] = [];

    for (const file of files)
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
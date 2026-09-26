import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";


function cleanFontTags(content: string): string
{
    let result: string = content.replace(/<font[^>]*>/gi, (tag: string): string =>
    {
        return tag.replace(/\s+style="[^"]*color[^"]*"/gi, "");
    });

    result = result.replace(/<font\s*>([\s\S]*?)<\/font>/gi, "$1");

    return result;
}


function processDir(directory: string): void
{
    const entries = readdirSync(directory, { withFileTypes: true });

    for (const entry of entries)
    {
        const fullPath: string = join(directory, entry.name);

        if (entry.isDirectory())
        {
            processDir(fullPath);
            continue;
        }

        if (!entry.isFile() || !entry.name.endsWith(".md"))
        {
            continue;
        }

        const original: string = readFileSync(fullPath, "utf-8");
        const cleaned: string = cleanFontTags(original);

        if (original === cleaned)
        {
            console.log(`未变化: ${fullPath}`);
            continue;
        }

        writeFileSync(fullPath, cleaned, "utf-8");
        console.log(`已处理: ${fullPath}`);
    }
}


function entry(collectionName: string): void
{
    const currentDir: string = dirname(fileURLToPath(import.meta.url));
    const projectRoot: string = join(currentDir, "..", "..");
    const targetDir: string = join(projectRoot, "src", "content", collectionName, "_Prepare");

    console.log(`[${collectionName}] 处理目录: ${targetDir}`);
    processDir(targetDir);
    console.log(`[${collectionName}] 完成`);
}


export { entry };
import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";


/**
 * 删除 <details> 折叠框：
 * - details 标签本身删掉
 * - 内部所有 HTML 标签删掉（img 除外，前后补换行）
 * - 文字全部保留
 */
function removeDetails(content: string): string
{
    return content.replace(
        /<details[^>]*>([\s\S]*?)<\/details>/gi,
        (_, inner: string): string =>
        {
            let processed: string = inner;

            // 1. <br> → 换行
            processed = processed.replace(/<br\s*\/?>/gi, "\n");

            // 2. </p><p> 之间补换行（避免两段粘一起）
            processed = processed.replace(/<\/p>\s*<p[^>]*>/gi, "\n");

            // 3. 删其他标签（img 除外）
            processed = processed.replace(/<[^>]*>/g, (tag: string): string =>
            {
                if (/^<img\b/i.test(tag))
                {
                    return `\n${tag}\n`;
                }
                return "";
            });

            processed = processed.replace(/\n{3,}/g, "\n\n");
            return processed;
        }
    );
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
        const cleaned: string = removeDetails(original);

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
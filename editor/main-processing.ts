import { entry as getPictureFromUrl } from "./proc-wp/image-processor.ts";
import { entry as deleteArticleFont } from "./proc-wp/clean-font-tags.ts";
import { entry as removeMdDetails } from "./proc-wp/remove-details.ts";
import { entryCTF as procCTFFrontmatter, entryDF as procDFFrontmatter } from "./proc-wp/add-frontmatter.ts";

import { entry as addDownloads } from "./proc-wp/add-download-html.ts"


async function main()
{
    console.log("processing files");

    for (const collectionName of ["CTF", "DF"])
    {
        console.log(`\n===== delete details from ${collectionName}:`);
        await removeMdDetails(collectionName);

        console.log(`\n===== get pictures from ${collectionName}:`);
        await getPictureFromUrl(collectionName);

        console.log(`\n===== delete color font from ${collectionName}:`);
        await deleteArticleFont(collectionName);
    }

    console.log("\n===== processing frontmatter:");
    await procCTFFrontmatter();
    await procDFFrontmatter();

    console.log("\n===== processing downloads:");
    await addDownloads();
}

main()
    .then(() =>
    {
        console.log("\n全部处理完成");
    })
    .catch((error: unknown) =>
    {
        console.error("处理失败：", error);
        process.exitCode = 1;
    })
    .finally(() =>
    {
        // 所有交互完成后，不再等待标准输入。
        process.stdin.pause();

        console.log("剩余活动资源：", process.getActiveResourcesInfo());
    });;
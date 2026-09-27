import { entry as getPictureFromUrl } from "./proc-article/image-processor.ts";
import { entry as deleteArticleFont } from "./proc-article/clean-font-tags.ts";
import { entry as removeMdDetails } from "./proc-article/remove-details.ts";
import { entryCTF as procCTFFrontmatter, entryDF as procDFFrontmatter } from "./proc-article/add-frontmatter.ts";


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
}

main();
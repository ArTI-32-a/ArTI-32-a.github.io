import { entry as getPictureFromUrl } from "./proc-article/image-processor.ts";

import { entry as deleteArticleFont } from "./proc-article/clean-font-tags.ts";


async function main()
{
    console.log("processing files");

    for (const collectionName of ["CTF", "DF"])
    {
        console.log(`===== get pictures from ${collectionName}:`);
        await getPictureFromUrl(collectionName);

        console.log(`\n===== delete color font from ${collectionName}:`);
        await deleteArticleFont(collectionName);
    }
}

main();
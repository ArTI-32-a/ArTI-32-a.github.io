import { entry as fixSvg } from "./fix-svg/box-svg.mjs";

import { entry as fixYuqueMd } from "./fix-yuquemd_img/image-processor.ts";
import { entry as fixArticleFont } from "./fix-article/clean-font-tags.ts";

import { entry as fixQuote } from "./fix-article/single-quote-to-double.ts";

import { entry as getCtfQuestions } from "./get-data/wp-ctf-questions.ts"; 
import { entry as getCtfCatalogs } from "./get-data/wp-ctf-catalogs.ts"

async function main()
{
    console.log("===== svg:");
    await fixSvg();

    console.log("\n===== yuque:");
    await fixYuqueMd();
    await fixArticleFont();
    
    console.log("\n===== article:");
    await fixQuote();

    console.log("\n===== data:");
    await getCtfQuestions();
    await getCtfCatalogs();
}

main();
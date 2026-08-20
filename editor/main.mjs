import { entry as fixSvg } from "./fix-svg/box-svg.mjs";
import { entry as fixYuqueMd } from "./fix-yuquemd_img/image-processor.ts";
import { entry as fixQuote } from "./fix-article/single-quote-to-double.ts";

function main()
{
    console.log("===== svg:");
    fixSvg();

    console.log("\n===== yuque:");
    fixYuqueMd();
    
    console.log("\n===== quote:");
    fixQuote();
}

main();
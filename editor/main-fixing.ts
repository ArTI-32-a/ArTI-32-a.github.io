import { entry as fixSvg } from "./fix-picture/box-svg.mjs";

import { entry as fixQuote } from "./fix-article/single-quote-to-double.ts";




async function main()
{
    console.log("===== svg:");
    console.log("----- add or change preserveAspectRatio:");
    await fixSvg();

    console.log("\n===== article:");
    console.log("----- change \' to \":");
    await fixQuote();
}

main();
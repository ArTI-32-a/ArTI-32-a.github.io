import { entry as fixSvg } from "./fix-picture/box-svg.mjs";





async function main()
{
    console.log("===== svg:");
    console.log("----- add or change preserveAspectRatio:");
    await fixSvg();

}

main();

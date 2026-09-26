import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

// 下面是对规则的定义

const IEWpSchema = z.object(
{
    title: z.string(),
    pubDate: z.date(),
    tags: z.array(z.string()).optional(),
});

const WpScheme = IEWpSchema.extend(
{
    pubDate: z.date().optional(),
    tags: z.array(z.string()),

    type: z.enum(["Misc", "Crypto", "Reverse", "Web", "PWN", "Digit Safety"]),
    status: z.enum(["draft", "published"]),
});

const WpRefined = (data: { status: string; pubDate?: Date }) => 
{
    if (data.status === "published" && !data.pubDate) 
    {
        return false;
    }
    return true;
};


const DFScheme = WpScheme.extend(
{
    title: z.string().regex(/^\d+ - [a-zA-Z\u4e00-\u9fa5_]+( - [a-zA-Z\u4e00-\u9fa5_]+)?$/),
}).refine(WpRefined);

const CtfScheme = WpScheme.extend(
{
    title: z.string().regex(/^(Reverse|Misc|Crypto|Pwn|PWN|Web|Digit Safety|\d+\.\d+\s+.+)$/),
}).refine(WpRefined);
    
// 下面是开头定义

const CtfWpCollection = defineCollection(
{
    // type: "content",
    loader: glob(
    {
        pattern: "**/*.md",
        base: new URL("./content/CTF", import.meta.url).pathname,
    }),
    schema: CtfScheme,
});

const DFWpCollection = defineCollection(
{
    // type: "content",
    loader: glob(
    {
        pattern: "**/*.md",
        base: new URL("./content/DF", import.meta.url).pathname,
    }),
    schema: DFScheme,
});

// 下面是导出

const collections =
{
    "CTF": CtfWpCollection,
    "DF": DFWpCollection,
};

export { collections };
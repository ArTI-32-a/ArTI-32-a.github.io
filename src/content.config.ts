import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

// 下面是对规则的定义

const IEBaseSchema = z.object(
{
    title: z.string(),
    tags: z.array(z.string()),
    
    status: z.enum(["draft", "published"]),
    pubDate: z.date().optional(),
});

const BaseRefined = (data: { status: string; pubDate?: Date }) => 
{
    if (data.status === "published" && !data.pubDate) 
    {
        return false;
    }
    return true;
};

export type BaseFrontmatter = z.infer<typeof IEBaseSchema>;







const DFSchema = IEBaseSchema.extend(
{
    title: z.string().regex(/^\d+ - [a-zA-Z\u4e00-\u9fa5_]+( - [a-zA-Z\u4e00-\u9fa5_]+)?$/),
}).refine(BaseRefined);

const CtfSchema = IEBaseSchema.extend(
{
    title: z.string().regex(/^(Reverse|Misc|Crypto|Pwn|PWN|Web|Digit Safety|\d+\.\d+\s+.+)$/),

    type: z.enum(["Misc", "Crypto", "Reverse", "Web", "PWN", "Digit Safety"]),
}).refine(BaseRefined);



const ExpSchema = IEBaseSchema.extend(
{
    title: z.string(),

    startDate: z.date(),
    pubDate: z.date(),
});

const KnwSchema = IEBaseSchema.extend(
{
    title: z.string(),

    subject: z.string(),
}).refine(BaseRefined);



// 下面是开头定义



const CtfWpCollection = defineCollection(
{
    // type: "content",
    loader: glob(
    {
        pattern: 
        [
            "**/*.md",
            "!**/_*/**",
            "!**/_*.md",
        ],
        base: new URL("./content/CTF", import.meta.url),
    }),
    schema: CtfSchema,
});

const DFWpCollection = defineCollection(
{
    // type: "content",
    loader: glob(
    {
        pattern: 
        [
            "**/*.md",
            "!**/_*/**",
            "!**/_*.md",
        ],
        base: new URL("./content/DF", import.meta.url),
    }),
    schema: DFSchema,
});



const ExpCollection = defineCollection(
{
    loader: glob(
    {
        pattern: 
        [
            "**/*.md",
            "!**/_*/**",
            "!**/_*.md",
        ],
        base: new URL("./content/Exp", import.meta.url),
    }),
    schema: ExpSchema
});

const KnwCollection = defineCollection(
{
    loader: glob(
    {
        pattern: 
        [
            "**/*.md",
            "!**/_*/**",
            "!**/_*.md",
        ],
        base: new URL("./content/Knw", import.meta.url),
    }),
    schema: KnwSchema
});




// 下面是导出

const collections =
{
    "CTF": CtfWpCollection,
    "DF": DFWpCollection,
    "Exp": ExpCollection,
    "Knw": KnwCollection,
};

export { collections };
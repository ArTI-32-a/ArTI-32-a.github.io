import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { getCollection } from "astro:content";
import { dirname, join, relative } from "path";
import { remark } from "remark";
import { visit } from "unist-util-visit";
import type { Heading } from "mdast";

import type { WPCTFFormatter, WPInfo } from "@/utils/Common/Type";





let questionsCache: Record<string, string[] | undefined> = {};



function isValidConData(data: unknown): data is WPCTFFormatter
{
    if (typeof data !== "object" || data === null)
    {
        return false;
    }


    // 检查 title
    if (!("title" in data) || typeof data.title !== "string")
    {
        return false;
    }


    // 检查 tags
    if (!("tags" in data) || !Array.isArray(data.tags) || !data.tags.every((tag) => typeof tag === "string"))
    {
        return false;
    }


    // 检查 type
    if (!("type" in data) || typeof data.type !== "string")
    {
        return false;
    }

    const allowedTypes = ["Misc", "Crypto", "Reverse", "Web", "PWN", "Digit Safety"] as const;
    if (!allowedTypes.includes(data.type as any))
    {
        return false;
    }


    // 检查 status
    if (!("status" in data) || typeof data.status !== "string")
    {
        return false;
    }

    const allowedStatuses = ["draft", "published"] as const;
    if (!allowedStatuses.includes(data.status as any))
    {
        return false;
    }


    // 检查 pubDate
    if ("pubDate" in data && !(data.pubDate instanceof Date))
    {
        return false;
    }
    
    if (data.status === "published" && !("pubDate" in data))
    {
        return false;
    }

    
    return true;
}



function getQuestions(markdown: string, fileId: string): string[] | undefined
{
    function stripHtmlTags(text: string): string
    {
        return text.replace(/<[^>]*>/g, "").trim();
    }

    const cached = questionsCache[fileId];
    if (cached !== undefined)
    {
        console.log("success in cache:\n", fileId, "\n")
        return cached; // 缓存命中，直接返回
    }
    console.log("failed in cache\n", fileId, "\n");

    let minDepth = Infinity;
    const texts: string[] = [];

    const ast = remark().parse(markdown);

    visit(ast, "heading", (node: Heading) =>
    {
        if (node.depth >= 2)
        {
            const raw = node.children
                .map((child) => ("value" in child ? child.value : ""))
                .join("")
                .trim();

            const text = stripHtmlTags(raw);

            if (text)
            {
                if (node.depth < minDepth)
                {
                    minDepth = node.depth;
                    texts.length = 0;
                    texts.push(text);
                }
                else if (node.depth === minDepth)
                {
                    texts.push(text);
                }
            }
        }
    });

    return texts.length > 0 ? texts : undefined;
}

async function buildTree(collectionName: "CTF"): Promise<WPInfo[]>
{
    try
    {
        const cachePath = join(process.cwd(), "src/data/Content/WPs/CTF/questions.json");

        if (existsSync(cachePath))
        {
            const raw = readFileSync(cachePath, "utf-8");

            questionsCache = JSON.parse(raw);
        }
        else
        {
            console.warn("[buildTree] 找不到文件");
        }
    }
    catch (e)
    {
        console.warn("[buildTree] 读取questions的json失败", e)
    }


    // 获取所有文章
    const allPosts = await getCollection(collectionName);

    const rootNodes: WPInfo[] = [];

    for (const post of allPosts)
    {
        // 分割路径
        const parts: string[] = post.id.split(/[\/\\]/);
        const fileName: string = parts.pop() ?? "";
        const fileNameWithoutExt: string = fileName.replace(/\.md$/, "");

        // 构建 href
        const href: string = `/wps/${collectionName}/${post.id.replace(/\.md$/, "")}`;

        let currentLevel: WPInfo[] = rootNodes;

        // 处理文件夹路径
        for (const folderName of parts)
        {
            let existingNode: WPInfo | undefined = currentLevel.find((node) => node.key === folderName);

            // 该目录不存在则新建目录
            if (!existingNode)
            {
                const newNode: WPInfo = {
                    key: folderName,
                    href: null,
                    data: null,
                    children: [],
                };
                currentLevel.push(newNode);
                existingNode = newNode;
            }

            // 该目录不存在子目录则新建子目录
            if (!existingNode.children)
            {
                existingNode.children = [];
            }
            currentLevel = existingNode.children;
        }

        
        console.log(post.id);

        if (isValidConData(post.data))
        {
            const data: WPCTFFormatter = 
            {
                title: post.data.title,
                pubDate: post.data.pubDate,
                tags: post.data.tags,

                type: post.data.type,
                status: post.data.status,

                questions: getQuestions(post.body || "", post.id),
            };

            currentLevel.push(
            {
                key: fileNameWithoutExt,
                href: href,
                data: data,
                children: null,
            });
        }
        else
        {
            // 如果数据无效，打印警告并跳过该文件（而不是静默崩溃）
            console.warn(
                `[WpTreeBuilder] 跳过无效的 CTF 文章: ${post.id}\n` +
                `  缺少必要字段 (title, tags, type, status) 或字段类型不正确。`
            );
            // 你也可以选择 throw new Error() 来强制中断
        }
    }


    // 排序
    function sortNodes(nodes: WPInfo[]): void
    {
        nodes.sort((a, b) =>
        {
            // 判断是否为文件夹（有 children 且长度 > 0 或 children 不为 null）
            const aIsFolder = a.children !== null;
            const bIsFolder = b.children !== null;

            // 文件夹优先于文件
            if (aIsFolder && !bIsFolder) return -1;
            if (!aIsFolder && bIsFolder) return 1;

            // 同为文件夹或同为文件，按名称字母序排列
            return a.key.localeCompare(b.key);
        });

        // 递归排序子节点
        for (const node of nodes)
        {
            if (node.children)
            {
                sortNodes(node.children);
            }
        }
    }
    // sortNodes(rootNodes);

    // console.log("\n\nnnn\n\n");
    // if (rootNodes[0].children)
    //     console.log(rootNodes[0].children[0].children);
    return rootNodes;
}


export { buildTree, getQuestions };
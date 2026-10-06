import type { BreadcrumbItem, WPInfo } from "@/utils/Common/Type";

interface ArticleBreadcrumbOptions
{
    tree: WPInfo[];
    pathname: string;
    collectionName: string;
    articleTitle: string;
    catalogHref?: string;
}

function normalizePath(path: string): string
{
    let decoded = path;

    try
    {
        decoded = decodeURIComponent(path);
    }
    catch
    {
        // 非法编码时保留原路径。
    }

    return decoded.replace(/\/+$/, "");
}

export function getArticleBreadcrumb(
    {
        tree,
        pathname,
        collectionName,
        articleTitle,
        catalogHref = "/wps/acat",
    }: ArticleBreadcrumbOptions
): BreadcrumbItem[]
{
    const target = normalizePath(pathname);

    function findParents(nodes: WPInfo[]): string[] | null
    {
        for (const node of nodes)
        {
            if (node.href && normalizePath(node.href) === target)
            {
                // 找到当前文章，当前层没有需要继续添加的父目录。
                return [];
            }

            if (node.children)
            {
                const parents = findParents(node.children);

                if (parents !== null)
                {
                    return [node.key, ...parents];
                }
            }
        }

        return null;
    }

    const folders = findParents(tree) ?? [];

    return [
        {
            label: collectionName,
            href: catalogHref,
        },
        ...folders.map(label => ({
            label,
            href: catalogHref,
        })),
        {
            label: articleTitle,
        },
    ];
}
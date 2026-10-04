// import * as T from "./Type.d.ts";
import type
{
    ContentBlock,
    ContactsData
}
from "./Type";

function isContentBlock(data: unknown): data is ContentBlock
{
    if (typeof data !== "object" || data === null) return false;
    if (!("type" in data) || typeof data.type !== "string") return false;

    switch (data.type)
    {
        case "title":
            return "level" in data && typeof data.level === "number"
                && "text" in data && typeof data.text === "string";

        case "text":
            return "text" in data && typeof data.text === "string";

        case "paragraph":
            if (!("children" in data) || !Array.isArray(data.children)) return false;
            return data.children.every(child => isContentBlock(child));

        case "image":
            if (!("src" in data) || typeof data.src !== "string") return false;
            if ("alt" in data && data.alt !== undefined && typeof data.alt !== "string") return false;
            return true;

        case "link":
            return "text" in data && typeof data.text === "string"
                && "href" in data && typeof data.href === "string";

        case "other":
            return "text" in data && typeof data.text === "string";

        default:
            return false;
    }
}

function isContentBlockArray(data: unknown): data is ContentBlock[]
{
    if (!Array.isArray(data)) return false;
    return data.every(item => isContentBlock(item));
}

function isContactsData(data: unknown): data is ContactsData
{
    if (typeof data !== "object" || data === null) return false;

    for (const value of Object.values(data))
    {
        if (!isContentBlockArray(value)) return false;
    }
    return true;
}

export { isContactsData };
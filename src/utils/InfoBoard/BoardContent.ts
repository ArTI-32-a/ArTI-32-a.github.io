import contactsRaw from "@/data/InfBoard/contacts.json";

import type { ContactsData, ContentBlock } from "@/utils/Common/Type";
import { isContactsData } from "@/utils/Common/TGuards";

const contacts: ContactsData =
    isContactsData(contactsRaw) ? contactsRaw : {};

export function getBoardContent(index: number)
{
    const blocks: ContentBlock[] = contacts[String(index)] ?? [];

    const firstTitle = blocks.find(block => block.type === "title");

    const title: string = firstTitle?.type === "title"
        ? firstTitle.text
        : "";

    return { blocks, title };
}
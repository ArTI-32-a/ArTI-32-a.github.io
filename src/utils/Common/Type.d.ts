import { Common as C } from "@/utils/Common/Common"; 

export interface WPFrontmatter
{
    title: string;
    pubDate?: Date;
    tags: string[];
    
    type?: string;

    status: "draft" | "published";
    questions?: string[];
}

export interface WPCTFFrontmatter extends WPFrontmatter
{
    type: "Misc" | "Crypto" | "Reverse" | "Web" | "PWN" | "Digit Safety";
}

export interface WPInfo
{
    key: string;
    href: string | null;
    data: WPFrontmatter | null;
    children: WPInfo[] | null;
}



export interface WpBtnState
{
    completed: boolean;
    disabled: boolean;
}

export interface WpBtnStateDetail
{
    event: string;
    state: Partial<WpBtnState>;
}



export type ContentBlock =
    | { type: "title"; level: number; text: string }
    | { type: "text"; text: string }
    | { type: "paragraph"; children: ContentBlock[] }
    | { type: "image"; src: string; alt?: string }
    | { type: "link"; text: string; href: string }
    | { type: "other"; text: string };

export type ContactsData = Record<string, ContentBlock[]>;
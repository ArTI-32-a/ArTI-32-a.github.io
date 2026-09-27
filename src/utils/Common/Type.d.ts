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
    data: WPFormatter | null;
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
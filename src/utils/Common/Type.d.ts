import { Common as C } from "@/utils/Common/Common"; 

export interface WPCTFFormatter
{
    title: string;
    pubDate?: Date;
    tags: string[];

    type: "Misc" | "Crypto" | "Reverse" | "Web" | "PWN" | "Digit Safety";
    status: "draft" | "published";

    questions?: string[];
}

export interface WPInfo
{
    key: string;
    href: string | null;
    data: WPCTFFormatter | null;
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
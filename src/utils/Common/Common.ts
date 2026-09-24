import type { WpBtnState } from "@/utils/Common/Type"

class Common
{
    static readonly WP_CAT_BTN_PADDING: number = 30

    static readonly WP_CTF_HERO_SHRINKING_THRESHOLD: number = 200;

    static readonly WP_BTN_DEFAULT_STATE: WpBtnState = 
    {
        completed: false,
        disabled: false,
    };

    static readonly WP_BTN_STATE_EVENT = "wp-btnmenu-state";
}

export { Common };
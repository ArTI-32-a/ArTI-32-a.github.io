import type { WpBtnStateDetail } from "@/utils/Common/Type"

import { Common as C } from "@/utils/Common/Common"; 


export class WpBtnStateEvent extends CustomEvent<WpBtnStateDetail>
{
    constructor(detail: WpBtnStateDetail)
    {
        super(EventName.WP_BTN_STATE_EVENT, { detail });
    }
}

export class CatalogJumpEvent extends CustomEvent<{ index: number }>
{
    constructor(index: number)
    {
        super("wp-catalog-jump", { detail: { index } });
    }
}

class EventName
{
    static readonly INF_MENU_OPEN_EVENT: string = "inf-menu-open";

    static readonly INF_MENU_CLOSE_EVENT: string = "inf-menu-closed";

    static readonly INF_BOARD_OPEN_EVENT: string = "inf-board-open";

    static readonly INF_BOARD_CLOSE_EVENT: string = "inf-board-close";

    // static readonly INF_BUTTON_CONTACT_CLICK_EVENT: string = "inf-contact-button-click";



    static readonly WP_CAT_SWITCH_EVENT: string = "wp-catalog-switch";

    static readonly WP_CAT_AUTO_SWITCH_EVENT: string = "wp-catalog-auto-switch";

    static readonly WP_CAT_JUMP_EVENT: string = "wp-catalog-jump";

    static readonly WP_CAT_TITLE_COMPLETED_EVENT: string = "wp-catalog-title-switch-completed";

    static readonly WP_CAT_TREE_COMPLETED_EVENT: string = "wp-catalog-tree-switch-completed";

    static readonly WP_CAT_SEARCH_EVENT: string = "wp-catalog-search";

    static readonly WP_BTN_STATE_EVENT: string = "wp-btnmenu-state";
}


export { EventName };
import type { WpBtnStateDetail } from "@/utils/Common/Type"

import { Common as C } from "@/utils/Common/Common"; 


export class WpBtnStateEvent extends CustomEvent<WpBtnStateDetail>
{
    constructor(detail: WpBtnStateDetail)
    {
        super(EventName.WP_BTN_STATE_EVENT, { detail });
    }
}

class EventName
{
    static readonly WP_CAT_SWITCH_EVENT: string = "wp-catalog-switch";

    static readonly WP_CAT_TITLE_COMPLETED_EVENT: string = "wp-catalog-title-switch-completed";

    static readonly WP_CAT_TREE_COMPLETED_EVENT: string = "wp-catalog-tree-switch-completed";

    static readonly WP_CAT_SEARCH_EVENT: string = "wp-catalog-search";

    static readonly WP_BTN_STATE_EVENT: string = "wp-btnmenu-state";
}


export { EventName };
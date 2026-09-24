import type { WpBtnStateDetail } from "@/utils/Common/Type"

import { Common as C } from "@/utils/Common/Common"; 


export class WpBtnStateEvent extends CustomEvent<WpBtnStateDetail>
{
    constructor(detail: WpBtnStateDetail)
    {
        super(C.WP_BTN_STATE_EVENT, { detail });
    }
}
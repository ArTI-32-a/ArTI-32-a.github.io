import type { WpBtnState } from "@/utils/Common/Type"

class Common
{
    static readonly PX_EPSILON: number = 1




    static readonly WP_CAT_BEAM_TOP_X: number = 90; // %

    static readonly WP_CAT_BEAM_BOTTOM_X: number = 60; // %

    static readonly WP_CAT_BEAM_MIN_TOP_X: number = 25; // %

    static readonly WP_CAT_BEAM_TRIGGER_TOP_X: number = 50; // %

    /**
     * 判定是否在斜线上 单位px
     */
    static readonly WP_CAT_ON_BEAM_INTERVAL: number = 100 // px

    /**
     * 一个最短切换时长，completed 事件再快也要等够时间才让光柱拉杆回弹
     */
    static readonly WP_CAT_BEAM_MIN_SWITCH_DURATION_MS = 200; // ms

    /**
     * 上面那个是最短时间，这个就是超时时间，超时了直接往回弹
     */
    static readonly WP_CAT_BEAM_SWITCH_TIMEOUT_MS = 800; // ms

    /**
     * 用来放大的，减弱svg锯齿效果
     */
    static readonly WP_CAT_SVG_SCALE: number = 10;

    static readonly WP_CAT_BTN_PADDING: number = 30;

    static readonly WP_CTF_HERO_SHRINKING_THRESHOLD: number = 200;

    static readonly WP_BTN_DEFAULT_STATE: WpBtnState = 
    {
        completed: false,
        disabled: false,
    };
}

export { Common };
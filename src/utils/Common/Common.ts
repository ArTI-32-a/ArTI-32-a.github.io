import type { WpBtnState } from "@/utils/Common/Type"

class Common
{
    // 后缀：MS 毫秒，V 视口单位，P 百分比或比例，PX 像素，REM 字体相对长度，DEG 角度，N 数量。
    // P 只表示用途，不转换数值：比例 0.5 仍为 0.5，百分比 50 仍为 50。
    // static readonly PX_EPSILON: number = 1
    // static readonly WP_CAT_BEAM_OFFSET_EPSILON_PX: number = 1
    static readonly WOR_EPSILON_PX: number = 1



    // static readonly SEARCH_TITLE_WEIGHT: number = 0.5;
    static readonly SEARCH_TITLE_WEIGHT_P: number = 0.5;

    // static readonly SEARCH_PER_TAG_WEIGHT: number = 0.2;
    static readonly SEARCH_TAG_WEIGHT_P: number = 0.2;

    // static readonly SEARCH_TAGS_WEIGHT: number = 0.5;
    static readonly SEARCH_TAGS_WEIGHT_P: number = 0.5;

    // static readonly SEARCH_OTHER_WEIGHT: number = 0.3;
    static readonly SEARCH_OTHER_WEIGHT_P: number = 0.3;

    // static readonly SEARCH_THRESHOLD: number = 0.15;
    static readonly SEARCH_THRESHOLD_P: number = 0.15;

    static readonly SEARCH_KIND_STRING_NAME: "str" = "str";

    static readonly SEARCH_KIND_ARRAY_NAME: "element" = "element";


    
    /**
     * 圆环数量
     */
    // static readonly INF_RING_COUNT: number = 2;
    static readonly INF_RING_COUNT_N: number = 2;

    /**
     * 圆环按钮覆盖的角度（度）
     */
    // static readonly INF_RING_BTN_ANGLE: number = 30;
    static readonly INF_RING_BTN_ANGLE_DEG: number = 30;

    /**
     * 按钮之间的角度间隙（度）
     */
    // static readonly INF_RING_BTN_GAP: number = 2;
    static readonly INF_RING_BTN_GAP_ANGLE_DEG: number = 2;

    /**
     * 一个环上几个按钮
     */
    // static readonly INF_RING_BTN_PER_RING: number = 360 / this.INF_RING_BTN_ANGLE;
    static readonly INF_RING_BTN_COUNT_N: number = 360 / this.INF_RING_BTN_ANGLE_DEG;

    /**
     * 滚轮每次调整的半径步长（vmin）
     */
    static readonly INF_RING_SCROLL_STEP_V: number = 2;

    /**
     * 菜单打开速度
     */
    // static readonly INF_RING_LERP_OPEN = 0.2;
    static readonly INF_RING_OPEN_LERP_P = 0.2;

    /**
     * 菜单关闭速度
     */
    // static readonly INF_RING_LERP_CLOSE = 0.08;
    static readonly INF_RING_CLOSE_LERP_P = 0.08;

    /**
     * 环每次变化时差异小于此值就吸附
     */
    static readonly INF_RING_EPSILON_V = 0.1;

    /** 圆环关闭时的半径容差；原来复用了 PX_EPSILON，数值保持为 1。 */
    static readonly INF_RING_CLOSE_EPSILON_V: number = 1;

    /**
     * 圆环最小半径（vmin）
     */
    static readonly INF_RING_RADIUS_MIN_V: number = 0;

    /**
     * 单环占用的半径区间（vmin）
     * 场上 N 个环时，最大半径 = N × 这个值
     */
    static readonly INF_RING_RADIUS_UNIT_V: number = 40;

    /**
     * 开始淡出的半径（vmin），低于此值环逐渐透明
     */
    static readonly INF_RING_FADE_START_V: number = 25;

    /**
     * 结束淡出的半径（vmin），低于此值环完全透明
     */
    static readonly INF_RING_FADE_END_V: number = 15;

    /**
     * 滚轮偏移量上限（vmin）
     * 0 表示初始状态就是最大，用户只能内收
     */
    static readonly INF_RING_OFFSET_MAX_V: number = 0;

    /**
     * 滚轮偏移量下限系数
     * 实际下限 = 系数 × RING_COUNT × UNIT
     * -1 表示"最外环缩到 0"
     */
    // static readonly INF_RING_OFFSET_MIN_RATIO: number = -1;
    static readonly INF_RING_OFFSET_MIN_RATIO_P: number = -1;

    /**
     * 圆环的半径跟厚度的比例
     */
    // static readonly INF_RING_THICKNESS_RATIO: number = 0.2;
    static readonly INF_RING_THICKNESS_RATIO_P: number = 0.2;

    /**
     * 圆环按钮和圆环的大小差别
     */
    // static readonly INF_RING_BTN_RATIO: number = 0.8;
    static readonly INF_RING_BTN_THICKNESS_RATIO_P: number = 0.8;

    /**
     * 圆环展开 / 收起时长（毫秒）
     */
    static readonly INF_RING_OPEN_DURATION_MS: number = 400;

    /**
     * 信息板从按钮飞向中心的时长（毫秒）
     */
    static readonly INF_BOARD_FLY_DURATION_MS: number = 400;

    /**
     * 信息板宽度（vw）
     */
    // static readonly INF_BOARD_WIDTH: number = 35;
    static readonly INF_BOARD_WIDTH_V: number = 35;

    /**
     * 信息板滑入 / 滑出时长（毫秒）
     */
    static readonly INF_BOARD_SLIDE_DURATION_MS: number = 400;



    /**
     * 按下按钮后，延迟多少毫秒进入wp/games/notes/world页面
     */
    static readonly IND_BTN_FEEDBACK_DELAY_MS: number = 200;

    /**
     * 几何体点击放大、缩小时的目标缩放
     */
    // static readonly IND_3D_CLICK_EXP_SCALE: number = 1.2;
    static readonly IND_3D_CLICK_EXPAND_SCALE_P: number = 1.2;
    // static readonly IND_3D_CLICK_SHR_SCALE: number = 0.9;
    static readonly IND_3D_CLICK_SHRINK_SCALE_P: number = 0.9;

    /**
     * 几何体放大 / 缩回的时长（毫秒），两段共用
     */
    static readonly IND_3D_CLICK_DURATION_MS: number = 200;

    /**
     * 几何体呼吸动画的上下限
     */
    // static readonly IND_3D_BREATH_MAX: number = 1.0;
    static readonly IND_3D_BREATH_SCALE_MAX_P: number = 1.0;
    // static readonly IND_3D_BREATH_MIN: number = 0.8;
    static readonly IND_3D_BREATH_SCALE_MIN_P: number = 0.8;

    /**
     * 几何体呼吸动画缩放值
     */
    // static readonly IND_3D_BREATH_DELTA: number = 0.0005;
    static readonly IND_3D_BREATH_SCALE_STEP_P: number = 0.0005;



    // static readonly WP_CAT_BEAM_TOP_X: number = 90; // %
    static readonly WP_CAT_BEAM_TOP_X_P: number = 90; // %

    // static readonly WP_CAT_BEAM_BOTTOM_X: number = 60; // %
    static readonly WP_CAT_BEAM_BOTTOM_X_P: number = 60; // %

    // static readonly WP_CAT_BEAM_MIN_TOP_X: number = 25; // %
    static readonly WP_CAT_BEAM_TOP_X_MIN_P: number = 25; // %

    // static readonly WP_CAT_BEAM_TRIGGER_TOP_X: number = 50; // %
    static readonly WP_CAT_BEAM_TOP_X_TRIGGER_P: number = 50; // %

    /**
     * 判定是否在斜线上，单位为视口宽度百分比。
     */
    // static readonly WP_CAT_ON_BEAM_INTERVAL: number = 7.5; // 对应 7.5vw
    static readonly WP_CAT_BEAM_HIT_DISTANCE_V: number = 7.5; // 对应 7.5vw

    /**
     * 一个最短切换时长，completed 事件再快也要等够时间才让光柱拉杆回弹
     */
    // static readonly WP_CAT_BEAM_MIN_SWITCH_DURATION_MS = 200; // ms
    static readonly WP_CAT_BEAM_SWITCH_MIN_DURATION_MS = 200; // ms

    /**
     * 上面那个是最短时间，这个就是超时时间，超时了直接往回弹
     */
    static readonly WP_CAT_BEAM_SWITCH_TIMEOUT_MS = 800; // ms

    /**
     * 用来放大的，减弱svg锯齿效果
     */
    // static readonly WP_CAT_SVG_SCALE: number = 10;
    static readonly WP_CAT_BEAM_SVG_SCALE_P: number = 10;

    // static readonly WP_CAT_BTN_PADDING: number = 30;
    // 目录层级缩进的基准像素值；使用处除以 16 转为 rem。
    static readonly WP_CAT_LEVEL_INDENT_PX: number = 30;

    // static readonly SEARCH_DEBOUNCE_MS = 150;
    static readonly WP_CAT_SEARCH_DEBOUNCE_MS = 150;

    /**
     * 这里已经是搜索的UI部分了
     */
    // static readonly SEARCH_MAX_RESULTS = 5;
    static readonly WP_CAT_SEARCH_MAX_RESULTS_N = 5;



    // 首屏收起阈值，单位为视口高度百分比（25 对应 25vh）。
    // static readonly WP_HERO_SHRINKING_THRESHOLD: number = 25;
    static readonly WP_ARTICLE_HERO_SHRINK_THRESHOLD_V: number = 25;

    // static readonly WP_HERO_EXPANDING_THRESHOLD: number = 20;
    static readonly WP_ARTICLE_HERO_EXPAND_THRESHOLD_V: number = 20;

    /** 正文 Hero 低清背景的加载超时：30 秒 */
    static readonly WP_ARTICLE_HERO_BG_LOW_TIMEOUT_MS: number = 60000;

    /** 正文 Hero 高清背景的加载超时：60 秒 */
    static readonly WP_ARTICLE_HERO_BG_HIGH_TIMEOUT_MS: number = 90000;

    static readonly WP_BTN_DEFAULT_STATE: WpBtnState = 
    {
        completed: false,
        disabled: false,
    };
}

export { Common };

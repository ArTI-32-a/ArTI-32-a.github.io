import { Common as C } from "@/utils/Common/Common";
import { EventName as EN } from "@/utils/Common/Event";

/** 圆环开关、半径动画及中央几何体的进出缩放。 */
export function createRingMotion(
    menu: HTMLElement,
    onTransition: () => void,
    onCloseBoard: () => void
)
{
    const offsetMin = C.INF_RING_OFFSET_MIN_RATIO_P * C.INF_RING_COUNT_N * C.INF_RING_RADIUS_UNIT_V;
    let isOpen: boolean = false;
    let currentOffset: number = offsetMin;
    let targetOffset: number = offsetMin;
    let ringRafId: number | null = null;
    let geometryPhase: "closed" | "opening" | "open" | "closing" = "closed";
    let geometryScale: number = 0;
    let closeStartScale: number = 0;
    let closeStartRadius: number = 0;


    function applyRingRadius(): void
    {
        menu.style.setProperty("--inf-ring-offset", `${currentOffset}`);

        // 完全展开时的可见半径。
        const fullRadius: number =
            C.INF_RING_COUNT_N * C.INF_RING_RADIUS_UNIT_V
            - C.INF_RING_FADE_END_V;

        const visibleRadius: number = Math.max(0, fullRadius + currentOffset);

        // 只在打开、关闭期间跟随半径，滚轮调整时保持大小。
        if (geometryPhase === "opening")
        {
            geometryScale = fullRadius > 0
                ? Math.max(0, Math.min(1, visibleRadius / fullRadius))
                : 0;
        }
        else if (geometryPhase === "closing")
        {
            geometryScale = closeStartRadius > 0
                ? closeStartScale * Math.max(0, Math.min(1, visibleRadius / closeStartRadius))
                : 0;
        }

        menu.style.setProperty("--inf-close-scale", `${geometryScale}`);
    }

    function ringTick(): void
    {
        const diff = targetOffset - currentOffset;

        const outerRadius = C.INF_RING_COUNT_N * C.INF_RING_RADIUS_UNIT_V + currentOffset;

        const visuallyClosed = !isOpen && outerRadius <= C.INF_RING_FADE_END_V;

        if (visuallyClosed || Math.abs(diff) < C.INF_RING_EPSILON_V)
        {
            currentOffset = targetOffset;
            applyRingRadius();
            geometryPhase = isOpen ? "open" : "closed";
            ringRafId = null;

            if (!isOpen && Math.abs(currentOffset - offsetMin) < C.INF_RING_CLOSE_EPSILON_V)
            {
                menu.dataset.state = "closed";
                document.dispatchEvent(new CustomEvent(EN.INF_MENU_CLOSE_EVENT));
            }

            return;
        }

        const lerp = isOpen ? C.INF_RING_OPEN_LERP_P : C.INF_RING_CLOSE_LERP_P;
        currentOffset += diff * lerp;
        applyRingRadius();
        ringRafId = requestAnimationFrame(ringTick);
    }

    function startRingLoop(): void
    {
        if (ringRafId !== null)
        {
            return;
        }
        ringRafId = requestAnimationFrame(ringTick);
    }

    function openMenu(): void
    {
        if (isOpen)
        {
            return;
        }
        isOpen = true;

        onTransition();


        geometryPhase = "opening";
        menu.dataset.closing = "false";

        currentOffset = offsetMin;    // 从最小开始
        targetOffset = 0;              // 张开到 0
        applyRingRadius();

        menu.dataset.state = "open";
        startRingLoop();
    }

    function closeMenu(): void
    {
        if (!isOpen)
        {
            return;
        }
        isOpen = false;

        onTransition();


        geometryPhase = "closing";
        closeStartScale = geometryScale;
        closeStartRadius = Math.max(
            0,
            C.INF_RING_COUNT_N * C.INF_RING_RADIUS_UNIT_V
                + currentOffset
                - C.INF_RING_FADE_END_V
        );
        menu.dataset.closing = "true";
        onCloseBoard();

        targetOffset = offsetMin;     // 缩回最小
        startRingLoop();
    }

    function zoom(delta: number): void
    {
        targetOffset = Math.max(offsetMin, Math.min(C.INF_RING_OFFSET_MAX_V, targetOffset + delta));
        startRingLoop();
    }

    function dispose(): void
    {
        if (ringRafId !== null) cancelAnimationFrame(ringRafId);
        ringRafId = null;
    }

    return {
        open: openMenu,
        close: closeMenu,
        zoom,
        dispose,
        get isOpen() { return isOpen; },
        get isReady() { return geometryPhase === "open"; },
    };
}

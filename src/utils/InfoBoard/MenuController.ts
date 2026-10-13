import { EventName as EN } from "@/utils/Common/Event";
import { createBoardController } from "./internal/BoardController";
import { createRingMotion } from "./internal/RingMotion";
import { createWheelController } from "./internal/WheelController";

const controllers = new WeakMap<HTMLElement, () => void>();

/** 信息菜单的统一入口；内部模块不从此入口转出。 */
export function initMenuController(menu: HTMLElement, overlay: HTMLElement): () => void
{
    controllers.get(menu)?.();

    const listeners = new AbortController();
    const { signal } = listeners;
    const boards = createBoardController(menu);
    const motion: ReturnType<typeof createRingMotion> = createRingMotion(menu, () => wheel.reset(), boards.close);
    const wheel = createWheelController(menu, motion);

    document.addEventListener(EN.INF_MENU_SHOULD_OPEN_EVENT, () =>
    {
        motion.open();
    }, { signal });

    document.addEventListener(EN.INF_MENU_SHOULD_CLOSE_EVENT, motion.close, { signal });

    overlay.addEventListener("click", (e: MouseEvent) =>
    {
        const target = e.target;
        if (!(target instanceof Element)) return;

        if (target.closest(".contact-overlay-x"))
        {
            motion.close();
        }
    }, { signal });

    document.addEventListener(EN.INF_BOARD_OPEN_EVENT, (e: Event) =>
    {
        if (!(e instanceof CustomEvent))
        {
            return;
        }

        const detail = e.detail;
        if (typeof detail !== "object" || detail === null)
        {
            return;
        }
        if (!("index" in detail))
        {
            return;
        }
        if (typeof detail.index !== "number")
        {
            return;
        }

        boards.open(detail.index);
    }, { signal });

    document.addEventListener(EN.INF_BOARD_CLOSE_EVENT, (e: Event) =>
    {
        if (!(e instanceof CustomEvent))
        {
            return;
        }

        boards.close();
    }, { signal });

    document.addEventListener("keydown", (e: KeyboardEvent) =>
    {
        if (e.key !== "Escape")
        {
            return;
        }
        if (!motion.isOpen)
        {
            return;
        }

        if (boards.activeIndex !== null)
        {
            boards.close();
        }
        else
        {
            motion.close();
        }
    }, { signal });

    document.addEventListener("wheel", wheel.onWheel, { passive: false, signal });

    document.addEventListener("pointerdown", wheel.onPointerDown, { signal });

    document.addEventListener("pointerup", wheel.onPointerUp, { signal });

    document.addEventListener("pointercancel", wheel.onPointerCancel, { signal });

    window.addEventListener("blur", wheel.onBlur, { signal });
    
    document.addEventListener("click", wheel.onClick, { capture: true, signal });

    function dispose(): void
    {
        listeners.abort();
        motion.dispose();
        wheel.dispose();
        controllers.delete(menu);
    }

    controllers.set(menu, dispose);
    return dispose;
}

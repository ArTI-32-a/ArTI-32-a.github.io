import { Common as C } from "@/utils/Common/Common";

/** 滚轮目标锁定、左键强制缩放和各环的旋转动画。 */
export function createWheelController(
    menu: HTMLElement,
    motion: { readonly isOpen: boolean; readonly isReady: boolean; zoom: (delta: number) => void }
)
{
    // 连续滚动停止多久后，重新判断操作对象。
    // const wheelIdleTime: number = 200;

    // 每次滚轮事件累加的目标角度。
    // const ringRotateStep: number = 5;

    // 旋转追赶速度，以及停止时的角度误差。
    // const ringRotateLerp: number = 0.12;
    // const ringRotateEpsilon: number = 0.01;

    type WheelTarget =
        | { mode: "zoom" }
        | { mode: "ring"; index: number };

    let wheelTarget: WheelTarget | null = null;
    let lastWheelTime: number = 0;

    let leftPressed: boolean = false;
    let suppressClick: boolean = false;

    const ringAngles: number[] =
        Array(C.INF_RING_COUNT_N).fill(0);

    const ringTargetAngles: number[] =
        Array(C.INF_RING_COUNT_N).fill(0);

    let ringRotateRafId: number | null = null;
    let ringRotateLastTime: number | null = null;



    function resetWheelTarget(): void
    {
        wheelTarget = null;
        lastWheelTime = 0;
    }

    function getButtonRingIndex(button: HTMLElement): number | null
    {
        const buttonIndex: number = Number(button.dataset.index);

        if (!Number.isInteger(buttonIndex) || buttonIndex < 1)
        {
            return null;
        }

        const ringIndex: number = Math.floor(
            (buttonIndex - 1) / C.INF_RING_BTN_COUNT_N
        );

        return ringIndex < ringAngles.length ? ringIndex : null;
    }

    function findRingAtPointer(event: WheelEvent): number | null
    {
        const sourceEl = event.target;

        if (!(sourceEl instanceof Element))
        {
            return null;
        }

        const buttonEl = sourceEl.closest(
            ".contact-button[data-index]"
        );

        if (
            !(buttonEl instanceof HTMLElement) ||
            !menu.contains(buttonEl)
        )
        {
            return null;
        }

        return getButtonRingIndex(buttonEl);
    }

    function applyRingAngles(): void
    {
        menu.querySelectorAll<HTMLElement>(
            ".contact-button[data-index]"
        ).forEach(button =>
        {
            const ringIndex = getButtonRingIndex(button);

            if (ringIndex === null)
            {
                return;
            }

            button.style.setProperty(
                "--ring-rotation",
                `${ringAngles[ringIndex]}deg`
            );
        });
    }

    function ringRotateTick(timestamp: number): void
    {
        const frameFactor: number = ringRotateLastTime === null
            ? 1
            : Math.min(
                (timestamp - ringRotateLastTime) / (1000 / 60),
                3
            );

        ringRotateLastTime = timestamp;

        const lerp: number =
            1 - Math.pow(1 - C.INF_RING_ROTATE_LERP_P, frameFactor);

        let moving: boolean = false;

        for (let index = 0; index < ringAngles.length; index++)
        {
            const diff: number =
                ringTargetAngles[index] - ringAngles[index];

            if (Math.abs(diff) <= C.INF_RING_ROTATE_EPSILON_DEG)
            {
                ringAngles[index] = ringTargetAngles[index];
                continue;
            }

            ringAngles[index] += diff * lerp;
            moving = true;
        }

        applyRingAngles();

        if (moving)
        {
            ringRotateRafId = requestAnimationFrame(ringRotateTick);
        }
        else
        {
            ringRotateRafId = null;
            ringRotateLastTime = null;
        }
    }

    function rotateRing(index: number, delta: number): void
    {
        ringTargetAngles[index] += delta;

        if (ringRotateRafId !== null)
        {
            return;
        }

        ringRotateLastTime = null;
        ringRotateRafId = requestAnimationFrame(ringRotateTick);
    }

    function onWheel(event: WheelEvent): void
    {
        if (!motion.isOpen)
        {
            return;
        }

        // 保留浏览器 Ctrl + 滚轮缩放。
        if (event.ctrlKey)
        {
            return;
        }

        event.preventDefault();

        // 打开动画结束后才允许操作。
        if (!motion.isReady || event.deltaY === 0)
        {
            return;
        }

        const now: number = performance.now();

        // 停止滚动足够久，下一次重新选择操作对象。
        if (now - lastWheelTime >= C.INF_RING_WHEEL_IDLE_TIME_MS)
        {
            wheelTarget = null;
        }

        lastWheelTime = now;

        // 左键优先：将本轮连续滚动锁定为缩放。
        if (leftPressed || (event.buttons & 1) !== 0)
        {
            wheelTarget = { mode: "zoom" };
            suppressClick = true;
        }
        else if (wheelTarget === null)
        {
            const index = findRingAtPointer(event);

            wheelTarget = index === null
                ? { mode: "zoom" }
                : { mode: "ring", index };
        }

        // 转动指定圆环。
        if (wheelTarget.mode === "ring")
        {
            rotateRing(
                wheelTarget.index,
                Math.sign(event.deltaY) * C.INF_RING_ROTATE_STEP_DEG
            );

            return;
        }

        // 放大、缩小所有圆环。
        const delta: number = event.deltaY > 0
            ? -C.INF_RING_SCROLL_STEP_V
            : C.INF_RING_SCROLL_STEP_V;

        motion.zoom(delta);
    }

    function onPointerDown(event: PointerEvent): void
    {
        if (event.button !== 0) return;
        leftPressed = true;
        suppressClick = false;
    }

    function onPointerUp(event: PointerEvent): void
    {
        if (event.button === 0) leftPressed = false;
    }

    function onPointerCancel(): void
    {
        leftPressed = false;
    }

    function onBlur(): void
    {
        leftPressed = false;
        suppressClick = false;
        resetWheelTarget();
    }

    function onClick(event: MouseEvent): void
    {
        if (!suppressClick) return;
        suppressClick = false;
        event.preventDefault();
        event.stopImmediatePropagation();
    }

    function dispose(): void
    {
        if (ringRotateRafId !== null) cancelAnimationFrame(ringRotateRafId);
        ringRotateRafId = null;
        ringRotateLastTime = null;
        onBlur();
    }

    return { reset: resetWheelTarget, onWheel, onPointerDown, onPointerUp, onPointerCancel, onBlur, onClick, dispose };
}

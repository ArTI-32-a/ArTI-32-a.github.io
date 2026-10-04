import { Common as C } from "@/utils/Common/Common";

let isInitialized: boolean = false;
let hasPressed: boolean = false;

async function indexListener(): Promise<void>
{
    // // 在 indexListener 的开头添加
    // window.addEventListener("pageshow", (event: PageTransitionEvent) =>
    // {
    //     if (event.persisted)
    //     {
    //         // 从 BFCache 恢复 → 强制刷新，重设所有状态
    //         window.location.reload();
    //     }
    // });

    if (isInitialized)
    {
        return;
    }
    isInitialized = true;

    document.addEventListener("click", (event: MouseEvent) =>
    {
        const target: EventTarget | null = event.target;
        if (!target)
        {
            return;
        }
        if (!(target instanceof Element))
        {
            return;
        }

        const btn: Element | null = target.closest(".grid-item");
        if (!btn)
        {
            return;
        }
        if (!(btn instanceof HTMLAnchorElement))
        {
            return;
        }

        event.preventDefault();

        if (hasPressed)
        {
            return;
        }
        hasPressed = true;

        buttonAction();

        setTimeout(() =>
        {
            window.location.href = btn.href;
            hasPressed = false
        }, C.IND_BTN_FEEDBACK_DELAY_MS);
    });
}

export { indexListener };


function buttonAction(): void
{
    console.log("test");
}
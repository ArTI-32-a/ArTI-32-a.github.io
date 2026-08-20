let isInitialized: boolean = false;
let hasPressed: boolean = false;

async function indexListener(): Promise<void>
{
    if (isInitialized)
    {
        return;
    }
    isInitialized = true;

    const { buttonAction } = await import("@/utils/svg-controller/index-button");

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

        const btn: Element | null = target.closest(".btn");
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

        const sleep: number = 3;

        setTimeout(() =>
        {
            window.location.href = btn.href;
        }, sleep * 1000);
    });
}

export { indexListener };
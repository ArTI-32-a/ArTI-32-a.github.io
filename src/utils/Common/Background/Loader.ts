export interface BackgroundVariant 
{
    width: number;
    src: string;
}

interface BackgroundOptions 
{
    lowTimeout?: number;
    highTimeout?: number;
    maxPixelRatio?: number;
}

function loadImage(
    src: string,
    timeout: number,
    signal: AbortSignal
): Promise<boolean> 
{
    return new Promise(resolve => 
    {
        if (signal.aborted) 
        {
            resolve(false);
            return;
        }

        const image = new Image();
        let settled = false;

        const timer = window.setTimeout(() => finish(false), timeout);

        function finish(success: boolean): void 
        {
            if (settled) return;
            settled = true;

            window.clearTimeout(timer);
            signal.removeEventListener("abort", onAbort);

            image.onload = null;
            image.onerror = null;

            if (!success) image.removeAttribute("src");

            resolve(success);
        }

        function onAbort(): void 
        {
            finish(false);
        }

        signal.addEventListener("abort", onAbort, { once: true });

        image.onload = () => 
        {
            image.decode().then(
                () => finish(true),
                () => finish(false)
            );
        };

        image.onerror = () => finish(false);
        image.src = src;
    });
}

export async function loadBackground(
    element: HTMLElement,
    variants: BackgroundVariant[],
    aspect: number,
    {
        lowTimeout = 6000,
        highTimeout = 10000,
        maxPixelRatio = 2,
    }: BackgroundOptions = {}
): Promise<void> 
{
    if (!variants.length || !Number.isFinite(aspect) || aspect <= 0) 
    {
        return;
    }

    const sorted = [...variants].sort((a, b) => a.width - b.width);
    const low = sorted[0];

    // cover 模式可能根据高度放大图片，所以不能只看元素宽度。
    const requiredWidth = Math.max(
        element.clientWidth,
        element.clientHeight * aspect
    ) * Math.min(window.devicePixelRatio || 1, maxPixelRatio);

    const target = sorted.find(item => item.width >= requiredWidth)
        ?? sorted[sorted.length - 1];

    const controller = new AbortController();
    const stop = (): void => controller.abort();

    window.addEventListener("pagehide", stop, { once: true });

    async function applyImage(
        variant: BackgroundVariant,
        timeout: number
    ): Promise<boolean> 
    {
        const ready = await loadImage(
            variant.src,
            timeout,
            controller.signal
        );

        if (!ready || controller.signal.aborted) return false;

        element.style.backgroundImage =
            `url(${JSON.stringify(variant.src)})`;

        return true;
    }

    try 
    {
        if (!await applyImage(low, lowTimeout)) return;

        if (target.src !== low.src) {
            await applyImage(target, highTimeout);
        }
    } 
    finally 
    {
        window.removeEventListener("pagehide", stop);
    }
}
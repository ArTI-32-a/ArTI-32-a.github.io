import { Common as C } from "@/utils/Common/Common";

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
        lowTimeout = C.WP_ARTICLE_HERO_BG_LOW_TIMEOUT_MS,
        highTimeout = C.WP_ARTICLE_HERO_BG_HIGH_TIMEOUT_MS,
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

    // 0：纯色；1：低清；2：高清。
    let displayedQuality = 0;

    async function applyImage(
        variant: BackgroundVariant,
        timeout: number,
        quality: number
    ): Promise<void>
    {
        const ready = await loadImage(
            variant.src,
            timeout,
            controller.signal
        );

        if (!ready || controller.signal.aborted) return;

        // 高清已经显示时，忽略迟到的低清。
        if (quality <= displayedQuality) return;

        element.style.backgroundImage =
            `url(${JSON.stringify(variant.src)})`;

        displayedQuality = quality;
    }

    try
    {
        if (target.src === low.src)
        {
            // 两档实际是同一张图片时，只加载一次。
            await applyImage(target, highTimeout, 2);
        }
        else
        {
            await Promise.all([
                applyImage(low, lowTimeout, 1),
                applyImage(target, highTimeout, 2),
            ]);
        }
    }
    finally
    {
        window.removeEventListener("pagehide", stop);
    }
}
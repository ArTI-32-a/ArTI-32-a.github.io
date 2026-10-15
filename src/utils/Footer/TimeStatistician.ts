export function startReadingTimer(container: HTMLElement, path: string): () => void
{
    const storageKey: string = `article-reading-time:${path}`;

    let totalMs: number = 0;
    let startedAt: number | null = null;
    let timerId: number | null = null;

    try
    {
        const saved: number = Number(sessionStorage.getItem(storageKey));

        if (Number.isFinite(saved) && saved >= 0)
        {
            totalMs = saved;
        }
    }
    catch
    {
        // 存储不可用时，仍然进行当前页面的计时。
    }

    function render(): void
    {
        const totalSeconds: number = Math.floor(totalMs / 1000);
        const minutes: number = Math.floor(totalSeconds / 60);
        const seconds: string = String(totalSeconds % 60).padStart(2, "0");

        container.textContent = `${minutes} 分 ${seconds} 秒`;
    }

    function save(): void
    {
        if (startedAt !== null)
        {
            const now: number = performance.now();

            totalMs += now - startedAt;
            startedAt = now;
        }

        try
        {
            sessionStorage.setItem(storageKey, `${totalMs}`);
        }
        catch
        {
            // 保存失败不影响计时和显示。
        }

        render();
    }

    function pause(): void
    {
        save();
        startedAt = null;

        if (timerId !== null)
        {
            window.clearInterval(timerId);
            timerId = null;
        }
    }

    function resume(): void
    {
        if (
            document.visibilityState !== "visible" ||
            startedAt !== null
        )
        {
            return;
        }

        startedAt = performance.now();
        timerId = window.setInterval(save, 1000);
    }

    function onVisibilityChange(): void
    {
        if (document.visibilityState === "visible")
        {
            resume();
        }
        else
        {
            pause();
        }
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", pause);
    window.addEventListener("pageshow", resume);

    render();
    resume();

    return (): void =>
    {
        pause();

        document.removeEventListener(
            "visibilitychange",
            onVisibilityChange
        );

        window.removeEventListener("pagehide", pause);
        window.removeEventListener("pageshow", resume);
    };
}
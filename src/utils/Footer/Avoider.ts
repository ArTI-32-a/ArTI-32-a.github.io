export function avoidFooter(target: HTMLElement, footer: HTMLElement): void
{
    let frameId: number | null = null;

    function update(): void
    {
        frameId = null;

        const viewportHeight: number = window.innerHeight;
        const footerTop: number = footer.getBoundingClientRect().top;

        const overlap: number = Math.max(
            0,
            Math.min(viewportHeight, viewportHeight - footerTop)
        );

        const space: number = viewportHeight > 0
            ? overlap / viewportHeight * 100
            : 0;

        target.style.setProperty("--toc-footer-space", `${space}vh`);
    }

    function scheduleUpdate(): void
    {
        if (frameId !== null)
        {
            return;
        }

        frameId = requestAnimationFrame(update);
    }

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("pageshow", scheduleUpdate);

    update();
}
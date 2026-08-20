const boundElements: WeakSet<HTMLElement> = new WeakSet<HTMLElement>();


function rollerListener(header: HTMLElement): void
{

    const THRESHOLD: number = 100;


    let second: boolean = false;
    let rev: boolean = false;
    let shrunk: boolean = false;
    let isAnimating: boolean = false;
    function onScroll(): void
    {
        const currY: number = window.scrollY;

        if (!shrunk && currY >= THRESHOLD)
        {
            animate(20, 1000);
        }
        else if (!isAnimating && shrunk && currY <= 10 && !second)
        {
            second = true;
        }
        else if (shrunk && currY >= 20 && second)
        {
            rev = true;
        }
        else if (shrunk && currY <= 10 && rev)
        {
            second = false;
            rev = false;

            animate(60, 1000);
        }
    }

    function animate(targetHeight: number, time: number): void
    {
        if (isAnimating)
        {
            return;
        }
        isAnimating = true;

        const currentHeight: number = parseFloat(header.style.height) || 60;
        const startTime: number = performance.now();
        const startHeight: number = currentHeight;

        function update(timestamp: number): void
        {
            const elapsed: number = timestamp - startTime;
            const progress: number = Math.min(elapsed / time, 1);

            const eased: number = 1 - Math.pow(1 - progress, 3);
            const newHeight: number = startHeight + (targetHeight - startHeight) * eased;

            header.style.height = `${newHeight}vh`;

            if (progress < 1)
            {
                requestAnimationFrame(update);
            }
            else
            {
                isAnimating = false;
            }
        }

        requestAnimationFrame(update);

        shrunk = !shrunk;
    }


    window.addEventListener("scroll", () =>
    {
        onScroll();
    });
}



export { rollerListener };
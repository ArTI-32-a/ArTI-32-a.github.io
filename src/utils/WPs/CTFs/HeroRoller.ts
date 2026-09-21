function heroRoller(header: HTMLElement, titleBox: HTMLElement, heroContent: HTMLElement): void
{
    const THRESHOLD: number = 200;


    let second: boolean = false;
    let rev: boolean = false;
    let shrunk: boolean = false;
    let isAnimating: boolean = false;

    let currentOffset: number = 0;
    let currentOpacity: number = 1;

    function onScroll(): void
    {
        const currY: number = window.scrollY;

        if (!shrunk && currY >= THRESHOLD)
        {
            animateHero(20, -70, 0, 1000);
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

            animateHero(60, 0, 1, 1000);
        }
    }


    function animate(time: number, onProgress: (eased: number) => void): void
    {
        if (isAnimating)
        {
            return;
        }
        isAnimating = true;

        const startTime: number = performance.now();

        function update(timestamp: number): void
        {
            const elapsed: number = timestamp - startTime;
            const progress: number = Math.min(elapsed / time, 1);
            const eased: number = 1 - Math.pow(1 - progress, 3);

            onProgress(eased);

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

    function animateHero(targetHeight: number, targetOffset: number, targetOpacity: number, time: number)
    {
        const startHeight: number = parseFloat(header.style.height) || 60;
        const startOffset: number = currentOffset;
        const startOpacity: number = currentOpacity;

        animate(time, (eased) => 
        {
            const newHeight: number = startHeight + (targetHeight - startHeight) * eased;
            const newOffset: number = startOffset + (targetOffset - startOffset) * eased;

            header.style.height = `${newHeight}vh`;
            titleBox.style.transform = `translateY(${newOffset}px)`;

            currentOffset = newOffset;


            const fadeEased: number = Math.min(eased * 1.8, 1);
            const newOpacity: number = startOpacity + (targetOpacity - startOpacity) * fadeEased;
            heroContent.style.opacity = `${newOpacity}`;
            currentOpacity = newOpacity;
        });
    }


    window.addEventListener("scroll", () =>
    {
        onScroll();
    });
}



export { heroRoller };
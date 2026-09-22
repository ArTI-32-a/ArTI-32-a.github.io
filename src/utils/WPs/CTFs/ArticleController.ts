interface HeroController
{
    onScroll: (y: number) => void;
}

interface TOCController
{
    onScroll: (y: number) => void;
    toggle: () => void;
}



function initHero(
    mask: HTMLElement, 
    titleBox: HTMLElement, 
    metaBlock: HTMLElement, 
    tocSpacer: HTMLElement, 
    threshold: number): HeroController
{
    return {
        onScroll: (y: number): void =>
        {
            if (y > threshold)
            {
                mask.classList.add("shrunk");
                titleBox.classList.add("shrink");
                metaBlock.classList.add("shrink");
                tocSpacer.classList.add("shrink");
            }
            else if (y < threshold)
            {
                mask.classList.remove("shrunk");
                titleBox.classList.remove("shrink");
                metaBlock.classList.remove("shrink");
                tocSpacer.classList.remove("shrink");
            }
        }
    };
}

function initTOC(mainArea: HTMLElement, tocToggle: HTMLElement, threshold: number): TOCController
{
    let hasAutoShown: boolean = false;
    let visible: boolean = false;

    function update(): void
    {
        mainArea.classList.toggle("toc-visible", visible);
        tocToggle.classList.toggle("active", visible);
    }

    return {
        onScroll: (y: number): void =>
        {
            if (!hasAutoShown && y > threshold)
            {
                hasAutoShown = true;
                visible = true;
                update();
            }
        },
        toggle: (): void =>
        {
            if (!hasAutoShown) return;
            visible = !visible;
            update();
        }
    };
}

function articleController(
    mask: HTMLElement, 
    mainArea: HTMLElement, 
    tocToggle: HTMLElement, 
    titleBox: HTMLElement, 
    metaBlock: HTMLElement,
    tocSpacer: HTMLElement): void
{
    const THRESHOLD: number = 200;

    const hero = initHero(mask, titleBox, metaBlock, tocSpacer, THRESHOLD);
    const toc = initTOC(mainArea, tocToggle, THRESHOLD);

    window.addEventListener("scroll", () =>
    {
        const y: number = window.scrollY;
        hero.onScroll(y);
        toc.onScroll(y);
    }, { passive: true });

    tocToggle.addEventListener("click", () =>
    {
        toc.toggle();
    });
}


export { articleController };
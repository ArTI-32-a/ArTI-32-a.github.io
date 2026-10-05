interface HeroController
{
    onScroll: (y: number) => void;
    toggleManual: () => boolean;
    toggleAuto: () => boolean;
}

interface TOCController
{
    onScroll: (y: number) => void;
    toggle: () => void;
    onReady: (cb: () => void) => void;
}

import { Common as C } from "@/utils/Common/Common";
import { WpBtnStateEvent } from "@/utils/Common/Event";

function initHero(
    shrinkTargets: HTMLElement[],
    threshold: number
): HeroController
{
    let shrunk: boolean = false;
    let autoEnabled: boolean = true;
    let autoPaused: boolean = false;

    function applyShrunk(value: boolean): void
    {
        shrunk = value;
        for (const el of shrinkTargets)
        {
            el.classList.toggle("shrink", shrunk);
        }
    }

    return {
        onScroll: (y: number): void =>
        {
            if (!autoEnabled) return;
            if (autoPaused) return;

            if (!shrunk && y > threshold)
            {
                applyShrunk(true);
            }
            else if (shrunk && y < threshold)
            {
                applyShrunk(false);
            }
        },

        toggleManual: (): boolean =>
        {
            applyShrunk(!shrunk);
            autoPaused = true;
            setTimeout(() => { autoPaused = false; }, 1500);

            return shrunk;
        },

        toggleAuto: (): boolean =>
        {
            autoEnabled = !autoEnabled;

            return autoEnabled;
        },
    };
}

function initTOC(mainArea: HTMLElement, threshold: number): TOCController
{
    let hasAutoShown: boolean = false;
    let visible: boolean = false;
    const readyCallbacks: (() => void)[] = [];

    function update(): void
    {
        mainArea.classList.toggle("toc-visible", visible);
        // tocToggle.classList.toggle("active", visible);
    }

    return {
        onScroll: (y: number): void =>
        {
            if (!hasAutoShown && y > threshold)
            {
                hasAutoShown = true;
                visible = true;
                update();

                readyCallbacks.forEach(cb => cb());   // 通知
                // document.dispatchEvent(new WpBtnStateEvent(
                // {
                //     event: "toc-toggle",
                //     state: { disabled: false },
                // }));
            }
        },
        toggle: (): void =>
        {
            if (!hasAutoShown) return;
            visible = !visible;
            update();
        },
        onReady: (cb: () => void): void =>
        {
            readyCallbacks.push(cb);
        }
    };
}

function articleController(
    shrinkTargets: HTMLElement[],
    mainArea: HTMLElement
): void
{
    document.dispatchEvent(new WpBtnStateEvent(
    {
        event: "toc-toggle",
        state: { disabled: true },
    }));

    document.dispatchEvent(new WpBtnStateEvent(
    {
        event: "hero-auto-toggle",
        state: { completed: true },   // autoEnabled 初始为 true
    }));

    const hero = initHero(shrinkTargets, C.WP_CTF_HERO_SHRINKING_THRESHOLD);
    const toc = initTOC(mainArea, C.WP_CTF_HERO_SHRINKING_THRESHOLD);

    toc.onReady(() =>
    {
        document.dispatchEvent(new WpBtnStateEvent(
        {
            event: "toc-toggle",
            state: { disabled: false },
        }));
    });

    window.addEventListener("scroll", () =>
    {
        const y: number = window.scrollY / window.innerHeight * 100;
        hero.onScroll(y);
        toc.onScroll(y);
    }, { passive: true });

    document.addEventListener("hero-toggle", () => 
    {
        const state = hero.toggleManual();
    });

    document.addEventListener("hero-auto-toggle", () => 
    {
        const state = hero.toggleAuto();

        
        document.dispatchEvent(new WpBtnStateEvent(
        {
            event: "hero-auto-toggle",
            state: { completed: state },
        }));
    });

    document.addEventListener("toc-toggle", () => 
    {
        toc.toggle();
    });
}


export { articleController };
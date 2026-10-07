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
    shrThreshold: number,
    expThreshold: number
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

            if (!shrunk && y > shrThreshold)
            {
                applyShrunk(true);
            }
            else if (shrunk && y < expThreshold)
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


function easeAccelerateCruiseDecelerate(progress: number): number
{
    const t = Math.max(0, Math.min(progress, 1));

    // 加速、减速分别占总时间的 25%。
    const rampRatio = 0.25;

    // 归一化最高速度，保证最终位移恰好为 1。
    const maxSpeed = 1 / (1 - rampRatio);

    if (t < rampRatio)
    {
        // 加速段：速度从 0 均匀增加。
        return maxSpeed * t * t / (2 * rampRatio);
    }

    if (t <= 1 - rampRatio)
    {
        // 匀速段：位移随时间线性增加。
        return maxSpeed * (t - rampRatio / 2);
    }

    // 减速段：速度均匀降低，结束时为 0。
    const remaining = 1 - t;

    return 1 - maxSpeed * remaining * remaining / (2 * rampRatio);
}

function initAnchorScroll(mask: HTMLElement): (id: string) => void
{
    let frameId: number = 0;

    function cancel(): void
    {
        cancelAnimationFrame(frameId);
        frameId = 0;
    }

    // 用户开始自己操作时，停止自动滚动。
    window.addEventListener("wheel", cancel, { passive: true });
    window.addEventListener("touchstart", cancel, { passive: true });
    window.addEventListener("pointerdown", cancel, { passive: true });
    window.addEventListener("keydown", cancel);
    window.addEventListener("pagehide", cancel);

    return (id: string): void =>
    {
        const targetEl = document.getElementById(id);

        if (!(targetEl instanceof HTMLElement))
        {
            return;
        }

        const target = targetEl;

        // 连续点击时，取消上一轮。
        cancel();

        // 停止可能仍在进行的浏览器原生平滑滚动。
        window.scrollTo(
        {
            top: window.scrollY,
            behavior: "instant",
        });

        const startY = window.scrollY;
        const startTime = performance.now();

        // 实际输出的滚动位置，保留小数精度。
        let currentY = startY;

        // 上一帧的时间。
        let previousTime = startTime;

        // 跟随的缓冲时间，越大，末尾越柔和，但拖尾也越长。
        const followTimeMs = 100;

        const durationMs = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches ? 0 : 600;

        // 防止其它持续变化的布局让追踪一直运行。
        const maxDurationMs = 3000;

        let stableFrames: number = 0;

        // 更新地址栏，但不触发浏览器另外执行一次锚点滚动。
        const nextURL = new URL(window.location.href);
        nextURL.hash = id;

        if (nextURL.href !== window.location.href)
        {
            history.pushState(history.state, "", nextURL);
        }

        function tick(now: number): void
        {
            if (!target.isConnected)
            {
                cancel();
                return;
            }

            const root = document.documentElement;

            const offset = Number.parseFloat(
                getComputedStyle(root).scrollPaddingTop
            ) || 0;

            const maxY = Math.max(
                0,
                root.scrollHeight - root.clientHeight
            );

            let targetY: number;

            if (id === "page-top")
            {
                targetY = 0;
            }
            else if (id === "page-bottom")
            {
                targetY = maxY;
            }
            else
            {
                targetY = target.getBoundingClientRect().top + window.scrollY - offset;
            }

            // 页面开头、结尾附近可能没有足够空间进行顶部对齐。
            targetY = Math.max(0, Math.min(targetY, maxY));

            const elapsed = now - startTime;
            const progress = durationMs === 0
                ? 1
                : Math.min(elapsed / durationMs, 1);

            const eased = easeAccelerateCruiseDecelerate(progress);

            // 曲线计算出的理想位置。
            const desiredY = startY + (targetY - startY) * eased;

            // 按真实时间计算跟随比例，避免刷新率影响速度。
            const deltaMs = Math.max(0, now - previousTime);
            previousTime = now;

            const followRatio = durationMs === 0
                ? 1
                : 1 - Math.exp(-deltaMs / followTimeMs);

            // 实际位置逐渐接近理想位置，而不是直接跳过去。
            currentY += (desiredY - currentY) * followRatio;
            currentY = Math.max(0, Math.min(currentY, maxY));

            window.scrollTo(
            {
                top: currentY,
                behavior: "instant",
            });

            const heightChanging = mask.getAnimations().some(
                animation =>
                    animation instanceof CSSTransition &&
                    animation.transitionProperty === "height" &&
                    (
                        animation.pending ||
                        animation.playState === "running"
                    )
            );

            const reached =
                Math.abs(window.scrollY - targetY) <= C.WOR_EPSILON_PX;

            if (progress === 1 && !heightChanging && reached)
            {
                stableFrames++;
            }
            else
            {
                stableFrames = 0;
            }

            // 多确认几帧，给 scroll 监听触发 Hero 状态变化留出时间。
            if (stableFrames >= 3 || elapsed >= maxDurationMs)
            {
                frameId = 0;
                return;
            }

            frameId = requestAnimationFrame(tick);
        }

        frameId = requestAnimationFrame(tick);
    };
}





function articleController(
    shrinkTargets: HTMLElement[],
    mainArea: HTMLElement
): void
{
    const maskEl = document.getElementById("mask");

    if (!(maskEl instanceof HTMLElement))
    {
        return;
    }

    const mask = maskEl;
    const scrollToAnchor = initAnchorScroll(mask);

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

    const hero = initHero(shrinkTargets, C.WP_ARTICLE_HERO_SHRINK_THRESHOLD_V, C.WP_ARTICLE_HERO_EXPAND_THRESHOLD_V);
    const toc = initTOC(mainArea, C.WP_ARTICLE_HERO_SHRINK_THRESHOLD_V);

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

    document.addEventListener("click", (event: MouseEvent) =>
    {
        // 1. 只接管没有修饰键的普通左键点击。
        if (
            event.defaultPrevented ||
            event.button !== 0 ||
            event.ctrlKey ||
            event.metaKey ||
            event.shiftKey ||
            event.altKey
        )
        {
            return;
        }

        // 2. 从点击位置向上寻找链接。
        const sourceEl = event.target;

        if (!(sourceEl instanceof Element))
        {
            return;
        }

        const source = sourceEl;
        const linkEl = source.closest("a[href]");

        if (!(linkEl instanceof HTMLAnchorElement))
        {
            return;
        }

        const link = linkEl;

        // 3. 下载链接、指定其它打开窗口的链接，交给浏览器。
        if (
            link.hasAttribute("download") ||
            (link.target && link.target !== "_self")
        )
        {
            return;
        }

        const url = new URL(link.href);

        // 4. 只处理当前页面内部的锚点。
        if (
            url.origin !== window.location.origin ||
            url.pathname !== window.location.pathname ||
            url.search !== window.location.search ||
            !url.hash
        )
        {
            return;
        }

        // 5. 去掉 #，并还原可能被 URL 编码的中文等字符。
        let id: string;

        try
        {
            id = decodeURIComponent(url.hash.slice(1));
        }
        catch
        {
            return;
        }

        // 6. 确认页面里确实存在对应元素。
        const targetEl = document.getElementById(id);

        if (!(targetEl instanceof HTMLElement))
        {
            return;
        }

        // 7. 阻止浏览器原生跳转，改用我们自己的滚动函数。
        event.preventDefault();
        scrollToAnchor(id);
    });
}


export { articleController };
const HIDE_THRESHOLD = 100;
const SHOW_THRESHOLD = 300;

let sum: number = 0;
let hoverTimer: number | null = null;


function hnListener(element: HTMLElement): void
{
    let lastScrollY: number = window.scrollY;
    let isHidden: boolean = false;
    let isShowedFromHover: boolean = false;

    function showNav() 
    {
        if (hoverTimer)
        {
            clearTimeout(hoverTimer);
        }
        
        hoverTimer = window.setTimeout(() => 
        {
            if (isHidden)
            {
                element.style.transform = "translateY(0)";
                isHidden = false;

                sum = 0;

                isShowedFromHover = true;
            }
        }, 500);
    }


    function update()
    {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollY;

        sum += delta;

        if (delta > 0 && isHidden)
        {
            sum = 0;
        }
        else if (delta < 0 && !isHidden)
        {
            sum = 0;
        }

        if (sum > HIDE_THRESHOLD && !isHidden)
        {
            element.style.transform = "translateY(-95%)";
            isHidden = true;

            sum = 0;
        }
        else if (sum < -SHOW_THRESHOLD && isHidden)
        {
            element.style.transform = "translateY(0)";
            isHidden = false;

            sum = 0;
        }
        else if (currentScrollY <= 200 && isHidden)
        {
            element.style.transform = "translateY(0)";
            isHidden = false;

            sum = 0;
        }

        lastScrollY = currentScrollY;
    }

    let ticking = false;
    window.addEventListener("scroll", () =>
    {
        if (!ticking)
        {
            requestAnimationFrame(() => 
            {
                update();
                ticking = false;
            });

            ticking = true;
        }
    });


    document.addEventListener("mousemove", (e: MouseEvent) => 
    {
        const isTop = e.clientY <= 50;

        if (isTop)
        {
            if (hoverTimer)
            {
                clearTimeout(hoverTimer);
            }

            showNav();
        }
        else if (e.clientY >= 100)
        {
            if (isShowedFromHover)
            {
                element.style.transform = "translateY(-95%)";
                isHidden = true;
                isShowedFromHover = false;
            }
        }

    });
    
    element.style.transition = "transform 0.3s ease";
    element.style.transform = "translateY(0)";
}


export { hnListener };
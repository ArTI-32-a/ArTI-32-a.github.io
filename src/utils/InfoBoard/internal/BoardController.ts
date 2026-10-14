/** 信息板开关及对应按钮状态，仅由 MenuController 组合使用。 */
export function createBoardController(menu: HTMLElement)
{
    let activeBoardIndex: number | null = null;

    function findBoard(index: number): HTMLElement | null
    {
        const primary = menu.querySelector<HTMLElement>(
            `[data-board-index="${index}"]`
        );
        if (primary)
        {
            return primary;
        }
        return menu.querySelector<HTMLElement>(
            `[data-board-index="0"]`
        );
    }

    function openBoard(index: number): void
    {
        if (activeBoardIndex !== null && activeBoardIndex !== index)
        {
            closeBoard();
        }

        activeBoardIndex = index;
        menu.classList.add("board-open");

        const board = findBoard(index);
        if (board)
        {
            board.classList.add("opened");
        }

        const btn = menu.querySelector<HTMLElement>(
            `.contact-button[data-index="${index}"]`
        );
        if (btn)
        {
            btn.classList.add("active");
        }
    }

    function closeBoard(): void
    {
        menu.classList.remove("board-open");
        
        if (activeBoardIndex === null) 
        {
            return;
        }

        menu.querySelectorAll<HTMLElement>(".information-board")
            .forEach(b => 
            {
                b.classList.remove("opened")
            });

        menu.querySelectorAll<HTMLElement>(".contact-button")
            .forEach(b => 
            {
                b.classList.remove("active")
            });

        activeBoardIndex = null;
    }


    return { open: openBoard, close: closeBoard, get activeIndex() { return activeBoardIndex; } };
}

export {};

declare global
{
    interface Window
    {
        __wpMenuBtnDelegation?: boolean;
        __infButtonDelegation?: boolean;
        __infBoardDelegation?: boolean;
    }
}
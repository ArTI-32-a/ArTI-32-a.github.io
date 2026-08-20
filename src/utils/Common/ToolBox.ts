

class ToolBox
{
    public static isZero(value: number): boolean
    {
        return (Math.abs(value) < 1e-1);
    }

    public static isEqual(value1: number, value2: number): boolean
    {
        return (Math.abs(value1 - value2) < 1e-1);
    }

    public static pxToVh(px: number, viewerHeight?: number): number
    {
        const vh = (typeof window !== "undefined") ? window.innerHeight : (viewerHeight ?? 1920);
        return (px / vh) * 100;
    }

    public static pxToVw(px: number, viewerWidth?: number): number
    {
        const vw = (typeof window !== "undefined") ? window.innerWidth : (viewerWidth ?? 1080);
        return (px / vw) * 100;
    }
}


export { ToolBox }; 
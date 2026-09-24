

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


    public static handlePageHide(event: PageTransitionEvent): void 
    {
        // 如果页面将被 BFCache 缓存
        if (event.persisted) 
        {
            // 查找并关闭 Vite 的 WebSocket 连接
            // Vite 通常将 WebSocket 实例挂载在 window 对象上，或者你可以通过其他方式获取
            // 这里是一个常见的获取方式，但具体取决于 Vite 版本
            const viteSocket = (window as any).__vite_hmr_websocket;
            if (viteSocket && viteSocket.readyState === WebSocket.OPEN) 
            {
                console.log("Closing Vite HMR WebSocket for bfcache.");
                viteSocket.close();
            }
        }
    }



    public static normalizedPaths(raw: string): string
    {
        let key: string = "";

        // const normalizedPath = path.replace(/\\/g, "/");
        key = raw.replace(/\\/g, "/");
        key = key.replace(/\.md$/i, "");
        key = key.replace(/\./g, "");
        key = key.replace(/ /g, "-");
        key = key.toLowerCase();

        return key;
    }
}


export { ToolBox }; 
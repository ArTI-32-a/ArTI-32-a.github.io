import { spawnSync } from "child_process";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

function entry(): void
{
    const currentDir: string = dirname(fileURLToPath(import.meta.url));
    const projectRoot: string = join(currentDir, "..", "..");
    const targetDir: string = join(projectRoot, "src", "content", "_Prepare");
    const pythonScript: string = join(currentDir, "fix_font.py");

    console.log(`项目根目录: ${projectRoot}`);
    console.log(`处理目录: ${targetDir}`);
    console.log(`Python 脚本: ${pythonScript}`);

    // 先试 python，失败再试 python3
    let result = spawnSync("python", [pythonScript, targetDir], {
        stdio: "inherit",
    });

    if (result.error && (result.error as NodeJS.ErrnoException).code === "ENOENT")
    {
        console.log("未找到 python 命令，尝试 python3...");
        result = spawnSync("python3", [pythonScript, targetDir], {
            stdio: "inherit",
        });
    }

    if (result.error)
    {
        console.error("执行失败:", result.error);
        process.exit(1);
    }

    if (result.status !== 0)
    {
        console.error(`Python 退出码: ${result.status}`);
        process.exit(1);
    }
}


export { entry };
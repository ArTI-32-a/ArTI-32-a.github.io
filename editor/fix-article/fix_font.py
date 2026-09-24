import os
import re
import sys


def clean_font_tags(content: str) -> str:
    def replace_tag(match: re.Match) -> str:
        tag = match.group(0)
        return re.sub(r'\s+style="[^"]*color[^"]*"', "", tag, flags=re.IGNORECASE)

    result = re.sub(r"<font[^>]*>", replace_tag, content, flags=re.IGNORECASE)
    result = re.sub(r"<font\s*>([\s\S]*?)</font>", r"\1", result, flags=re.IGNORECASE)

    return result


def process_dir(directory: str) -> None:
    for name in os.listdir(directory):
        full_path = os.path.join(directory, name)

        if os.path.isdir(full_path):
            process_dir(full_path)
            continue

        if not name.endswith(".md"):
            continue

        with open(full_path, "r", encoding="utf-8") as f:
            original = f.read()

        cleaned = clean_font_tags(original)

        if original == cleaned:
            print(f"未变化: {full_path}")
            continue

        with open(full_path, "w", encoding="utf-8") as f:
            f.write(cleaned)

        print(f"已处理: {full_path}")


def entry() -> None:
    if len(sys.argv) < 2:
        print("用法: python fix_font.py <目标目录>")
        sys.exit(1)

    target_dir = sys.argv[1]
    print(f"处理目录: {target_dir}")

    if not os.path.isdir(target_dir):
        print(f"目录不存在: {target_dir}")
        sys.exit(1)

    process_dir(target_dir)
    print("完成")


if __name__ == "__main__":
    entry()
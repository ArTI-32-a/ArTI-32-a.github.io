import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";

export async function buildBackground(
    source: ImageMetadata,
    sizes: number[] = [600, 1200, 1600, 2400]
) 
{
    // 不超过原图宽度，并去重、排序。
    const widths = [...new Set(
        sizes.map(width => Math.min(width, source.width))
    )].sort((a, b) => a - b);

    const variants = await Promise.all(
        widths.map(async (width, index) => 
        {
            const image = await getImage({
                src: source,
                width,
                format: "webp",
                quality: index === 0 ? 55 : 80,
            });

            return { width, src: image.src };
        })
    );

    return {
        variants,
        aspect: source.width / source.height,
    };
}
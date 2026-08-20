// @ts-check
import { defineConfig } from 'astro/config';
import expressiveCode from 'astro-expressive-code';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';

export default defineConfig({
    integrations: [
        expressiveCode({
            plugins: [pluginLineNumbers()],
            defaultProps: {
                showLineNumbers: true,
            },
            themes: ['github-dark'],
            styleOverrides: {
                codeBackground: '#1e1e2e', // 手动指定背景
            },
        }),
    ],
    markdown: {
        syntaxHighlight: false, // 关键：关闭 Astro 内置高亮
    },
});
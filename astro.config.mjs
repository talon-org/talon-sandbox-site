import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// 本地 UI 源码调试开关：
//   开发期：USE_LOCAL_UI=1 npm run dev
//   CI / npm run build 不传此变量，走 npm 安装的 dist 版本
const useLocalUI =
  process.env.USE_LOCAL_UI === '1' || process.env.VITE_USE_LOCAL_UI === '1';

// ui 包源码根目录（URL.pathname，无需 node:path / @types/node）
const uiSrc = new URL(
  '../talon-sandbox-ui/packages/react/src',
  import.meta.url,
).pathname;

export default defineConfig({
  integrations: [react()],
  output: 'static',
  build: {
    assets: '_assets',
  },
  vite: {
    build: {
      cssCodeSplit: false,
    },
    resolve: {
      alias: useLocalUI
        ? [
            {
              find: '@talon-sandbox/react/styles',
              replacement: new URL(
                'src/styles/local-ui-styles.css',
                import.meta.url,
              ).pathname,
            },
            {
              find: '@talon-sandbox/react',
              replacement: uiSrc,
            },
          ]
        : [],
    },
  },
});

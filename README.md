# talon-sandbox-site

talon-sandbox.com 的官网源码，基于 Astro 4 静态生成。

## 本地开发

```bash
pnpm install
pnpm dev        # 开发服务器 http://localhost:4321
pnpm build      # 构建静态文件到 dist/
pnpm preview    # 预览构建结果 http://localhost:8080
```

## 部署

静态站点，`dist/` 目录可直接部署到任意 CDN / 对象存储（Cloudflare Pages、Vercel、Nginx）。

## 技术栈

- Astro 4 (output: static)
- React 18（Hero 终端动画，`client:load`）
- `@talon-sandbox/tokens` — CSS 设计 tokens
- `@talon-sandbox/react` — Button 等 React 组件（当前使用 Button export）
- TypeScript strict

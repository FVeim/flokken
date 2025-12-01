# API (Elysia + Bun)

This folder contains a small Elysia API meant to run on Bun.

Dev:

```bash
cd api
bun install
bun run dev
```

Build (bundle for production runtime on Bun):

```bash
cd api
bun run build
```

Notes:
- This project uses Bun as the runtime. To produce a single native binary you can:
  - ship the Bun runtime with your Tauri app and run `bun dist/index.js` (simpler), or
  - investigate third-party packers for Bun, or use a CI process that bundles to a single artifact per platform.

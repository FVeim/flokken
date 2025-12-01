# Flokken — Astro (frontend) + Elysia (API on Bun) + Tauri (desktop)

This repository is structured to let Astro be your fullstack UI, Elysia run API endpoints on Bun, and Tauri package the desktop app.

Dev quickstart

1. Start the API (Bun + Elysia)

```bash
cd api
bun install
bun run dev
```

2. Start the frontend (Astro)

```bash
cd frontend
PUBLIC_API_URL="http://localhost:3421" bun npm run dev
```

3. Start the Tauri app (optional during dev)

```bash
cd desktop
npx tauri dev
```

Build for desktop (high level)

1. Build API: `cd api && bun run build` — this should produce `api/dist/index.js`.
2. Build frontend: `cd frontend && npm run build`.
3. Build Tauri: `cd desktop && npx tauri build` (tauri will include `api/dist/**` as resources).

Bundling Bun runtime

1. Place the Bun runtime for each platform under `desktop/bundled/<platform>/`.
	- Example: `desktop/bundled/linux/bun` or `desktop/bundled/windows/bun.exe`.
2. The `desktop/src-tauri/tauri.conf.json` includes `../bundled/**` so Tauri will package the runtime into the app resources.
3. There's a helper script to create the folder and show instructions: `desktop/scripts/download-bun.sh`.

During startup Tauri will prefer the bundled runtime if present, otherwise it will use `bun` from PATH.
Notes
- The current implementation spawns `bun` with the bundled `api/dist/index.js` in release builds. If you want a single native binary for the API, consider shipping a Bun runtime with the app or exploring native bundling options for Bun.

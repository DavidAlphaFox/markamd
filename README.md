<p align="center">
  <img src="./assets/readme-icon.png" width="180" alt="marka.md app icon" />
</p>

<h1 align="center">marka.md</h1>

<p align="center"><em>a local markdown editor for the notes you share with ai.</em></p>

<p align="center">
  <a href="https://markamd.vercel.app"><img src="https://img.shields.io/badge/site-markamd.vercel.app-orange?style=flat-square" alt="site" /></a>
  <a href="https://github.com/mattenarle10/markamd/releases/latest"><img src="https://img.shields.io/github/v/release/mattenarle10/markamd?style=flat-square&color=orange&label=release" alt="release" /></a>
  <a href="https://github.com/mattenarle10/markamd/releases"><img src="https://img.shields.io/github/downloads/mattenarle10/markamd/total?style=flat-square&color=black&label=downloads" alt="downloads" /></a>
  <a href="https://github.com/mattenarle10/markamd/stargazers"><img src="https://img.shields.io/github/stars/mattenarle10/markamd?style=flat-square&color=black&label=stars" alt="stars" /></a>
  <img src="https://img.shields.io/badge/macOS-13%2B-black?style=flat-square" alt="macos" />
  <img src="https://img.shields.io/badge/Windows-10%2B-black?style=flat-square" alt="windows" />
  <img src="https://img.shields.io/badge/Linux-x86__64-black?style=flat-square" alt="linux" />
  <img src="https://img.shields.io/badge/license-MIT-black?style=flat-square" alt="mit" />
  <img src="https://img.shields.io/badge/notarized-Apple%20Developer-orange?style=flat-square" alt="notarized" />
</p>

a cross-platform (**macOS · Windows · Linux**) markdown editor specialized for **ai context management**. live editor on the left (codemirror 6), rendered preview on the right (markdown-it + shiki + mermaid). minimal chrome, full catppuccin + matcha themes, orange octopus mascot. ~10 mb bundle.

> built around one loop: **collect notes → write → share with ai**. nothing leaves your machine until you copy.

works with claude, chatgpt, gemini, your local agent — anywhere that reads plain markdown.

## features

- **live preview** — debounced ~50 ms render with code blocks (shiki) and mermaid diagrams
- **5 themes** — catppuccin **latte / frappé / macchiato / mocha** + **matcha** (washi paper + kelly green) + system auto-switch
- **reading mode** — ⌘. flips to distraction-free preview-only with iA-style typography
- **command palette** — ⌘k, fuzzy-searchable, grouped by category
- **find / replace in editor** — ⌘f opens a themed codemirror search panel
- **find in reading mode** — ⌘f highlights matches in the rendered prose (text-node walker) · ↓↑ to nav, esc to close
- **external file watch** — auto-reloads when an open file changes outside the app (git pull, another editor) · conflict toast if you have unsaved edits
- **folder sidebar** — load a folder of `.md`, fuzzy-search across the tree, click to load
- **ide-style sidebar ops** — drag-to-move, right-click for rename / new file / new folder, ⌘⌥Z to undo
- **share to ai** — ⌘⇧c copies the current markdown to your clipboard, paste anywhere
- **export to pdf** — ⌘p renders preview-styled html, opens system print dialog
- **cross-platform auto-update** — signed releases (minisign), checks on launch, applies on quit
- **macos vibrancy** with opt-in transparency
- **auto-save off by default** — ⌘s commits. trust your fingers, not background daemons.
- **fully keyboard-driven** — every command has a shortcut, palette covers the rest

## install

[download the latest release →](https://github.com/mattenarle10/markamd/releases/latest)

### macOS (apple silicon, notarized)

grab `marka.md.dmg` → drag **marka.md.app** into `/Applications` → open.

### Windows (10+, x64)

grab `marka.md_*-setup.exe` → run.

Windows SmartScreen may show "Windows protected your PC". Click **More info** → **Run anyway**. marka.md is free + MIT — we don't sign Windows builds (paid certs aren't worth it for a free OSS project). Full source is right here if you'd rather build it yourself.

### Linux (x86_64)

three flavors, pick what fits your distro:

- **AppImage** (works anywhere): `chmod +x marka.md_*.AppImage` → run. self-contained, no install step needed.
- **.deb** (Debian / Ubuntu / Mint / Pop!_OS): `sudo dpkg -i marka.md_*_amd64.deb`
- **.rpm** (Fedora / RHEL / Rocky / openSUSE): `sudo dnf install marka.md-*.x86_64.rpm`

no signing required on Linux — it's the freedom platform 🐧

### from source

requires bun (or npm), rust toolchain. on macOS: xcode command line tools. on Windows: MSVC build tools (Visual Studio installer → "Desktop development with C++"). on Linux: `libwebkit2gtk-4.1-dev libsoup-3.0-dev` + friends.

```sh
bun install
bun run tauri dev      # native window with hmr
bun run tauri build    # produces .dmg (macOS) / -setup.exe (Windows) under src-tauri/target/release/bundle/
```

## keyboard

shortcuts shown with **macOS** modifiers below. on **Windows / Linux**, substitute `⌘` → `Ctrl`, `⌥` → `Alt`, `⇧` → `Shift`.

| key | does |
|---|---|
| ⌘K | command palette |
| ⌘O | open a `.md` file |
| ⌘⇧O | open a folder of notes |
| ⌘N | new untitled buffer |
| ⌘S | save (manual — no autosave) |
| ⌘B | toggle sidebar |
| ⌘. | toggle reading mode |
| ⌘F | find / replace in editor · or find in reading mode |
| ⌘G | find next match |
| ⌘⇧C | copy markdown to clipboard |
| ⌘P | export to pdf |
| ⌃⌘F | toggle fullscreen (macOS) · F11 on Windows/Linux |
| ⌘/ | help overlay |
| esc | close any popup |

## stack

| layer | choice |
|---|---|
| shell | tauri 2 (rust + webview), apple silicon target |
| frontend | react 19 · vite 7 · typescript 5.8 · bun |
| editor | codemirror 6 + `@codemirror/lang-markdown` + `@codemirror/search` |
| markdown | markdown-it + shiki + mermaid |
| icons | lucide-react |
| styling | css variables, no framework |

## project structure

```
src/
├── app.tsx                       # shell — state + layout
├── main.tsx                      # react entry
├── app.css                       # @imports + shell grid
├── components/
│   ├── primitives/               # button, icon, popover, overlay, kbd, tooltip
│   ├── chrome/                   # title-bar, breadcrumb, status-bar, logo
│   ├── editor/                   # editor, preview, splitter
│   ├── files/                    # sidebar, file-tree
│   ├── overlays/                 # palette, help, about, welcome, toast, drop
│   └── features/                 # top-level barrel
├── hooks/                        # debounced, persisted-state, shortcuts, sync-scroll
├── lib/                          # markdown, theme, files, storage, commands, demo
├── styles/                       # tokens, globals + per-domain css
└── assets/mascot/                # in-app sprites
src-tauri/
├── src/lib.rs                    # rust entry + vibrancy + finder open-with
├── tauri.conf.json               # overlay title bar + bundle config
├── capabilities/default.json     # fs + opener + dialog scopes
└── Cargo.toml
docs/
└── auto-update.md                # tauri updater wiring plan (post-notarization)
.github/workflows/release.yml     # tauri-action; auto-skips signing if no certs
```

every folder exports its public api via `index.ts`. path alias `@/*` resolves to `src/*`.

## roadmap

shipped (v1.0 — v1.3):
- **v1.0** — branded shell, mascot, welcome flow, codemirror + live preview, scroll sync, 5 themes (catppuccin + matcha), shiki code blocks, mermaid, ide-style sidebar, ⌘K palette, ⌘/ help, reading mode (⌘.), find/replace (⌘F+⌘G), export to pdf (⌘P), about overlay, apple-style toast
- **v1.0.x** — notarized macOS build (Apple Developer ID) + tauri-plugin-updater with minisign-signed bundles
- **v1.1** — **Windows support** (no-cert build, SmartScreen-warned but functional) · cross-platform CI matrix · per-platform `tauri.<platform>.conf.json` split
- **v1.2** — **⌘F find in reading mode** (text-node walker + live highlights) · **external file-change auto-reload** with conflict toast · platform-aware shortcut matching (⌘F ≠ ⌃⌘F)
- **v1.3** — **Linux support** (AppImage + .deb + .rpm) — now tri-platform 🐧 · cross-platform auto-update across all three OSes
- **v1.3.1** — patches: watcher rebind loop, stale find matches after preview re-render, mod+b stale closure
- **landing site** — /changelog page (fetched from gh releases), /feedback page (gh issue forms + mailto), /privacy, multi-platform download dropdown, FAQ section, "in the wild" featured strip, security headers (HSTS, CSP, X-Frame-Options), SoftwareApplication JSON-LD

planned (v1.4+):
- **more themes** — kanagawa, rose pine + polish matcha/macchiato contrast
- **in-app shortcut display** — auto-swap ⌘ → Ctrl on Windows/Linux across all UI strings (60+ occurrences)
- **session restore** — remember last folder + open file + scroll position
- **"context tray"** — multi-file bundling, ⌘-click to stage, copy as one prompt blob
- **intel mac support** (currently apple silicon only)
- **YouTube short** — 60s tri-platform demo

## privacy

local-first. nothing ever leaves your machine. no telemetry, no analytics, no accounts, no cloud sync. your `.md` files stay on disk. clipboard transfers happen only when you press ⌘⇧C — and then they're yours, going wherever you paste them.

see [the full privacy notice](https://markamd.vercel.app/privacy) for the website analytics caveat (vercel speed insights, cookieless).

## feedback

ideas, bugs, or just want to say hi?

- **structured form (GitHub)** — [feedback](https://github.com/mattenarle10/markamd/issues/new?template=feedback.yml) · [bug report](https://github.com/mattenarle10/markamd/issues/new?template=bug-report.yml)
- **prefer email?** → [enarlem10@gmail.com](mailto:enarlem10@gmail.com?subject=marka.md%20feedback)
- **landing page hub** → [markamd.vercel.app/feedback](https://markamd.vercel.app/feedback)
- **security issues** → [SECURITY.md](./SECURITY.md)

i read everything. PRs welcome.

## license

mit · matt enarle ([@mattenarle10](https://github.com/mattenarle10))

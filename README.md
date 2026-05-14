<p align="center">
  <img src="./assets/readme-icon.png" width="180" alt="marka.md app icon" />
</p>

<h1 align="center">marka.md</h1>

<p align="center"><em>a local markdown editor for the notes you share with ai.</em></p>

<p align="center">
  <a href="https://markamd.vercel.app"><img src="https://img.shields.io/badge/site-markamd.vercel.app-orange?style=flat-square" alt="site" /></a>
  <a href="https://github.com/mattenarle10/markamd/releases"><img src="https://img.shields.io/github/v/release/mattenarle10/markamd?include_prereleases&style=flat-square&color=orange&label=release" alt="release" /></a>
  <img src="https://img.shields.io/badge/macOS-13%2B-black?style=flat-square" alt="macos" />
  <img src="https://img.shields.io/badge/license-MIT-black?style=flat-square" alt="mit" />
  <img src="https://img.shields.io/badge/status-pre--release-orange?style=flat-square" alt="status" />
</p>

a native macos markdown editor specialized for **ai context management**. live editor on the left (codemirror 6), rendered preview on the right (markdown-it + shiki + mermaid + katex). minimal chrome, full catppuccin + matcha themes, macos vibrancy, orange octopus mascot. ~10 mb bundle.

> built around one loop: **collect notes → write → share with ai**. nothing leaves your machine until you copy.

works with claude, chatgpt, gemini, your local agent — anywhere that reads plain markdown.

## features

- **live preview** — debounced ~50 ms render with code blocks (shiki), mermaid diagrams, katex math
- **5 themes** — catppuccin **latte / frappé / macchiato / mocha** + **matcha** (washi paper + kelly green) + system auto-switch
- **reading mode** — ⌘. flips to distraction-free preview-only with iA-style typography
- **command palette** — ⌘k, fuzzy-searchable, grouped by category
- **find / replace** — ⌘f opens a themed codemirror search panel
- **folder sidebar** — load a folder of `.md`, fuzzy-search across the tree, click to load
- **share to ai** — ⌘⇧c copies the current markdown to your clipboard, paste anywhere
- **export to pdf** — ⌘p renders preview-styled html, opens system print dialog
- **macos vibrancy** with opt-in transparency
- **auto-save off by default** — ⌘s commits. trust your fingers, not background daemons.
- **fully keyboard-driven** — every command has a shortcut, palette covers the rest

## install

### prebuilt `.dmg` (apple silicon)

[download the latest release →](https://github.com/mattenarle10/markamd/releases/latest)

### ⚠️ first launch — "marka.md is damaged"

macos gatekeeper shows a misleading **"marka.md is damaged"** message for unsigned downloads. the app isn't damaged — it's just not yet notarized (apple developer enrollment in flight). **one-time fix** after dragging to `/Applications`:

```sh
xattr -rd com.apple.quarantine /Applications/marka.md.app
```

double-click to open. notarized v1.0 will drop this requirement.

### from source

requires bun (or npm), rust toolchain, xcode command line tools.

```sh
bun install
bun run tauri dev      # native window with hmr
bun run tauri build    # produces .dmg under src-tauri/target/release/bundle/dmg/
```

## keyboard

| key | does |
|---|---|
| ⌘K | command palette |
| ⌘O | open a `.md` file |
| ⌘⇧O | open a folder of notes |
| ⌘N | new untitled buffer |
| ⌘S | save (manual — no autosave) |
| ⌘B | toggle sidebar |
| ⌘. | toggle reading mode |
| ⌘F | find / replace in editor |
| ⌘G | find next match |
| ⌘⇧C | copy markdown to clipboard |
| ⌘P | export to pdf |
| ⌃⌘F | toggle fullscreen |
| ⌘/ | help overlay |
| esc | close any popup |

## stack

| layer | choice |
|---|---|
| shell | tauri 2 (rust + webview), apple silicon target |
| frontend | react 19 · vite 7 · typescript 5.8 · bun |
| editor | codemirror 6 + `@codemirror/lang-markdown` + `@codemirror/search` |
| markdown | markdown-it + shiki + mermaid + katex |
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

shipped:
- branded shell + mascot + welcome flow with pre-release chip
- codemirror editor + live preview + resizable splitter + scroll sync (counter-based echo prevention)
- 5 themes (catppuccin family + matcha) + transparency
- code blocks: copy-on-hover + shiki highlighting
- mermaid diagrams + katex math
- file tree sidebar with fuzzy search + persisted state
- ⌘K command palette grouped by category + ⌘/ help overlay grouped by category
- reading mode (⌘.) with iA-style typography
- find / replace (⌘F + ⌘G)
- export to pdf (⌘P) with hardened print css
- about overlay (version + mit + github + author)
- apple-style toast (bottom-center, glass blur, auto-dismiss for info)
- title-bar window-drag + tooltip viewport clamping

planned:
- ide-style sidebar — drag-to-move files/folders, right-click rename / new folder
- "context tray" — multi-file bundling, ⌘-click to stage, copy as one prompt blob
- session restore — remember last folder + open file + scroll position
- /changelog page on landing (fetched from gh releases)
- faq section on landing
- notarized v1.0 (apple developer enrollment pending)
- auto-updater wiring (see [docs/auto-update.md](./docs/auto-update.md))
- windows + linux builds

## privacy

local-first. nothing ever leaves your machine. no telemetry, no analytics, no accounts, no cloud sync. your `.md` files stay on disk. clipboard transfers happen only when you press ⌘⇧C — and then they're yours, going wherever you paste them.

## license

mit · matt enarle ([@mattenarle10](https://github.com/mattenarle10))

# NEONDECK Design Language

The one look for every app and site in `cyberpunk_apps/`. If a new screen does not look like it belongs next to `reference/showcase-desktop.png`, it is off-brand.

Code lives in `neondeck/` (a Svelte 5 library). This doc is the *why* and the *rules*. The tokens in `neondeck/src/lib/styles/tokens.css` are the *values*.

---

## 1. The feel in one paragraph

Night City at 3 a.m., seen through a cyberdeck. A blue-black world, wet and dark. The only light comes from neon: hot magenta, electric cyan, and an acid-yellow sign. The interface is a machine, not a brochure. It is raw, systematic and honest about its structure. You can see the grid, the rulers, the numbered sections and the status readouts. Corners are cut, not rounded. Type is technical and uppercase where it labels things. Now and then a page breaks into a Japanese street poster, with cream paper, black ink, a red sun and huge kanji. That is the editorial voice.

## 2. Sources (images/)

| Plate | What we took |
|---|---|
| `colors/` Night City skyline, rooftop "Cyber Glow" | Base palette: navy-black sky (#040513, #05122e), indigo haze (#393677, #6252a0). Neon magenta and cyan reflections on wet floors. |
| `colors/` cyber-girl portrait, data-eye, gas-mask girl | Magenta/violet/lavender range. Lavender (#938ecd) became `text-dim`. |
| `colors/` "Love or Die" graffiti | Cyan (#1ff3f7) + magenta on pure black, plus RGB-split glitch type. |
| `colors/` NC77 sign | Acid yellow (#f3ed58). |
| `colors/` streetwear girl | Warm "street" set: mustard, coral, teal, khaki. |
| `look_and_feel/` Cyber Brutalism web page | **Web layout**: sticky top bar with a solid brand block, `+`-separated nav, SYS_TIME readout, `/01` numbered sections, hairline grid, mono uppercase, status readouts, hazard-tape footer. |
| `look_and_feel/` cyberdeck HUDs (red/teal) | **App chrome**: chamfered panels, accent tab on panel tops, tick rulers, barcodes, binary strings, segmented progress, menu buttons with micro-captions. |
| `look_and_feel/` phone widgets | Outline-neon cut-corner widgets on a carbon-fibre plate. Mixed neon colors per widget. |
| `look_and_feel/` posters (Enticing, geisha, kanji, cyborg) | **Editorial**: cream paper, ink, red sun disc, vertical CJK type, stamp seals, collage. |
| `look_and_feel/` red monolith | Restraint. One beam of light in a dark scene is stronger than ten. |
| `look_and_feel/` neon alley | Neon on grit. The glow is the only clean thing in the frame. |

## 3. Color

**Dark only. No light mode, ever.** `color-scheme: dark`. Paper blocks are the one cream exception (§7).

### Base (90% of every screen)
| Token | Hex | Use |
|---|---|---|
| `--nd-void` | #03040c | page edge, input wells, code blocks, status bar |
| `--nd-bg` | #070818 | app background (+ faint violet/magenta radial haze) |
| `--nd-surface-1` | #0c0f26 | panels |
| `--nd-surface-2` | #12163a | hover, nested |
| `--nd-surface-3` | #1b1f4a | menus, popovers, selected |
| `--nd-line` | #262a5c | hairlines, grid, row dividers |
| `--nd-line-strong` | #43479a | panel frames |
| `--nd-text` | #ecebff | copy (cool white, never #fff) |
| `--nd-text-dim` | #a49fd9 | labels, secondary copy |
| `--nd-text-mute` | #6c68a8 | meta, placeholder, disabled |

Never use pure black or neutral grey. Every dark is tinted blue/violet.

### Neon (the light sources, at most ~10% of pixels)
| Token | Hex | Role |
|---|---|---|
| `--nd-magenta` | #ff2bd6 | **accent**: brand, primary action, active nav |
| `--nd-cyan` | #22f2f7 | **accent-2**: links, success/online, focus ring, coords |
| `--nd-yellow` | #f5ec58 | warning, hazard tape, data highlight |
| `--nd-red` | #ff3b52 | danger, breach, destructive |
| `--nd-blue` | #3f5bff | info |
| `--nd-violet` | #a66bff | ambient haze, chart series |
| `--nd-pink` | #ff5fb4 | secondary neon, gradients |

Components use **semantic** tokens (`--nd-accent`, `--nd-accent-2`, `--nd-success`, `--nd-warning`, `--nd-danger`, `--nd-info`, `--nd-focus`), not raw names. Swap the accent per section or per app with `data-nd-accent="cyan|magenta|yellow|red|violet"`. Each app may pick its own home accent. Magenta is the house default.

### Street + Paper (secondary)
Street (`mustard #efb22a`, `coral #ef6352`, `teal #0b5566`, `khaki #a0966d`) is for illustration and chart series 6+. It never goes on UI chrome. Paper (`paper #ece4cf`, `ink #121214`, `sun #e8202f`) is for editorial blocks only.

### Chart series order
magenta, cyan, yellow, violet, blue, coral, mustard, pink (`--nd-series-1..8` / `series` in tokens.ts).

## 4. Typography

| Role | Font | Rules |
|---|---|---|
| Display + body | **Chakra Petch** 400–700 | Headings UPPERCASE, bold, tight leading (1.05). Body sentence case, 15px, leading 1.55, max 68ch. |
| UI labels, buttons, nav | **Rajdhani** 600–700 | Always UPPERCASE, tracking 0.14em, 12–15px. |
| Data, meta, IDs, numbers | **JetBrains Mono** 400/600 | Tabular nums. Every number, timestamp, coordinate, hash, version. Often lowercase-in-uppercase style: `SYS_TIME`, `CPU_USAGE`, `//SCN_01`. |
| Decorative CJK | **Noto Sans JP** 900 | Huge, often vertical. Always has an English `aria-label`. Never carries meaning alone. |

Fonts ship via fontsource (self-hosted, so they work offline in Wails). The hero size is `clamp(3rem, 9vw, 7rem)`. Use the type scale tokens `--nd-text-2xs … 5xl`. Never invent sizes.

**Voice in copy:** short, declarative, a little menacing. Use machine idioms: `> READY`, `ACCESS GRANTED_`, `RENDERING... 87%`, `ROOT@APP : ~ #`. Use underscores in identifiers (`DATA_PORTAL`) and slashes for paths and indices (`/03`, `//SCN_01`). Don't overdo it: real labels must still be clear ("Save", not "COMMIT_PAYLOAD").

## 5. Shape, line, light

- **Radius is 0.** Corners are **cut (chamfered)**: `--nd-cut-xs/sm/md/lg` = 4/8/14/22px. Panels cut top-left + bottom-right. Buttons cut top-right only. Inputs cut bottom-right. The **only** circle allowed is the poster sun (plus status dots, which are square).
- **1px lines everywhere.** Frames are 1px. Grids are 1px. Dividers are 1px. Never use a 2px+ border except the active-nav underline and the code-block left rule.
- **Borders come from a wrapper** (frame div with border-color background, inner div clipped 1px smaller), because `clip-path` eats CSS borders. `Panel`, `Button` and `Input` already do this. Copy the pattern for new framed things.
- **Glow = light source.** A two-layer shadow (4px core + 16px halo). **One glowing element per view region**: the primary CTA, the active nav item, or one hero word. Glowing panels are rare (one per screen at most). Glow scales with `--nd-glow-size` and is turned off under `prefers-contrast: more`.
- **HUD furniture** (decorative, `aria-hidden`): corner brackets `.nd-brackets`, tick `Ruler`, `Barcode` stamps, coordinate boxes, binary strings, `//SCN_01` tags. Use them at edges and in empty space. Never put them inside dense content.
- **Textures:** `.nd-grid-bg` (48px blueprint grid, heroes), `.nd-dot-bg`, `.nd-carbon-bg` (widget plates), `.nd-hatch` (empty/disabled), `.nd-hazard` (caution tape), `.nd-scanlines` (heroes or a full-screen fx overlay; never over body text).

## 6. Layout

### The shell (`AppShell`), used by every app and site
```
┌[BRAND_]┐ NAV + NAV + NAV + NAV ··········· │SYS_TIME│ [CTA ↗] ┐  sticky top bar, 56px, blurred bg
│ R │                                                          │
│ A │   main: max 80rem, gutter clamp(1rem,3vw,2.5rem)         │
│ I │   sections stacked, 6rem apart                           │
│ L │                                                          │
└ > READY   node: tyo-01   latency 12ms  ·········  build 0.1.0 ┘  sticky status bar, 28px, mono
```
- **Brand block:** solid accent fill, dark text, top-right cut. Brand names end in `_` (`CYBR_`, `NEONDECK_`).
- **Nav:** Rajdhani uppercase, `+` separators in accent. The active item is accent-colored with a glowing 2px underline.
- **Rail** (48px): a vertical tick ruler + a rotated mono caption (`DESIGN SYSTEM // V0.1`). Apps with real navigation swap the rail for a 240px **sidebar**.
- **Status bar:** always present. Left = live state (Tag with dot), middle = context, right = build/version/prompt.
- Under 720px: rail and clock hide, nav wraps to a scrolling second row.

### Page anatomy (websites)
1. **Hero:** a 2-column split (≈55/45) on `.nd-grid-bg`. Left: `> RENDERING...` meta, huge 2-line title (line 1 white with glitch-on-hover, line 2 neon), mono neon tagline, dim lede, primary button + ghost button. Right: a HUD visual inside corner brackets, with an index tag `/01`, a coordinate box and `//SCN_01`. Image, kanji or 3D wireframe; ideally a neon sun disc behind.
2. **Numbered sections:** every section opens with `SectionHeader` (`/02 CORE PRINCIPLES ───── meta`). Number them in page order.
3. **Feature rows:** equal columns split by 1px vertical hairlines, inside top/bottom hairlines. Each has an index, a cyan uppercase title and dim short copy. No cards here.
4. **Work/content grids:** Panels in a 12-col grid (3 or 4 across). Image on top, label row underneath with a ↗ arrow.
5. **Editorial break** (optional, one per page max): a paper poster block.
6. **Footer:** columns of mono links, then a full-width `HazardStripe` with `> ACCESS GRANTED_`.

### App anatomy (Wails desktop / dashboards)
- AppShell with sidebar. Content is a **dashboard grid** of Panels (`repeat(3, 1fr)`, 20px gaps, `span-2` for wide panels).
- Every Panel has an index + title + mono meta in its header. Numbers go in `Readout`s, and any 0–100 value is a segmented `Meter`.
- Primary action list = stacked block `Button`s with `sub` micro-captions (the cyberdeck menu).
- Tables use `.nd-table`: mono right-aligned numbers, hairline rows, accent-tint hover, status as `Tag`s.
- Wails window background must match `--nd-bg`: `BackgroundColour: &options.RGBA{R: 7, G: 8, B: 24, A: 255}` (`wailsBackground` in tokens). Use a frameless window with our own top bar where practical.

### Density and spacing
4px grid (`--nd-space-*`). Inside panels: 16–20px padding, 8–16px between controls. Between page sections: 96px. Data UIs are dense. Marketing pages are airy, but the grid always shows.

## 7. Editorial / poster mode (`.nd-paper`)
For about pages, launches, long reads and print. Cream paper with a halftone dot, black ink and **one** red sun disc bleeding off an edge. Vertical kanji sits in a black side band. The title is huge and set in Chakra Petch ink. `.nd-paper` re-maps the text, line and accent tokens, so components inside it just work. Never use it for app chrome, forms or dashboards.

## 8. Motion
Fast and mechanical: 80/140/220/420ms, ease `cubic-bezier(.2,.8,.2,1)` or `steps()`. Nothing bounces or springs. Allowed effects: glitch RGB-split on hover (headlines/logos), blinking `_` cursor, square status-dot pulse, neon flicker (**one** element per page, max), segmented meters filling. `prefers-reduced-motion` kills all of it.

## 9. Accessibility (not optional)
- Measured contrast on `--nd-bg`: text 16.9:1, text-dim 8.1:1, cyan 14.3:1, magenta 6.2:1, text-mute 4.0:1. `text-mute` is only for meta (≥ AA-large), never for essential content. Dark text on a magenta fill is 6.2:1 and on red 5.7:1.
- Paper: ink 14.8:1. `sun` red on paper is 3.5:1, so it is fine for big kanji and titles but never for body text.
- Neon text is fine for short labels. Long copy is always `--nd-text`.
- Focus: a 2px cyan outline, offset 2–3px, on everything. Never remove it.
- Decorative HUD (barcodes, rulers, kanji, coords) gets `aria-hidden` or an English `aria-label`.
- Color is never the only signal. Tags carry words (`DOWN`, not just red).

## 10. Do / Don't
**Do:** cut corners · show the grid · number sections · put numbers in mono · use one glow per zone · add `_` cursors and `>` prompts · use hairlines over boxes · use dark blue-black over black.

**Don't:** rounded corners · drop shadows for elevation (use surface steps instead) · gradients on buttons · pure #000 or #fff · grey neutrals · emoji as icons · more than 2 neon hues in one component · light mode · glassmorphism blur, except the top bar · Inter/Roboto/system fonts.

## 11. Using it
```bash
# in a new SvelteKit or Wails frontend
npm i ../sharable_assets/neondeck        # or file: dep / workspace
```
```svelte
<!-- +layout.svelte (SvelteKit) or App.svelte (Wails) -->
<script>
  import 'neondeck/styles.css';
  import { AppShell, Panel, Button } from 'neondeck';
</script>
```
Components: `AppShell, Panel, Button, SectionHeader, Readout, Meter, Tag, Input, HazardStripe, GlitchText, Barcode, Ruler, KanjiMark, SysClock`. Utility classes: `.nd-label .nd-mono .nd-meta .nd-index .nd-cursor .nd-neon .nd-neon-2 .nd-flicker .nd-cut .nd-cut-tr .nd-cut-br .nd-brackets .nd-grid-bg .nd-dot-bg .nd-carbon-bg .nd-hazard .nd-hatch .nd-scanlines .nd-paper .nd-glitch .nd-table`. JS/Go values: `neondeck/tokens.json`.

New components must use only `--nd-*` tokens and follow §5. Then add them to the showcase page (`neondeck/src/routes/+page.svelte`).

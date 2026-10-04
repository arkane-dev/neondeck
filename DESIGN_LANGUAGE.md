# NEONDECK Design Language

The one look for every app and site in `cyberpunk_apps/`. If a new screen does not look like it belongs next to `reference/showcase-desktop.png`, it is off-brand.

Code lives in `neondeck/` (a Svelte 5 library). This doc is the *why* and the *rules*. The tokens in `neondeck/src/lib/styles/tokens.css` are the *values*.

---

## 1. The feel in one paragraph

Night City at 3 a.m., seen through a cyberdeck. A blue-black world, wet and dark. The only light comes from neon: hot magenta, electric cyan, and an acid-yellow sign. The interface is a machine, not a brochure. It is raw, systematic and honest about its structure. You can see the grid, the rulers, the numbered sections and the status readouts. Corners are cut, not rounded. Type is technical and uppercase where it labels things. The city is **Chongqing, Shanghai and Shenzhen**, not 1980s Tokyo. Streets are walls of vertical neon signboards, and every sign is bilingual. Building faces are LED screens, and the drone show draws a dragon in points of light over the river. Mist hangs between the towers. All CJK type is **Simplified Chinese**, never Japanese. Now and then a page breaks into a Chinese street poster, with cream paper, black ink, huge hanzi and one cinnabar seal. That is the editorial voice.

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
| `look_and_feel/` posters (Enticing, geisha, calligraphy, cyborg) | **Editorial**: cream paper, ink, vertical CJK type, stamp seals, collage. The plates are mostly Japanese, so we keep the layout, set the type in Simplified Chinese, and drop the red-sun disc (a Japanese flag motif) for a cinnabar seal. |
| `china/` Deni World, Chongqing travel guide | **Vertical neon signboards**: one hanzi per lit cell, each sign its own color, pinyin caption under it (重庆 / CHONG QING). Layered, dense, bilingual. → `NeonSign`. |
| `china/` Chongqing skyscraper, Bund drone show, LED face | **LED / dot-matrix lettering**: words built from points of light (上海 + dragon, red pixel face). Façade text runs vertically, Chinese beside Latin. → `DotMatrix`, `.nd-led-bg`. |
| `china/` neon pagoda, giant Buddha street | **Mist**: rose fog (#7d3357) and teal fog (#52a6c0) between buildings; temple silhouettes in neon. → `.nd-fog`. |
| `china/` all plates | New colors: jade-green signs (#50efbb), lantern/hotpot gold (#f4c273). Magenta and cyan confirmed as the core. |
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
| `--nd-line-strong` | #5659a4 | panel frames, input edges (≥3:1, WCAG 1.4.11) |
| `--nd-text` | #ecebff | copy (cool white, never #fff) |
| `--nd-text-dim` | #a49fd9 | labels, secondary copy |
| `--nd-text-mute` | #8885b9 | meta, hints, table headers (≥4.5:1 on every surface) |

Never use pure black or neutral grey. Every dark is tinted blue/violet.

### Neon (the light sources, at most ~10% of pixels)
| Token | Hex | Role |
|---|---|---|
| `--nd-magenta` | #ff2bd6 | **accent**: brand, primary action, active nav |
| `--nd-cyan` | #22f2f7 | **accent-2**: links, success/online, focus ring, coords |
| `--nd-yellow` | #f5ec58 | warning, hazard tape, data highlight |
| `--nd-red` | #ff3b52 | danger, breach, destructive |
| `--nd-blue` | #6077ff | info |
| `--nd-violet` | #a66bff | ambient haze, chart series |
| `--nd-pink` | #ff5fb4 | secondary neon, gradients |

Components use **semantic** tokens (`--nd-accent`, `--nd-accent-2`, `--nd-success`, `--nd-warning`, `--nd-danger`, `--nd-info`, `--nd-focus`), not raw names. Swap the accent per section or per app with `data-nd-accent="cyan|magenta|yellow|red|violet|jade|gold"`. Each app may pick its own home accent. Magenta is the house default.

### China (signs, lanterns, seals, mist)
| Token | Hex | Role |
|---|---|---|
| `--nd-jade` | #3ff0b8 | jade-green neon signs, charts. An accent option: `data-nd-accent="jade"` |
| `--nd-gold` | #f6bd6a | lantern / hotpot-sign amber, warm highlight. `data-nd-accent="gold"` |
| `--nd-cinnabar` | #b81f1a | 朱砂 seal-stamp red. Seals and paper accents. **Ink, not light: it never glows.** |
| `--nd-fog-teal` | #2f7c97 | mist, only inside `.nd-fog`, ≤22% |
| `--nd-fog-rose` | #7d3357 | mist, only inside `.nd-fog`, ≤28% |

### Street + Paper (secondary)
Street (`mustard #efb22a`, `coral #ef6352`, `teal #0b5566`, `khaki #a0966d`) is for illustration and chart series 6+. It never goes on UI chrome. Paper (`paper #ece4cf`, `ink #121214`) is for editorial blocks only. `sun #e8202f` is kept for older pages but is **deprecated**: the red disc reads as the Japanese flag. Use a `Seal` instead.

### Chart series order
magenta, cyan, yellow, jade, violet, gold, blue, coral (`--nd-series-1..8` / `series` in tokens.ts).

## 4. Typography

| Role | Font | Rules |
|---|---|---|
| Display + body | **Chakra Petch** 400–700 | Headings UPPERCASE, bold, tight leading (1.05). Body sentence case, 15px, leading 1.55, max 68ch. |
| UI labels, buttons, nav | **Rajdhani** 600–700 | Always UPPERCASE, tracking 0.14em, 12–15px. |
| Data, meta, IDs, numbers | **JetBrains Mono** 400/600 | Tabular nums. Every number, timestamp, coordinate, hash, version. Often lowercase-in-uppercase style: `SYS_TIME`, `CPU_USAGE`, `//SCN_01`. |
| Decorative hanzi | **Noto Sans SC** 900 (`face="gothic"`) or **ZCOOL QingKe HuangYou** (`face="tech"`, squared, pairs with Chakra Petch) | Simplified Chinese only, set with `lang="zh-Hans"` so browsers draw Chinese (not Japanese) glyph forms. Huge, often vertical. Always has an English `aria-label`. Never carries meaning alone. Use real Chinese words checked for meaning, e.g. 霓虹都市 (Neon City), 诱惑 (Enticing). Never Japanese kana or Japanese-only grammar (の, 的 as a Japanese adjective ending). |

Fonts ship via fontsource (self-hosted, so they work offline in Wails). The hero size is `clamp(3rem, 9vw, 7rem)`. Use the type scale tokens `--nd-text-2xs … 5xl`. Never invent sizes.

**Voice in copy:** short, declarative, a little menacing. Sample names and places lean Chinese: nodes like `longmen-01`, regions `SZX`/`SHA`/`HKG`. Use invented names, never real companies. Use machine idioms: `> READY`, `ACCESS GRANTED_`, `RENDERING... 87%`, `ROOT@APP : ~ #`. Use underscores in identifiers (`DATA_PORTAL`) and slashes for paths and indices (`/03`, `//SCN_01`). Don't overdo it: real labels must still be clear ("Save", not "COMMIT_PAYLOAD").

## 5. Shape, line, light

- **Radius is 0.** Corners are **cut (chamfered)**: `--nd-cut-xs/sm/md/lg` = 4/8/14/22px. Panels cut top-left + bottom-right. Buttons cut top-right only. Inputs cut bottom-right. No circles, except LED dots inside `DotMatrix`. Status dots are square.
- **1px lines everywhere.** Frames are 1px. Grids are 1px. Dividers are 1px. Never use a 2px+ border except the active-nav underline and the code-block left rule.
- **Borders come from a wrapper** (frame div with border-color background, inner div clipped 1px smaller), because `clip-path` eats CSS borders. `Panel`, `Button` and `Input` already do this. Copy the pattern for new framed things.
- **Glow = light source.** A two-layer shadow (4px core + 16px halo). **One glowing element per view region**: the primary CTA, the active nav item, one hero word, or **one sign cluster** (a group of `NeonSign`s reads as one lit street, so it counts once). Glowing panels are rare (one per screen at most). Glow scales with `--nd-glow-size` and is turned off under `prefers-contrast: more`.
- **HUD furniture** (decorative, `aria-hidden`): corner brackets `.nd-brackets`, tick `Ruler`, `Barcode` stamps, coordinate boxes, binary strings, `//SCN_01` tags. Use them at edges and in empty space. Never put them inside dense content.
- **Signage** (from `images/china`):
  - `NeonSign` is a vertical signboard: a 2px tube frame (the one allowed 2px border), white-hot glyphs with a colored halo, one character per cell, and a spaced pinyin caption under it. Group 2–4 signs in **different tones** and at **staggered heights**, like a street. Pick real words: 不夜城 (city that never sleeps), 霓虹 (neon), 山城 (mountain city), 重庆, 火锅, 你好.
  - `DotMatrix` renders text as LEDs for façades, drone-show moments and big brand marks. Use ≥16 rows for hanzi, and place it on `.nd-led-bg`.
  - `Seal` (印章) is the red mark. *Intaglio* (白文, the default) cuts cream glyphs into a cinnabar block. *Relief* (朱文) is cinnabar glyphs and border on its own paper. Four characters read in columns from right to left. Tilt ±4° at most for a hand-stamped look. It never glows. Use it as a sign-off, an approval stamp or a brand mark on paper.
- **Textures:** `.nd-fog` (street mist, its own layer, so it stacks with grids and brackets), `.nd-led-bg` (LED panel dots), `.nd-grid-bg` (48px blueprint grid, heroes), `.nd-dot-bg`, `.nd-carbon-bg` (widget plates), `.nd-hatch` (empty/disabled), `.nd-hazard` (caution tape), `.nd-scanlines` (heroes or a full-screen fx overlay; never over body text).

## 6. Layout

### The shell (`AppShell`), used by every app and site
```
┌[BRAND_]┐ NAV + NAV + NAV + NAV ··········· │SYS_TIME│ [CTA ↗] ┐  sticky top bar, 56px, blurred bg
│ R │                                                          │
│ A │   main: max 80rem, gutter clamp(1rem,3vw,2.5rem)         │
│ I │   sections stacked, 6rem apart                           │
│ L │                                                          │
└ > READY   node: szx-01   latency 12ms  ·········  build 0.1.0 ┘  sticky status bar, 28px, mono
```
- **Brand block:** solid accent fill, dark text, top-right cut. Brand names end in `_` (`CYBR_`, `NEONDECK_`).
- **Nav:** Rajdhani uppercase, `+` separators in accent. The active item is accent-colored with a glowing 2px underline.
- **Rail** (48px): a vertical tick ruler + a rotated mono caption (`DESIGN SYSTEM // V0.1`). Apps with real navigation swap the rail for a 240px **sidebar**.
- **Status bar:** always present. Left = live state (Tag with dot), middle = context, right = build/version/prompt.
- Under 720px: rail and clock hide, nav wraps to a scrolling second row.

### Page anatomy (websites)
1. **Hero:** a 2-column split (≈55/45) on `.nd-grid-bg`. Left: `> RENDERING...` meta, huge 2-line title (line 1 white with glitch-on-hover, line 2 neon), mono neon tagline, dim lede, primary button + ghost button. Right: a HUD visual on `.nd-grid-bg` + `.nd-fog` inside corner brackets, with an index tag `/01`, a coordinate box (real coordinates, e.g. Chongqing `N_29.5630 E_106.5516`) and `//CKG_01`. The centerpiece is a **cluster of 2–4 NeonSigns** at staggered heights (or an image, LED text, or 3D wireframe).
2. **Numbered, bilingual sections:** every section opens with `SectionHeader` and a `zh` title (`/02 核心原则 CORE PRINCIPLES ───── meta`). Number them in page order. Chinese comes first, as on the street signs.
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
For about pages, launches, long reads and print. Cream paper with a halftone dot, black ink and **one cinnabar `Seal`** in a corner (no sun disc). Inside paper the accent is **ink** (buttons are ink-black with cream text). Vertical hanzi sit in a black side band. The title is huge and set in Chakra Petch ink. `.nd-paper` re-maps the text, line and accent tokens, so components inside it just work. Never use it for app chrome, forms or dashboards.

## 8. Motion
Fast and mechanical: 80/140/220/420ms, ease `cubic-bezier(.2,.8,.2,1)` or `steps()`. Nothing bounces or springs. Allowed effects: glitch RGB-split on hover (headlines/logos), blinking `_` cursor, square status-dot pulse, neon flicker (**one** element per page, max), segmented meters filling. `prefers-reduced-motion` kills all of it.

## 9. Accessibility (not optional)
The palette is tuned to pass **WCAG 2.2 AA**. These are the checks axe, Lighthouse and WAVE run:
- **1.4.3 Contrast (Minimum):** text needs 4.5:1, or 3:1 if large (≥24px, or ≥18.66px bold). AAA (1.4.6) is 7:1.
- **1.4.11 Non-text Contrast:** component boundaries (input edges, button edges), focus rings and meaningful graphics (meter segments) need 3:1 against what is next to them.

**How it's enforced**
- `npm run contrast` (in `neondeck/`) checks 98 token pairs and exits 1 on any failure. Run it after touching a color.
- axe-core on the rendered showcase shows 0 violations at 1440px and 400px. 2026-10-04: 1 real bug found and fixed (button captions).

**Measured on `--nd-bg`**
| Color | Ratio |
|---|---|
| text | 16.9:1 |
| text-dim | 8.1:1 |
| text-mute | 5.8:1 (worst: 4.55:1 on surface-3) |
| cyan | 14.3:1 |
| yellow | 16.1:1 |
| magenta | 6.2:1 |
| red | 5.7:1 |
| violet | 5.8:1 |
| blue | 5.3:1 |
| dark text on neon fills | 5.3–16.1:1 |
| panel/input edge | 3.0–3.3:1 |

**Rules that keep it passing**
- **Never use `opacity` or alpha to dim text.** It silently cuts contrast; that was exactly the button-caption bug. Use `--nd-text-dim` or `--nd-text-mute` instead.
- **Tints behind text are ≤14% neon.** A Tag's tone color on its own 10% tint passes for every neon.
- **Anything with text that overlaps art needs an opaque background.** Example: the coordinate box over the sun.
- **Text over a neon disc is large and white**, and the disc stays ≤80% opacity with a magenta (not pink) core, giving ≥4:1. Small text never sits on a neon disc.
- **Paper mode:** sun-red on paper is only 3.5:1, and dark text on sun-red is 4.2:1. So inside `.nd-paper` the accent becomes **ink**: buttons are ink with cream text, at 14.8:1. Sun-red is for `HanziMark tone="sun"` and titles ≥24px only. Cinnabar (#b81f1a) is darker, so it passes as small text on paper (5.1:1) and carries cream glyphs at 5.1:1.
- **China layer:** sign glyphs are 12–17:1 and pinyin captions are ≥5.4:1. Cinnabar on the dark UI is only 3.1:1, so **relief seals always bring their own paper backing** (axe caught this). Fog is capped at 22% teal / 28% rose so `text-mute` stays ≥4.7:1 over it.
- **Focus:** a 2px cyan outline, offset 2–3px. The offset means it is judged against the page background (14:1), not the button. Paper mode switches focus to ink. Never remove it.
- **Translucent top bar** (88% bg): worst case is 4.9:1 when it scrolls over paper or yellow. Don't lower that opacity.
- Decorative HUD (barcodes, rulers, hanzi, coords) gets `aria-hidden` or an English `aria-label`.
- Color is never the only signal. Tags carry words (`DOWN`, not just red).
- `prefers-contrast: more` turns off glow and brightens lines and secondary text.

## 10. Do / Don't
**Do:** cut corners · show the grid · number sections · put numbers in mono · use one glow per zone · add `_` cursors and `>` prompts · use hairlines over boxes · use dark blue-black over black · pair hanzi with pinyin/English · stagger signs like a street · sign off with a seal.

**Don't:** rounded corners · drop shadows for elevation (use surface steps instead) · gradients on buttons · pure #000 or #fff · grey neutrals · emoji as icons · more than 2 neon hues in one component · light mode · glassmorphism blur, except the top bar · Inter/Roboto/system fonts · Japanese kana or red-sun discs · real Chinese company names or logos · machine-translated Chinese (check every word's meaning) · glowing seals.

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
Components: `AppShell, Panel, Button, SectionHeader, Readout, Meter, Tag, Input, HazardStripe, GlitchText, Barcode, Ruler, HanziMark, NeonSign, DotMatrix, Seal, SysClock`. `SectionHeader` takes `zh` for a bilingual title. Utility classes: `.nd-label .nd-mono .nd-meta .nd-index .nd-cursor .nd-neon .nd-neon-2 .nd-flicker .nd-cut .nd-cut-tr .nd-cut-br .nd-brackets .nd-grid-bg .nd-dot-bg .nd-carbon-bg .nd-hazard .nd-hatch .nd-scanlines .nd-fog .nd-led-bg .nd-paper .nd-glitch .nd-table`. JS/Go values: `neondeck/tokens.json`.

New components must use only `--nd-*` tokens and follow §5. Then add them to the showcase page (`neondeck/src/routes/+page.svelte`).

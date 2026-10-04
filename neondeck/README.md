# @cyberpunk-apps/neondeck

> Scoped and `private` on purpose: an unrelated `neondeck` package exists on the public npm registry.
> Always install by path (`npm i ../sharable_assets/neondeck`), never by bare name.

NEONDECK: the shared cyberpunk design system (Svelte 5). See `../DESIGN_LANGUAGE.md` for the rules.

```svelte
<script>
	import '@cyberpunk-apps/neondeck/styles.css'; // fonts + tokens + base + effects, once at the root
	import { AppShell, Panel, Button, Readout, Meter } from '@cyberpunk-apps/neondeck';
</script>
```

- `@cyberpunk-apps/neondeck/styles.css`: everything. `@cyberpunk-apps/neondeck/tokens.css`: variables only.
- `neondeck/tokens.json`: palette for Go/Wails/Python (`npm run tokens` regenerates it from `src/lib/tokens.ts`).
- Showcase: `npm run dev`.

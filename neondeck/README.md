# neondeck

NEONDECK: the shared cyberpunk design system (Svelte 5). See `../DESIGN_LANGUAGE.md` for the rules.

```svelte
<script>
	import 'neondeck/styles.css'; // fonts + tokens + base + effects, once at the root
	import { AppShell, Panel, Button, Readout, Meter } from 'neondeck';
</script>
```

- `neondeck/styles.css`: everything. `neondeck/tokens.css`: variables only.
- `neondeck/tokens.json`: palette for Go/Wails/Python (`npm run tokens` regenerates it from `src/lib/tokens.ts`).
- Showcase: `npm run dev`.

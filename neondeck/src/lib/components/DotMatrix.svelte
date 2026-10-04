<!--
  DotMatrix: text rendered as LED points, like the Bund drone show (上海 + dragon) or a building façade.
  The glyph is rasterised client-side into a `rows`-high grid; lit cells become dots.
  Renders an empty LED panel on the server, fills in on mount once the font has loaded.
-->
<script lang="ts">
	import type { Accent } from '../types.js';
	interface Props {
		text: string;
		label: string; // English meaning for screen readers
		rows?: number; // vertical resolution; hanzi need ≥16 to stay legible
		tone?: Accent;
		face?: 'gothic' | 'tech';
		unlit?: boolean; // show dim unlit LEDs behind the text
		height?: string;
	}
	let { text, label, rows = 20, tone = 'magenta', face = 'gothic', unlit = true, height = '5rem' }: Props = $props();

	let dots = $state<{ x: number; y: number; on: boolean }[]>([]);
	let cols = $state(0);

	$effect(() => {
		const t = text, r = rows, f = face;
		let cancelled = false;
		(async () => {
			const family = f === 'tech' ? '"ZCOOL QingKe HuangYou"' : '"Noto Sans SC"';
			const weight = f === 'tech' ? 400 : 900;
			const font = `${weight} ${r}px ${family}, sans-serif`;
			try { await document.fonts.load(font, t); } catch { /* fall back to whatever is loaded */ }
			if (cancelled) return;
			const c = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
			if (!c) return;
			c.font = font;
			const w = Math.max(1, Math.ceil(c.measureText(t).width));
			c.canvas.width = w;
			c.canvas.height = r;
			c.font = font;
			c.textBaseline = 'middle';
			c.fillStyle = '#fff';
			c.fillText(t, 0, r / 2 + 1);
			const px = c.getImageData(0, 0, w, r).data;
			const out: { x: number; y: number; on: boolean }[] = [];
			for (let y = 0; y < r; y++)
				for (let x = 0; x < w; x++) {
					const on = px[(y * w + x) * 4 + 3] > 110;
					if (on || unlit) out.push({ x, y, on });
				}
			cols = w;
			dots = out;
		})();
		return () => { cancelled = true; };
	});
</script>

<div class="nd-dotmatrix" data-nd-accent={tone} role="img" aria-label={label} style:height>
	{#if cols}
		<svg viewBox="-0.5 -0.5 {cols} {rows}" preserveAspectRatio="xMidYMid meet" lang="zh-Hans">
			{#each dots as d (d.y * cols + d.x)}
				<circle cx={d.x} cy={d.y} r={d.on ? 0.36 : 0.18} class:on={d.on} />
			{/each}
		</svg>
	{/if}
</div>

<style>
	.nd-dotmatrix { display: flex; justify-content: center; }
	svg { height: 100%; width: auto; max-width: 100%; overflow: visible; }
	circle { fill: color-mix(in srgb, var(--nd-accent) 14%, transparent); }
	circle.on { fill: color-mix(in srgb, var(--nd-accent) 55%, #ffffff); }
	svg { filter: drop-shadow(0 0 calc(3px * var(--nd-glow-size)) var(--nd-accent)); }
</style>

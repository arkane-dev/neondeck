<!--
  NeonSign: vertical shop/street signboard, one hanzi per lit cell, from the Chongqing and
  Deni World plates. White-hot glyphs, colored tube frame, pinyin/English caption underneath.
  Decorative: `label` (English meaning) is what screen readers get.
-->
<script lang="ts">
	import type { Accent } from '../types.js';
	interface Props {
		text: string; // "不夜城"
		label: string; // "City that never sleeps"
		caption?: string; // pinyin, e.g. "BU YE CHENG"
		tone?: Accent;
		orientation?: 'vertical' | 'horizontal';
		size?: string; // cell size
		face?: 'gothic' | 'tech';
		flicker?: boolean; // one dying tube (last character). Max one per page.
	}
	let {
		text,
		label,
		caption,
		tone = 'magenta',
		orientation = 'vertical',
		size = '3.5rem',
		face = 'gothic',
		flicker = false
	}: Props = $props();
	const chars = $derived([...text]);
</script>

<figure class="nd-sign {orientation} face-{face}" data-nd-accent={tone} style:--cell={size} role="img" aria-label={label}>
	<div class="board" lang="zh-Hans" aria-hidden="true">
		{#each chars as ch, i (i)}
			<span class="cell" class:nd-flicker={flicker && i === chars.length - 1}>{ch}</span>
		{/each}
	</div>
	{#if caption}<figcaption aria-hidden="true">{caption}</figcaption>{/if}
</figure>

<style>
	.nd-sign { margin: 0; display: inline-flex; flex-direction: column; align-items: center; gap: var(--nd-space-2); }
	.board {
		display: flex;
		padding: 4px;
		border: 2px solid var(--nd-accent);
		background: color-mix(in srgb, var(--nd-accent) 7%, var(--nd-void));
		box-shadow:
			0 0 calc(10px * var(--nd-glow-size)) color-mix(in srgb, var(--nd-accent) 70%, transparent),
			inset 0 0 calc(12px * var(--nd-glow-size)) color-mix(in srgb, var(--nd-accent) 35%, transparent);
	}
	.vertical .board { flex-direction: column; }
	.cell {
		display: grid;
		place-items: center;
		width: var(--cell);
		height: var(--cell);
		font-family: var(--nd-font-cjk);
		font-weight: 900;
		font-size: calc(var(--cell) * 0.72);
		line-height: 1;
		/* neon glyph: near-white core, colored halo */
		color: color-mix(in srgb, var(--nd-accent) 35%, #ffffff);
		text-shadow: var(--nd-glow-accent);
	}
	.face-tech .cell { font-family: var(--nd-font-cjk-tech); font-weight: 400; }
	.vertical .cell + .cell { border-top: 1px solid color-mix(in srgb, var(--nd-accent) 35%, transparent); }
	.horizontal .cell + .cell { border-left: 1px solid color-mix(in srgb, var(--nd-accent) 35%, transparent); }
	figcaption {
		font-family: var(--nd-font-mono);
		font-size: var(--nd-text-2xs);
		letter-spacing: 0.2em;
		color: var(--nd-accent);
		white-space: nowrap;
	}
</style>

<!--
  MoonScroll: the hero centerpiece. A neon hanging scroll (立轴) built from light:
  an LED moon (dot-matrix disc, brightest at the core), one monumental vertical inscription
  through it, pinyin running alongside like a tower façade, and a cinnabar seal at the foot
  of the column, where a painter stamps the chop. A moon-gate ring frames it.
  One per page. It is the page's single big light source.
-->
<script lang="ts">
	import Seal from './Seal.svelte';

	interface Props {
		text: string; // the inscription, 2–4 hanzi, e.g. "霓虹都市"
		label: string; // English meaning, for screen readers
		caption?: string; // pinyin, e.g. "NI HONG DU SHI"
		seal?: string; // 1–4 hanzi for the chop, e.g. "霓虹甲板"
		sealLabel?: string;
		tone?: 'magenta' | 'violet' | 'red' | 'blue'; // darker neons only: white glyphs vanish on cyan/yellow/jade/gold
		face?: 'gothic' | 'tech';
		size?: string; // moon diameter
		ring?: boolean; // moon-gate ring
	}
	let {
		text,
		label,
		caption,
		seal,
		sealLabel = 'seal',
		tone = 'magenta',
		face = 'tech',
		size = 'min(26rem, 70vw)',
		ring = true
	}: Props = $props();

	// LED moon: an N×N grid of dots clipped to a circle. Dot size and brightness fall off
	// from a core offset up-left (moonlight), so it reads as a lit sphere, not a flat flag disc.
	const N = 33;
	const dots: { x: number; y: number; r: number; o: number }[] = [];
	for (let j = 0; j < N; j++)
		for (let i = 0; i < N; i++) {
			const dx = (i - (N - 1) / 2) / ((N - 1) / 2);
			const dy = (j - (N - 1) / 2) / ((N - 1) / 2);
			const d = Math.hypot(dx, dy);
			if (d > 1) continue;
			const core = Math.hypot(dx + 0.28, dy + 0.3); // light source up-left
			const lum = Math.max(0, Math.min(1, 1.08 - core * 0.62));
			dots.push({ x: i, y: j, r: 0.16 + 0.3 * lum, o: 0.3 + 0.7 * lum });
		}

	const chars = $derived([...text]);
</script>

<figure class="nd-moonscroll face-{face}" data-nd-accent={tone} style:--moon={size} role="img" aria-label={label}>
	<div class="stage" aria-hidden="true">
		{#if ring}<div class="ring"></div>{/if}
		<svg class="moon" viewBox="-1 -1 {N + 1} {N + 1}">
			{#each dots as d (d.y * N + d.x)}
				<circle cx={d.x} cy={d.y} r={d.r} opacity={d.o} />
			{/each}
		</svg>
		<div class="column">
			{#if caption}<span class="pinyin">{caption}</span>{/if}
			<span class="inscription" lang="zh-Hans">
				{#each chars as ch, i (i)}<span>{ch}</span>{/each}
			</span>
			{#if seal}<span class="chop"><Seal text={seal} label={sealLabel} size="calc(var(--moon) * 0.2)" tilt={-2} /></span>{/if}
		</div>
	</div>
</figure>

<style>
	.nd-moonscroll { margin: 0; display: grid; place-items: center; }
	.stage {
		position: relative;
		display: grid;
		place-items: center;
		width: calc(var(--moon) * 1.25);
		height: calc(var(--moon) * 1.45);
	}
	.moon,
	.ring {
		position: absolute;
		top: 50%;
		left: 50%;
		translate: -50% -50%;
		width: var(--moon);
		aspect-ratio: 1;
	}
	.moon {
		fill: var(--nd-accent);
		filter: drop-shadow(0 0 calc(18px * var(--nd-glow-size)) color-mix(in srgb, var(--nd-accent) 55%, transparent));
	}
	.ring {
		width: calc(var(--moon) * 1.16);
		border: 2px solid color-mix(in srgb, var(--nd-accent) 70%, transparent);
		border-radius: 50%; /* moon gate: the one ring allowed, alongside the LED moon */
		box-shadow:
			0 0 calc(12px * var(--nd-glow-size)) color-mix(in srgb, var(--nd-accent) 60%, transparent),
			inset 0 0 calc(12px * var(--nd-glow-size)) color-mix(in srgb, var(--nd-accent) 40%, transparent);
	}
	.column {
		position: relative;
		display: flex;
		align-items: flex-start;
		gap: calc(var(--moon) * 0.04);
	}
	.inscription {
		display: flex;
		flex-direction: column;
		font-family: var(--nd-font-cjk);
		font-weight: 900;
		font-size: calc(var(--moon) * 0.3);
		line-height: 1.02;
		/* white-hot neon over the moon: a dark stroke under the fill keeps edges ≥3:1 on the brightest dots */
		color: color-mix(in srgb, var(--nd-accent) 12%, #ffffff);
		-webkit-text-stroke: max(3px, calc(var(--moon) * 0.012)) var(--nd-void);
		paint-order: stroke fill;
		text-shadow: 0 0 calc(24px * var(--nd-glow-size)) color-mix(in srgb, var(--nd-accent) 70%, transparent);
	}
	.face-tech .inscription { font-family: var(--nd-font-cjk-tech); font-weight: 400; }
	.pinyin {
		writing-mode: vertical-rl;
		margin-top: calc(var(--moon) * 0.05);
		font-family: var(--nd-font-mono);
		font-size: max(0.6875rem, calc(var(--moon) * 0.032));
		letter-spacing: 0.4em;
		color: var(--nd-accent-2);
		background: var(--nd-void); /* opaque strip: small text never sits on the moon */
		padding: 0.6em 0.25em;
	}
	.chop {
		align-self: flex-end;
		margin-bottom: calc(var(--moon) * -0.06);
	}
</style>

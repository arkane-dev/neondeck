<!-- Meter: segmented progress bar. "SCANNING ......... 64%". Use for any 0-100 quantity. -->
<script lang="ts">
	import type { Accent } from '../types.js';
	interface Props {
		value: number; // 0-100
		label?: string;
		segments?: number;
		accent?: Accent;
		showValue?: boolean;
		meta?: string; // under-bar mono text, e.g. "624 / 1440 FILES"
	}
	let { value, label, segments = 32, accent, showValue = true, meta }: Props = $props();
	const pct = $derived(Math.max(0, Math.min(100, value)));
	const lit = $derived(Math.round((pct / 100) * segments));
</script>

<div
	class="nd-meter"
	data-nd-accent={accent}
	role="meter"
	aria-valuemin={0}
	aria-valuemax={100}
	aria-valuenow={pct}
	aria-label={label}
>
	{#if label || showValue}
		<div class="top">
			{#if label}<span class="label">{label}</span>{/if}
			<span class="dots" aria-hidden="true"></span>
			{#if showValue}<span class="val">{Math.round(pct)}%</span>{/if}
		</div>
	{/if}
	<div class="bar" style:--n={segments}>
		{#each { length: segments }, i (i)}
			<span class="seg" class:on={i < lit}></span>
		{/each}
	</div>
	{#if meta}<div class="meta">{meta}</div>{/if}
</div>

<style>
	.nd-meter { display: flex; flex-direction: column; gap: var(--nd-space-1); }
	.top { display: flex; align-items: baseline; gap: var(--nd-space-2); }
	.label {
		font-family: var(--nd-font-ui);
		font-size: var(--nd-text-xs);
		font-weight: 600;
		letter-spacing: var(--nd-tracking-label);
		text-transform: uppercase;
		color: var(--nd-text-dim);
	}
	.dots { flex: 1; border-bottom: 1px dotted var(--nd-line-strong); transform: translateY(-3px); }
	.val { font-family: var(--nd-font-mono); font-size: var(--nd-text-xs); color: var(--nd-accent); }
	.bar {
		display: grid;
		grid-template-columns: repeat(var(--n), 1fr);
		gap: 2px;
		height: 10px;
		padding: 2px;
		border: 1px solid var(--nd-line-strong);
	}
	.seg { background: var(--nd-line); }
	.seg.on { background: var(--nd-accent); box-shadow: 0 0 4px color-mix(in srgb, var(--nd-accent) 60%, transparent); }
	.meta { text-align: right; font-family: var(--nd-font-mono); font-size: 0.625rem; color: var(--nd-text-mute); }
</style>

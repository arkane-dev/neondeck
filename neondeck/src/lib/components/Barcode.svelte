<!--
  Barcode: decorative, deterministic bars from a string. Not scannable.
  Use as an ID stamp on panels, footers and empty states, like the cyberdeck HUD.
-->
<script lang="ts">
	interface Props {
		value: string;
		height?: number;
		bars?: number;
		caption?: boolean;
	}
	let { value, height = 32, bars = 48, caption = true }: Props = $props();

	const widths = $derived.by(() => {
		let h = 2166136261;
		const out: number[] = [];
		for (let i = 0; i < bars; i++) {
			h ^= value.charCodeAt(i % Math.max(1, value.length)) + i;
			h = Math.imul(h, 16777619) >>> 0;
			out.push((h % 4) + 1);
		}
		return out;
	});
	const total = $derived(widths.reduce((a, w) => a + w * 2, 0));
</script>

<figure class="nd-barcode" aria-hidden="true">
	<svg viewBox="0 0 {total} {height}" preserveAspectRatio="none" style:height="{height}px">
		{#each widths as w, i (i)}
			{@const x = widths.slice(0, i).reduce((a, b) => a + b * 2, 0)}
			<rect {x} y="0" width={w} {height} />
		{/each}
	</svg>
	{#if caption}<figcaption>{value}</figcaption>{/if}
</figure>

<style>
	.nd-barcode { margin: 0; display: inline-flex; flex-direction: column; gap: 2px; color: var(--nd-accent-2); }
	svg { width: 100%; min-width: 8rem; fill: currentColor; }
	figcaption {
		font-family: var(--nd-font-mono);
		font-size: 0.625rem;
		letter-spacing: 0.1em;
		color: var(--nd-text-mute);
		text-transform: uppercase;
	}
</style>

<!-- Ruler: HUD tick scale. Frames the edge of a shell or a panel. Purely decorative. -->
<script lang="ts">
	interface Props {
		orientation?: 'horizontal' | 'vertical';
		step?: number; // px between minor ticks
		major?: number; // every Nth tick is long
		labels?: string[]; // spread evenly, e.g. ["N","E","S","W"]
	}
	let { orientation = 'horizontal', step = 8, major = 5, labels = [] }: Props = $props();
</script>

<div class="nd-ruler {orientation}" style:--step="{step}px" style:--major="{step * major}px" aria-hidden="true">
	{#if labels.length}
		<div class="labels">
			{#each labels as l, i (i)}<span>{l}</span>{/each}
		</div>
	{/if}
</div>

<style>
	.nd-ruler { position: relative; color: var(--nd-line-strong); }
	.horizontal {
		height: 12px;
		width: 100%;
		background:
			repeating-linear-gradient(90deg, currentColor 0 1px, transparent 1px var(--major)) bottom / 100% 10px no-repeat,
			repeating-linear-gradient(90deg, currentColor 0 1px, transparent 1px var(--step)) bottom / 100% 5px no-repeat;
	}
	.vertical {
		width: 12px;
		height: 100%;
		background:
			repeating-linear-gradient(180deg, currentColor 0 1px, transparent 1px var(--major)) left / 10px 100% no-repeat,
			repeating-linear-gradient(180deg, currentColor 0 1px, transparent 1px var(--step)) left / 5px 100% no-repeat;
	}
	.labels {
		position: absolute;
		inset: 0;
		display: flex;
		justify-content: space-around;
		align-items: center;
		font-family: var(--nd-font-mono);
		font-size: 0.625rem;
		color: var(--nd-text-mute);
	}
	.horizontal .labels { top: -14px; bottom: auto; }
	.labels span { background: var(--nd-bg); padding-inline: 4px; }
	.vertical .labels { flex-direction: column; left: 14px; }
</style>

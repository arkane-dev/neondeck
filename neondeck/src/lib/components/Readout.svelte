<!-- Readout: one labeled number. "CPU_USAGE  73 %". Values are always mono + tabular. -->
<script lang="ts">
	import type { Accent } from '../types.js';
	interface Props {
		label: string;
		value: string | number;
		unit?: string;
		delta?: string; // "+4.2%"; leading "-" renders in danger color
		accent?: Accent;
		size?: 'sm' | 'md' | 'lg';
		neon?: boolean;
	}
	let { label, value, unit, delta, accent, size = 'md', neon = false }: Props = $props();
	const down = $derived(delta?.trim().startsWith('-') ?? false);
</script>

<div class="nd-readout {size}" data-nd-accent={accent}>
	<span class="label">{label}</span>
	<span class="value" class:neon>
		{value}{#if unit}<span class="unit">{unit}</span>{/if}
	</span>
	{#if delta}<span class="delta" class:down>{delta}</span>{/if}
</div>

<style>
	.nd-readout { display: flex; flex-direction: column; gap: var(--nd-space-1); min-width: 0; }
	.label {
		font-family: var(--nd-font-ui);
		font-size: var(--nd-text-xs);
		font-weight: 600;
		letter-spacing: var(--nd-tracking-label);
		text-transform: uppercase;
		color: var(--nd-text-dim);
	}
	.value {
		font-family: var(--nd-font-mono);
		font-variant-numeric: tabular-nums;
		font-weight: 600;
		line-height: 1;
		color: var(--nd-text);
	}
	.value.neon { color: var(--nd-accent); text-shadow: var(--nd-glow-accent); }
	.sm .value { font-size: var(--nd-text-lg); }
	.md .value { font-size: var(--nd-text-3xl); }
	.lg .value { font-size: var(--nd-text-5xl); }
	.unit { margin-left: 0.2em; font-size: 0.45em; color: var(--nd-text-mute); }
	.delta { font-family: var(--nd-font-mono); font-size: var(--nd-text-xs); color: var(--nd-success); }
	.delta.down { color: var(--nd-danger); }
</style>

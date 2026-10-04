<!-- HazardStripe: caution-tape band. Page footers, destructive zones, "ACCESS GRANTED" banners. -->
<script lang="ts">
	import type { Accent } from '../types.js';
	interface Props {
		text?: string;
		accent?: Accent;
		height?: string;
	}
	let { text, accent = 'yellow', height = '2rem' }: Props = $props();
</script>

<div class="nd-hazard-stripe" data-nd-accent={accent} style:height role={text ? 'status' : 'presentation'}>
	<div class="stripes nd-hazard" aria-hidden="true"></div>
	{#if text}<span class="text">{text}<span class="nd-cursor"></span></span>{/if}
</div>

<style>
	.nd-hazard-stripe { position: relative; display: grid; place-items: center; overflow: hidden; }
	.stripes { position: absolute; inset: 0; opacity: 0.9; }
	.text {
		position: relative;
		padding: 0.2em 1.5em;
		border-inline: 1px solid var(--nd-accent);
		background: var(--nd-bg);
		color: var(--nd-accent);
		font-family: var(--nd-font-mono);
		font-size: var(--nd-text-xs);
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}
</style>

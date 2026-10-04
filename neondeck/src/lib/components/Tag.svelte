<!-- Tag: small status chip. Square, 1px border, uppercase. `dot` adds a live indicator. -->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Tone } from '../types.js';
	interface Props {
		tone?: Tone;
		dot?: boolean;
		pulse?: boolean;
		solid?: boolean;
		children?: Snippet;
	}
	let { tone = 'accent', dot = false, pulse = false, solid = false, children }: Props = $props();
</script>

<span class="nd-tag tone-{tone}" class:solid>
	{#if dot}<span class="dot" class:pulse aria-hidden="true"></span>{/if}
	{@render children?.()}
</span>

<style>
	.nd-tag {
		--t: var(--nd-accent);
		display: inline-flex;
		align-items: center;
		gap: 0.45em;
		padding: 0.15em 0.55em;
		border: 1px solid color-mix(in srgb, var(--t) 70%, transparent);
		background: color-mix(in srgb, var(--t) 10%, transparent);
		color: var(--t);
		font-family: var(--nd-font-mono);
		font-size: var(--nd-text-2xs);
		font-weight: 600;
		letter-spacing: 0.08em;
		line-height: 1.5;
		text-transform: uppercase;
		white-space: nowrap;
	}
	.solid { background: var(--t); color: var(--nd-text-on-neon); }
	.tone-accent-2 { --t: var(--nd-accent-2); }
	.tone-success { --t: var(--nd-success); }
	.tone-info { --t: var(--nd-info); }
	.tone-warning { --t: var(--nd-warning); }
	.tone-danger { --t: var(--nd-danger); }
	.tone-muted { --t: var(--nd-text-mute); }
	.dot { width: 6px; height: 6px; background: currentColor; box-shadow: 0 0 6px currentColor; }
	.solid .dot { box-shadow: none; }
	.pulse { animation: pulse 1.4s steps(2, jump-none) infinite; }
	@keyframes pulse { 50% { opacity: 0.25; } }
	@media (prefers-reduced-motion: reduce) { .pulse { animation: none; } }
</style>

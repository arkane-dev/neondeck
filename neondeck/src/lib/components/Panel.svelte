<!--
  Panel: the basic container. A chamfered frame with an optional indexed header.
  Modeled on the cyberdeck HUD panels: 1px frame, cut corners, accent tab top-left.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Accent } from '../types.js';

	interface Props {
		title?: string;
		index?: string; // "01" renders as "/01"
		meta?: string; // mono text, right side of header
		accent?: Accent;
		cut?: 'sm' | 'md' | 'lg';
		active?: boolean; // frame lights up in accent color
		glow?: boolean; // neon bloom around the frame (use on one panel per view)
		padded?: boolean;
		class?: string;
		actions?: Snippet;
		children?: Snippet;
	}

	let {
		title,
		index,
		meta,
		accent,
		cut = 'md',
		active = false,
		glow = false,
		padded = true,
		class: klass = '',
		actions,
		children
	}: Props = $props();
</script>

<section
	class="nd-panel cut-{cut} {klass}"
	class:active
	class:glow
	data-nd-accent={accent}
	aria-label={title}
>
	<div class="frame">
		<div class="inner">
			{#if title || actions}
				<header>
					<span class="tab" aria-hidden="true"></span>
					{#if index}<span class="idx">/{index}</span>{/if}
					{#if title}<h3>{title}</h3>{/if}
					<span class="spacer"></span>
					{#if meta}<span class="meta">{meta}</span>{/if}
					{@render actions?.()}
				</header>
			{/if}
			<div class="body" class:padded>
				{@render children?.()}
			</div>
		</div>
	</div>
</section>

<style>
	.nd-panel {
		--edge: var(--nd-line-strong);
		--c: var(--nd-cut-md);
		position: relative;
		min-width: 0;
	}
	.cut-sm { --c: var(--nd-cut-sm); }
	.cut-lg { --c: var(--nd-cut-lg); }
	.active { --edge: var(--nd-accent); }
	.glow { filter: drop-shadow(0 0 6px color-mix(in srgb, var(--nd-accent) 60%, transparent)); --edge: var(--nd-accent); }

	.frame,
	.inner {
		clip-path: polygon(var(--c) 0, 100% 0, 100% calc(100% - var(--c)), calc(100% - var(--c)) 100%, 0 100%, 0 var(--c));
	}
	.frame {
		height: 100%;
		padding: var(--nd-border-w);
		background: var(--edge);
		transition: background var(--nd-dur-base) var(--nd-ease);
	}
	.inner {
		--c: calc(var(--nd-cut-md) - 0.4px);
		height: 100%;
		background: var(--nd-surface-1);
	}
	.cut-sm .inner { --c: calc(var(--nd-cut-sm) - 0.4px); }
	.cut-lg .inner { --c: calc(var(--nd-cut-lg) - 0.4px); }

	header {
		position: relative;
		display: flex;
		align-items: baseline;
		gap: var(--nd-space-3);
		padding: var(--nd-space-3) var(--nd-space-4) var(--nd-space-2) calc(var(--c) + var(--nd-space-3));
		border-bottom: 1px solid var(--nd-line);
	}
	.tab {
		position: absolute;
		top: 0;
		left: var(--c);
		width: 2.5rem;
		height: 3px;
		background: var(--nd-accent);
	}
	.idx {
		font-family: var(--nd-font-mono);
		font-size: var(--nd-text-xs);
		color: var(--nd-accent);
	}
	h3 {
		margin: 0;
		font-family: var(--nd-font-ui);
		font-size: var(--nd-text-md);
		font-weight: 700;
		letter-spacing: var(--nd-tracking-label);
	}
	.spacer { flex: 1; }
	.meta {
		font-family: var(--nd-font-mono);
		font-size: var(--nd-text-xs);
		color: var(--nd-text-mute);
	}
	.body.padded { padding: var(--nd-space-4) var(--nd-space-5) var(--nd-space-5); }
</style>

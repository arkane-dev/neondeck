<!--
  Button: chamfered (top-right cut). Renders <a> when href is set.
  `sub` adds the cyberdeck micro-caption under the label ("ADVANCED COMMON TOOLS").
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes, HTMLAnchorAttributes } from 'svelte/elements';
	import type { Accent } from '../types.js';

	type Common = {
		variant?: 'primary' | 'outline' | 'ghost' | 'danger';
		size?: 'sm' | 'md' | 'lg';
		accent?: Accent;
		sub?: string;
		arrow?: boolean; // trailing ↗, for "go somewhere" actions
		block?: boolean;
		icon?: Snippet;
		children?: Snippet;
	};
	type Props = Common &
		((HTMLButtonAttributes & { href?: undefined }) | (HTMLAnchorAttributes & { href: string }));

	let {
		variant = 'primary',
		size = 'md',
		accent,
		sub,
		arrow = false,
		block = false,
		icon,
		children,
		class: klass = '',
		...rest
	}: Props = $props();
</script>

{#snippet face()}
	<span class="face">
		{#if icon}<span class="icon">{@render icon()}</span>{/if}
		<span class="text">
			<span class="label">{@render children?.()}</span>
			{#if sub}<span class="sub">{sub}</span>{/if}
		</span>
		{#if arrow}<span class="arrow" aria-hidden="true">↗</span>{/if}
	</span>
{/snippet}

{#if rest.href !== undefined}
	<a
		class="nd-btn {variant} {size} {klass}"
		class:block
		data-nd-accent={accent}
		{...rest as HTMLAnchorAttributes}>{@render face()}</a
	>
{:else}
	<button
		class="nd-btn {variant} {size} {klass}"
		class:block
		data-nd-accent={accent}
		{...rest as HTMLButtonAttributes}>{@render face()}</button
	>
{/if}

<style>
	.nd-btn {
		--c: var(--nd-cut-sm);
		--edge: var(--nd-accent);
		--fill: var(--nd-accent);
		--ink: var(--nd-text-on-neon);
		display: inline-flex;
		padding: 1px;
		border: 0;
		background: var(--edge);
		color: var(--ink);
		cursor: pointer;
		text-decoration: none;
		clip-path: polygon(0 0, calc(100% - var(--c)) 0, 100% var(--c), 100% 100%, 0 100%);
		transition: filter var(--nd-dur-fast) var(--nd-ease), transform var(--nd-dur-instant) var(--nd-ease);
	}
	.block { display: flex; width: 100%; }
	.face {
		display: flex;
		flex: 1;
		align-items: center;
		gap: var(--nd-space-3);
		padding: 0.55em 1.1em;
		background: var(--fill);
		clip-path: polygon(0 0, calc(100% - var(--c) + 0.4px) 0, 100% calc(var(--c) - 0.4px), 100% 100%, 0 100%);
		transition: background var(--nd-dur-fast) var(--nd-ease), color var(--nd-dur-fast) var(--nd-ease);
	}
	.text { display: flex; flex: 1; flex-direction: column; line-height: 1.1; }
	.label {
		font-family: var(--nd-font-ui);
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}
	.sub {
		margin-top: 0.2em;
		font-family: var(--nd-font-mono);
		font-size: var(--nd-text-2xs);
		font-weight: 400;
		letter-spacing: 0.04em;
		text-transform: uppercase; /* no opacity: fading it drops contrast below 4.5:1 */
	}
	.arrow { font-family: var(--nd-font-mono); }
	.icon { display: inline-flex; width: 1.1em; height: 1.1em; }

	.sm { font-size: var(--nd-text-xs); --c: var(--nd-cut-xs); }
	.md { font-size: var(--nd-text-sm); }
	.lg { font-size: var(--nd-text-md); --c: var(--nd-cut-md); }
	.lg .face { padding: 0.75em 1.4em; }

	.outline { --fill: var(--nd-bg); --ink: var(--nd-accent); }
	.ghost { --edge: transparent; --fill: transparent; --ink: var(--nd-text-dim); }
	.danger { --edge: var(--nd-danger); --fill: var(--nd-danger); }

	.nd-btn:hover { filter: drop-shadow(0 0 6px color-mix(in srgb, var(--edge) 70%, transparent)); }
	.outline:hover { --fill: var(--nd-accent-tint); }
	.ghost:hover { --ink: var(--nd-text); --fill: var(--nd-surface-2); filter: none; }
	.nd-btn:active { transform: translateY(1px); }
	.nd-btn:focus-visible { outline: 2px solid var(--nd-focus); outline-offset: 3px; clip-path: none; }
	.nd-btn:disabled,
	.nd-btn[aria-disabled='true'] {
		--edge: var(--nd-line);
		--fill: var(--nd-surface-1);
		--ink: var(--nd-text-mute);
		cursor: not-allowed;
		filter: none;
	}
</style>

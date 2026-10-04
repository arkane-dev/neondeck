<!--
  AppShell: the frame every app and site lives in.
  ┌ brand │ nav + nav + nav            │ clock │ actions ┐  top bar (sticky)
  │ rail  │ main content (12-col grid inside)           │
  └ status bar: mono key/values, left = state, right = build ┘
  The rail is a thin HUD edge (ruler + vertical caption). `sidebar` replaces it with real nav.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import SysClock from './SysClock.svelte';
	import Ruler from './Ruler.svelte';

	export interface NavItem {
		label: string;
		href: string;
		active?: boolean;
	}
	interface Props {
		brand: string; // "CYBR_"
		home?: string; // brand link target; "#/" for hash-routed (Wails) apps
		nav?: NavItem[];
		railCaption?: string; // rotated text in the rail
		clock?: boolean;
		scanlines?: boolean;
		logo?: Snippet;
		actions?: Snippet;
		sidebar?: Snippet;
		status?: Snippet;
		children?: Snippet;
	}
	let {
		brand,
		home = '/',
		nav = [],
		railCaption,
		clock = true,
		scanlines = false,
		logo,
		actions,
		sidebar,
		status,
		children
	}: Props = $props();
</script>

<div class="nd-shell" class:has-sidebar={!!sidebar} class:nd-scanlines={scanlines}>
	<header class="topbar">
		<a class="brand" href={home}>
			<span class="mark">{#if logo}{@render logo()}{:else}◢◤{/if}</span>
			<span class="name">{brand}</span>
		</a>
		<nav aria-label="Primary">
			{#each nav as item, i (item.href)}
				{#if i > 0}<span class="sep" aria-hidden="true">+</span>{/if}
				<a href={item.href} class:active={item.active} aria-current={item.active ? 'page' : undefined}
					>{item.label}</a
				>
			{/each}
		</nav>
		<div class="right">
			{#if clock}<div class="clock"><SysClock /></div>{/if}
			{@render actions?.()}
		</div>
	</header>

	<aside class="rail" aria-label={sidebar ? 'Sidebar' : undefined} aria-hidden={sidebar ? undefined : 'true'}>
		{#if sidebar}
			{@render sidebar()}
		{:else}
			<Ruler orientation="vertical" step={6} major={6} />
			{#if railCaption}<span class="caption">{railCaption}</span>{/if}
		{/if}
	</aside>

	<main>
		{@render children?.()}
	</main>

	<footer class="statusbar">
		{#if status}{@render status()}{:else}<span>&gt; READY</span>{/if}
	</footer>
</div>

<style>
	.nd-shell {
		display: grid;
		grid-template-columns: var(--nd-rail-w) minmax(0, 1fr);
		grid-template-rows: var(--nd-topbar-h) 1fr var(--nd-statusbar-h);
		grid-template-areas: 'top top' 'rail main' 'status status';
		min-height: 100dvh;
	}
	.has-sidebar { grid-template-columns: var(--nd-sidebar-w) minmax(0, 1fr); }

	.topbar {
		grid-area: top;
		position: sticky;
		top: 0;
		z-index: var(--nd-z-sticky);
		display: flex;
		align-items: stretch;
		border-bottom: 1px solid var(--nd-line);
		background: color-mix(in srgb, var(--nd-bg) 88%, transparent);
		backdrop-filter: blur(8px);
	}
	.brand {
		display: flex;
		align-items: center;
		gap: var(--nd-space-2);
		margin: var(--nd-space-2);
		padding: 0 var(--nd-space-4);
		background: var(--nd-accent);
		color: var(--nd-text-on-neon);
		font-family: var(--nd-font-display);
		font-weight: 700;
		font-size: var(--nd-text-lg);
		letter-spacing: 0.06em;
		text-decoration: none;
		clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%);
	}
	.brand:hover { color: var(--nd-text-on-neon); text-shadow: none; }
	.mark { display: inline-flex; font-size: 0.8em; letter-spacing: -0.2em; }
	nav {
		display: flex;
		flex: 1;
		align-items: center;
		gap: var(--nd-space-4);
		padding: 0 var(--nd-space-6);
		overflow-x: auto;
	}
	nav a {
		position: relative;
		color: var(--nd-text-dim);
		font-family: var(--nd-font-ui);
		font-size: var(--nd-text-sm);
		font-weight: 600;
		letter-spacing: var(--nd-tracking-label);
		text-decoration: none;
		text-transform: uppercase;
		white-space: nowrap;
	}
	nav a:hover { color: var(--nd-text); text-shadow: none; }
	nav a.active { color: var(--nd-accent); }
	nav a.active::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: -0.6rem;
		height: 2px;
		background: var(--nd-accent);
		box-shadow: var(--nd-glow-accent);
	}
	.sep { color: var(--nd-accent); font-family: var(--nd-font-mono); font-size: var(--nd-text-xs); }
	.right { display: flex; align-items: center; gap: var(--nd-space-4); padding-right: var(--nd-space-4); }
	.clock { padding: 0 var(--nd-space-4); border-inline: 1px solid var(--nd-line); align-self: stretch; display: grid; align-items: center; }

	.rail {
		grid-area: rail;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--nd-space-6);
		padding: var(--nd-space-6) 0;
		border-right: 1px solid var(--nd-line);
	}
	.rail :global(.nd-ruler) { height: 40%; }
	.caption {
		writing-mode: vertical-rl;
		transform: rotate(180deg);
		font-family: var(--nd-font-mono);
		font-size: 0.625rem;
		letter-spacing: 0.2em;
		color: var(--nd-accent);
		text-transform: uppercase;
	}
	.has-sidebar .rail { align-items: stretch; padding: var(--nd-space-4); }

	main { grid-area: main; min-width: 0; }

	.statusbar {
		grid-area: status;
		position: sticky;
		bottom: 0;
		display: flex;
		align-items: center;
		gap: var(--nd-space-6);
		padding: 0 var(--nd-space-4);
		border-top: 1px solid var(--nd-line);
		background: var(--nd-void);
		font-family: var(--nd-font-mono);
		font-size: var(--nd-text-2xs);
		color: var(--nd-text-mute);
		text-transform: uppercase;
		white-space: nowrap;
		overflow: hidden;
	}

	@media (max-width: 720px) {
		.nd-shell, .has-sidebar {
			grid-template-columns: minmax(0, 1fr);
			grid-template-rows: auto 1fr var(--nd-statusbar-h);
			grid-template-areas: 'top' 'main' 'status';
		}
		.rail { display: none; }
		.clock { display: none; }
		.topbar { flex-wrap: wrap; justify-content: space-between; }
		.brand { min-height: calc(var(--nd-topbar-h) - var(--nd-space-4)); }
		nav { order: 3; flex-basis: 100%; padding: var(--nd-space-3); border-top: 1px solid var(--nd-line); }
		nav a.active::after { bottom: -0.4rem; }
	}
</style>

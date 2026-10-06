<!-- Dialog: a modal on the native <dialog>, so focus trapping, Esc and an inert page come free.
     Same cut frame as Panel. placement="right" turns it into a full-height side drawer. -->
<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		open?: boolean; // bindable
		title: string;
		index?: string; // "01" renders as "/01"
		meta?: string;
		size?: 'sm' | 'md' | 'lg' | 'xl';
		placement?: 'center' | 'right';
		dismissable?: boolean; // Esc and backdrop click close it
		onclose?: () => void;
		children?: Snippet;
		footer?: Snippet; // action row, right-aligned
	}

	let {
		open = $bindable(false),
		title,
		index,
		meta,
		size = 'md',
		placement = 'center',
		dismissable = true,
		onclose,
		children,
		footer
	}: Props = $props();

	let el: HTMLDialogElement | undefined = $state();
	const id = `nd-dlg-${Math.random().toString(36).slice(2, 8)}`;

	$effect(() => {
		if (!el) return;
		if (open && !el.open) el.showModal();
		else if (!open && el.open) el.close();
	});

	function close() {
		if (!open) return;
		open = false;
		onclose?.();
	}
</script>

<dialog
	bind:this={el}
	class="nd-dialog {size} {placement}"
	aria-labelledby="{id}-title"
	oncancel={(e) => {
		e.preventDefault();
		if (dismissable) close();
	}}
	onclick={(e) => {
		if (dismissable && e.target === el) close();
	}}
	onclose={close}
>
	<div class="frame">
		<div class="inner">
			<header>
				<span class="tab" aria-hidden="true"></span>
				{#if index}<span class="idx">/{index}</span>{/if}
				<h2 id="{id}-title">{title}</h2>
				<span class="spacer"></span>
				{#if meta}<span class="meta">{meta}</span>{/if}
				<button type="button" class="x" aria-label="Close" onclick={close}>✕</button>
			</header>
			<div class="body">{@render children?.()}</div>
			{#if footer}<footer>{@render footer()}</footer>{/if}
		</div>
	</div>
</dialog>

<style>
	.nd-dialog {
		--edge: var(--nd-line-strong);
		--c: var(--nd-cut-md);
		width: 100%;
		max-height: 88dvh;
		padding: 0;
		border: 0;
		background: transparent;
		color: var(--nd-text);
		overflow: visible;
	}
	.sm { max-width: min(92vw, 28rem); }
	.md { max-width: min(92vw, 40rem); }
	.lg { max-width: min(92vw, 56rem); }
	.xl { max-width: min(92vw, 72rem); }
	.right {
		margin: 0 0 0 auto;
		height: 100vh;
		height: 100dvh;
		max-height: none;
	}
	.nd-dialog::backdrop { background: color-mix(in srgb, var(--nd-void) 80%, transparent); }
	.nd-dialog[open] { animation: nd-dlg-in var(--nd-dur-base) var(--nd-ease); }
	@keyframes nd-dlg-in {
		from { opacity: 0; transform: translateY(6px); }
	}
	.right[open] { animation-name: nd-drawer-in; }
	@keyframes nd-drawer-in {
		from { opacity: 0; transform: translateX(12px); }
	}
	@media (prefers-reduced-motion: reduce) {
		.nd-dialog[open] { animation: none; }
	}

	.frame,
	.inner {
		clip-path: polygon(var(--c) 0, 100% 0, 100% calc(100% - var(--c)), calc(100% - var(--c)) 100%, 0 100%, 0 var(--c));
	}
	/* Size to content. No percentage heights: WebKit (WebKitGTK, Safari) resolves 100% of a
	   fit-content <dialog> to 0, and the clip-path then hides everything. Only the drawer,
	   which has a definite height, fills it. */
	.frame {
		padding: var(--nd-border-w);
		background: var(--edge);
	}
	.inner {
		--c: calc(var(--nd-cut-md) - 0.4px);
		display: flex;
		flex-direction: column;
		max-height: calc(88vh - 2px);
		max-height: calc(88dvh - 2px);
		background: var(--nd-surface-1);
	}
	.right .frame { height: 100%; }
	.right .inner { height: 100%; max-height: none; }

	header {
		position: relative;
		display: flex;
		align-items: center;
		gap: var(--nd-space-3);
		padding: var(--nd-space-3) var(--nd-space-3) var(--nd-space-2) calc(var(--c) + var(--nd-space-3));
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
	.idx { font-family: var(--nd-font-mono); font-size: var(--nd-text-xs); color: var(--nd-accent); }
	h2 {
		margin: 0;
		font-family: var(--nd-font-ui);
		font-size: var(--nd-text-md);
		font-weight: 700;
		letter-spacing: var(--nd-tracking-label);
	}
	.spacer { flex: 1; }
	.meta { font-family: var(--nd-font-mono); font-size: var(--nd-text-xs); color: var(--nd-text-mute); }
	.x {
		display: grid;
		place-items: center;
		width: 2rem;
		height: 2rem;
		border: 0;
		background: transparent;
		color: var(--nd-text-dim);
		cursor: pointer;
	}
	.x:hover { background: var(--nd-surface-2); color: var(--nd-text); }
	.body {
		flex: 1 1 auto;
		min-height: 0;
		padding: var(--nd-space-4) var(--nd-space-5) var(--nd-space-5);
		overflow-y: auto;
	}
	footer {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
		gap: var(--nd-space-3);
		padding: var(--nd-space-3) var(--nd-space-5) var(--nd-space-4);
		border-top: 1px solid var(--nd-line);
	}
</style>

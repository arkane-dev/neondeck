<!-- Tabs: ARIA tablist with arrow-key movement. The active tab gets the accent underline.
     Render the panel with the children snippet: {#snippet children(value)}…{/snippet} -->
<script lang="ts">
	import type { Snippet } from 'svelte';
	interface Props {
		items: { value: string; label: string }[];
		value?: string; // bindable
		label: string; // accessible name for the tab list
		children?: Snippet<[string]>;
	}
	let { items, value = $bindable(items[0]?.value ?? ''), label, children }: Props = $props();
	const id = `nd-tabs-${Math.random().toString(36).slice(2, 8)}`;
	let list: HTMLDivElement | undefined = $state();

	function onkeydown(e: KeyboardEvent) {
		const i = items.findIndex((t) => t.value === value);
		let j = i;
		if (e.key === 'ArrowRight') j = (i + 1) % items.length;
		else if (e.key === 'ArrowLeft') j = (i - 1 + items.length) % items.length;
		else if (e.key === 'Home') j = 0;
		else if (e.key === 'End') j = items.length - 1;
		else return;
		e.preventDefault();
		value = items[j].value;
		list?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[j]?.focus();
	}
</script>

<div class="nd-tabs">
	<div class="list" role="tablist" aria-label={label} bind:this={list} tabindex="-1" {onkeydown}>
		{#each items as t (t.value)}
			<button
				type="button"
				role="tab"
				id="{id}-tab-{t.value}"
				aria-selected={t.value === value}
				aria-controls="{id}-panel"
				tabindex={t.value === value ? 0 : -1}
				onclick={() => (value = t.value)}>{t.label}</button
			>
		{/each}
	</div>
	<div id="{id}-panel" role="tabpanel" aria-labelledby="{id}-tab-{value}" class="panel">
		{@render children?.(value)}
	</div>
</div>

<style>
	.list { display: flex; flex-wrap: wrap; border-bottom: 1px solid var(--nd-line); }
	button {
		position: relative;
		padding: var(--nd-space-2) var(--nd-space-4);
		border: 0;
		background: transparent;
		color: var(--nd-text-dim);
		font-family: var(--nd-font-ui);
		font-size: var(--nd-text-sm);
		font-weight: 700;
		letter-spacing: var(--nd-tracking-label);
		text-transform: uppercase;
		cursor: pointer;
	}
	button:hover { color: var(--nd-text); }
	button[aria-selected='true'] { color: var(--nd-accent); }
	button[aria-selected='true']::after {
		content: '';
		position: absolute;
		right: var(--nd-space-2);
		bottom: -1px;
		left: var(--nd-space-2);
		height: 2px;
		background: var(--nd-accent);
	}
	.panel { padding-top: var(--nd-space-4); }
</style>

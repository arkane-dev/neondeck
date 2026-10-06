<!-- Select: native <select> (keyboard and screen readers work as usual) in the Input frame.
     Pass `options`, or <option> children. -->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLSelectAttributes } from 'svelte/elements';
	interface Props extends Omit<HTMLSelectAttributes, 'value'> {
		label?: string;
		value?: string | number | null;
		options?: { value: string | number; label: string }[];
		hint?: string;
		children?: Snippet;
	}
	let {
		label,
		value = $bindable(),
		options,
		hint,
		children,
		id = `nd-sel-${Math.random().toString(36).slice(2, 8)}`,
		...rest
	}: Props = $props();
</script>

<div class="nd-select">
	{#if label}<label for={id}>{label}</label>{/if}
	<div class="edge">
		<div class="field">
			<select {id} bind:value aria-describedby={hint ? `${id}-msg` : undefined} {...rest}>
				{#if options}
					{#each options as o (o.value)}<option value={o.value}>{o.label}</option>{/each}
				{:else}
					{@render children?.()}
				{/if}
			</select>
			<span class="chev" aria-hidden="true">▾</span>
		</div>
	</div>
	{#if hint}<span id="{id}-msg" class="msg">{hint}</span>{/if}
</div>

<style>
	.nd-select { --edge: var(--nd-line-strong); --c: var(--nd-cut-sm); display: flex; flex-direction: column; gap: var(--nd-space-1); }
	.nd-select:focus-within { --edge: var(--nd-accent); }
	label {
		font-family: var(--nd-font-ui);
		font-size: var(--nd-text-xs);
		font-weight: 600;
		letter-spacing: var(--nd-tracking-label);
		text-transform: uppercase;
		color: var(--nd-text-dim);
	}
	.edge,
	.field { clip-path: polygon(0 0, 100% 0, 100% calc(100% - var(--c)), calc(100% - var(--c)) 100%, 0 100%); }
	.edge { padding: 1px; background: var(--edge); transition: background var(--nd-dur-fast) var(--nd-ease); }
	.field { --c: calc(var(--nd-cut-sm) - 0.4px); position: relative; background: var(--nd-void); }
	select {
		appearance: none;
		width: 100%;
		padding: 0.6em 2em 0.6em var(--nd-space-3);
		border: 0;
		outline: none;
		background: transparent;
		font-family: var(--nd-font-mono);
		font-size: var(--nd-text-sm);
		cursor: pointer;
	}
	select option { background: var(--nd-surface-1); color: var(--nd-text); }
	.chev {
		position: absolute;
		top: 50%;
		right: var(--nd-space-3);
		transform: translateY(-50%);
		color: var(--nd-accent);
		pointer-events: none;
	}
	.msg { font-family: var(--nd-font-mono); font-size: var(--nd-text-2xs); color: var(--nd-text-mute); }
</style>

<!-- Input: terminal-style field. Mono text, ">" prompt, bottom-cut corner, accent focus edge. -->
<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	interface Props extends Omit<HTMLInputAttributes, 'value'> {
		label?: string;
		value?: string;
		hint?: string;
		error?: string;
		prompt?: string;
	}
	let {
		label,
		value = $bindable(''),
		hint,
		error,
		prompt = '>',
		id = `nd-in-${Math.random().toString(36).slice(2, 8)}`,
		...rest
	}: Props = $props();
</script>

<div class="nd-input" class:invalid={!!error}>
	{#if label}<label for={id}>{label}</label>{/if}
	<div class="edge">
		<div class="field">
			{#if prompt}<span class="prompt" aria-hidden="true">{prompt}</span>{/if}
			<input
				{id}
				bind:value
				aria-invalid={!!error}
				aria-describedby={hint || error ? `${id}-msg` : undefined}
				{...rest}
			/>
		</div>
	</div>
	{#if error}<span class="msg err" id="{id}-msg">! {error}</span>
	{:else if hint}<span class="msg" id="{id}-msg">{hint}</span>{/if}
</div>

<style>
	.nd-input { --edge: var(--nd-line-strong); --c: var(--nd-cut-sm); display: flex; flex-direction: column; gap: var(--nd-space-1); }
	.invalid { --edge: var(--nd-danger); }
	.nd-input:focus-within { --edge: var(--nd-accent); }
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
	.field {
		--c: calc(var(--nd-cut-sm) - 0.4px);
		display: flex;
		align-items: center;
		gap: var(--nd-space-2);
		padding: 0 var(--nd-space-3);
		background: var(--nd-void);
	}
	.prompt { font-family: var(--nd-font-mono); color: var(--nd-accent); }
	input {
		flex: 1;
		min-width: 0;
		padding: 0.6em 0;
		border: 0;
		outline: none;
		background: transparent;
		font-family: var(--nd-font-mono);
		font-size: var(--nd-text-sm);
		caret-color: var(--nd-accent);
	}
	input::placeholder { color: var(--nd-text-mute); text-transform: uppercase; }
	.msg { font-family: var(--nd-font-mono); font-size: var(--nd-text-2xs); color: var(--nd-text-mute); }
	.err { color: var(--nd-danger); }
</style>

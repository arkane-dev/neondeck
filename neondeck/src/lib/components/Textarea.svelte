<!-- Textarea: multi-line Input. Same cut frame. Body font by default (prose); `mono` for code. -->
<script lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements';
	interface Props extends Omit<HTMLTextareaAttributes, 'value'> {
		label?: string;
		value?: string;
		hint?: string;
		error?: string;
		mono?: boolean;
	}
	let {
		label,
		value = $bindable(''),
		hint,
		error,
		mono = false,
		rows = 4,
		id = `nd-ta-${Math.random().toString(36).slice(2, 8)}`,
		...rest
	}: Props = $props();
</script>

<div class="nd-textarea" class:invalid={!!error}>
	{#if label}<label for={id}>{label}</label>{/if}
	<div class="edge">
		<textarea
			{id}
			{rows}
			class:mono
			bind:value
			aria-invalid={error ? true : undefined}
			aria-describedby={hint || error ? `${id}-msg` : undefined}
			{...rest}
		></textarea>
	</div>
	{#if error}<span id="{id}-msg" class="msg err">! {error}</span>{:else if hint}<span id="{id}-msg" class="msg">{hint}</span>{/if}
</div>

<style>
	.nd-textarea { --edge: var(--nd-line-strong); --c: var(--nd-cut-sm); display: flex; flex-direction: column; gap: var(--nd-space-1); }
	.invalid { --edge: var(--nd-danger); }
	.nd-textarea:focus-within { --edge: var(--nd-accent); }
	label {
		font-family: var(--nd-font-ui);
		font-size: var(--nd-text-xs);
		font-weight: 600;
		letter-spacing: var(--nd-tracking-label);
		text-transform: uppercase;
		color: var(--nd-text-dim);
	}
	.edge,
	textarea { clip-path: polygon(0 0, 100% 0, 100% calc(100% - var(--c)), calc(100% - var(--c)) 100%, 0 100%); }
	.edge { display: flex; padding: 1px; background: var(--edge); transition: background var(--nd-dur-fast) var(--nd-ease); }
	textarea {
		--c: calc(var(--nd-cut-sm) - 0.4px);
		flex: 1;
		min-width: 0;
		padding: 0.6em var(--nd-space-3);
		border: 0;
		outline: none;
		background: var(--nd-void);
		font-size: var(--nd-text-sm);
		line-height: 1.55;
		resize: vertical;
		caret-color: var(--nd-accent);
	}
	textarea.mono { font-family: var(--nd-font-mono); }
	textarea::placeholder { color: var(--nd-text-mute); }
	.msg { font-family: var(--nd-font-mono); font-size: var(--nd-text-2xs); color: var(--nd-text-mute); }
	.err { color: var(--nd-danger); }
</style>

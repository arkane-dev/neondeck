<!-- Checkbox: square box (no circles in NEONDECK), Rajdhani label. A real <input> underneath. -->
<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	interface Props extends Omit<HTMLInputAttributes, 'type' | 'checked'> {
		label: string;
		checked?: boolean;
		hint?: string;
	}
	let { label, checked = $bindable(false), hint, ...rest }: Props = $props();
</script>

<label class="nd-check">
	<input type="checkbox" bind:checked {...rest} />
	<span class="text">
		<span class="label">{label}</span>
		{#if hint}<span class="hint">{hint}</span>{/if}
	</span>
</label>

<style>
	.nd-check {
		display: inline-flex;
		align-items: flex-start;
		gap: var(--nd-space-2);
		cursor: pointer;
	}
	input {
		appearance: none;
		flex: none;
		display: grid;
		place-items: center;
		width: 1.05rem;
		height: 1.05rem;
		margin: 0.1rem 0 0;
		border: 1px solid var(--nd-line-strong);
		background: var(--nd-void);
		cursor: pointer;
		transition: border-color var(--nd-dur-fast) var(--nd-ease), background var(--nd-dur-fast) var(--nd-ease);
	}
	input::after {
		content: '';
		width: 0.55rem;
		height: 0.55rem;
		background: var(--nd-accent);
		transform: scale(0);
		transition: transform var(--nd-dur-fast) var(--nd-ease);
	}
	input:checked { border-color: var(--nd-accent); }
	input:checked::after { transform: scale(1); }
	input:hover { border-color: var(--nd-accent); }
	input:focus-visible { outline: 2px solid var(--nd-focus); outline-offset: 2px; }
	input:disabled { border-color: var(--nd-line); cursor: not-allowed; }
	.text { display: flex; flex-direction: column; }
	.label {
		font-family: var(--nd-font-ui);
		font-size: var(--nd-text-sm);
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}
	.hint { font-size: var(--nd-text-xs); color: var(--nd-text-mute); }
</style>

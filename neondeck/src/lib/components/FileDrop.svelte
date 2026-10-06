<!-- FileDrop: click or drop files. The real <input type="file"> stays focusable for keyboards. -->
<script lang="ts">
	interface Props {
		label?: string;
		hint?: string;
		accept?: string;
		multiple?: boolean;
		disabled?: boolean;
		onfiles: (files: File[]) => void;
	}
	let { label = 'Drop files or browse', hint, accept, multiple = false, disabled = false, onfiles }: Props = $props();
	let over = $state(false);
	let input: HTMLInputElement | undefined = $state();

	function take(list: FileList | null | undefined) {
		const files = Array.from(list ?? []);
		if (files.length) onfiles(multiple ? files : files.slice(0, 1));
		if (input) input.value = ''; // let the same file be picked again
	}
</script>

<label
	class="nd-filedrop"
	class:over
	class:disabled
	ondragover={(e) => {
		e.preventDefault();
		if (!disabled) over = true;
	}}
	ondragleave={() => (over = false)}
	ondrop={(e) => {
		e.preventDefault();
		over = false;
		if (!disabled) take(e.dataTransfer?.files);
	}}
>
	<input bind:this={input} type="file" {accept} {multiple} {disabled} onchange={(e) => take(e.currentTarget.files)} />
	<span class="prompt" aria-hidden="true">&gt;</span>
	<span class="text">
		<span class="label">{label}</span>
		{#if hint}<span class="hint">{hint}</span>{/if}
	</span>
</label>

<style>
	.nd-filedrop {
		--edge: var(--nd-line-strong);
		position: relative;
		display: flex;
		align-items: center;
		gap: var(--nd-space-3);
		padding: var(--nd-space-4);
		border: 1px solid var(--edge);
		background: var(--nd-void);
		cursor: pointer;
		transition: border-color var(--nd-dur-fast) var(--nd-ease);
	}
	.nd-filedrop:hover,
	.over { --edge: var(--nd-accent); }
	.over { background: var(--nd-accent-tint); }
	.nd-filedrop:focus-within { outline: 2px solid var(--nd-focus); outline-offset: 2px; }
	.disabled { --edge: var(--nd-line); cursor: not-allowed; }
	/* Visually hidden, still focusable and announced. */
	input {
		position: absolute;
		width: 1px;
		height: 1px;
		opacity: 0;
		overflow: hidden;
	}
	.prompt { font-family: var(--nd-font-mono); color: var(--nd-accent); }
	.text { display: flex; flex-direction: column; }
	.label {
		font-family: var(--nd-font-ui);
		font-size: var(--nd-text-sm);
		font-weight: 600;
		letter-spacing: var(--nd-tracking-label);
		text-transform: uppercase;
	}
	.hint { font-family: var(--nd-font-mono); font-size: var(--nd-text-2xs); color: var(--nd-text-mute); }
</style>

<!-- Toaster: renders toast.create() messages, bottom right, above the status bar.
     Errors are announced right away (role="alert"); the rest wait politely. -->
<script lang="ts">
	import { toast, type ToastType } from '../toast.svelte.js';

	const tone: Record<ToastType, string> = {
		info: 'var(--nd-info)',
		success: 'var(--nd-success)',
		warning: 'var(--nd-warning)',
		error: 'var(--nd-danger)'
	};
	const label: Record<ToastType, string> = { info: 'INFO', success: 'OK', warning: 'WARN', error: 'ERROR' };
</script>

<div class="nd-toaster" aria-live="polite">
	{#each toast.items as t (t.id)}
		<div class="toast" style:--t={tone[t.type]} role={t.type === 'error' ? 'alert' : 'status'}>
			<div class="inner">
				<span class="kind">{label[t.type]}</span>
				<div class="text">
					<p class="title">{t.title}</p>
					{#if t.description}<p class="desc">{t.description}</p>{/if}
				</div>
				<button type="button" class="x" aria-label="Dismiss" onclick={() => toast.dismiss(t.id)}>✕</button>
			</div>
		</div>
	{/each}
</div>

<style>
	.nd-toaster {
		position: fixed;
		right: var(--nd-space-4);
		bottom: calc(28px + var(--nd-space-4)); /* clear the status bar */
		z-index: 1000;
		display: flex;
		flex-direction: column;
		gap: var(--nd-space-2);
		width: min(24rem, calc(100vw - 2 * var(--nd-space-4)));
		pointer-events: none;
	}
	.toast {
		--c: var(--nd-cut-sm);
		padding: 1px;
		background: var(--t);
		clip-path: polygon(0 0, 100% 0, 100% calc(100% - var(--c)), calc(100% - var(--c)) 100%, 0 100%);
		pointer-events: auto;
		animation: nd-toast-in var(--nd-dur-base) var(--nd-ease);
	}
	@keyframes nd-toast-in {
		from { opacity: 0; transform: translateX(12px); }
	}
	@media (prefers-reduced-motion: reduce) {
		.toast { animation: none; }
	}
	.inner {
		display: flex;
		align-items: flex-start;
		gap: var(--nd-space-3);
		padding: var(--nd-space-3);
		background: var(--nd-surface-2);
		clip-path: polygon(0 0, 100% 0, 100% calc(100% - var(--c) + 0.4px), calc(100% - var(--c) + 0.4px) 100%, 0 100%);
	}
	.kind {
		padding-top: 0.15em;
		font-family: var(--nd-font-mono);
		font-size: var(--nd-text-2xs);
		color: var(--t);
	}
	.text { flex: 1; min-width: 0; }
	p { margin: 0; }
	.title { font-family: var(--nd-font-ui); font-weight: 700; letter-spacing: 0.06em; }
	.desc { margin-top: var(--nd-space-1); color: var(--nd-text-dim); font-size: var(--nd-text-sm); overflow-wrap: anywhere; }
	.x { border: 0; background: transparent; color: var(--nd-text-dim); cursor: pointer; padding: 0 0.25em; }
	.x:hover { color: var(--nd-text); }
</style>

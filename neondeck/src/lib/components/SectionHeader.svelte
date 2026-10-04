<!-- SectionHeader: "/02  CORE PRINCIPLES ─────────── meta". Every page section starts with one. -->
<script lang="ts">
	interface Props {
		index?: string;
		title: string;
		zh?: string; // Chinese title, shown before the English: "/02 核心原则 CORE PRINCIPLES"
		meta?: string;
		level?: 2 | 3;
	}
	let { index, title, zh, meta, level = 2 }: Props = $props();
</script>

<div class="nd-section-header">
	{#if index}<span class="idx">/{index}</span>{/if}
	<svelte:element this={`h${level}`} class="title"
		>{#if zh}<span class="zh" lang="zh-Hans">{zh}</span>{/if}{title}</svelte:element
	>
	<span class="rule" aria-hidden="true"></span>
	{#if meta}<span class="meta">{meta}</span>{/if}
</div>

<style>
	.nd-section-header {
		display: flex;
		align-items: center;
		gap: var(--nd-space-4);
		margin-bottom: var(--nd-space-6);
	}
	.idx { font-family: var(--nd-font-mono); font-size: var(--nd-text-sm); color: var(--nd-accent); }
	.title {
		margin: 0;
		font-family: var(--nd-font-ui);
		font-size: var(--nd-text-lg);
		font-weight: 700;
		letter-spacing: var(--nd-tracking-label);
	}
	.zh {
		margin-right: 0.6em;
		font-family: var(--nd-font-cjk); /* the squared tech face blurs at this size */
		font-weight: 900;
		letter-spacing: 0.06em;
		color: var(--nd-text);
	}
	.rule {
		flex: 1;
		height: 1px;
		background: linear-gradient(90deg, var(--nd-line-strong), var(--nd-line) 60%, transparent);
	}
	.meta { font-family: var(--nd-font-mono); font-size: var(--nd-text-xs); color: var(--nd-text-mute); }
</style>

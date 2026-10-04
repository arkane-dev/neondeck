<!--
  KanjiMark: oversized CJK display type from the poster plates. Decoration, not content:
  always pair with an English label (label prop is read by screen readers).
-->
<script lang="ts">
	interface Props {
		text: string; // e.g. "未来都市"
		label: string; // meaning, e.g. "Future City"
		vertical?: boolean;
		tone?: 'accent' | 'sun' | 'outline' | 'ghost';
		size?: string;
	}
	let { text, label, vertical = true, tone = 'accent', size = 'var(--nd-text-5xl)' }: Props = $props();
</script>

<span class="nd-kanji tone-{tone}" class:vertical style:font-size={size} role="img" aria-label={label}>{text}</span>

<style>
	.nd-kanji {
		display: inline-block;
		font-family: var(--nd-font-cjk);
		font-weight: 900;
		line-height: 1;
		letter-spacing: 0.02em;
		color: var(--nd-accent);
		user-select: none;
	}
	.vertical { writing-mode: vertical-rl; text-orientation: upright; }
	.tone-sun { color: var(--nd-sun); }
	.tone-outline { color: transparent; -webkit-text-stroke: 1px var(--nd-accent); }
	.tone-ghost { color: color-mix(in srgb, var(--nd-text) 7%, transparent); }
</style>

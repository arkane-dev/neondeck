<!--
  HanziMark: oversized Chinese (Simplified) display type, the poster-plate accent.
  Decoration, not content: always pair with an English label (read by screen readers).
  lang="zh-Hans" makes browsers pick Chinese glyph forms, not Japanese ones, for shared characters.
-->
<script lang="ts">
	interface Props {
		text: string; // e.g. "霓虹都市"
		label: string; // meaning, e.g. "Neon City"
		vertical?: boolean;
		face?: 'gothic' | 'tech'; // gothic = Noto Sans SC 900, tech = ZCOOL QingKe HuangYou (squared)
		tone?: 'accent' | 'sun' | 'outline' | 'ghost';
		size?: string;
	}
	let {
		text,
		label,
		vertical = true,
		face = 'gothic',
		tone = 'accent',
		size = 'var(--nd-text-5xl)'
	}: Props = $props();
</script>

<span
	class="nd-hanzi face-{face} tone-{tone}"
	class:vertical
	style:font-size={size}
	lang="zh-Hans"
	role="img"
	aria-label={label}>{text}</span
>

<style>
	.nd-hanzi {
		display: inline-block;
		font-family: var(--nd-font-cjk);
		font-weight: 900;
		line-height: 1;
		letter-spacing: 0.02em;
		color: var(--nd-accent);
		user-select: none;
	}
	.face-tech { font-family: var(--nd-font-cjk-tech); font-weight: 400; letter-spacing: 0.06em; }
	.vertical { writing-mode: vertical-rl; text-orientation: upright; }
	.tone-sun { color: var(--nd-sun); }
	.tone-outline { color: transparent; -webkit-text-stroke: 1px var(--nd-accent); }
	.tone-ghost { color: color-mix(in srgb, var(--nd-text) 7%, transparent); }
</style>

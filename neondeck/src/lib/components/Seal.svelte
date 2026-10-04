<!--
  Seal (印章): cinnabar stamp. China's red mark, replacing the Japanese red-sun disc.
  intaglio (白文) = paper-colored glyphs cut into a red block; relief (朱文) = red glyphs + red border.
  Characters read in traditional order: top-to-bottom, right column first ("霓虹甲板" → 霓虹 right, 甲板 left).
  Never glows: it is ink, not light.
-->
<script lang="ts">
	interface Props {
		text: string; // 1, 2 or 4 characters read best
		label: string; // English meaning
		variant?: 'intaglio' | 'relief';
		size?: string; // edge length
		tilt?: number; // degrees; a hand-stamped look, keep within ±4
	}
	let { text, label, variant = 'intaglio', size = '6rem', tilt = 0 }: Props = $props();
	const chars = $derived([...text]);
	const perCol = $derived(chars.length <= 2 ? chars.length : Math.ceil(chars.length / 2));
	const colsN = $derived(Math.ceil(chars.length / perCol));
</script>

<span
	class="nd-seal {variant}"
	style:--size={size}
	style:--per-col={perCol}
	style:--cols={colsN}
	style:rotate="{tilt}deg"
	role="img"
	aria-label={label}
>
	<span class="face" lang="zh-Hans" aria-hidden="true">{text}</span>
</span>

<style>
	.nd-seal {
		--glyph: calc(var(--size) / var(--per-col) * 0.78);
		display: inline-grid;
		place-items: center;
		height: var(--size);
		width: calc(var(--glyph) * var(--cols) / 0.82 + var(--size) * 0.12);
		min-width: calc(var(--size) * 0.5);
		padding: calc(var(--size) * 0.06);
		flex: none;
	}
	.face {
		writing-mode: vertical-rl;
		font-family: var(--nd-font-cjk);
		font-weight: 900;
		font-size: var(--glyph);
		line-height: 1.04;
		letter-spacing: 0;
		user-select: none;
	}
	.intaglio { background: var(--nd-cinnabar); color: var(--nd-paper); }
	.relief {
		/* stamped onto its own paper: cinnabar on the dark UI is only ~3:1 */
		background: var(--nd-paper);
		color: var(--nd-cinnabar);
		border: calc(var(--size) * 0.05) solid var(--nd-cinnabar);
		outline: 1px solid var(--nd-cinnabar);
		outline-offset: calc(var(--size) * -0.11);
	}
</style>

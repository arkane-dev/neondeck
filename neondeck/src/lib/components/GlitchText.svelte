<!-- GlitchText: RGB-split glitch on hover (or always with active). Headlines and logos only. -->
<script lang="ts">
	interface Props {
		text: string;
		as?: string;
		active?: boolean;
		class?: string;
	}
	let { text, as = 'span', active = false, class: klass = '' }: Props = $props();
</script>

<svelte:element this={as} class="nd-glitch {klass}" data-text={text} data-active={active}>{text}</svelte:element>

<!-- SysClock: live "SYS_TIME 23:47:12 UTC+0" readout for top bars. -->
<script lang="ts">
	interface Props {
		label?: string;
	}
	let { label = 'SYS_TIME' }: Props = $props();
	let now = $state(new Date());
	$effect(() => {
		const t = setInterval(() => (now = new Date()), 1000);
		return () => clearInterval(t);
	});
	const pad = (n: number) => String(n).padStart(2, '0');
	const time = $derived(`${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`);
	const tz = $derived.by(() => {
		const off = -now.getTimezoneOffset() / 60;
		return `UTC${off >= 0 ? '+' : ''}${off}`;
	});
</script>

<div class="nd-clock">
	<span class="l">{label}</span>
	<time datetime={now.toISOString()}>{time}</time>
	<span class="l">{tz}</span>
</div>

<style>
	.nd-clock {
		display: grid;
		font-family: var(--nd-font-mono);
		font-size: var(--nd-text-xs);
		line-height: 1.3;
		font-variant-numeric: tabular-nums;
	}
	.l { font-size: 0.625rem; color: var(--nd-text-mute); }
	time { color: var(--nd-accent-2); }
</style>

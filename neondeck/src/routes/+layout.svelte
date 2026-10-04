<script lang="ts">
	import '../lib/styles/index.css';
	let { children } = $props();
</script>

<svelte:head><title>NEONDECK // Design System</title></svelte:head>
{@render children()}

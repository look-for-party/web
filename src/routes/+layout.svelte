<script>
	import Layout from '$components/layout.svelte';
	import { setModeCurrent, getModeOsPrefers, LightSwitch } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	onMount(() => {
		setModeCurrent(getModeOsPrefers());
	});
</script>

<Layout>
	<LightSwitch />
	<nav class="text-secondary-500">I am nav</nav>
	<slot />
</Layout>

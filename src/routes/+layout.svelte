<script>
	import Layout from '$components/layout.svelte';
	import { LightSwitch, autoModeWatcher } from '@skeletonlabs/skeleton';
</script>

<svelte:head
	>{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}</svelte:head
>
<Layout>
	<LightSwitch />
	<nav class="text-secondary-500">I am nav</nav>
	<slot />
</Layout>

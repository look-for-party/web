<script>
	import Layout from '$components/layout.svelte';
	import { LightSwitch } from '@skeletonlabs/skeleton';
</script>

<Layout>
	<LightSwitch />
	<nav class="text-secondary-500">I am nav</nav>
	<slot />
</Layout>

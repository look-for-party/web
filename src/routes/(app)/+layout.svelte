<script lang="ts">
	import { AppShell } from '@skeletonlabs/skeleton';
	import Header from '$lib/components/Header/Header.svelte';
</script>

<AppShell>
	<svelte:fragment slot="pageHeader">
		<Header />
	</svelte:fragment>
	<!-- Router Slot -->
	<slot />
</AppShell>

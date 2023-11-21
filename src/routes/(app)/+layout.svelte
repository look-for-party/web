<script lang="ts">
	import { AppShell, initializeStores } from '@skeletonlabs/skeleton';
	import Header from '$src/lib/components/Header/Header.svelte';

	// should be in root layout
	// required only once when implementing Skeleton's Drawer, Modal, and Toast stores
	// prevent known issues with SvelteKit SSR.
	// https://www.skeleton.dev/utilities/drawers#prerequisites
	initializeStores();
</script>

<AppShell>
	<svelte:fragment slot="pageHeader">
		<Header />
	</svelte:fragment>
	<!-- Router Slot -->
	<slot />
</AppShell>

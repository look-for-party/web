<script lang="ts">
	import { AppShell, initializeStores } from '@skeletonlabs/skeleton';
	import '$src/app.postcss';

	// should be in root layout
	// required only once when implementing Skeleton's Drawer, Modal, and Toast stores
	// prevent known issues with SvelteKit SSR.
	// https://www.skeleton.dev/utilities/drawers#prerequisites
	initializeStores();
</script>

<AppShell>
	<!-- TODO: Is this layout legit? -->
	<!-- What I meant to do was having an optional header in the root layout-->
	<!-- so any children layout under this can opt out if needed -->
	<svelte:fragment slot="pageHeader" />
	<!-- Router Slot -->
	<slot />
</AppShell>

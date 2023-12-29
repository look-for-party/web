<script lang="ts">
	import { initializeStores } from '@skeletonlabs/skeleton';
	import '$src/app.postcss';

	// should be in root layout
	// required only once when implementing Skeleton's Drawer, Modal, and Toast stores
	// prevent known issues with SvelteKit SSR.
	// https://www.skeleton.dev/utilities/drawers#prerequisites
	initializeStores();
</script>

<slot />

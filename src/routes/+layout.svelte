<script lang="ts">
	import '$src/app.postcss';
	import { LightSwitch, initializeStores } from '@skeletonlabs/skeleton';
	import FakeProgressBar from '$lib/components/FakeProgressBar.svelte';

	// should be in root layout
	// required only once when implementing Skeleton's Drawer, Modal, and Toast stores
	// prevent known issues with SvelteKit SSR.
	// https://www.skeleton.dev/utilities/drawers#prerequisites
	initializeStores();
</script>

<FakeProgressBar />
<!-- TODO: Hacky way to persist theme state across layouts. Perhaps another method?-->
<LightSwitch class="hidden" />
<slot />

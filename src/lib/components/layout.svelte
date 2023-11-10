<script lang="ts">
	import {
		AppBar,
		AppShell,
		Drawer,
		initializeStores,
		getDrawerStore,
		type DrawerSettings
	} from '@skeletonlabs/skeleton';
	import '$src/app.postcss';
	import { loggedIn } from '../stores';
	import Header from './Header.svelte';

	// should be in root layout
	// required only once when implementing Skeleton's Drawer, Modal, and Toast stores
	// prevent known issues with SvelteKit SSR.
	// https://www.skeleton.dev/utilities/drawers#prerequisites
	initializeStores();
</script>

<Drawer>
	<h1>This is left sidebar</h1>
</Drawer>
<AppShell>
	<!-- (header) -->
	<svelte:fragment slot="sidebarRight">Sidebar Right</svelte:fragment>
	<svelte:fragment slot="pageHeader">
		<Header />
	</svelte:fragment>
	<!-- Router Slot -->
	<label class="flex items-center space-x-2">
		<input class="checkbox" type="checkbox" bind:checked={$loggedIn} />
		<p>Logged in</p>
	</label>
	<slot />
	<!-- ---- / ---- -->
	<!-- (pageFooter) -->
	<!-- (footer) -->
</AppShell>

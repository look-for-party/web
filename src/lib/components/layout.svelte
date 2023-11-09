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

	// should be in root layout
	// required only once when implementing Skeleton's Drawer, Modal, and Toast stores
	// prevent known issues with SvelteKit SSR.
	// https://www.skeleton.dev/utilities/drawers#prerequisites
	initializeStores();

	// must be invoked at the top level
	// https://www.skeleton.dev/utilities/drawers#drawer-store
	const drawerStore = getDrawerStore();

	const drawerSettings: DrawerSettings = { width: 'w-[280px] md:w-[480px]' };
	function openDrawer(): void {
		drawerStore.open(drawerSettings);
	}
</script>

<link
	rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
/>
<Drawer>
	<h1>This is left sidebar</h1>
</Drawer>
<AppShell>
	<!-- (header) -->
	<svelte:fragment slot="sidebarRight">Sidebar Right</svelte:fragment>
	<svelte:fragment slot="pageHeader">
		<AppBar>
			<svelte:fragment slot="lead">
				<button class="material-symbols-outlined mr-4" on:click={openDrawer}> menu </button>
				<strong class="text-2xl">Look For Party</strong>
			</svelte:fragment>

			<svelte:fragment slot="trail">(avatar)</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<!-- (pageFooter) -->
	<!-- (footer) -->
</AppShell>

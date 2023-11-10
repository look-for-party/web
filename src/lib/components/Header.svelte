<script lang="ts">
	import {
		AppBar,
		getDrawerStore,
		Drawer,
		type DrawerSettings,
		Avatar
	} from '@skeletonlabs/skeleton';
	import SearchBar from './SearchBar.svelte';
	import { loggedIn } from '../stores';

	// must be invoked at the top level
	// https://www.skeleton.dev/utilities/drawers#drawer-store
	const drawerStore = getDrawerStore();

	const leftDrawerSettings: DrawerSettings = {
		id: 'left-sidebar',
		width: 'w-[280px] md:w-[480px]',
		position: 'left'
	};
	function openLeftSidebar(): void {
		drawerStore.open(leftDrawerSettings);
	}
</script>

<link
	rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
/>

<Drawer>
	{#if $drawerStore.id === 'left-sidebar'}
		<h1>This is the left sidebar</h1>
	{:else if $drawerStore.id === 'right-sidebar'}
		<h1>This is the right sidebar</h1>
	{/if}
</Drawer>

<AppBar>
	<svelte:fragment slot="lead">
		<button class="material-symbols-outlined mr-4" on:click={openLeftSidebar}> menu </button>
		<strong class="text-2xl">Look For Party</strong>
	</svelte:fragment>

	<svelte:fragment slot="trail">
		<SearchBar />
		{#if $loggedIn}
			<a href="/parties" class="btn hover:variant-soft-primary">Parties</a>
			<a href="/chats" class="btn hover:variant-soft-primary">Chats</a>
			<a href="/resources" class="btn hover:variant-soft-primary">Resources</a>

			<div class="relative inline-block">
				<span class="badge-icon variant-filled-warning absolute -top-0 -right-0 z-10">2</span>
				<button class="btn-icon hover:variant-soft-primary">
					<span class="material-symbols-outlined"> notifications </span>
				</button>
			</div>

			<Avatar
				width="w-12"
				border="border-4 border-surface-300-600-token hover:!border-primary-500"
				cursor="cursor-pointer"
			/>
		{:else}
			<a href="/parties" class="btn hover:variant-soft-primary">Parties</a>
			<a href="/resources" class="btn hover:variant-soft-primary">Resources</a>
			<a href="/signin" class="btn hover:variant-soft-primary">Sign In</a>
			<a href="/signup" class="btn hover:variant-soft-primary">Sign Up</a>
		{/if}
	</svelte:fragment>
</AppBar>

<script lang="ts">
	import {
		AppBar,
		getDrawerStore,
		Drawer,
		type DrawerSettings,
		Avatar,
		LightSwitch
	} from '@skeletonlabs/skeleton';
	import SearchBar from '../SearchBar.svelte';
	import { loggedIn } from '../../stores';
	import LeftSidebar from './LeftSidebar.svelte';
	import RightSidebar from './RightSidebar.svelte';

	// must be invoked at the top level
	// https://www.skeleton.dev/utilities/drawers#drawer-store
	const drawerStore = getDrawerStore();

	const leftDrawerSettings: DrawerSettings = {
		id: 'left-sidebar',
		width: 'w-[280px] md:w-[480px]',
		position: 'left'
	};
	const rightDrawerSettings: DrawerSettings = {
		id: 'right-sidebar',
		width: 'w-[280px] md:w-[480px]',
		position: 'right'
	};
	const openLeftSidebar = (): void => {
		drawerStore.open(leftDrawerSettings);
	};
	const openRightSidebar = (): void => {
		drawerStore.open(rightDrawerSettings);
	};
</script>

<Drawer>
	{#if $drawerStore.id === 'left-sidebar'}
		<LeftSidebar />
	{:else if $drawerStore.id === 'right-sidebar'}
		<RightSidebar />
	{/if}
</Drawer>

<AppBar>
	<svelte:fragment slot="lead">
		<button
			type="button"
			class="material-symbols-outlined btn-icon mr-4"
			style="font-size: 24px;"
			on:click={openLeftSidebar}
		>
			menu
		</button>
		<h1 class="text-2xl"><a href="/" class="gradient-heading">Look For Party</a></h1>
		<!-- TODO: This is only for testing, as LightSwitch cannot be hidden in the drawer. -->
		<!-- See: https://www.skeleton.dev/utilities/lightswitches -->
		<!-- Hide inside right drawer -->
		<LightSwitch />
		<label class="flex items-center space-x-2">
			<input class="checkbox" type="checkbox" bind:checked={$loggedIn} />
			<p>Logged in</p>
		</label>
	</svelte:fragment>

	<svelte:fragment slot="trail">
		<SearchBar placeholder="Global search..." />
		{#if $loggedIn}
			<a href="/parties" class="btn hover:variant-soft-primary">Parties</a>
			<a href="/chats" class="btn hover:variant-soft-primary">Chats</a>
			<a href="/resources" class="btn hover:variant-soft-primary">Resources</a>

			<div class="relative inline-block">
				<span class="badge-icon variant-filled-warning absolute -top-0 -right-0 z-10">2</span>
				<button
					type="button"
					class="material-symbols-outlined btn-icon hover:variant-soft-primary"
					style="font-size: 24px;"
				>
					notifications
				</button>
			</div>

			<Avatar
				width="w-12"
				border="border-4 border-surface-300-600-token hover:!border-primary-500"
				cursor="cursor-pointer"
				on:click={openRightSidebar}
			/>
		{:else}
			<a href="/parties" class="btn hover:variant-soft-primary">Parties</a>
			<a href="/resources" class="btn hover:variant-soft-primary">Resources</a>
			<a href="/signin" class="btn hover:variant-soft-primary">Sign In</a>
			<a href="/signup" class="btn hover:variant-soft-primary">Sign Up</a>
		{/if}
	</svelte:fragment>
</AppBar>

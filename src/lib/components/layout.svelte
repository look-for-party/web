<script lang="ts">
	import { AppBar, AppShell } from '@skeletonlabs/skeleton';
	import '$src/app.postcss';
</script>

<AppShell regionPage="relative" slotPageHeader="sticky top-0 z-10">
	<svelte:fragment slot="header">
		<AppBar>Look For Party</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">Sidebar Left</svelte:fragment>
	<svelte:fragment slot="sidebarRight">Sidebar Right</svelte:fragment>
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<!-- (pageFooter) -->
	<!-- (footer) -->
</AppShell>

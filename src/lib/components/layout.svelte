<script lang="ts">
	import { AppBar, AppShell } from '@skeletonlabs/skeleton';
	import '$src/app.postcss';
</script>

<AppShell>
	<!-- (header) -->
	<svelte:fragment slot="sidebarLeft">Sidebar Left</svelte:fragment>
	<svelte:fragment slot="sidebarRight">Sidebar Right</svelte:fragment>
	<svelte:fragment slot="pageHeader">
		<AppBar>Look For Party</AppBar>
	</svelte:fragment>
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<!-- (pageFooter) -->
	<!-- (footer) -->
</AppShell>

<script lang="ts">
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import List from './components/List.svelte';
	import Host from './components/Host.svelte';
	let tabSet = 0;
</script>

<div class="h-full">
	<TabGroup>
		<div class="flex w-full">
			<Tab bind:group={tabSet} class="w-[50vw]" name="create" value={0}>
				<!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
				<span>Create a Party</span>
			</Tab>
			<Tab bind:group={tabSet} class="w-[50vw]" name="host" value={1}>Host a Party</Tab>
		</div>
		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			{#if tabSet === 0}
				<List />
			{:else if tabSet === 1}
				<Host />
			{/if}
		</svelte:fragment>
	</TabGroup>
</div>

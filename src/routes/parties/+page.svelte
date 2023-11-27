<script lang="ts">
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import List from './components/List.svelte';
	import Host from './components/Host.svelte';

	export let data;

	let tabSet = 0;
</script>

<TabGroup>
	<Tab bind:group={tabSet} class="flex-grow" name="find" value={0}>
		<!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
		<span>Find a Party</span>
	</Tab>
	<Tab bind:group={tabSet} class="flex-grow" name="host" value={1}>Host a Party</Tab>
	<!-- Tab Panels --->
	<svelte:fragment slot="panel">
		{#if tabSet === 0}
			<List parties={data.parties} />
		{:else if tabSet === 1}
			<Host />
		{/if}
	</svelte:fragment>
</TabGroup>

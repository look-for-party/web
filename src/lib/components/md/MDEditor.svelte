<script lang="ts">
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
    import MD from "$lib/components/md/MD.svelte";
	let text = '';
	let tabSet: number = 0;
</script>

<div>
	<TabGroup>
		<Tab bind:group={tabSet} name="view" value={0}>
			<span>View</span>
		</Tab>
		<Tab bind:group={tabSet} name="edit" value={1}>
            <span>Edit</span>
        </Tab>
		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			{#if tabSet === 0}
                <MD src={text}></MD>
			{:else if tabSet === 1}
                <textarea name="" id="" bind:value={text}></textarea>
			{/if}
		</svelte:fragment>
	</TabGroup>
</div>

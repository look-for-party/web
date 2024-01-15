<script lang="ts">
	import { TabGroup, TabAnchor } from '@skeletonlabs/skeleton';

	import type { Party } from '$lib/types';
	import PartyCard from './PartyCard.svelte';

	export let parties: Party[];
</script>

<section id="party-list" class="flex flex-1 flex-col gap-8">
	<div class="flex w-full flex-wrap items-center justify-between gap-2">
		<p class="text-surface-400-500-token min-w-fit font-light">Showing 696 parties (0.420 ms)</p>
		<div class="flex items-center space-x-2">
			<span class="font-semibold">Sort:</span>
			<TabGroup>
				<TabAnchor href="#top">Most relevant</TabAnchor>
				<TabAnchor href="#top">Most popular</TabAnchor>
				<TabAnchor href="#top">Recently added</TabAnchor>
			</TabGroup>
		</div>
	</div>
	<div class="flex flex-col items-center space-y-8">
		{#each parties as party}
			<PartyCard {party} />
		{/each}
	</div>
</section>

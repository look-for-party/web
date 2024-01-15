<script lang="ts">
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';

	import type { Party } from '$lib/types';
	import PartyCard from './PartyCard.svelte';

	import PhSortAscending from '~icons/ph/sort-ascending';

	export let parties: Party[];
	let sortType: string = 'relevant';
</script>

<section id="party-list" class="flex flex-1 flex-col gap-8">
	<div class="flex w-full flex-wrap items-center justify-between gap-2">
		<p class="text-surface-400-500-token min-w-fit font-light">Showing 696 parties (0.420 ms)</p>
		<div class="flex items-center gap-3">
			<span class="flex items-center text-lg"> <PhSortAscending />Sort:</span>
			<RadioGroup
				background="bg-surface-100-800-token"
				border="border-none"
				active="variant-filled-secondary"
			>
				<RadioItem bind:group={sortType} name="sortType" value="relevant" class="whitespace-nowrap"
					>Most relevant</RadioItem
				>
				<RadioItem bind:group={sortType} name="sortType" value="popular" class="whitespace-nowrap"
					>Most popular</RadioItem
				>
				<RadioItem bind:group={sortType} name="sortType" value="recent" class="whitespace-nowrap"
					>Recently added</RadioItem
				>
			</RadioGroup>
		</div>
	</div>
	<div class="flex flex-col items-center space-y-8">
		{#each parties as party}
			<PartyCard {party} />
		{/each}
	</div>
</section>

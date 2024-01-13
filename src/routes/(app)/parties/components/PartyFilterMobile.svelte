<script lang="ts">
	import { skills } from '$lib/utils';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import type { Filter } from '../types';
	import { SlideToggle, type AutocompleteOption, popup } from '@skeletonlabs/skeleton';

	export let filter: Filter;
	let filterNum = 0;
	$: filterNum = filter.commitments.length + filter.interests.length + filter.skills.length;

	let matchProfile = false;

	const clearFilters = () => {
		filter = {
			skills: [],
			commitments: [],
			interests: []
		};
	};

	const skillOptions: AutocompleteOption<string>[] = [];
	for (let skill of skills) {
		skillOptions.push({ label: skill, value: skill, keywords: '' });
	}
</script>

<section id="filter" class="space-y-4">
	<div class="space-y-4">
		<div class="flex items-end justify-between">
			<h2 class="inline h2 font-semibold">All parties</h2>
			<p class="font-light text-right text-surface-400">Showing 696 parties (0.420 ms)</p>
		</div>
		<div class="w-full">
			<SearchBar placeholder="Search parties" />
		</div>
	</div>
	<div class="snap-x scroll-px-4 snap-mandatory scroll-smooth flex gap-4 overflow-x-auto py-4">
		{#each ['Commitments', 'Skills', 'Interests'] as label}
			<!-- Trigger -->
			<button
				class="btn card snap-align-none shrink-0 text-center"
				use:popup={{
					event: 'click',
					target: label.toLowerCase()
				}}>{label}</button
			>
			<!-- Popup -->
			<div class="card p-4 z-10" data-popup={label.toLowerCase()}>
				<!-- TODO: Complete these -->
				<p>{label}</p>
				<div class="arrow bg-surface-100-800-token" />
			</div>
		{/each}
	</div>
	{#if filterNum > 0}
		<div class="space-x-4">
			<span class="font-semibold">{filterNum} active filters</span>
			<button class="underline" on:click={clearFilters}>Clear filters</button>
		</div>
	{/if}
	<div class="w-full space-x-2">
		<SlideToggle name="slider-label" size="sm" active="bg-secondary-500" bind:checked={matchProfile}
			>Match my profile</SlideToggle
		>
	</div>
</section>

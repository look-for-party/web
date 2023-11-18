<script lang="ts">
	import type { Filter } from './types';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	export let filter: Filter;
	let filterNum = 0;

	let skillSearch = '';
	let matchProfile = false;

	function clearFilters() {
		filter.skills = [];
		filter.commitments.forEach((commitment) => (commitment.checked = false));
		filter.interests = [];
		filter = filter;
	}
</script>

<section id="sidebar" class="flex flex-col w-[20vw] min-w-[230px] space-y-6">
	<div class="w-full flex justify-between">
		<button
			class="btn text-lg variant-soft enabled:hover:variant-filled rounded-sm"
			disabled={filterNum === 0}
			on:click={clearFilters}>Clear filters</button
		>
		<span class="chip variant-ringed text-lg">{filterNum}</span>
	</div>
	<SlideToggle name="slider-label" size="sm" active="bg-secondary-500" bind:checked={matchProfile}
		>Match my profile</SlideToggle
	>
	<div class="my-2">
		<span>Skills</span>
		<input
			class="input px-2 py-1"
			type="search"
			name="demo"
			bind:value={skillSearch}
			placeholder="Search..."
		/>
	</div>
	<div>
		<h3 class="h3">Commitment</h3>
		<ul class="list">
			{#each filter.commitments as commitment}
				<li class="list-item">
					<input class="checkbox" type="checkbox" bind:checked={commitment.checked} />
					<span>{commitment.name}</span>
				</li>
			{/each}
		</ul>
	</div>
	<div>
		<h3 class="h3">Interests</h3>
		<ul class="list">
			{#each ['Politics', 'Environment', 'Education'] as interest}
				<li class="list-item">
					<input class="checkbox" type="checkbox" />
					<span>{interest}</span>
				</li>
			{/each}
		</ul>
	</div>
</section>

<script lang="ts">
  import type { Filter } from './types';
	import { SlideToggle } from '@skeletonlabs/skeleton';
  export let filter: Filter 
  let filterNum = 0;

  let skillSearch = '';
  let matchProfile = false;

  function clearFilters() {
    filter.skills = [];
    filter.commitments.forEach((commitment) => commitment.checked = false);
    filter.interests = [];
    filter = filter
  }
</script>

<section id="sidebar" class="flex flex-col w-[20vw] justify-start p-6">
	<div class="my-2">
		<button class="btn bg-primary-500" disabled={filterNum === 0} on:click={clearFilters}
			>Clear filters</button
		>
		<span class="chip variant-filled">{filterNum}</span>
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
	<div class="my-2">
		<span>Commitment</span>
		<ul class="list">
			{#each filter.commitments as commitment}
				<li class="list-item justify-between">
					<span>{commitment.name}</span>
					<input
						type="checkbox"
            bind:checked={commitment.checked}
					/>
				</li>
			{/each}
		</ul>
	</div>
	<div class="my-2">
		<span>Interests</span>
		<ul class="list">
			{#each ['Politics', 'Environment', 'Education'] as interest}
				<li class="list-item justify-between">
					<span>{interest}</span>
					<input
						type="checkbox"
					/>
				</li>
			{/each}
		</ul>
	</div>
</section>

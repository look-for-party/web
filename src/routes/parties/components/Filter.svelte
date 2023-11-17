<script lang="ts">
	import { SlideToggle } from '@skeletonlabs/skeleton';
	export let filters: Set<string>;
  let commitments = ['1-5h/w', '5-10h/w', '10-15h/w'].map(val => {
        return { value: val, checked: false }; 
  })
	let matchProfile = true;
	let filterSearch = '';

  function toggleFilter(val: string) {
    if (filters.has(val)) {
      filters.delete(val);
    } else {
      filters.add(val);
    }
    filters = filters
  }

  function clearFilters() {
    filters.clear();
    filters = filters;
    for (let i = 0; i < commitments.length; i++) {
      commitments[i].checked = false;
    }
  }
</script>

<section id="sidebar" class="flex flex-col w-[20vw] justify-start p-6">
	<div class="my-2">
		<button class="btn bg-primary-500" disabled={filters.size === 0} on:click={clearFilters}
			>Clear filters</button
		>
		<span class="chip variant-filled">{filters.size}</span>
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
			bind:value={filterSearch}
			placeholder="Search..."
		/>
	</div>
	<div class="my-2">
		<span>Commitment</span>
		<ul class="list">
			{#each commitments as commitment}
				<li class="list-item justify-between">
					<span>{commitment.value}</span>
					<input
						type="checkbox"
            bind:checked={commitment.checked}
            on:change={() => toggleFilter(commitment.value)}
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

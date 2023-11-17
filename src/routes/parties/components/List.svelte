<script lang="ts">
	import SearchBar from '$src/lib/components/forms/SearchBar.svelte';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { fly } from 'svelte/transition';
	import Filter from './Filter.svelte';

  let filters: Set<string> = new Set();
	let parties: {
		name: string;
		description: string;
		commitment: string;
		leader: string;
	}[] = [
		{
			name: 'Party 1',
			description: 'Description 1',
			commitment: '5 hours/week',
			leader: 'Leader 1'
		},
		{
			name: 'Party 2',
			description: 'Description 2',
			commitment: '5 hours/week',
			leader: 'Leader 2'
		},
		{
			name: 'Party 3',
			description: 'Description 3',
			commitment: '5 hours/week',
			leader: 'Leader 3'
		}
	];
</script>

<div class="flex h-full" in:fly={{ y: 20, duration: 300 }}>
  <Filter bind:filters={filters} />
	<section class="col-span-3 flex flex-col items-center w-full" id="main-view">
		<SearchBar />
		<div class="flex flex-col items-center w-full">
			{#each parties as party}
				<figure class="card flex min-w-[50%] items-center justify-between pr-4 bg-primary-200 m-4">
					<div class="btn-group-vertical">
						<button class="bg-primary-400">+1</button>
						<button class="bg-error-400">-1</button>
					</div>
					<Avatar intials="LD" />
					<div class="flex flex-col border-r-2 border-gray-300 h-full p-2">
						<span>{party.name}</span>
						<span>{party.description}</span>
					</div>
					<div class="flex flex-col">
						<span>{party.leader}</span>
						<span>{party.commitment}</span>
					</div>
				</figure>
			{/each}
		</div>
	</section>
</div>

<script lang="ts">
	import SearchBar from '$src/lib/components/SearchBar.svelte';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { fly } from 'svelte/transition';
	import Filtering from './Filter.svelte';
	import type { Filter, Party } from './types';

	let filter: Filter = {
		skills: [],
		commitments: [
			{ name: '5-10hr/week', checked: false },
			{ name: '10-15hr/week', checked: false },
			{ name: '15-20hr/week', checked: false },
			{ name: '20+hr/week', checked: false }
		],
		interests: []
	};

	let parties: Party[] = [
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

<div class="flex" in:fly={{ y: 20, duration: 300 }}>
	<Filtering bind:filter />
	<section class="col-span-3 flex flex-col items-center w-full" id="main-view">
		<SearchBar placeholder="Search for party..." />
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

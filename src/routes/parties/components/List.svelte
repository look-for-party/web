<script lang="ts">
	import SearchBar from '$src/lib/components/SearchBar.svelte';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { fly } from 'svelte/transition';
	import Filtering from './Filter.svelte';
	import type { Filter } from './types';
	import { partiesMockData } from '$src/lib/utils/partiesMockData';
	import { faker } from '@faker-js/faker/locale/af_ZA';
	import type { Party } from '$src/lib/types/Party';

	let filter: Filter = {
		skills: [],
		commitments: [],
		interests: []
	};

	let votedParties: { [id: number]: number | undefined } = {};

	const onVote = (party: Party, isUpvote: boolean) => {
		const previousVote = votedParties[party.id] || 0;

		if (isUpvote && previousVote === 1) {
			party.upvotes--;
			delete votedParties[party.id];
		} else if (!isUpvote && previousVote === -1) {
			party.upvotes++;
			delete votedParties[party.id];
		} else {
			const x = isUpvote ? 1 : -1;
			party.upvotes += x;
			votedParties[party.id] = x;

			if (previousVote === -x) {
				party.upvotes += x;
			}
		}
		parties = parties; // svelte only update when assigning
	};

	let parties = partiesMockData;
</script>

<!-- TODO: handle overflows -->
<div class="flex px-6 pt-4 space-x-6" in:fly={{ y: 20, duration: 300 }}>
	<Filtering bind:filter />
	<section class="flex flex-col items-center w-full flex-1 space-y-8" id="main-view">
		<div class="w-full">
			<SearchBar placeholder="Search for party..." />
		</div>
		<div class="w-full flex items-center justify-between">
			<div>Showing 696 entries (0.420 ms)</div>
			<div>
				Sort by:
				<div class="btn-group variant-ghost-surface">
					<button>Most relevant</button>
					<button>Most popular</button>
					<button>Recently added</button>
				</div>
			</div>
		</div>
		<div class="flex flex-col items-center w-full max-w-5xl space-y-8">
			{#each parties as party}
				<div class="card card-hover flex items-center w-full h-32">
					<div class="btn-group-vertical h-full rounded-r-none ring-outline-token">
						<button
							class={votedParties[party.id] === 1 ? 'bg-success-active-token' : ''}
							on:click={() => onVote(party, true)}>+</button
						>
						<div class="flex-grow flex justify-center items-center">
							<div>{party.upvotes}</div>
						</div>
						<button
							class={votedParties[party.id] === -1 ? 'bg-error-active-token' : ''}
							on:click={() => onVote(party, false)}>-</button
						>
					</div>
					<div class="h-full aspect-square p-5">
						<Avatar src={faker.image.url()} width="w-full" />
					</div>
					<div class="border-r-2 border-gray-300 h-full p-2 flex-1 overflow-auto">
						<h2 class="h2 h-1/2 whitespace-nowrap">{party.name}</h2>
						<p class="h-1/2">{party.description}</p>
					</div>

					<div class="flex flex-col w-1/4 pl-4 space-y-2 h-full p-2 overflow-scroll">
						<div class="flex items-center w-full space-x-4">
							<Avatar src={party.leader.avatar} width="w-6" />
							<span>{party.leader.name}</span>
						</div>
						<div class="flex items-center w-full space-x-4">
							<span class="material-symbols-outlined"> calendar_clock </span>
							<span>{party.requirements.commitment}</span>
						</div>
						<div class="flex w-full space-x-4">
							<span class="material-symbols-outlined"> tag </span>
							<div>
								{#each [...party.requirements.skills, ...party.requirements.interests] as skill}
									<span class="chip variant-filled hover:variant-soft mr-2 mb-2">{skill}</span>
								{/each}
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</section>
</div>

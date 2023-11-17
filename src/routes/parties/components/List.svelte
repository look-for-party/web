<script lang="ts">
	import SearchBar from '$src/lib/components/SearchBar.svelte';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { fly } from 'svelte/transition';
	import Filtering from './Filter.svelte';
	import type { Filter } from './types';
	import { partiesMockData } from '$src/lib/utils/partiesMockData';
	import { faker } from '@faker-js/faker/locale/af_ZA';
	import { interests } from '$src/lib/partyRequirements/interests';

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

	let parties = partiesMockData;
</script>

<!-- TODO: handle overflows -->
<div class="flex" in:fly={{ y: 20, duration: 300 }}>
	<Filtering bind:filter />
	<section class="flex flex-col items-center w-full flex-grow" id="main-view">
		<div class="w-full p-4">
			<SearchBar placeholder="Search for party..." />
		</div>
		<div class="w-full p-4 flex items-center justify-between">
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
		<div class="flex flex-col items-center w-full max-w-screen-lg">
			{#each parties as party}
				<div class="card flex rounded-none items-center bg-primary-200 m-4 w-full h-32">
					<div class="btn-group-vertical h-full rounded-r-none ring-outline-token">
						<button class="flex-grow bg-success-active-token">+1</button>
						<button class="flex-grow bg-error-active-token">-1</button>
					</div>
					<div class="h-full aspect-square flex items-center justify-center p-5">
						<Avatar src={faker.image.url()} width="w-full" />
					</div>
					<div class="flex flex-col border-r-2 border-gray-300 h-full p-2 flex-grow">
						<h2 class="h2">{party.name}</h2>
						<p>{party.description}</p>
					</div>

					<div class="flex flex-col w-1/4 pl-4 space-y-2 h-full p-2 overflow-scroll">
						<div class="flex items-center w-full space-x-4">
							<Avatar src={party.leader.avatar} width="w-8" />
							<span>{party.leader.name}</span>
						</div>
						<div class="flex items-center w-full space-x-4">
							<span class="material-symbols-outlined"> calendar_clock </span>
							<span>{party.requirements.commitment}</span>
						</div>
						<div class="flex w-full space-x-4">
							<span class="material-symbols-outlined"> tag </span>
							<div>
								{#each party.requirements.skills as skill}
									<span class="chip variant-filled mr-2 mb-2">{skill}</span>
								{/each}
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</section>
</div>

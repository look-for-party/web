<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';

	import type { Party } from '$lib/types';

	export let parties: Party[];

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
</script>

<!-- TODO: handle overflows -->
<section id="party-list" class="flex flex-col md:hidden">
	<!-- <div class="w-full flex items-center justify-between">
		<div>Showing 696 entries (0.420 ms)</div>
		<div>
			Sort by:
			<div class="btn-group variant-ghost-surface">
				<button>Most relevant</button>
				<button>Most popular</button>
				<button>Recently added</button>
			</div>
		</div>
	</div> -->
	<!-- <div class="flex flex-col items-center space-y-4">
		{#each parties as party}
			<div class="card card-hover flex items-center w-full h-32">
				<Avatar src={faker.image.url()} width="w-12" rounded="rounded-xl" />
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
						<span>{party.requirement.commitment}</span>
					</div>
					<div class="flex w-full space-x-4">
						<span class="material-symbols-outlined"> tag </span>
						<div>
							{#each [...party.requirement.skills, ...party.requirement.interests] as skill}
								<span class="chip variant-filled hover:variant-soft mr-2 mb-2">{skill}</span>
							{/each}
						</div>
					</div>
				</div>
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
			</div>
		{/each}
	</div> -->

	<div class="flex flex-col items-center space-y-8">
		{#each parties as party}
			<a
				href="#top"
				class="border-l-4 hover:border-l-8 border-l-primary-500 w-full p-4 card card-hover flex flex-col space-y-4 overflow-auto"
			>
				<header class="flex space-x-4">
					<div>
						<!-- TODO: fallback for all Avatars and img -->
						<Avatar
							class="mt-1"
							src={party.thumbnail ?? undefined}
							width="w-12"
							rounded="rounded-xl"
						/>
					</div>
					<div class="flex-1">
						<h3 class="h3 font-semibold">{party.name}</h3>
						<article>
							<p class="text-surface-400">{party.description}</p>
						</article>
					</div>
					<button
						class={`chip flex flex-col self-start ${
							votedParties[party.id] === 1 ? 'variant-filled-success' : 'variant-soft'
						}`}
						on:click={() => onVote(party, true)}
					>
						<span class="material-symbols-outlined"> voting_chip </span>
						<span class="!ml-0">{party.upvotes}</span>
					</button>
				</header>
				<section class="ml-6 flex flex-col space-y-2">
					<div class="flex items-center w-full space-x-4">
						<Avatar src={party.leader.avatar} width="w-6" rounded="rounded-lg" />
						<span class="font-thin">{party.leader.name}</span>
					</div>
					<div class="flex items-center w-full space-x-4">
						<span class="material-symbols-outlined"> calendar_clock </span>
						<span class="font-thin">{party.requirement.commitment}</span>
					</div>
					<!-- TODO: variant-ghost-primary and a tick for skills and interests currently active in the filter, variant-soft for all others. allows you to press to enable/disable them -->
					<div class="flex w-full space-x-4">
						<span class="material-symbols-outlined"> code </span>
						<div>
							{#each [...party.requirement.skills] as skill}
								<button class="chip variant-ghost-primary mr-2 mb-2">{skill}</button>
							{/each}
						</div>
					</div>
					<div class="flex w-full space-x-4">
						<span class="material-symbols-outlined"> tag </span>
						<div>
							{#each [...party.requirement.interests] as interest}
								<button class="chip variant-soft mr-2 mb-2">{interest}</button>
							{/each}
						</div>
					</div>
				</section>

				<!-- <div class="flex flex-col w-1/4 pl-4 space-y-2 h-full p-2 overflow-scroll">
					<div class="flex items-center w-full space-x-4">
						<Avatar src={party.leader.avatar} width="w-6" />
						<span>{party.leader.name}</span>
					</div>
					<div class="flex items-center w-full space-x-4">
						<span class="material-symbols-outlined"> calendar_clock </span>
						<span>{party.requirement.commitment}</span>
					</div>
					<div class="flex w-full space-x-4">
						<span class="material-symbols-outlined"> tag </span>
						<div>
							{#each [...party.requirement.skills, ...party.requirement.interests] as skill}
								<span class="chip variant-filled hover:variant-soft mr-2 mb-2">{skill}</span>
							{/each}
						</div>
					</div>
				</div>
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
				</div> -->
			</a>
		{/each}
	</div>
</section>

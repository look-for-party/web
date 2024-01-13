<script lang="ts">
	import { Avatar, TabGroup, TabAnchor } from '@skeletonlabs/skeleton';

	import PhArrowFatUpFill from '~icons/ph/arrow-fat-up-fill';
	import LucideCalendarClock from '~icons/lucide/calendar-clock';
	import LucideCode2 from '~icons/lucide/code-2';
	import LucideTag from '~icons/lucide/tag';

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

<section id="party-list" class="flex flex-1 flex-col space-y-8">
	<div class="flex w-full items-center justify-between">
		<p class="font-light text-surface-400">Showing 696 parties (0.420 ms)</p>
		<div class="flex items-center space-x-2">
			<span class="font-semibold">Sort:</span>
			<TabGroup>
				<TabAnchor href="#top">Most relevant</TabAnchor>
				<TabAnchor href="#top">Most popular</TabAnchor>
				<TabAnchor href="#top">Recently added</TabAnchor>
			</TabGroup>
		</div>
	</div>
	<div class="flex flex-col items-center space-y-8">
		{#each parties as party}
			<a
				href="#top"
				class="card card-hover flex w-full flex-col space-y-4 overflow-auto border-l-4 border-l-primary-500 p-4 hover:border-l-8"
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
						<article class="w-3/4">
							<p class="text-surface-400 [text-wrap:balance]">{party.description}</p>
						</article>
					</div>
					<button
						class={`chip flex flex-col self-start ${
							votedParties[party.id] === 1 ? 'variant-filled-success' : 'variant-soft'
						}`}
						on:click={() => onVote(party, true)}
					>
						<PhArrowFatUpFill class="h-4 w-4" />
						<span class="!ml-0">{party.upvotes}</span>
					</button>
				</header>
				<section class="ml-6 flex flex-col space-y-2">
					<div class="flex w-full items-center space-x-4">
						<Avatar src={party.leader.avatar} width="w-6" rounded="rounded-lg" />
						<span class="font-thin">{party.leader.name}</span>
					</div>
					<div class="flex w-full items-center space-x-4">
						<LucideCalendarClock class="h-6 w-6" />
						<span class="font-thin">{party.requirement.commitment}</span>
					</div>
					<!-- TODO: variant-ghost-primary and a tick for skills and interests currently active in the filter, variant-soft for all others. allows you to press to enable/disable them -->
					<div class="flex w-full space-x-4">
						<LucideCode2 class="h-6 w-6" />
						<div>
							{#each [...party.requirement.skills] as skill}
								<button class="variant-ghost-primary chip mb-2 mr-2">{skill}</button>
							{/each}
						</div>
					</div>
					<div class="flex w-full space-x-4">
						<LucideTag class="h-6 w-6" />
						<div>
							{#each [...party.requirement.interests] as interest}
								<button class="variant-soft chip mb-2 mr-2">{interest}</button>
							{/each}
						</div>
					</div>
				</section>
			</a>
		{/each}
	</div>
</section>

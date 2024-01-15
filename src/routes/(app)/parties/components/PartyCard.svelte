<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import PhArrowFatUpFill from '~icons/ph/arrow-fat-up-fill';
	import LucideCalendarClock from '~icons/lucide/calendar-clock';
	import LucideCode2 from '~icons/lucide/code-2';
	import LucideTag from '~icons/lucide/tag';

	import type { Party } from '$lib/types';

	export let party: Party;

	let vote: 0 | 1 | -1;
	const onVote = (isUpvote: boolean) => {
		const x = isUpvote ? 1 : -1;
		if (vote === x) {
			party.upvotes -= x;
			vote = 0;
		} else {
			party.upvotes += vote === 0 ? x : 2 * x;
			vote = x;
		}
	};
</script>

<div
	class="card card-hover relative flex w-full flex-col gap-4 p-8 outline-1 outline-primary-500 hover:outline hover:outline-offset-8 dark:shadow-black"
>
	<div class="space-y-4">
		<header class="flex items-center space-x-4 xl:items-start">
			<!-- TODO: fallback for all Avatars and img -->
			<Avatar src={party.thumbnail ?? undefined} width="w-16" rounded="rounded-xl" />
			<article class="flex-1">
				<a
					href="#top"
					class="h2 line-clamp-2 pb-1 font-semibold after:absolute after:inset-0 xl:line-clamp-1"
				>
					{party.name}
				</a>

				<p class="text-surface-700-200-token relative hidden text-lg xl:block">
					{party.description}
				</p>
			</article>

			<button
				class={`chip relative flex h-12 w-12 flex-col self-start ${
					vote === 1 ? 'variant-filled-success' : 'variant-soft'
				}`}
				on:click={() => onVote(true)}
			>
				<PhArrowFatUpFill class="h-4 w-4" />
				<span class="!ml-0">{party.upvotes}</span>
			</button>
		</header>

		<p class="text-surface-700-200-token relative text-lg xl:hidden">{party.description}</p>
	</div>
	<hr />

	<section class="flex flex-col space-y-2">
		<a
			href="#top"
			class="relative flex max-w-fit items-center space-x-4 decoration-primary-500 hover:underline"
		>
			<Avatar src={party.leader.avatar} width="w-6" rounded="rounded-lg" />
			<span class="flex-0 font-thin">{party.leader.name}</span>
		</a>
		<div class="relative flex max-w-fit items-center space-x-4">
			<LucideCalendarClock class="h-6 w-6 shrink-0" />
			<span class="font-thin">{party.requirement.commitment}</span>
		</div>
		<!-- TODO: variant-ghost-primary and a tick for skills and interests currently active in the filter, variant-soft for all others. allows you to press to enable/disable them -->
		<div class="relative flex max-w-fit space-x-4">
			<LucideCode2 class="h-6 w-6 shrink-0" />
			<div class="flex flex-wrap gap-2">
				{#each [...party.requirement.skills] as skill}
					<button class="variant-ghost-primary chip h-6">{skill}</button>
				{/each}
			</div>
		</div>
		<div class="relative flex max-w-fit space-x-4">
			<LucideTag class="h-6 w-6 shrink-0" />
			<div class="flex flex-wrap gap-2">
				{#each [...party.requirement.interests] as interest}
					<button class="variant-soft chip h-6">{interest}</button>
				{/each}
			</div>
		</div>
	</section>
</div>

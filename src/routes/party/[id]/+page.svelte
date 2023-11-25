<script lang="ts">
	import type { PageData } from './$types';
	import { Avatar } from '@skeletonlabs/skeleton';
    import { Role } from './types';
	import MD from '$src/lib/components/md/MD.svelte';

	export let data: PageData;

	const comments = [
		{
			user: {
				name: 'Dylan',
				avatar: 'https://avatars.githubusercontent.com/u/25180676?v=4'
			},
			text: 'This is a comment'
		}
	];
</script>

<main class="flex min-h-full flex-col justify-between">
	<section class="m-4 flex justify-between">
		<div class="flex">
			<Avatar initials="DN" />
			{#if data.role === Role.Owner}
				<button class="btn">Edit</button>
			{/if}
			<div class="flex flex-col items-center justify-between overflow-hidden rounded-xl">
				<span class="h-[50%]">69 reps</span>
				{#if data.role !== Role.Owner}
					<div class="flex h-[50%] w-full">
						<button class="w-[50%] bg-success-600">+1</button>
						<button class="w-[50%] bg-error-600">-1</button>
					</div>
				{/if}
			</div>
		</div>
		<div>
			{#if data.role === Role.Owner}
				<button class="btn">Applicants</button>
				<button class="btn">Recruits</button>
			{:else if data.role === Role.Applicant}
				<button class="btn">One-click Apply</button>
			{:else if data.role === Role.Member}
				<button class="btn">Leave party</button>
			{/if}
		</div>
	</section>
	<section class="flex items-center justify-around">
		<MD readonly={data.role !== Role.Owner} bind:text={data.md}/>
		<div>
			<div>
				<span>Skills</span>
			</div>
			<div>
				<span>Commitments</span>
			</div>
			<div>
				<span>Interests</span>
			</div>
		</div>
	</section>
	<section id="comments" class="p-8">
		{#each comments as comment}
			<div class="card p-4">
				<div class="flex justify-between">
					<div class="mb-4 flex items-center gap-4">
						<Avatar initials={comment.user.name} />
						<span>{comment.user.name}</span>
					</div>
					<span>{new Date().toDateString()}</span>
				</div>
				<p>{comment.text}</p>
			</div>
		{/each}
	</section>
</main>

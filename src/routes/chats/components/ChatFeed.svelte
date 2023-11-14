<script lang="ts">
	import { onMount } from 'svelte';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { faker } from '@faker-js/faker';

	import type { MessageFeed, Person } from '$src/lib/types';
	import { getCurrentTimestamp } from '$src/lib/utils';

	let elemChat: HTMLElement;
	export let messageFeed: MessageFeed[];
	export let currentMessage: string;
	export let currentPerson: Person;
	export let isDetailsOpen: boolean;

	const addMessage = (): void => {
		const newMessage = {
			id: faker.number.int(),
			host: true,
			avatar: faker.image.avatar(),
			name: 'You',
			timestamp: `Today @ ${getCurrentTimestamp()}`,
			message: currentMessage,
			color: 'variant-soft-primary'
		};
		// Update the message feed
		messageFeed = [...messageFeed, newMessage];
		// Clear prompt
		currentMessage = '';
		// Smooth scroll to bottom
		// Timeout prevents race condition
		setTimeout(() => {
			scrollChatBottom('smooth');
		}, 0);
	};

	const onToggleDetails = (): void => {
		isDetailsOpen = !isDetailsOpen;
	};

	const onPromptKeydown = (event: KeyboardEvent): void => {
		if (['Enter'].includes(event.code)) {
			event.preventDefault();
			addMessage();
		}
	};

	// For some reason, eslint thinks ScrollBehavior is undefined...
	// eslint-disable-next-line no-undef
	const scrollChatBottom = (behavior?: ScrollBehavior): void => {
		elemChat.scrollTo({ top: elemChat.scrollHeight, behavior });
	};

	// When DOM mounted, scroll to bottom
	onMount(() => {
		scrollChatBottom();
	});
</script>

<div class="flex flex-col flex-1">
	<!-- Header -->
	<header class="border-b border-surface-500/30 p-4">
		<div class="flex justify-between items-center">
			<div class="flex items-center space-x-2">
				<Avatar src={currentPerson.avatar} width="w-12" />
				<h2 class="font-bold">{currentPerson.name}</h2>
			</div>
			<div class="btn-group variant-ringed-surface [&>*+*]:border-surface-500">
				<button type="button" class="material-symbols-outlined"> call </button>
				<button type="button" class="material-symbols-outlined"> video_call </button>
				<button type="button" class="material-symbols-outlined" on:click={onToggleDetails}>
					info
				</button>
			</div>
		</div>
	</header>
	<!-- Conversation -->
	<section class="flex-grow relative">
		<div bind:this={elemChat} class="absolute inset-0 p-4 space-y-4 overflow-y-auto">
			{#each messageFeed as bubble}
				{#if bubble.host === true}
					<div class="grid grid-cols-[auto_1fr]">
						<Avatar src={bubble.avatar} width="w-8" />
						<div class="card p-4 variant-soft rounded-tl-none space-y-2">
							<header class="flex justify-between items-center">
								<p class="font-bold">{bubble.name}</p>
								<small class="opacity-50">{bubble.timestamp}</small>
							</header>
							<p>{bubble.message}</p>
						</div>
					</div>
				{:else}
					<div class="grid grid-cols-[1fr_auto] gap-2">
						<div class="card p-4 rounded-tr-none space-y-2 {bubble.color}">
							<header class="flex justify-between items-center">
								<p class="font-bold">{bubble.name}</p>
								<small class="opacity-50">{bubble.timestamp}</small>
							</header>
							<p>{bubble.message}</p>
						</div>
						<Avatar src={bubble.avatar} width="w-8" />
					</div>
				{/if}
			{/each}
		</div>
	</section>
	<!-- Prompt -->
	<section class="border-t border-surface-500/30 p-4">
		<div class="input-group input-group-divider grid-cols-[auto_1fr_auto] rounded-container-token">
			<button
				type="button"
				class="material-symbols-outlined input-group-shim"
				style="font-size: 16px;">attach_file_add</button
			>
			<!-- TODO: Auto-expand textarea -->
			<!-- Possible direction: https://codepen.io/vsync/pen/bGgQzL-->
			<!-- Requirements: Auto-expand and scroll feed if feed is at the bottom.-->
			<!-- Only expand and do not scroll feed if feed is not at the bottom-->
			<!-- See Discord chat area-->
			<textarea
				bind:value={currentMessage}
				class="textarea resize-y p-2 bg-transparent border-0 ring-0"
				name="prompt"
				id="prompt"
				placeholder="Write a message..."
				rows="1"
				on:keydown={onPromptKeydown}
			/>
			<button
				class={currentMessage
					? 'material-symbols-outlined variant-filled-primary'
					: 'material-symbols-outlined input-group-shim'}
				style="font-size: 16px;"
				on:click={addMessage}
				disabled={!currentMessage}
			>
				send
			</button>
		</div>
	</section>
</div>

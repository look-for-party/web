<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { faker } from '@faker-js/faker';
	import LucidePhoneCall from 'virtual:icons/lucide/phone-call';
	import LucideVideo from 'virtual:icons/lucide/video';
	import LucideInfo from 'virtual:icons/lucide/info';
	import LucidePaperclip from 'virtual:icons/lucide/paperclip';
	import LucideSend from 'virtual:icons/lucide/send';

	import type { MessageFeed, Person } from '$lib/types';

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
		// reset height
		updateTextAreaHeight();
	};

	const getCurrentTimestamp = (): string => {
		return new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
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

	let textAreaElement: HTMLElement;
	const updateTextAreaHeight = async () => {
		// TODO: Auto-expand text area and scroll feed to bottom if currently at bottom of feed
		// TODO: Doesn't update when resizing to smaller window
		await tick(); // this fixes the issue where calls from addMessage doesn't update height

		textAreaElement.style.height = 'auto'; // Reset to auto height to get the scroll height
		textAreaElement.style.height = textAreaElement.scrollHeight + 'px';
	};
</script>

<div class="flex flex-1 flex-col">
	<!-- Header -->
	<header class="border-b border-surface-500/30 p-4">
		<div class="flex items-center justify-between">
			<div class="flex items-center space-x-2">
				<Avatar src={currentPerson.avatar} width="w-12" />
				<h2 class="font-bold">{currentPerson.name}</h2>
			</div>
			<div class="variant-ringed-surface btn-group [&>*+*]:border-surface-500">
				<button type="button"><span><LucidePhoneCall /></span></button>
				<button type="button"><span><LucideVideo /></span></button>
				<button type="button" on:click={onToggleDetails}><span><LucideInfo /></span></button>
			</div>
		</div>
	</header>
	<!-- Conversation -->
	<section class="relative flex-grow">
		<div bind:this={elemChat} class="absolute inset-0 space-y-4 overflow-y-auto p-4">
			{#each messageFeed as bubble}
				{#if bubble.host === true}
					<div class="flex space-x-2">
						<div>
							<Avatar src={bubble.avatar} width="w-8" />
						</div>
						<div class="card variant-soft space-y-2 overflow-x-auto rounded-tl-none p-4">
							<header class="flex items-center justify-between space-x-4">
								<p class="font-bold">{bubble.name}</p>
								<small class="opacity-50">{bubble.timestamp}</small>
							</header>
							<p class="break-words">{bubble.message}</p>
						</div>
					</div>
				{:else}
					<div class="flex justify-end space-x-2">
						<div class="card space-y-2 rounded-tr-none p-4 {bubble.color} overflow-x-auto">
							<header class="flex items-center justify-between space-x-4">
								<p class="font-bold">{bubble.name}</p>
								<small class="opacity-50">{bubble.timestamp}</small>
							</header>
							<p class="break-words">{bubble.message}</p>
						</div>
						<div>
							<Avatar src={bubble.avatar} width="w-8" />
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</section>
	<!-- Prompt -->
	<section class="border-t border-surface-500/30 p-4">
		<div class="input-group input-group-divider grid-cols-[auto_1fr_auto] rounded-container-token">
			<button type="button" class="input-group-shim"><span><LucidePaperclip /></span></button>
			<textarea
				bind:this={textAreaElement}
				on:input={updateTextAreaHeight}
				bind:value={currentMessage}
				class="textarea overflow-y-auto border-0 bg-transparent p-2 ring-0"
				name="prompt"
				id="prompt"
				placeholder="Write a message..."
				rows="1"
				on:keydown={onPromptKeydown}
			/>
			<button
				class={currentMessage ? 'variant-filled-primary' : 'input-group-shim'}
				on:click={addMessage}
				disabled={!currentMessage}
			>
				<span><LucideSend /></span>
			</button>
		</div>
	</section>
</div>

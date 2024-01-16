<script lang="ts">
	import { createEventDispatcher, onMount, tick } from 'svelte';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { faker } from '@faker-js/faker';

	import type { MessageFeed, Person } from '$src/lib/types';
	import { getCurrentTimestamp } from '$src/lib/utils';
	import type { RoomMessageInfo } from '$src/lib/chat/types';
	import { messageReceiver } from '$src/lib/chat/client';

	let elemChat: HTMLElement;
	export let messageFeed: MessageFeed[];
	export let currentMessage: string;
	export let currentPerson: Person;
	export let isDetailsOpen: boolean;

	export const addMessage = (msg: RoomMessageInfo): void => {
		const newMessage = {
			id: faker.number.int(),
			host: true,
			avatar: faker.image.avatar(),
			name: 'You',
			timestamp: `Today @ ${getCurrentTimestamp()}`,
			message: msg.content,
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

	const onToggleDetails = (): void => {
		isDetailsOpen = !isDetailsOpen;
	};

	// send message
	const dispatch = createEventDispatcher();
	const onPromptKeydown = (event: KeyboardEvent): void => {
		if (['Enter'].includes(event.code)) {
			event.preventDefault();
            dispatch('messageSent', { message: currentMessage });
		}
	};

    messageReceiver.subscribe((msg) => {
        if (msg)
            addMessage(msg)
    })

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
				<button type="button" class="material-symbols-outlined"> call </button>
				<button type="button" class="material-symbols-outlined"> video_call </button>
				<button type="button" class="material-symbols-outlined" on:click={onToggleDetails}>
					info
				</button>
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
			<button
				type="button"
				class="material-symbols-outlined input-group-shim"
				style="font-size: 16px;">attach_file_add</button
			>
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
				class={currentMessage
					? 'material-symbols-outlined variant-filled-primary'
					: 'material-symbols-outlined input-group-shim'}
				style="font-size: 16px;"
				on:click={() => {
                    dispatch('messageSent', { message: currentMessage });
                }}
				disabled={!currentMessage}
			>
				send
			</button>
		</div>
	</section>
</div>

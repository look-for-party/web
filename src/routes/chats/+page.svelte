<script lang="ts">
	import ChatNavigation from './components/ChatNavigation.svelte';
	import ChatFeed from './components/ChatFeed.svelte';
	import ChatDetails from './components/ChatDetails.svelte';
	import type { MessageFeed, Person } from '$src/lib/types';
	import { peopleMockData, messageFeedMockData } from '$src/lib/utils';
	import { fade } from 'svelte/transition';
    import { connect, currentRoomStore } from '$src/lib/chat';
	import type { UserInfo } from '$src/lib/chat';

	const people: Person[] = peopleMockData;
	let currentPerson: Person = people[0];
	
	let messageFeed: MessageFeed[] = messageFeedMockData;
	let currentMessage: string = '';
	let isDetailsOpen: boolean = true;

	export let user: UserInfo = {
		id: '1',
        name: 'John Doe',
        avatar: 'https://i.pravatar.cc/150?img=1',
	}

    connect(user)
</script>

{#if !$currentRoomStore}
	<div class="flex flex-col justify-center items-center h-full">
		<div class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-100"></div>
		<span class="my-6">LOADING MESSAGES</span>
	</div>
{:else}
	<section class="chat card flex h-full flex-row" transition:fade>
		<ChatNavigation {people} bind:currentPerson />
		<!-- TODO: chat feed scroll up when smaller window -->
		<ChatFeed
			{currentPerson}
			bind:messageFeed
			bind:currentMessage
			bind:isDetailsOpen
		/>
		{#if isDetailsOpen}
			<ChatDetails {currentPerson} />
		{/if}
	</section>
{/if}

<script lang="ts">
	import ChatNavigation from './components/ChatNavigation.svelte';
	import ChatFeed from './components/ChatFeed.svelte';
	import ChatDetails from './components/ChatDetails.svelte';

	import type { MessageFeed, Person } from '$lib/types';
	import { peopleMockData, messageFeedMockData } from '$lib/utils';

	const people: Person[] = peopleMockData;
	let currentPerson: Person = people[0];

	let messageFeed: MessageFeed[] = messageFeedMockData;
	let currentMessage: string = '';
	let isDetailsOpen: boolean = true;
</script>

<section class="h-full flex">
	<ChatNavigation {people} bind:currentPerson />
	<!-- TODO: chat feed scroll up when smaller window -->
	<ChatFeed {currentPerson} bind:messageFeed bind:currentMessage bind:isDetailsOpen />
	{#if isDetailsOpen}
		<ChatDetails {currentPerson} />
	{/if}
</section>

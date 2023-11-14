<script lang="ts">
	import ChatNavigation from './components/ChatNavigation.svelte';
	import ChatFeed from './components/ChatFeed.svelte';
	import ChatDetails from './components/ChatDetails.svelte';

	import type { MessageFeed, Person } from '$src/lib/types';

	import { peopleMockData, messageFeedMockData } from '$src/lib/utils';

	const people: Person[] = peopleMockData;
	let currentPerson: Person = people[0];

	let messageFeed: MessageFeed[] = messageFeedMockData;
	let currentMessage: string = '';
	let isDetailsOpen: boolean = true;
</script>

<section class="chat card h-full grid grid-cols-[90px_1fr_auto] lg:grid-cols-[360px_1fr_auto]">
	<ChatNavigation {people} bind:currentPerson />
	<ChatFeed {currentPerson} bind:messageFeed bind:currentMessage bind:isDetailsOpen />
	{#if isDetailsOpen}
		<ChatDetails {currentPerson} />
	{/if}
</section>

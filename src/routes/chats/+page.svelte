<script lang="ts">
	import ChatNavigation from './components/ChatNavigation.svelte';
	import ChatFeed from './components/ChatFeed.svelte';
	import ChatDetails from './components/ChatDetails.svelte';
	import type { MessageFeed, Person } from '$src/lib/types';
	import { peopleMockData, messageFeedMockData } from '$src/lib/utils';
	import { io } from 'socket.io-client';
    import { JOIN, LEAVE, BROADCAST, INIT } from '$lib/chat/events';
	import type { InitSocketMessage, JoinSocketMessage, RoomMessageInfo, UserInfo, BroadcaseSocketMessage } from '$lib/chat/types'

	
	const people: Person[] = peopleMockData;
	let currentPerson: Person = people[0];
	
	let messageFeed: MessageFeed[] = messageFeedMockData;
	let currentMessage: string = '';
	let isDetailsOpen: boolean = true;

	let isinit = false
	export let user: UserInfo = {
		id: '1',
	}

	const socket = io({
		auth: {
			user
		}
	})

	socket.on('connect', () => {
		const jsm: JoinSocketMessage = {
			rooms: '1'
		}
		socket.emit(JOIN, jsm)
	})

	// before this event occurs, show loading screen
	socket.on(INIT, (msg: InitSocketMessage) => {
		// TODO: do something with rooms

		console.log(msg)
		isinit = true
	})

	socket.on(BROADCAST, (msg: RoomMessageInfo) => {
		// TODO: append message to messageFeed if the room is viewed, else show notification

		console.log(msg)
	})

	socket.on(LEAVE, (msg: RoomMessageInfo) => {
		// when the user leaves party, user also leaves the room
		// TODO: update view
		
	})

</script>

<section class="chat card flex h-full flex-row">
	<ChatNavigation {people} bind:currentPerson />
	<!-- TODO: chat feed scroll up when smaller window -->
	<ChatFeed
		{currentPerson}
		bind:messageFeed
		bind:currentMessage
		bind:isDetailsOpen
		on:messageSent={(e) => {
			const bsm = {
				room: '1',
				content: e.detail.message
			}
			socket.emit(BROADCAST, bsm)
		}}
	/>
	{#if isDetailsOpen}
		<ChatDetails {currentPerson} />
	{/if}
</section>

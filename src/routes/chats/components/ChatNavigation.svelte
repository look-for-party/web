<script lang="ts">
	import { ListBox, ListBoxItem, Avatar } from '@skeletonlabs/skeleton';

	import type { Person } from '$lib/types';
	import SearchBar from '$lib/components/SearchBar.svelte';

	export let people: Person[];
	export let currentPerson: Person;
</script>

<div class="flex flex-col border-r border-surface-500/30 w-24 lg:w-80">
	<!-- Header -->
	<header class="p-4">
		<SearchBar placeholder="Search contacts" />
	</header>
	<!-- Navigation -->
	<section class="flex-grow relative">
		<div class="absolute inset-0 p-4 space-y-4 overflow-y-auto">
			<small class="opacity-50">Contacts</small>
			<ListBox
				rounded="rounded-full lg:rounded-token"
				active="variant-filled-primary"
				padding="px-2 py-2 lg:px-4 lg:py-4"
				labelledby="contacts"
			>
				{#each people as person}
					<ListBoxItem
						bind:group={currentPerson}
						name="people"
						value={person}
						regionDefault="hidden lg:block lg:whitespace-nowrap lg:overflow-hidden"
						regionTrail="hidden lg:block"
					>
						<svelte:fragment slot="lead">
							<Avatar src={person.avatar} width="w-full lg:w-12" />
						</svelte:fragment>
						<p>{person.name}</p>
						<small class="opacity-50">
							Lorem ipsum dolor sit amet consectetur adipisicing elit.</small
						>
						<!--TODO: Clear trail when messages are read-->
						<svelte:fragment slot="trail">
							<span class="badge-icon variant-filled-secondary">2</span>
						</svelte:fragment>
					</ListBoxItem>
				{/each}
			</ListBox>
		</div>
	</section>
</div>

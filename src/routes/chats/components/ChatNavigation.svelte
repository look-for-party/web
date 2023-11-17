<script lang="ts">
	import { ListBox, ListBoxItem, Avatar } from '@skeletonlabs/skeleton';

	import type { Person } from '$src/lib/types';
	import SearchBar from '$src/lib/components/SearchBar.svelte';

	export let people: Person[];
	export let currentPerson: Person;
</script>

<div class="flex w-24 flex-col border-r border-surface-500/30 lg:w-80">
	<!-- Header -->
	<header class="p-4">
		<SearchBar placeholder="Search contacts" />
	</header>
	<!-- Navigation -->
	<section class="relative flex-grow">
		<div class="absolute inset-0 space-y-4 overflow-y-auto p-4">
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
							<span class="variant-filled-secondary badge-icon">2</span>
						</svelte:fragment>
					</ListBoxItem>
				{/each}
			</ListBox>
		</div>
	</section>
</div>

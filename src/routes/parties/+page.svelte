<script lang="ts">
	import SearchBar from '$lib/components/SearchBar.svelte';
	import Banner from './components/Banner.svelte';
	import PartyFilter from './components/PartyFilter.svelte';
	import PartyFilterMobile from './components/PartyFilterMobile.svelte';
	import PartyList from './components/PartyList.svelte';
	import PartyListMobile from './components/PartyListMobile.svelte';
	import type { Filter } from './types';
	export let data;
	// Don't use reactive statement here because we only want to initialize it
	let parties = data.parties;

	let filter: Filter = {
		skills: [],
		commitments: [],
		interests: []
	};

	// TODO: get width from tailwind instead of hardcode
	const mdWidth = 784;
	let innerWidth: number;
</script>

<svelte:window bind:innerWidth />
<Banner />
<section id="parties">
	{#if innerWidth <= mdWidth}
		<div class="block p-4 space-y-8">
			<PartyFilterMobile bind:filter />
			<PartyListMobile {parties} />
		</div>
	{:else}
		<div class="flex mx-auto max-w-screen-xl flex-col p-8 space-y-8">
			<div class="w-full pl-64">
				<SearchBar placeholder="Search by party name or keyword" />
			</div>
			<hr />
			<div class="flex space-x-8">
				<PartyFilter bind:filter />
				<PartyList {parties} />
			</div>
		</div>
	{/if}
</section>

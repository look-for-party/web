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
</script>

<Banner />
<section id="parties">
	<!-- Mobile -->
	<div class="block md:hidden p-4 space-y-8">
		<PartyFilterMobile bind:filter />
		<PartyListMobile {parties} />
	</div>
	<!-- Web -->
	<div class="hidden md:flex mx-auto max-w-screen-xl flex-col p-8 space-y-8">
		<div class="w-full pl-64">
			<SearchBar placeholder="Search by party name or keyword" />
		</div>
		<hr />
		<div class="flex space-x-8">
			<PartyFilter bind:filter />
			<PartyList {parties} />
		</div>
	</div>
</section>

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
	<div class="block space-y-8 p-4 md:hidden">
		<PartyFilterMobile bind:filter />
		<PartyListMobile {parties} />
	</div>

	<!--TODO: Use design token for divider color once https://github.com/skeletonlabs/skeleton/issues/2412 is resolved-->
	<div
		class=" mx-auto hidden max-w-screen-2xl divide-x-2 divide-surface-200 p-8 dark:divide-surface-700 md:flex"
	>
		<div class="mr-8">
			<PartyFilter bind:filter />
		</div>
		<div class="flex flex-grow flex-col space-y-2 pl-8">
			<div class="w-full">
				<SearchBar placeholder="Search by party name or keyword" />
			</div>
			<PartyList {parties} />
		</div>
	</div>
</section>

<script lang="ts">
	import { commitments, skills, interests } from '$lib/utils';
	import type { Filter } from '../types';
	import { slide } from 'svelte/transition';

	import LucideCalendarClock from '~icons/lucide/calendar-clock';
	import LucideCode2 from '~icons/lucide/code-2';
	import LucideTag from '~icons/lucide/tag';
	import LucideEraser from '~icons/lucide/eraser';
	import LucidePlus from '~icons/lucide/plus';
	import LucideMinus from '~icons/lucide/minus';

	import {
		Autocomplete,
		InputChip,
		SlideToggle,
		type AutocompleteOption,
		type PopupSettings,
		popup
	} from '@skeletonlabs/skeleton';

	export let filter: Filter;
	$: filterNum = filter.commitments.length + filter.interests.length + filter.skills.length;

	let matchProfile = false;

	const clearFilters = () => {
		filter = {
			skills: [],
			commitments: [],
			interests: []
		};
	};

	const onCommitmentCheck = (commitment: string) => {
		const idx = filter.commitments.indexOf(commitment);
		if (idx === -1) {
			filter.commitments.push(commitment);
		} else {
			filter.commitments.splice(idx, 1);
		}
		filter = filter;
	};
	const onInterestCheck = (interest: string) => {
		const idx = filter.interests.indexOf(interest);
		if (idx === -1) {
			filter.interests.push(interest);
		} else {
			filter.interests.splice(idx, 1);
		}
		filter = filter;
	};

	let skillInput = '';
	const skillOptions: AutocompleteOption<string>[] = [];
	for (let skill of skills) {
		skillOptions.push({ label: skill, value: skill, keywords: '' });
	}
	const isSkillInputValid = (inp: string) => {
		// search for inp in skills ignoring case
		const inpLowered = inp.toLowerCase();
		return skills.some((str) => str.toLowerCase() === inpLowered);
	};

	const popupSettings: PopupSettings = {
		event: 'focus-click',
		target: 'popupAutocomplete',
		placement: 'bottom'
	};

	const onInputChipSelect = (event: CustomEvent<AutocompleteOption<string>>) => {
		if (filter.skills.includes(event.detail.value) === false) {
			filter.skills.push(event.detail.value);
			filter = filter;
			skillInput = '';
		}
	};

	let showAll = false;
	const toggleShowAll = () => {
		showAll = !showAll;
	};
</script>

<section id="sidebar" class="flex w-56 flex-col space-y-8">
	<button
		class="btn rounded-sm enabled:variant-outline-warning enabled:hover:variant-filled-warning disabled:variant-soft"
		disabled={filterNum === 0}
		on:click={clearFilters}
	>
		<LucideEraser />
		<span>Clear filters</span>
		<span class="variant-ringed chip">{filterNum}</span>
	</button>
	<SlideToggle name="slider-label" size="sm" active="bg-secondary-500" bind:checked={matchProfile}
		>Match my profile
	</SlideToggle>
	<div class="space-y-2">
		<header class="flex items-center gap-2">
			<LucideCode2 class="h-6 w-6" />
			<h3 class="h3 font-bold">Skills</h3>
		</header>
		<div use:popup={popupSettings}>
			<InputChip
				bind:input={skillInput}
				bind:value={filter.skills}
				validation={isSkillInputValid}
				name="chips"
				placeholder="Select skills"
				chips="variant-filled hover:variant-soft"
				class="outline-1 outline-primary-500 transition-[outline-offset] focus-within:border-surface-400-500-token focus-within:outline focus-within:outline-offset-8"
			/>
		</div>
		<div
			data-popup="popupAutocomplete"
			class="card max-h-96 w-56 overflow-y-auto p-2 text-left shadow-lg dark:shadow-black"
			tabindex="-1"
		>
			<Autocomplete
				bind:input={skillInput}
				options={skillOptions}
				denylist={filter.skills}
				on:selection={onInputChipSelect}
				regionButton="w-full text-left !block whitespace-nowrap overflow-hidden text-ellipsis "
			/>
		</div>
	</div>

	<div class="space-y-2">
		<header class="flex items-center gap-2">
			<LucideCalendarClock class="h-6 w-6" />
			<h3 class="h3 font-bold">Commitments</h3>
		</header>
		<ul class="list">
			{#each commitments as commitment}
				<li class="list-item">
					<label class="flex items-center space-x-2">
						<input
							class="checkbox"
							type="checkbox"
							on:click={() => onCommitmentCheck(commitment)}
							checked={filter.commitments.includes(commitment)}
						/>
						<p>{commitment}</p>
					</label>
				</li>
			{/each}
		</ul>
	</div>
	<div class="space-y-2">
		<header class="flex items-center gap-2">
			<LucideTag class="h-6 w-6" />
			<h3 class="h3 font-bold">Interests</h3>
		</header>
		<!-- TODO: Shouldn't hide checked items when show less-->
		<ul class="list">
			{#each interests.slice(0, 5) as interest}
				<li class="list-item">
					<label class="flex items-center space-x-2">
						<input
							class="checkbox"
							type="checkbox"
							on:click={() => onInterestCheck(interest)}
							checked={filter.interests.includes(interest)}
						/>
						<p>{interest}</p>
					</label>
				</li>
			{/each}
			{#if showAll}
				<ul class="list" transition:slide>
					{#each interests.slice(5) as interest}
						<li class="list-item">
							<label class="flex items-center space-x-2">
								<input
									class="checkbox"
									type="checkbox"
									on:click={() => onInterestCheck(interest)}
									checked={filter.interests.includes(interest)}
								/>
								<p>{interest}</p>
							</label>
						</li>
					{/each}
				</ul>
			{/if}
		</ul>
		<button
			class="group flex items-center gap-1 decoration-primary-500 hover:underline"
			on:click={toggleShowAll}
		>
			{#if showAll}
				<LucideMinus class="group-hover:text-primary-500" />
				Show less
			{:else}
				<LucidePlus class="group-hover:text-primary-500" />
				Show more
			{/if}
		</button>
	</div>
</section>

<script lang="ts">
	import { commitments, skills, interests } from '$lib/utils';
	import type { Filter } from '../types';
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
			filter.commitments.splice(idx);
		}
		filter = filter;
	};
	const onInterestCheck = (interest: string) => {
		const idx = filter.interests.indexOf(interest);
		if (idx === -1) {
			filter.interests.push(interest);
		} else {
			filter.interests.splice(idx);
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
		class="variant-soft btn rounded-sm enabled:hover:variant-filled-warning"
		disabled={filterNum === 0}
		on:click={clearFilters}
	>
		<span>Clear filters</span>
		<span class="variant-ringed chip">{filterNum}</span>
	</button>
	<SlideToggle name="slider-label" size="sm" active="bg-secondary-500" bind:checked={matchProfile}
		>Match my profile
	</SlideToggle>
	<div class="space-y-2">
		<p class="h6 font-bold">Skills</p>
		<div use:popup={popupSettings}>
			<InputChip
				bind:input={skillInput}
				bind:value={filter.skills}
				validation={isSkillInputValid}
				name="chips"
				placeholder="Select skills"
				chips="variant-filled hover:variant-soft"
			/>
		</div>
		<div
			data-popup="popupAutocomplete"
			class="card max-h-48 w-1/5 min-w-[230px] overflow-y-auto p-4"
			tabindex="-1"
		>
			<Autocomplete
				bind:input={skillInput}
				options={skillOptions}
				denylist={filter.skills}
				on:selection={onInputChipSelect}
			/>
		</div>
	</div>

	<div class="space-y-2">
		<p class="h6 font-bold">Commitments</p>
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
		<p class="h6 font-bold">Interests</p>
		<ul class="list">
			{#each showAll ? interests : interests.slice(0, 5) as interest}
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
			<!-- TODO: Buggy state saving behaviour -->
			<button class="underline" on:click={toggleShowAll}>
				{showAll ? 'Show less' : 'Show more'}
			</button>
		</ul>
	</div>
</section>

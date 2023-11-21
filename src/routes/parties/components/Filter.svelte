<script lang="ts">
	import { commitments, type Commitment } from '$src/lib/partyRequirements/commitments';
	import { interests, type Interest } from '$src/lib/partyRequirements/interests';
	import { skills, type Skill } from '$src/lib/partyRequirements/skills';
	import type { Filter } from './types';
	import {
		Autocomplete,
		InputChip,
		SlideToggle,
		type AutocompleteOption,
		type PopupSettings,
		popup
	} from '@skeletonlabs/skeleton';

	export let filter: Filter;
	let filterNum = 0;
	$: filterNum = filter.commitments.length + filter.interests.length + filter.skills.length;

	let matchProfile = false;

	const clearFilters = () => {
		filter = {
			skills: [],
			commitments: [],
			interests: []
		};
	};

	const onCommitmentCheck = (commitment: Commitment) => {
		const idx = filter.commitments.indexOf(commitment);
		if (idx === -1) {
			filter.commitments.push(commitment);
		} else {
			filter.commitments.splice(idx);
		}
		filter = filter;
	};
	const onInterestCheck = (interest: Interest) => {
		const idx = filter.interests.indexOf(interest);
		if (idx === -1) {
			filter.interests.push(interest);
		} else {
			filter.interests.splice(idx);
		}
		filter = filter;
	};

	let skillInput = '';
	const skillOptions: AutocompleteOption<Skill>[] = [];
	for (let skill of skills) {
		skillOptions.push({ label: skill, value: skill, keywords: '' });
	}
	const isSkillInputValid = (inp: string) => {
		// search for inp in skills ignoring case
		const inpLowered = inp.toLowerCase();
		return skills.some((str) => str.toLowerCase() === inpLowered);
	};

	let popupSettings: PopupSettings = {
		event: 'focus-click',
		target: 'popupAutocomplete',
		placement: 'bottom'
	};

	const onInputChipSelect = (event: CustomEvent<AutocompleteOption<String>>) => {
		if (filter.skills.includes(event.detail.value as Skill) === false) {
			filter.skills.push(event.detail.value as Skill);
			filter = filter;
			skillInput = '';
		}
	};
</script>

<section id="sidebar" class="flex flex-col w-1/5 min-w-[230px] space-y-6">
	<div class="w-full flex justify-between">
		<button
			class="btn text-lg variant-soft enabled:hover:variant-filled rounded-sm"
			disabled={filterNum === 0}
			on:click={clearFilters}>Clear filters</button
		>
		<span class="chip variant-ringed text-lg">{filterNum}</span>
	</div>
	<SlideToggle name="slider-label" size="sm" active="bg-secondary-500" bind:checked={matchProfile}
		>Match my profile</SlideToggle
	>
	<div>
		<h3 class="h3">Skills</h3>
		<div use:popup={popupSettings}>
			<InputChip
				bind:input={skillInput}
				bind:value={filter.skills}
				validation={isSkillInputValid}
				name="chips"
				placeholder="Enter skills..."
				chips="variant-filled hover:variant-soft"
			/>
		</div>

		<!-- for some reason w-1/6 looks more correct than w-1/5 -->
		<div
			data-popup="popupAutocomplete"
			class="card overflow-y-auto max-h-48 w-1/5 min-w-[230px] p-4"
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

	<div>
		<h3 class="h3">Commitment</h3>
		<ul class="list">
			{#each commitments as commitment}
				<li class="list-item">
					<input
						class="checkbox ml-1"
						type="checkbox"
						on:click={() => onCommitmentCheck(commitment)}
						checked={filter.commitments.includes(commitment)}
					/>
					<span>{commitment}</span>
				</li>
			{/each}
		</ul>
	</div>
	<div>
		<h3 class="h3">Interests</h3>
		<ul class="list">
			{#each interests as interest}
				<li class="list-item">
					<input
						class="checkbox ml-1"
						type="checkbox"
						on:click={() => onInterestCheck(interest)}
						checked={filter.interests.includes(interest)}
					/>
					<span>{interest}</span>
				</li>
			{/each}
		</ul>
	</div>
</section>

<script lang="ts">
	import { Avatar, Accordion, AccordionItem, ListBox, ListBoxItem } from '@skeletonlabs/skeleton';

	import type { Person } from '$src/lib/types';

	export let currentPerson: Person;
</script>

<div class="flex flex-col border-l border-surface-500/30">
	<!-- Header -->
	<header class="p-4">
		<Avatar src={currentPerson.avatar} width="w-24" />
		<p>{currentPerson.name}</p>
		<div class="btn-group variant-ringed-surface [&>*+*]:border-surface-500">
			<a href={currentPerson.avatar} class="material-symbols-outlined">person</a>
			<button type="button" class="material-symbols-outlined">search</button>
		</div>
	</header>
	<!-- Details -->
	<section class="flex-grow relative">
		<div class="absolute inset-0 p-4 space-y-4 overflow-y-auto">
			<Accordion>
				<AccordionItem>
					<svelte:fragment slot="summary">Chat Info</svelte:fragment>
					<svelte:fragment slot="content">
						<button type="button" class="btn variant-filled-primary">
							<span class="material-symbols-outlined">push_pin</span>
							<span>View pinned messages</span>
						</button></svelte:fragment
					>
				</AccordionItem>
				<AccordionItem>
					<svelte:fragment slot="summary">Media, files and links</svelte:fragment>
					<svelte:fragment slot="content"
						><div class="btn-group-vertical variant-ringed-surface [&>*+*]:border-surface-500">
							<button type="button"
								><span class="material-symbols-outlined">movie</span><span>Media</span></button
							>
							<button type="button"
								><span class="material-symbols-outlined">description</span><span>Files</span
								></button
							>
							<button type="button"
								><span class="material-symbols-outlined">link</span><span>Links</span></button
							>
						</div></svelte:fragment
					>
				</AccordionItem>
			</Accordion>
		</div>
	</section>
</div>

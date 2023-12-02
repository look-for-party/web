<script lang="ts">
	import { Avatar, Accordion, AccordionItem } from '@skeletonlabs/skeleton';

	import type { Person } from '$lib/types';

	export let currentPerson: Person;
</script>

<div class="flex flex-col py-4 border-l border-surface-500/30 flex-[0_1_25%] min-w-[300px]">
	<!-- Header -->
	<header class="flex flex-col items-center space-y-4 flex-grow-0">
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
						<span class="chip variant-soft hover:variant-filled w-full justify-start">
							<span class="material-symbols-outlined">push_pin</span>
							<span class="text-base">View pinned messages</span>
						</span></svelte:fragment
					>
				</AccordionItem>
				<AccordionItem>
					<svelte:fragment slot="summary">Media, files and links</svelte:fragment>
					<svelte:fragment slot="content"
						><div class="flex flex-col space-y-2 w-full">
							<span class="chip variant-soft hover:variant-filled w-full justify-start"
								><span class="material-symbols-outlined">movie</span>
								<span class="text-base">Media</span></span
							>
							<span class="chip variant-soft hover:variant-filled w-full justify-start"
								><span class="material-symbols-outlined">description</span>
								<span class="text-base">Files</span></span
							>
							<span class="chip variant-soft hover:variant-filled w-full justify-start"
								><span class="material-symbols-outlined">link</span>
								<span class="text-base">Links</span></span
							>
						</div></svelte:fragment
					>
				</AccordionItem>
			</Accordion>
		</div>
	</section>
</div>

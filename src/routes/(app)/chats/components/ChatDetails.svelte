<script lang="ts">
	import { Avatar, Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import LucideUser from 'virtual:icons/lucide/user';
	import LucideMailSearch from 'virtual:icons/lucide/mail-search';
	import LucidePin from 'virtual:icons/lucide/pin';
	import LucideFilm from 'virtual:icons/lucide/film';
	import LucideFiles from 'virtual:icons/lucide/files';
	import LucideLink2 from 'virtual:icons/lucide/link-2';

	import type { Person } from '$lib/types';

	export let currentPerson: Person;
</script>

<div class="flex min-w-[300px] flex-[0_1_25%] flex-col border-l border-surface-500/30 py-4">
	<!-- Header -->
	<header class="flex flex-grow-0 flex-col items-center space-y-4">
		<Avatar src={currentPerson.avatar} width="w-24" />
		<p>{currentPerson.name}</p>
		<div class="variant-ringed-surface btn-group [&>*+*]:border-surface-500">
			<a href={currentPerson.avatar} title="View profile"><span><LucideUser /></span></a>
			<button type="button" title="Search in conversation"><span><LucideMailSearch /></span></button
			>
		</div>
	</header>
	<!-- Details -->
	<section class="relative flex-grow">
		<div class="absolute inset-0 space-y-4 overflow-y-auto p-4">
			<Accordion>
				<AccordionItem>
					<svelte:fragment slot="summary">Chat Info</svelte:fragment>
					<svelte:fragment slot="content">
						<span class="variant-soft chip w-full justify-start hover:variant-filled">
							<span><LucidePin /></span>
							<span class="text-base">View pinned messages</span>
						</span></svelte:fragment
					>
				</AccordionItem>
				<AccordionItem>
					<svelte:fragment slot="summary">Media, files and links</svelte:fragment>
					<svelte:fragment slot="content"
						><div class="flex w-full flex-col space-y-2">
							<span class="variant-soft chip w-full justify-start hover:variant-filled"
								><span><LucideFilm /></span>
								<span class="text-base">Media</span></span
							>
							<span class="variant-soft chip w-full justify-start hover:variant-filled"
								><span><LucideFiles /></span>
								<span class="text-base">Files</span></span
							>
							<span class="variant-soft chip w-full justify-start hover:variant-filled"
								><span><LucideLink2 /></span>
								<span class="text-base">Links</span></span
							>
						</div></svelte:fragment
					>
				</AccordionItem>
			</Accordion>
		</div>
	</section>
</div>

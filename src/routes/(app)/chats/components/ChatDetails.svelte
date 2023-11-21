<script lang="ts">
	import { Avatar, Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import LucideUser from 'virtual:icons/lucide/user';
	import LucideMailSearch from 'virtual:icons/lucide/mail-search';
	import LucidePin from 'virtual:icons/lucide/pin';
	import LucideFilm from 'virtual:icons/lucide/film';
	import LucideFiles from 'virtual:icons/lucide/files';
	import LucideLink2 from 'virtual:icons/lucide/link-2';

	import type { Person } from '$src/lib/types';

	export let currentPerson: Person;
</script>

<div class="flex flex-col py-4 border-l border-surface-500/30 flex-[0_1_25%] min-w-[300px]">
	<!-- Header -->
	<header class="flex flex-col items-center space-y-4 flex-grow-0">
		<Avatar src={currentPerson.avatar} width="w-24" />
		<p>{currentPerson.name}</p>
		<div class="btn-group variant-ringed-surface [&>*+*]:border-surface-500">
			<a href={currentPerson.avatar} title="View profile"><span><LucideUser /></span></a>
			<button type="button" title="Search in conversation"><span><LucideMailSearch /></span></button
			>
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
							<span><LucidePin /></span>
							<span class="text-base">View pinned messages</span>
						</span></svelte:fragment
					>
				</AccordionItem>
				<AccordionItem>
					<svelte:fragment slot="summary">Media, files and links</svelte:fragment>
					<svelte:fragment slot="content"
						><div class="flex flex-col space-y-2 w-full">
							<span class="chip variant-soft hover:variant-filled w-full justify-start"
								><span><LucideFilm /></span>
								<span class="text-base">Media</span></span
							>
							<span class="chip variant-soft hover:variant-filled w-full justify-start"
								><span><LucideFiles /></span>
								<span class="text-base">Files</span></span
							>
							<span class="chip variant-soft hover:variant-filled w-full justify-start"
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

<script>
	import { page } from '$app/stores';
	import { emojis, details } from '$lib/utils';
</script>

<section class="h-full">
	<div class="h-full flex flex-col items-center justify-center p-6 space-y-6 text-center">
		<span class="text-9xl" role="img" aria-label="emoji">
			{emojis[$page.status] ?? emojis[500]}
		</span>
		<h1 class="font-extrabold text-7xl lg:text-9xl gradient-heading">
			{$page.status}
		</h1>
		<p class="text-lg font-light [text-wrap:balance] max-w-md">
			{details[$page.status] ?? details[500]}
		</p>
		<div class="btn-group-vertical variant-ghost">
			<a href="/">Back to home</a>
			<button
				type="button"
				on:click={() => {
					history.back();
				}}>Go back</button
			>
		</div>
	</div>
</section>

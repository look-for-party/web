<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { LightSwitch } from '@skeletonlabs/skeleton';
</script>

<main class="h-full">
	<section class="flex h-full flex-col items-center justify-center overflow-auto p-6">
		<!-- TODO: Hacky way to persist theme state across layouts. Perhaps another method? -->
		<LightSwitch class="hidden" />
		<a href="/" class="mb-6 flex items-center">
			<img class="mr-2 h-8 w-8" src="/icons/favicon-32x32.png" alt="logo" />
			<span class="gradient-heading text-2xl font-semibold">{env.PUBLIC_APP_NAME}</span>
		</a>
		<div class="card w-full space-y-4 p-6 sm:max-w-lg sm:p-8 md:space-y-6">
			<slot />
		</div>
	</section>
</main>

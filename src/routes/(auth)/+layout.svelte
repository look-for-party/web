<script lang="ts">
	import { PUBLIC_APP_NAME } from '$env/static/public';
</script>

<section class="h-full">
	<div class="h-full flex flex-col items-center justify-center p-6">
		<!-- TODO: Hacky way to persist theme state across layouts. Perhaps another method? -->
		<a href="/" class="flex items-center mb-6">
			<img
				class="w-8 h-8 mr-2"
				src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
				alt="logo"
			/>
			<span class="text-2xl font-semibold gradient-heading">{PUBLIC_APP_NAME}</span>
		</a>
		<div class="card p-6 sm:p-8 w-full sm:max-w-lg space-y-4 md:space-y-6">
			<slot />
		</div>
	</div>
</section>

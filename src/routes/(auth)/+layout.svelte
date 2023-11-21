<script lang="ts">
	import { PUBLIC_APP_NAME } from '$env/static/public';
</script>

<!-- TODO: Adopt Skeleton styling, maybe break out of root layer?, follow https://dev.to/enter?state=new-user -->
<section class="card h-full">
	<div class="h-full flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
		<a href="/" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
			<img
				class="w-8 h-8 mr-2"
				src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
				alt="logo"
			/>
			{PUBLIC_APP_NAME}
		</a>
		<div
			class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
		>
			<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
				<slot />
			</div>
		</div>
	</div>
</section>

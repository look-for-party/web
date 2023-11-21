<script lang="ts">
	import { enhance } from '$app/forms';
	import { PUBLIC_APP_NAME } from '$env/static/public';
</script>

<!-- TODO: Adopt Skeleton styling, maybe break out of root layer?, follow https://dev.to/users/password/new -->
<h2
	class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
>
	Forgot your password?
</h2>
<p class="text-sm font-light text-gray-500 dark:text-gray-300">
	Enter the email address associated with your account, and we'll send you a link to reset your
	password.
</p>
<form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" method="post" use:enhance>
	<div>
		<label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
			>Your email</label
		>
		<input
			type="email"
			name="email"
			id="email"
			class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			placeholder="name@company.com"
			required
		/>
	</div>
	<button type="submit" class="w-full btn variant-filled-primary">Reset passwod</button>
	<button type="button" class="w-full btn variant-ringed">Go back</button>
</form>

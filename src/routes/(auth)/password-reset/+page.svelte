<script lang="ts">
	import { enhance } from '$app/forms';
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	let submitting = false;
</script>

<h1 class="text-xl font-bold md:text-2xl">Forgot your password?</h1>
<p class="text-sm font-light">
	Enter the email address associated with your account, and we'll send you a link to reset your
	password.
</p>
<form
	class="space-y-4 md:space-y-6"
	method="post"
	use:enhance={() => {
		submitting = true;
		return async ({ update }) => {
			await update();
			submitting = false;
		};
	}}
>
	<label for="email" class="label"
		><span class="font-medium">Your email</span>
		<input
			type="email"
			name="email"
			id="email"
			class="input"
			placeholder="you@email.com"
			required
			disabled={submitting}
		/>
	</label>
	<div class="w-full btn-group-vertical variant-ringed-surface [&>*+*]:border-surface-500">
		<button type="submit" disabled={submitting}
			>{#if submitting}
				<ProgressRadial width="w-6" />
			{:else}
				Send reset link
			{/if}</button
		>
		<button
			type="button"
			on:click={() => {
				history.back();
			}}>Go back</button
		>
	</div>
</form>

<script lang="ts">
	import { enhance } from '$app/forms';
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	let submitting = false;
</script>

<h1 class="text-xl font-bold md:text-2xl">Email verification</h1>
<p class="text-sm font-light">Your email verification link was sent to your inbox.</p>
<form
	method="post"
	use:enhance={() => {
		submitting = true;
		return async ({ update }) => {
			await update();
			submitting = false;
		};
	}}
>
	<button type="submit" disabled={submitting} class="variant-filled-primary btn w-full"
		>{#if submitting}
			<ProgressRadial width="w-6" />
		{:else}
			Resend verification link
		{/if}</button
	>
</form>

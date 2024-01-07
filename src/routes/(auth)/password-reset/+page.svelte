<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	// import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	export let data;

	const { form, errors, constraints, enhance, delayed } = superForm(data.passwordResetForm);
</script>

<!-- Uncomment to view Superforms debug info -->
<!-- <SuperDebug data={$form} /> -->
<h1 class="text-xl font-bold md:text-2xl">Forgot your password?</h1>
<p class="text-sm font-light">
	Enter the email address associated with your account, and we'll send you a link to reset your
	password.
</p>
<form class="space-y-4 md:space-y-6" method="post" use:enhance>
	<label for="email" class="label"
		><span class="font-medium">Your email</span>
		<input
			type="email"
			name="email"
			class="input"
			placeholder="you@email.com"
			disabled={$delayed}
			aria-invalid={$errors.email ? 'true' : undefined}
			bind:value={$form.email}
			{...$constraints.email}
		/>
		{#if $errors.email}
			<span class="text-sm font-semibold text-error-500">{$errors.email}</span>
		{/if}
	</label>
	<div class="variant-ringed-surface btn-group-vertical w-full [&>*+*]:border-surface-500">
		<button type="submit" disabled={$delayed}
			>{#if $delayed}
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

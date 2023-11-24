<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	// import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	import type { PageData } from './$types';

	export let data: PageData;

	// Client API
	const { form, errors, constraints, enhance, delayed } = superForm(data.newPasswordForm);
	// Use delayed instead of submitting: https://superforms.rocks/concepts/timers#loading-indicators
</script>

<!-- Uncomment to view Superforms debug info -->
<!-- <SuperDebug data={$form} /> -->
<h1 class="text-xl font-bold md:text-2xl">Set your new password</h1>
<form class="space-y-4 md:space-y-6" method="post" use:enhance>
	<label for="password" class="label"
		><span class="font-medium">Password</span>
		<input
			type="password"
			name="password"
			placeholder="••••••••"
			class="input"
			disabled={$delayed}
			aria-invalid={$errors.password ? 'true' : undefined}
			bind:value={$form.password}
			{...$constraints.password}
		/>
		{#if $errors.password}
			<span class="text-sm font-semibold text-error-500">{$errors.password}</span>
		{/if}
	</label>
	<label for="confirmPassword" class="label"
		><span class="font-medium">Confirm password</span>
		<input
			type="password"
			name="confirmPassword"
			placeholder="••••••••"
			class="input"
			disabled={$delayed}
			aria-invalid={$errors.confirmPassword ? 'true' : undefined}
			bind:value={$form.confirmPassword}
			{...$constraints.confirmPassword}
		/>
		{#if $errors.confirmPassword}
			<span class="text-sm font-semibold text-error-500">{$errors.confirmPassword}</span>
		{/if}
	</label>
	<button type="submit" disabled={$delayed} class="w-full btn variant-filled-primary"
		>{#if $delayed}
			<ProgressRadial width="w-6" />
		{:else}
			Reset password
		{/if}</button
	>
</form>

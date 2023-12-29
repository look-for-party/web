<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	// import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import Fa6BrandsGoogle from 'virtual:icons/fa6-brands/google';
	import Fa6BrandsFacebook from 'virtual:icons/fa6-brands/facebook';
	import Fa6BrandsGithub from 'virtual:icons/fa6-brands/github';

	export let data;

	const { form, errors, constraints, enhance, delayed } = superForm(data.signUpForm);
</script>

<!-- <SuperDebug data={$form} /> -->
<h1 class="text-xl font-bold md:text-2xl">Create an account</h1>
<div class="w-full btn-group-vertical variant-ringed-surface [&>*+*]:border-surface-500">
	<a href="/sign-in/google">
		<span><Fa6BrandsGoogle /></span><span class="flex-1 self-center">Sign up with Google</span></a
	>
	<a href="/sign-in/facebook">
		<span><Fa6BrandsFacebook /></span><span class="flex-1 self-center">Sign up with Facebook</span
		></a
	>
	<a href="/sign-in/github">
		<span><Fa6BrandsGithub /></span><span class="flex-1 self-center">Sign up with GitHub</span></a
	>
</div>
<div class="flex items-center">
	<hr class="flex-1" />
	<span class="px-4 text-surface-400/80">or</span>
	<hr class="flex-1" />
</div>
<form class="space-y-4 md:space-y-6" method="post" use:enhance>
	<label for="email" class="label"
		><span class="font-medium">Email</span>
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
	<p class="text-sm font-light">
		<em>
			By signing up, you are agreeing to our <a href="#top" class="anchor">privacy policy</a>,
			<a href="#top" class="anchor">terms of use</a>, and
			<a href="#top" class="anchor">code of conduct</a>.
		</em>
	</p>
	<button type="submit" disabled={$delayed} class="w-full btn variant-filled-primary"
		>{#if $delayed}
			<ProgressRadial width="w-6" />
		{:else}
			Create an account
		{/if}</button
	>
	<p class="text-sm font-light">
		Already have an account? <a href="/sign-in" class="anchor">Sign in</a>
	</p>
</form>

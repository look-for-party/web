<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	// import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import Fa6BrandsGoogle from 'virtual:icons/fa6-brands/google';
	import Fa6BrandsMeta from 'virtual:icons/fa6-brands/meta';
	import Fa6BrandsGithub from 'virtual:icons/fa6-brands/github';

	import { PUBLIC_APP_NAME } from '$env/static/public';
	import type { PageData } from './$types';

	export let data: PageData;

	// Client API
	const { form, errors, constraints, enhance, delayed } = superForm(data.signInForm);
	// Use delayed instead of submitting: https://superforms.rocks/concepts/timers#loading-indicators
</script>

<!-- Uncomment to view Superforms debug info -->
<!-- <SuperDebug data={$form} /> -->
<h1 class="text-xl font-bold md:text-2xl">Welcome back</h1>
<div class="w-full btn-group-vertical variant-ringed-surface [&>*+*]:border-surface-500">
	<a href="/sign-in/google">
		<span><Fa6BrandsGoogle /></span><span class="flex-1 self-center">Continue with Google</span></a
	>
	<a href="/sign-in/facebook">
		<span><Fa6BrandsMeta /></span><span class="flex-1 self-center">Continue with Facebook</span></a
	>
	<a href="/sign-in/github">
		<span><Fa6BrandsGithub /></span><span class="flex-1 self-center">Continue with GitHub</span></a
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
	<!-- Actually doesn't do anything -->
	<div class="flex items-center justify-between">
		<label for="remember" class="flex items-center space-x-2">
			<input
				id="remember"
				aria-describedby="remember"
				disabled={$delayed}
				type="checkbox"
				class="checkbox"
				checked
			/>
			<p class="text-sm font-light">Remember me</p>
		</label>
		<a href="/password-reset" class="anchor text-sm">Forgot password?</a>
	</div>
	<button type="submit" disabled={$delayed} class="w-full btn variant-filled-primary"
		>{#if $delayed}
			<ProgressRadial width="w-6" />
		{:else}
			Sign in
		{/if}
	</button>
	<p class="text-sm font-light">
		<em>
			By signing in, you are agreeing to our <a href="#top" class="anchor">privacy policy</a>,
			<a href="#top" class="anchor">terms of use</a>, and
			<a href="#top" class="anchor">code of conduct</a>.
		</em>
	</p>
	<hr />
	<p class="text-sm font-light">
		New to {PUBLIC_APP_NAME}? <a href="/sign-up" class="anchor">Create an account</a>.
	</p>
</form>

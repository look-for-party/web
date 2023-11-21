<script lang="ts">
	import { enhance } from '$app/forms';
	import Fa6BrandsGoogle from 'virtual:icons/fa6-brands/google';
	import Fa6BrandsMeta from 'virtual:icons/fa6-brands/meta';
	import Fa6BrandsGithub from 'virtual:icons/fa6-brands/github';
	import LucideEye from 'virtual:icons/lucide/eye';
	import LucideEyeOff from 'virtual:icons/lucide/eye-off';

	let showPassword = false;
	let showConfirmPassword = false;

	const togglePasswordVisibility = () => {
		showPassword = !showPassword;
	};

	const toggleConfirmPasswordVisibility = () => {
		showConfirmPassword = !showConfirmPassword;
	};
</script>

<h1 class="text-xl font-bold md:text-2xl">Create an account</h1>
<div class="w-full btn-group-vertical variant-ringed-surface [&>*+*]:border-surface-500">
	<a href="#top">
		<span><Fa6BrandsGoogle /></span><span class="flex-1 self-center">Sign up with Google</span></a
	>
	<a href="#top">
		<span><Fa6BrandsMeta /></span><span class="flex-1 self-center">Sign up with Facebook</span></a
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
			id="email"
			class="input"
			placeholder="you@email.com"
			required
		/>
	</label>
	<label for="password" class="label"
		><span class="font-medium">Password</span>
		<div class="input-group grid-cols-[1fr_auto]">
			<input
				type={showPassword ? 'text' : 'password'}
				name="password"
				id="password"
				placeholder="••••••••"
				class="input"
				required
			/>
			<button
				type="button"
				title={showPassword ? 'Hide password' : 'Show password'}
				class="variant-filled-secondary"
				on:click={togglePasswordVisibility}
			>
				{#if showPassword}
					<LucideEyeOff />
				{:else}
					<LucideEye />
				{/if}
			</button>
		</div>
	</label>
	<label for="confirm-password" class="label"
		><span class="font-medium">Confirm password</span>
		<div class="input-group grid-cols-[1fr_auto]">
			<input
				type={showConfirmPassword ? 'text' : 'password'}
				name="confirm-password"
				id="confirm-password"
				placeholder="••••••••"
				class="input"
				required
			/>
			<button
				type="button"
				title={showConfirmPassword ? 'Hide password' : 'Show password'}
				class="variant-filled-secondary"
				on:click={toggleConfirmPasswordVisibility}
			>
				{#if showConfirmPassword}
					<LucideEyeOff />
				{:else}
					<LucideEye />
				{/if}
			</button>
		</div>
	</label>
	<p class="text-sm font-light">
		<em>
			By signing up, you are agreeing to our <a href="#top" class="anchor">privacy policy</a>,
			<a href="#top" class="anchor">terms of use</a>, and
			<a href="#top" class="anchor">code of conduct</a>.
		</em>
	</p>
	<button type="submit" class="w-full btn variant-filled-primary">Create an account</button>
	<p class="text-sm font-light">
		Already have an account? <a href="/sign-in" class="anchor">Sign in</a>
	</p>
</form>

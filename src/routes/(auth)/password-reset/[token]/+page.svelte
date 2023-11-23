<script lang="ts">
	import { enhance } from '$app/forms';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import LucideEye from 'virtual:icons/lucide/eye';
	import LucideEyeOff from 'virtual:icons/lucide/eye-off';

	let showPassword = false;
	let showConfirmPassword = false;
	let submitting = false;

	const togglePasswordVisibility = () => {
		showPassword = !showPassword;
	};

	const toggleConfirmPasswordVisibility = () => {
		showConfirmPassword = !showConfirmPassword;
	};
</script>

<h1 class="text-xl font-bold md:text-2xl">Set your new password</h1>
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
				disabled={submitting}
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
				disabled={submitting}
			/>
			<button
				type="button"
				title={showConfirmPassword ? 'Hide password' : 'Show password'}
				class="variant-filled-secondary"
				on:click={toggleConfirmPasswordVisibility}
			>
				{#if showPassword}
					<LucideEyeOff />
				{:else}
					<LucideEye />
				{/if}
			</button>
		</div>
	</label>
	<button type="submit" disabled={submitting} class="w-full btn variant-filled-primary"
		>{#if submitting}
			<ProgressRadial width="w-6" />
		{:else}
			Reset password
		{/if}</button
	>
</form>

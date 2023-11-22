<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<h1 class="text-xl font-bold md:text-2xl">Email verification</h1>
<p class="text-sm font-light">Your email verification link was sent to your inbox.</p>
<form method="post" use:enhance>
	<button type="submit" class="w-full btn variant-filled-primary">Resend verification link</button>
</form>

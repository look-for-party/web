<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<h1>Reset password</h1>
<form method="post" use:enhance>
	<label for="password">New Password</label>
	<input name="password" id="password" /><br />
	<input type="submit" />
</form>

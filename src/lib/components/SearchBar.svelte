<script lang="ts">
	export let placeholder: string;
</script>

<form>
	<label for="default-search" class="sr-only">Search</label>
	<div class="relative">
		<div
			class="material-symbols-outlined absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10"
		>
			search
		</div>
		<input type="search" id="default-search" class="input hover:none p-2 pl-12" {placeholder} />
	</div>
</form>

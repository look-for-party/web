<script lang="ts">
	export let placeholder: string;
	import LucideSearch from 'virtual:icons/lucide/search';
</script>

<form>
	<label for="default-search" class="sr-only">Search</label>
	<div class="relative">
		<span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10">
			<LucideSearch class="text-surface-400" />
		</span>
		<input type="search" id="default-search" class="input hover:none p-2 pl-12" {placeholder} />
	</div>
</form>

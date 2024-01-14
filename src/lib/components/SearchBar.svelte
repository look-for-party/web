<script lang="ts">
	export let placeholder: string;
	import LucideSearch from 'virtual:icons/lucide/search';
</script>

<form>
	<label for="default-search" class="sr-only">Search</label>
	<div class="relative">
		<span class="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-3">
			<LucideSearch class="text-surface-400" />
		</span>
		<input type="search" id="default-search" class="hover:none input p-2 pl-12" {placeholder} />
	</div>
</form>

<script lang="ts">
	import { onMount } from 'svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import Code from './renderers/Code.svelte';
	export let src: string;
	let elem: HTMLDivElement;

	onMount(() => {
		const classes: Record<string, string> = {
			a: 'anchor',
			h1: 'h1',
			h2: 'h2',
			h3: 'h3',
			h4: 'h4',
			h5: 'h5',
			h6: 'h6',
			ol: 'list',
			ul: 'list',
		};
		(function addClass(node: Element) {
			if (!node) return;

			const cls = classes[node.localName];
			if (cls) {
				node.classList.add(cls);
			}

			for (const child of node.children) {
				addClass(child);
			}
		})(elem);

		const anchors = elem.querySelectorAll('a');
		for (const anchor of anchors) {
			anchor.target = '_blank';
			anchor.title = anchor.href;
		}
	});
</script>

<div bind:this={elem}>
	<SvelteMarkdown
		source={src}
		renderers={{
			code: Code
		}}
	/>
</div>

<script lang="ts">
	import { Editor, rootCtx, defaultValueCtx, editorViewOptionsCtx } from '@milkdown/core';
	import {
		commonmark,
		headingAttr,
		linkAttr,
		blockquoteAttr,
		inlineCodeAttr,
	} from '@milkdown/preset-commonmark';
	import { nord } from '@milkdown/theme-nord';
	import { listener, listenerCtx } from '@milkdown/plugin-listener';
	import { prism } from '@milkdown/plugin-prism';

	export let text: string = ""
	export let readonly = true;

	const editable = () => !readonly;

	function editor(dom: HTMLElement) {
		// to obtain the editor instance we need to store a reference of the editor.
		Editor.make()
			.config((ctx) => {
				ctx.set(rootCtx, dom);
				ctx.set(defaultValueCtx, text);

                ctx.update(editorViewOptionsCtx, (prev) => ({
                    ...prev,
                    editable,
                }))

				ctx.set(headingAttr.key, (node) => {
					const level = node.attrs.level;
					return {
						class: `h${level}`
					};
				});
				ctx.set(linkAttr.key, () => {
					return {
						class: 'anchor'
					};
				});
				ctx.set(blockquoteAttr.key, () => {
					return {
						class: 'blockquote'
					};
				});
				ctx.set(inlineCodeAttr.key, () => {
					return {
						class: 'code'
					};
				});
			})
			.config((ctx) => {
				ctx.get(listenerCtx).markdownUpdated((_, md, prevmd) => {
					if (md !== prevmd) {
						text = md;
					}
				});
			})
			.config(nord)
			.use(commonmark)
			.use(listener)
			.use(prism)
			.create();
	}
</script>

<div class="min-h-[50vh] w-[40%] rounded-md border-2 border-gray-500" use:editor></div>

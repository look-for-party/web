<script lang="ts">
  import { CodeBlock } from "@skeletonlabs/skeleton";
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import hljs from 'highlight.js';
	import 'highlight.js/styles/github-dark.css';
	storeHighlightJs.set(hljs);

  export let lang: string
  export let text: string
</script>

<CodeBlock language={lang} code={text}></CodeBlock>

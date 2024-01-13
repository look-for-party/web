<script lang="ts">
	import MdiGmail from 'virtual:icons/mdi/gmail';
	import MdiOutlook from 'virtual:icons/mdi/outlook';
	import MdiOpenInNew from 'virtual:icons/mdi/open-in-new';
</script>

<h1 class="text-xl font-bold md:text-2xl">Check your inbox 😎</h1>
<p class="text-sm font-light">We've sent you an email with a link to reset your password.</p>
<div class="w-full btn-group variant-ringed-surface [&>*+*]:border-surface-500">
	<a class="flex-1" href="https://mail.google.com/mail/" target="_blank" rel="noopener noreferrer">
		<span><MdiGmail /></span><span class="flex-1 self-center">Open Gmail</span><span
			><MdiOpenInNew class="text-xs" /></span
		></a
	>
	<a class="flex-1" href="https://outlook.live.com/mail/" target="_blank" rel="noopener noreferrer">
		<span><MdiOutlook /></span><span class="flex-1 self-center">Open Outlook</span><span
			><MdiOpenInNew class="text-xs" /></span
		></a
	>
</div>

<script lang="ts">
	import { navigating } from '$app/stores';
	import nProgress from 'nprogress';
	import 'nprogress/nprogress.css';

	nProgress.configure({
		minimum: 0.16,
		showSpinner: false
	});

	$: {
		if ($navigating) {
			nProgress.start();
		} else {
			nProgress.done();
		}
	}
</script>

<template>
	<div class="row">
		<ads-index :initialAds="ads" />
	</div>
</template>

<script>
	import AdsIndex from '@/components/dashboard/ads/index'

	export default {
		data() {
			return {
				ads: [],
			}
		},
		components: {
			AdsIndex,
		},
		layout: 'dashboard',
		middleware: ['auth', 'admin'],
		async asyncData({ app }) {
			let response = await app.$axios.$get('ads/status/reviewing')
			return {
				ads: response.data,
			}
		},
	}
</script>

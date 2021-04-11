<template>
	<div class="row">
		<div>{{ transactions.length }}</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				transactions: [],
			}
		},
		layout: 'dashboard',
		middleware: ['auth', 'admin'],
		async asyncData({ app, params }) {
            //soldier
			let response = await app.$axios.$get(`advertiser/transactions/${params.id}`)
            console.log('tr:', response.data)
			return {
				transactions: response.data.data,
			}
            
		},
	}
</script>

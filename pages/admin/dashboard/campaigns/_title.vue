<template>
	<div v-if="campaign">
		<!-- <campaign-title :campaign="campaign" /> -->
		<h3>{{$t('compain_name') + ': ' + campaign[0].title}}</h3>
		<h3>{{$t('compain_type') + ': ' + campaign[0].type}}</h3>
		<h3></h3>
		<br><br><br>
		<ads-index :initialAds="ads" v-if="ads"/>
	</div>
</template>

<script>
	import CampaignTitle from '@/components/dashboard/campaigns/title'
	import AdsIndex from '@/components/dashboard/ads/index'

	export default {
		data() {
			return {
				campaign: '',
				ads: null
			}
		},
		components: {
			CampaignTitle,
			AdsIndex
		},
		layout: 'dashboard',
		middleware: ['auth', 'admin'],
		async asyncData({ app, params, error, store }) {
			let current_page = store.getters["localStorage/currentPagePagination"]
            if (!store.getters["localStorage/backButton"]) {
              current_page = 1
            }
			try {
				let [compaign_response, ads_response] = await Promise.all([

					app.$axios.$get(`campaigns/${params.title}`),
					app.$axios.$get(`/ads/campaign/${params.title}?page=${current_page}`)
				])
				// let response = await app.$axios.$get(`campaigns/${params.title}`)
				// console.log('comp:', response.data)
				return {
					campaign: compaign_response.data,
					ads: ads_response.data
				}
			} catch (e) {
				error({ statusCode: e.status, message: e.message })
			}
		},
		created() {
			// reset back button 
          this.$store.commit(
            "localStorage/SET_BACK_BUTTON",
            false
          );
		}
	}
</script>

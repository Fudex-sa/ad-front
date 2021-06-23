<template>
	<div>
		<!-- start slider -->
		<slider :slides='slides'></slider>
		<!-- end slider -->

		<!-- start services -->
		<services :services='services'></services>
		<!-- end services -->

		<!-- start video -->
		<div class="video">
			<div class="container">
				<div class="row">
					<div class="col-sm-6">
						<video-card
							thumbnail="_nuxt/assets/img/video1.png"
							:videoUrl="settings.publisher_video"
						></video-card>
						<h3>{{$t('i_am_publisher')}}</h3>
						<p class="text2">
							{{$t('publisher_home_msg')}}
						</p>
						<nuxt-link class="the-btn hvr-radial-out" :to='"/auth/register"'>{{$t('join_team')}}</nuxt-link>						
					</div>
					<div class="col-sm-6">
						<video-card
							thumbnail="_nuxt/assets/img/video1.png"
							:videoUrl="settings.advertiser_video"
						></video-card>						
						<h3>{{$t('i_am_advertiser')}}</h3>
						<p class="text2">
								{{$t('advertiser_home_msg')}}
						</p>
						<nuxt-link class="the-btn hvr-radial-out" :to='"/auth/register"'>{{$t('join_team')}}</nuxt-link>	
					</div>
				</div>
			</div>
		</div>
		<!-- end video -->
		<!-- start clients -->
		<clients :partners='partners'></clients>
		<!-- end clients -->
	</div>
</template>

<style>
	.video-img .shadow img {
		margin-top: 22%;
	}
</style>

<script>
	// import Home components
	import Slider from '@/components/front/home/Slider'
	import Services from '@/components/front/home/Services'
	import VideoCard from '@/components/front/home/VideoCard'
	import Clients from '@/components/front/home/Clients'

	export default {
		data(){
			return{
				services:[],
				slides:[]
			}
			
		},
		async asyncData({ app, $axios }) {        
								let response = await $axios.get("home-data", {
										headers: {
												"Accept-Language": app.i18n.locale
										},
								});
        
								return {
										services: response.data.services,
										slides: response.data.slider,
										partners:response.data.partners,
										settings:response.data.settings
								};
			},
		components: {
			Slider,
			Services,
			VideoCard,
			Clients,
		},
		mounted() {},
	}
</script>

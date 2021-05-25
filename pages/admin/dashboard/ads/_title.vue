<template>
<div>


  <div class="col-md-6">
      <h1>{{ $t('Advertisement Details') }}</h1>
    <p>
      <strong>{{ $t('ad_title') }}</strong>
      : {{ ad.title }}
    </p>

    <p>
      <strong>{{ $t('ad_content') }}</strong>
      : {{ ad.content }}
    </p>
    <p>
      <strong>{{ $t('ad_created_at') }}</strong>
      : {{ ad.created_at }} 
    </p>
    <p>
      <strong>{{ $t('start_date') }}</strong>
      : {{ ad.start_date }}
    </p>
    
    <p>
      <strong>{{ $t('budget') }}</strong>
      : {{ ad.budget }} {{ $t('sar')  }}  &nbsp;

        &nbsp;	&nbsp;	&nbsp;	&nbsp;	  <strong>{{ $t('remaining_budget') }}</strong> : {{ ad.remaining_budget }} &nbsp;
    </p>
    
    <p>
      <strong>{{ $t('gender') }}</strong>
      : {{ ad.gender }}
    </p>
    <p>
      <strong>{{ $t('clicks') }}</strong>
      : {{ ad.clicks }}
    </p>
    <p>
      <strong>{{ $t('status') }}</strong>
      : {{ ad.status }}
    </p>
    <p>
      <strong>{{ $t('campaign') }}</strong>
      : {{ ad.campaign.title }}
    </p>
    <p>
      <strong>{{ $t('call_of_action_txt') }}</strong>
      : {{ ad.call_of_action_txt !== "" ? ad.call_of_action_txt :"--" }}
    </p>
    <p>
      <strong>{{ $t('call_of_action_link') }}</strong>
      : {{ ad.call_of_action_url!= "" ? ad.call_of_action_url :"--" }}
    </p>


    <p>
      <strong>{{ $t('ages') }}</strong>
      <ul>
          <li v-for="ag in ad.age" :key="ag">{{ ag }}</li>
      </ul>
    </p>

     <p>
      <strong>{{ $t('targeted_audience')  }}</strong>
      <ul>
          <li v-for="targete_audience in ad.targeted_audience" :key="targete_audience">{{ targete_audience }}</li>
      </ul>
    </p>

     <p>
      <strong>{{ $t('countries') }}</strong>
      <ul>
          <li v-for="cnty in ad.country" :key="cnty">{{ cnty }}</li>
      </ul>
    </p>

     <p>
      <strong>{{ $t('cities') }}</strong>
      <ul>
          <li v-for="cty in ad.targeted_audience" :key="cty">{{ cty }}</li>
      </ul>
    </p>
     <p>
      <strong>{{ $t('language') }}</strong>
      <ul>
          <li v-for="lng in ad.targeted_audience" :key="lng">{{ lng }}</li>
      </ul>
    </p>

    <p>
        <strong>{{ $t('media_type') }}</strong>: {{ ad.media_type}}
    </p>





    <!-- <ad-id :ad="ad" /> -->
  </div>

  <div class="col-md-6">
      <h1>{{ $t('ad_payment_info') }}</h1>

      <!-- {{ ad.paymentInfo}} -->
<div v-if="ad.paymentInfo !== null">


<p>
    {{ $t('payment_id') }}:  <strong> {{ ad.paymentInfo.id}}</strong>
</p>
<p>
   {{ $t('payment_method') }}:  <strong> {{ ad.paymentInfo.paymentBrand}}</strong>
</p>

<p>
    {{ $t('amount_paid') }}:  <strong> {{ ad.paymentInfo.amount}} {{ ad.paymentInfo.currency }}</strong>
</p>
<p>
    {{ $t('payment_date') }}:  <strong> {{ ad.paymentInfo.timestamp}} </strong>
</p>
<p>
    {{ $t('card') }}:  <strong> {{ ad.paymentInfo.card.bin}}*****{{ ad.paymentInfo.card.last4Digits }}</strong>
</p>
<p>
    {{ $t('card_holder') }}:  <strong> {{ ad.paymentInfo.card.holder}}</strong>
</p>
<p>
    {{ $t('Payment Status')}}:  <strong> {{ ad.paymentInfo.resultDetails['response.acquirerMessage']}}</strong>
</p>

</div>

<div v-else>
    
    <div v-if="admpaymentId!== ''">
Payment Not Completed
    </div>

    <div v-else>
        No payment Transaction.
    </div>
    
</div>
<span style="display: block;margin-top:2em;"></span> 

<div  v-if="(ad.media && ad.media_type == 'image' || ad.media && ad.media_type == 'slider')">


<div
      v-for="media in ad.media"
      :key="media.id"
      class="col-xs-12 col-md-12 img-box"
    >
      <img :src="media" class="thumbnail" />
    </div>
</div>
    <!-- if media type is video -->
    <template v-if="ad.media_type == 'video'">
      <template v-if="!ad.media[0].includes('mp4')">
        <img :src="ad.media[0]" />
      </template>
      <video :src="ad.media[0]" controls v-else v-for="media in ad.media" :key="media"></video>
    </template>
     
     
 	<div class="row mobile-preview">
		<div class="col-sm-12 mb-10">
			<h2 style="margin-top:2em;">Advertisement Media</h2>
		</div>
        <!-- desktop -->
        <div class="col-sm-12">
			<h4>Desktop Preview</h4>
			<div class="desktop-frame1">
				<div class="desktop-frame2">
					<img :src="ad.media[0]" alt v-if="ad.media_type =='image'" />
                                <!-- <video autoplay controls >
                      <source :src="ad.media[0]" type="video/mp4">
                    </video> -->

                    <video :src="ad.media[0]" type="video/mp4" frameborder="0" allowfullscreen autoplay loop muted controls v-else></video>
				</div>
			</div>
		</div>
		<!-- mobile -->
		<div class="col-sm-4">
			<h4>Mobile Preview</h4>
			<div class="mobile-frame1">
				<div class="mobile-frame2">
					<img :src="ad.media[0]" alt v-if="ad.media_type =='image'" />
					<!-- <video :src="ad.media[0]" autoplay="autoplay"></video> -->
                    <video :src="ad.media[0]" type="video/mp4" frameborder="0" allowfullscreen autoplay loop muted controls v-else></video>
				</div>
				<div class="dot"></div>
			</div>
		</div>
		
		
	</div>
</div>

</div>

</template>

<script>
import AdId from "@/components/dashboard/ads/id";

export default {
  data() {
    return {
      ad: ""
    };
  },
  components: {
    AdId
  },
  layout: "dashboard",
  async asyncData({ app, params, error }) {
    try {
      let response = await app.$axios.$get(`ads/${params.title}`);
      return {
        ad: response.data
      };
    } catch (e) {
      error({ statusCode: e.status, message: e.message });
    }
  }
};

</script>
<style>
.mobile-preview .desktop-frame1, .mobile-preview .mobile-frame1{
    max-width: 190px;
}
.mobile-preview .desktop-frame1 {
    max-width: 350px;
}
</style>
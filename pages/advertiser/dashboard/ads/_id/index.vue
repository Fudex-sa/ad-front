

<template>

<!-- <template>
    <ad-id :ad="ad"/>
</template> -->
<div>
    <div class="col-md-12" v-if="ad.status == 'unpaid'">
        <a class="btn btn-info text-right mb-4" @click="paymentData()">
        {{$t('pay now')}}
      </a>
    </div>

  <div class="col-md-6">
      <h1>Advertisement Details</h1>
    <p>
      <strong>Ad Title</strong>
      : {{ ad.title }}
    </p>

    <p>
      <strong>Ad Content</strong>
      : {{ ad.content }}
    </p>
    <p>
      <strong>Ad Created At</strong>
      : {{ ad.created_at }} 
    </p>
    <p>
      <strong>Start Date</strong>
      : {{ ad.start_date }}
    </p>
    <p>
      <strong>End Date</strong>
      : {{ ad.end_date }}
    </p>
    <p>
      <strong>Budget</strong>
      : {{ ad.budget }} SAR  &nbsp;

        &nbsp;	&nbsp;	&nbsp;	&nbsp;	  <strong>Remaining Budget</strong> : {{ ad.remaining_budget }} SAR
    </p>
    
    <p>
      <strong>Gender</strong>
      : {{ ad.gender }}
    </p>
    <p>
      <strong>Clicks</strong>
      : {{ ad.clicks }}
    </p>
    <p>
      <strong>Status</strong>
      : {{ ad.status }}
    </p>
    <p>
      <strong>campaign</strong>
      : {{ ad.campaign.title }}
    </p>
    <p>
      <strong>Call Of Action Text</strong>
      : {{ ad.call_of_action_txt !== "" ? ad.call_of_action_txt :"--" }}
    </p>
    <p>
      <strong>Call Of Action Text</strong>
      : {{ ad.call_of_action_url!= "" ? ad.call_of_action_url :"--" }}
    </p>


    <p>
      <strong>Ages</strong>
      <ul>
          <li v-for="ag in ad.age" :key="ag">{{ ag }}</li>
      </ul>
    </p>

     <p>
      <strong>Targeted Audience</strong>
      <ul>
          <li v-for="targete_audience in ad.targeted_audience" :key="targete_audience">{{ targete_audience }}</li>
      </ul>
    </p>

     <p>
      <strong>Countries</strong>
      <ul>
          <li v-for="cnty in ad.country" :key="cnty">{{ cnty }}</li>
      </ul>
    </p>

     <p>
      <strong>Cities</strong>
      <ul>
          <li v-for="cty in ad.targeted_audience" :key="cty">{{ cty }}</li>
      </ul>
    </p>
     <p>
      <strong>Language</strong>
      <ul>
          <li v-for="lng in ad.targeted_audience" :key="lng">{{ lng }}</li>
      </ul>
    </p>

    <p>
        <strong>Media Type</strong>: {{ ad.media_type}}
    </p>








    <!-- <ad-id :ad="ad" /> -->
  </div>

  <div class="col-md-6">
      <h1>Advertisement Payment Info</h1>

      <!-- {{ ad.paymentInfo}} -->
<div v-if="ad.paymentInfo !== null">


<p>
    Payment ID:  <strong> {{ ad.paymentInfo.id}}</strong>
</p>
<p>
    Payment Method:  <strong> {{ ad.paymentInfo.paymentBrand}}</strong>
</p>

<p>
    Amount Paid:  <strong> {{ ad.paymentInfo.amount}} {{ ad.paymentInfo.currency }}</strong>
</p>
<p>
    Payment Date:  <strong> {{ ad.paymentInfo.timestamp}} </strong>
</p>
<p>
    Card:  <strong> {{ ad.paymentInfo.card.bin}}*****{{ ad.paymentInfo.card.last4Digits }}</strong>
</p>
<p>
    Card Holder:  <strong> {{ ad.paymentInfo.card.holder}}</strong>
</p>
<p>
    Payment Status:  <strong> {{ ad.paymentInfo.resultDetails['response.acquirerMessage']}}</strong>
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


<!-- <h2 style="margin-top:2em;">Advertisement Media</h2>

<div  v-if="(ad.media && ad.media_type == 'image' || ad.media && ad.media_type == 'slider')">


<div
      v-for="media in ad.media"
      :key="media.id"
      class="col-xs-12 col-md-12 img-box"
    >
      <img :src="media" class="thumbnail" />
    </div>
</div>
 
    <template v-if="ad.media_type == 'video'">
      <template v-if="!ad.media[0].includes('mp4')">
        <img :src="ad.media[0]" />
      </template>
      <video :src="ad.media[0]" controls v-else v-for="media in ad.media" :key="media"></video>
    </template>
     
</div> -->

		<!-- preview  -->
		<div class="row mobile-preview">
			<div class="col-sm-12 mb-10">
				<h2 style="margin-top:2em;">Advertisement Media</h2>
			</div>
<!-- desktop -->
      <div class="col-sm-12">
				<h4>Desktop Preview</h4>
				<div class="desktop-frame1 col-sm-6">
					<div class="desktop-frame2">
						<img :src="media_preview" @click="changeMediaCounter" alt v-if="ad.media_type !='video'" />
            <video :src="ad.media[0]" type="video/mp4" frameborder="0" allowfullscreen autoplay loop  controls v-else></video>
					</div>
				</div>
			</div>
			<!-- mobile -->
			<div class="col-sm-4">
				<h4>Mobile Preview</h4>
				<div class="mobile-frame1 col-sm-6">
					<div class="mobile-frame2">
						<img :src="media_preview" @click="changeMediaCounter" alt v-if="ad.media_type !='video'" />
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
    import AdId from '@/components/dashboard/ads/id'

    export default{
        data() {
            return {
                ad: '',
                media_counter:0,
                media_preview:''
            }
        },
        components:{
            AdId
        },
        layout: 'dashboard',
        middleware: 'auth',
        async asyncData({app, params, error}) {
            try {
                let response = await app.$axios.$get(`ads/${params.id}`);
                return {
                    ad: response.data
                }
             } catch(e) {
                 error({statusCode:e.status, message:e.message})
             }
        },
        beforeRouteLeave(to, from, next) {
          debugger
          // check back button 
          this.$store.commit(
            "localStorage/SET_BACK_BUTTON",
            true
          );
          return next();
        },
        mounted(){
          this.changeMediaCounter();          
        },
        methods: {
          changeMediaCounter(){            
            this.media_counter  = (this.ad.media != null)? this.media_counter%this.ad.media.length : 0;
            this.media_preview = this.ad.media[this.media_counter];
            this.media_counter ++ ;
          },
          paymentData () {
            this.$axios
              .$get(`ads/paymentInfo/${this.ad.id}`)
              .then((res) => {
                setTimeout(() => {
                  this.$store.commit(
                    "localStorage/SET_PAYMENT_AMOUNT",
                      this.ad.budget 
                  );
                  this.$store.commit(
                    "localStorage/SET_PAYMENT_ORDER_NUMBER",
                    this.ad.id 
                  );

                  this.$store.commit(
                    "localStorage/SET_PAYMENT_CHECKOUT_ID",
                    res.checkout
                  );
                  this.$router.push({
                    path: `/${this.$i18n.locale}/advertiser/dashboard/payment`,
                    query: { advertisementId: this.ad.id },
                  });
                }, 1000);
              });
    
          }
        }
    }
</script>
<style scoped>
.mobile-preview .desktop-frame1, .mobile-preview .mobile-frame1{
    max-width: 190px;
}
.mobile-preview .desktop-frame1 {
    max-width: 350px;
}
.mobile-preview .desktop-frame1 .dot, .mobile-preview .mobile-frame1 .dot {
  right: calc(50% - 15px);
	}

	.mobile-preview .mobile-frame1 {
    position: relative;
	}

	button.btn-frame-red {
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translateX(-50%);
    background: #e50216;
    color: #fff;
    border: 0;
    padding: 5px 14px;
    border-radius: 4px;
}
</style>
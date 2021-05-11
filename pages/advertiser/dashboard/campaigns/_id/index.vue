<template>
 <div>
  <campaign-title :campaign="campaign" />
  <ads-index :initialAds="ads" v-if="ads"/>
 </div>
</template>

<script>
import CampaignTitle from "@/components/dashboard/campaigns/title";
import AdsIndex from '@/components/dashboard/ads/index';

export default {
  data() {
    return {
      campaign: "",
  	  ads: null

    };
  },
  components: {
    CampaignTitle,
	AdsIndex

  },
  layout: "dashboard",
  middleware: "auth",
  async asyncData({ app, params, error }) {
    try {
      let response = await app.$axios.$get(`campaigns/${params.id}`);
      let  ads_response =	await	app.$axios.$get(`/ads/campaign/${params.id}`)

      return {
        campaign: response.data,
        ads: ads_response.data

      };
    } catch (e) {
      error({ statusCode: e.status, message: e.message });
    }
  }
};
</script>
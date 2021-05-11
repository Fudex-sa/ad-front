<template>
  <div class="row">
    <h1>Review Ads</h1>
    <ads-index :initialAds="ads"  :review="review"/>
  </div>
</template>


<script>
import AdsIndex from "@/components/dashboard/ads/index";

export default {
  data() {
    return {
      ads: [],
      review : true,
    };
  },
  components: {
    AdsIndex
  },
  layout: "dashboard",
  middleware: ["auth", "admin"],
  async asyncData({ app }) {
	let response = await app.$axios.$get('ads/status/reviewing')
    return {
      ads: response.data
    };
  },
 methods: {
      refresh() {
        this.$nuxt.refresh()
      }
    },
    mounted(){
        this.refresh();
    }
};
</script>

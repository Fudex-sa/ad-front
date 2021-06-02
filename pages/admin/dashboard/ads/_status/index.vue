<template>
  <div class="row">
    <ads-index :initialAds="ads" />
  </div>
</template>

<script>
import AdsIndex from "@/components/dashboard/ads/index";

export default {
  data() {
    return {
      ads: []
    };
  },
  components: {
    AdsIndex
  },
  layout: "dashboard",
  middleware: "auth",
    async asyncData({app, params, error, store}) {
        try {
            let current_page = store.getters["localStorage/currentPagePagination"]
            if (!store.getters["localStorage/backButton"]) {
              current_page = 1
            } 
            let response = await app.$axios.$get(`ads/status/${params.status}?page=${current_page}`);
            return {
                ads: response.data
            }
            } catch(e) {
                error({statusCode:e.status, message:e.message})
            }
    },
    created() {
      console.log('single status');
      // reset back button 
        this.$store.commit(
          "localStorage/SET_BACK_BUTTON",
          false
        );
    }
};
</script>

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
  async asyncData({ app, store }) {
    let current_page = store.getters["localStorage/currentPagePagination"]
    if (!store.getters["localStorage/backButton"]) {
      current_page = 1
    } 
    let ads = await app.$axios.$get(`ads?page=${current_page}`);
    return {
      ads: ads.data
    };
  },
  created() {
    // reset back button 
        this.$store.commit(
          "localStorage/SET_BACK_BUTTON",
          false
        );
  }
};
</script>

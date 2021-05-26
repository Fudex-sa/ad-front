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
    async asyncData({app, params, error}) {
        try {
            let response = await app.$axios.$get(`ads/status/${params.status}`);
            return {
                ads: response.data
            }
            } catch(e) {
                error({statusCode:e.status, message:e.message})
            }
    }
};
</script>

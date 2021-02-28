<template>
  <div>
    <!-- start About page -->
    <div class="internal-page about">
      <div class="container">
        <div class="row">
          <div class="col-md-12 col-sm-12">
            <div class="title title2">
              <h2>{{ $t("about") }}</h2>
              <p>{{ $t('about_description') }}</p>
            </div>
          </div>
          <div class="col-md-6 col-sm-12">
            <h4 class="text3 color1 mb-20">{{ $t('overview_about_us') }}</h4>
            <p class="text2 mb-20">
            {{ this.$i18n.locale == "en" ? about.about_us: about.about_us_ar }}
            </p>
            <h4 class="text1 text3">
              <img src="@/assets/img/vision.png" />{{ $t('vision') }}
            </h4>
            <p class="text2 mb-20">
             {{ this.$i18n.locale == "en" ? about.vision: about.vision_ar }}
            </p>
            <h4 class="text1 text3">
              <img src="@/assets/img/mission.png" />{{ $t('mission') }}
            </h4>
            <p class="text2 mb-20">
             {{ this.$i18n.locale == "en" ? about.mission: about.mission_ar }}
        
            </p>
          </div>
          <div class="col-md-6 col-sm-12 p-0">
            <div class="col-sm-12">
              <div class="about-img">
                <img :src="about.about_us_image" alt="about_us_image" />
              </div>
            </div>
            <div class="col-sm-6">
              <div class="about-img">
                <img :src="about.vision_image" alt="vision_image" />
              </div>
            </div>
            <div class="col-sm-6">
              <div class="about-img">
                <img :src="about.mission_image" alt="mission_image" />
              </div>
            </div>
          </div>
          <!-- start video -->
          <div class="">
            <div class="container">
              <div class="row">
                <div class="col-sm-12">
                  <video-card
                  :thumbnail="require(`~/assets/img/video3.png`)"
                
                    :videoUrl="'https://www.youtube.com/embed/yRAzlw4JM8o'"
                  ></video-card>
                </div>
              </div>
            </div>
          </div>
          <!-- end video -->
        </div>
      </div>
    </div>
    <!-- end About page -->

    <!-- Start Clients -->
    <clients></clients>
    <!-- End Clients -->
  </div>
</template>

<style>
.about .video-img .shadow img {
  margin-top: 10%;
}
</style>

<script>
// Import video card and clients from home components
import Clients from "@/components/front/home/Clients";
import VideoCard from "@/components/front/home/VideoCard";

export default {
  data() {
    return {
      about: [],
    };
  },
  components: {
    Clients,
    VideoCard,
  },
  mounted() {
    // scroll to the top of the page
    window.scrollTo(0, 0);
  },
  async asyncData({ app, $axios }) {
    let response = await $axios.get("app/about/settings", {
      headers: {
        "Accept-Language": app.i18n.locale
      },
    });
    return {
      about: response.data.data,
    };
  },
};
</script>

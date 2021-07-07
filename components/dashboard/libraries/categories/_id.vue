<template>
  <div>
    <!-- the gallery -->
    <div      
      class="row"
      v-if="library.media_type !='video'" 
    >
      <div
        
        v-for="(image, thumbIndex) in library.media"
        :key="thumbIndex"
        @click="index=thumbIndex"
        class="col-xs-6 col-md-4 img-box">
        <img :src="image" class="thumbnail">
      </div>
    </div>


    <div      
      class="row"
      v-if="library.media_type =='video'" 
    >
      <div class="col-xs-6 col-md-4 img-box">
        <video :src="library.media[0]" autoplay="autoplay" controls  muted></video>
      </div>
    </div>


    <!-- description -->
    <p class="lead mt-30 white-box">{{library.description}}</p>
    <!-- utm button -->
    <button class="the-btn hvr-radial-out mb-20" @click.prevent="showUTM = !showUTM">Get The Referral Link</button>
    <!-- What's app button -->
    <a :href="'https://api.whatsapp.com/send?text=' + referral_link" class="the-btn hvr-radial-out mb-20" target="_blank">Share on WhatsApp</a>
    <!-- utm Token-->
    <div class="row">
        <div class="col-sm-11">
            <p v-if="showUTM" class="white-box h4">{{ referral_link }}</p>
        </div>
    </div>
    <!-- pop up window -->
    <LightGallery
      :images="getMedia"
      :index="index"
      :disable-scroll="true"
      @close="index = null"
      v-if="library.media_type != 'video'"
    />
  </div>
</template>

<script>
    import SingleLibrary from '@/components/dashboard/libraries/_title'

    export default{
        data() {
            return {
              index: null,
              showUTM: false,
                referral_link: ""
            }
        },
        props:[
            'library'
        ],
        components:{
            SingleLibrary
        },
        mounted() {
    this.generateShorterLink();
    console.log('dddddddddddddddddddddd');
    console.log(this.library);
    console.log('dddddddddddddddddddddd');
  },
        computed:{
          getMedia() {
            if ( this.library.media_type == 'image' ){
              return this.library.media.map( (media) => media)
            }
            return this.library.media.map( (media) => media)
          },


          
          referralLink() {
            return   'http://www.vi.hit/tasks'
                   + this.$route.path.substring(this.$route.path.lastIndexOf('/'))
                   + '/' + this.user.utm 
          }
        },
        
      methods: {
    generateShorterLink() {
      this.$axios
        .$post(
          "ads/short/urls",
          {
            utm: this.user.utm,
            ad_id: this.library.id,
            short_url_type: "library"
          },
          {}
        )
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            this.referral_link = res.data.shortUrl;
          }
        });
    }
  }
    }
</script>

<style scooped>
  img{
    cursor:pointer;
  }
</style>
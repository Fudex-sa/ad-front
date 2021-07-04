<template>
  <div>
    <!-- Image slider -->

    <div
      id="myCarousel"
      class="carousel slide"
      data-ride="carousel"
      v-if="gallery.media_type != 'image' "
    >
      <!-- Indicators -->
      <!--            <ol class="carousel-indicators">
                <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                <li data-target="#myCarousel" data-slide-to="1"></li>
                <li data-target="#myCarousel" data-slide-to="2"></li>
            </ol>
      -->
      <!-- Wrapper for slides -->
      <div class="carousel-inner">
        <div
          class="item"
          v-for="(media, index) in gallery.media"
          :key="index"
          :class="{ active: (index == 0)}"
        >
          <div class="row">
            <div class="col-sm-12">
              <!-- image -->
              <img :src="media" alt />
            </div>
          </div>
        </div>
      </div>
    </div>




     <div
      id="myCarousel-slider"
      class="carousel slide"
      data-ride="carousel"
      v-if="gallery.media_type == 'slider' "
    >
      <!-- Indicators -->
            <ol class="carousel-indicators">                
                <li data-target="#myCarousel-slider" :class="{ active: (index == 0)}" v-for="(media,index) in gallery.media" :key="index" :data-slide-to="index"></li>
            </ol>
     
      <!-- Wrapper for slides -->
      <div class="carousel-inner">
        <div
          class="item"
          v-for="(media, index) in gallery.media"
          :key="index"
          :class="{ active: (index == 0)}"
        >
          <div class="row">
            <div class="col-sm-12">
              <!-- image -->
              <img :src="media" alt />
            </div>
          </div>
        </div>
      </div>
    </div>






    <!-- video -->
    <template v-if=" gallery.media_type == 'video' ">
      <!-- <video :src="gallery.media[0]" autoplay></video> -->

      <div style="width: 100%;">
        <video controls autoplay id="video-background" style="width: 100%; height: 99.5vh;">
          <source :src="gallery.media[0]" type="video/mp4" />
          <source :src="gallery.media[0]" type="video/webm" />
        </video>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: ["gallery", "type"],
  mounted() {
    this.storeAnalytics();    
  },
  methods: {
    storeAnalytics() {
        
      if(this.type =="ad"){

      
      this.$axios
        .$get("analytics", {
          user_utm: `${this.$route.params.utm}`,
          ad_id: `${this.$route.params.id}`
        }).then(res => {
          // console.log(res);
        })
        .catch(err => {
          console.log(err.response);
        });

        this.$axios
        .$post("analytics/store", {
          user_utm: `${this.$route.params.utm}`,
          ad_id: `${this.$route.params.id}`
        }).then( res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err.response);
        });

      }

       this.$axios
        .$post(
          "share/item/history",
          {
            itemId: `${this.$route.params.id}`,
            user_utm: `${this.$route.params.utm}`,
            type:`${this.type}`,
          },
          {
            header: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          console.log(res);
          // this.successMessage = res.data.message
          // setTimeout(() => {this.$router.back()}, 1500)
        })
        .catch((err) => {
          console.log(err);
        });
    
    }
  }
};
</script>

<style scoped>
.task-frame {
  background: #000 !important;
}
img {
  min-height: 100vh;
}
</style>
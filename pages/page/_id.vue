<template>
    <div>       


       <!-- start About page -->
    <div class="internal-page about">
      <div class="container">
        <div class="row">
          <div class="col-md-12 col-sm-12">
            <div class="title title2">
              <h2>{{$i18n.locale == "ar" ? service.title_ar : service.title_en}}</h2>
              <p>{{$i18n.locale == "ar" ? service.desc_ar : service.desc_en}}</p>
            </div>
          </div>

          <div class="col-md-6 col-sm-12">
            
            <p class="text2 mb-20">
            {{ this.$i18n.locale == "ar" ? service.content_ar: service.content_en }}
            </p>
            
          </div>

          <div class="col-md-6 col-sm-12 p-0">
            <div class="col-sm-12">
              <div class="about-img">
                <img :src="service.picture"/>
              </div>
            </div>
          </div>
   
        </div>
      </div>
    </div>
    <!-- end About page -->
    



    </div>
</template>

<script>
    export default {
        data () {
            return {
                service:{}
            }
        },
        mounted() {
            // scroll to the top of the page
            window.scrollTo(0, 0)           
        },
        async asyncData({params,$axios}) {
            let response = await $axios.$get('app/services/'+params.id)
            console.log(response.data);
            return {
                service: response
            }
        }
    }
</script>
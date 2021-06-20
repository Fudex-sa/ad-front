<template>
    <div>
        <!-- start Privacy Policy page -->
        <div class="internal-page">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="title title2" v-if="service.title_ar !=null ">
                            <h2>{{$i18n.locale == "ar" ? service.title_ar : service.title_en}}</h2>
                            <p class="text2 mb-20">
                             {{$i18n.locale == "ar" ? service.content_ar : service.content_en}}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- end Privacy Policy page -->
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
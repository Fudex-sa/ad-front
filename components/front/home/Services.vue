<template>
    <div>
        <div class="services">
            <div class="services-bg">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="title">
                                <h2>{{$i18n.locale == "ar" ? 'خدماتنـا' : 'OUR SERVICES'}}</h2>
                                <p>{{$i18n.locale == "ar" ? 'نقدم أعلى جودة لخدماتنا' : 'We Provide Best Quality Service'}} </p>
                            </div>
                        </div>
                        <div v-for='service in services' :key="service.id" class="col-md-4 col-sm-6">
                            <div class="service">
                                <div class="service-img">
                                    <img src="@/assets/img/icon1-a.png" class="img-a">
                                    <img src="@/assets/img/icon1-b.png" class="img-b">
                                </div>
                                <div class="service-details">
                                    <h4>{{$i18n.locale == "ar" ? service.title_ar : service.title_en}}</h4>
                                    <p>{{$i18n.locale == "ar" ? service.desc_ar : service.desc_en}}</p>                                    
                                    <nuxt-link class='the-btn' :to="`/`+$i18n.locale+`/page/${service.id}`">
                                     {{$i18n.locale == "ar" ? 'قراءة المزيد' : 'Read More'}}
                                    </nuxt-link>

                                </div>                               
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
      props:['services']      
    }
</script>
<template>
    <div>
        <div class="slider">
            <div class="container">
                <div id="myCarousel" class="carousel slide" data-ride="carousel">
                    <!-- Indicators -->
                    <ol class="carousel-indicators">
                        <li v-for="(slide,index) in slides" :key="slide.id" data-target="#myCarousel" :data-slide-to="index" :class="index===0 ? 'active' : ''"></li>                        
                    </ol>

                    <!-- Wrapper for slides -->
                    <div class="carousel-inner">
                        <div :class="index===0 ? 'item active' : 'item'" v-for="(slide,index) in slides" :key="slide.id">
                            <div class="row">
                                <div class="col-sm-6">                                    
                                    <h2>{{$i18n.locale == "ar" ? slide.line1_ar : slide.line1_en}}</h2>
                                    <p class="text1 bold">{{$i18n.locale == "ar" ? slide.line2_ar : slide.line2_en}}</p>
                                    <p class="text2">{{$i18n.locale == "ar" ? slide.line3_ar : slide.line3_en}}</p>
                                    <a href="#" class="the-btn hvr-radial-out">{{$i18n.locale == "ar" ? slide.button_text_ar : slide.button_text_en}}</a>
                                </div>
                                <div class="col-sm-6 text-right">
                                    <img :src="slide.picture">
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
        props:['slides'],
        mounted:function(){
            console.log(this.slides);
        }
    }
</script>
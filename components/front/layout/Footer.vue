<template>
    <div class="footer">
            <div class="container">
                <div class="row">
                    <div class="col-md-3 col-sm-4">
                        <img src="@/assets/img/logo.png" class="logo2">
                        <p>{{ $t('call_us_now')}}: {{contacts.mobile}}</p>
                        <p>{{ $t('email') }}: {{contacts.email}}</p>
                        <ul class="social">
                            <li><a :href="contacts.facebook" title="facebook"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
                            <li><a :href="contacts.twitter"  title="twitter"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
                            <li><a :href="contacts.instagram"  title="instagram"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
                        </ul>
                    </div>
                    <div class="col-md-2 col-sm-4">
                        <h4>{{ $t('service')}}</h4>
                        <ul class="links">                            
                            <li v-for="page in footer_pages.footer_col_1" :key="page.id">
                                <nuxt-link :to="`page/${page.id}`">{{ $i18n.locale=='ar'? page.title_ar : page.title_en }}</nuxt-link>
                            </li>
                        </ul>
                    </div>
                    <div class="col-md-2 col-sm-4">
                        <h4>{{ $t('extras') }}</h4>
                        <ul class="links">
                             <li v-for="page in footer_pages.footer_col_2" :key="page.id">
                                <nuxt-link :to="`page/${page.id}`">{{ $i18n.locale=='ar'? page.title_ar : page.title_en }}</nuxt-link>
                            </li>
                        </ul>
                    </div>
                    <div class="col-md-2 col-sm-6">
                        <h4>{{ $t('my_account') }}</h4>
                        <ul class="links">                            
                             <li v-for="page in footer_pages.footer_col_3" :key="page.id">
                                <nuxt-link :to="`page/${page.id}`">{{ $i18n.locale=='ar'? page.title_ar : page.title_en }}</nuxt-link>
                            </li>
                        </ul>
                    </div>
                    <div class="col-md-3 col-sm-6">
                        <h4>{{ $t('download_our_app') }}</h4>
                        <div class="apps">
                            <a :href="contacts.app_store" title="app-store"><img src="~/assets/img/app1.png" alt="app-store"></a>
                            <a :href="contacts.google_play" title="google-play"><img src="~/assets/img/app2.png" alt="google-play"></a>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
</template>


<script>
// import axios from '@nuxtjs/axios';
export default {
    data () {
        return {
            contacts : [],
            footer_pages:[]
        }
    },
    async asyncData({$axios}){
        let response = await $axios.$get('settings')
        return{
            contacts:response.data
        }
    },

    mounted () {
        this.fetchSettings();
        this.fetchFooterPages();
    },
    methods:{
        async fetchSettings() {
            const response = await this.$axios.$get('settings');
            this.contacts = response.data;
        },
        async fetchFooterPages() {
            const response = await this.$axios.$get('footer-pages');
            this.footer_pages = response.data;
        },
        
    }
}
</script>
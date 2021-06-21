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
                            <li><router-link :to="{name : 'about'}">{{ $t('about_us') }}</router-link></li>
                            <li><router-link :to="{name : 'privacy'}">{{ $t('privacy_policy') }}</router-link></li>                            
                            <li><router-link :to="{name : 'terms'}">{{ $t('terms_and_conditions') }}</router-link></li>
                            <li><nuxt-link to="/contact">{{ $t('contact_us') }}</nuxt-link></li>
                        </ul>
                    </div>
                    <div class="col-md-2 col-sm-4">
                        <h4>{{ $t('extras') }}</h4>
                        <ul class="links">
                            <li><router-link :to="{name : 'about'}">{{ $t('about_us') }}</router-link></li>
                            <li><router-link :to="{name : 'privacy'}">{{ $t('privacy_policy') }}</router-link></li>                            
                            <li><router-link :to="{name : 'terms'}">{{ $t('terms_and_conditions') }}</router-link></li>
                            <li><nuxt-link to="/contact">{{ $t('contact_us') }}</nuxt-link></li>
                        </ul>
                    </div>
                    <div class="col-md-2 col-sm-6">
                        <h4>{{ $t('my_account') }}</h4>
                        <ul class="links">                            
                            <li><router-link :to="{name : 'about'}">{{ $t('about_us') }}</router-link></li>
                            <li><router-link :to="{name : 'privacy'}">{{ $t('privacy_policy') }}</router-link></li>                            
                            <li><router-link :to="{name : 'terms'}">{{ $t('terms_and_conditions') }}</router-link></li>
                            <li><nuxt-link to="/contact">{{ $t('contact_us') }}</nuxt-link></li>
                        </ul>
                    </div>
                    <div class="col-md-3 col-sm-6">
                        <h4>{{ $t('download_our_app') }}</h4>
                        <div class="apps">
                            <a href="#" title="app-store"><img src="~/assets/img/app1.png" alt="app-store"></a>
                            <a href="#" title="google-play"><img src="~/assets/img/app2.png" alt="google-play"></a>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
</template>


<script>
export default {
    data () {
        return {
            contacts : []
        }
    },
    async asyncData({$axios}){
        let response = await $axios.$get('settings')
        return{
            contacts:response.data
        }
    },
}
</script>
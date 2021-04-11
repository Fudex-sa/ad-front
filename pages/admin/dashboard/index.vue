<template>
    <div>
        <h1>{{ $t('admin_dashboard') }}</h1>
        <div class="row">
            <div class="col-md-12">
                <div class="no-mar">
                    <div class="col-sm-6 col-md-3 no-padd ad-wrap">
                        <nuxt-link :to="localePath('admin-dashboard-ads-review')">
                            <h3>{{$t('pending_ads')}}</h3>
                            <h2>{{reviewing_ads_count}}</h2>
                        </nuxt-link>
                    </div>

                    <div class="col-sm-6 col-md-3 no-padd ad-wrap">
                        <nuxt-link :to="localePath('admin-dashboard-ads-review')">
                            <h3>{{$t('active_ads')}}</h3>
                            <h2>{{active_ads_count}}</h2>
                        </nuxt-link>
                    </div>

                    <div class="col-sm-6 col-md-3 no-padd ad-wrap">
                        <nuxt-link :to="localePath('admin-dashboard-ads-review')">
                            <h3>{{$t('unpaid_ads')}}</h3>
                            <h2>{{unpaid_ads_count}}</h2>
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        layout: 'dashboard',
        data (){
            return {
                active_ads_count: null,
                unpaid_ads_count: null,
                reviewing_ads_count: null
            }
        },
        mounted (){
            //statuses: active, unpaid, reviewing
            this.$axios.$get(`ads/status/reviewing/count`).then(res => {
                this.reviewing_ads_count = res.count;
            })

            this.$axios.$get(`ads/status/unpaid/count`).then(res => {
                this.unpaid_ads_count = res.count;
            })

            this.$axios.$get(`ads/status/active/count`).then(res => {
                this.active_ads_count = res.count;
            })
        }
    }
</script>
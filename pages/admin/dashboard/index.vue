<template>
    <div>
        <h1>{{ $t('admin_dashboard') }}</h1>
        <div class="row">
            <div class="col-md-12">
                <div class="no-mar">
                    <div class="col-sm-6 col-md-3 no-padd ad-wrap">
                        <nuxt-link :to="localePath('admin-dashboard-ads-review')">
                            <h3>{{$t('pending_ads')}}</h3>
                            <h2>{{pending_ads_count}}</h2>
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
                pending_ads_count: null
            }
        },
        mounted (){
            //statuses: active, unpaid, reviewing
            this.$axios.$get(`ads/status/reviewing/count`).then(res => {
                console.log('ress:', res.count)
                this.pending_ads_count = res.count;
            })
        }
    }
</script>
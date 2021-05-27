<template>
<div class="row">

    <div>
        <!-- <Dashboard :stats="stats" /> -->
        <div class="row">
			<div class="col-sm-12">
                <div class="col-sm-6 col-md-3">
					<div class="white-box com-box">
                        <nuxt-link :to="localePath('soldier-dashboard-wallet')">
                            <h3 class="box-title">{{ balance }}</h3>
                            <h5>Total Balance</h5>
                        </nuxt-link>
					</div>
				</div>
				<div class="col-sm-6 col-md-3">
					<div class="white-box com-box">
                        <nuxt-link :to="localePath('soldier-dashboard-wallet')">
                            <h3 class="box-title">{{ transactionsCount }}</h3>
                            <h5>Total Transactions</h5>
                        </nuxt-link>
					</div>
				</div>
                <div class="col-sm-6 col-md-3">
					<div class="white-box com-box">
                        <nuxt-link :to="localePath('soldier-dashboard-ads')">
                            <h3 class="box-title">{{ adsCount }}</h3>
                            <h5>Total Ads</h5>
                        </nuxt-link>
					</div>
				</div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Dashboard from "@/components/statistics";

export default {
    components: {
        Dashboard
    },
    mounted() {},

    methods: {},

    async asyncData({
        app,
        store
    }) {
        // let response = await app.$axios.$get("/me/statistics");
        // return {
        //     stats: response.data,
        // };
        let requests = [
            app.$axios.$get('me/balance'),
            app.$axios.$get('ads-count'),
        ]
        let promises = await Promise.all(requests).then((res) => {
            return res
        })
        debugger
        return {
            balance: promises[0].data.balance,
            transactionsCount: promises[0].data.transactionsCount,
            adsCount: promises[1].adsCount
        }
    },
    layout: "dashboard",
    middleware: "auth"
};
</script>

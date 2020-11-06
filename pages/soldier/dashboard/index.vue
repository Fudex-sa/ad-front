<template>
<div class="row">

    <div>
        <Dashboard :stats="stats" />
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
        let response = await app.$axios.$get("/me/statistics");
        return {
            stats: response.data,
        };
    },
    layout: "dashboard",
    middleware: "auth"
};
</script>

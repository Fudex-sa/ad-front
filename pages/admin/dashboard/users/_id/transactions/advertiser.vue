<template>
  <div>
    <client-only placeholder="Loading...">
      <v-client-table :data="tableData" :columns="columns" :options="options">
      </v-client-table>
    </client-only>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns: ["amount", "status", "created_at"],
      tableData: [],
      options: {
        headings: {
          amount: this.$t('amount'),
          status: this.$t('status'),
          created_at: this.$t('created_at'),
        },
        sortable: ["amount", "status", "created_at"],
        filterable: ["amount", "status", "created_at"]
      }
    };
  },
  async asyncData({ app, params }) {
    //let response = await app.$axios.$get("users");
    let response = await app.$axios.$get(`advertiser/transactions/${params.id}`)
    return {
      tableData: response.data
    };
  },
  layout: "dashboard",
  middleware: ["auth", "admin"]
};
</script>

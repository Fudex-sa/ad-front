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
      columns: ["transNumber", "amount", "balance", "status", "created_at"],
      tableData: [],
      options: {
        headings: {
          transNumber: this.$t('transNumber'),
          amount: this.$t('amount'),
          balance: this.$t('balance'),
          status: this.$t('status'),
          created_at: this.$t('created_at'),
        },
        sortable: ["transNumber", "amount", "balance", "status", "created_at"],
        filterable: ["transNumber", "amount", "balance", "status", "created_at"]
      }
    };
  },
  async asyncData({ app, params }) {
    let response = await app.$axios.$get(`soldier/transactions/${params.id}`)
    return {
      tableData: response.data
    };
  },
  layout: "dashboard",
  middleware: ["auth", "admin"]
};
</script>

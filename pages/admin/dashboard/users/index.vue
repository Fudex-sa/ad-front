<template>
  <div>
    <div class="pull-right">
      <nuxt-link
        :to="{ name: 'admin-dashboard-users-create' }"
        class="the-btn hvr-radial-out"
      >{{ $t('Create User') }}</nuxt-link>
    </div>
    <client-only placeholder="Loading...">
      <v-client-table :data="tableData" :columns="columns" :options="options">
        <!-- <a v-slot:actions="props" class="fa fa-trash" :href="edit(props.row.id)"></a> -->
        <template span slot="actions" slot-scope="props">
          <span class="fa fa-trash-o fa-sm btn btn-danger action-btn" @click="deleteUser(props.row.id)"></span>
          <router-link v-show="props.row.role == 'advertiser' || props.row.role == 'soldier'" class="fa fa-sm btn btn-info action-btn" :to="{ path: `/${$i18n.locale}/admin/dashboard/users/${props.row.id}/transactions/${props.row.role}`}">{{$t('transactions')}}</router-link>
        </template>
      </v-client-table>
    </client-only>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: ["username", "email", "role", "actions"],
      tableData: [],
      options: {
        templates: {
          username: function(h, row, index) {
            return <a href={"users/" + row.id+ "/show"}>{row.username}</a>;
          },
        //   options: function(h, row, index) {
        //     return `<button @click="deleteUser">Delete</button>`;
        //   }
          
        },
        headings: {
          username: 'Username',
          email: 'Email',
          role: 'Role',
          actions: 'Actions'
        },
        sortable: ["username", "email", "role"],
        filterable: ["username", "email", "role"]
      }
    };
  },
  async asyncData({ app }) {
    let response = await app.$axios.$get("users");
    return {
      tableData: response.data
    };
  },
  methods:{
      // deleteUser(){
      //     console.log("Delete...");
      // },
      deleteUser(id) {
      this.$axios
        .$delete(`users/${id}`)
        .then(res => {
          // print success message
          this.successMessage = res.data.message;
          this.successMessage_bg = "alert-danger";
          this.tableData = this.tableData.filter((obj) => {
            return obj.id !== id
          })
          // hide success message after timer
          setTimeout(() => {
            this.successMessage = "";
          }, 1200);
        })
        .catch(err => {
          console.log('err:', err);
          this.successMessage = err.message;
        });
    },
  },
  layout: "dashboard",
  middleware: ["auth", "admin"]
};
</script>
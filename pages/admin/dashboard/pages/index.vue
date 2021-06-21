<template>
  <div>
    <div class="pull-right">
      <nuxt-link
        :to="{path: `/${$i18n.locale}/admin/dashboard/pages/create`}"
        class="the-btn hvr-radial-out"
      >{{ $t('Create Page') }}</nuxt-link>
    </div>

    <div style='clear:both'></div>

    
    <client-only placeholder="Loading...">
      <v-client-table :data="tableData" :columns="columns" :options="options">
                
        <template span slot="picture" slot-scope="props">
          <img style="width:200px;" :src="props.row.picture">
          <!-- <span>{{props.row.fav_payment_method ? :src="imagePath(category.cover_img)"props.row.fav_payment_method : '--'}}</span> -->
        </template>       
        <template span slot="actions" slot-scope="props">
          <span class="fa fa-trash-o fa-sm btn btn-danger action-btn" @click="deleteRecord(props.row.id)"></span>
          <router-link class="fa fa-sm btn btn-info action-btn" :to="{ path: `/${$i18n.locale}/admin/dashboard/pages/${props.row.id}/edit`}">{{$t('edit')}}</router-link>
        </template>
      </v-client-table>
    </client-only>
  </div>
</template>

<script>
export default {
  
  data() {
    return {
      columns:[],
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
          paymentType: 'paymentType',
          paymentNumber: 'paymentNumber',
          actions: 'Actions'
        },
        sortable: [],
        filterable: []
      }
    };
  },
  async asyncData({ app }) {
    let response = await app.$axios.$get("pages");
    let cols = app.i18n.locale=='ar'?
          ['picture','title_ar','desc_ar','type','created_at','updated_at','actions'] :
          ['picture','title_en','desc_en','type','created_at','updated_at','actions'] ;
    return {
      tableData: response.data.data,
      columns:cols
    };
  },
  methods:{
      // deleteUser(){
      //     console.log("Delete...");
      // },
      deleteRecord(id) {
      this.$axios
        .$delete(`pages/${id}`)
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
  middleware: ["auth", "admin"],
 
  
};
</script>
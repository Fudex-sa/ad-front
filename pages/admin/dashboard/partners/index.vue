<template>
  <div>
    <div class="pull-right">
      <nuxt-link
        :to="{path: `/${$i18n.locale}/admin/dashboard/partners/create`}"
        class="the-btn hvr-radial-out"
      >{{ $t('Create Partner') }}</nuxt-link>
    </div>

    <div style='clear:both'></div>

    
    <client-only placeholder="Loading...">
      <v-client-table :data="tableData" :columns="columns" :options="options">
                
        <template span slot="picture" slot-scope="props">
          <img :src="props.row.picture" style='max-width:250px;'>
          <!-- <span>{{props.row.fav_payment_method ? :src="imagePath(category.cover_img)"props.row.fav_payment_method : '--'}}</span> -->
        </template>       
        <template span slot="actions" slot-scope="props">
          <span class="fa fa-trash-o fa-sm btn btn-danger action-btn" @click="deleteRecord(props.row.id)"></span>
          <router-link class="fa fa-sm btn btn-info action-btn" :to="{ path: `/${$i18n.locale}/admin/dashboard/partners/${props.row.id}/edit`}">{{$t('edit')}}</router-link>
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
        headings: {
         
          actions: 'Actions'
        },
        sortable: [],
        filterable: []
      }
    };
  },
  async asyncData({ app }) {
    let response = await app.$axios.$get("partners");
    let cols = ['picture','updated_at','actions'] ;
          
    return {
      tableData: response.data,
      columns:cols
    };
  },
  methods:{
      
      deleteRecord(id) {
      this.$axios
        .$delete(`partners/${id}`)
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
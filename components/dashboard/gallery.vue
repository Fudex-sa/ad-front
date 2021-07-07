<template>
<div>

 <div class="div-top">
      <!--<nuxt-link-->
      <!--  :to="{ name: 'admin-dashboard-categories-categoryId-libraries-new' }"-->
      <!--  :to="localePath({name:'admin-dashboard-ads-status',params:{'status':'reviewing'}})"-->
      <!--  class="the-btn hvr-radial-out"-->
      <!--  v-if="role == 'admin'"-->
      <!--  >Create New</nuxt-link-->
 <nuxt-link
        :to="localePath({name:'admin-dashboard-categories-categoryId-libraries-new',params:{'categoryId':this.$route.params.categoryId}})"
        class="the-btn hvr-radial-out"
        v-if="role == 'admin'"
        >Create New</nuxt-link
      >
 </div>

    <div class="row">

        
        <div class="col-xs-6 col-md-3 text-center" v-for="(gallery, index) in galleries" :key="gallery">
            <div class="controls-btns"  v-if="user.role == 'admin'">
                <button class="btn btn-xs btn-danger" @click.prevent="DeleteLibrary(gallery.id, index)">
                    <i class="fa fa-trash-o"></i>
                </button>

                <nuxt-link  class="btn btn-xs btn-default" :to="libraryLinkEdit(gallery.id)">   <i class="fa fa-edit"></i></nuxt-link>
            </div>
          <nuxt-link :to="libraryLink(gallery.id)" class="text-center">
               <!-- if media is images -->
         
               <img 
                :src="gallery.media[0]" 
                class="thumbnail m-auto" 
                v-if="gallery.media_type == 'image'">
                <!-- if media is video -->
                <video                
                :src="gallery.media[0]"
                 v-if="gallery.media_type == 'video'"
                 class="thumbnail m-auto"></video>
               <p class="lead bold link2">{{gallery.title}}</p>
          </nuxt-link>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        props: [
            'galleries'
        ],
        mounted() {
            this.libraryLink()
            console.log('dddddddddddddddddddddddddddddddddddddddd');
            console.log(this.galleries);
            console.log('dddddddddddddddddddddddddddddddddddddddd');
            console.log(this.$route.params.categoryId);
        },
         methods: {
            libraryLink(id) {
                return {
                    path: `libraries/${id}`, 
                    params: { 
                        id: id
                    } 
                };
                
            },

             libraryLinkEdit(id) {
                return {
                    path: `libraries/${id}/edit`, 
                    params: { 
                        id: id
                    } 
                };
                
            },
            libraryLinkNew(id) {
                return {
                    path: `libraries/${id}/new`, 
                    params: { 
                        id: id
                    } 
                };
                
            },


DeleteLibrary(id, index) {

   if(confirm("Do you really want to delete?")){

                this.$axios.delete('/libraries/'+id)
                .then(resp => {
                    this.galleries.splice(index, 1);
                })
                .catch(error => {
                    console.log(error);
                })
   }
},
        },
    }
</script>

<style scoped lang="scss">
    a{
        img, video{
            height: 200px;
            width: 100%;
        }
    }

.controls-btns{
    position: absolute;
    top: 10px;
    left: 25px;
}

</style>
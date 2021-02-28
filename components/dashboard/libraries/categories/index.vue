<template>
    <div>
        <div class="div-top">
      <nuxt-link
        :to="localePath('admin-dashboard-categories-new')"
        class="the-btn hvr-radial-out"
        v-if="role == 'admin'"
        >{{ $t('create_new') }}</nuxt-link
      >
      <!-- <div class="the-search">
        <form>
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Search" />
            <div class="input-group-btn">
              <button class="btn btn-default" type="submit">
                <img src="img/search.png" />
              </button>
            </div>
          </div>
        </form>
      </div> -->
    </div>
        <!-- Liberaries -->
        <div class="row">
            <div class="col-md-12">
                <div class="no-mar">

                    
                    <div 
                        class="col-sm-6 col-md-3 no-padd ad-wrap" 
                        v-for="(category, index) in librariesCategories"
                        :key="category.id"
                    >


                   <div class="controls-btns">
<button class="btn btn-xs btn-danger" @click.prevent="DeleteUser(category.id, index)">
    <i class="fa fa-trash-o"></i>
</button>

<nuxt-link class="btn btn-xs btn-default" :to="localePath({ name: 'admin-dashboard-categories-categoryId-edit', params: { categoryId: category.id }})">  <i class="fa fa-edit"></i></nuxt-link>
                 
                 
                   </div>
                        <nuxt-link :to="categoryLink(category.id)">

                            <img v-if="category.cover_img != null" :src="category.cover_img" >
                        
                     <img v-else :src="imagePath(category.cover_img)" >


                            <h3>{{category.title}}</h3>
                        </nuxt-link>
                    </div>
                    <div class="col-sm-6 col-md-3 no-padd">
                        <div class="ad-wrap">

             
                            <h3 class="soon">Soon</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            'librariesCategories'
        ],
        data() {
            return {
        
            }
        },
        methods: {
            categoryLink(id) {
                return {
                    path: `categories/${id}/libraries`,
                    params: {
                        categoryId: id
                    } 
                }
            },
        

DeleteUser(id, index) {

   if(confirm("Do you really want to delete?")){

                this.$axios.delete('/libraries/categories/'+id)
                .then(resp => {
                    this.librariesCategories.splice(index, 1);
                })
                .catch(error => {
                    console.log(error);
                })
   }
},
        }, 
    }
</script>

<style scoped>
.controls-btns{
    position: absolute;
    top: 5px;
    left: 5px;
}
</style>
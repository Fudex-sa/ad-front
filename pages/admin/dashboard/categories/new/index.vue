<template>
   
   

   <div>
    <div class="row">
      <div class="fixed alert alert-danger" v-if="successMessage">
        {{ successMessage }}
      </div>
   
      <div class="col-sm-6">
        <div class="form-group dash-group">
          <label>Title *</label>
          <input
            class="form-control dash-input"
            placeholder="Example Ad"
            type="text"
       v-model.trim="form.name"
            :class="{ 'is-invalid': errors.name }"
          />
          <p class="text-danger p-2" v-for="error in errors.name" :key="error">
            {{ error }}
          </p>
        </div>
      </div>


 <div class="col-sm-6">
        <div class="form-group dash-group">
          <label>Title En*</label>
          <input
            class="form-control dash-input"
            placeholder="Example Ad"
            type="text"
       v-model.trim="form.name_en"
            :class="{ 'is-invalid': errors.name_en }"
          />
          <p class="text-danger p-2" v-for="error in errors.name_en" :key="error">
            {{ error }}
          </p>
        </div>
      </div>



      <div class="col-sm-12">
        <div class="form-group dash-group">
          <label>Category Cover Image *</label>
          <input
            class="form-control dash-input"
            placeholder="Example Ad"
            type="file" required
       @change.prevent="selectProductImages"
            :class="{ 'is-invalid': errors.title }"
          />
          <p class="text-danger p-2" v-for="error in errors.title" :key="error">
            {{ error }}
          </p>
        </div>
      </div>
 
    </div>
  

  <div class="col-sm-12 text-right">
        <button class="the-btn2 hvr-radial-out" @click.prevent="$router.back()">{{ $t('cancel')}}</button>
        <button class="the-btn hvr-radial-out" @click.prevent="handleSubmition">{{  $t('create_category') }}</button>
    </div>

    
  </div>


</template>


<script>
export default {
     data() {
        return {
          defaultLanguage:"",
            form: {
                name: '',
                name_en: '',
            },
            successMessage: ''
        }
    },
      mounted() {
         this.defaultLanguage =this.$i18n.locale;
    
    this.formData = new FormData();
  },
    methods: {
    selectProductImages(event) {
      var files = event.target.files;
      this.formData.append('cover_img',files[0] );
    },
    
        handleSubmition() {

            this.formData.append('name', this.form.name);
            this.formData.append('name_en', this.form.name_en);

            this.$axios.$post('libraries/categories', this.formData)
                .then(res => {
                    this.successMessage = res.data.message;
                  
                    setTimeout( () =>  {
                       
                           this.$nuxt.$router.push({
                                path: `/${this.defaultLanguage}/admin/dashboard/categories`,
                                force: true
                              });
                    }, 1000);

                }).catch(err => {
                    console.log(err)
                });   
        },
    },
      middleware: ["admin", "auth"],
  layout: "dashboard",
}
</script>
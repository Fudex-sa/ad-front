<template>
    <div class="row-2">
      <div class="fixed alert alert-danger" v-if="successMessage">{{successMessage}}</div>
      <div class="col-sm-12">
        <div class="form-group dash-group">
          <label>Title *</label>
          <input class="form-control dash-input" placeholder="Please Insert Title" type="text" v-model="form.title" :class="{ 'is-invalid' : errors.title}">
             <p class="text-danger p-2" v-for="error in errors.title">{{error}}</p>
        </div>
      </div>
      <div class="col-sm-12">
        <div class="form-group dash-group">
          <label>Description *</label>
          <input class="form-control dash-input" placeholder="Please Insert Description" type="text" v-model="form.description" :class="{ 'is-invalid' : errors.description}">
             <p class="text-danger p-2" v-for="error in errors.description">{{error}}</p>
        </div>
      </div>
      <div class="col-sm-12 col-md-6">
        <div class="form-group dash-group">
          <label> Category * </label>
          <select class="form-control dash-input" v-model="form.category" :class="{ 'is-invalid' : errors.category}">
            <option :value="category.id" v-for="category in categories">{{category.title}}</option>
          </select>
          <p class="text-danger p-2" v-for="error in errors.category">{{error}}</p>
        </div>
      </div>
      <div class="col-sm-12">
        <div class="form-group dash-group">
          <label>Upload Photo or Video</label>
          <input type="file" @change.prevent="handleFileUpload" :class="{ 'is-invalid' : errors.cover_img}" multiple>
          <p class="text-danger p-2 mt-10" v-for="error in errors.cover_img">{{error}}</p>
        </div>
      </div>
      <div class="col-sm-12 text-right">
        <button class="the-btn2 hvr-radial-out" @click="$router.back()">Cancel</button>
        <button class="the-btn hvr-radial-out" @click="handleSubmition">Create Library</button>
      </div>
    </div>
</template>

<script>

    export default {


      data() {
          return {
            form:{
              title: '',
              description: '',
              category: '',
              media: [],
            },
            categories: [
            
            ],
            successMessage: ''
          }
        },
        layout: 'dashboard',
        watch: {
        },
        
      async asyncData({app}) {
            let response = await app.$axios.$get('libraries/categories');
            return {
                categories: response.data
            }
        },
        updated() {
          $('.media').on('change', (event) => {
           //this.previewMedia(event)            
            this.form.media = [...event.target.files];
          });

         },

        methods: {
          handleSubmition () {
              // Initialize the form data
              let formData = new FormData();
              formData.append('title', this.form.title)
              formData.append('description', this.form.description)
              formData.append('category', this.form.category)
              //formData.append('media[]', this.form.media)

              Object.keys(this.form.media).map((key) => {
               return formData.append("media[]", this.form.media[key]);
              });

              this.$axios.$post('libraries/create',
                                 formData, 
                                 {
                                      header: {
                                          'Content-Type': 'multipart/form-data'
                                      }
                                 }
                              )
                          .then( res => {

                            console.log(res);
                                  this.successMessage = res.data.message;
                                  setTimeout(() => {this.$router.back()}, 1500);
                          })
                          .catch(err => {
                              console.log(err)
                          })
          },
          handleFileUpload() {
            this.form.media = event.target.files;
          }
        },
        
          middleware: [
            'auth',
            'admin'
        ]
    }
</script>
<template>
  <div>
    <div class="row">
      <div class="fixed alert alert-danger" v-if="successMessage">{{ successMessage }}</div>

      <div class="col-sm-12">
        <div class="form-group dash-group">
          <label>Title *</label>
          <input
            class="form-control dash-input"
            placeholder="Example Ad"
            type="text"
            v-model.trim="form.name"
            :class="{ 'is-invalid': errors.title }"
          />
          <p class="text-danger p-2" v-for="error in errors.title" :key="error">{{ error }}</p>
        </div>
      </div>

      <div class="col-sm-12">
        <div class="form-group dash-group">
          <label>Category Cover Image *</label>
          <input
            class="form-control dash-input"
            placeholder="Example Ad"
            type="file"
            required
            @change.prevent="selectProductImages"
            :class="{ 'is-invalid': errors.title }"
          />
          <p class="text-danger p-2" v-for="error in errors.title" :key="error">{{ error }}</p>
        </div>
      </div>
    </div>

    <div class="col-sm-12 text-right">
      <button class="the-btn2 hvr-radial-out" @click.prevent="$router.back()">Cancel</button>
      <button class="the-btn hvr-radial-out" @click.prevent="handleSubmition">Save Data</button>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      form: {
        name: ""
      },
      category: null,
      successMessage: ""
    };
  },
  mounted() {
    this.formData = new FormData();
  },
  methods: {
    selectProductImages(event) {
      var files = event.target.files;
      this.formData.append("cover_img", files[0]);
    },

    handleSubmition() {
      this.formData.append("name", this.form.name);

      if (this.$route.params.categoryId != "") {
        this.$axios
          .$post("libraries/categories/"+this.$route.params.categoryId, this.formData)
          .then(res => {
            this.successMessage = res.data.message;
            setTimeout(function() {
              this.$nuxt.$router.push({
                path: "/admin/dashboard/categories",
                force: true
              });
            }, 1000);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
   async asyncData({app, route}) {
        const { categoryId } = route.params
            let response = await app.$axios.$get('/libraries/categories/'+categoryId);
            console.log(response);
            return {
                form: {
                    name: response.data.title
                },
                category: response.data
            }
        },
  middleware: ["admin", "auth"],
  layout: "dashboard"
};
</script>
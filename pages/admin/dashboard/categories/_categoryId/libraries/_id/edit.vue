<template>
  <div class="row-2">
    <div class="fixed alert alert-danger" v-if="successMessage">{{successMessage}}</div>
    <div class="col-sm-12">
      <div class="form-group dash-group">
        <label>Title *</label>
        <input
          class="form-control dash-input"
          placeholder="Please Insert Title"
          type="text"
          v-model="form.title"
          :class="{ 'is-invalid' : errors.title}"
        />
        <p class="text-danger p-2" v-for="error in errors.title">{{error}}</p>
      </div>
    </div>
    <div class="col-sm-12">
      <div class="form-group dash-group">
        <label>Description *</label>
        <input
          class="form-control dash-input"
          placeholder="Please Insert Description"
          type="text"
          v-model="form.description"
          :class="{ 'is-invalid' : errors.description}"
        />
        <p class="text-danger p-2" v-for="error in errors.description">{{error}}</p>
      </div>
    </div>
    <div class="col-sm-12 col-md-6">
      <div class="form-group dash-group">
        <label>Category *</label>
        <select
          class="form-control dash-input"
          v-model="form.category"
          :class="{ 'is-invalid' : errors.category}"
        >
          <option :value="category.id" v-for="category in categories">{{category.title}}</option>
        </select>
        <p class="text-danger p-2" v-for="error in errors.category">{{error}}</p>
      </div>
    </div>
    <div class="col-sm-12">
      <div class="form-group dash-group">
        <label>Upload Photo or Video</label>
        <input
          type="file"
          @change.prevent="handleFileUpload"
          :class="{ 'is-invalid' : errors.cover_img}"
          multiple
        />
        <p class="text-danger p-2 mt-10" v-for="error in errors.cover_img">{{error}}</p>
      </div>
    </div>
    <div class="col-sm-12 text-right">
      <button class="the-btn2 hvr-radial-out" @click="$router.back()">Cancel</button>
      <button class="the-btn hvr-radial-out" @click="handleSubmition">Save Data</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: "",
        description: "",
        category: "",
        media: []
      },
      categories: [
        // 'Entertainment',
        // 'Sport',
        // 'Beauty & Body Care',
        // 'Business & Management',
        // 'News',
        // 'Food & Drinks',
        // 'Kids',
        // 'Cars & Vehicles',
        // 'Technology',
        // 'Games',
        // 'Home & Garden',
        // 'Travelling',
        // 'Health'
      ],
      successMessage: ""
    };
  },
  layout: "dashboard",
  watch: {},

  async asyncData({ app, params }) {
    const response = await app.$axios.$get("libraries/categories");
    const library = await app.$axios.$get("libraries/" + params.id);

    return {
      categories: response.data,
      form: {
        title: library.data.title,
        description: library.data.description,
        id: library.data.id,
        category: library.data.category,
        media: []
      }
    };
  },

  methods: {
    handleSubmition() {
      // Initialize the form data
      let formData = new FormData();
      formData.append("title", this.form.title);
      formData.append("description", this.form.description);
      formData.append("category", this.form.category);

      if(this.form.media!= "" || this.form.media =="undefined"){
        formData.append("media[]", this.form.media);
      }
      

      this.$axios
        .$post("libraries/" + this.$route.params.id, formData, {
          header: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
      

          this.successMessage = res.data.message;
          setTimeout(() => {
            this.$router.back();
          }, 1500);
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleFileUpload() {
      this.form.media = event.target.files[0];
    }
  },

  middleware: ["auth", "admin"]
};
</script>
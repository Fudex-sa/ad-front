<template>
  <div class="row-2">
    <div class="fixed alert alert-danger" v-if="successMessage">{{successMessage}}</div>
    <!-- form -->
    <div class="col-sm-6 col-sm-offset-3 create-campaign">

     <button
        class="btn btn-warning "
        style="position: relative; margin: 0 2px;"
        @click.prevent="switchTranslationLanguage(lang.code)"
        :class="{ 'btn-active': defaultLanguage == lang.code }"
        type="button"
        v-for="lang in availableLocales"
      >
        {{ lang.name }}
      </button>


      <ValidationObserver v-slot="{ handleSubmit, errors }">
        <form @submit.prevent="handleSubmit(handleSubmition)">
          <TextInput
            v-if="defaultLanguage == 'ar'"
            
            :key="index"
            v-model="campaign.title"
            name="اسم الحملة"
            rules="required"
          />

           <TextInput
            v-if=" defaultLanguage == 'en'"
            :key="index"
            v-model="campaign.title_en"
            name="Campaign Title"
            
          />
          <div class="col-sm-12 text-right">
            <button class="the-btn">Save Changes</button>
          </div>
        </form>
      </ValidationObserver>

      <!-- type input -->
      <!-- <div class="form-group dash-group">
        <label>Title *</label>
        <input
          class="form-control dash-input"
          placeholder="Example Campaign"
          type="text"
          v-model="campaign.title"
          :class="{ 'is-invalid' : errors.title}"
        />

        <p class="text-danger p-2" v-for="error in errors.title">{{error}}</p>
      </div> -->
      <!-- create button -->
      <!-- <div class="col-sm-12 text-right">
        <button class="the-btn" @click.prevent="handleSubmition">Save Changes</button>
      </div> -->
    </div>
  </div>
</template>

<script>
import TextInput from "@/components/Forms/TextInput";
export default {
  components: {
    TextInput,
  },

  data() {
    return {
      campaign: "",
      successMessage: "",
      defaultLanguage: "",
      
    };
  },
    computed: {
    availableLocales() {
      return this.$i18n.locales;
      // return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    },
  },

    mounted() {
    this.defaultLanguage = this.$i18n.locale;
    this.formData = new FormData();
    // this.campaign = {
    //   ar: {
    //     title: this.campaign.ar.title
    //   }
    // }
  },
  methods: {

     switchTranslationLanguage(locale) {
      this.defaultLanguage = locale;
      
    },

    handleSubmition() {

console.log(this.campaign)
      this.$axios
        .$post(`campaigns/${this.$route.params.id}`, {
          title: this.campaign.title,
          title_en: this.campaign.title_en,
        })
        .then(res => {
          
          this.successMessage = res.data.message;
          this.popupForm = false;

          setTimeout(() => {
            this.$router.back();
          }, 300);
        })
        .catch(err => {
          console.log("no");
        });
    },
    popup(value) {
      this.popupForm = !this.popupForm;
      this.form.type = value;
    }
  },
  middleware: ["advertiser", "auth"],
  layout: "dashboard",
  async asyncData({ app, params }) {
    let response = await app.$axios.$get(`campaigns/${params.id}`);
    console.log(response.data)
    return {
      campaign: response.data[0],
     
    };
  }
};
</script>

<style scooped>
button {
  outline: 0px !important;
  -webkit-appearance: none;
  box-shadow: none !important;
}
.create-campaign {
  position: absolute !important;
  top: 30vh;
  /*left: 50vh;*/
  z-index: 9999;
  padding: 25px;
  background-color: #fff;
  border-radius: 15px;
  overflow: hidden;
}
.btn-active {
  background-color: #887778 !important;
}
</style>

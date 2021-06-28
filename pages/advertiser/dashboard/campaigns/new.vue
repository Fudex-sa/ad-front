<template>
  <div class="row-2">
    <div class="fixed alert alert-danger" v-if="successMessage">
      {{ successMessage }}
    </div>
    <!-- Campaign Types Cards -->
    <div class="col-md-4" v-for="(value, key) in campaignsTypes" :key="key">
      <button class="white-box text-center mb-30" @click="popup(value)">
        <h2 class="campaign-card" value="value">{{ key }}</h2>
      </button>
    </div>
    <!-- The overlay layer -->
    <div
      class="modal-backdrop fade in"
      v-if="popupForm"
      @click="popupForm = false"
    ></div>

    <!-- form -->
    <div class="col-sm-6 col-sm-offset-3 create-campaign" v-if="popupForm">
      <!-- type input -->

      <!-- <button
        class="btn btn-warning "
        style="position: relative; margin: 0 2px;"
        @click.prevent="switchTranslationLanguage(lang.code)"
        :class="{ 'btn-active': defaultLanguage == lang.code }"
        type="button"
        v-for="lang in availableLocales"
      >
        {{ lang.name }}
      </button> -->

      <!-- <nuxt-link v-if="$i18n.locale !== 'en'" :to="switchLocalePath('en')">
        English
      </nuxt-link>

      <nuxt-link v-if="$i18n.locale !== 'ar'" :to="switchLocalePath('ar')">
        Azeri
      </nuxt-link> -->
      <!-- :style="{'display': availableLocale.code != defaultLanguage ? 'none' : 'block'} " -->
      <ValidationObserver v-slot="{ handleSubmit, errors }">
        <form @submit.prevent="handleSubmit(handleSubmition)">
          <TextInput
            :key="index"
            v-model="form.ar.title"
            :name="$t('campaign_title')"
            rules="required"
          />

          <TextInput
            :key="index+'en'"
            v-model="form.en.title"
            :name="$t('campaign_title_en')"
            class='hidden'
            
          />

          <div class="col-sm-12 text-right">
            <button class="the-btn">{{ $t('Create Campaign')}}</button>
          </div>
        </form>
      </ValidationObserver>

      <!-- <div class="form-group dash-group">
        <label>Title *</label>
        <input
          class="form-control dash-input"
          placeholder="Example Campaign"
          type="text"
          v-model="form.title"
          :class="{ 'is-invalid': errors.title }"
        />
        <p class="text-danger p-2" v-for="error in errors.title">{{ error }}</p>
      </div> -->
      <!-- Hidden input for type -->
      <input type="hidden" v-model="form.type" />
      <!-- create button -->
      <!-- <div class="col-sm-12 text-right">
        <button class="the-btn" @click.prevent="handleSubmition">
          Create Campaign
        </button>
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
      defaultLanguage: "",
      successMessage: "",
      campaignsTypes: {
        Awareness: "awareness",
        Traffic: "traffic",
        "App Installs": "app-installs",
        "Video Views": "video-views",
        Messages: "messages",
        "Lead Generation": "lead-generation",
      },

      form: {
        ar: {
          title: "",
        },
        en: {
          title: "",
        },
        type: "",
      },
      popupForm: false,
    };
  },
  mounted() {
    this.defaultLanguage = this.$i18n.locale;
    this.formData = new FormData();
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales;
      // return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    },
  },
  methods: {
    switchTranslationLanguage(locale) {
      this.defaultLanguage = locale;
    },

    // $i18n.setLocale(locale, false)
    handleSubmition() {
      this.formData.append("type", this.form.type);
      this.formData.append("title_en", this.form.en.title);
      this.formData.append("title", this.form.ar.title);

      this.$axios
        .$post("campaigns/create", this.formData)
        .then((res) => {
          this.successMessage = res.data.message;
          this.popupForm = false;
          setTimeout(() => {
            this.$router.push("../ads/new");
          }, 300);
        })
        .catch((err) => {
          console.log("no");
          // console.log(error.response.data.errors, 'aa')
        });
    },
    async onSubmit() {
      console.log(this.form);
      const isValid = await this.$refs.observer.validate();
      if (!isValid) {
        // ABORT!!
      }
      alert("Form Submitted!");
    },
    popup(value) {
      this.popupForm = !this.popupForm;
      this.form.type = value;
    },
  },

  middleware: ["advertiser", "auth"],
  layout: "dashboard",
  async asyncData({ app }) {
    let response = await app.$axios.$get("analytics");
    return {
      analytics: response.data,
    };
  },
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

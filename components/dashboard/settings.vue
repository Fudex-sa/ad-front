<template>
  <div>
    <div :class="`alert ${successMessage_bg}`" v-if="successMessage">
			{{ successMessage }}
		</div>
    <div class="row">
      <!-- <h2 class="pl-4">About us</h2> -->
      <div class="col-sm-12 col-md-6">
        <div class="form-group dash-group">
          <label>{{ $t("About us AR") }}</label>
          <textarea
            class="form-control dash-input"
            :class="{ 'is-invalid': errors.about_us_ar }"
            placeholder="About us description..."
            v-model="initialSettings.about_us_ar"
          ></textarea>
          <p
            class="text-danger p-2"
            v-for="error in errors.about_us_ar"
            :key="error"
          >
            {{ error }}
          </p>
        </div>

        <div class="form-group dash-group">
          <label>{{ $t("About us EN") }}</label>
          <textarea
            class="form-control dash-input"
            :class="{ 'is-invalid': errors.about_us }"
            placeholder="Description"
            v-model="initialSettings.about_us"
          ></textarea>
          <p
            class="text-danger p-2"
            v-for="error in errors.about_us"
            :key="error"
          >
            {{ error }}
          </p>
        </div>
      </div>
      <div class="col-sm-12 col-md-6">
        <div class="about-img">
          <i
            class="fa fa-pencil-square-o edit"
            aria-hidden="true"
            title="Edit Picture"
            @click="aboutImg = !aboutImg"
          ></i>
          <img :src="initialSettings.about_us_image" alt="about_us_image" />
        </div>
        <div class="col-sm-12" v-if="aboutImg">
          <div class="form-group dash-group">
            <label>{{ $t("Upload Photo") }}</label>
            <input
              type="file"
              @change.prevent="handleImageUpload('about_us_image')"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 col-md-6">
        
         <div class="form-group dash-group">
          <label>{{ $t("Mission AR") }}</label>
          <textarea
            class="form-control dash-input"
            :class="{ is_invalid: errors.mission_ar }"
            placeholder="Description"
            v-model="initialSettings.mission_ar"
          ></textarea>
          <p
            class="text-danger p-2"
            v-for="error in errors.mission_ar"
            :key="error"
          >
            {{ error }}
          </p>
        </div>

        <div class="form-group dash-group">
          <label>{{ $t("Mission EN") }}</label>
          <textarea
            class="form-control dash-input"
            :class="{ is_invalid: errors.mission }"
            placeholder="Description"
            v-model="initialSettings.mission"
          ></textarea>
          <p
            class="text-danger p-2"
            v-for="error in errors.mission"
            :key="error"
          >
            {{ error }}
          </p>
        </div>

       
      </div>
      <div class="col-sm-12 col-md-6">
        <div class="about-img">
          <i
            class="fa fa-pencil-square-o edit"
            aria-hidden="true"
            title="Edit Picture"
            @click="missionImg = !missionImg"
          ></i>
          <img :src="initialSettings.mission_image" alt="mission_image" />
        </div>
        <div class="col-sm-12" v-if="missionImg">
          <div class="form-group dash-group">
            <label>{{ $t("Upload Photo") }}</label>
            <input
              type="file"
              @change.prevent="handleImageUpload('mission_image')"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 col-md-6">
        

        <div class="form-group dash-group">
          <label class="pl-4">{{ $t("Vision AR") }}</label>
          <textarea
            class="form-control dash-input"
            :class="{ 'is-invalid': errors.vision_ar }"
            placeholder="Description"
            v-model="initialSettings.vision_ar"
          ></textarea>
          <p
            class="text-danger p-2"
            v-for="error in errors.vision_ar"
            :key="error"
          >
            {{ error }}
          </p>
        </div>

        <div class="form-group dash-group">
          <label class="pl-4">{{ $t("Vision EN") }}</label>
          <textarea
            class="form-control dash-input"
            :class="{ 'is-invalid': errors.vision }"
            placeholder="Description"
            v-model="initialSettings.vision"
          ></textarea>
          <p
            class="text-danger p-2"
            v-for="error in errors.vision"
            :key="error"
          >
            {{ error }}
          </p>
        </div>
      </div>
      <div class="col-sm-12 col-md-6">
        <div class="about-img">
          <i
            class="fa fa-pencil-square-o edit"
            aria-hidden="true"
            title="Edit Picture"
            @click="visionImg = !visionImg"
          ></i>
          <img :src="initialSettings.vision_image" alt="vision_image" />
        </div>
        <div class="col-sm-12" v-if="visionImg">
          <div class="form-group dash-group">
            <label>{{ $t('Upload Photo') }}</label>
            <input
              type="file"
              @change.prevent="handleImageUpload('vision_image')"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <h2 class="pl-4">{{ $t("Intro Video") }}</h2>
      <div class="col-sm-12 col-md-6">
        <div class="form-group dash-group">
          <input
            class="form-control dash-input"
            placeholder="Example Task"
            type="text"
            v-model="initialSettings.intro_video"
            :class="{ 'is-invalid': errors.intro_video }"
          />
          <p
            class="text-danger p-2"
            v-for="error in errors.intro_video"
            :key="error"
          >
            {{ error }}
          </p>
        </div>
      </div>
    </div>
    <div class="row">
      <h2 class="pl-4">{{ $t("Contact Us Data") }}</h2>
      <div class="col-sm-12 col-md-6">
        <div class="form-group dash-group">
          <label>{{ $t("Email") }} *</label>
          <input
            class="form-control dash-input"
            placeholder="Example Task"
            type="text"
            v-model="initialSettings.email"
            :class="{ 'is-invalid': errors.email }"
          />
          <p class="text-danger p-2" v-for="error in errors.email" :key="error">
            {{ error }}
          </p>
        </div>
      </div>
      <div class="col-sm-12 col-md-6">
        <div class="form-group dash-group">
          <label>{{ $t("Address") }} *</label>
          <input
            class="form-control dash-input"
            placeholder="Example Task"
            type="text"
            v-model="initialSettings.address"
            :class="{ 'is-invalid': errors.address }"
          />
          <p
            class="text-danger p-2"
            v-for="error in errors.address"
            :key="error"
          >
            {{ error }}
          </p>
        </div>
      </div>
      <div class="col-sm-12 col-md-6">
        <div class="form-group dash-group">
          <label>{{ $t("mobile") }} *</label>
          <input
            class="form-control dash-input"
            placeholder="Example Task"
            type="text"
            v-model="initialSettings.mobile"
            :class="{ 'is-invalid': errors.mobile }"
          />
          <p
            class="text-danger p-2"
            v-for="error in errors.mobile"
            :key="error"
          >
            {{ error }}
          </p>
        </div>
      </div>
      <div class="col-sm-12 col-md-6">
        <div class="form-group dash-group">
          <label>{{ $t("facebook_link") }} *</label>
          <input
            class="form-control dash-input"
            placeholder="Example Task"
            type="text"
            v-model="initialSettings.facebook"
            :class="{ 'is-invalid': errors.facebook }"
          />
          <p
            class="text-danger p-2"
            v-for="error in errors.facebook"
            :key="error"
          >
            {{ error }}
          </p>
        </div>
      </div>
      <div class="col-sm-12 col-md-6">
        <div class="form-group dash-group">
          <label>{{ $t("instagram_link") }} *</label>
          <input
            class="form-control dash-input"
            placeholder="Example Task"
            type="text"
            v-model="initialSettings.instagram"
            :class="{ 'is-invalid': errors.instagram }"
          />
          <p
            class="text-danger p-2"
            v-for="error in errors.instagram"
            :key="error"
          >
            {{ error }}
          </p>
        </div>
      </div>

      <div class="col-sm-12 col-md-6">
        <div class="form-group dash-group">
          <label>{{ $t("twitter_link") }} *</label>
          <input
            class="form-control dash-input"
            placeholder="Example Task"
            type="text"
            v-model="initialSettings.twitter"
            :class="{ 'is-invalid': errors.twitter }"
          />
          <p
            class="text-danger p-2"
            v-for="error in errors.twitter"
            :key="error"
          >
            {{ error }}
          </p>
        </div>
      </div>




      <div class="col-sm-12 col-md-6">
        <div class="form-group dash-group">
          <label>{{ $t("publisher_video") }} *</label>
          <input
            class="form-control dash-input"          
            type="text"
            v-model="initialSettings.publisher_video"
            :class="{ 'is-invalid': errors.publisher_video }"
          />
          <p
            class="text-danger p-2"
            v-for="error in errors.publisher_video"
            :key="error"
          >
            {{ error }}
          </p>
        </div>
      </div>

      
      <div class="col-sm-12 col-md-6">
        <div class="form-group dash-group">
          <label>{{ $t("advertiser_video") }} *</label>
          <input
            class="form-control dash-input"          
            type="text"
            v-model="initialSettings.advertiser_video"
            :class="{ 'is-invalid': errors.advertiser_video }"
          />
          <p
            class="text-danger p-2"
            v-for="error in errors.advertiser_video"
            :key="error"
          >
            {{ error }}
          </p>
        </div>
      </div>






      
      <div class="col-sm-12 col-md-6">
        <div class="form-group dash-group">
          <label>{{ $t("google_play") }} *</label>
          <input
            class="form-control dash-input"            
            type="text"
            v-model="initialSettings.google_play"
            :class="{ 'is-invalid': errors.google_play }"
          />
          <p
            class="text-danger p-2"
            v-for="error in errors.google_play"
            :key="error"
          >
            {{ error }}
          </p>
        </div>
      </div>

      <div class="col-sm-12 col-md-6">
        <div class="form-group dash-group">
          <label>{{ $t("app_store") }} *</label>
          <input
            class="form-control dash-input"            
            type="text"
            v-model="initialSettings.app_store"
            :class="{ 'is-invalid': errors.app_store }"
          />
          <p
            class="text-danger p-2"
            v-for="error in errors.app_store"
            :key="error"
          >
            {{ error }}
          </p>
        </div>
      </div>





      <div class="col-sm-12 col-md-6">
        <div class="form-group dash-group">
          <label>{{ $t("Location longitude") }} *</label>
          <input
            class="form-control dash-input"
            placeholder="Example Task"
            type="text"
            v-model="initialSettings.lng"
            :class="{ 'is-invalid': errors.lng }"
          />
          <p class="text-danger p-2" v-for="error in errors.lng" :key="error">
            {{ error }}
          </p>
        </div>
      </div>
      <div class="col-sm-12 col-md-6">
        <div class="form-group dash-group">
          <label>{{ $t("Location latitude") }} *</label>
          <input
            class="form-control dash-input"
            placeholder="Example Task"
            type="text"
            v-model="initialSettings.lat"
            :class="{ 'is-invalid': errors.lat }"
          />
          <p class="text-danger p-2" v-for="error in errors.lat" :key="error">
            {{ error }}
          </p>
        </div>
      </div>
    </div>
    <div class="row">
      <h2 class="pl-4">{{  $t('Campaigns & Ads Constrains') }}</h2>
      <!--<div class="col-sm-12 col-md-6">-->
      <!--  <div class="form-group dash-group">-->
      <!--    <label>{{ $t("Campaign Min Duration") }}</label>-->
      <!--    <input-->
      <!--      class="form-control dash-input"-->
      <!--      placeholder="Example Task"-->
      <!--      type="text"-->
      <!--      v-model="initialSettings.campaign_min_Duration"-->
      <!--      :class="{ 'is-invalid': errors.campaign_min_Duration }"-->
      <!--    />-->
      <!--    <p-->
      <!--      class="text-danger p-2"-->
      <!--      v-for="error in errors.campaign_min_Duration"-->
      <!--      :key="error"-->
      <!--    >-->
      <!--      {{ error }}-->
      <!--    </p>-->
      <!--  </div>-->
      <!--</div>-->
      <!-- <div class="col-sm-12 col-md-6">
        <div class="form-group dash-group">
          <label>{{ $t("Campaign MinBudget") }}</label>
          <input
            class="form-control dash-input"
            placeholder="Example Task"
            type="text"
            v-model="initialSettings.campaign_min_budget"
            :class="{ 'is-invalid': errors.campaign_min_budget }"
          />
          <p
            class="text-danger p-2"
            v-for="error in errors.campaign_min_budget"
            :key="error"
          >
            {{ error }}
          </p>
        </div>
      </div> -->
      <div class="col-sm-12 col-md-6">
        <div class="form-group dash-group">
          <label>{{ $t("Ad Min Budget") }}</label>
          <input
            class="form-control dash-input"
            placeholder="Example Task"
            type="text"
            v-model="initialSettings.ad_min_budget"
            :class="{ 'is-invalid': errors.ad_min_budget }"
          />
          <p
            class="text-danger p-2"
            v-for="error in errors.ad_min_budget"
            :key="error"
          >
            {{ error }}
          </p>
        </div>
      </div>
      <div class="col-sm-12 col-md-3">
        <div class="form-group dash-group">
          <label>{{ $t("Task Min Click Price") }} </label>
          <input
            class="form-control dash-input"
            placeholder="Example Task"
            type="number"
            v-model="initialSettings.ad_click_price"
            :class="{ 'is-invalid': errors.ad_click_price }"
          />
          <p
            class="text-danger p-2"
            v-for="error in errors.ad_click_price"
            :key="error"
          >
            {{ error }}
          </p>
        </div>
      </div>
      <div class="col-sm-12 col-md-3">
        <div class="form-group dash-group">
          <label>{{ $t("Task Click Price Currency") }} </label>
          <select   class="form-control "
              :placeholder="$t('Task Click Price Currency')"
              v-model="initialSettings.ad_click_price_currency"
              :class="{ 'is-invalid': errors.ad_click_price_currency }"
              >
                <option v-for="method in payments" :key="method">{{method}}</option>
            </select>
          <p
            class="text-danger p-2"
            v-for="error in errors.ad_click_price_currency"
            :key="error"
          >
            {{ error }}
          </p>
        </div>
      </div>

    </div>

    <div class="col-sm-12 col-md-6">
      <div class="form-group dash-group">
        <label>{{ $t("min_ad_view_duration") }}</label>
        <input
          class="form-control dash-input"
          :placeholder="$t('min_ad_view_duration')"
          type="number"
          v-model="initialSettings.min_ad_view_duration"
          :class="{ 'is-invalid': errors.min_ad_view_duration }"
        />
        <p
          class="text-danger p-2"
          v-for="error in errors.min_ad_view_duration"
          :key="error"
        >
          {{ error }}
        </p>
      </div>
    </div>

    <div class="col-sm-12 col-md-3">
      <div class="form-group dash-group">
        <label>{{ $t("solider_ad_max_profit") }}</label>
        <input
          class="form-control dash-input"
          :placeholder="$t('solider_ad_max_profit')"
          type="text"
          v-model="initialSettings.solider_ad_max_profit"
          :class="{ 'is-invalid': errors.solider_ad_max_profit }"
        />
        <p
          class="text-danger p-2"
          v-for="error in errors.solider_ad_max_profit"
          :key="error"
        >
          {{ error }}
        </p>
      </div>
    </div>
    
      <div class="col-sm-12 col-md-3">
        <div class="form-group dash-group">
          <label>{{ $t("solider_ad_max_currency") }} </label>
          <select   class="form-control "
              :placeholder="$t('solider_ad_max_currency')"
              v-model="initialSettings.solider_ad_max_profit_currency"
              :class="{ 'is-invalid': errors.solider_ad_max_profit_currency }"
              >
                <option v-for="method in payments" :key="method">{{method}}</option>
            </select>
          <p
            class="text-danger p-2"
            v-for="error in errors.solider_ad_max_profit_currency"
            :key="error"
          >
            {{ error }}
          </p>
        </div>
      </div>

    <div class="col-sm-12 text-right">
      <button class="the-btn2 hvr-radial-out" @click="$router.back()">
        Cancel
      </button>
      <button class="the-btn hvr-radial-out" @click.prevent="handleSubmition">
        Update Settings
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: ["settings"],
  data() {
    return {
      initialSettings: this.settings,
      aboutImg: false,
      missionImg: false,
      visionImg: false,
      successMessage: '',
      payments:['usd','sar']

    };
  },
  mounted() {
    this.formData = new FormData();
  },
  methods: {
    handleImageUpload(image) {
      // append image in formData with key of the file input name
      this.formData.append(image, event.target.files[0]);
    },
    handleSubmition() {
      let exceptions = [
        "id",
        "about_us_image",
        "mission_image",
        "vision_image",
      ];

      // set initialSettings to formData except images
      Object.keys(this.initialSettings).forEach((key) => {
        if (!exceptions.includes(key)) {
          this.formData.append(key, this.initialSettings[key]);
        }
      });

      this.$axios
        .post("settings", this.formData, {
          header: {
            "Content-Type": "multipart/form-data",
            "Accept-Language": this.$i18n.locale
          },
        })
        .then((res) => {
          //this.successMessage = res.data.message;
            this.successMessage = res.data.data.message
					  this.successMessage_bg = 'alert-success'
            window.scrollTo(0,0);

          setTimeout(() => {
            this.successMessage = ''
					  this.successMessage_bg = ''
            //this.$router.back();
          }, 5000);
        });
    },
  },
};
</script>
<style scooped>
.edit {
  right: 25px;
  position: absolute;
  top: 10px;
  color: #e50015;
  background-color: #fff;
  padding: 10px;
  border-radius: 3px;
  cursor: pointer;
}
</style>

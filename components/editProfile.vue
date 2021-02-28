<template>
  <div class="row">
    <div class="col-md-4 pull-left">
      <img
        class="img-thumbnail pic"
        :src="'/_nuxt/assets/' + user.picture"
        alt="profile_picture"
      />
    </div>
    <div class="col-md-8">
      <div class="alert alert-success" v-if="successMessage !== ''">
        {{ successMessage }}
      </div>

      <div class="row">
        <div class="col-md-6 col-sm-6 mt-20">
          <div class="form-group dash-group">
            <label class="pl-2">{{ $t('username') }} *</label>
            <input
              class="form-control dash-input"
              :placeholder="$t('username')"
              type="text"
              v-model="form.username"
              :class="{ 'is-invalid': errors.username }"
            />
            <p class="text-danger p-2" v-for="error in errors.username">
              {{ error }}
            </p>
          </div>
        </div>
        <div class="col-md-6 col-sm-6 mt-20">
          <div class="form-group dash-group">
            <label class="pl-2">{{ $t('Address profile') }} *</label>
            <input
              class="form-control dash-input"
              :placeholder="$t('Address profile')"
              type="text"
              v-model="form.address"
              :class="{ 'is-invalid': errors.address }"
            />
            <p class="text-danger p-2" v-for="error in errors.address">
              {{ error }}
            </p>
          </div>
        </div>
      <div v-if="from && from === 'soldier'">
        <div class="col-md-6 col-sm-6 mt-20">
          <div class="form-group dash-group">
            <label class="pl-2">{{ $t('Paypal No') }}.</label>
            <input
              class="form-control dash-input"
              :placeholder="$t('Paypal No')+'...'"
              type="text"
              v-model="form.paypalno"
            />
          </div>
        </div>
        <div class="col-md-6 col-sm-6 mt-20">
          <div class="form-group dash-group">
            <label class="pl-2">STC Pay No.</label>
            <input
              class="form-control dash-input"
              placeholder="STC Pay No..."
              type="text"
              v-model="form.stcpayno"
            />
          </div>
        </div>
        </div>
        <div class="col-md-6 col-sm-6 mt-20">
          <div class="form-group dash-group">
            <label class="pl-2">{{ $t('Phone') }}*</label>
            <input
              class="form-control dash-input"
              :placeholder="$t('Phone')"
              type="text"
              v-model="form.mobile"
              :class="{ 'is-invalid': errors.mobile }"
            />
            <p class="text-danger p-2" v-for="error in errors.mobile">
              {{ error }}
            </p>
          </div>
        </div>
        <div class="col-md-6 col-sm-6 mt-20">
          <div class="form-group dash-group">
            <label class="pl-2">{{ $t('Current Password') }} *</label>
            <input
              type="Password"
              class="form-control dash-input"
              :placeholder="$t('Current Password')"
              v-model="form.current_password"
              :class="{ 'is-invalid': errors.current_password }"
            />
            <p class="text-danger p-2" v-for="error in errors.current_password">
              {{ error }}
            </p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-sm-6 mt-20">
          <div class="form-group dash-group">
            <label class="pl-2">{{ $t('Password') }} *</label>
            <input
              type="Password"
              class="form-control dash-input"
              :placeholder="$t('Password')"
              v-model="form.password"
              :class="{ 'is-invalid': errors.password }"
            />
            <p class="text-danger p-2" v-for="error in errors.password">
              {{ error }}
            </p>
          </div>
        </div>
        <div class="col-md-6 col-sm-6 mt-20">
          <div class="form-group dash-group">
            <label class="pl-2">{{ $t('Password Confirmation') }} *</label>
            <input
              type="Password"
              class="form-control dash-input"
              :placeholder="$t('Password Confirmation')"
              v-model="form.password_confirmation"
            />
          </div>
        </div>
      </div>
      <div class="row mt-20">
        <div class="form-group dash-group">
          <div class="col-sm-6">
            <label class="pl-2">{{ $t('Edit Profile Picture') }} *</label>
            <input type="file" @change.prevent="handleFileUpload" multiple />
          </div>
          <p class="col-xs-6 mt-10 hint col-sm-6">
            {{$t('Image Ideal Dimension')}}
          </p>
        </div>
      </div>

   
      <div class="col-sm-12 text-right mt-40">
        <button class="the-btn2 hvr-radial-out" @click="$router.back()">
          {{ $t('cancel') }}
        </button>
        <button class="the-btn hvr-radial-out" @click="handleSubmition">
          {{ $t('Update')}}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  props: {
    from: {
      type: String
    }
  },
  data() {
    return {
      form: {},
      successMessage: "",
    };
  },
  mounted() {
    //   clone user data into form
    this.form = { ...this.user };
    delete this.form.picture;
    this.formData = new FormData();
  },
  methods: {
    inputing(key) {
      this.form.key = event.target;
    },
    handleFileUpload() {
      Object.keys(event.target.files).map((key) => {
        return this.formData.append("picture", event.target.files[key]);
      });
    },
    handleSubmition() {
      Object.keys(this.form).map((key) => {
        this.formData.append(key, this.form[key]);
      });
      this.$axios
        .$post("auth/profile/update", this.formData, {
          header: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.successMessage = "Profile has been updated.";
          this.$router.push({
            path: "/" + this.$auth.state.user.role + "/profile",
          });
        });
    },
  },
};
</script>

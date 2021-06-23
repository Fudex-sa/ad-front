<template>
  <div class="internal-page">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <div class="title title2">
            <h2>{{  $t('Sign up') }}</h2>
            <p>{{ $t('Enter Your Data to Continue') }} </p>
          </div>
        </div>





        <div class="col-sm-12">

          <div class="row">
            <div class="col-md-3 col-sm-3"></div>
             <div class="col-md-6 col-sm-6 text-center">
                <h4>{{ $t('download_our_apps') }}</h4>
                <div class="apps text-center">
                    <a :href="contacts.app_store" title="app-store"><img src="~/assets/img/app1.png" alt="app-store"></a>
                    <a :href="contacts.google_play" title="google-play"><img src="~/assets/img/app2.png" alt="google-play"></a>
                </div>                        
              </div>
          </div>

          <!-- start tabs -->
          <ul class="nav nav-pills">
            <li :class="{ active: formType == 'advertiser' }">
              <a
                data-toggle="pill"
                @click.prevent="changeForm('advertiser')"
                href="#"
              >{{ $t('Advertiser sign up') }}</a>
            </li>
            <li :class="{ active: formType == 'soldier' }">
              <a data-toggle="pill" href="#" @click.prevent="changeForm('soldier')">{{  $t('Soldier sign up') }}</a>
            </li>
          </ul>
          <!-- end tabs -->
          <!-- start form  -->
          <div class="tab-content">
            <div id="signup-company" class="tab-pane fade in active">
              <div class="layout1">
                <form>
                  <!-- <div class="form-group" v-if="formType == 'advertiser'">
                    <input
                      type="text"
                      class="form-control the-input"
                      placeholder="Enter Company Name"
                      v-model="form.company"
                      :class="{ 'is-invalid': errors.company }"
                    />
                  </div>-->
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control the-input"
                      :placeholder="$t('Enter Your Email')"
                      v-model="form.email"
                      :class="{ 'is-invalid': errors.email }"
                    />
                    <p
                      class="text-danger p-2"
                      v-for="error in errors.email"
                      :key="error"
                    >{{ error }}</p>
                  </div>
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control the-input"
                      :placeholder="$t('Username')"
                      v-model="form.username"
                      :class="{ 'is-invalid': errors.username }"
                    />
                    <p
                      class="text-danger p-2"
                      v-for="error in errors.username"
                      :key="error"
                    >{{ error }}</p>
                  </div>
                  <div class="form-group">
                    <input
                      type="Password"
                      class="form-control the-input"
                      :placeholder="$t('Password')"
                      v-model="form.password"
                      :class="{ 'is-invalid': errors.password }"
                    />
                    <p
                      class="text-danger p-2"
                      v-for="error in errors.password"
                      :key="error"
                    >{{ error }}</p>
                  </div>
                  <div class="form-group">
                    <input
                      type="Password"
                      class="form-control the-input"
                      :placeholder="$t('Confirm Password')"
                      v-model="form.password_confirmation"
                    />
                    <p
                      class="text-danger p-2"
                      v-for="error in errors.password_confirmation"
                      :key="error"
                    >{{ error }}</p>
                  </div>
                  <div class="form-group">
                    <button
                      type="submit"
                      class="btn the-btn btn-block hvr-radial-out"
                      @click.prevent="signup"
                    >{{ $t('Register') }}</button>
                  </div>
                  <div class="form-group text-center">
                    <p class="color2">
                      {{ $t('Already have an account') }} ?
                      <nuxt-link :to="localePath('auth-login')" class="color1">{{ $t('Login') }}</nuxt-link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <!-- end form -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      message: "",
      formType: "advertiser",
      contacts : [],

      form: {
        company: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: ""
      }
    };
  },
  methods: {

    async fetchSettings() {
            const response = await this.$axios.$get('settings');
            this.contacts = response.data;
    },


    changeForm(type) {
      this.formType = type;
      this.form.company = "";
      this.form.username = "";
      this.form.email = "";
      this.form.password = "";
      this.form.password_confirmation = "";
      this.form.role = this.formType;
    },
    
    signup() {
      this.form.company == "" ? delete this.form.company : "";

      this.$axios
        .post("auth/register", this.form)
        .then(res => {
          if (res.status == 201) {
            try {
              this.$auth
                .loginWith("local", {
                  data: {
                    email: res.data.data.email,
                    password: this.form.password
                  }
                })
                .then(() => {
                  this.$router.push({
                    path: "/" + this.$auth.state.user.role + "/dashboard"
                  });
                })
                .catch(err => console.log(err));
            } catch (err) {
              if (err.response.status == 401 || err.response.status == 422) {
                $nuxt.error({
                  message: error.response.data.errors
                });
              }
            }
            // setTimeout(() => {
            //   this.$router.push("/auth/login");
            // }, 1000);
          }
        })
        .catch(error => {
          if (error.response.status == 401) {
            $nuxt.error({
              message: error.response.data.errors
            });
          }
        });
    }
  },
  mounted () {
      this.fetchSettings();
  }
};
</script>
<template>
  <div class="internal-page">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <div class="title title2">
            <h2>{{ $t('Login') }}</h2>
            <p>{{ $t('Enter Your Data to Continue') }}</p>
          </div>
        </div>
        <div class="col-sm-12">
          <div class="layout1">
            <form v-on:submit.prevent="login">
              <div class="form-group">
                <input
                  :class="{ 'is-invalid' : errors.email }"
                  type="text"
                  class="form-control the-input"
                  :placeholder="$t('Enter Your Email')"
                  v-model="form.email"
                />
                <p class="text-danger pl-4" v-for="error in errors.email" :key="error">{{error}}</p>
              </div>

              <div class="form-group">
                <input
                  :class=" { 'is-invalid' : errors.password} "
                  type="password"
                  class="form-control the-input"
                  :placeholder="$t('Enter password')"
                  v-model="form.password"
                />
                <p class="text-danger pl-4" v-for="error in errors.password" :key="error">{{error}}</p>
              </div>
              <div class="checkbox form-group2">
                <label>
                  <input type="checkbox" /> {{ $t('Remember me') }}
                </label>
                <nuxt-link :to="localePath('auth-forget')" class="forgot">{{ $t('Forgot Password') }} !</nuxt-link>
              </div>
              <div class="form-group">
                <input type="submit" class="btn the-btn btn-block hvr-radial-out" :value="$t('Login')" />
              </div>
              <div class="form-group text-center">
                <p class="color2">
                  {{ $t('Dont have an account') }} ?
                  <nuxt-link :to="localePath('auth-register')" class="color1">{{ $t('Sign up') }}</nuxt-link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  mounted (){
    console.log('localeefore:', this.$i18n.locale)
  },
  methods: {
    login() {
      let currentLocale = this.$i18n.locale;
      console.log('localee:', this.$i18n.locale)
      try {
         this.$auth.loginWith("local", {
          data: this.form,
        }).then(()=>{
          this.switchLang(currentLocale)
           this.$router.push({
             path: `/${currentLocale}/` + this.$auth.state.user.role + "/dashboard",
           });
           // reset store props
           this.$store.commit("localStorage/SET_CURRENT_PAGE_PAGINATION", 1);
           this.$store.commit("localStorage/SET_BACK_BUTTON", false);
        }).catch(err => console.log(err));

        // setTimeout(() => {
        //   this.$router.push({
        //     path: "/" + this.$auth.state.user.role + "/dashboard",
        //   });
        // }, 500);
        // console.log(this.$auth.state.user.role);
      } catch (err) {
          if (err.response.status == 401 || err.response.status == 422) {
            $nuxt.error({
              message: error.response.data.errors,
            });
          }
      }
    },
    switchLang(locale) {
      if (locale === this.$store.state.i18n.locale) {
        return;
      }

      //this.isLoading = true;
      // update store info
      //this.$store.commit("i18n/i18nSetLocale", locale);
      // fetch new locale file
      import(`~/locales/${locale}`).then((module) => {
        // update i18n's locale instance
        this.$i18n.locale = locale;
        // set new messages from new locale file
        this.$i18n.setLocaleMessage(locale, module.default);
      });
    },
  },
};
</script>

<template>
  <div class="header">
    <nav class="navbar navbar-inverse">
      <div class="container">
        <div class="navbar-header">
          <button
            type="button"
            class="navbar-toggle"
            data-toggle="collapse"
            data-target="#myNavbar"
          >
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <nuxt-link
            :to="{ name: 'index' }"
            class="navbar-brand"
            title="Soldiers logo"
          >
            <img src="~/assets/img/logo.png" alt="logo" class="logo" />
          </nuxt-link>
        </div>

        <div class="collapse navbar-collapse" id="myNavbar">
          <!-- if not authenticated -->
          <div v-if="!authenticated">
            <ul class="nav navbar-nav navbar-right navbar-right2">
              <li>
                <!-- <nuxt-link
                  :to="{
                    name: localePath('auth-register'),
                    params: { page: 'advertiser' },
                  }"
                  >{{ $t("signup") }}
                </nuxt-link> -->

                <nuxt-link
                  :to="localePath('auth-register')"
                  >{{ $t("signup") }}
                </nuxt-link>


              </li>
              <li>
                <nuxt-link :to="localePath('auth-login')"
                  >{{ $t("login") }}
                </nuxt-link>
              </li>
              <li>
                <a
                  @click.prevent="switchMyLang('ar')"
                  v-if="$i18n.locale !== 'ar'"
                  >اللغة العربية</a
                >
                <a
                  @click.prevent="switchMyLang('en')"
                  v-if="$i18n.locale !== 'en'"
                  >English</a
                >
              </li>
            </ul>
          </div>
          <!-- if authenticated -->
          <div v-if="authenticated">
            <ul class="nav navbar-nav navbar-right navbar-right2">
              <li>
                <a @click.prevent="logout">{{ $t("logout") }}</a>
              </li>

              <li>
                <a
                  @click.prevent="switchMyLang('ar')"
                  v-if="$i18n.locale !== 'ar'"
                  >اللغة العربية</a
                >
                <a
                  @click.prevent="switchMyLang('en')"
                  v-if="$i18n.locale !== 'en'"
                  >English</a
                >
              </li>
              <li>
                <nuxt-link
                  :to="{ name: 'admin-dashboard' }"
                  v-if="role == 'admin'"
                  >{{ user.username }}</nuxt-link
                >
                <nuxt-link
                  :to="{ name: 'advertiser-dashboard' }"
                  v-if="role == 'advertiser'"
                  >{{ user.username }}</nuxt-link
                >
                <nuxt-link
                  :to="{ name: 'soldier-dashboard' }"
                  v-if="role == 'soldier'"
                  >{{ user.username }}</nuxt-link
                >
              </li>
            </ul>
          </div>

          <ul class="nav navbar-nav navbar-right navigation">
            <li>
              <nuxt-link :to="localePath('index')">{{
                $t("home").toUpperCase()
              }}</nuxt-link>
            </li>
            <li>
              <a href="#">{{ $t("advertiser").toUpperCase() }}</a>
            </li>
            <!-- <li><a href="#">PUBLISHERS</a></li> -->
            <li>
              <a href="#">{{ $t("benefits").toUpperCase() }}</a>
            </li>
            <li>
              <nuxt-link :to="localePath('about')">{{
                $t("about").toUpperCase()
              }}</nuxt-link>
            </li>

            <li>
              <nuxt-link :to="localePath('terms')">{{
                $t("terms_conditions").toUpperCase()
              }}</nuxt-link>
            </li>
            <li>
              <nuxt-link :to="localePath('privacy')">{{
                $t("privacy_policy").toUpperCase()
              }}</nuxt-link>
            </li>
            <li>
              <nuxt-link :to="localePath('contact')">{{
                $t("contactus").toUpperCase()
              }}</nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    switchMyLang(locale) {
      if (locale === this.$store.state.i18n.locale) {
        return;
      }
      // update store info
      this.$store.commit("i18n/i18nSetLocale", locale);
      // fetch new locale file
      import(`~/locales/${locale}`).then((module) => {
        // update i18n's locale instance
        this.$i18n.locale = locale;
        // set new messages from new locale file
        this.$i18n.setLocaleMessage(locale, module.default);
        // update url to point to new path, without reloading the page
        window.history.replaceState("", "", this.switchLocalePath(locale));

        this.$nuxt.$router.go({
          path: this.$route.fullPath,
          force: true,
        });
      });
    },
    logout() {
      this.$auth.logout();
    },
  },
};
</script>

<style scoped>
a:hover {
  cursor: pointer;
}
</style>

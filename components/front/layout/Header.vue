<template>
  <div class="header">

  <div class="overlay" :class="{'show': isLoading }"></div>
<div class="spanner" :class="{'show': isLoading }">
  <div class="loader"></div>
  <p>{{ $t('change_lang')}}</p>
</div>


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

                <nuxt-link :to="localePath('auth-register')"
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
                  :to="localePath('admin-dashboard')"
                  v-if="role == 'admin'"
                  >{{ user.username }}</nuxt-link
                >
                <nuxt-link
                  :to="localePath('advertiser-dashboard')"
                  v-if="role == 'advertiser'"
                  >{{ user.username }}</nuxt-link
                >
                <nuxt-link
                  :to="localePath('soldier-dashboard')"
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
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    switchMyLang(locale) {
      if (locale === this.$store.state.i18n.locale) {
        return;
      }

      this.isLoading = true;
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

        setTimeout(() => {
           this.isLoading = false;
          this.$nuxt.$router.go({
            path: this.$route.fullPath,
            force: true,
          });
        }, 1000);
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
.spanner{
  position:absolute;
  top: 50%;
  left: 0;
  background: #2a2a2a;
  width: 100%;
  display:block;
  text-align:center;
  height: 300px;
  color: #FFF;
  transform: translateY(-50%);
  z-index: 1000;
  visibility: hidden;
}

.overlay{
  position: fixed;
	width: 100%;
	height: 100%;
  background: rgba(0,0,0,0.5);
  visibility: hidden;
  z-index: 999;
}

.loader,
.loader:before,
.loader:after {
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: load7 1.8s infinite ease-in-out;
  animation: load7 1.8s infinite ease-in-out;
}
.loader {
  color: #ffffff;
  font-size: 10px;
  margin: 80px auto;
  position: relative;
  text-indent: -9999em;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
.loader:before,
.loader:after {
  content: '';
  position: absolute;
  top: 0;
}
.loader:before {
  left: -3.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.loader:after {
  left: 3.5em;
}
@-webkit-keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
@keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}

.show{
  visibility: visible;
}

.spanner, .overlay{
	opacity: 0;
	-webkit-transition: all 0.3s;
	-moz-transition: all 0.3s;
	transition: all 0.3s;
}

.spanner.show, .overlay.show {
	opacity: 1
}
</style>

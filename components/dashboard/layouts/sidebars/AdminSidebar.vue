<template>
  <div>
    <div>
      <section style="width: 100%;">
        <ul class="sidebar-menu">
          <li class="sidebar-header">
            <nuxt-link :to="localePath('index')">
              <img src="@/assets/img/logo.png" />
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="localePath('admin-dashboard')">
              <img src="@/assets/img/img1-a.png" class="icon-a" />
              <img src="@/assets/img/img1-b.png" class="icon-b" />
              <span>{{ $t('home') }}</span>
            </nuxt-link>
          </li>

          <li>
            <nuxt-link :to="localePath('admin-dashboard-ads-review')">
              <img src="@/assets/img/img2-a.png" class="icon-a" />
              <img src="@/assets/img/img2-b.png" class="icon-b" />
              <span>{{ $t('review_ads') }}</span>
            </nuxt-link>
          </li>
          
          <!-- <li @click="adSubTabs = !adSubTabs">
            <a>
              <img src="@/assets/img/img2-a.png" class="icon-a" />
              <img src="@/assets/img/img2-b.png" class="icon-b" />
              Ads
            </a>
            <ul class="sidebar-menu sub-tab" v-if= "adSubTabs">
              <li>
                <nuxt-link :to="{ name: 'admin-dashboard-ads' }">
                  <img src="@/assets/img/img2-a.png" class="icon-a" />
                  <img src="@/assets/img/img2-b.png" class="icon-b" />
                  <span>Admin Ads</span>
                </nuxt-link>
              </li>
              <li>
                <nuxt-link :to="{ name: 'admin-dashboard-ads-review' }">
                  <img src="@/assets/img/img2-a.png" class="icon-a" />
                  <img src="@/assets/img/img2-b.png" class="icon-b" />
                  <span>Review Ads</span>
                </nuxt-link>
              </li>
            </ul>
          </li> -->
          <li>
            <nuxt-link :to="localePath('admin-dashboard-campaigns')">
              <img src="@/assets/img/img2-a.png" class="icon-a" />
              <img src="@/assets/img/img2-b.png" class="icon-b" />
              <span>{{ $t('campaigns') }}</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="localePath('admin-dashboard-users')">
              <img src="@/assets/img/img2-a.png" class="icon-a" />
              <img src="@/assets/img/img2-b.png" class="icon-b" />
              <span>{{ $t('users') }}</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="localePath('admin-dashboard-categories')">
              <img src="@/assets/img/img2-a.png" class="icon-a" />
              <img src="@/assets/img/img2-b.png" class="icon-b" />
              <span>{{ $t('library') }}</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="localePath('admin-dashboard-tasks')">
              <img src="@/assets/img/img2-a.png" class="icon-a" />
              <img src="@/assets/img/img2-b.png" class="icon-b" />
              <span>{{ $t('tasks') }}</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="localePath('admin-dashboard-settings')">
              <img src="@/assets/img/img-a.png" class="icon-a" />
              <img src="@/assets/img/img-b.png" class="icon-b" />
              <span>{{ $t('settings') }}</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="localePath('admin-dashboard-wallet-soldier')">
              <img src="@/assets/img/img2-a.png" class="icon-a" />
              <img src="@/assets/img/img2-b.png" class="icon-b" />
              <span>{{ $t('wallet') }}</span>
            </nuxt-link>
          </li>
          <li>
            <a @click="logout()">
              <img src="@/assets/img/img2-a.png" class="icon-a" />
              <img src="@/assets/img/img2-b.png" class="icon-b" />
              <span>{{ $t('logout') }}</span>
            </a>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: "",
      adSubTabs: false,
    };
  },
  methods: {
    checkForAdSubTab() {
      this.$route.path.indexOf("ads") != -1
        ? (this.adSubTabs = true)
        : (this.adSubTabs = false);
    },
    logout() {
      this.$auth.logout()
      this.$router.replace(this.localePath('index'))
    }
  },
  mounted() {
    this.checkForAdSubTab();
  },
  watch: {
    $route() {
      this.checkForAdSubTab();
    },
  },
};
</script>

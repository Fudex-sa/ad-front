<template>
  <div>
    <div>
      <section style="width: 100%;">
        <ul class="sidebar-menu">
          <li class="sidebar-header">
            <nuxt-link :to="{ name: 'index' }">
              <img src="@/assets/img/logo.png" />
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="localePath('soldier-dashboard')">
              <img src="@/assets/img/img1-a.png" class="icon-a" />
              <img src="@/assets/img/img1-b.png" class="icon-b" />
              <span>{{ $t('Dashboard') }}</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="localePath('soldier-dashboard-tasks')">
              <img src="@/assets/img/img2-a.png" class="icon-a" />
              <img src="@/assets/img/img2-b.png" class="icon-b" />
              <span>{{ $t('Tasks') }}</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              :to="localePath('soldier-dashboard-categories')"
              v-if="user.tasks_lvl >= 2"
            >
              <img src="@/assets/img/img2-a.png" class="icon-a" />
              <img src="@/assets/img/img2-b.png" class="icon-b" />
              <span>{{ $t('Library') }}</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="localePath('soldier-dashboard-ads')">
              <img src="@/assets/img/img2-a.png" class="icon-a" />
              <img src="@/assets/img/img2-b.png" class="icon-b" />
              <span>{{ $t('Ads') }}</span>
            </nuxt-link>
          </li>
          <!-- <li>
            <nuxt-link :to="{ name: 'soldier-dashboard-payment' }">
              <img src="@/assets/img/img2-a.png" class="icon-a" />
              <img src="@/assets/img/img2-b.png" class="icon-b" />
              <span>Payment</span>
            </nuxt-link>
          </li> -->
          <li>
            <nuxt-link :to="localePath('soldier-dashboard-wallet')">
              <img src="@/assets/img/img2-a.png" class="icon-a" />
              <img src="@/assets/img/img2-b.png" class="icon-b" />
              <span>{{ $t('Wallet') }}</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="localePath({name: 'soldier-dashboard-profile' })">
              <img src="@/assets/img/img2-a.png" class="icon-a" />
              <img src="@/assets/img/img2-b.png" class="icon-b" />
              <span>{{ $t('Profile') }}</span>
            </nuxt-link>
          </li>
          <li>
            <a @click="logout()">
              <img src="@/assets/img/img2-a.png" class="icon-a" />
              <img src="@/assets/img/img2-b.png" class="icon-b" />
              <span>{{  $t('Logout') }}</span>
            </a>
          </li>
        </ul>
      </section>
    </div>
    <!-- <ul class="settings">
        <li>
          <nuxt-link :to="{ name: 'admin-dashboard-settings' }">
            <img src="@/assets/img/img-a.png" class="icon-a">
            <img src="@/assets/img/img-b.png" class="icon-b">
            <span>Settings</span>
          </nuxt-link>
        </li>
      </ul> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: "",
    };
  },
  methods: {
    // activeTab(event, $route) {
    //   // toggle class active between list items li
    //   let active = event.target;
    //   $('event.target').addClass('active');
    //   // event.target.removeClass('active');
    //   // $('.sidebar-menu li').removeClass('active');
    //   this.path = this.$route.name;
    //   return this.path.includes($route)
    // }
    logout() {
      this.$auth.logout()
      this.$router.replace(this.localePath('index'))
    }
  },
  mounted() {
    // this.activeTab()
  },
};
</script>

<style scoped>
img {
  max-height: auto;
  max-width: auto;
}
</style>

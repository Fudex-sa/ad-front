<template>
<div>
    <!-- start wrapper -->
    <div class="admin-wrapper">
        <!-- start admin-content -->
        <div class="admin-content container p-0">
            <!-- start responsive  -->
            <Responsive />
            <!-- start left-content -->
            <div v-if="role" class="left-content col-xs-3 col-md-2 p-0" style="height:782px">
                <AdminSidebar v-if="role == 'admin'" />
                <AdvertiserSidebar v-if="role == 'advertiser'" />
                <SoldierSidebar v-if="role == 'soldier'" />
            </div>
            <!-- end left-content -->
            <!-- start right-content -->
            <div class="right-content col-xs-9 col-md-10">
                <!-- start header -->
                <DashboardHeader />
                <!-- start Page Title -->
                <PageTitle />
                <!-- start righ-content -->
                <div class="admin-page">
                    <nuxt />

                    <br v-for="(n,index) in 30" :key="index"/>
                </div>
            </div>
            <!-- end right-content -->

            
        </div>
        <!-- end admin-content -->

        
        <div class="clearfix"></div>
        <!-- start copyrights -->
        <Copyrights />
        <!-- end copyrights -->
    </div>
    <!-- end wrapper -->
</div>
</template>

<script>
const Components = {
    AdminSidebar: () =>
        import('@/components/dashboard/layouts/sidebars/AdminSidebar.vue'),
    AdvertiserSidebar: () =>
        import('@/components/dashboard/layouts/sidebars/AdvertiserSidebar.vue'),
    SoldierSidebar: () =>
        import('@/components/dashboard/layouts/sidebars/SoldierSidebar.vue'),
    Copyrights: () => import('@/components/dashboard/layouts/Copyrights.vue'),
    Responsive: () => import('@/components/dashboard/layouts/Responsive.vue'),
    DashboardHeader: () =>
        import('@/components/dashboard/layouts/DashboardHeader.vue'),
    PageTitle: () => import('@/components/dashboard/layouts/PageTitle.vue'),
}

export default {

     head() {
    return {
      htmlAttrs: {
        dir: this.$i18n.locale == "ar" ? "rtl" : "ltr",
      },
      link: this.loadStyles(),
    };
  },
  
    components: Components,
    data() {
        return {
           // role: null
        }
    },

    beforeMount() {
        // this.page = this.page.substring(this.page.lastIndexOf('/')+1)
        // console.log(this.role)
        //this.role = this.$auth.state.user.role
        console.log('rrr:', this.role)
        if(this.role == null)
            this.$router.push({
             path: `/${this.$i18n.locale}/auth/login`,
           });
        this.setNotifications()
    },

    updated() {
        this.setNotifications()
    },

    methods: {

        loadStyles() {
      if (this.$i18n.locale == "ar") {
      
        return [
          {
            rel: "stylesheet",
            href: "/css/bootstrap-rtl.min.css",
            body: true
          },
          { rel: "stylesheet", href: "/css/rtl.css" , body: true},
        ];
      }
    },
        setNotifications() {
            this.$axios
                .$get('notifications')
                .then((res) => {
                    this.$store.dispatch('setNotifications', res)
                })
                .catch((err) => {
                    error({
                        statusCode: err.status,
                        message: err.message
                    })
                })
        },
    },
}
</script>
<style scoped>
.mobile-preview .desktop-frame1, .mobile-preview .mobile-frame1{
    max-width: 190px;
}
.mobile-preview .desktop-frame1 {
    max-width: 350px;
}
</style>
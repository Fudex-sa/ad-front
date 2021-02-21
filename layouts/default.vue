<template>
  <div>
    {{ hassan }}
    <Header />
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/front/layout/Header";
import Footer from "@/components/front/layout/Footer";
export default {
  head() {
    return {
      htmlAttrs: {
        dir: this.$i18n.locale == "ar" ? "rtl" : "ltr",
      },
      link: this.loadStyles(),
    };
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
  },
  // data(){
  //   return {
  //     direction: 'ltr'
  //   }
  // },
  // head: {
  //   // this htmlAttrs you need
  //   htmlAttrs: {
  //     lang: "ar",
  //     'data-w-lama': this.direction
  //     // dir: this.direction
  //   },
  // },
  components: {
    Header,
    Footer,
  },
  mounted() {
    // this.dir=  this.$i18n.locale
  },
};
</script>

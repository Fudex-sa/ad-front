<template>
   <div class="text-center p-4 auto-center-success">
   

     <img class="success-icon" src="@/assets/img/success.png" />

      <h1>Success Payment</h1>

      <nuxt-link class="btn btn-success mb-20 mt-30 " to="/advertiser/dashboard/ads">Return to Ads page.</nuxt-link>

   </div>
</template>


<script>
export default {
    data(){
        return {
            paymentId: ""
        }
    },
     mounted() {
        this.getPaymentId();
    },
    methods:{


getPaymentId(){

    console.log(this.$route.query.resourcePath)
    this.paymentId = this.$route.query.id;
}

    }




}
</script>
<style scoped>
.success-icon{
        width: 100px;
    border-radius: 50%;
}
.auto-center-success{
    margin: 8rem;
}
</style>
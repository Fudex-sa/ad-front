<template>
  <div class="row">
 <div class="col-sm-4">
 <h4>Payment Details:</h4>

<p>
 Advertisement Title: {{ ad.title }}
 </p>
 <p>
 Advertisement Budget: {{ ad.budget }} SAR
 </p>
<p>
 Start Date: {{ ad.start_date }}
 </p>

 <p>
 Advertisement Content: <br /> 
 <span> {{ ad.content }}</span>
 </p>
 </div>
 <div class="col-sm-8">
    <Payment />
 </div>
 
  </div>
</template>

<script>
import Payment from "@/components/dashboard/payment-form";
export default {
  components: {
    Payment
  },
  middleware: "auth",
  layout: "dashboard",

   async asyncData({app, params, error, route}) {
     console.log(params)
            try {
                let response = await app.$axios.$get(`ads/${route.query.advertisementId}`);
                return {
                    ad: response.data
                }
             } catch(e) {
                 error({statusCode:e.status, message:e.message})
             }
        }

};
</script>

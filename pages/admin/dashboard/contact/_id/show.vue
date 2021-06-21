<template>
  <div class="row">
    <div class="fixed alert alert-success" v-if="successMessage">{{ successMessage }}</div>
    
    <div class="col-sm-12">
      <div class="form-group dash-group">
        <label>Sender name: </label>
        <input class="form-control dash-input" readonly  type="text" v-model="form.name"/>        
      </div>
    </div>
    
    <div class="col-sm-12">
      <div class="form-group dash-group">
        <label>Sender email: </label>
        <input class="form-control dash-input" readonly type="text" v-model="form.email"/>        
      </div>
    </div>

    <div class="col-sm-12">
      <div class="form-group dash-group">
        <label>Subject: </label>
        <input class="form-control dash-input" readonly type="text" v-model="form.subject"/>        
      </div>
    </div>

    <div class="col-sm-12">
      <div class="form-group dash-group">
        <label>Message: </label>
        <textarea class="form-control dash-input" readonly v-model="form.message"></textarea>
      </div>
    </div>

    
    
    <div class="col-sm-12">
      <div class="form-group dash-group">
        <label>Reply: </label>
        <textarea class="form-control dash-input" v-model="form.reply"></textarea>
      </div>
    </div>


    
    

   
    <div class="col-sm-12 text-right">
      <button class="the-btn2 hvr-radial-out" @click="$router.back()">Cancel</button>
      <button class="the-btn hvr-radial-out" v-if="form.reply==''" @click="handleSubmition">Send reply</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {},
      successMessage: "",
    };
  },
  layout: "dashboard",
  middleware: ["auth", "admin"],
  async asyncData({ app, params }) {
	let response = await app.$axios.$get(`contact/${params.id}`);
	
	
    return {
      form: response.data.data,
    };
  },

  methods: {
    handleSubmition() {
      this.$axios
        .$post(`contact/${this.$route.params.id}`, this.form)
        .then((res) => {
          this.successMessage = res.data.message;
          setTiemout(() => {
            this.$router.back();
          }, 1500);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

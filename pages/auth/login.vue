<template>
  <div class="internal-page">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <div class="title title2">
            <h2>Login</h2>
            <p>Enter Your Data to Continue</p>
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
                  placeholder="Enter Your Email"
                  v-model="form.email"
                />
                <p class="text-danger pl-4" v-for="error in errors.email" :key="error">{{error}}</p>
              </div>

              <div class="form-group">
                <input
                  :class=" { 'is-invalid' : errors.password} "
                  type="password"
                  class="form-control the-input"
                  placeholder="Enter password"
                  v-model="form.password"
                />
                <p class="text-danger pl-4" v-for="error in errors.password" :key="error">{{error}}</p>
              </div>
              <div class="checkbox form-group2">
                <label>
                  <input type="checkbox" /> Remember me
                </label>
                <nuxt-link :to="{ name: 'auth-forget'}" class="forgot">Forgot Password !</nuxt-link>
              </div>
              <div class="form-group">
                <input type="submit" class="btn the-btn btn-block hvr-radial-out" value="Login"></input>
              </div>
              <div class="form-group text-center">
                <p class="color2">
                  Don’t have an account ?
                  <nuxt-link :to="{name: 'auth-register'}" class="color1">Sign up</nuxt-link>
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
  methods: {
    login() {
      try {
         this.$auth.loginWith("local", {
          data: this.form,
        }).then(()=>{
           this.$router.push({
             path: "/" + this.$auth.state.user.role + "/dashboard",
           });
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
  },
};
</script>

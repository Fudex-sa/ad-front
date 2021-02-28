<template>
    <div class="internal-page">
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <div class="title title2">
                        <h2>{{ $t('Reset Password') }}</h2>
                        <p>{{$t('Enter Your Data to Continue') }}</p>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="layout1">
                            <p class="lead text-danger">{{successMessage}}</p>
                            <form>
                                <div class="form-group">
                                    <input v-model="form.email" type="text" :class="{ 'is-invalid' : errors.email }"class="form-control the-input" :placeholder="$t('Enter Your Email')">
                                </div>
                                <div class="form-group">
                                    <button type="submit" class="btn the-btn btn-block hvr-radial-out" @click.prevent="forget">{{ $t('Send Password Reset Link') }}</button>
                                </div>
                                <div class="form-group text-center">
                                    <p class="color2">{{ $t('Dont have an account') }} ? <nuxt-link :to="localePath('auth-register')" class="color1">{{ $t('Sign up') }}</nuxt-link></p>
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
                form : {
                    email: ''
                },
                successMessage: ''
            }
        },
         methods: {
            forget() {
                this.$axios.$post('auth/forgot-password',this.form).then(res => {
                    this.successMessage = res.data.message
                })
            }
        }
    }
</script>
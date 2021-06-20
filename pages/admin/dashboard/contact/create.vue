<template>
	<div class="row">
    <div class="fixed alert alert-success" v-if="successMessage">{{successMessage}}</div>
    
     <div class="col-sm-12">
        <div class="form-group dash-group">
            <label>{{$t('picture')}} *</label>
            <input  accept="image/*" class="form-control dash-input" ref='picture' type="file" @change="onFileChange" :class="{ 'is-invalid' : errors.picture}">
            <p class="text-danger p-2" v-for="error in errors.picture" :key="error">{{error}}</p>
        </div>
    </div>
   <div class="col-sm-12 text-right">
        <button class="the-btn2 hvr-radial-out" @click="$router.back()">Cancel</button>
        <button class="the-btn hvr-radial-out" @click="saveRecord">{{$t('save')}}</button>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
				record: {},
                successMessage:''
			}
    },
    methods: {
          saveRecord(){
                let formData = new FormData();
                //formData.append('picture', this.record.picture);
                for ( var key in this.record ) {
                    formData.append(key, this.record[key]);
                }

                this.$axios.$post(`partners`, formData,{'content-type': 'multipart/form-data'})
                .then(res => {
                    this.successMessage = res.data.message
                    setTiemout(() => {
                        this.$router.back()
                    }, 1500);
                }).catch(err => {
                    console.log(err)
                });
            },

            onFileChange(e) {
                this.record.picture = this.$refs.picture.files[0];
                console.log(this.record.picture);
            }
    },
    middleware: [
        'auth',
        'admin'
    ],
    layout: 'dashboard',

}
</script>

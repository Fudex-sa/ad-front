<template>
	<div class="row">
    <div class="fixed alert alert-danger" v-if="successMessage">{{successMessage}}</div>
    
    <div class="col-sm-12">
        <div class="form-group dash-group">
            <label>{{$t('line1_ar')}} *</label>
            <input class="form-control dash-input" type="text" v-model="record.line1_ar" :class="{ 'is-invalid' : errors.line1_ar}">
            <p class="text-danger p-2" v-for="error in errors.line1_ar" :key="error">{{error}}</p>
        </div>
    </div>

    <div class="col-sm-12">
        <div class="form-group dash-group">
            <label>{{$t('line1_en')}} *</label>
            <input class="form-control dash-input" type="text" v-model="record.line1_en" :class="{ 'is-invalid' : errors.line1_en}">
            <p class="text-danger p-2" v-for="error in errors.line1_en" :key="error">{{error}}</p>
        </div>
    </div>


    <div class="col-sm-12">
        <div class="form-group dash-group">
            <label>{{$t('line2_ar')}} *</label>
            <input class="form-control dash-input" type="text" v-model="record.line2_ar" :class="{ 'is-invalid' : errors.line2_ar}">
            <p class="text-danger p-2" v-for="error in errors.line2_ar" :key="error">{{error}}</p>
        </div>
    </div>

    
    <div class="col-sm-12">
        <div class="form-group dash-group">
            <label>{{$t('line2_en')}} *</label>
            <input class="form-control dash-input" type="text" v-model="record.line2_en" :class="{ 'is-invalid' : errors.line2_en}">
            <p class="text-danger p-2" v-for="error in errors.line2_en" :key="error">{{error}}</p>
        </div>
    </div>




    <div class="col-sm-12">
        <div class="form-group dash-group">
            <label>{{$t('line3_ar')}} *</label>
            <input class="form-control dash-input" type="text" v-model="record.line3_ar" :class="{ 'is-invalid' : errors.line3_ar}">
            <p class="text-danger p-2" v-for="error in errors.line3_ar" :key="error">{{error}}</p>
        </div>
    </div>

    <div class="col-sm-12">
        <div class="form-group dash-group">
            <label>{{$t('line3_en')}} *</label>
            <input class="form-control dash-input" type="text" v-model="record.line3_en" :class="{ 'is-invalid' : errors.line3_en}">
            <p class="text-danger p-2" v-for="error in errors.line3_en" :key="error">{{error}}</p>
        </div>
    </div>

    <div class="col-sm-12">
        <div class="form-group dash-group">
            <label>{{$t('button_link_ar')}} *</label>
            <input class="form-control dash-input" type="text" v-model="record.button_link_ar" :class="{ 'is-invalid' : errors.button_link_ar}">
            <p class="text-danger p-2" v-for="error in errors.button_link_ar" :key="error">{{error}}</p>
        </div>
    </div>

    <div class="col-sm-12">
        <div class="form-group dash-group">
            <label>{{$t('button_link_en')}} *</label>
            <input class="form-control dash-input" type="text" v-model="record.button_link_en" :class="{ 'is-invalid' : errors.button_link_en}">
            <p class="text-danger p-2" v-for="error in errors.button_link_en" :key="error">{{error}}</p>
        </div>
    </div>

    <div class="col-sm-12">
        <div class="form-group dash-group">
            <label>{{$t('button_text_ar')}} *</label>
            <input class="form-control dash-input" type="text" v-model="record.button_text_ar" :class="{ 'is-invalid' : errors.button_text_ar}">
            <p class="text-danger p-2" v-for="error in errors.button_text_ar" :key="error">{{error}}</p>
        </div>
    </div>

    <div class="col-sm-12">
        <div class="form-group dash-group">
            <label>{{$t('button_text_en')}} *</label>
            <input class="form-control dash-input" type="text" v-model="record.button_text_en" :class="{ 'is-invalid' : errors.button_text_en}">
            <p class="text-danger p-2" v-for="error in errors.button_text_en" :key="error">{{error}}</p>
        </div>
    </div>


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

                this.$axios.$post(`slider`, formData,{'content-type': 'multipart/form-data'})
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

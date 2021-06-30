<template>
	<div class="row">
    <div class="fixed alert alert-success" v-if="successMessage">{{successMessage}}</div>
    <div class="col-sm-12">
        <div class="form-group dash-group">
            <label>{{$t('title_ar')}} *</label>
            <input class="form-control dash-input" type="text" v-model="record.title_ar" :class="{ 'is-invalid' : errors.title_ar}">
            <p class="text-danger p-2" v-for="error in errors.title_ar" :key="error">{{error}}</p>
        </div>
    </div>

    <div class="col-sm-12">
        <div class="form-group dash-group">
            <label>{{$t('title_en')}} *</label>
            <input class="form-control dash-input" type="text" v-model="record.title_en" :class="{ 'is-invalid' : errors.title_en}">
            <p class="text-danger p-2" v-for="error in errors.title_en" :key="error">{{error}}</p>
        </div>
    </div>


    <div class="col-sm-12">
        <div class="form-group dash-group">
            <label>{{$t('desc_ar')}} *</label>            
            <textarea class="form-control dash-input" type="text" v-model="record.desc_ar" :class="{ 'is-invalid' : errors.desc_ar}"></textarea>
            <p class="text-danger p-2" v-for="error in errors.desc_ar" :key="error">{{error}}</p>
        </div>
    </div>

    
    <div class="col-sm-12">
        <div class="form-group dash-group">
            <label>{{$t('desc_en')}} *</label>            
            <textarea class="form-control dash-input" type="text" v-model="record.desc_en" :class="{ 'is-invalid' : errors.desc_en}"></textarea>
            <p class="text-danger p-2" v-for="error in errors.desc_en" :key="error">{{error}}</p>
        </div>
    </div>

    
    <div class="col-sm-12">
        <div class="form-group dash-group">
            <label>{{$t('content_ar')}} *</label>            
            <textarea class="form-control dash-input" type="text" v-model="record.content_ar" :class="{ 'is-invalid' : errors.content_ar}"></textarea>
            <p class="text-danger p-2" v-for="error in errors.content_ar" :key="error">{{error}}</p>
        </div>
    </div>

    
    <div class="col-sm-12">
        <div class="form-group dash-group">
            <label>{{$t('content_en')}} *</label>            
            <textarea class="form-control dash-input" type="text" v-model="record.content_en" :class="{ 'is-invalid' : errors.content_en}"></textarea>
            <p class="text-danger p-2" v-for="error in errors.content_en" :key="error">{{error}}</p>
        </div>
    </div>


    <div class="col-sm-12">
        <div class="form-group dash-group">
            <label>{{$t('type')}} *</label>            
            
            <select class='form-control' v-model="record.type" :class="{ 'is-invalid' : errors.type}">
                <option value="services">{{$t('services')}}</option>
                <option value="footer_col_1">{{$t('footer_col_1')}}</option>
                <option value="footer_col_2">{{$t('footer_col_2')}}</option>
                <option value="footer_col_3">{{$t('footer_col_3')}}</option>
                <option value="navbar">{{$t('navbar')}}</option>
                <option value="others">{{$t('others')}}</option>
            </select>
            <p class="text-danger p-2" v-for="error in errors.type" :key="error">{{error}}</p>
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
		layout: 'dashboard',
		middleware: ['auth', 'admin'],
		async asyncData({ app, params }) {
			let response = await app.$axios.$get(`/pages/${params.id}`)
			return {
				record: response.data.data,
			}
		},
        methods:{
            saveRecord(){
                let formData = new FormData();
                //formData.append('picture', this.record.picture);
                for ( var key in this.record ) {
                    formData.append(key, this.record[key]);
                }

                this.$axios.$post(`pages/${this.$route.params.id}`, formData,{'content-type': 'multipart/form-data'})
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
            }

           

        }
	}
</script>

<template>
    <div>
        <div class="clients">
            <div class="container">
                <div class="row ten-columns">
                    <div class="col-sm-12">
                        <div class="title">
                            <h2>{{ $t('our_happy_clients') }}</h2>
                            <p>{{ $t('we_are_proud_of_our_partner') }}</p>
                        </div>
                    </div>

                    <div v-for='partner in partners' :key='partner.id' class="col-sm-2">
                        <div class="client">
                            <img :src="partner.picture">
                        </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        props:['partners']
    }

</script>
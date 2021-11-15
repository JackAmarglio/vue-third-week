<template>
    <v-main>
        <div class="root">
            <h2>Каталог</h2>
            <v-tabs
                background-color="transparent"
                color="#FF2D34"
                height="50"
                class="mt-5"
            >
                <v-tab> Категории </v-tab>
                <v-tab> Продукты </v-tab>
                <v-tab> Акции </v-tab>
                <v-tab-item>
                    <Category />
                </v-tab-item>
                <v-tab-item>
                    <Product />
                </v-tab-item>
                <v-tab-item>
                    <Promo />
                </v-tab-item>
            </v-tabs>
        </div>
    </v-main>
</template>

<script>
import Category from "../components/catalogue/category";
import Product from "../components/catalogue/product";
import Promo from "../components/catalogue/promo";
export default {
    components:{
        Category,
        Product,
        Promo
    },
    mounted() {

    },
    methods: {

    },
    data() {
        return {
        }
    },
    created() {
        this.$store.dispatch("getCatalogue");
    },
}
</script>

<style>
.v-slide-group__content.v-tabs-bar__content{
    border-bottom:2px solid #E6E7E8;
    margin-bottom:3px;
}
.absolute{
    position: absolute;
}
.r-0{
    right:0px;
}
.v-window{
    overflow: inherit;
}
</style>

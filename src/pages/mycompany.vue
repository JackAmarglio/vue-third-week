<template>
    <v-main>
        <div class="root">
            <h2>Моя компания</h2>
            <v-tabs
                background-color="transparent"
                color="#FF2D34"
                height="50"
                class="mt-5"
            >
                <v-tab> Информация </v-tab>
                <v-tab> Адреса </v-tab>
                <v-tab> Доставка </v-tab>
                <v-tab-item>
                    <Information />
                </v-tab-item>
                <v-tab-item>
                    <Address />
                </v-tab-item>
                <v-tab-item>
                    <Delivery />
                </v-tab-item>
            </v-tabs>
        </div>
    </v-main>
</template>

<script>
import Information from "../components/company/information";
import Address from "../components/company/address";
import Delivery from "../components/company/delivery";
export default {
    components: {
        Information,
        Address,
        Delivery,
    },
    data() {
        return {};
    },
    computed: {},
    mounted() {},
    created() {
        this.$store.dispatch("getCompany");
    },
};
</script>

<style>
.v-main {
    background: #fafafa;
}
.root {
    padding: 30px 20px 10px;
}
.root h2 {
    font-weight: 700;
}
.v-tab {
    text-transform: none;
    letter-spacing: 0.3px;
    width: 120px !important;
}
.v-tabs-items {
    background-color: transparent !important;
    margin-top: 20px;
}
</style>

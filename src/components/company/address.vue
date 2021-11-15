<template>
    <div style="height:550px">
        <aboutCompanyLabel :status="status" />
        <div v-if="status === 2" class="reject-reason">
            <v-expansion-panels multiple :value="[0, 1]">
                <v-expansion-panel>
                    <v-expansion-panel-header>Причина отклонения</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <span class="normal-text">
                            {{declined_reason}}
                        </span>
                        <v-row v-if="declined_images">
                            <v-col
                                md="2"
                                sm="4"
                                xs="6"
                                v-for="(url, index) in declined_images"
                                :key="index"
                                class="relative"
                            >
                                <v-img
                                    style="cursor: pointer"
                                    :lazy-src="url"
                                    :src="url"
                                    @click="
                                        rejectImageGalleryIndex = index;
                                        rejectImageGalleryShow = true;
                                    "
                                    height="160"
                                >
                                </v-img>
                            </v-col>
                        </v-row>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
            <vue-easy-lightbox
                :visible="rejectImageGalleryShow"
                :imgs="declined_images"
                @hide="rejectImageGalleryShow = false"
                :index="rejectImageGalleryIndex"
            ></vue-easy-lightbox>
        </div>
        <v-row class="mt-6 mb-2">
            <v-col lg="6" md="12" sm="12">
                <p class="mb-2">Основной адрес</p>
                <vue-dadata
                    placeholder="Введите адрес"
                    :query="address"
                    token="60d2678d4b84bf022b27ee643f49d1b1f86290b8"
                    :onChange="addressChange"
                    :locationOptions="locations"
                ></vue-dadata>
            </v-col>
            <v-col lg="6" md="12" sm="12">
                <p class="mb-2">Адрес компании</p>
                <vue-dadata
                    placeholder="Введите адрес"
                    :query="legal_address"
                    token="60d2678d4b84bf022b27ee643f49d1b1f86290b8"
                    :onChange="legalAddressChange"
                    :locationOptions="locations"
                ></vue-dadata>
            </v-col>
        </v-row>
        <div class="mt-3 flex-layout" style="position: relative">
            <v-btn
                dark
                height="50"
                width="300"
                color="red"
                @click="requestDialog = true"
                depressed
                ><span style="text-transform: none">Отправить запрос</span></v-btn
            >
            <span class="ml-5 mt-1 grey-text"
                >После запроса изменения, данные<br />будут отправлены на модерацию.</span
            >
        </div>
        <v-dialog v-model="requestDialog" width="500">
            <v-card>
                <v-card-title class="headline">
                    <v-icon class="mr-2">mdi-pencil</v-icon>
                    Заявка на модерацию
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text class="mt-2" style="padding-bottom: 4px"
                    >Введите причину изменения</v-card-text
                >
                <v-textarea
                    class="ml-5 mr-5 mb-4"
                    hide-details
                    outlined
                    placeholder="Введите текст..."
                    color="#414042"
                    v-model="requestComment"
                ></v-textarea>
                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        outlined
                        @click="requestDialog = false"
                        color="#7d7d7d"
                        class="normal-text"
                        width="120"
                        height="40"
                    >
                        Отменить
                    </v-btn>
                    <v-btn
                        dark
                        @click="sendReviseRequest"
                        color="red"
                        class="normal-text"
                        width="120"
                        height="40"
                        depressed
                    >
                        Отправить
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import aboutCompanyLabel from "./aboutCompanyLabel";
import VueDadata from "@fivestarsmobi/vue-dadata";
import VueEasyLightbox from "vue-easy-lightbox";
export default {
    components: {
        aboutCompanyLabel,
        "vue-dadata": VueDadata,
        VueEasyLightbox
    },
    data() {
        return {
            address: this.$store.state.address.address,
            legal_address: this.$store.state.address.legal_address,
            declined_reason: this.$store.state.address.declined_reason,
            declined_images: this.$store.state.address.declined_images,
            status: null,
            requestComment: null,
            requestDialog: false,

            locations:{
                language: "ru",
                locations: [
                    {
                        "region_fias_id": "29251dcf-00a1-4e34-98d4-5c47484a36d4",
                    },
                    {
                        "region": "Москва"
                    },
                ]
            },

            rejectImageGalleryShow: false,
            rejectImageGalleryIndex: null
        };
    },
    methods: {
        sendReviseRequest() {
            if (!this.requestComment){
                this.$store.commit('setAlert', {
                    show: true,
                    text: 'Пожалуйста добавьте причину изменения!'
                })
                return;
            }
            let data = {
                address: this.address,
                request_comment: this.requestComment,
            };
            if (this.legal_address && this.legal_address.trim() !== ''){
                data.legal_address = this.legal_address
            }
            this.requestDialog = false;
            this.$store.dispatch("reviseCompanyAddress", data).then(() => {
                this.requestComment = null;
                this.$store.dispatch("getCompany");
            }).catch(err =>{
                this.$store.commit("setAlert", {
                    show: true,
                    text: err,
                });
                return;
            });
        },
        addressChange(data){
            this.address = data.value
        },
        legalAddressChange(data){
            this.legal_address = data.value
        }
    },
    mounted() {
        this.address = this.$store.state.address
            ? this.$store.state.address.address
            : null;
        this.legal_address = this.$store.state.address
            ? this.$store.state.address.legal_address
            : null;
        this.status = this.$store.state.address
            ? this.$store.state.address.status
            : null;
    },
    watch: {
        "$store.state.address": function () {
            this.address = this.$store.state.address
                ? this.$store.state.address.address
                : null;
            this.legal_address = this.$store.state.address
                ? this.$store.state.address.legal_address
                : null;
            this.status = this.$store.state.address
                ? this.$store.state.address.status
                : null;
        }
    },
};
</script>
<style scoped>
.address-input-highlight{
    color: black;
}
</style>
<style>
.vue-dadata__input{
    border-color: #7e8082 !important;
}
.vue-dadata__input:focus{
    border-color: #000 !important;
    border: 2px solid;
    box-shadow: none !important;
}
.vue-dadata__suggestions {
    position: absolute;
    z-index: 999;
}
</style>

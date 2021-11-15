<template>
    <div>
        <div class="top-btn-group">
            <v-btn
                text
                class="normal-text mr-3"
                height="35"
                color="red"
                style="font-size: 10pt"
                v-show="deleteButtonShow"
                @click="deleteButtonClick"
            >
                <v-icon size="18" class="mr-2">mdi-delete-outline</v-icon>
                Удалить
            </v-btn>
            <v-btn
                text
                class="normal-text mr-3"
                height="35"
                color="red"
                style="font-size: 10pt"
                v-show="cancelButtonShow"
                @click="view(1)"
            >
                <v-icon size="18" class="mr-2">mdi-close</v-icon>
                Отменить
            </v-btn>
            <v-btn
                outlined
                class="normal-text"
                height="40"
                width="170"
                color="red"
                style="bottom: 2px"
                @click="view(3)"
                v-show="addButtonShow"
                >+ Добавить</v-btn
            >
        </div>
        <div v-if="listShow || generalShow">
            <div class="header-text pa-2">
                <v-btn
                    :text="generalButtonText"
                    class="normal-text"
                    height="45"
                    @click="view(0)"
                    :outlined="generalButtonOutline"
                    :color="generalButtonColor"
                    ><span class="bold">Общее</span></v-btn
                >
                <v-btn
                    :text="productButtonText"
                    :outlined="productButtonOutline"
                    :color="productButtonColor"
                    class="normal-text ml-4"
                    height="45"
                    @click="view(1)"
                    ><span class="bold">Продукты</span></v-btn
                >
            </div>
            <div class="pt-5" v-show="listShow">
                <v-row
                    class="mt-1"
                    v-for="(promo, index) in promos"
                    :key="index"
                >
                    <v-col md="7" class="pt-0 pb-0">{{
                        promo.product.name
                    }}</v-col>
                    <v-col md="2" class="pt-0 pb-0">
                        <v-badge
                            dot
                            :color="getColorByStatus(promo.status)"
                            left
                            offset-x="-7"
                            offset-y="-1"
                            class="mr-2"
                        ></v-badge>
                        <span>{{ getTextByStatus(promo.status) }}</span>
                    </v-col>
                    <v-col md="2" class="pt-0 pb-0">
                        <v-btn
                            style="margin-top: -5px"
                            text
                            @click="viewItem(promo)"
                        >
                            Перейти
                        </v-btn>
                    </v-col>
                    <v-col md="1" class="pt-0 pb-0">
                        <v-btn
                            style="margin-top: -5px"
                            icon
                            color="#BCBEC0"
                            @click="deleteItem(promo.id)"
                        >
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col cols="12">
                        <v-divider></v-divider>
                    </v-col>
                </v-row>
            </div>
            <div v-if="generalShow">
                <div class="pt-10">
                    <div class="flex-layout">
                        <h3>Описание всех акций</h3>
                        <span style="margin-left:auto">
                            <v-badge
                                dot
                                :color="
                                    getColorByStatus(promoInformationStatus)
                                "
                                left
                                offset-x="-7"
                                offset-y="-1"
                                class="mr-2"
                            ></v-badge>
                            <span>{{
                                getTextByStatus(promoInformationStatus)
                            }}</span>
                        </span>
                    </div>
                    <div v-if="promoInformationStatus === 2" class="reject-reason">
                        <v-expansion-panels multiple :value="[0, 1]">
                            <v-expansion-panel>
                                <v-expansion-panel-header>Причина отклонения</v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <span class="normal-text">
                                        {{promoInformationDeclinedReason}}
                                    </span>
                                    <v-row v-if="promoInformationDeclinedImages">
                                        <v-col
                                            md="2"
                                            sm="4"
                                            xs="6"
                                            v-for="(url, index) in promoInformationDeclinedImages"
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
                            :imgs="promoInformationDeclinedImages"
                            @hide="rejectImageGalleryShow = false"
                            :index="rejectImageGalleryIndex"
                        ></vue-easy-lightbox>
                    </div>
                    <tiptap-vuetify
                        placeholder="Введите описание акций"
                        class="mt-1"
                        v-model="promoInformation"
                        :extensions="extensions"
                    />
                </div>
                <div class="mt-10 flex-layout">
                    <v-btn
                        dark
                        height="50"
                        width="300"
                        color="red"
                        @click="reviseInformationDialog = true"
                        depressed
                        ><span style="text-transform: none"
                            >Отправить запрос</span
                        ></v-btn
                    >
                    <span class="ml-5 mt-1 grey-text"
                        >После запроса изменения, данные<br />будут отправлены на модерацию.</span
                    >
                </div>
                <v-dialog
                    v-model="reviseInformationDialog"
                    width="500"
                >
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
                            placeholder="Введите текст"
                            color="#414042"
                            v-model="reviseInformationComment"
                        ></v-textarea>
                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                outlined
                                @click="reviseInformationDialog = false"
                                color="#7d7d7d"
                                class="normal-text"
                                width="120"
                                height="40"
                            >
                                Отменить
                            </v-btn>
                            <v-btn
                                dark
                                @click="sendReviseInformationRequest"
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
        </div>
        <div v-if="detailShow" class="mt-4">
            <div class="header-text mt-6">
                <h3 class="mr-10">Изменить акцию</h3>
                <v-badge
                    dot
                    :color="getColorByStatus(detailItem.status)"
                    offset-x="-20"
                    offset-y="20"
                ></v-badge>
                <span class="text">{{
                    getTextByStatus(detailItem.status)
                }}</span>
            </div>
            <div v-if="detailItem.status === 2" class="reject-reason">
                <v-expansion-panels multiple :value="[0, 1]">
                    <v-expansion-panel>
                        <v-expansion-panel-header>Причина отклонения</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <span class="normal-text">
                                {{detailItem.declined_reason}}
                            </span>
                            <v-row v-if="detailItem.declined_images">
                                <v-col
                                    md="2"
                                    sm="4"
                                    xs="6"
                                    v-for="(url, index) in detailItem.declined_images"
                                    :key="index"
                                    class="relative"
                                >
                                    <v-img
                                        style="cursor: pointer"
                                        :lazy-src="url"
                                        :src="url"
                                        @click="
                                            rejectDetailItemImageGalleryIndex = index;
                                            rejectDetailItemImageGalleryShow = true;
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
                    :visible="rejectDetailItemImageGalleryShow"
                    :imgs="detailItem.declined_images"
                    @hide="rejectDetailItemImageGalleryShow = false"
                    :index="rejectDetailItemImageGalleryIndex"
                ></vue-easy-lightbox>
            </div>
            <v-row class="mt-4">
                <v-col md="12">
                    <span>Продукт, участвующий в акции</span>
                    <v-autocomplete
                        hide-details
                        outlined
                        placeholder="Выберите продукт"
                        dense
                        color="#414042"
                        :items="detailItemProductList"
                        v-model="detailItemProductName"
                    >
                    </v-autocomplete>
                </v-col>
                <v-col md="6" sm="6" xs="10">
                    <span>Старая цена, ₽</span>
                    <v-text-field
                        hide-details
                        outlined
                        dense
                        color="#414042"
                        readonly
                        v-model="detailItemOldPrice"
                    ></v-text-field>
                </v-col>
                <v-col md="6" sm="6" xs="10">
                    <span>Новая цена, ₽</span>
                    <v-text-field
                        hide-details
                        outlined
                        dense
                        color="#414042"
                        v-model="detailItemNewPrice"
                        type="number"
                    ></v-text-field>
                </v-col>
            </v-row>
            <div class="mt-10 flex-layout" style="position: relative">
                <v-btn
                    dark
                    height="50"
                    width="300"
                    color="red"
                    @click="reviseRequestDialog = true"
                    depressed
                    ><span style="text-transform: none"
                        >Отправить запрос</span
                    ></v-btn
                >
                <span class="ml-5 mt-1 grey-text"
                    >После запроса изменения, данные<br />будут отправлены на модерацию.</span
                >
            </div>
            <v-dialog v-model="reviseRequestDialog" width="500">
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
                        v-model="reviseRequestComment"
                    ></v-textarea>
                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            outlined
                            @click="reviseRequestDialog = false"
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
        <div v-if="addShow" class="mt-4">
            <div class="header-text mt-6">
                <h3 class="mr-10">Добавить акцию</h3>
            </div>
            <v-row class="mt-4">
                <v-col md="12">
                    <span>Продукт, участвующий в акции</span>
                    <v-autocomplete
                        hide-details
                        outlined
                        placeholder="Выберите продукт"
                        dense
                        color="#414042"
                        :items="newItemProductList"
                        v-model="newItemProductName"
                        @change="newItemProductChangeHandler"
                    >
                    </v-autocomplete>
                </v-col>
                <v-col md="6" sm="6" xs="10">
                    <span>Старая цена, ₽</span>
                    <v-text-field
                        hide-details
                        outlined
                        dense
                        color="#414042"
                        readonly
                        v-model="newItemOldPrice"
                    ></v-text-field>
                </v-col>
                <v-col md="6" sm="6" xs="10">
                    <span>Новая цена, ₽</span>
                    <v-text-field
                        hide-details
                        outlined
                        dense
                        color="#414042"
                        v-model="newItemNewPrice"
                        type="number"
                    ></v-text-field>
                </v-col>
            </v-row>
            <div class="mt-10 flex-layout" style="position: relative">
                <v-btn
                    dark
                    height="50"
                    width="300"
                    color="red"
                    @click="newRequestDialog = true"
                    depressed
                    ><span style="text-transform: none"
                        >Отправить запрос</span
                    ></v-btn
                >
                <span class="ml-5 mt-1 grey-text"
                    >После запроса изменения, данные<br />будут отправлены на модерацию.</span
                >
            </div>
            <v-dialog v-model="newRequestDialog" width="500">
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
                        v-model="newRequestComment"
                    ></v-textarea>
                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            outlined
                            @click="newRequestDialog = false"
                            color="#7d7d7d"
                            class="normal-text"
                            width="120"
                            height="40"
                        >
                            Отменить
                        </v-btn>
                        <v-btn
                            dark
                            @click="sendAddRequest"
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
        <v-dialog v-model="deleteConfirmDialog" width="500">
            <v-card>
                <v-card-title class="headline">
                    <v-icon class="mr-2">mdi-delete</v-icon>
                    Подтверждение
                </v-card-title>
                <v-divider></v-divider>
                <p class="pa-10">Вы уверены, что хотите удалить эту акцию?</p>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        outlined
                        @click="deleteConfirmDialog = false"
                        color="#7d7d7d"
                        class="normal-text"
                        width="120"
                        height="40"
                    >
                        Нет
                    </v-btn>
                    <v-btn
                        dark
                        @click="confirmDelete"
                        color="red"
                        class="normal-text"
                        width="120"
                        height="40"
                        depressed
                    >
                        Да
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Code, Paragraph, BulletList, OrderedList, ListItem, Link, Blockquote, HardBreak, HorizontalRule, History } from 'tiptap-vuetify'
import VueEasyLightbox from "vue-easy-lightbox";
export default {
    components: {
        TiptapVuetify,
        VueEasyLightbox
    },
    data() {
        return {
            promos: [],
            active_products_without_promo: [],

            listShow: true,
            detailShow: false,
            generalShow: false,
            addShow: false,

            addButtonShow: true,
            deleteButtonShow: false,
            cancelButtonShow: false,

            generalButtonColor: "#BCBEC0",
            generalButtonOutline: false,
            generalButtonText: true,
            productButtonOutline: true,
            productButtonColor: "#000",
            productButtonText: false,

            detailItem: null,
            detailItemProductList: [],
            detailItemProductName: null,
            detailItemOldPrice: null,
            detailItemNewPrice: null,

            newItemProductList: [],
            newItemProductName: null,
            newItemOldPrice: null,
            newItemNewPrice: null,
            newRequestDialog: false,
            newRequestComment: null,

            deleteConfirmDialog: false,
            deleteId: null,

            promoInformation: null,
            promoInformationStatus: null,
            promoInformationDeclinedReason: null,
            promoInformationDeclinedImages: null,

            reviseInformationComment: null,
            reviseInformationDialog: false,

            reviseRequestDialog: false,
            reviseRequestComment: null,
            extensions: [
                History,
                Blockquote,
                Link,
                Underline,
                Strike,
                Italic,
                ListItem,
                BulletList,
                OrderedList,
                [Heading, {
                    options: {
                    levels: [1, 2, 3]
                    }
                }],
                Bold,
                Code,
                HorizontalRule,
                Paragraph,
                HardBreak
            ],

            rejectImageGalleryShow: false,
            rejectImageGalleryIndex: null,

            rejectDetailItemImageGalleryIndex: null,
            rejectDetailItemImageGalleryShow: false,
        };
    },
    mounted() {
        this.promos = this.$store.state.promos ? this.$store.state.promos : [];

        this.promoInformation = this.$store.state.promo_information ? this.$store.state.promo_information.description : null;
        this.promoInformationStatus = this.$store.state.promo_information ? this.$store.state.promo_information.status : null;
        if (this.promoInformationStatus === 2){
            this.promoInformationDeclinedReason = this.$store.state.promo_information.declined_reason
            this.promoInformationDeclinedImages = this.$store.state.promo_information.declined_images
        }
        this.active_products_without_promo = this.$store.state.active_products_without_promo;
    },
    watch: {
        "$store.state.promos": function () {
            this.promos = this.$store.state.promos;
        },
        "$store.state.active_products_without_promo": function () {
            this.active_products_without_promo = this.$store.state.active_products_without_promo;
        },
        "$store.state.promo_information": function () {
            this.promoInformation = this.$store.state.promo_information.description;
            this.promoInformationStatus = this.$store.state.promo_information.status;
        },
    },
    methods: {
        getColorByStatus(status) {
            switch (status) {
                case 0:
                    return "yellow";
                case 1:
                    return "green";
                case 2:
                    return "red";
            }
        },
        getTextByStatus(status) {
            switch (status) {
                case 0:
                    return "На рассмотрении";
                case 1:
                    return "Одобрено";
                case 2:
                    return "Отклонено";
            }
        },
        viewItem(promo) {
            this.detailItem = promo;
            this.detailItemProductList = [];
            this.detailItemProductList.push(this.detailItem.product.name);
            this.active_products_without_promo.map((product) => {
                this.detailItemProductList.push(product.name);
            });
            this.detailItemProductName = this.detailItem.product.name;
            this.detailItemOldPrice = this.detailItem.product.price;
            this.detailItemNewPrice = this.detailItem.new_price;

            this.view(2);
        },
        deleteItem(id) {
            this.deleteId = id;
            this.deleteConfirmDialog = true;
        },
        confirmDelete() {
            this.deleteConfirmDialog = false;
            this.view(1);
            this.$store.dispatch("deletePromoById", this.deleteId).then(() => {
                this.$store.dispatch("getCatalogue");
            });
        },
        view(index) {
            this.listShow = false;
            this.detailShow = false;
            this.generalShow = false;
            this.addShow = false;

            this.addButtonShow = false;
            this.deleteButtonShow = false;
            this.cancelButtonShow = false;

            switch (index) {
                case 0:
                    this.generalShow = true;
                    this.generalButtonColor = "#000";
                    this.generalButtonOutline = true;
                    this.generalButtonText = false;
                    this.productButtonOutline = false;
                    this.productButtonColor = "#BCBEC0";
                    this.productButtonText = true;
                    this.addButtonShow = true;
                    break;
                case 1:
                    this.listShow = true;
                    this.generalButtonColor = "#BCBEC0";
                    this.generalButtonOutline = false;
                    this.generalButtonText = true;
                    this.productButtonOutline = true;
                    this.productButtonColor = "#000";
                    this.productButtonText = false;
                    this.addButtonShow = true;
                    break;
                case 2:
                    this.detailShow = true;
                    this.generalButtonColor = "#BCBEC0";
                    this.generalButtonOutline = false;
                    this.generalButtonText = true;
                    this.productButtonOutline = true;
                    this.productButtonColor = "#000";
                    this.productButtonText = false;
                    this.cancelButtonShow = true;
                    this.deleteButtonShow = true;
                    break;
                case 3:
                    this.newItemProductList = [];
                    this.active_products_without_promo.map((product) => {
                        this.newItemProductList.push(product.name);
                    });
                    this.addShow = true;
                    this.cancelButtonShow = true;
                    break;
            }
        },

        sendAddRequest() {
            if (!this.newItemProductName || !this.newItemNewPrice) {
                return;
            }
            let product_id;
            this.active_products_without_promo.map((product) => {
                if (product.name === this.newItemProductName) {
                    product_id = product.id;
                }
            });
            const data = {
                product_id,
                new_price: this.newItemNewPrice,
                request_comment: this.newRequestComment,
            };
            this.newRequestDialog = false;
            this.$store.dispatch("addPromo", data).then(() => {
                this.newItemProductName = null;
                this.newItemNewPrice = null;
                this.newItemOldPrice = null;
                this.newRequestComment = null;
                this.view(1);
                this.$store.dispatch("getCatalogue");
            });
        },

        sendReviseRequest() {
            if (!this.reviseRequestComment){
                this.$store.commit('setAlert', {
                    show: true,
                    text: 'Пожалуйста добавьте причину изменения!'
                })
                return;
            }
            let data = {
                new_price: this.detailItemNewPrice,
                request_comment: this.reviseRequestComment,
            };
            if (this.detailItemProductName === this.detailItem.product.name) {
                data.product_id = this.detailItem.product_id;
            } else {
                this.active_products_without_promo.some((product) => {
                    if (product.name === this.detailItemProductName) {
                        data.product_id = product.id;
                        return true;
                    }
                });
            }
            this.reviseRequestDialog = false;
            this.$store
                .dispatch("revisePromoById", { id: this.detailItem.id, data })
                .then(() => {
                    this.reviseRequestComment = null;
                    this.view(1);
                    this.$store.dispatch("getCatalogue");
                });
        },

        deleteButtonClick() {
            this.deleteId = this.detailItem.id;
            this.deleteConfirmDialog = true;
        },

        newItemProductChangeHandler(value) {
            this.active_products_without_promo.some((product) => {
                if (product.name === value) {
                    this.newItemOldPrice = product.price;
                    return true;
                }
            });
        },

        sendReviseInformationRequest(){
            if (!this.promoInformation || this.promoInformation === ''){
                this.$store.commit('setAlert', {
                    show: true,
                    text: 'Please input promo information!'
                })
                return
            }
            if (!this.reviseInformationComment){
                this.$store.commit('setAlert', {
                    show: true,
                    text: 'Пожалуйста добавьте причину изменения!'
                })
                return;
            }
            const data = {
                description: this.promoInformation,
                request_comment: this.reviseInformationComment
            }
            this.reviseInformationDialog = false
            this.$store.dispatch("revisePromoInformation", data).then(() => {
                this.reviseInformationComment = null;
                this.$store.dispatch("getCatalogue");
            });
        }
    },
};
</script>

<style scoped>
.add-zone-btn {
    height: 40px;
    width: 200px;
    position: absolute;
    right: 0px;
    top: -5px;
}
</style>

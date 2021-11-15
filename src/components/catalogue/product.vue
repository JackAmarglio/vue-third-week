<template>
    <div>
        <div class="top-btn-group">
            <v-btn
                text
                class="normal-text mr-3"
                height="35"
                style="font-size: 10pt"
                v-if="restoreButtonShow"
                @click="activeItem(detailItem.id)"
            >
                <v-icon size="18" class="mr-2">mdi-restore</v-icon>
                Восстановить
            </v-btn>
            <v-btn
                text
                class="normal-text mr-3"
                height="35"
                style="font-size: 10pt"
                v-if="archiveButtonShow"
                @click="archiveItem(detailItem.id)"
            >
                <v-icon size="18" class="mr-2">mdi-package-down</v-icon>
                Архивировать
            </v-btn>
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
                @click="cancelButtonClick"
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
                @click="addButtonClick"
                v-show="addButtonShow"
                >+ Добавить</v-btn
            >
        </div>
        <div v-if="listShow">
            <div class="header-text pa-3">
                <v-btn
                    :text="activeTabText"
                    class="normal-text"
                    @click="activeProductView"
                    :outlined="activeTabOutline"
                    :color="activeTabColor"
                    height="45"
                    ><span class="bold">Активные</span></v-btn
                >
                <v-btn
                    :text="archiveTabText"
                    :outlined="archiveTabOutline"
                    :color="archiveTabColor"
                    class="normal-text ml-7"
                    @click="archiveProductView"
                    height="45"
                    ><span class="bold">Архив</span></v-btn
                >
            </div>
            <v-row
                class="pa-1"
                v-for="(item, index) in showingProducts"
                :key="index"
            >
                <v-col md="7" class="pt-0 pb-0 flex-layout">
                    <v-img
                        height="100"
                        width="110"
                        max-width="110"
                        :src="item.images[0] ? item.images[0].image_url : null"
                        :lazy-src="
                            item.images[0] ? item.images[0].image_url : null
                        "
                    ></v-img>
                    <div class="pa-4 ml-4">
                        <p class="flex-layout bold">
                            {{ item.name }}
                            <img v-if="item.hasPromo === 1" class="ml-5 mt-1" width="18px" height="18px" src="/img/promo.svg">
                        </p>
                        <span class="thin">{{ item.subcategory }}</span>
                        <span class="bold ml-10">{{ item.hasPromo === 1 ? item.promo.new_price : item.price }} ₽</span>
                        <span v-if="item.counts" class="bold ml-10"
                            >Количество : {{ item.counts }}</span
                        >
                    </div>
                </v-col>
                <v-col md="2" class="pt-0 pb-0 flex-layout">
                    <div class="center" style="margin: auto">
                        <v-badge
                            dot
                            :color="getColorByStatus(item.status)"
                            left
                            offset-x="-7"
                            offset-y="-1"
                            class="mr-2"
                        ></v-badge>
                        <span>{{ getTextByStatus(item.status) }}</span>
                    </div>
                </v-col>
                <v-col md="1" class="pt-0 pb-0 flex-layout">
                    <v-btn style="margin: auto" text @click="viewItem(index)">
                        Перейти
                    </v-btn>
                </v-col>
                <v-col md="1" class="pt-0 pb-0 flex-layout">
                    <v-btn
                        style="margin: auto"
                        icon
                        color="#BCBEC0"
                        @click="archiveItem(item.id)"
                        v-if="item.archived === 0"
                    >
                        <v-icon>mdi-package-down</v-icon>
                    </v-btn>
                    <v-btn
                        style="margin: auto"
                        icon
                        color="#BCBEC0"
                        @click="activeItem(item.id)"
                        v-else
                    >
                        <v-icon>mdi-restore</v-icon>
                    </v-btn>
                </v-col>
                <v-col md="1" class="pt-0 pb-0 flex-layout">
                    <v-btn
                        style="margin: auto"
                        icon
                        color="#BCBEC0"
                        @click="deleteItem(item.id)"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-col>
                <v-col cols="12">
                    <v-divider></v-divider>
                </v-col>
            </v-row>
        </div>
        <div v-if="detailShow" class="pt-4">
            <vue-easy-lightbox
                :visible="galleryShow"
                :imgs="detailItemProductImages"
                :index="galleryIndex"
                @hide="galleryShow = false"
            ></vue-easy-lightbox>
            <div class="header-text">
                <h3 class="mr-10">Изменить продукт</h3>
                <img v-if="detailItem.hasPromo === 1" class="ml-0 mr-3 mt-1" width="18px" height="18px" src="/img/promo.svg">
                <v-badge
                    dot
                    :color="getColorByStatus(detailItem.status)"
                    offset-x="-20"
                    offset-y="18"
                ></v-badge>
                <span class="text pt-1">{{
                    getTextByStatus(detailItem.status)
                }}</span>
                <div
                    class="ml-10"
                    v-if="detailItem.archived"
                    style="padding-top: 1px"
                >
                    <v-badge
                        dot
                        color="grey"
                        offset-x="-20"
                        offset-y="0"
                    ></v-badge>
                    <span class="text">В архиве</span>
                </div>
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
                    :imgs="detailItem.declined_images"
                    @hide="rejectImageGalleryShow = false"
                    :index="rejectImageGalleryIndex"
                ></vue-easy-lightbox>
            </div>
            <div class="mt-7">
                <p class="mb-1">Название продукта и граммовка</p>
                <v-text-field
                    hide-details
                    outlined
                    dense
                    color="#414042"
                    v-model="detailItemProductName"
                ></v-text-field>
                <span class="thin grey-text">Используйте значения: г, шт. и т.п.</span><br>
                <span class="thin grey-text">Вишневый пирог, 500 г</span>
            </div>
            <div class="mt-6">
                <span>Описание</span>
                <v-textarea
                    hide-details
                    outlined
                    placeholder="Введите текст..."
                    color="#414042"
                    v-model="detailItemProductDescription"
                ></v-textarea>
            </div>
            <v-row class="mt-4">
                <v-col md="6" sm="6" xs="10">
                    <span>Категория в приложении</span>
                    <v-autocomplete
                        hide-details
                        outlined
                        placeholder="Выберите категорию"
                        dense
                        color="#414042"
                        :items="categories"
                        v-model="detailItemProductCategory"
                    >
                    </v-autocomplete>
                    <a class="thin grey-text" @click="showTip_NotFoundCategory">Нет вашей категории?</a>
                </v-col>
                <v-col md="6" sm="6" xs="10">
                    <span>Категория в вашем магазине</span>
                    <v-autocomplete
                        hide-details
                        outlined
                        placeholder="Введите категорию"
                        dense
                        color="#414042"
                        :items="subcategories"
                        v-model="detailItemProductSubCategory"
                    >
                    </v-autocomplete>
                </v-col>
                <v-col md="6" sm="6" xs="10">
                    <span>Стоимость, ₽</span>
                    <v-text-field
                        hide-details
                        outlined
                        dense
                        color="#414042"
                        v-model="detailItemProductPrice"
                        type="number"
                    ></v-text-field>
                </v-col>
                <v-col md="6" sm="6" xs="10">
                    <span>Артикул (необязательно)</span>
                    <v-text-field
                        hide-details
                        outlined
                        dense
                        color="#414042"
                        v-model="detailItemProductCount"
                        type="number"
                    ></v-text-field>
                </v-col>
                <v-col md="12">
                    <v-file-input
                        chips
                        multiple
                        show-size=""
                        truncate-length="14"
                        accept="image/*"
                        label="Прикрепить изображение"
                        class="mt-3 ml-1"
                        v-model="detailItemProductNewImages"
                    ></v-file-input>
                </v-col>
                <v-col
                    md="3"
                    sm="6"
                    xs="12"
                    v-for="(url, index) in detailItemProductImages"
                    :key="index"
                    class="relative"
                >
                    <v-img
                        style="cursor: pointer"
                        :lazy-src="url"
                        :src="url"
                        @click="
                            galleryIndex = index;
                            galleryShow = true;
                        "
                        height="200"
                    >
                        <template v-slot:placeholder>
                            <v-row
                                class="fill-height ma-0"
                                align="center"
                                justify="center"
                            >
                                <v-progress-circular
                                    indeterminate
                                    color="grey lighten-5"
                                ></v-progress-circular>
                            </v-row>
                        </template>
                    </v-img>
                    <v-btn
                        width="40"
                        min-width="40"
                        class="absolute"
                        style="right: 12px; top: 12px;border-radius:0"
                        color="white"
                        depressed
                        @click="removeProductImage(index)"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
            <div class="mt-10 flex-layout" style="position: relative">
                <v-btn
                    dark
                    height="50"
                    width="300"
                    color="red"
                    @click="reviseRequestDialogClick"
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
        <div v-if="addShow" class="pt-4">
            <div class="header-text">
                <h3 class="mr-10">Добавить продукт</h3>
            </div>
            <div class="mt-7">
                <p class="mb-1">Название продукта и граммовка</p>
                <v-text-field
                    hide-details
                    outlined
                    dense
                    color="#414042"
                    v-model="newItemProductName"
                ></v-text-field>
                <span class="thin grey-text">Используйте значения: г, шт. и т.п.</span><br>
                <span class="thin grey-text">Вишневый пирог, 500 г</span>
            </div>
            <div class="mt-6">
                <span>Описание</span>
                <v-textarea
                    hide-details
                    outlined
                    placeholder="Введите текст..."
                    color="#414042"
                    v-model="newItemProductDescription"
                ></v-textarea>
            </div>
            <v-row class="mt-4">
                <v-col md="6" sm="6" xs="10">
                    <span>Категория в приложении</span>
                    <v-autocomplete
                        hide-details
                        outlined
                        placeholder="Выберите категорию"
                        dense
                        color="#414042"
                        :items="categories"
                        v-model="newItemProductCategory"
                    >
                    </v-autocomplete>
                    <a class="thin grey-text" @click="showTip_NotFoundCategory">Нет вашей категории?</a>
                </v-col>
                <v-col md="6" sm="6" xs="10">
                    <span>Категории в вашем магазине</span>
                    <v-autocomplete
                        hide-details
                        outlined
                        placeholder="Введите категорию"
                        dense
                        color="#414042"
                        :items="subcategories"
                        v-model="newItemProductSubCategory"
                    >
                    </v-autocomplete>
                </v-col>
                <v-col md="6" sm="6" xs="10">
                    <span>Стоимость, ₽</span>
                    <v-text-field
                        hide-details
                        outlined
                        dense
                        color="#414042"
                        v-model="newItemProductPrice"
                        type="number"
                    ></v-text-field>
                </v-col>
                <v-col md="6" sm="6" xs="10">
                    <span>Артикул (необязательно)</span>
                    <v-text-field
                        hide-details
                        outlined
                        dense
                        color="#414042"
                        v-model="newItemProductCount"
                        type="number"
                    ></v-text-field>
                </v-col>
                <v-file-input
                    chips
                    multiple
                    show-size=""
                    truncate-length="14"
                    accept="image/*"
                    label="Прикрепить изображение"
                    class="mt-3 ml-1"
                    v-model="newItemProductImages"
                ></v-file-input>
            </v-row>
            <div class="mt-10 flex-layout" style="position: relative">
                <v-btn
                    dark
                    height="50"
                    width="300"
                    color="red"
                    @click="newRequestDialogClick"
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
        <v-dialog v-model="confirmDialog" width="500">
            <v-card>
                <v-card-title class="headline">
                    <v-icon class="mr-2">mdi-delete</v-icon>
                    Подтверждение
                </v-card-title>
                <v-divider></v-divider>
                <p class="pa-10">Вы уверены, что хотите удалить этот продукт?</p>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        outlined
                        @click="confirmDialog = false"
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
        <v-dialog v-model="NotFoundCategoryDialog" width="500">
            <v-card>
                <v-card-title class="headline bold">
                    Не нашли категорию? Напишите нам
                </v-card-title>
                <v-card-body>
                    <p class="pl-6 pr-6 thin">Напишите в службу поддержки, и мы добавим категорию для вас</p>
                </v-card-body>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        dark
                        @click="NotFoundCategoryDialog = false"
                        color="red"
                        class="normal-text"
                        width="120"
                        height="40"
                        text
                    >
                        Хорошо
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import VueEasyLightbox from "vue-easy-lightbox";
import firebase from "firebase";
export default {
    components: {
        VueEasyLightbox,
    },
    data() {
        return {
            addButtonShow: true,
            deleteButtonShow: false,
            cancelButtonShow: false,
            restoreButtonShow: false,
            archiveButtonShow: false,

            products: [],
            showingProducts: [],
            categories: [],
            subcategories: [],
            tabShow: 0,

            listShow: true,
            detailShow: false,
            addShow: false,
            deleteId: null,
            confirmDialog: false,

            activeTabText: false,
            activeTabOutline: true,
            activeTabColor: "#000",
            archiveTabText: true,
            archiveTabOutline: false,
            archiveTabColor: "#BCBEC0",

            detailItem: null,
            detailItemCategoryName: null,
            detailItemProductDescription: null,
            detailItemProductCategory: null,
            detailItemProductSubCategory: null,

            reviseRequestDialog: false,
            reviseRequestComment: null,

            newItemProductName: null,
            newItemProductDescription: null,
            newItemProductCategory: null,
            newItemProductSubCategory: null,
            newItemProductPrice: null,
            newItemProductCount: null,
            newItemProductImages: null,
            newRequestDialog: false,
            newRequestComment: null,

            galleryShow: false,
            detailItemProductImages: [],
            detailItemProductNewImages: null,
            galleryIndex: 0,

            rejectImageGalleryShow: false,
            rejectImageGalleryIndex: null,

            NotFoundCategoryDialog: false
        };
    },
    mounted() {
        this.products = this.$store.state.products
            ? this.$store.state.products
            : [];
        this.showingProducts = [];
        this.products.map((product) => {
            if (product.archived === this.tabShow) {
                this.showingProducts.push(product);
            }
        });
        this.categories = [];
        this.$store.state.categories.map((category) => {
            this.categories.push(category.name);
        });
        this.subcategories = [];
        this.$store.state.subcategories.map((subcategory) => {
            if (subcategory.status === 1){
                this.subcategories.push(subcategory.name);
            }
        });
    },
    watch: {
        "$store.state.products": function () {
            this.products = this.$store.state.products
                ? this.$store.state.products
                : [];
            this.showingProducts = [];
            this.products.map((product) => {
                if (product.archived === this.tabShow) {
                    this.showingProducts.push(product);
                }
            });
        },
        "$store.state.categories": function () {
            this.categories = [];
            this.$store.state.categories.map((category) => {
                this.categories.push(category.name);
            });
        },
        "$store.state.subcategories": function () {
            this.subcategories = [];
            this.$store.state.subcategories.map((subcategory) => {
                if (subcategory.status === 1){
                    this.subcategories.push(subcategory.name);
                }
            });
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
        activeProductView() {
            this.tabShow = 0;
            this.showingProducts = [];
            this.products.map((product) => {
                if (product.archived === this.tabShow) {
                    this.showingProducts.push(product);
                }
            });
            this.activeTabText = false;
            this.activeTabOutline = true;
            this.activeTabColor = "#000";
            this.archiveTabText = true;
            this.archiveTabOutline = false;
            this.archiveTabColor = "#BCBEC0";
        },
        archiveProductView() {
            this.tabShow = 1;
            this.showingProducts = [];
            this.products.map((product) => {
                if (product.archived === this.tabShow) {
                    this.showingProducts.push(product);
                }
            });
            this.activeTabText = true;
            this.activeTabOutline = false;
            this.activeTabColor = "#BCBEC0";
            this.archiveTabText = false;
            this.archiveTabOutline = true;
            this.archiveTabColor = "#000";
        },
        activeItem(id) {
            this.$store.dispatch("activeProductById", id).then(() => {
                this.$store.dispatch("getCatalogue");
            });
            this.view(0);
        },
        archiveItem(id) {
            this.$store.dispatch("archiveProductById", id).then(() => {
                this.$store.dispatch("getCatalogue");
            });
            this.view(0);
        },
        deleteItem(id) {
            this.confirmDialog = true;
            this.deleteId = id;
        },
        view(index) {
            this.listShow = false;
            this.detailShow = false;
            this.addShow = false;
            switch (index) {
                case 0:
                    this.listShow = true;
                    this.deleteButtonShow = false;
                    this.cancelButtonShow = false;
                    this.addButtonShow = true;
                    this.archiveButtonShow = false;
                    this.restoreButtonShow = false;
                    break;
                case 1:
                    this.detailShow = true;
                    this.addButtonShow = false;
                    this.deleteButtonShow = true;
                    this.cancelButtonShow = true;
                    if (this.detailItem.archived) {
                        this.restoreButtonShow = true;
                    } else {
                        this.archiveButtonShow = true;
                    }
                    break;
                case 2:
                    this.addShow = true;
                    this.addButtonShow = false;
                    this.deleteButtonShow = false;
                    this.cancelButtonShow = true;
                    this.archiveButtonShow = false;
                    this.restoreButtonShow = false;
                    break;
            }
        },
        addButtonClick() {
            this.view(2);
        },
        deleteButtonClick() {
            this.confirmDialog = true;
            this.deleteId = this.detailItem.id;
        },
        cancelButtonClick() {
            this.view(0);
        },
        viewItem(index) {
            this.detailItem = this.showingProducts[index];
            this.detailItemProductName = this.detailItem.name;
            this.detailItemProductDescription = this.detailItem.description;
            this.detailItemProductCategory = this.detailItem.category;
            this.detailItemProductSubCategory = this.detailItem.subcategory;
            this.detailItemProductPrice = this.detailItem.hasPromo === 1 ? this.detailItem.promo.new_price : this.detailItem.price;
            this.detailItemProductCount = this.detailItem.counts;
            this.detailItemProductImages = [];
            this.detailItem.images.map((image) => {
                this.detailItemProductImages.push(image.image_url);
            });
            this.view(1);
        },
        confirmDelete() {
            this.confirmDialog = false;
            this.$store
                .dispatch("deleteProductById", this.deleteId)
                .then(() => {
                    this.$store.dispatch("getCatalogue");
                    this.view(0);
                });
        },
        async reviseRequestDialogClick(){
            if (!this.detailItemProductName){
                this.$store.commit('setAlert', {
                    show: true,
                    text: 'Пожалуйста, введите название продукта'
                })
                return;
            }
            if(!this.detailItemProductName.match(/(\d+)\s*(\D+)/)){
                this.$store.commit('setAlert', {
                    show: true,
                    text: 'Пожалуйста, введите граммовку продукта'
                })
                return;
            }
            if (!this.detailItemProductDescription){
                this.$store.commit('setAlert', {
                    show: true,
                    text: 'Пожалуйста, введите описание продукта'
                })
                return;
            }
            if (!this.detailItemProductCategory){
                this.$store.commit('setAlert', {
                    show: true,
                    text: 'Пожалуйста, укажите категорию продукта в приложении'
                })
                return;
            }
            if (!this.detailItemProductSubCategory){
                this.$store.commit('setAlert', {
                    show: true,
                    text: 'Пожалуйста, укажите категорию продукта в вашем магазине'
                })
                return;
            }
            if (!this.detailItemProductPrice){
                this.$store.commit('setAlert', {
                    show: true,
                    text: 'Пожалуйста, введите стоимость продукта'
                })
                return;
            }
            if (!this.detailItemProductImages){
                this.$store.commit('setAlert', {
                    show: true,
                    text: 'Пожалуйста, прикрепите изображение(я) для продукта'
                })
                return;
            }
            this.reviseRequestDialog = true;
        },
        async sendReviseRequest() {
            if (!this.reviseRequestComment){
                this.$store.commit('setAlert', {
                    show: true,
                    text: 'Пожалуйста добавьте причину изменения!'
                })
                return;
            }
            this.reviseRequestDialog = false;
            this.$store.dispatch("setProcessing", true);
            this.view(0);
            try {
                let image_urls = null
                if (this.detailItemProductNewImages){
                    image_urls = []
                    await Promise.all(this.detailItemProductNewImages.map(async image => {
                        const time = new Date().getTime();
                        const storageRef = firebase.storage().ref(`/product_images/${time}`)
                        const uploadTask = storageRef.put(image);
                        const image_url = await new Promise((resolve, reject) => {
                            uploadTask.on('state_changed', () => {

                            }, error => reject(error),
                            async () => {
                                const downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();
                                resolve(downloadUrl);
                            });
                        });
                        image_urls.push({
                            image_url,
                            image_size : image.size
                        })
                    }));
                    this.detailItemProductNewImages = null
                }
                let category_id = 0;
                let subcategory_id = 0;
                this.$store.state.categories.map((category) => {
                    if (category.name === this.detailItemProductCategory) {
                        category_id = category.id;
                    }
                });
                this.$store.state.subcategories.map((subcategory) => {
                    if (subcategory.name === this.detailItemProductSubCategory) {
                        subcategory_id = subcategory.id;
                    }
                });
                const data = {
                    name: this.detailItemProductName,
                    description: this.detailItemProductDescription,
                    category_id,
                    subcategory_id,
                    price: this.detailItemProductPrice,
                    counts: this.detailItemProductCount,
                    request_comment: this.reviseRequestComment,
                };
                if (image_urls){
                    data.images = image_urls
                }
                this.$store
                    .dispatch("reviseProductById", { id: this.detailItem.id, data })
                    .then(() => {
                        this.reviseRequestComment = null;
                        this.$store.dispatch("getCatalogue");
                    });
            } catch (error) {
                console.log(error)
                this.$store.dispatch("setProcessing", true);
            }
        },
        async sendAddRequest() {
            let category_id = 0;
            let subcategory_id = 0;
            this.$store.state.categories.map((category) => {
                if (category.name === this.newItemProductCategory) {
                    category_id = category.id;
                }
            });
            this.$store.state.subcategories.map((subcategory) => {
                if (subcategory.name === this.newItemProductSubCategory) {
                    subcategory_id = subcategory.id;
                }
            });
            let image_urls = null
            this.newRequestDialog = false;
            this.$store.dispatch("setProcessing", true);
            image_urls = []
            await Promise.all(this.newItemProductImages.map(async image => {
                const time = new Date().getTime();
                const storageRef = firebase.storage().ref(`/product_images/${time}`)
                const uploadTask = storageRef.put(image);
                const image_url = await new Promise((resolve, reject) => {
                    uploadTask.on('state_changed', () => {

                    }, error => reject(error),
                    async () => {
                        const downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();
                        resolve(downloadUrl);
                    });
                });
                image_urls.push({
                    image_url,
                    image_size : image.size
                })
            }));
            this.newItemProductImages = null
            const data = {
                name: this.newItemProductName,
                description: this.newItemProductDescription,
                category_id,
                subcategory_id,
                price: this.newItemProductPrice,
                counts: this.newItemProductCount,
                request_comment: this.newRequestComment,
            };
            if (image_urls){
                data.images = image_urls
            }
            this.$store.dispatch("addProduct", data).then(() => {
                this.newRequestComment = null;
                this.newItemProductName = null;
                this.newItemProductDescription = null;
                this.newItemProductCategory = null;
                this.newItemProductSubCategory = null;
                this.newItemProductPrice = null;
                this.newItemProductCount = null;
                this.$store.dispatch("getCatalogue");
                this.view(0);
            });
        },
        removeProductImage(index) {
            this.$store
                .dispatch(
                    "deleteProductImage",
                    this.detailItem.images[index].id
                )
                .then(() => {
                    this.detailItemProductImages.splice(index, 1)
                    this.$store.dispatch("getCatalogue");
                });
        },
        newRequestDialogClick(){
            if (!this.newItemProductName){
                this.$store.commit('setAlert', {
                    show: true,
                    text: 'Пожалуйста, введите название продукта'
                })
                return;
            }
            if(!this.newItemProductName.match(/(\d+)\s*(\D+)/)){
                this.$store.commit('setAlert', {
                    show: true,
                    text: 'Пожалуйста, введите граммовку продукта'
                })
                return;
            }
            if (!this.newItemProductDescription){
                this.$store.commit('setAlert', {
                    show: true,
                    text: 'Пожалуйста, введите описание продукта'
                })
                return;
            }
            if (!this.newItemProductCategory){
                this.$store.commit('setAlert', {
                    show: true,
                    text: 'Пожалуйста, укажите категорию продукта в приложении'
                })
                return;
            }
            if (!this.newItemProductSubCategory){
                this.$store.commit('setAlert', {
                    show: true,
                    text: 'Пожалуйста, укажите категорию продукта в вашем магазине'
                })
                return;
            }
            if (!this.newItemProductPrice){
                this.$store.commit('setAlert', {
                    show: true,
                    text: 'Пожалуйста, введите стоимость продукта'
                })
                return;
            }
            if (!this.newItemProductImages){
                this.$store.commit('setAlert', {
                    show: true,
                    text: 'Пожалуйста, прикрепите изображение(я) для продукта'
                })
                return;
            }
            this.newRequestDialog = true
        },
        showTip_NotFoundCategory(){
            this.NotFoundCategoryDialog = true
        }
    },
};
</script>

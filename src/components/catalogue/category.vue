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
            <v-row
                class="pa-1"
                v-for="(item, index) in subcategories"
                :key="index"
            >
                <v-col md="7" class="pt-0 pb-0">{{ item.name }}</v-col>
                <v-col md="2" class="pt-0 pb-0">
                    <v-badge
                        dot
                        :color="getColorByStatus(item.status)"
                        left
                        offset-x="-7"
                        offset-y="-1"
                        class="mr-2"
                    ></v-badge>
                    <span>{{ getTextByStatus(item.status) }}</span>
                </v-col>
                <v-col md="2" class="pt-0 pb-0">
                    <v-btn
                        style="margin-top: -5px"
                        text
                        @click="viewItem(index)"
                    >
                        Перейти
                    </v-btn>
                </v-col>
                <v-col md="1" class="pt-0 pb-0">
                    <v-btn
                        style="margin-top: -5px"
                        icon
                        color="#BCBEC0"
                        @click="deleteItem(index)"
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
            <div class="header-text">
                <h3 class="mr-10">{{ detailItem.name }}</h3>
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
                <p class="mb-1">Название категории</p>
                <v-text-field
                    hide-details
                    outlined
                    dense
                    color="#414042"
                    style="width: 600px"
                    v-model="detailItemCategoryName"
                ></v-text-field>
            </div>
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
        <div v-if="addShow" class="pt-4">
            <div class="header-text">
                <h3 class="mr-10">Новая категория</h3>
            </div>
            <div class="mt-7">
                <p class="mb-1">Название категории</p>
                <v-text-field
                    hide-details
                    outlined
                    dense
                    color="#414042"
                    style="width: 600px"
                    v-model="newCategoryName"
                ></v-text-field>
            </div>
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
                    >После запроса изменения, данные<br />будут отправлены на модерацию..</span
                >
            </div>
            <v-dialog v-model="newRequestDialog" width="500">
                <v-card>
                    <v-card-title class="headline">
                        <v-icon class="mr-2">mdi-pencil</v-icon>
                        Запрос на модерацию
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
                <p class="pa-10">Вы уверены, что хотите удалить эту категорию?</p>
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
    </div>
</template>

<script>
import VueEasyLightbox from "vue-easy-lightbox";
export default {
    components: {
        VueEasyLightbox
    },
    data() {
        return {
            addButtonShow: true,
            deleteButtonShow: false,
            cancelButtonShow: false,

            subcategories: [],

            listShow: true,
            detailShow: false,
            addShow: false,
            deleteId: null,
            confirmDialog: false,

            detailItem: null,
            detailItemCategoryName: null,
            reviseRequestDialog: false,
            reviseRequestComment: null,

            newCategoryName: null,
            newRequestDialog: false,
            newRequestComment: null,

            rejectImageGalleryShow: false,
            rejectImageGalleryIndex: null
        };
    },
    mounted() {
        this.subcategories = this.$store.state.subcategories
            ? this.$store.state.subcategories
            : [];
    },
    watch: {
        "$store.state.subcategories": function () {
            this.subcategories = this.$store.state.subcategories
                ? this.$store.state.subcategories
                : [];
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
                    break;
                case 1:
                    this.detailShow = true;
                    this.addButtonShow = false;
                    this.deleteButtonShow = true;
                    this.cancelButtonShow = true;
                    break;
                case 2:
                    this.addShow = true;
                    this.addButtonShow = false;
                    this.deleteButtonShow = false;
                    this.cancelButtonShow = true;
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
            this.detailItem = this.subcategories[index];
            this.detailItemCategoryName = this.detailItem.name;
            this.view(1);
        },
        deleteItem(index) {
            this.confirmDialog = true;
            this.deleteId = this.subcategories[index].id;
        },
        confirmDelete() {
            this.confirmDialog = false;
            this.$store
                .dispatch("deleteSubcategory", this.deleteId)
                .then(() => {
                    this.$store.dispatch("getCatalogue");
                    this.view(0);
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
            const data = {
                name: this.detailItemCategoryName,
                request_comment: this.reviseRequestComment,
            };
            this.reviseRequestDialog = false;
            this.$store
                .dispatch("reviseSubcategory", { id: this.detailItem.id, data })
                .then(() => {
                    this.reviseRequestComment = null;
                    this.$store.dispatch("getCatalogue");
                    this.view(0);
                });
        },
        sendAddRequest() {
            const data = {
                name: this.newCategoryName,
                request_comment: this.newRequestComment,
            };
            this.newRequestDialog = false;
            this.$store.dispatch("addSubcategory", data).then(() => {
                this.request_comment = null;
                this.newCategoryName = null;
                this.$store.dispatch("getCatalogue");
                this.view(0);
            });
        },
    },
};
</script>

<style>
.top-btn-group {
    position: absolute;
    top: -65px;
    right: 0px;
}
</style>

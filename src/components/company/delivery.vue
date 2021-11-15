<template>
    <div>
        <div class="top-btn-group">
            <v-btn
                outlined
                class="normal-text"
                height="40"
                width="170"
                color="red"
                style="bottom: 2px"
                @click="view(3)"
                >+ Добавить</v-btn
            >
        </div>
        <div class="header-text">
            <h3 class="mt-2">Зоны доставки</h3>
            <v-btn
                :text="generalButtonText"
                class="normal-text"
                style="margin-left: 200px"
                height="45"
                @click="view(0)"
                :outlined="generalButtonOutline"
                :color="generalButtonColor"
                ><span class="bold">Общее</span></v-btn
            >
            <v-btn
                :text="districtButtonText"
                :outlined="districtButtonOutline"
                :color="districtButtonColor"
                class="normal-text ml-4"
                height="45"
                @click="view(1)"
                ><span class="bold">Районы</span></v-btn
            >
        </div>
        <div v-if="listShow" class="zone-lists mt-10">
            <v-row
                class="zone-item mt-1"
                v-for="(zone, index) in delivery_zones"
                :key="index"
            >
                <v-col md="3" class="pt-0 pb-0">{{ zone.district }}</v-col>
                <v-col md="5" class="grey-text pt-0 pb-0 pl-10 pr-10 center zone-timeframe-list">
                    <span class="item" v-for="(item, i) in zone.delivery_timeframes" :key="i">
                        {{
                            item.start + " - " + item.end
                        }}
                        <span class="comma">
                            ,
                        </span>
                    </span>
                </v-col>
                <v-col md="2" class="pt-0 pb-0">
                    <v-badge
                        dot
                        :color="getColorByStatus(zone.status)"
                        left
                        offset-x="-7"
                        offset-y="-1"
                        class="mr-2"
                    ></v-badge>
                    <span>{{ getTextByStatus(zone.status) }}</span>
                </v-col>
                <v-col md="1" class="pt-0 pb-0">
                    <v-btn
                        style="margin-top: -5px"
                        text
                        @click="viewDeliveryZoneByIndex(index)"
                    >
                        Перейти
                    </v-btn>
                </v-col>
                <v-col md="1" class="pt-0 pb-0 right">
                    <v-btn
                        style="margin-top: -5px"
                        icon
                        color="#BCBEC0"
                        @click="deleteDeliveryZoneByIndex(index)"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-col>
                <v-col cols="12">
                    <v-divider></v-divider>
                </v-col>
            </v-row>
        </div>
        <div v-if="detailShow" class="mt-4">
            <v-divider></v-divider>
            <div class="header-text mt-6">
                <h3 class="mr-10">{{ detailDeliveryZone.district }}</h3>
                <v-badge
                    dot
                    :color="getColorByStatus(detailDeliveryZone.status)"
                    offset-x="-20"
                    offset-y="20"
                ></v-badge>
                <span class="text">{{
                    getTextByStatus(detailDeliveryZone.status)
                }}</span>
            </div>
            <div v-if="detailDeliveryZone.status === 2" class="reject-reason">
                <v-expansion-panels multiple :value="[0, 1]">
                    <v-expansion-panel>
                        <v-expansion-panel-header
                            >Причина отклонения</v-expansion-panel-header
                        >
                        <v-expansion-panel-content>
                            <span class="normal-text">
                                {{ detailDeliveryZone.declined_reason }}
                            </span>
                            <v-row v-if="detailDeliveryZone.declined_images">
                                <v-col
                                    md="2"
                                    sm="4"
                                    xs="6"
                                    v-for="(
                                        url, index
                                    ) in detailDeliveryZone.declined_images"
                                    :key="index"
                                    class="relative"
                                >
                                    <v-img
                                        style="cursor: pointer"
                                        :lazy-src="url"
                                        :src="url"
                                        @click="
                                            rejectDeliveryZoneImageGalleryIndex = index;
                                            rejectDeliveryZoneImageGalleryShow = true;
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
                    :visible="rejectDeliveryZoneImageGalleryShow"
                    :imgs="detailDeliveryZone.declined_images"
                    @hide="rejectDeliveryZoneImageGalleryShow = false"
                    :index="rejectDeliveryZoneImageGalleryIndex"
                ></vue-easy-lightbox>
            </div>
            <v-row class="mt-4">
                <v-col md="6" sm="6" xs="10">
                    <span>Районы Москвы и ближайшее Подмосковье</span>
                    <v-autocomplete
                        hide-details
                        outlined
                        placeholder="Выберите район"
                        dense
                        color="#414042"
                        :items="detailDistricts"
                        v-model="detailDeliveryZoneDistrict"
                        @change="changeDetailValue()"
                        return-object
                    >
                    </v-autocomplete>
                </v-col>
                <v-col md="6" sm="6" xs="10">
                    <span>Временные интервалы доставки</span>
                    <div v-click-outside="onClickOutsideOfDeliveryTimePopup">
                        <v-autocomplete
                            :items="delivery_times"
                            dense
                            chips
                            multiple
                            outlined
                            hide-details
                            v-model="delivery_times"
                            readonly
                            @mouseup="deliveryTimePopup = true"
                        >
                        </v-autocomplete>
                        <v-card
                            v-show="deliveryTimePopup"
                            elevation="3"
                            color="#FFF"
                            class="pa-2"
                            width="180"
                            style="position: absolute; z-index: 1"
                        >
                            <div
                                class="flex-layout mb-1"
                                v-for="(
                                    time, index
                                ) in detailDeliveryZone.delivery_timeframes"
                                :key="index"
                            >
                                <input
                                    name="text"
                                    class="time-input left"
                                    :value="time.start"
                                    v-cleave="{
                                        time: true,
                                        timePattern: ['h', 'm']
                                    }"
                                    @keyup="
                                        delivery_time_changeHandler(
                                            $event,
                                            index,
                                            true
                                        )
                                    "
                                />
                                <input
                                    name="text"
                                    class="time-input right"
                                    :value="time.end"
                                    v-cleave="{
                                        time: true,
                                        timePattern: ['h', 'm']
                                    }"
                                    @keyup="
                                        delivery_time_changeHandler(
                                            $event,
                                            index,
                                            false
                                        )
                                    "
                                />
                                <v-btn
                                    class="mt-2"
                                    icon
                                    small
                                    @click="removeDeliveryTime(index)"
                                >
                                    <v-icon>mdi-minus</v-icon>
                                </v-btn>
                            </div>
                            <v-btn class="mt-2" text @click="addDeliveryTime()">
                                <span style="text-transform: none"> +Добавить </span>
                            </v-btn>
                        </v-card>
                    </div>
                </v-col>
                <v-col md="6" sm="6" xs="10">
                    <span>Стоимость доставки, ₽</span>
                    <v-text-field
                        hide-details
                        outlined
                        dense
                        color="#414042"
                        v-model="detailDeliveryZoneDeliveryPrice"
                        @change="reviseNotStarted = false"
                        type="number"
                    ></v-text-field>
                </v-col>
                <v-col md="6" sm="6" xs="10">
                    <span>Минимальная сумма заказа, ₽</span>
                    <v-text-field
                        hide-details
                        outlined
                        dense
                        color="#414042"
                        v-model="detailDeliveryZoneMinOrderPrice"
                        @change="reviseNotStarted = false"
                        type="number"
                    ></v-text-field>
                </v-col>
                <v-col md="6" sm="6" xs="10">
                    <span>Бесплатная доставка от, ₽</span>
                    <v-text-field
                        hide-details
                        outlined
                        dense
                        color="#414042"
                        v-model="detailDeliveryZoneFreeDeliveryFrom"
                        @change="reviseNotStarted = false"
                        type="number"
                    ></v-text-field>
                </v-col>
            </v-row>
            <div class="mt-10 flex-layout">
                <v-btn
                    dark
                    height="50"
                    width="300"
                    color="red"
                    @click="reviseDeliveryConfirmDialog = true"
                    :disabled="reviseNotStarted"
                    depressed
                    ><span style="text-transform: none"
                        >Отправить запрос</span
                    ></v-btn
                >
                <span class="ml-5 mt-1 grey-text"
                    >После запроса изменения, данные<br />будут отправлены на модерацию.</span
                >
            </div>
            <v-dialog v-model="reviseDeliveryConfirmDialog" width="500">
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
                        v-model="reviseDeliveryRequestComment"
                    ></v-textarea>
                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            outlined
                            @click="reviseDeliveryConfirmDialog = false"
                            color="#7d7d7d"
                            class="normal-text"
                            width="120"
                            height="40"
                        >
                            Отменить
                        </v-btn>
                        <v-btn
                            dark
                            @click="reviseDeliveryZoneSendRequest"
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
        <div v-if="generalShow">
            <div class="pt-10">
                <div class="flex-layout">
                    <h4>Информация о стоимости доставки</h4>
                    <span style="margin-left: auto">
                        <v-badge
                            dot
                            :color="
                                getColorByStatus(deliveryCostInformationStatus)
                            "
                            left
                            offset-x="-7"
                            offset-y="-1"
                            class="mr-2"
                        ></v-badge>
                        <span>{{
                            getTextByStatus(deliveryCostInformationStatus)
                        }}</span>
                    </span>
                </div>
                <div
                    v-if="deliveryCostInformationStatus === 2"
                    class="reject-reason"
                >
                    <v-expansion-panels multiple :value="[0, 1]">
                        <v-expansion-panel>
                            <v-expansion-panel-header
                                >Причина отклонения</v-expansion-panel-header
                            >
                            <v-expansion-panel-content>
                                <span class="normal-text">
                                    {{ deliveryCostInformationDeclinedReason }}
                                </span>
                                <v-row
                                    v-if="deliveryCostInformationDeclinedImages"
                                >
                                    <v-col
                                        md="2"
                                        sm="4"
                                        xs="6"
                                        v-for="(
                                            url, index
                                        ) in deliveryCostInformationDeclinedImages"
                                        :key="index"
                                        class="relative"
                                    >
                                        <v-img
                                            style="cursor: pointer"
                                            :lazy-src="url"
                                            :src="url"
                                            @click="
                                                deliveryCostInformationDeclinedImageGalleryIndex = index;
                                                deliveryCostInformationDeclinedImageGalleryShow = true;
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
                        :visible="
                            deliveryCostInformationDeclinedImageGalleryShow
                        "
                        :imgs="deliveryCostInformationDeclinedImages"
                        @hide="
                            deliveryCostInformationDeclinedImageGalleryShow = false
                        "
                        :index="
                            deliveryCostInformationDeclinedImageGalleryIndex
                        "
                    ></vue-easy-lightbox>
                </div>
                <tiptap-vuetify
                    placeholder="Введите информацию о стоимости доставки"
                    class="mt-1"
                    v-model="deliveryCostInformation"
                    :extensions="extensions"
                />
            </div>
            <div class="pt-10">
                <div class="flex-layout">
                    <h4>Информация о времени доставки</h4>
                    <span style="margin-left: auto">
                        <v-badge
                            dot
                            :color="
                                getColorByStatus(deliveryTimeInformationStatus)
                            "
                            left
                            offset-x="-7"
                            offset-y="-1"
                            class="mr-2"
                        ></v-badge>
                        <span>{{
                            getTextByStatus(deliveryTimeInformationStatus)
                        }}</span>
                    </span>
                </div>
                <div
                    v-if="deliveryTimeInformationStatus === 2"
                    class="reject-reason"
                >
                    <v-expansion-panels multiple :value="[0, 1]">
                        <v-expansion-panel>
                            <v-expansion-panel-header
                                >Причина отклонения</v-expansion-panel-header
                            >
                            <v-expansion-panel-content>
                                <span class="normal-text">
                                    {{ deliveryTimeInformationDeclinedReason }}
                                </span>
                                <v-row
                                    v-if="deliveryTimeInformationDeclinedImages"
                                >
                                    <v-col
                                        md="2"
                                        sm="4"
                                        xs="6"
                                        v-for="(
                                            url, index
                                        ) in deliveryTimeInformationDeclinedImages"
                                        :key="index"
                                        class="relative"
                                    >
                                        <v-img
                                            style="cursor: pointer"
                                            :lazy-src="url"
                                            :src="url"
                                            @click="
                                                deliveryTimeInformationDeclinedImageGalleryIndex = index;
                                                deliveryTimeInformationDeclinedImageGalleryShow = true;
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
                        :visible="
                            deliveryTimeInformationDeclinedImageGalleryShow
                        "
                        :imgs="deliverytimeInformationDeclinedImages"
                        @hide="
                            deliveryTimeInformationDeclinedImageGalleryShow = false
                        "
                        :index="
                            deliveryTimeInformationDeclinedImageGalleryIndex
                        "
                    ></vue-easy-lightbox>
                </div>
                <tiptap-vuetify
                    placeholder="Введите информацию о времени доставки"
                    class="mt-1"
                    v-model="deliveryTimeInformation"
                    :extensions="extensions"
                />
            </div>

            <div class="mt-10 flex-layout">
                <v-btn
                    dark
                    height="50"
                    width="300"
                    color="red"
                    @click="reviseDeliveryInformationConfirmDialog = true"
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
                v-model="reviseDeliveryInformationConfirmDialog"
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
                        placeholder="Введите текст..."
                        color="#414042"
                        v-model="reviseDeliveryInformationRequestComment"
                    ></v-textarea>
                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            outlined
                            @click="
                                reviseDeliveryInformationConfirmDialog = false
                            "
                            color="#7d7d7d"
                            class="normal-text"
                            width="120"
                            height="40"
                        >
                            Отменить
                        </v-btn>
                        <v-btn
                            dark
                            @click="reviseDeliveryInformationSendRequest"
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
            <v-divider></v-divider>
            <div class="header-text mt-6">
                <h3 class="mr-10">Новая зона доставки</h3>
            </div>
            <v-row class="mt-4">
                <v-col md="6" sm="6" xs="10">
                    <span>Районы Москвы и ближайшее Подмосковье</span>
                    <v-autocomplete
                        hide-details
                        outlined
                        placeholder="Выберите район"
                        dense
                        color="#414042"
                        :items="newDistricts"
                        v-model="newSelectedDistricts"
                        multiple
                        return-object
                        :search-input.sync="searchNewDistrict"
                    >
                    </v-autocomplete>
                </v-col>
                <v-col md="6" sm="6" xs="10">
                    <span>Временные интервалы доставки</span>
                    <div v-click-outside="onClickOutsideOfNewDeliveryTimePopup">
                        <v-autocomplete
                            :items="newDeliveryTimes"
                            dense
                            chips
                            multiple
                            outlined
                            hide-details
                            v-model="newDeliveryTimes"
                            readonly
                            @mouseup="newDeliveryTimePopup = true"
                        >
                        </v-autocomplete>
                        <v-card
                            v-show="newDeliveryTimePopup"
                            elevation="3"
                            color="#FFF"
                            class="pa-2"
                            width="180"
                            style="position: absolute; z-index: 1"
                        >
                            <div
                                class="flex-layout mb-1"
                                v-for="(time, index) in newDeliveryTimeFrames"
                                :key="index"
                            >
                                <input
                                    name="text"
                                    class="time-input left"
                                    :value="time.start"
                                    v-cleave="{
                                        time: true,
                                        timePattern: ['h', 'm']
                                    }"
                                    @keyup="
                                        new_delivery_time_changeHandler(
                                            $event,
                                            index,
                                            true
                                        )
                                    "
                                />
                                <input
                                    name="text"
                                    class="time-input right"
                                    :value="time.end"
                                    v-cleave="{
                                        time: true,
                                        timePattern: ['h', 'm']
                                    }"
                                    @keyup="
                                        new_delivery_time_changeHandler(
                                            $event,
                                            index,
                                            false
                                        )
                                    "
                                />
                                <v-btn
                                    class="mt-2"
                                    icon
                                    small
                                    @click="removeNewDeliveryTime(index)"
                                >
                                    <v-icon>mdi-minus</v-icon>
                                </v-btn>
                            </div>
                            <v-btn
                                class="mt-2"
                                text
                                @click="addNewDeliveryTime()"
                            >
                                <span style="text-transform: none"> +Добавить </span>
                            </v-btn>
                        </v-card>
                    </div>
                </v-col>
                <v-col md="6" sm="6" xs="10">
                    <span>Стоимость доставки, ₽</span>
                    <v-text-field
                        hide-details
                        outlined
                        dense
                        color="#414042"
                        v-model="newDelivery_price"
                        type="number"
                    ></v-text-field>
                </v-col>
                <v-col md="6" sm="6" xs="10">
                    <span>Минимальная сумма заказа, ₽</span>
                    <v-text-field
                        hide-details
                        outlined
                        dense
                        color="#414042"
                        v-model="newMin_order_price"
                        type="number"
                    ></v-text-field>
                </v-col>
                <v-col md="6" sm="6" xs="10">
                    <span>Бесплатная доставка от, ₽</span>
                    <v-text-field
                        hide-details
                        outlined
                        dense
                        color="#414042"
                        v-model="newFree_delivery_from"
                        type="number"
                    ></v-text-field>
                </v-col>
            </v-row>
            <div class="mt-10 flex-layout">
                <v-btn
                    dark
                    height="50"
                    width="300"
                    color="red"
                    @click="addNewDeliveryConfirm"
                    depressed
                    ><span style="text-transform: none"
                        >Отправить запрос</span
                    ></v-btn
                >
                <span class="ml-5 mt-1 grey-text"
                    >После запроса изменения, данные<br />будут отправлены на модерацию.</span
                >
            </div>
            <v-dialog v-model="addNewDeliveryConfirmDialog" width="500">
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
                        v-model="newDeliveryRequestComment"
                    ></v-textarea>
                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            outlined
                            @click="addNewDeliveryConfirmDialog = false"
                            color="#7d7d7d"
                            class="normal-text"
                            width="120"
                            height="40"
                        >
                            Отменить
                        </v-btn>
                        <v-btn
                            dark
                            @click="addNewDeliveryZone"
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
                <p class="pa-10">Вы уверены, что хотите удалить эту зону доставки?</p>
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
                        @click="deleteDeliveryZone"
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
import {
    TiptapVuetify,
    Heading,
    Bold,
    Italic,
    Strike,
    Underline,
    Code,
    Paragraph,
    BulletList,
    OrderedList,
    ListItem,
    Link,
    Blockquote,
    HardBreak,
    HorizontalRule,
    History,
} from "tiptap-vuetify";
export default {
    components: {
        TiptapVuetify,
        VueEasyLightbox,
    },
    data() {
        return {
            delivery_zones: [],
            districts: [],
            newDistricts: [],
            detailDistricts: [],
            listShow: true,
            detailShow: false,
            generalShow: false,
            addShow: false,
            generalButtonColor: "#BCBEC0",
            generalButtonOutline: false,
            generalButtonText: true,
            districtButtonOutline: true,
            districtButtonColor: "#000",
            districtButtonText: false,

            confirmDialog: false,
            deleteId: null,

            newSelectedDistricts: null,
            newDeliveryTimePopup: false,
            newDeliveryTimes: [],
            newDeliveryTimeFrames: [],
            newDelivery_price: null,
            newMin_order_price: null,
            newFree_delivery_from: null,
            addNewDeliveryConfirmDialog: false,
            newDeliveryRequestComment: null,
            deliveryCostInformation: null,
            deliveryTimeInformation: null,
            deliveryCostInformationStatus: null,
            deliveryCostInformationDeclinedReason: null,
            deliveryCostInformationDeclinedImages: null,
            deliveryCostInformationDeclinedImageGalleryShow: false,
            deliveryCostInformationDeclinedImageGalleryIndex: null,

            deliveryTimeInformationStatus: null,
            deliveryTimeInformationDeclinedReason: null,
            deliveryTimeInformationDeclinedImages: null,
            deliveryTimeInformationDeclinedImageGalleryShow: false,
            deliveryTimeInformationDeclinedImageGalleryIndex: null,

            reviseDeliveryInformationConfirmDialog: false,
            reviseDeliveryInformationRequestComment: null,
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
                [
                    Heading,
                    {
                        options: {
                            levels: [1, 2, 3],
                        },
                    },
                ],
                Bold,
                Code,
                HorizontalRule,
                Paragraph,
                HardBreak,
            ],

            rejectDeliveryZoneImageGalleryShow: false,
            rejectDeliveryZoneImageGalleryIndex: null,

            reviseNotStarted: true,
            reviseDeliveryConfirmDialog: false,
            reviseDeliveryRequestComment: null,

            detailDeliveryZone: null,
            detailDeliveryZoneDistrict: null,
            detailDeliveryZoneDeliveryPrice: null,
            detailDeliveryZoneMinOrderPrice: null,
            detailDeliveryZoneFreeDeliveryFrom: null,

            deliveryTimePopup: false,
            delivery_times: [],

            districtRegions: [],
            searchNewDistrict: null
        };
    },
    mounted() {
        this.delivery_zones = this.$store.state.delivery_zones ? this.$store.state.delivery_zones : [];
        if (this.$store.state.districts) {
            this.districts = [];
            this.districtRegions = []
            let tmp_newDistricts = []
            this.newDistricts = []
            this.$store.state.districts.map((item) => {
                this.districts.push(item.name);
                this.newDistricts.push({text : item.name, value: item.id, region: item.region})
                tmp_newDistricts.push(item.name)
                if (this.districtRegions.indexOf(item.region) === -1){
                    this.districtRegions.push(item.region)
                }
            });
            this.delivery_zones.map(zone =>{
                let index = tmp_newDistricts.indexOf(zone.district)
                if (index !== -1){
                    this.newDistricts.splice(index, 1)
                    tmp_newDistricts.splice(index, 1)
                }
                this.districtRegions.map(region =>{
                    if (region === zone.district){
                        this.newDistricts = this.newDistricts.filter(item =>{
                            if (item.region === region){
                                return false
                            }
                            else {
                                return true
                            }
                        })
                    }
                })
            })
        }
        this.deliveryCostInformation = this.$store.state
            .delivery_cost_information
            ? this.$store.state.delivery_cost_information.description
            : null;
        this.deliveryCostInformationStatus = this.$store.state
            .delivery_cost_information
            ? this.$store.state.delivery_cost_information.status
            : null;
        if (this.deliveryCostInformationStatus === 2) {
            this.deliveryCostInformationDeclinedReason = this.$store.state.delivery_cost_information.declined_reason;
            this.deliveryCostInformationDeclinedImages = this.$store.state.delivery_cost_information.declined_images;
        }
        this.deliveryTimeInformation = this.$store.state
            .delivery_time_information
            ? this.$store.state.delivery_time_information.description
            : null;
        this.deliveryTimeInformationStatus = this.$store.state
            .delivery_time_information
            ? this.$store.state.delivery_time_information.status
            : null;
        if (this.deliveryTimeInformationStatus === 2) {
            this.deliveryTimeInformationDeclinedReason = this.$store.state.delivery_time_information.declined_reason;
            this.deliveryTimeInformationDeclinedImages = this.$store.state.delivery_time_information.declined_images;
        }
    },
    watch: {
        "$store.state.delivery_zones": function () {
            this.delivery_zones = this.$store.state.delivery_zones;
            if (this.$store.state.districts) {
                this.districts = [];
                this.districtRegions = []
                let tmp_newDistricts = []
                this.newDistricts = []
                this.$store.state.districts.map((item) => {
                    this.districts.push(item.name);
                    this.newDistricts.push({text : item.name, value: item.id, region: item.region})
                    tmp_newDistricts.push(item.name)
                    if (this.districtRegions.indexOf(item.region) === -1){
                        this.districtRegions.push(item.region)
                    }
                });
                this.delivery_zones.map(zone =>{
                    let index = tmp_newDistricts.indexOf(zone.district)
                    if (index !== -1){
                        this.newDistricts.splice(index, 1)
                        tmp_newDistricts.splice(index, 1)
                    }
                    this.districtRegions.map(region =>{
                        if (region === zone.district){
                            this.newDistricts = this.newDistricts.filter(item =>{
                                if (item.region === region){
                                    return false
                                }
                                else {
                                    return true
                                }
                            })
                        }
                    })
                })
            }
        },
        "$store.state.delivery_cost_information": function () {
            this.deliveryCostInformation = this.$store.state.delivery_cost_information.description;
            this.deliveryCostInformationStatus = this.$store.state.delivery_cost_information.status;
        },
        "$store.state.delivery_time_information": function () {
            this.deliveryTimeInformation = this.$store.state.delivery_time_information.description;
            this.deliveryTimeInformationStatus = this.$store.state.delivery_time_information.status;
        },
        newSelectedDistricts: function(){
            this.newDistricts.map((new_district) =>{
                if (new_district.value){
                    new_district.disabled = false
                }
            })
            this.newSelectedDistricts.map(district =>{
                this.districtRegions.map(region =>{
                    if (district.text === region){
                        this.newDistricts.map((new_district) =>{
                            if (new_district.region === region && district.value !== new_district.value){
                                new_district.disabled = true
                            }
                        })
                    }
                })
            })
            this.searchNewDistrict = null
        }
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
        viewDeliveryZoneByIndex(_index) {
            this.detailDeliveryZone = this.delivery_zones[_index];

            this.reviseNotStarted = true
            this.delivery_times = [];
            this.detailDeliveryZoneDistrict = null
            this.detailDeliveryZoneDeliveryPrice = null
            this.detailDeliveryZoneMinOrderPrice = null
            this.detailDeliveryZoneFreeDeliveryFrom = null
            this.reviseDeliveryRequestComment = null
            this.detailDistricts = []

            this.$store.state.districts.map((item) => {
                this.detailDistricts.push(item.name)
            });
            this.delivery_zones.map(zone =>{
                if (zone.id !== this.detailDeliveryZone.id){
                    let index = this.detailDistricts.indexOf(zone.district)
                    if (index !== -1){
                        this.detailDistricts.splice(index, 1)
                    }
                }
            })
            if (this.detailDeliveryZone.delivery_timeframes) {
                this.detailDeliveryZone.delivery_timeframes.forEach((item) => {
                    this.delivery_times.push( item.start + " - " + item.end);
                });
            }
            this.detailDeliveryZoneDistrict = this.detailDistricts[this.detailDistricts.indexOf(this.detailDeliveryZone.district)]
            this.detailDeliveryZoneDeliveryPrice = this.detailDeliveryZone.delivery_price
            this.detailDeliveryZoneMinOrderPrice = this.detailDeliveryZone.min_order_price
            this.detailDeliveryZoneFreeDeliveryFrom = this.detailDeliveryZone.free_delivery_from

            this.view(2);
        },
        deleteDeliveryZoneByIndex(index) {
            this.deleteId = this.delivery_zones[index].id;
            this.confirmDialog = true;
        },
        deleteDeliveryZone() {
            this.confirmDialog = false;
            this.$store
                .dispatch("deleteDeliveryZone", this.deleteId)
                .then(() => {
                    this.$store.dispatch("getCompany");
                });
        },
        view(index) {
            this.listShow = false;
            this.detailShow = false;
            this.generalShow = false;
            this.addShow = false;
            switch (index) {
                case 0:
                    this.generalShow = true;
                    this.generalButtonColor = "#000";
                    this.generalButtonOutline = true;
                    this.generalButtonText = false;
                    this.districtButtonOutline = false;
                    this.districtButtonColor = "#BCBEC0";
                    this.districtButtonText = true;
                    break;
                case 1:
                    this.listShow = true;
                    this.generalButtonColor = "#BCBEC0";
                    this.generalButtonOutline = false;
                    this.generalButtonText = true;
                    this.districtButtonOutline = true;
                    this.districtButtonColor = "#000";
                    this.districtButtonText = false;
                    break;
                case 2:
                    this.detailShow = true;
                    this.generalButtonColor = "#BCBEC0";
                    this.generalButtonOutline = false;
                    this.generalButtonText = true;
                    this.districtButtonOutline = true;
                    this.districtButtonColor = "#000";
                    this.districtButtonText = false;
                    break;
                case 3:
                    this.addShow = true;
                    break;
            }
        },
        onClickOutsideOfDeliveryTimePopup() {
            this.deliveryTimePopup = false;
        },
        onClickOutsideOfNewDeliveryTimePopup() {
            this.newDeliveryTimePopup = false;
        },
        addDeliveryTime() {
            this.detailDeliveryZone.delivery_timeframes.push({
                start: "00:00",
                end: "00:00",
            });
            this.delivery_times.push({text : "00:00 - 00:00", value: this.delivery_times.length});
            this.reviseNotStarted = false
        },
        addNewDeliveryTime() {
            this.newDeliveryTimeFrames.push({
                start: "00:00",
                end: "00:00",
            });
            this.newDeliveryTimes.push("00:00 - 00:00");
        },
        removeDeliveryTime(index) {
            this.detailDeliveryZone.delivery_timeframes.splice(index, 1);
            this.delivery_times.splice(index, 1);
            this.reviseNotStarted = false
        },
        removeNewDeliveryTime(index) {
            this.newDeliveryTimeFrames.splice(index, 1);
            this.newDeliveryTimes.splice(index, 1);
        },
        new_delivery_time_changeHandler(event, index, isLeft) {
            if (isLeft) {
                this.newDeliveryTimes.splice(index, 1);
                this.newDeliveryTimes.splice(
                    index,
                    0,
                    event.target.value +
                        " - " +
                        this.newDeliveryTimeFrames[index].end
                );
                this.newDeliveryTimeFrames[index].start = event.target.value;
            } else {
                this.newDeliveryTimes.splice(index, 1);
                this.newDeliveryTimes.splice(
                    index,
                    0,
                    this.newDeliveryTimeFrames[index].start +
                        " - " +
                        event.target.value
                );
                this.newDeliveryTimeFrames[index].end = event.target.value;
            }
        },
        delivery_time_changeHandler(event, index, isLeft) {
            if (isLeft) {
                this.delivery_times.splice(index, 1);
                this.delivery_times.splice(
                    index,
                    0,
                    event.target.value +
                        " - " +
                        this.detailDeliveryZone.delivery_timeframes[index].end
                );
                this.detailDeliveryZone.delivery_timeframes[index].start =
                    event.target.value;
            } else {
                this.delivery_times.splice(index, 1);
                this.delivery_times.splice(
                    index,
                    0,
                    this.detailDeliveryZone.delivery_timeframes[index].start +
                        " - " +
                        event.target.value
                );
                this.detailDeliveryZone.delivery_timeframes[index].end =
                    event.target.value;
            }
            this.reviseNotStarted = false
        },
        addNewDeliveryConfirm(){
            if (!this.newSelectedDistricts || this.newSelectedDistricts.length === 0){
                this.$store.commit('setAlert', {
                    show: true,
                    text: 'Пожалуйста, выберите район'
                })
                return;
            }
            if (!this.newDeliveryTimeFrames || this.newDeliveryTimeFrames.length === 0){
                this.$store.commit('setAlert', {
                    show: true,
                    text: 'Пожалуйста, введите временные интервалы доставки'
                })
                return;
            }
            if (!this.newDelivery_price || this.newDelivery_price.trim() === ''){
                this.$store.commit('setAlert', {
                    show: true,
                    text: 'Пожалуйста, введите стоимость доставки'
                })
                return;
            }
            if (!this.newMin_order_price || this.newMin_order_price.trim() === ''){
                this.$store.commit('setAlert', {
                    show: true,
                    text: 'Пожалуйста, введите минимальную сумму заказа'
                })
                return;
            }
            if (!this.newFree_delivery_from || this.newFree_delivery_from.trim() === ''){
                this.$store.commit('setAlert', {
                    show: true,
                    text: 'Пожалуйста, введите сумму, с которой начинается бесплатная доставка'
                })
                return;
            }
            this.addNewDeliveryConfirmDialog = true;
        },
        addNewDeliveryZone() {
            let district_ids = [];
            this.newSelectedDistricts.map(item =>{
                if (district_ids.indexOf(item.value) === -1 && !item.disabled){
                    district_ids.push(item.value)
                }
            })
            const data = {
                district_ids,
                delivery_timeframes: this.newDeliveryTimeFrames,
                delivery_price: this.newDelivery_price,
                free_delivery_from: this.newFree_delivery_from,
                min_order_price: this.newMin_order_price,
                request_comment: this.newDeliveryRequestComment,
            };
            this.addNewDeliveryConfirmDialog = false;
            this.$store.dispatch("addDeliveryZone", data).then(() => {
                this.newSelectedDistricts = [];
                this.newDeliveryTimeFrames = [];
                this.newDeliveryTimes = [];
                this.newDelivery_price = null;
                this.newMin_order_price = null;
                this.newFree_delivery_from = null;
                this.newDeliveryRequestComment = null;
                this.view(1);
                this.$store.dispatch("getCompany");
            });
        },
        reviseDeliveryInformationSendRequest() {
            if (!this.reviseDeliveryInformationRequestComment){
                this.$store.commit('setAlert', {
                    show: true,
                    text: 'Пожалуйста добавьте причину изменения!'
                })
                return;
            }
            this.reviseDeliveryInformationConfirmDialog = false;
            let data = {
                description: this.deliveryCostInformation,
                request_comment: this.reviseDeliveryInformationRequestComment,
            };
            this.$store
                .dispatch("reviseDeliveryCostInformation", data)
                .then(() => {
                    data.description = this.deliveryTimeInformation;
                    this.$store
                        .dispatch("reviseDeliveryTimeInformation", data)
                        .then(() => {
                            this.reviseDeliveryInformationRequestComment = null;
                            this.$store.dispatch("getCompany");
                        });
                });
        },
        reviseDeliveryZoneSendRequest(){
            if (this.delivery_times.length === 0){
                this.$store.commit('setAlert', {
                    show: true,
                    text: 'Пожалуйста, добавьте временные интервалы доставки'
                })
                return;
            }
            if (!this.detailDeliveryZoneDeliveryPrice && this.detailDeliveryZoneDeliveryPrice.tirm() === ''){
                this.$store.commit('setAlert', {
                    show: true,
                    text: 'Пожалуйста, введите стоимость доставки'
                })
                return;
            }
            if (!this.detailDeliveryZoneMinOrderPrice && this.detailDeliveryZoneMinOrderPrice.tirm() === ''){
                this.$store.commit('setAlert', {
                    show: true,
                    text: 'Пожалуйста, введите минимальную сумму заказа'
                })
                return;
            }
            if (!this.detailDeliveryZoneFreeDeliveryFrom && this.detailDeliveryZoneFreeDeliveryFrom.tirm() === ''){
                this.$store.commit('setAlert', {
                    show: true,
                    text: 'Пожалуйста, введите сумму, с которой начинается бесплатная доставка'
                })
                return;
            }
            if (!this.reviseDeliveryRequestComment){
                this.$store.commit('setAlert', {
                    show: true,
                    text: 'Пожалуйста добавьте причину изменения!'
                })
                return;
            }
            let district_id;
            this.$store.state.districts.map((district) => {
                if (district.name === this.detailDeliveryZoneDistrict) {
                    district_id = district.id;
                }
            });
            const data = {
                district_id,
                delivery_timeframes: this.detailDeliveryZone.delivery_timeframes,
                delivery_price: this.detailDeliveryZoneDeliveryPrice,
                free_delivery_from: this.detailDeliveryZoneFreeDeliveryFrom,
                min_order_price: this.detailDeliveryZoneMinOrderPrice,
                request_comment: this.reviseDeliveryRequestComment,
            };
            this.reviseDeliveryConfirmDialog = false;

            this.$store.dispatch("reviseDeliveryZone", {data, id : this.detailDeliveryZone.id}).then(() => {
                this.detailDeliveryZoneDistrict = null;
                this.detailDeliveryZoneDeliveryPrice = null;
                this.detailDeliveryZoneFreeDeliveryFrom = null;
                this.detailDeliveryZoneMinOrderPrice = null;
                this.detailDeliveryZone = null;
                this.reviseDeliveryRequestComment = null;
                this.view(1);
                this.$store.dispatch("getCompany");
            });

        },

        changeDetailValue(){
            this.reviseNotStarted = false
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
.theme--dark.v-btn.v-btn--disabled:not(.v-btn--outlined):not(.v-btn--plain):not(.v-btn--text){
    background-color: rgb(239 128 128) !important;
    color: white !important;
}
.zone-timeframe-list{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.zone-timeframe-list .item:last-child .comma {
    display: none;
}
</style>

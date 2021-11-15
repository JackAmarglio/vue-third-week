<template>
    <div>
        <aboutCompanyLabel :status="company.status" />
        <div v-if="company.status === 2" class="reject-reason">
            <v-expansion-panels multiple :value="[0, 1]">
                <v-expansion-panel>
                    <v-expansion-panel-header>Причина отклонения</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <span class="normal-text">
                            {{company.declined_reason}}
                        </span>
                        <v-row v-if="company.declined_images">
                            <v-col
                                md="2"
                                sm="4"
                                xs="6"
                                v-for="(url, index) in company.declined_images"
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
                :imgs="company.declined_images"
                @hide="rejectImageGalleryShow = false"
                :index="rejectImageGalleryIndex"
            ></vue-easy-lightbox>
        </div>
        <v-row>
            <v-col md="4" sm="6" xs="10">
                <span>Наименование</span>
                <v-text-field
                    hide-details
                    outlined
                    placeholder="Введите наименование"
                    dense
                    color="#414042"
                    v-model="name"
                ></v-text-field>
            </v-col>
            <v-col md="4" sm="6" xs="10">
                <span>ИНН</span>
                <v-text-field
                    hide-details
                    outlined
                    placeholder="Введите ИНН"
                    dense
                    color="#414042"
                    v-model="inn"
                ></v-text-field>
            </v-col>
            <v-col md="4" sm="6" xs="10">
                <span>Юридическое лицо</span>
                <v-text-field
                    hide-details
                    outlined
                    placeholder="Введите наименование"
                    dense
                    color="#414042"
                    v-model="entity"
                ></v-text-field>
            </v-col>
            <v-col cols="12">
                <span>Описание</span>
                <v-textarea
                    hide-details
                    outlined
                    placeholder="Введите текст..."
                    color="#414042"
                    v-model="description"
                ></v-textarea>
            </v-col>
        </v-row>

        <v-row class="mt-5 mb-5">
            <v-col md="4" sm="12">
                <v-img
                    style="cursor: pointer"
                    height="170"
                    width="260"
                    :src="company.mainimage_url"
                    :lazy-src="company.mainimage_url"
                    @click="mainImageGalleryShow = true"
                ></v-img>
            </v-col>
            <v-col md="4" sm="12">
                <v-img
                    style="cursor: pointer"
                    height="170"
                    width="260"
                    :src="company.logo_url"
                    :lazy-src="company.logo_url"
                    @click="logoGalleryShow = true"
                ></v-img>
            </v-col>
        </v-row>
        <vue-easy-lightbox
            :visible="mainImageGalleryShow"
            :imgs="[company.mainimage_url]"
            @hide="mainImageGalleryShow = false"
        ></vue-easy-lightbox>
        <vue-easy-lightbox
            :visible="logoGalleryShow"
            :imgs="[company.logo_url]"
            @hide="logoGalleryShow = false"
        ></vue-easy-lightbox>
        <v-row>
            <v-col md=4 sm=12>
                <v-file-input
                    rounded
                    dense
                    accept="image/*"
                    label="Прикрепить изображение"
                    class="mt-7"
                    show-size
                    truncate-length="20"
                    v-model="newImageData"
                ></v-file-input>
            </v-col>
            <v-col md=4 sm=12>
                <v-file-input
                    rounded
                    dense
                    accept="image/*"
                    label="Прикрепить логотип"
                    class="mt-7"
                    show-size
                    truncate-length="20"
                    v-model="newLogoData"
                ></v-file-input>
            </v-col>
        </v-row>
        <div style="color:#555">
            Добавляйте картинки максимум <span class="t-red">1 MB</span>
        </div>
        <div class="header-text">
            <h3 class="mt-4">Время работы</h3>
        </div>
        <v-row v-for="(item, index) in timeframes" :key="index">
            <v-col md="6" sm="12">
                <span>День недели</span>
                <v-autocomplete
                    :items="days"
                    dense
                    chips
                    multiple
                    outlined
                    hide-details
                    v-model="item.working_days"
                ></v-autocomplete>
            </v-col>
            <v-col md="2" sm="12">
                <span>Время работы</span>
                <div v-click-outside="() => {onClickOutsideOfWorkingTimePopup(index)}">
                    <v-autocomplete
                        :items="item.working_times"
                        outlined
                        dense
                        class="time-text-field"
                        chips
                        hide-details
                        v-model="item.working_time"
                        readonly
                        disabled
                        @mouseup="item.workingTimePopup = true"
                    >
                    </v-autocomplete>
                    <v-card
                        v-show="item.workingTimePopup"
                        elevation="3"
                        color="#FFF"
                        class="pa-2"
                        style="position: absolute; z-index:1"
                        width="180"
                    >
                        <div class="flex-layout">
                            <the-mask
                                class="time-input left"
                                v-model="item.working_starts_at"
                                :mask="['Hh:Ii']"
                                :tokens="timeMaskToken"
                                :readonly="item.working_time_24hr_checked === true"
                                @keyup.native="working_time_changeHandler(index)"
                            />
                            <the-mask
                                class="time-input right"
                                v-model="item.working_ends_at"
                                :mask="['Hh:Ii']"
                                :tokens="timeMaskToken"
                                :readonly="item.working_time_24hr_checked === true"
                                @keyup.native="working_time_changeHandler(index)"
                            />
                        </div>
                        <v-checkbox
                            color="red"
                            label="24 hours"
                            hide-details
                            v-model="item.working_time_24hr_checked"
                            @change="working_time_24hr_checked(index)"
                        >
                        </v-checkbox>
                    </v-card>
                </div>
            </v-col>
            <v-col md="4" sm="12">
                <span>Перерыв</span>
                <div v-click-outside="()=> onClickOutsideOfBreakTimePopup(index)">
                    <v-autocomplete
                        :items="item.break_times"
                        dense
                        chips
                        multiple
                        outlined
                        hide-details
                        v-model="item.break_times"
                        readonly
                        @mouseup="item.breakTimePopup = true"
                    >
                    </v-autocomplete>
                    <v-card
                        v-show="item.breakTimePopup"
                        elevation="3"
                        color="#FFF"
                        width="180"
                        class="pa-2"
                        style="position: absolute; z-index:1"
                    >
                        <div
                            class="flex-layout mb-1"
                            v-for="(time, bIndex) in company.timeframes[index].break_times"
                            :key="bIndex"
                        >
                            <the-mask
                                class="time-input left"
                                :value="time.start"
                                :mask="['##:##']"
                                @keyup.native="
                                    break_time_changeHandler(
                                        $event,
                                        bIndex,
                                        index,
                                        true
                                    )
                                "
                            />
                            <the-mask
                                class="time-input right"
                                :value="time.end"
                                :mask="['##:##']"
                                @keyup.native="
                                    break_time_changeHandler(
                                        $event,
                                        bIndex,
                                        index,
                                        false
                                    )
                                "
                            />
                            <v-btn
                                class="mt-2"
                                icon
                                small
                                @click="removeBreakTime(bIndex, index)"
                            >
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </div>
                        <v-btn class="mt-2" text @click="addBreakTime(index)">
                            <span style="text-transform: none"> +Добавить </span>
                        </v-btn>
                    </v-card>
                </div>
            </v-col>
        </v-row>
        <v-btn class="mt-2" text color="red" @click="addTimeFrame()">
            <span style="text-transform: none">+ Добавить</span>
        </v-btn>
        <div class="mt-10 flex-layout">
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
import VueEasyLightbox from "vue-easy-lightbox";
import { TheMask } from "vue-the-mask";
import firebase from "firebase";
export default {
    components: {
        aboutCompanyLabel,
        TheMask,
        VueEasyLightbox,
    },
    watch: {
        "$store.state.company": function () {
            this.company = Object.assign({}, this.$store.state.company);
            if (this.company.name) {
                this.name = this.company.name;
            }
            if (this.company.inn) {
                this.inn = this.company.inn;
            }
            if (this.company.entity) {
                this.entity = this.company.entity;
            }
            if (this.company.description) {
                this.description = this.company.description;
            }
            this.timeframes = []
            if (this.company.timeframes && this.company.timeframes.length > 0){
                this.company.timeframes.map(item =>{
                    let timeframe = Object.assign({}, item);
                    timeframe.working_starts_at = item.working_starts_at.substr(0, 2) + item.working_starts_at.substr(3, 2);
                    timeframe.working_ends_at = item.working_ends_at.substr(0, 2) + item.working_ends_at.substr(3, 2);
                    if ( item.working_starts_at === "00:00:00" && item.working_ends_at === "24:00:00" ) {
                        timeframe.working_time_24hr_checked = true;
                    }
                    timeframe.break_times = []
                    if (item.break_times) {
                        item.break_times.forEach((break_time) => {
                            timeframe.break_times.push({text : break_time.start + " - " + break_time.end, value : timeframe.break_times.length});
                        });
                    }
                    timeframe.workingTimePopup = false
                    timeframe.breakTimePopup = false
                    timeframe.working_times = [];
                    const value = timeframe.working_starts_at.substr(0, 2) + ":" + timeframe.working_starts_at.substr(2) + " - " +
                        timeframe.working_ends_at.substr(0, 2) + ":" + timeframe.working_ends_at.substr(2);
                    timeframe.working_times.push(value);
                    timeframe.working_time = value;
                    this.timeframes.push(timeframe)
                })
            }
        }
    },
    data() {
        return {
            days: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
            company: {},
            name: null,
            inn: null,
            entity: null,
            description: null,

            timeframes: [],

            working_days: null,
            workingTimePopup: false,
            breakTimePopup: false,
            working_starts_at: null,
            working_ends_at: null,
            working_times: [],
            working_time: null,
            break_times: [],
            
            newImageData: null,
            newLogoData: null,
            requestDialog: false,
            requestComment: null,

            mainImageGalleryShow: false,
            logoGalleryShow: false,

            rejectImageGalleryShow: false,
            rejectImageGalleryIndex: null,

            timeMaskToken: {
                H: {
                    pattern: /[0-2]/,
                },
                h: {
                    pattern: /[0-9]/,
                },
                I: {
                    pattern: /[0-6]/,
                },
                i: {
                    pattern: /[0-9]/,
                },
            },
        };
    },
    methods: {
        working_time_24hr_checked: function (index) {
            if (this.timeframes[index].working_time_24hr_checked) {
                this.timeframes[index].working_starts_at = "0000";
                this.timeframes[index].working_ends_at = "2400";
            } 
            else {
                this.timeframes[index].working_starts_at = this.timeframes[index].working_starts_at.substr(0, 2) + this.timeframes[index].working_starts_at.substr(2);
                this.timeframes[index].working_ends_at = this.timeframes[index].working_ends_at.substr(0, 2) + this.timeframes[index].working_ends_at.substr(2);
            }
            this.working_time_changeHandler(index)
        },
        onClickOutsideOfWorkingTimePopup(index) {
            this.timeframes[index].workingTimePopup = false;
        },
        onClickOutsideOfBreakTimePopup(index) {
            this.timeframes[index].breakTimePopup = false;
        },
        addBreakTime(timeframeIndex) {
            this.company.timeframes[timeframeIndex].break_times.push({
                start: "00:00",
                end: "00:00",
            });
            this.timeframes[timeframeIndex].break_times.push({text : "00:00 - 00:00", value: this.timeframes[timeframeIndex].break_times.length});
        },
        removeBreakTime(index, timeframeIndex) {
            this.company.timeframes[timeframeIndex].break_times.splice(index, 1);
            this.timeframes[timeframeIndex].break_times.splice(index, 1);
        },
        break_time_changeHandler(event, index, timeframeIndex, isLeft) {
            this.timeframes[timeframeIndex].break_times.splice(index, 1);
            if (isLeft) {
                this.timeframes[timeframeIndex].break_times.splice(
                    index,
                    0,
                    event.target.value +
                        " - " +
                        this.company.timeframes[timeframeIndex].break_times[index].end
                );
                this.company.timeframes[timeframeIndex].break_times[index].start = event.target.value;
            } else {
                this.timeframes[timeframeIndex].break_times.splice(
                    index,
                    0,
                    this.company.timeframes[timeframeIndex].break_times[index].start +
                        " - " +
                        event.target.value
                );
                this.company.timeframes[timeframeIndex].break_times[index].end = event.target.value;
            }
        },
        working_time_changeHandler(index){
            this.timeframes[index].working_times = [];
            const value =
                this.timeframes[index].working_starts_at.substr(0, 2) + ":" + this.timeframes[index].working_starts_at.substr(2) + " - " +
                this.timeframes[index].working_ends_at.substr(0, 2) + ":" + this.timeframes[index].working_ends_at.substr(2);
            this.timeframes[index].working_times.push(value);
            this.timeframes[index].working_time = value;
            this.$forceUpdate();
        },
        async sendReviseRequest() {
            if (!this.requestComment){
                this.$store.commit('setAlert', {
                    show: true,
                    text: 'Пожалуйста добавьте причину изменения!'
                })
                console.log(this.company.timeframes)
                return;
            }
            this.requestDialog = false;
            this.$store.dispatch("setProcessing", true);
            let data = {
                name: this.name,
                inn: this.inn,
                entity: this.entity,
                description: this.description,
                request_comment: this.requestComment,
            };
            if (this.newImageData) {
                data.mainimage_url = await this.uploadImage(this.newImageData);
            }
            if (this.newLogoData){
                data.logo_url = await this.uploadImage(this.newLogoData);
            }
            data.timeframes = []
            this.timeframes.map((item,index) => {
                let timeframe = {}
                timeframe.working_days = item.working_days
                timeframe.working_starts_at = item.working_starts_at.substr(0, 2) + ":" + item.working_starts_at.substr(2) + ":00";
                timeframe.working_ends_at = item.working_ends_at.substr(0, 2) + ":" + item.working_ends_at.substr(2) + ":00"
                timeframe.break_times = this.company.timeframes[index].break_times
                data.timeframes.push(timeframe)
            })
            this.$store.dispatch("reviseCompany", data).then(() => {
                this.requestComment = null;
                this.$store.dispatch("getCompany");
            })
            .catch(error =>{
                console.log(error)
                this.$store.dispatch("setProcessing", true);
            });
            this.newImageData = null
            this.newLogoData = null
        },
        async uploadImage(Image){
            return await new Promise((resolve, reject) =>{
                try {
                    const time = new Date().getTime();
                    const storageRef = firebase.storage().ref(`/logo_images/${time}`).put(Image);
                    storageRef.on(
                        `state_changed`,
                        (snapshot) => {
                            var progress =
                                (snapshot.bytesTransferred / snapshot.totalBytes) *
                                100;
                            console.log("Upload is " + progress + "% done");
                        },
                        (error) => {
                            reject(error)
                            this.$store.dispatch("setProcessing", false);
                        },
                        async () => {
                            return resolve(await storageRef.snapshot.ref.getDownloadURL())
                        })
                } catch (error) {
                    return reject(error)
                }
            })
        },
        addTimeFrame(){
            this.timeframes.push({
                breakTimePopup: false,
                break_times: [],
                workingTimePopup: false,
                working_days: [],
                working_ends_at: '0000',
                working_starts_at: '0000',
                working_time: '00:00 - 00:00',
                working_times: ["00:00 - 00:00"]
            })
            this.company.timeframes.push({
                break_times: [],
                working_days: [],
                working_ends_at: '00:00:00',
                working_starts_at: '00:00:00'
            })
        }
    },
};
</script>
<style>
.v-application .headline {
    font-size: 14pt !important;
}
span,
label,
input,
textarea {
    font-size: 11pt;
}
.flex-layout {
    display: flex;
}
.grey-text {
    color: #4d4f52 !important;
    font-weight: 300;
}
.normal-text {
    text-transform: none;
}
.time-text-field input {
    text-align: center;
}
.v-chip--disabled {
    opacity: 1 !important;
}
.time-input {
    border: 1px solid;
    border-color: #999;
    width: 50%;
    padding: 3px;
    text-align: center;
    height: 40px;
    outline: none;
}
.time-input.left {
    border-radius: 5px 0px 0px 5px;
}
.time-input.right {
    border-radius: 0px 5px 5px 0px;
}
.reject-reason .v-expansion-panels .v-expansion-panel::before{
    box-shadow: none;
}
.reject-reason .v-expansion-panels .v-expansion-panel{
    background: transparent;
}
.reject-reason .v-expansion-panels .v-expansion-panel .v-expansion-panel-header {
    padding-left: 0px;
}
.reject-reason .v-expansion-panels .v-expansion-panel .v-expansion-panel-header .v-expansion-panel-header__icon{
    margin-left: 50px;
}
.reject-reason .v-expansion-panels .v-expansion-panel .v-expansion-panel-content__wrap{
    padding-left: 0px;
}
.t-red{
    color: red;
}
</style>

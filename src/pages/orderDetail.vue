<template>
    <v-main>
        <div class="root"  v-if="order">
            <h2>Заказы</h2>
            <div class="mt-10 flex-layout">
                <h3>Заказ № {{order.company.id}} - {{order.id}}</h3>
                <v-badge
                    dot
                    :color="getColorByStatus(order.status)"
                    offset-x="-20"
                    offset-y="19"
                    class="ml-10 mr-10"
                ></v-badge>
                <span class="text" style="margin-top:3px">
                    {{getTextByStatus(order.status)}}
                </span>
                <div style="margin: -5px 0 auto auto;">
                    <v-btn @click="orderItemStatusChange(5)" v-if="order.status !== 4 && order.status !== 5" text class="normal-text mr-4" height="40" color="#BCBEC0">Отменить</v-btn>
                    <v-btn @click="orderItemStatusChange(1)" outlined class="normal-text" height="40" width="170" color="red" v-if="order.status === 0">Принять</v-btn>
                    <v-btn @click="orderItemStatusChange(2)" outlined class="normal-text" height="40" width="170" color="red" v-else-if="order.status === 1">Собрать заказ</v-btn>
                    <v-btn @click="orderItemStatusChange(3)" outlined class="normal-text" height="40" width="170" color="red" v-else-if="order.status === 2">Отвезти заказ</v-btn>
                    <v-btn @click="orderItemStatusChange(4)" outlined class="normal-text" height="40" width="170" color="red" v-else-if="order.status === 3">Заказ доставлен</v-btn>
                </div>
            </div>
            <div class="reject-reason mt-2">
                <v-expansion-panels multiple :value="[0, 1]">
                    <v-expansion-panel>
                        <v-expansion-panel-header class="bold">General Promo</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <div class="thin" style="font-size:11pt" v-html="order.company.promo_information">
                            </div>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </div>
            <v-row class="mt-2">
                <v-col md="3" v-if="order.status > 2 && order.status < 5">
                    <span>Телефон</span>
                    <v-text-field
                        hide-details
                        outlined
                        dense
                        color="#414042"
                        readonly
                        :value="order.user_phone"
                        class="pt-1"
                    ></v-text-field>
                </v-col>
                <v-col :md="order.status > 2 && order.status < 5 ? 3 : 4">
                    <span>Дата заказа</span>
                    <v-text-field
                        hide-details
                        outlined
                        dense
                        color="#414042"
                        readonly
                        :value="(new Date(order.created_at)).toLocaleString()"
                        class="pt-1"
                    ></v-text-field>
                </v-col>
                <v-col :md="order.status > 2 && order.status < 5 ? 3 : 4">
                    <span>Время доставки</span>
                    <v-autocomplete
                        hide-details
                        outlined
                        dense
                        color="#414042"
                        readonly
                        :items="[order.delivery_timeframe.start + ' - ' + order.delivery_timeframe.end]"
                        :value="order.delivery_timeframe.start + ' - ' + order.delivery_timeframe.end"
                        class="pt-1"
                        chips
                    ></v-autocomplete>
                </v-col>
                <v-col :md="order.status > 2 && order.status < 5 ? 3 : 4">
                    <span>Сумма заказа, ₽</span>
                    <v-text-field
                        hide-details
                        outlined
                        dense
                        color="#414042"
                        readonly
                        :value="order.order_price"
                        class="pt-1"
                    ></v-text-field>
                </v-col>
                <v-col md="12">
                    <span>Адрес доставки</span>
                    <v-text-field
                        hide-details
                        outlined
                        dense
                        color="#414042"
                        readonly
                        :value="order.user_address.address"
                        class="pt-1"
                    ></v-text-field>
                </v-col>
                <v-col md="3">
                    <span>Подъезд</span>
                    <v-text-field
                        hide-details
                        outlined
                        dense
                        color="#414042"
                        readonly
                        :value="order.user_address.entrance"
                        class="pt-1"
                    ></v-text-field>
                </v-col>
                <v-col md="3">
                    <span>Домофон</span>
                    <v-text-field
                        hide-details
                        outlined
                        dense
                        color="#414042"
                        readonly
                        :value="order.user_address.intercom"
                        class="pt-1"
                    ></v-text-field>
                </v-col>
                <v-col md="3">
                    <span>Кв/Офис</span>
                    <v-text-field
                        hide-details
                        outlined
                        dense
                        color="#414042"
                        readonly
                        :value="order.user_address.apt_office"
                        class="pt-1"
                    ></v-text-field>
                </v-col>
                <v-col md="3">
                    <span>Этаж</span>
                    <v-text-field
                        hide-details
                        outlined
                        dense
                        color="#414042"
                        readonly
                        :value="order.user_address.floor"
                        class="pt-1"
                    ></v-text-field>
                </v-col>
                <v-col md="12">
                    <span>Комментарий курьеру</span>
                    <v-text-field
                        hide-details
                        outlined
                        dense
                        color="#414042"
                        readonly
                        :value="order.user_address.comments"
                        class="pt-1"
                    ></v-text-field>
                </v-col>
                <v-col md="12">
                    <span>Комментарий к заказу</span>
                    <v-text-field
                        hide-details
                        outlined
                        dense
                        color="#414042"
                        readonly
                        :value="order.comment"
                        class="pt-1"
                    ></v-text-field>
                </v-col>
            </v-row>
            <h3 class="mt-10">Продукты</h3>
            <v-row
                class="pa-1"
                v-for="(item, index) in order.products"
                :key="index"
            >
                <v-col md="12" class="pt-0 pb-0 flex-layout">
                   <v-img
                    height="100"
                    width="110"
                    max-width="110"
                    :src="item.product.images[0] ? item.product.images[0].image_url : null"
                    ></v-img>
                    <div class="pa-4 ml-4">
                        <p class="flex-layout bold">
                            {{item.product.name}}
                            <span style="color:red;margin-top:2px" class="ml-3">X {{item.product_count}}</span>
                            <img v-if="item.product.hasPromo === 1" class="ml-5 mt-1" width="18px" height="18px" src="/img/promo.svg">
                        </p>
                        <span class="thin">{{item.product.subcategory}}</span>
                        <span class="bold ml-10">{{item.product.hasPromo === 1 ? item.product.promo.new_price : item.product.price}}₽</span>
                    </div>
                </v-col>
            </v-row>
            <v-dialog v-model="confirmDialog" width="500">
                <v-card>
                    <v-card-title class="headline">
                        <v-icon class="mr-2">mdi-delete</v-icon>
                        Аккуратно, у вас могут быть штрафы!
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-body>
                        <p class="pl-6 pr-6 thin">При смене статуса заказа, возврат к предыдущему статусу будет невозможен. При выборе статуса Отменено, вы соглашаетесь с тем, что Local Market может списать с вас штраф за отмену заказа.</p>
                    </v-card-body>
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
                            @click="confirmCancelOrder"
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
            <v-dialog v-model="confirmChangeDialog" width="500">
                <v-card>
                    <v-card-title class="headline">
                        <v-icon class="mr-2">mdi-pen</v-icon>
                        Подтверждение
                    </v-card-title>
                    <v-divider></v-divider>
                    <p class="pa-10">{{confirmChangeText}}</p>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            outlined
                            @click="confirmChangeDialog = false"
                            color="#7d7d7d"
                            class="normal-text"
                            width="120"
                            height="40"
                        >
                            Нет
                        </v-btn>
                        <v-btn
                            dark
                            @click="confirmChangeStatusOrder"
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
    </v-main>
</template>

<script>
export default {
    mounted() {

    },
    async created() {
        if (!this.$store.state.orders.length){
            await this.$store.dispatch("getOrders")
        }
        this.$store.state.orders.some(order =>{
            if (order.id == this.orderId){
                this.order = order
                return true
            }
        })
    },
    watch: {
        '$store.state.orders': function(){
            this.$store.state.orders.some(order =>{
                if (order.id == this.orderId){
                    this.order = order
                    return true
                }
            })
        }
    },
    data() {
        return {
            orderId: this.$route.params.id,
            order: null,

            confirmDialog: false,

            confirmChangeDialog: false,
            confirmChangeStatus: null,
            confirmChangeText: null
        }
    },
    methods: {
        getColorByStatus(status){
            switch(status){
                case 0:
                    return 'green'
                case 1:
                    return 'blue'
                case 2:
                    return 'yellow'
                case 3:
                    return 'grey'
                case 4:
                    return 'green'
                case 5:
                    return 'red'
            }
        },
        getTextByStatus(status){
            switch (status) {
                case 0:
                    return 'Создан'
                case 1:
                    return 'Принят'
                case 2:
                    return 'Собирается'
                case 3:
                    return 'У курьера'
                case 4:
                    return 'Доставлен'
                case 5:
                    return 'Отменен'
            }
        },
        orderItemStatusChange(status) {
            if (status === 5){
                // if order is cancelled, show penalty dialog
                this.confirmDialog = true
                return
            }
            this.confirmChangeStatus = status
            switch(status){
                case 1:
                    this.confirmChangeText = 'Вы уверены? При смене статуса заказа, возврат к предыдущему статусу будет невозможен'
                break;
                case 2:
                    this.confirmChangeText = 'Вы уверены? При смене статуса заказа, возврат к предыдущему статусу будет невозможен'
                break;
                case 3:
                    this.confirmChangeText = 'Вы уверены? При смене статуса заказа, возврат к предыдущему статусу будет невозможен'
                break;
                case 4:
                    this.confirmChangeText = 'Вы уверены? При смене статуса заказа, возврат к предыдущему статусу будет невозможен'
                break;
            }
            this.confirmChangeDialog = true
        },
        confirmCancelOrder(){
            this.confirmDialog = false
            this.$store
                .dispatch("reviseOrderStatus", {
                    id : this.orderId,
                    data: {
                        status : 5,
                    },
                })
                .then(() => {
                    this.$store.dispatch("getOrders");
                });
        },
        confirmChangeStatusOrder(){
            this.confirmChangeDialog = false
            this.$store
                .dispatch("reviseOrderStatus", {
                    id: this.orderId,
                    data: {
                        status : this.confirmChangeStatus,
                    },
                })
                .then(() => {
                    this.$store.dispatch("getOrders");
                });
        }
    },
}
</script>

<style>

</style>

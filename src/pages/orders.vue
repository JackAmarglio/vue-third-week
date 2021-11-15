<template>
    <v-main>
        <div class="root">
            <div style="display: inline">
                <h2 style="display: inline">Заказы</h2>
                <h2 style="float: right">{{ allPrice }} ₽</h2>
            </div>
            <div class="mt-5 flex-layout">
                <div class="pa-5" style="background: #ffb800; width: 73px">
                    <span class="exclamation">
                        <v-icon size="27" color="#FFF">mdi-exclamation</v-icon>
                    </span>
                </div>
                <div class="pa-3" style="border: 2px solid #ffb800">
                    Перед отправкой заказа, обязательно проверьте его на
                    соответствие подаркам и акциям, наклейте необходимые
                    наклейки или приложите необходимые материалы
                </div>
            </div>
            <div class="mt-5">
                <v-list-item class="order-item" v-for="(order, index) in orders" :key="index">
                    <v-row>
                        <v-col md="9">
                            <router-link class="no-underline" :to="'/orders/' + order.id">
                                <v-row>
                                    <v-col md="1" class="pt-2 pb-2">
                                        <p class="thin">№ {{ order.company.id }} - {{ order.id }}</p>
                                    </v-col>
                                    <v-col md="7" class="pt-2 pb-2">
                                        {{ order.user_address.address }}
                                    </v-col>
                                    <v-col md="1" class="pt-2 pb-2">
                                        {{ order.order_price }} ₽</v-col
                                    >
                                    <v-col md="3" class="right pt-2 pb-2">
                                        {{
                                            new Date(
                                                order.created_at
                                            ).toLocaleString()
                                        }}
                                    </v-col>
                                    <v-col md="5" class="pt-2 pb-2 flex">
                                        <v-chip class="mr-3">{{
                                            order.delivery_day === 0
                                                ? "Сегодня"
                                                : "Завтра"
                                        }}</v-chip>
                                        <v-chip
                                            >с
                                            {{ order.delivery_timeframe.start }}
                                            до
                                            {{
                                                order.delivery_timeframe.end
                                            }}
                                        </v-chip>
                                    </v-col>
                                </v-row>
                            </router-link>
                        </v-col>

                        <v-col md="3" class="right pt-4 pb-2 pl-0 pr-0">
                            <div>
                                <v-badge
                                    dot
                                    :color="getColorByStatus(order.status)"
                                    left
                                    offset-x="-7"
                                    offset-y="0"
                                    outline
                                    bordered
                                    class="mr-2"
                                ></v-badge>
                                <span class="thin">{{ getTextByStatus(order.status) }}</span>
                            </div>
                            <div class="flex mt-10">
                                <v-btn
                                    @click="orderItemStatusChange(order.id, 5)"
                                    v-if="
                                        order.status !== 4 && order.status !== 5
                                    "
                                    text
                                    class="normal-text"
                                    color="#BCBEC0"
                                    >Отменить</v-btn
                                >
                                <v-btn
                                    @click="orderItemStatusChange(order.id, 1)"
                                    text
                                    v-if="order.status === 0"
                                    class="normal-text"
                                    color="red"
                                    >Принять</v-btn
                                >
                                <v-btn
                                    @click="orderItemStatusChange(order.id, 2)"
                                    text
                                    v-else-if="order.status === 1"
                                    class="normal-text"
                                    color="red"
                                    >Начать сборку заказа</v-btn
                                >
                                <v-btn
                                    @click="orderItemStatusChange(order.id, 3)"
                                    text
                                    v-else-if="order.status === 2"
                                    class="normal-text"
                                    color="red"
                                    >Доставить заказ</v-btn
                                >
                                <v-btn
                                    @click="orderItemStatusChange(order.id, 4)"
                                    text
                                    v-else-if="order.status === 3"
                                    class="normal-text"
                                    color="red"
                                    >Заказ доставлен</v-btn
                                >
                            </div>
                        </v-col>
                        <v-col cols="12" class="pt-2 pa-0">
                            <v-divider></v-divider>
                        </v-col>
                    </v-row>
                </v-list-item>
            </div>
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
    created() {
        this.$store.dispatch("getOrders");
    },
    watch: {
        "$store.state.orders": function () {
            this.orders = this.$store.state.orders;
            this.allPrice = 0;
            this.orders.map((order) => {
                this.allPrice += order.order_price;
            });
        },
    },
    mounted() {
        this.orders = this.$store.state.orders;
        this.allPrice = 0;
        this.orders.map((order) => {
            this.allPrice += order.order_price;
        });
    },
    data() {
        return {
            orders: [],
            allPrice: 0,
            confirmDialog: false,
            cancelId: null,

            confirmChangeDialog: false,
            confirmChangeId: null,
            confirmChangeStatus: null,
            confirmChangeText: null
        };
    },
    methods: {
        getColorByStatus(status) {
            switch (status) {
                case 0:
                    return "green";
                case 1:
                    return "blue";
                case 2:
                    return "yellow";
                case 3:
                    return "grey";
                case 4:
                    return "green";
                case 5:
                    return "red";
            }
        },
        getTextByStatus(status) {
            switch (status) {
                case 0:
                    return "Создан";
                case 1:
                    return "Принят";
                case 2:
                    return "Собирается";
                case 3:
                    return "У курьера";
                case 4:
                    return "Доставлен";
                case 5:
                    return "Отменен";
            }
        },
        orderItemStatusChange(id, status) {
            if (status === 5){
                // if order is cancelled, show penalty dialog
                this.confirmDialog = true
                this.cancelId = id
                return
            }
            this.confirmChangeId = id
            this.confirmChangeStatus = status
            switch(status){
                case 1:
                    this.confirmChangeText = 'Принять этот заказ?'
                break;
                case 2:
                    this.confirmChangeText = 'Начать сборку этого заказа?'
                break;
                case 3:
                    this.confirmChangeText = 'Начать доставку этого заказа?'
                break;
                case 4:
                    this.confirmChangeText = 'Пометить заказ как доставленный?'
                break;
            }
            this.confirmChangeDialog = true
        },
        confirmCancelOrder(){
            this.confirmDialog = false
            this.$store
                .dispatch("reviseOrderStatus", {
                    id : this.cancelId,
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
                    id: this.confirmChangeId,
                    data: {
                        status : this.confirmChangeStatus,
                    },
                })
                .then(() => {
                    this.$store.dispatch("getOrders");
                });
        }
    },
};
</script>

<style scoped>
.exclamation {
    border: 2px solid rgb(255, 255, 255);
    border-radius: 15px;
    height: 31px;
    display: inline-block;
}
.order-item:hover{
    outline: 1px solid;
}
</style>>

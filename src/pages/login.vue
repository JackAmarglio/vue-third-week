<template>
    <v-main>
        <div class="login-panel">
            <v-img
                class="logo"
                src="/img/logo.svg"
                max-width="66px"
                max-height="51px"
            />
            <div class="login-input">
                <p class="label">Логин</p>
                <v-text-field
                    @keyup="submit"
                    placeholder="Введите логин"
                    color="#414042"
                    :error="loginFailed"
                    v-model="login"
                    outlined
                    hide-details
                    dense
                ></v-text-field>
                <a class="thin grey-text underline" @click="forgotPasswordDialog = true">Забыли логин?</a>
                <p class="label mt-5">Пароль</p>
                <v-text-field
                    @keyup="submit"
                    placeholder="Введите пароль"
                    color="#414042"
                    :error="loginFailed"
                    v-model="password"
                    outlined
                    hide-details
                    dense
                    type="password"
                ></v-text-field>
                <a class="thin grey-text underline" @click="forgotPasswordDialog = true">Забыли пароль?</a>
                <p
                    class="label"
                    style="color: red; float: right"
                    v-show="loginFailed"
                >
                    Неверный логин или пароль
                </p>
            </div>
            <v-btn class="mt-7" width="100%" height="40px" color="#FF2D34" depressed :loading="loading" dark up @click="doLogin()">Войти</v-btn>
            <v-btn
                class="mt-3"
                width="100%"
                height="40px"
                color="#BCBEC0"
                outlined
                dark
                up
                @click="PartnerRequestDialog = true"
            >
                <span style="color: #ff2d34">Зарегистрироваться</span>
            </v-btn>
        </div>
        <v-dialog v-model="PartnerRequestDialog" width="400">
            <v-card class="pb-3">
                <v-card-title class="headline pr-1 pl-3">
                    <v-icon color="black" class="mr-2"
                        >mdi-account-circle</v-icon
                    >
                    Запрос на регистрацию
                    <v-btn
                        icon
                        dark
                        @click="PartnerRequestDialog = false"
                        color="grey"
                        style="margin-left: auto"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <div class="ma-4">
                    <span>Имя</span>
                    <v-text-field
                        placeholder="Введите ваше имя"
                        color="#414042"
                        v-model="requestName"
                        outlined
                        hide-details
                        class="mb-4"
                        dense
                    ></v-text-field>
                    <span>Телефон</span>
                    <v-text-field
                        placeholder="Введите номер телефона"
                        color="#414042"
                        v-model="requestPhone"
                        outlined
                        hide-details
                        class="mb-4"
                        dense
                    ></v-text-field>
                    <span>Email</span>
                    <v-text-field
                        placeholder="Введите эл. почту"
                        color="#414042"
                        v-model="requestEmail"
                        outlined
                        hide-details
                        class="mb-4"
                        dense
                    ></v-text-field>
                </div>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        dark
                        @click="sendPartnerRequest"
                        color="red"
                        class="normal-text"
                        width="100%"
                        height="40"
                        depressed
                    >
                        Отправить
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="PartnerRequestSentAlertDialog" width="500">
            <v-card>
                <v-card-title class="headline bold">
                    Мы приняли вашу заявку
                </v-card-title>
                <v-card-body>
                    <p class="pl-6 pr-6 thin">Спасибо за запрос на регистрацию.</p>
                </v-card-body>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        dark
                        @click="PartnerRequestSentAlertDialog = false"
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
        <v-dialog v-model="forgotPasswordDialog" width="500">
            <v-card>
                <v-card-title class="headline bold">
                    Что делать, если вы забыли логин или пароль?
                </v-card-title>
                <v-card-body>
                    <p class="pl-6 pr-6 thin">Напишите в службу поддержки, и мы предоставим вам новые.</p>
                </v-card-body>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        dark
                        @click="forgotPasswordDialog = false"
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
    </v-main>
</template>

<script>
export default {
    data() {
        return {
            login: null,
            password: null,
            loginFailed: false,
            loading: null,

            PartnerRequestDialog: false,
            requestName: null,
            requestPhone: null,
            requestEmail: null,

            PartnerRequestSentAlertDialog: false,
            forgotPasswordDialog: false
        };
    },
    created() {
        if (this.$store.getters.isLoggedIn) {
            this.$router.push("/orders");
        }
    },
    methods: {
        submit(key) {
            if (key.key === "Enter") {
                this.doLogin();
            }
        },
        doLogin() {
            const login = this.login;
            const password = this.password;
            this.loading = true;
            this.$store
                .dispatch("login", { login, password })
                .then(() => this.$router.push("/orders"))
                .catch(() => {
                    this.loginFailed = true;
                    this.loading = false;
                });
        },
        sendPartnerRequest() {
            if (!this.requestName || this.requestName.trim() == "") {
                this.$store.commit("setAlert", {
                    show: true,
                    text: "Пожалуйста, введите корректное имя",
                });
                return;
            }
            if (!this.requestPhone || this.requestPhone.trim() == "") {
                this.$store.commit("setAlert", {
                    show: true,
                    text: "Пожалуйста, введите корректный телефонный номер",
                });
                return;
            }
            if (!this.requestEmail || this.requestEmail.trim() == "") {
                this.$store.commit("setAlert", {
                    show: true,
                    text: "Пожалуйста, введите корректный email",
                });
                return;
            }
            this.PartnerRequestDialog = false;
            this.$store
                .dispatch("sendPartnerRequest", {
                    name: this.requestName,
                    phone: this.requestPhone,
                    email: this.requestEmail,
                })
                .then(() => {
                    this.PartnerRequestSentAlertDialog = true
                })
                .catch(() => {
                    this.$store.commit("setAlert", {
                        show: true,
                        text: "Что-то пошло не так!",
                    });
                    return;
                });
        },
    },
};
</script>

<style scoped>
.login-panel {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
}
.login-panel .logo {
    margin: auto;
}
.login-panel .login-input {
    margin-top: 40px;
    min-width: 300px;
    width: 300px;
}
.login-panel .login-input .label {
    color: #414042;
    font-size: 11pt;
    margin-bottom: 5px;
    margin-left: 5px;
    font-weight: 300;
}
.login-panel .login-input .forgot-link {
    color: #414042;
    text-decoration: none;
    margin-top: 3px;
    font-size: 11pt;
}
.login-panel .login-input .forgot-link:hover {
    text-decoration: underline;
}
</style>
<style>
.login-panel .v-btn__content {
    text-transform: none !important;
}
</style>

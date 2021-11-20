<template>
  <div>
    <div class="login-panel">
      <div class="login-input">
        <v-text-field
          @keyup="submit"
          placeholder="Email"
          color="white"
          background-color="white"
          :error="loginFailed"
          v-model="email"
          outlined
          hide-details
          dense
          type="email"
        ></v-text-field>
        <v-text-field
          @keyup="submit"
          placeholder="Password"
          style="padding-top: 30px"
          color="#414042"
          background-color="white"
          :error="loginFailed"
          v-model="password"
          outlined
          hide-details
          dense
          type="password"
        ></v-text-field>
        
        <p class="label" style="color: red; float: right" v-show="loginFailed">
          invalid email or password
        </p>
      </div>
      <v-btn
        style="margin-top: 30px"
        width="100%"
        height="40px"
        color="#FF2D34"
        depressed
        :loading="loading"
        dark
        up
        @click="doLogin()"
        >Login</v-btn
      >
      <v-btn
        style="margin-top: 30px"
        class="btn btn-success"
        width="100%"
        height="40px"
        color="white"
        outlined
        dark
        up
        @click="register_model = true"
      >
        <span style="color: white">Register</span>
      </v-btn>
      <v-btn
        class="btn btn-danger"
        style="margin-top: 30px"
        width="100%"
        height="40px"
        color="white"
        outlined
        dark
        up
        @click="Doforgot"
      >
        <span style="color: white">Forgot Password</span>
      </v-btn>
    </div>
    <div data-app>
      <v-dialog v-model="register_model" width="600">
        <v-card class="pb-3" style="padding: 30px">
          <v-card-title class="headline">
            <v-icon color="black" class="mr-2">mdi-account-circle</v-icon>
            Register Info
            <v-btn
              icon
              dark
              @click="register_model = false"
              color="grey"
              style="margin-left: auto; background: red"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <div class="ma-4">
            <span>Email</span>
            <v-text-field
              placeholder="Enter your Email"
              color="#414042"
              v-model="requestEmail"
              outlined
              hide-details
              class="mb-4"
              dense
            ></v-text-field>
            <span>Password</span>
            <v-text-field
              placeholder="Enter your Password"
              type="password"
              color="#414042"
              v-model="requestPassword"
              outlined
              hide-details
              class="mb-4"
              dense
            ></v-text-field>
            <span>Password Confirm</span>
            <v-text-field
              placeholder="Password Confirm"
              type="password"
              color="#414042"
              v-model="requestConfirmPassword"
              outlined
              hide-details
              class="mb-4"
              dense
            ></v-text-field>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              @click="sendRegisterRequest"
              color="primary"
              width="100%"
              height="40"
              depressed
              style="background: green"
            >
              send
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null,
      loginFailed: false,
      loading: null,

      register_model: false,
      requestName: null,
      requestEmail: null,
      requestPassword: null,
      requestConfirmPassword: null,

      PartnerRequestSentAlertDialog: false,
      forgotPasswordDialog: false,
    };
  },
  created() {
    if (this.$store.getters.isLoggedIn) {
      this.$router.push("/main");
    }
  },
  methods: {
    submit(key) {
      if (key.key === "Enter") {
        this.doLogin();
      }
    },
    
    Doforgot() {
      this.$router.push("/sendrequest");
    },

    doLogin() {
      
      const data = {
        email: this.email,
        password: this.password,
      }
      this.loading = true;
      this.$store
        .dispatch("login", data)
        .then(() => this.$router.push("/main"))
        .catch((err) => {
          console.log(err);
          this.loginFailed = true;
          this.loading = false;
        });
    },
    sendRegisterRequest() {
      if (!this.requestEmail || this.requestEmail.trim() == "") {
        this.$store.commit("setAlert", {
          show: true,
          text: "Please enter a valid email",
        });
        return;
      }
      if (!this.requestPassword || this.requestPassword.trim() == "") {
        this.$store.commit("setAlert", {
          show: true,
          text: "Please enter a valid password",
        });
        return;
      }
      if (!this.requestConfirmPassword || this.requestConfirmPassword.trim() == "") {
        this.$store.commit("setAlert", {
          show: true,
          text: "Please enter a valid password",
        });
        return;
      }
      if (this.requestPassword != this.requestConfirmPassword) {
        this.$store.commit("setAlert", {
          show: true,
          text: "Please enter a valid password",
        });
        return;
      }
      this.register_model = false;
      this.$store
        .dispatch("register", {
          email: this.requestEmail,
          password: this.requestPassword,
          passwordconfirm: this.requestConfirmPassword,
        })
        .then(() => {
          this.PartnerRequestSentAlertDialog = true;
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
  top: 40%;
  left: 50%;
  background-color: white;
  padding: 50px;
  margin-top: 100px;
  border-radius: 20px;
  border: black solid 5px;
  opacity: 1;
}
.login-panel .logo {
  border-radius: 50%;
  margin: auto;
  border: grey solid 10px;
}
.login-panel .login-input {
  margin-top: 40px;
  min-width: 300px;
  width: 100%;
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

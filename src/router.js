import Vue from "vue";
import Router from "vue-router";
import store from "./store";

import SendRequestEmail from "./pages/sendrequestemail.vue";
import Login from "./pages/login.vue";
import Main from "./main.vue";
import VerifyEmail from "./pages/verify.vue"
import ForgotPassword from "./pages/forgotpassword.vue"

Vue.use(Router);

let router = new Router({
  mode: "history",
  routes: [
    {
      path: "/verify/:token",
      name: "verify",
      component: VerifyEmail
    },
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/main",
      name: "main",
      component: Main,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/sendrequest",
      name: "sendrequest",
      component: SendRequestEmail
    },
    {
      path: "/forgotpassword",
      name: "forgotpassword",
      component: ForgotPassword
    }
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/");
  } else {
    next();
  }
});

export default router;

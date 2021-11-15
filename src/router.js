import Vue from "vue";
import Router from "vue-router";
import store from "./store";

import NotFound from "./pages/404.vue";
import LoginPage from "./pages/login.vue";
import MyCompanyPage from "./pages/mycompany.vue";
import CataloguePage from "./pages/catalogue.vue";
import OrdersPage from "./pages/orders.vue";
import OrderDetailPage from "./pages/orderDetail.vue";
import Register from "./pages/register.vue";

Vue.use(Router);

let router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/mycompany",
      name: "mycompany",
      component: MyCompanyPage,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/catalogue",
      name: "catalogue",
      component: CataloguePage,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/orders",
      name: "orders",
      component: OrdersPage,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/orders/:id",
      component: OrderDetailPage,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "*",
      component: NotFound,
    },
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

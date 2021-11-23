import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        apiProcessing: false,
        token: localStorage.getItem("token") || "",
        user: {},
        company: null,
        address: null,
        delivery_cost_information: null,
        delivery_time_information: null,
        delivery_zones: [],
        promo_information: null,
        districts : [],
        subcategories : [],
        products: [],
        categories: [],
        promos: [],
        active_products_without_promo: [],
        orders: [],
        alert: {
            show: false,
            text: null
        }
    },
    mutations: {
        setApiProcessing(state, payload) {
            state.apiProcessing = payload;
        },
        auth_success(state, token, user) {
            state.token = token;
            state.user = user;
        },
        logout(state) {
            state.token = null;
        },
        setCompany(state, company) {
            state.company = company;
        },
        setCompanyAddress(state, address) {
            state.address = address;
        },
        setDeliveryCostInformation(state, delivery_cost_information) {
            state.delivery_cost_information = delivery_cost_information;
        },
        setDeliveryTimeInformation(state, delivery_time_information) {
            state.delivery_time_information = delivery_time_information;
        },
        setDeliveryZones(state, delivery_zones) {
            state.delivery_zones = delivery_zones;
        },
        setPromoInformation(state, promo_information) {
            state.promo_information = promo_information;
        },
        setDistricts(state, districts){
            state.districts = districts
        },
        setSubcategories(state, subcategories){
            state.subcategories = subcategories
        },
        setProducts(state, products){
            state.products = products
        },
        setCategories(state, categories){
            state.categories = categories
        },
        setPromos(state, promos){
            state.promos = promos
        },
        setActiveProductsWithoutPromo(state, active_products_without_promo){
            state.active_products_without_promo = active_products_without_promo
        },
        setOrders(state, orders){
            state.orders = orders
        },
        setAlert(state, payload){
            state.alert = payload
        }
    },
    actions: {
        setProcessing({commit}, payload){
            commit("setApiProcessing", payload);
        },
        login({ commit }, user) {
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                axios({
                    url: "https://byself-laravel.herokuapp.com/api/login",
                    data: user,
                    method: "POST",
                })
                    .then((resp) => {
                        console.log(resp);
                        const data = resp.data;
                        const token = data.token;
                        const user = data.user;
                        localStorage.setItem("token", token);
                        axios.defaults.headers.common["Authorization"] = token;
                        commit("auth_success", token, user);
                        commit("setApiProcessing", false);
                        resolve(true);
                    })
                    .catch((err) => {
                        localStorage.removeItem("token");
                        commit("setApiProcessing", false);
                        reject(err);
                    });
            });
        },
        register({ commit }, user) {
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                axios({
                    url: "https://byself-laravel.herokuapp.com/api/register",
                    data: user,
                    method: "POST",
                })
                    .then((resp) => {
                        // const token = resp.data.token;
                        // const user = resp.data.user;
                        // localStorage.setItem("token", token);
                        // Add the following line:
                        // axios.defaults.headers.common["Authorization"] = token;
                        // commit("auth_success", token, user);
                        commit("setApiProcessing", false);
                        resolve(resp);
                    })
                    .catch((err) => {
                        commit("setApiProcessing", false);
                        // localStorage.removeItem("token");
                        reject(err);
                    });

            });
        },
        logout({ commit }) {
            return new Promise((resolve) => {
                commit("logout");
                localStorage.removeItem("token");
                delete axios.defaults.headers.common["Authorization"];
                resolve();
            });
        },
        getCompany({ commit }) {
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                axios({
                    url: process.env.VUE_APP_API_URL + "/partners/mycompany/company",
                    method: "GET",
                })
                    .then((resp) => {
                        if (resp.data.success) {
                            const data = resp.data.data;
                            commit("setCompany", data.company);
                            commit("setCompanyAddress", data.address);
                            commit(
                                "setDeliveryCostInformation",
                                data.delivery_cost_information
                            );
                            commit(
                                "setDeliveryTimeInformation",
                                data.delivery_time_information
                            );
                            commit("setDeliveryZones", data.delivery_zones);
                            commit('setDistricts', data.districts);
                            commit("setApiProcessing", false);
                            resolve();
                        }
                        commit("setApiProcessing", false);
                        reject(resp.data.message);
                    })
                    .catch((err) => {
                        commit("setApiProcessing", false);
                        reject(err);
                    });
            });
        },
        reviseCompany({commit}, data){
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                axios({
                    url: process.env.VUE_APP_API_URL + "/partners/mycompany/company",
                    data,
                    method: "POST",
                })
                    .then((resp) => {
                        if (resp.data.success) {
                            resolve();
                        }
                        commit("setApiProcessing", false);
                        reject(resp.data.message);
                    })
                    .catch((err) => {
                        commit("setApiProcessing", false);
                        reject(err);
                    });
            });
        },
        reviseCompanyAddress({commit}, data){
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                axios({
                    url: process.env.VUE_APP_API_URL + "/partners/mycompany/address",
                    data,
                    method: "POST",
                })
                    .then((resp) => 
                        {
                            commit("setApiProcessing", false);
                            if (resp && resp.data && resp.data.success) {
                                resolve();
                            }
                            else if (resp && resp.data && resp.data.message){
                                reject(resp.data.message);
                            }
                        }
                    )
            });
        },
        deleteDeliveryZone({commit}, id){
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                axios({
                    url: process.env.VUE_APP_API_URL + "/partners/mycompany/deliveryZones/" + id,
                    method: "DELETE",
                })
                    .then((resp) => {
                        if (resp.data.success) {
                            resolve();
                        }
                        commit("setApiProcessing", false);
                        reject(resp.data.message);
                    })
                    .catch((err) => {
                        commit("setApiProcessing", false);
                        reject(err);
                    });
            });
        },
        addDeliveryZone({commit}, data){
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                axios({
                    url: process.env.VUE_APP_API_URL + "/partners/mycompany/deliveryZones",
                    data,
                    method: "POST",
                })
                    .then((resp) => {
                        if (resp.data.success) {
                            resolve();
                        }
                        commit("setApiProcessing", false);
                        reject(resp.data.message);
                    })
                    .catch((err) => {
                        commit("setApiProcessing", false);
                        reject(err);
                    });
            });
        },
        reviseDeliveryZone({commit}, {data, id}){
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                axios({
                    url: process.env.VUE_APP_API_URL + "/partners/mycompany/deliveryZones/" + id,
                    data,
                    method: "PUT",
                })
                    .then((resp) => {
                        if (resp.data.success) {
                            resolve();
                        }
                        commit("setApiProcessing", false);
                        reject(resp.data.message);
                    })
                    .catch((err) => {
                        commit("setApiProcessing", false);
                        reject(err);
                    });
            });
        },
        reviseDeliveryCostInformation({commit}, data){
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                axios({
                    url: process.env.VUE_APP_API_URL + "/partners/mycompany/delivery_cost_information",
                    data,
                    method: "POST",
                })
                    .then((resp) => {
                        if (resp.data.success) {
                            resolve();
                        }
                        commit("setApiProcessing", false);
                        reject(resp.data.message);
                    })
                    .catch((err) => {
                        commit("setApiProcessing", false);
                        reject(err);
                    });
            });
        },
        reviseDeliveryTimeInformation({commit}, data){
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                axios({
                    url: process.env.VUE_APP_API_URL + "/partners/mycompany/delivery_time_information",
                    data,
                    method: "POST",
                })
                    .then((resp) => {
                        if (resp.data.success) {
                            resolve();
                        }
                        commit("setApiProcessing", false);
                        reject(resp.data.message);
                    })
                    .catch((err) => {
                        commit("setApiProcessing", false);
                        reject(err);
                    });
            });
        },
        getCatalogue({ commit }) {
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                axios({
                    url: process.env.VUE_APP_API_URL + "/partners/mycompany/catalogue",
                    method: "GET",
                })
                    .then((resp) => {
                        if (resp.data.success) {
                            const data = resp.data.data;
                            commit('setSubcategories', data.subcategories);
                            commit('setProducts', data.products);
                            commit('setCategories', data.categories);
                            commit('setPromos', data.promos);
                            commit('setActiveProductsWithoutPromo', data.active_products_without_promo);
                            commit("setPromoInformation", data.promo_information);
                            commit("setApiProcessing", false);
                            resolve();
                        }
                        commit("setApiProcessing", false);
                        reject(resp.data.message);
                    })
                    .catch((err) => {
                        commit("setApiProcessing", false);
                        reject(err);
                    });
            });
        },
        getOrders({ commit }) {
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                axios({
                    url: process.env.VUE_APP_API_URL + "/partners/mycompany/orders",
                    method: "GET",
                })
                    .then((resp) => {
                        if (resp.data.success) {
                            commit('setOrders', resp.data.data);
                            commit("setApiProcessing", false);
                            resolve();
                        }
                        commit("setApiProcessing", false);
                        reject(resp.data.message);
                    })
                    .catch((err) => {
                        commit("setApiProcessing", false);
                        reject(err);
                    });
            });
        },
        deleteSubcategory({commit}, id){
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                axios({
                    url: process.env.VUE_APP_API_URL + "/partners/mycompany/subcategory/" + id,
                    method: "DELETE",
                })
                    .then((resp) => {
                        if (resp.data.success) {
                            resolve();
                        }
                        commit("setApiProcessing", false);
                        reject(resp.data.message);
                    })
                    .catch((err) => {
                        commit("setApiProcessing", false);
                        reject(err);
                    });
            });
        },
        reviseSubcategory({commit}, {id, data}){
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                axios({
                    url: process.env.VUE_APP_API_URL + "/partners/mycompany/subcategory/" + id,
                    data,
                    method: "PUT",
                })
                    .then((resp) => {
                        if (resp.data.success) {
                            resolve();
                        }
                        commit("setApiProcessing", false);
                        reject(resp.data.message);
                    })
                    .catch((err) => {
                        commit("setApiProcessing", false);
                        reject(err);
                    });
            });
        },
        addSubcategory({commit}, data){
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                axios({
                    url: process.env.VUE_APP_API_URL + "/partners/mycompany/subcategory",
                    data,
                    method: "POST",
                })
                    .then((resp) => {
                        if (resp.data.success) {
                            resolve();
                        }
                        commit("setApiProcessing", false);
                        reject(resp.data.message);
                    })
                    .catch((err) => {
                        commit("setApiProcessing", false);
                        reject(err);
                    });
            });
        },
        activeProductById({commit}, id){
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                axios({
                    url: process.env.VUE_APP_API_URL + "/partners/mycompany/product/" + id + "/unarchive",
                    method: "PUT",
                })
                    .then((resp) => {
                        if (resp.data.success) {
                            resolve();
                        }
                        commit("setApiProcessing", false);
                        reject(resp.data.message);
                    })
                    .catch((err) => {
                        commit("setApiProcessing", false);
                        reject(err);
                    });
            });
        },
        archiveProductById({commit}, id){
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                axios({
                    url: process.env.VUE_APP_API_URL + "/partners/mycompany/product/" + id + "/archive",
                    method: "PUT",
                })
                    .then((resp) => {
                        if (resp.data.success) {
                            resolve();
                        }
                        commit("setApiProcessing", false);
                        reject(resp.data.message);
                    })
                    .catch((err) => {
                        commit("setApiProcessing", false);
                        reject(err);
                    });
            });
        },
        deleteProductById({commit}, id){
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                axios({
                    url: process.env.VUE_APP_API_URL + "/partners/mycompany/product/" + id,
                    method: "DELETE",
                })
                    .then((resp) => {
                        if (resp.data.success) {
                            resolve();
                        }
                        commit("setApiProcessing", false);
                        reject(resp.data.message);
                    })
                    .catch((err) => {
                        commit("setApiProcessing", false);
                        reject(err);
                    });
            });
        },
        reviseProductById({commit}, {id, data}){
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                axios({
                    url: process.env.VUE_APP_API_URL + "/partners/mycompany/product/" + id,
                    data,
                    method: "PUT",
                })
                    .then((resp) => {
                        if (resp.data.success) {
                            resolve();
                        }
                        commit("setApiProcessing", false);
                        reject(resp.data.message);
                    })
                    .catch((err) => {
                        commit("setApiProcessing", false);
                        reject(err);
                    });
            });
        },
        addProduct({commit}, data){
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                axios({
                    url: process.env.VUE_APP_API_URL + "/partners/mycompany/product",
                    data,
                    method: "POST",
                })
                    .then((resp) => {
                        if (resp.data.success) {
                            resolve();
                        }
                        commit("setApiProcessing", false);
                        reject(resp.data.message);
                    })
                    .catch((err) => {
                        commit("setApiProcessing", false);
                        reject(err);
                    });
            });
        },
        deletePromoById({commit}, id){
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                axios({
                    url: process.env.VUE_APP_API_URL + "/partners/mycompany/promo/" + id,
                    method: "DELETE",
                })
                    .then((resp) => {
                        if (resp.data.success) {
                            resolve();
                        }
                        commit("setApiProcessing", false);
                        reject(resp.data.message);
                    })
                    .catch((err) => {
                        commit("setApiProcessing", false);
                        reject(err);
                    });
            });
        },
        revisePromoById({commit}, {id, data}){
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                axios({
                    url: process.env.VUE_APP_API_URL + "/partners/mycompany/promo/" + id,
                    data,
                    method: "PUT",
                })
                    .then((resp) => {
                        if (resp.data.success) {
                            resolve();
                        }
                        commit("setApiProcessing", false);
                        reject(resp.data.message);
                    })
                    .catch((err) => {
                        commit("setApiProcessing", false);
                        reject(err);
                    });
            });
        },
        addPromo({commit}, data){
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                axios({
                    url: process.env.VUE_APP_API_URL + "/partners/mycompany/promo",
                    data,
                    method: "POST",
                })
                    .then((resp) => {
                        if (resp.data.success) {
                            resolve();
                        }
                        commit("setApiProcessing", false);
                        reject(resp.data.message);
                    })
                    .catch((err) => {
                        commit("setApiProcessing", false);
                        reject(err);
                    });
            });
        },
        revisePromoInformation({commit}, data){
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                axios({
                    url: process.env.VUE_APP_API_URL + "/partners/mycompany/promo_information",
                    data,
                    method: "POST",
                })
                    .then((resp) => {
                        if (resp.data.success) {
                            resolve();
                        }
                        commit("setApiProcessing", false);
                        reject(resp.data.message);
                    })
                    .catch((err) => {
                        commit("setApiProcessing", false);
                        reject(err);
                    });
            });
        },
        reviseOrderStatus({commit}, {id, data}){
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                axios({
                    url: process.env.VUE_APP_API_URL + "/partners/mycompany/orders/" + id,
                    data,
                    method: "PUT",
                })
                    .then((resp) => {
                        if (resp.data.success) {
                            resolve();
                        }
                        commit("setApiProcessing", false);
                        reject(resp.data.message);
                    })
                    .catch((err) => {
                        commit("setApiProcessing", false);
                        reject(err);
                    });
            });
        },
        deleteProductImage({commit}, id){
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                axios({
                    url: process.env.VUE_APP_API_URL + "/partners/mycompany/product/image/" + id,
                    method: "DELETE",
                })
                    .then((resp) => {
                        if (resp.data.success) {
                            resolve();
                        }
                        commit("setApiProcessing", false);
                        reject(resp.data.message);
                    })
                    .catch((err) => {
                        commit("setApiProcessing", false);
                        reject(err);
                    });
            });
        },
        sendPartnerRequest({commit}, data){
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                axios({
                    url: process.env.VUE_APP_API_URL + "/partnerRequest",
                    method: "POST",
                    data
                })
                    .then((resp) => {
                        if (resp.data.success) {
                            resolve();
                        }
                        commit("setApiProcessing", false);
                        reject(resp.data.message);
                    })
                    .catch((err) => {
                        commit("setApiProcessing", false);
                        reject(err);
                    });
            });
        },
    },
    getters: {
        isLoggedIn: (state) => !!state.token,
    },
});

import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import './registerServiceWorker'
import store from './store'
import Axios from 'axios'
import firebase from 'firebase'
import Cleave from 'cleave.js';

Vue.prototype.$http = Axios;

const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyDyMek-Ac82zXhuGVkhT0S9nnrYWsy27nY",
  authDomain: "local-market-15e67.firebaseapp.com",
  databaseURL: "https://local-market-15e67.firebaseio.com",
  projectId: "local-market-15e67",
  storageBucket: "local-market-15e67.appspot.com",
  messagingSenderId: "216415012178",
  appId: "1:216415012178:web:6e0b7c75d3883454c1668b",
  measurementId: "G-7GFV0PCKTW"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

Vue.directive('cleave', {
  inserted: (el, binding) => {
      el.cleave = new Cleave(el, binding.value || {})
  },
  update: (el) => {
      const event = new Event('input', {bubbles: true});
      setTimeout(function () {
          el.value = el.cleave.properties.result
          el.dispatchEvent(event)
      }, 100);
  }
})

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

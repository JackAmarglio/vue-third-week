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
  apiKey: "AIzaSyC4AzdkR94Rp2F6WZ_ODOoDa5k55TWmyXY",
  authDomain: "first-project-881e9.firebaseapp.com",
  databaseURL: "https://first-project-881e9-default-rtdb.firebaseio.com",
  projectId: "first-project-881e9",
  storageBucket: "first-project-881e9.appspot.com",
  messagingSenderId: "297059815089",
  appId: "1:297059815089:web:fbcdd6c408bddf8bbd5c90",
  measurementId: "G-44L1EVV51Y"
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

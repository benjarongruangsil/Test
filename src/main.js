import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vuelidation from 'vuelidation'
import VueFirestore from 'vue-firestore'
import VueSession from 'vue-session'

var options = { persist: true }
Vue.use(VueSession, options)


Vue.use(VueFirestore)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.use(Vuelidation)

Vue.config.productionTip = false

import firebase from 'firebase'
const firebaseConfig = {
  apiKey: 'AIzaSyArhHCQ13ug6-_ufbuxSTRCpLCpjEQloK0',
  authDomain: 'my-project-1568800663546.firebaseapp.com',
  databaseURL: 'https://my-project-1568800663546.firebaseio.com',
  projectId: 'my-project-1568800663546',
  storageBucket: 'my-project-1568800663546.appspot.com',
  messagingSenderId: '500225710407',
  appId: '1:500225710407:web:b07f28ab9e4e011e96d462',
  measurementId: 'G-M5TWFZ8XMX'
}
firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

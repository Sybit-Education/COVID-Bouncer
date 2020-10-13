import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/app.sass'
import firebase from 'firebase'
import * as fbService from './services/firebase'

Vue.prototype.$firebase = firebase

fbService.fBInit()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

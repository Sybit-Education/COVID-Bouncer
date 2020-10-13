import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

//  Bootstrap & main Variables
import './assets/app.sass'

//  Firebase
import firebase from 'firebase'
import * as fbService from './services/firebase'

//  Fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

//  Firebase
Vue.prototype.$firebase = firebase

fbService.fBInit()

//  Fontawesome
// For Documentation see here: https://github.com/FortAwesome/vue-fontawesome
library.add(faUserSecret, faChevronLeft)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { userService } from '@/services/UserService'
import BuildingView from '../views/BuildingView'
import RoomView from '../views/RoomView.vue'
import RoomDetail from '../views/RoomDetail.vue'
import About from '../views/About.vue'
import SignIn from '../views/SignIn'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    beforeEnter: guard,
    component: Home,
    meta: { displayHeaderBackButton: false }
  },
  {
    path: '/:location',
    name: 'Buildings',
    beforeEnter: guard,
    component: BuildingView
  },
  {
    path: '/:location/:building',
    name: 'Rooms',
    beforeEnter: guard,
    component: RoomView
  },
  {
    path: '/:location/:building/:roomName',
    name: 'RoomDetail',
    component: RoomDetail,
    meta: { displayHeader: false }
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
    beforeEnter: (to, from, next) => {
      if (userService.isLoggedIn()) {
        next({ name: 'Home' })
      } else {
        next()
      }
    },
    meta: { displayHeaderBackButton: false }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

function guard (to, from, next) {
  if (userService.isLoggedIn()) {
    next()
  } else {
    next({ name: 'SignIn' })
  }
}

export default router

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
    component: Home
  },
  {
    path: '/locations',
    name: 'Buildings',
    beforeEnter: guard,
    component: BuildingView
  },
  {
    path: '/locations/buildings',
    name: 'Rooms',
    beforeEnter: guard,
    component: RoomView
  },
  {
    path: '/locations/buildings/room',
    name: 'RoomDetail',
    component: RoomDetail
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
    }
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

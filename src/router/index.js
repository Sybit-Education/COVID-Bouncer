import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { userService } from '@/services/UserService'
import BuildingView from '../views/BuildingView'
import RoomView from '../views/RoomView.vue'

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
    component: BuildingView
  },
  {
    path: '/locations/buildings',
    name: 'Rooms',
    component: RoomView
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import(/* webpackChunkName: "signing" */'../views/SignIn.vue'),
    beforeEnter: (to, from, next) => {
      if (userService.isLoggedIn()) {
        next({ name: 'home' })
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
    next({ name: 'signin' })
  }
}

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import BuildingView from '../views/BuildingView'
import RoomView from '../views/RoomView.vue'
import RoomDetail from '../views/RoomDetail.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
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
    path: '/locations/buildings/room',
    name: 'RoomDetail',
    component: RoomDetail
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

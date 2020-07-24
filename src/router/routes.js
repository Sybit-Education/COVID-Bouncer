import { userService } from 'src/services/User.service'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'home',
        path: '',
        component: () => import('pages/Index.vue')
      },
      {
        name: 'room',
        path: '/room/:qrCode',
        component: () => import('pages/RoomDetailPage')
      },
      {
        name: 'signin',
        path: '/signin',
        component: () => import('pages/SignIn'),
        beforeEnter: (to, from, next) => {
          if (userService.isLoggedIn()) {
            next({ name: 'home' })
          } else {
            next()
          }
        }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes

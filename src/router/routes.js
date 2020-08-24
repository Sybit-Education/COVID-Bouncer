import { userService } from 'src/services/User.service'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'home',
        path: '',
        beforeEnter: guard,
        component: () => import('pages/Index.vue')
      },
      {
        name: 'room',
        path: '/room/:qrCode',
        beforeEnter: guard,
        component: () => import('pages/RoomDetailPage')
      },
      {
        name: 'room',
        path: '/room/:qrCode/print',
        beforeEnter: guard,
        component: () => import('pages/RoomDetailPrint')
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

function guard (to, from, next) {
  if (userService.isLoggedIn()) {
    next()
  } else {
    next({ name: 'signin' })
  }
}

export default routes

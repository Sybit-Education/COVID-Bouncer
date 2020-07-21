
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
        name: 'scanner',
        path: '/scanner',
        component: () => import('pages/ScannerPage.vue')
      },
      {
        name: 'signin',
        path: '/signin',
        component: () => import('pages/SignIn')
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

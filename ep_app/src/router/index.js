import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login/index.vue'),
    children: [
      {
        path: '/',
        name: 'login',
        component: () => import('../views/Login/login.vue')
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('../views/Login/register.vue')
      }
    ]
  },
  {
    path: '/main',
    component: () => import('@/views/Main')
  }
]

const router = new VueRouter({
  routes
})

export default router

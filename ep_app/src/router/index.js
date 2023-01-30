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
    component: () => import('../views/Login/index.vue'),
    children: [
      {
        path: '/',
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
    path: '/inst-course/:id',
    component: () => import('../views/Ins/CourseList.vue'),
    props: true
  },
  {
    path: '/ins-home/:id',
    component: () => import('../views/Ins/index.vue'),
    props: true
  },
  {
    path: '/ins-chat/:id',
    component: () => import('../views/Ins/Chat'),
    props: true
  },
  {
    path: '/user-edit',
    component: () => import('@/views/User/UserEdit.vue')
  },
  {
    path: '/main',
    component: () => import('@/views/Main'),
    children: [
      {
        path: '/',
        redirect: 'home'
      },
      {
        path: 'home',
        component: () => import('@/views/Home')
      },
      {
        path: 'user',
        component: () => import('@/views/User')
      },
      {
        path: 'course',
        component: () => import('@/views/Course')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router

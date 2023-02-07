import { getToken } from '@/utils/auth'
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
        component: () => import('../views/Login/login.vue'),
        meta: { isPublic: true }
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('../views/Login/register.vue'),
        meta: { isPublic: true }
      }
    ]
  },
  {
    path: '/user-message-box',
    component: () => import('../views/User/MessageBox.vue')
  },
  {
    path: '/test-result',
    component: () => import('../views/Ins/TestDetail.vue')
  },
  {
    path: '/plan-task/:planId',
    component: () => import('../views/Ins/TaskList.vue'),
    props: true
  },
  {
    path: '/test/:testId',
    component: () => import('../views/Ins/Test.vue'),
    props: true
  },
  {
    path: '/video-file/:storeName',
    component: () => import('../components/VideoViewer.vue'),
    props: true
  },
  {
    path: '/pdf-file/:storeName',
    component: () => import('../components/PdfViewer.vue'),
    props: true
  },
  {
    path: '/inst-course/:instId',
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

// 导航守卫限制路由跳转
router.beforeEach((to, from, next) => {
  if (to.meta.isPublic) {
    // 判断该路由是否需要登录权限
    next()
  } else {
    // console.log("token", getToken());
    if (getToken() !== null) {
      // 判断本地是否存在access_token
      next()
    } else {
      next({
        path: '/login'
      })
    }
  }
})

export default router

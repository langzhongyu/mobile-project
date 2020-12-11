/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
import { Dialog } from 'vant'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'LoginIndex',
    component: () => import('@/views/login/'),
    meta: { requiresAuth: false } // 添加规定的自定义事件，判定访问时是否需要访问
  },
  {
    path: '/search',
    name: 'SearchIndex',
    component: () => import('@/views/search'),
    meta: { requiresAuth: false }
  },
  {
    path: '/article/:articleId',
    name: 'ArticleContainer',
    component: () => import('@/views/article'),
    props: true, // 将路由参数动态映射到组件的props中
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    name: 'LayoutIndex',
    component: () => import('@/views/layout/'),
    children: [
      {
        path: '',
        name: 'HomeIndex',
        component: () => import('@/views/home/'),
        meta: { requiresAuth: true }
      },
      {
        path: '/qa',
        name: 'QaIndex',
        component: () => import('@/views/qa/'),
        meta: { requiresAuth: false }
      },
      {
        path: '/video',
        name: 'VideoIndex',
        component: () => import('@/views/video/'),
        meta: { requiresAuth: false }
      },
      {
        path: '/my',
        name: 'MyIndex',
        component: () => import('@/views/my/'),
        meta: { requiresAuth: false }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
// 导航守卫
router.beforeEach((to, from, next) => {
  // to:要访问的路由信息
  // from:来自哪个页面的路由信息
  // next:放行的标记
  if (to.meta.requiresAuth) {
    if (store.state.user) {
      return next()
    }
    Dialog.confirm({
      title: '访问提示',
      message: '该功能需要登录才能访问，需要登录吗？',
    })
      .then(() => {
        // on confirm
        router.push({
          path: '/login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
      })
      .catch(() => {
        // 中断当前导航
        next(false)
      });
  } else {
    next()
  }
})

export default router

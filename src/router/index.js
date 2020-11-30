/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'LoginIndex',
    component: () => import('@/views/login/')
  },
  {
    path: '/',
    name: 'LayoutIndex',
    component: () => import('@/views/layout/'),
    children: [
      {
        path: '',
        name: 'HomeIndex',
        component: () => import('@/views/home/')
      },
      {
        path: '/qa',
        name: 'QaIndex',
        component: () => import('@/views/qa/')
      },
      {
        path: '/video',
        name: 'VideoIndex',
        component: () => import('@/views/video/')
      },
      {
        path: '/my',
        name: 'MyIndex',
        component: () => import('@/views/my/')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router

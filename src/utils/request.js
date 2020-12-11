/*
 * 封装axios请求模块
 */

import axios from 'axios'
import store from '@/store/'
import jsonBig from 'json-bigint'
import { Toast } from 'vant' // 需要重新加载引入
import router from '@/router/'

const refreshTokenReq = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn',
  // transformResponse 允许自定义原始的响应数据
  // transformRequest允许在向服务器发送前，修改请求数据
  transformResponse: [function (data) {
    try {
      // 若转换成功则返回转换的数据结果
      return jsonBig.parse(data)
    } catch (err) {
      // 若转换失败，则包装为统一数据格式并返回
      return {
        data
      }
    }
  }]
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const { user } = store.state
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, async function (error) {
  // 对响应错误做点什么
  const status = error.response.status
  if (status === 400) {
    // 客户端请求参数错误
    Toast.fail('客户端请求参数错误！')
  } else if (status === 401) {
    const { user } = store.state
    if (!user || !user.token) {
      return redirectLogin()
    }
    try {
      const { data } = await refreshTokenReq({
        method: 'PUT',
        url: '/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      // console.log(data) 有效token
      user.token = data.data.token
      store.commit('setUser', user)
      // 把失败的请求重新发出去
      // error.config 是本次请求的相关配置信息对象
      // 这里使用 request 发请求，它会走自己的拦截器
      // 它的请求拦截器中通过 store 容器访问 token 数据
      return request(error.config)
    } catch (err) {
      redirectLogin()
    }
  } else if (status === 403) {
    Toast.fail('没有操作权限！')
  } else if (status >= 500) {
    Toast.fail('服务端异常，请稍后重试！')
  }
  // console.dir(error)
  return Promise.reject(error)
})

function redirectLogin () {
  // 替换路由，不会形成历史记录
  router.replace({
    path: 'login',
    // 查询参数放在？后面
    query: {
      redirect: router.currentRoute.fullPath // 当前路由路径
    }
  })
}

export default request

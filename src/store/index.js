import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

const USER_KEY = 'USER_INFO'

export default new Vuex.Store({
  state: {
    // 用户登录状态信息
    user: getItem(USER_KEY),
    cachepages: ['LayoutIndex']
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      setItem(USER_KEY, state.user)
    },
    // 添加缓存页面
    addCachePage (state, pagename) {
      if (!state.cachepages.includes(pagename)) {
        state.cachepages.push(pagename)
      }
    },
    // 移除缓存页面
    removeCachePage (state, pagename) {
      var index = state.cachepages.indexOf(pagename)
      if (index !== -1) {
        state.cachepages.splice(index, 1)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})

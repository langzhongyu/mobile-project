import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入vant
import Vant from 'vant'
import 'vant/lib/index.css'

// 引入dayjs
import './utils/dayjs'

// 使用 lib-flexible 动态设置 REM 基准值（html 标签的字体大小）
import 'amfe-flexible'

import './styles/index.less'

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

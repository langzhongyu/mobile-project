// 引入dayjs
import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' // 导入中文包

import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

dayjs.locale('zh-cn')

Vue.filter('relativeTime', value => {
  return dayjs().from(dayjs(value))
})

Vue.filter('datetime', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(value).format(format)
})

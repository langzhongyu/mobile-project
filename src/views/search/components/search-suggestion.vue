<template>
  <div class="search-suggestion">
    <van-cell
     v-for="(item, index) in suggestionsText"
     :key="index"
      icon="search"
      @click="$emit('search', item)">
      <div slot="title" v-html="highlight(item)"></div>
      </van-cell>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  watch: {
    // 输入第一个字符时，该组件才被触发
    searchText: {
      handler: debounce(async function () {
        // 判断关键词是否存在
        const searchText = this.searchText
        if (!searchText) {
          return
        }
        const { data } = await getSuggestion(searchText)
        this.suggestionsText = data.data.options
        // console.log(this.suggestionsText)
      }, 1000),
      immediate: true
    }
  },
  data () {
    return {
      suggestionsText: []
    }
  },
  methods: {
    highlight (item) {
      // g是全局 i是忽略大小写,RegExp正则表达式构造函数
      const reg = new RegExp(this.searchText, 'gi')
      return item.replace(reg, `<span style="color: #3296fa">${this.searchText}</span>`)
    }
  }
}
</script>

<style lang="less" scoped>
</style>

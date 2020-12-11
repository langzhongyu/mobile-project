<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch(searchText)"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <searchResult
     v-if="isResultShow"
     :q="searchText"/>
    <searchSuggestion
     v-else-if="searchText"
     :searchText="searchText"
     @search="onSearch"/>
    <searchHistory
     v-else
     :searchHistories="searchHistories"
     @search="onSearch"
     @clearHistory="searchHistories = $event"/>
  </div>
</template>

<script>
import searchSuggestion from './components/search-suggestion'
import searchHistory from './components/search-history'
import searchResult from './components/search-result'
import { setItem, getItem } from '@/utils/storage.js'
export default {
  name: 'SearchIndex',
  data () {
    return {
      isResultShow: false,
      searchText: '',
      searchHistories: getItem('search_history') || []
    }
  },
  watch: {
    searchHistories () {
      setItem('search_history', this.searchHistories)
    }
  },
  methods: {
    onSearch (searchText) {
      this.searchText = searchText
      // 若果匹配到历史记录，就去重
      const index = this.searchHistories.indexOf(searchText)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(searchText)
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    }
  },
  components: {
    searchSuggestion,
    searchHistory,
    searchResult
  }
}
</script>

<style lang="less" scoped>
</style>

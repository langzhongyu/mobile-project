<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      class="search-nav"
    >
      <van-cell v-for="(item, index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  props: {
    q: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20
    }
  },
  methods: {
    async onLoad () {
      const { data } = await getSearchResult({
        page: this.page,
        per_page: this.per_page,
        q: this.q
      })
      // console.log(data)
      // 解构出results
      const { results } = data.data
      this.list.push(...results)
      // 加载状态结束
      this.loading = false
      // 数据全部加载完成
      if (results.length) {
        this.page++
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .search-container {
    .search-nav {
      position: fixed;
      left: 0;
      right: 0;
      top: 54px;
      bottom: 0;
      overflow-y: auto;
    }
  }
</style>

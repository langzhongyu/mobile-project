<template>
  <div class="article-list" ref="article-list">
    <van-pull-refresh
     v-model="isRefreshLoading"
     :success-text="refreshSuccessText"
     :success-duration="1500"
     @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- <van-cell
          v-for="(article, index) in articles"
          :key="index"
          :title="article.title"/> -->
          <ArticleItem
           v-for="(article, index) in articles"
           :key="index"
           :article="article" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getUserArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
import { debounce } from 'lodash'
export default {
  name: 'ArticleList',
  data () {
    return {
      loading: false,
      finished: false,
      articles: [],
      isRefreshLoading: false, // 下拉刷新的loading状态
      refreshSuccessText: '', // 下拉刷新成功的提示文本
      scrollTop: 0 // 列表滚动到顶部的距离
    }
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  created () {},
  components: {
    ArticleItem
  },
  mounted () {
    const articleList = this.$refs['article-list']
    articleList.onscroll = debounce(() => {
      this.scrollTop = articleList.scrollTop
      // console.log(this.scrollTop)
    }, 50)
  },
  // 缓存中的生命周期钩子
  activated () {
    // 从缓存中被激活
    // console.log('从缓存中被激活')
    this.$refs['article-list'].scrollTop = this.scrollTop
  },
  deactivated () {
    // 从缓存中失去活动
    // console.log('从缓存中失去活动')
  },
  methods: {
    async onLoad () {
      const { data } = await getUserArticles({
        channel_id: this.channel.id,
        timestamp: this.pre_timestamp || Date.now(),
        with_top: 1
      })
      // console.log(data)
      const { results } = data.data
      this.articles.push(...results) // 两个数组不能直接合并，通过...results形式
      this.loading = false
      if (results.length) {
        this.timestamp = data.data.pre_timestamp
      } else {
        this.finished = true
      }
    },
    async onRefresh () {
      const { data } = await getUserArticles({
        channel_id: this.channel.id,
        timestamp: this.pre_timestamp || Date.now(),
        with_top: 1
      })

      const { results } = data.data
      this.articles.unshift(...results)
      // console.log(results)
      // 关闭刷新的状态
      this.isRefreshLoading = false
      this.refreshSuccessText = `更新了${results.length}条数据`
    }
  }
}
</script>

<style lang="less" scoped>
  .article-list {
    position: fixed;
    left: 0;
    right: 0;
    top: 90px;
    bottom: 50px;
    overflow-y: auto;
  }
</style>

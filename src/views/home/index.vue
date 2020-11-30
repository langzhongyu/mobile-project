<template>
    <div class="home-container">
      <van-nav-bar class="home-nav-bar">
        <van-button
          slot="title"
          class="home-search"
          icon="search"
          type="info"
          round
          size="mini"
        >搜索</van-button>
      </van-nav-bar>
      <van-tabs v-model="active">
        <van-tab
         :title="channel.name"
         v-for="channel in channels"
         :key="channel.id">
           <ArticleList :channel="channel"></ArticleList>
         </van-tab>
      </van-tabs>
    </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list.vue'
export default {
  name: 'homeIndex',
  data () {
    return {
      active: 0,
      channels: []
    }
  },
  created () {
    this.onLoadChannels()
  },
  methods: {
    async onLoadChannels () {
      const { data } = await getUserChannels()
      this.channels = data.data.channels
      console.log(data)
    }
  },
  components: {
    ArticleList
  }
}
</script>

<style lang="less" scoped>
  .home-container {
    .home-nav-bar {
      background: #3296fa;
      .home-search{
        background: #5babfb;
        padding: 14px 120px;
      }
    }
  }
</style>

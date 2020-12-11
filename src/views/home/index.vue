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
          to='/search'
        >搜索</van-button>
      </van-nav-bar>
      <van-tabs v-model="active" class="nav-btn">
        <van-tab
         :title="channel.name"
         v-for="channel in channels"
         :key="channel.id"
         >
           <ArticleList :channel="channel"></ArticleList>
         </van-tab>
         <div slot="nav-right" class="space"></div>
         <div
          class="more-info"
          @click="isChannelEditShow = true"
         >
           <i class="iconfont icon-gengduo"></i>
         </div>
      </van-tabs>
      <!-- 编辑频道列表 -->
      <van-popup
        v-model="isChannelEditShow"
        closeable
        close-icon-position="top-left"
        position="bottom"
        class="channel-pop"
      >
        <channelItem
         :channels="channels"
         :active="active"
         @updateIndex="active = $event"
         @close="isChannelEditShow = false"/>
      </van-popup>
    </div>
</template>

<script>
import { getUserChannels } from '@/api/channel'
import ArticleList from './components/article-list.vue'
import channelItem from './components/channel-item'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'homeIndex',
  data () {
    return {
      active: 0,
      channels: [],
      isChannelEditShow: false // 控制编辑频道
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.onLoadChannels()
  },
  methods: {
    async onLoadChannels () {
      try {
        let channels = []
        if (this.user) {
          // 请求获取线上的频道
          const { data } = await getUserChannels()
          channels = data.data.channels
        } else {
          const localChannels = getItem('myChannels')
          if (localChannels) {
            channels = localChannels
          } else {
            const { data } = await getUserChannels()
            channels = data.data.channels
          }
        }
        this.channels = channels
      } catch (err) {
        console.log(err)
      }
    }
  },
  components: {
    ArticleList,
    channelItem
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
    .channel-pop {
      height: 100%;;
    }
    .nav-btn {
      position: relative;
      .more-info {
        position: absolute;
        right: 0;
        top: 0;
        z-index: 9;
        height: 100%;
        background: #ffff;
        width: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-left:1px solid #d0d1d4;
        box-sizing: border-box;
        opacity: 0.9;
      }
      .space {
        width: 30px;
        flex-shrink: 0;
      }
    }
  }
</style>

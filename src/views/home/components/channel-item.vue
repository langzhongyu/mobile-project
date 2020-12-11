<template>
  <div class="channel-item">
    <van-cell
     title="我的频道"
     value="内容"
     size="large"
     class="channel-top">
      <van-button
       size="mini"
       class="edit-btn"
       @click="isEdit = !isEdit">{{isEdit?'编辑':'完成'}}</van-button>
     </van-cell>
     <van-grid :gutter="10" :border="false">
      <van-grid-item
       v-for="(channel, index) in channels"
       :key="index"
       class="channel-btn"
       :class="{ active: index === active }"
       :text="channel.name"
       :icon="isEdit&&index!==0?'clear':''"
       @click="editChannel(channel, index)">
      </van-grid-item>
     </van-grid>
     <van-cell
      title="频道推荐"
      size="large"
      class="channel-bottom"
      >
      </van-cell>
      <van-grid :gutter="10" class="recomend-box">
       <van-grid-item
        v-for="(recommend,index) in recommendChannels"
        :key="index"
        class="channel-btn"
        :text="recommend.name"
        @click="onAdd(recommend)"/>
      </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addUserChannels, removeUserChannels } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'channelItem',
  props: {
    channels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapState(['user']),
    // 获取推荐频道列表
    recommendChannels () {
      // filter过滤方法，根据返回的boolean值true来收集数组
      return this.allChannels.filter(allChannel => {
        // 查找满足该条件元素
        return !this.channels.find(channel => {
          return channel.id === allChannel.id
        })
      })
    }
  },
  created () {
    this.onChannelsAll()
  },
  data () {
    return {
      allChannels: [],
      isEdit: false
    }
  },
  methods: {
    async onChannelsAll () {
      var { data } = await getAllChannels()
      this.allChannels = data.data.channels
      // console.log(data)
    },
    async onAdd (recommend) {
      this.channels.push(recommend)
      // 已登录，数据更新到线上，否则存储在本地
      if (this.user) {
        await addUserChannels({
          channels: [
            { id: recommend.id, seq: this.channels.length }
          ]
        })
      } else {
        // 未登录保存在本地
        setItem('myChannels', this.channels)
      }
      // console.log(recommend)
    },
    editChannel (channel, index) {
      // console.log(JSON.stringify(channel))
      // 移除频道
      if (this.isEdit && index !== 0) {
        this.deleteChannel(channel, index)
      } else {
        this.$emit('updateIndex', index)
        this.$emit('close')
      }
    },
    async deleteChannel (channel, index) {
      if (index <= this.active) {
        this.$emit('updateIndex', this.active - 1)
      }
      this.channels.splice(index, 1)

      // 登录状态下删除
      if (this.user) {
        await removeUserChannels(channel.id)
        this.$toast.success('删除频道成功！')
      } else {
        setItem('myChannels', this.channels)
        this.$toast.success('删除本地频道成功！')
      }
    }
  }
}
</script>

<style lang="less" scoped="">
.channel-item {
  .channel-top {
    margin-top: 50px;
    .edit-btn {
      border-radius: 30px;
      color: #ee0a24;
      border: 1px solid #ee0a24;
    }
  }
  .recomend-box {
    margin-bottom:30px;
  }
  .channel-btn {
    position: relative;
    .close {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      position: absolute;
      top:0;
      right:0;
    }
  }
}
</style>

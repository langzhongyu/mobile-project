<template>
  <div class="comment-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      class="photoImg"
    >
      <commentItem
        @isShowReply="$emit('isShowReply', $event)"
        v-for="(comment, index) in list"
        :comment="comment"
        :key="index"
        />
    </van-list>
  </div>
</template>

<script>
import { getComment } from '@/api/comment'
import commentItem from './comment-item'
export default {
  name: 'commentList',
  data () {
    return {
      // list: [], // 文章评论列表
      loading: false,
      finished: false,
      offset: null, // 获取下一页页码
      limit: 10
    }
  },
  props: { // props传参
    source: {
      type: [String, Number, Object],
      required: true
    },
    type: {
      type: String,
      default: 'a'
    },
    // 数组或对象的默认值必须通过函数返回
    list: {
      type: Array,
      default: () => []
    }
  },
  components: {
    commentItem
  },
  methods: {
    async onLoad () {
      const { data } = await getComment({
        type: this.type,
        source: this.source.toString(),
        offset: this.offset, // 页码
        limit: this.limit
      })
      console.log(data)
      this.$emit('total_count', data.data.total_count)
      const { results } = data.data
      this.list.push(...results)
      this.$emit('commentList', this.list)
      // 加载状态结束
      this.loading = false

      // 数据全部加载完成
      if (results.length) {
        this.offset = data.data.last_id
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>

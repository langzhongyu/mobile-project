<template>
  <div class="comment-item">
    <van-cell>
      <van-image
      width="100"
      height="100"
      :src="comment.aut_photo"
      slot="icon"/>
      <div class="detailInfo">
        <div class="name">{{comment.aut_name}}</div>
        <div class="text">{{comment.content}}</div>
        <div class="info">
          <span class="time">{{comment.pubdate | datetime('YYYY-MM-DD HH:mm') }}</span>
          <van-button
           type="default"
           size="mini"
           round
           @click="$emit('isShowReply', comment)">{{comment.reply_count}} 回复</van-button>
        </div>
      </div>
      <div slot="right-icon" @click="onClickZan(comment)">
        <van-icon
         :name="comment.is_liking ? 'good-job' : 'good-job-o'"
         :class="comment.is_liking ? 'onZan' : ''"/>
        <span>{{comment.like_count}}</span>
      </div>
    </van-cell>
  </div>
</template>

<script>
import { addCommentLike, deleteCommentLike } from '@/api/comment'
export default {
  name: 'commentItem',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  methods: {
    async onClickZan (comment) {
      const commentId = comment.com_id.toString()
      if (comment.is_liking) {
        await deleteCommentLike(commentId)
        comment.like_count--
      } else {
        await addCommentLike(commentId)
        comment.like_count++
      }
      comment.is_liking = !comment.is_liking
      this.$toast('操作成功')
    }
  }
}
</script>

<style lang="less" scoped>
.comment-item {
  .photoImg {}
  .detailInfo {
    margin-left: 10px;
    .info {
      display: flex;
      align-items: center;
      font-size: 14px;
      .time {
        margin-right: 10px;
      }
    }
    .name {
      color: #406599;
      font-size: 14px;
    }
    .text {
      font-size: 16px;
    }
  }
  .onZan {
    color: #ff69b4;
  }
}
</style>

<template>
  <div class="comment-reply">
    <div class="reply-num">0条回复</div>
    <van-divider />
    <commentItem :comment="currentComment" />
    <van-cell title="全部评论" />
    <commentList
      :source="articleId"
      :list="replyCommentList"
      :type="type"/>
    <div class="article-bottom">
      <van-button
       type="default"
       size="mini"
       round
       class="white_text"
       @click="isPostShow = true">写评论</van-button>
    </div>
    <!-- 发布评论回复 -->
    <van-popup
      v-model="isPostShow"
      closeable
      position="bottom"
      :style="{ height: '20%' }"
      close-icon-position="top-left"
    >
    <postComment
      :target="currentComment.aut_id"
      :articleId="articleId"
      @post-success="commentPostSuccess"/>
    </van-popup>
  </div>
</template>

<script>
import commentItem from './comment-item.vue'
import postComment from './post-comment.vue'
import commentList from './comment-list.vue'
export default {
  name: 'commentReply',
  props: {
    currentComment: {
      type: Object,
      required: true
    },
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  components: {
    commentItem,
    postComment,
    commentList
  },
  data () {
    return {
      isPostShow: false,
      replyCommentList: [],
      type: 'c'
    }
  },
  methods: {
    commentPostSuccess (comment) {
      console.log(comment)
      this.isPostShow = false
      this.replyCommentList.unshift(comment)
    }
  }
}
</script>

<style lang="less" scoped>
.comment-reply {
  .reply-num {
    width: 100%;
    text-align: center;
    font-size: 16px;
    margin-top:10px;
  }
  .article-bottom {
    height: 44px;
    background: #fff;
    border-top: 1px solid #d8d8d8;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .white_text {
      padding: 12px 120px;
      font-size: 14px;
      color: #d8d8d8;
    }
    .onCollect {
      color: orange;
    }
  }
}
</style>

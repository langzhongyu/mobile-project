<template>
  <div class="post-comment">
    <van-field
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
     type="default"
     size="mini"
     class="post-btn"
     @click="onPost">发布</van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  name: 'postComment',
  props: { // props传参
    target: {
      type: [String, Number, Object],
      required: true
    },
    articleId: {
      type: [String, Number, Object],
      default: null
    }
  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    async onPost () {
      this.$toast.loading({
        message: '发布中',
        forbidClick: true // 禁止背景点击
      })
      const { data } = await addComment({
        target: this.target.toString(),
        content: this.message,
        art_id: this.articleId ? this.articleId.toString() : null
      })
      console.log(data)
      this.$emit('post-success', data.data.new_obj)
      this.$toast.success('发布成功！')
      this.message = ''
    }
  }
}
</script>

<style lang="less" scoped>
  .post-comment {
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    .post-btn {
      padding: 16px 0;
    }
  }
</style>

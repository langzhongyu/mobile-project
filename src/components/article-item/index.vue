<template>
  <van-cell class="article-item">
    <div slote="title" class="title">
      {{ article.title }}
    </div>
    <div slote="label">
      <div
       v-if="article.cover.type === 3"
       class="cover-wrap">
        <van-image
          height="73"
          width="100%"
          v-for="(pic, num) in article.cover.images"
          :key="num"
          class="cover-img"
          fit="cover"
          :src="pic" />
      </div>
      <div class="label-info">
        <span>{{article.aut_name}}</span>
        <span>{{article.collect_count}}评论</span>
        <span>{{article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <van-image
      v-if="article.cover.type === 1"
      class="right-img"
      slot="right-icon"
      fit="cover"
      :src="article.cover.images[0]" />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
  .article-item {
    .cover-wrap {
      display: flex;
      justify-content: center;
      .cover-img {
        margin: 3% 0.8%;
      }
    }
    .label-info {
      color: #b4b4b4;
      font-size: 14px;
      span {
        margin-right:20px;
      }
    }
    .right-img {
      width: 116px;
      height: 73px;
      margin-left: 6px;
    }
  }
</style>

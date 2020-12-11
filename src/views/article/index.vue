<template>
  <div class="article-container">
    <van-nav-bar
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
      class="article-nav"
    />
    <div class="article-middle">
      <div class="article-title">{{article.title}}</div>
      <van-cell>
        <van-image
          width="100"
          height="100"
          fit="cover"
          slot="icon"
          class="article-img"
          :src="article.aut_photo" />
          <div class="info">
            <div>{{article.aut_name}}</div>
            <div class="time">{{article.pubdate | relativeTime}}</div>
          </div>
          <div
            slot="right-icon"
            class='attention'>
            <van-button
             :icon="article.is_followed ? '' : 'plus'"
             :type="article.is_followed ? 'default' : 'info'"
             round
             class="attention-btn"
             @click="onAttention"
             :loading="isAttentionLoading"
             size="mini">{{article.is_followed ? '已关注' : '关注'}}</van-button>
          </div>
      </van-cell>
      <div
       class="articleText"
       v-html="article.content"
       ref="article-content"></div>
      <div class="allComment">全部评论</div>
      <van-divider />
      <!-- 文章评论列表 -->
      <commentList
       :source="articleId"
       @total_count="totalCount = $event"
       @commentList="commentList = $event"
       @isShowReply="onReplyShow"/>
      <!-- 底部区域 -->
      <div class="article-bottom">
        <van-button
         type="default"
         size="mini"
         round
         class="white_text"
         @click="commentShow = true">写评论</van-button>
         <van-icon name="comment-o" :badge="totalCount" />
         <van-icon
          :name="article.is_collected ? 'star' : 'star-o'"
          :class="article.is_collected ? 'onCollect' : ''"
          @click="onCollectArticle"/>
         <van-icon
         :name="article.attitude === 1 ? 'good-job' : 'good-job-o'"
         :class="article.attitude === 1 ? 'isLike' : ''"
         @click="onArticleLiking"/>
         <van-icon name="share-o" />
      </div>
    </div>
    <!-- 文章回复 -->
    <van-popup v-model="commentShow" position="bottom" :style="{ height: '20%' }">
      <postComment
       :target="articleId"
       @post-success="onPostSuccess"/>
    </van-popup>
    <!-- 回复评论弹窗 -->
    <van-popup
      v-model="isReplyShow"
      closeable
      position="bottom"
      close-icon-position="top-left"
    >
    <commentReply
      v-if="isReplyShow"
      :currentComment="currentComment"
      :articleId="articleId" />
    </van-popup>
  </div>
</template>

<script>
import { getArticleDetail, articleLike, cancelArticleLike } from '@/api/article'
import { collectArticle, deleteCollectArticle } from '@/api/comment'
import { attentionUser, unAttentionUser } from '@/api/user'
import { ImagePreview } from 'vant'
import commentList from './components/comment-list'
import postComment from './components/post-comment'
import commentReply from './components/comment-reply'
export default {
  name: 'ArticleContainer',
  data () {
    return {
      article: {},
      isAttentionLoading: false,
      commentShow: false,
      totalCount: 0,
      commentList: [],
      isReplyShow: false,
      currentComment: {}
    }
  },
  props: { // props传参
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  components: {
    commentList,
    postComment,
    commentReply
  },
  created () {
    this.onArticleDetail()
  },
  methods: {
    async onArticleDetail () {
      const { data } = await getArticleDetail(this.articleId)
      // 此时出现404错误，超出js范围，使用json-bigint
      // console.log(data)
      this.article = data.data

      // $nextTick异步，去重
      this.$nextTick(() => {
        // 图片预览
        this.handlePreviewImage()
      })
    },
    handlePreviewImage () {
      const articleContent = this.$refs['article-content']
      const allImages = articleContent.querySelectorAll('img')
      console.log(allImages)
      const imgPaths = []
      allImages.forEach((img, index) => {
        imgPaths.push(img.src)
        img.onclick = function () {
          ImagePreview({
            images: imgPaths,
            startPosition: index
          })
        }
      })
    },
    async onAttention () {
      this.isAttentionLoading = true
      try {
        const authorId = this.article.aut_id
        if (this.article.is_followed) {
          await unAttentionUser(authorId)
          this.$toast.success('取消关注！')
        } else {
          await attentionUser(authorId)
          this.$toast.success('关注成功！')
        }
        this.isAttentionLoading = false
        this.article.is_followed = !this.article.is_followed
      } catch (err) {
        console.log(err)
        this.$toast.fail('关注失败！')
      }
    },
    async onCollectArticle () {
      if (this.article.is_collected) {
        await deleteCollectArticle(this.articleId)
        this.$toast.success('取消收藏！')
      } else {
        await collectArticle(this.articleId)
        this.$toast.success('收藏成功！')
      }
      this.article.is_collected = !this.article.is_collected
    },
    onPostSuccess (comment) {
      this.commentShow = false
      this.commentList.unshift(comment)
      this.totalCount++
    },
    onReplyShow (comment) {
      this.isReplyShow = true
      this.currentComment = comment
    },
    async onArticleLiking () {
      if (this.article.attitude === 1) {
        await cancelArticleLike(this.articleId)
        this.article.attitude = -1
        this.$toast.success('取消成功！')
      } else {
        await articleLike(this.articleId)
        this.article.attitude = 1
        this.$toast.success('点赞成功！')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article-container {
  .article-middle {
    position: absolute;
    top:46px;
    bottom: 45px;
    left: 0;
    right: 0;
    overflow-y: auto;
  }
  .article-nav {
    background-color: #3296fa;
  }
  .article-title {
    font-size: 20px;
    padding: 20px;
  }
  .info {
    margin-left: 10px;
    font-size: 12px;
    .time {
      color: #b4b4b4;
    }
  }
  .attention {
    .attention-btn {
      padding: 14px 20px;
    }
  }
  .articleText {
    padding: 0 20px;
    font-size: 18px;
    margin-top: 20px;
  }
  .allComment {
    font-size: 14px;
    color: #323233;
    margin-top: 20px;
    margin-left: 20px;
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
      padding: 12px 30px;
      font-size: 14px;
    }
    .onCollect {
      color: orange;
    }
    .isLike {
      color: hotpink;
    }
  }
}
</style>

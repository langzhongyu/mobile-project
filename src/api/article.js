
import request from '@/utils/request'

// Body参数使用data设置
// Query参数使用params设置
// Headers参数使用headers设置

/**
 * 获取用户文章列表
 */
export const getUserArticles = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}

/**
 * 获取新闻文章详情
 */
export const getArticleDetail = articleId => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${articleId}`
  })
}

/**
 * 给文章点赞
 */
export const articleLike = articleId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data: {
      target: articleId
    }
  })
}

/**
 * 取消文章点赞
 */
export const cancelArticleLike = articleId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${articleId}`
  })
}

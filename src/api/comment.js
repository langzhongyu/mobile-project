import request from '@/utils/request'

/**
 * 添加评论或回复
 * */

export const addComment = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data
  })
}
/**
 *  获取评论或评论回复
 * */

export const getComment = (params, data) => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params,
    data
  })
}

/**
 *  点赞
 * */

export const addCommentLike = commentId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comment/likings',
    data: {
      target: commentId
    }
  })
}

/**
 *  取消点赞
 * */

export const deleteCommentLike = commentId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/comment/likings/${commentId}`
  })
}

/**
 *  收藏文章
 * */

export const collectArticle = articleId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/collections',
    data: {
      target: articleId
    }
  })
}

/**
 *  取消收藏文章
 * */

export const deleteCollectArticle = articleId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${articleId}`
  })
}

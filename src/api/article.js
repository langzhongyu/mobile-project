
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

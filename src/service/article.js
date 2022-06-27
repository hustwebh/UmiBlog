import request from '@/utils/request'


export async function getArticles(data) {
  return request(`/api/article/articles`,{
    method: 'POST',
    data,
  })
}

export async function getTags() {
  return request('/api/articles/tags')
}

export async function getArticleDetail(params) {
  return request(`/api/detail?${stringify(params)}`)
}

// 获取用户评论
export async function getComments(params) {
  return request(`/api/comments?${stringify(params)}`)
}

// 未登录添加评论
export async function createNoLoginComment(data) {
  return request('/api/toursit/comment', {
    method: 'POST',
    data,
  })
}

// 添加评论
export async function createComment(data) {
  return request('/api/create/comment', { method: 'POST', data })
}
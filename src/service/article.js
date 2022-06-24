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
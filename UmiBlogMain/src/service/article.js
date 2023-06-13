import request from '@/utils/request';

export async function getArticles({ currentPage, pageSize, keywords }) {
  return request(
    `/api/article/articles?currentPage=${currentPage}&pageSize=${pageSize}&keywords=${keywords}`,
  );
}

//获取所有存在的文章分类
export async function getAllClasses() {
  return request('/api/article/classes');
}

//获取所有的文章标签
export async function getTags() {
  return request('/api/article/tags');
}

//获取文章详情信息
export async function getArticleDetail({ articleId }) {
  return request(`/api/article/detail?articleId=${articleId}`);
}

// 文章点赞
export async function updateFavorite(data) {
  return request('/api/article/favorite', {
    method: 'POST',
    data,
  });
}

// 是否已点赞
export async function getIsFavorite({ articleId, userId }) {
  return request(
    `/api/article/isFavorite?articleId=${articleId}&userId=${userId}`,
  );
}

// 获取用户评论
export async function getComments({ articleId }) {
  return request(`/api/article/comments?articleId=${articleId}`);
}

// 未登录添加评论
export async function createNoLoginComment(data) {
  return request('/api/article/toursitAddComment', {
    method: 'POST',
    data,
  });
}

// 添加评论
export async function createComment(data) {
  return request('/api/article/addComment', { method: 'POST', data });
}

export async function getListByTag({ currentPage, pageSize, tag }) {
  return request(
    `/api/article/getByTag?currentPage=${currentPage}&pageSize=${pageSize}&tag=${tag}`,
  );
}

export async function getListByClass({ currentPage, pageSize, class1 }) {
  return request(
    `/api/article/getByClass?currentPage=${currentPage}&pageSize=${pageSize}&class1=${class1}`,
  );
}

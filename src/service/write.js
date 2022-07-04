import { stringify } from 'qs';
import request from '@/utils/request';

// 保存draft
export async function createDraft(data) {
  return request('/api/write/saveDraft', {
    method: 'POST',
    data,
  });
}

// 获取 draft
export async function getDraft(params) {
  return request(`/api/write/draft?${stringify(params)}`);
}

// 获取drafts
export async function getDrafts() {
  return request('/api/write/drafts');
}

// 更新draft
export async function updateDraft(data) {
  return request('/api/write/updateDraft', {
    method: 'POST',
    data,
  });
}

// 删除draft
export async function deleteDraft(data) {
  return request('/api/write/deleteDraft', {
    method: 'POST',
    data,
  });
}

// 发布文章
export async function createPublish(data) {
  return request('/api/write/publish', {
    method: 'POST',
    data,
  });
}

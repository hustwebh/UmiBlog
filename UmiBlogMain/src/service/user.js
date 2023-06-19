// import request from '@/utils/request'
import {request} from '@umijs/max'

// 注册
export async function registerAccount(data) {
  return request('/api/user/register', {
    method: 'POST',
    data,
  })
}

// 登录
export async function loginAccount(data) {
  return request('/api/user/login', {
    method: 'POST',
    data,
  })
}

// 得到用户信息
export async function getAccount() {
  return request('/api/user/account')
}

// 退出登录
export async function logoutAccount() {
  return request('/api/user/logout', { method: 'POST' })
}

// 修改用户信息
// export async function modifyAccount(data) {
//   return request('/api/update/account', { method: 'POST', data })
// }

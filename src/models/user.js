import { message } from 'antd'
import { history } from 'umi'
import {
  registerAccount,
  loginAccount,
  getAccount,
  logoutAccount,
  modifyAccount,
} from '../service/user'
import storageHelper from '@/utils/storage'

const avatars = [
  'https://immisso.oss-cn-hangzhou.aliyuncs.com/avatar/001.png',
  'https://immisso.oss-cn-hangzhou.aliyuncs.com/avatar/002.png',
  'https://immisso.oss-cn-hangzhou.aliyuncs.com/avatar/003.png',
  'https://immisso.oss-cn-hangzhou.aliyuncs.com/avatar/004.png',
]

const initAccount = () => {
  const user = storageHelper.get('user')
  if (!user || user.exp * 1000 < new Date().getTime()) {
    return {}
  }
  return user
}

export default {
  namespace: 'user',
  state: {
    account: initAccount(),
    avatar: null,
  },
  effects: {
    *register({ payload }, { call, put }) {
      // const { code } = yield call(registerAccount, payload)
      // if (code === 200) {
      //   message.success('注册成功')
      // history.push({ pathname: '/login', isRegister: true })
      //   return true;
      // } else {
      //   message.warn('注册失败，请重新注册')
      //   return false;
      // }
      history.push({ isRegister: true })
      return true;
    },

    *login({ payload }, { call, put }) {
      // const response = yield call(loginAccount, payload)
      // if (response.code !== 200) {
      //   message.error(response.message)
      // } else {
      //   message.success('登录成功')
      //   return true;
      // }
      // history.push({ isRegister: true })
      return true;
    },

    *account({ payload }, { call, put }) {
      // const {code, data} = yield call(getAccount, payload)
      // if (code === 200) {
      //   storageHelper.set('user',data)
      //   yield put({
      //     type: 'handle',
      //     payload: {
      //       account: data,
      //       avatar: data.avatar,
      //     },
      //   });
      //   return true
      // }
      const data = { 
        "email":"123@qq.com",
        "id": 1,
        "account.addount_type":"ADMIN",
        // "avatar":"123.jpg"
       }
      storageHelper.set('user',data);
        yield put({
          type: 'handle',
          payload: {
            account: data,
            avatar: data.avatar,
          },
        });
        return true
    },

    *logout({ payload }, { call, put }) {
      // const {code} = yield call(logoutAccount, payload)
      // if(code===200) {
        yield put({
          type: 'handle',
          payload: {
            account: {},
          },
        })
        message.info("退出成功!");
        history.push("/blog");
      // }
    },

    *setAccount({ payload, callback }, { call, put }) {
      const { code, data } = yield call(modifyAccount, payload)
      if (code === 200) {
        yield put({
          type: 'handle',
          payload: {
            account: data,
          },
        })
        message.success('更新成功')
      }
    },
  },
  reducers: {
    handle(state, { payload }) {
      return { ...state, ...payload }
    },
    changeAvatar(state) {
      return { ...state, avatar: avatars[Math.floor(Math.random() * 4)] }
    },
  },
}

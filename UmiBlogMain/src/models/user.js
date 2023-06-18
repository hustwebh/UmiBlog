import { message } from 'antd';
import { history } from '@umijs/max';
import {
  registerAccount,
  loginAccount,
  // getAccount,
  logoutAccount,
  // modifyAccount,
} from '../service/user';
import Cookies from 'js-cookie';
import storageHelper from '@/utils/storage';

const initAccount = () => {
  if (!Cookies.get("token")) {
    return {};
  }
  return storageHelper.get('account');
};

export default {
  namespace: 'user',
  state: {
    account: initAccount(),
    avatar: null,
  },
  effects: {
    *register({ payload }, { call, put }) {
      console.log('payload', payload);
      const result = yield call(registerAccount, payload);
      console.log(result);
      if (result.code === 200) {
        message.success('注册成功');
        history.push({ isRegister: true });
        return true;
      } else {
        message.warn('注册失败，请重新注册');
        return false;
      }
    },

    *login({ payload }, { call, put }) {
      const { code, data } = yield call(loginAccount, payload);
      if (code !== 200) {
        message.error(response.message);
      } else {
        message.success('登录成功');
        yield put({
          type: 'handle',
          payload: {
            account: data,
            avatar: data.avatar,
          },
        });
        Cookies.set("token",data.token,{ expires: 1 })
        storageHelper.set('account',data)
        return true;
      }
    },

    // *account({ payload }, { call, put }) {
    //   const { code, data } = yield call(getAccount, payload);
    //   if (code === 200) {
    //     storageHelper.set('user', data);
    //     yield put({
    //       type: 'handle',
    //       payload: {
    //         account: data,
    //         avatar: data.avatar,
    //       },
    //     });
    //     return true;
    //   }
    //   // const data = {
    //   //   "email":"123@qq.com",
    //   //   "id": 1,
    //   //   "account_type":"ADMIN",
    //   //   // "avatar":"123.jpg"
    //   //  }
    //   // storageHelper.set('user',data);
    //   //   yield put({
    //   //     type: 'handle',
    //   //     payload: {
    //   //       account: data,
    //   //       avatar: data.avatar,
    //   //     },
    //   //   });
    //   // return true
    // },

    *logout({ payload }, { call, put }) {
      const { code } = yield call(logoutAccount, payload);
      storageHelper.clear('account')
      Cookies.remove("token")
      if (code === 200) {
        yield put({
          type: 'logoutHandler',
        });
        message.info('退出成功!');
        history.push('/blog');
      }
    },

    *setAccount({ payload, callback }, { call, put }) {
      const { code, data } = yield call(modifyAccount, payload);
      if (code === 200) {
        yield put({
          type: 'handle',
          payload: {
            account: data,
          },
        });
        message.success('更新成功');
      }
    },
  },
  reducers: {
    handle(state, { payload }) {
      return { ...state, ...payload };
    },
    changeAvatar(state) {
      return { ...state, avatar: avatars[Math.floor(Math.random() * 4)] };
    },
    logoutHandler(state) {
      return {...state, account:{}}
    }
  },
};

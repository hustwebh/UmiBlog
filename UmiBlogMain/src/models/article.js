import {
  getArticles,
  getTags,
  getAllClasses,
  getComments,
  getArticleDetail,
  getIsFavorite,
  createNoLoginComment,
  createComment,
  updateFavorite,
  getListByTag,
  getListByClass,
} from '@/service/article'

import { message } from 'antd'

export default {
  namespace: 'article',
  state: {
    categories: [],
    articles: [],
    comments: [],
    tags: [],
    classesList: [],
    detail: {},
    article_count: 0,
    isFavorite: false,
    favorite_count: 0,
  },
  effects: {
    *articles({ payload }, { call, put }) {
      const { code, data } = yield call(getArticles, payload)
      if (code === 200) {
        yield put({
          type: 'handle',
          payload: {
            articles: data.articles,
            article_count: data.article_count,
          },
        })
      }
    },
    *tags({ payload }, { call, put }) {
      const { code, data } = yield call(getTags, payload)
      if (code === 200) {
        yield put({
          type: 'handle',
          payload: {
            tags: data,
          },
        })
      }
    },
    *classes({ payload }, { call, put }) {
      const { code, data } = yield call(getAllClasses, payload)
      if (code === 200) {
        yield put({
          type: 'handle',
          payload: {
            classesList: data,
          },
        })
      }
    },
    *detail({ payload }, { call, put }) {
      const { code, data } = yield call(getArticleDetail, payload)
      if (code === 200) {
        yield put({
          type: 'handle',
          payload: {
            detail: data,
            favorite_count: data.favorite,
          },
        })
      }
    },
    *comments({ payload }, { call, put }) {
      const { code, data } = yield call(getComments, payload)
      if (code === 200) {
        yield put({
          type: 'handle',
          payload: {
            comments: data,
          },
        })
      }
      // const data = {}
      // yield put({
      //   type: 'handle',
      //   payload: {
      //     comments: data,
      //   },
      // })
    },
    *addNoLoginComment({ payload }, { call, put }) {
      const { code, data } = yield call(createNoLoginComment, payload)
      if (code === 200) {
        yield put({
          type: 'createCommentHandle',
          payload: data,
        })
      }
    },

    *addComment({ payload }, { call, put }) {
      console.log('addComment', payload)
      const { code, data } = yield call(createComment, payload)
      console.log('returnData', data)
      if (code === 200) {
        yield put({
          type: 'createCommentHandle',
          payload: data,
        })
      }
    },
    *favorite({ payload }, { call, put }) {
      const { code } = yield call(updateFavorite, payload)
      if (code === 200) {
        yield put({ type: 'changeFavorite' })
      }
    },
    *isFavorite({ payload }, { call, put }) {
      const { code, data } = yield call(getIsFavorite, payload)
      if (code === 200) {
        yield put({
          type: 'handle',
          payload: {
            isFavorite: data,
          },
        })
      }
    },
    *getByClass({ payload }, { call, put }) {
      const { code, data } = yield call(getListByClass, payload)
      if (code === 200) {
        console.log('getByClass', data)
        yield put({
          type: 'handle',
          payload: {
            articleList: data.articles,
            articleCount: data.articleCount,
          },
        })
      }
    },
    *getByTag({ payload }, { call, put }) {
      const { code, data } = yield call(getListByTag, payload)
      if (code === 200) {
        yield put({
          type: 'handle',
          payload: {
            articleList: data.articles,
            articleCount: data.articleCount,
          },
        })
      }
    },
  },

  reducers: {
    changeFavorite(state) {
      console.log(state)
      const type = state.isFavorite ? 'reduce' : 'plus'
      let favorite_count = state.favorite_count
      if (type === 'plus') {
        favorite_count += 1
      }
      if (type === 'reduce') {
        favorite_count -= 1
      }
      return {
        ...state,
        isFavorite: !state.isFavorite,
        favorite_count,
      }
    },
    handle(state, { payload }) {
      return { ...state, ...payload }
    },
    createCommentHandle(state, { payload }) {
      return {
        ...state,
        comments: [payload, ...state.comments],
      }
    },
  },
}

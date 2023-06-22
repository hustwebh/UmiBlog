import {
  getComments,
  getCategories,
  deleteCategory,
  createCategory,
  getTags,
  deleteTag,
  createTag,
  deleteArticle,
  deleteComment,
  getArticles,
} from '../services/admin'

export default {
  namespace: 'admin',
  state: {
    comments: [],
    categories: [],
    tags: [],
    articles: [],
    articleCount: 0,
  },
  effects: {
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
    },

    *categories({ payload }, { call, put }) {
      const { code, data } = yield call(getCategories, payload)
      if (code === 200) {
        yield put({
          type: 'handle',
          payload: {
            categories: data,
          },
        })
      }
    },

    *deleteCategory({ payload }, { call, put }) {
      const { code, data } = yield call(deleteCategory, payload)
      if (code === 200) {
        yield put({
          type: 'deleteCategoryHandle',
          payload: data,
        })
      }
    },

    *createCategory({ payload }, { call, put }) {
      const { code, data } = yield call(createCategory, payload)
      if (code === 200) {
        yield put({
          type: 'createCategoryHandle',
          payload: data,
        })
      }
    },

    *tags({ payload }, { call, put }) {
      // const { code, data } = yield call(getTags, payload)
      const { code, data } = {
        code: 200,
        data: [
          { createAt: '2022-07-05 14:32:54.471628', id: 1, name: 'tag1' },
          { createAt: '2022-07-05 14:32:54.471628', id: 2, name: 'tag2' },
          { createAt: '2022-07-05 14:32:54.471628', id: 3, name: 'tag3' },
          { createAt: '2022-07-05 14:32:54.471628', id: 4, name: 'tag4' },
          { createAt: '2022-07-05 14:32:54.471628', id: 5, name: 'tag5' },
          { createAt: '2022-07-05 14:32:54.471628', id: 6, name: 'tag6' },
        ],
      }
      if (code === 200) {
        yield put({
          type: 'handle',
          payload: {
            tags: data,
          },
        })
      }
    },

    *deleteTag({ payload }, { call, put }) {
      const { code, data } = yield call(deleteTag, payload)
      if (code === 200) {
        yield put({
          type: 'deleteTagHandle',
          payload: data,
        })
      }
    },
    *createTag({ payload }, { call, put }) {
      const { code, data } = yield call(createTag, payload)
      if (code === 200) {
        yield put({
          type: 'createTagHandle',
          payload: data,
        })
      }
    },
    *deleteArticle({ payload }, { call, put }) {
      const { code, data } = yield call(deleteArticle, payload)
      if (code === 200) {
        yield put({
          type: 'deleteArticleHandle',
          payload: data,
        })
      }
    },
    *deleteComment({ payload }, { call, put }) {
      const { code, data } = yield call(deleteComment, payload)
      if (code === 200) {
        yield put({
          type: 'deleteCommentHandle',
          payload: data,
        })
      }
    },
    *articles({ payload }, { call, put }) {
      const { code, data } = yield call(getArticles, payload)
      if (code === 200) {
        yield put({
          type: 'handle',
          payload: {
            articles: data.articles,
            articleCount: data.count,
          },
        })
      }
    },
  },
  reducers: {
    handle(state, { payload }) {
      return { ...state, ...payload }
    },
    createCategoryHandle(state, { payload }) {
      return {
        ...state,
        categories: [...state.categories, payload],
      }
    },
    createTagHandle(state, { payload }) {
      return {
        ...state,
        tags: [...state.tags, payload],
      }
    },
    deleteCategoryHandle(state, { payload }) {
      return {
        ...state,
        categories: [...state.categories].filter(
          (item) => item.id !== payload.id,
        ),
      }
    },
    deleteTagHandle(state, { payload }) {
      return {
        ...state,
        tags: [...state.tags].filter((item) => item.id !== payload.id),
      }
    },
    deleteArticleHandle(state, { payload }) {
      return {
        ...state,
        articles: [...state.articles].filter((item) => item.id !== payload.id),
      }
    },
    deleteCommentHandle(state, { payload }) {
      return {
        ...state,
        comments: [...state.comments].filter((item) => item.id !== payload.id),
      }
    },
  },
}

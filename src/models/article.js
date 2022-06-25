import {
  getArticles,
  getTags,
  getAllClasses
} from '@/service/article'

export default {
  namespace: 'article',
  state: {
    categories: [],
    articles: [],
    comments: [],
    tags: [],
    classesList: [],
    detail: {},
    articleCount: 0,
    isFavorite: false,
    favoriteCount: 0,
  },
  effects: {
    *articles({ payload }, { call, put }) {
      // const { code, data } = yield call(getArticles, payload)
      // if (code === 200) {
      //   yield put({
      //     type: 'handle',
      //     payload: {
      //       articles: data.articles,
      //       articleCount: data.count,
      //     },
      //   })
      // }
      const data = {
        articles: [{ title: "title1", view: 10, favorite: 5, comment: 3, articleId: 1, createAt: "2022-6-24 2:55", tag: ["javaScript", "react"] },
        { title: "title1", view: 10, favorite: 5, comment: 3, articleId: 1, createAt: "2022-6-24 2:55", tag: ["javaScript", "react", "javaScript", "react"] },
        { title: "title1", view: 10, favorite: 5, comment: 3, articleId: 1, createAt: "2022-6-24 2:55", tag: ["javaScript", "react"] },
        { title: "title1", view: 10, favorite: 5, comment: 3, articleId: 1, createAt: "2022-6-24 2:55", tag: ["javaScript", "react"] },
        { title: "title1", view: 10, favorite: 5, comment: 3, articleId: 1, createAt: "2022-6-24 2:55", tag: ["javaScript", "react"] },],
        articleCount: 10
      }
      yield put({
        type: 'handle',
        payload: {
          articles: data.articles,
          articleCount: data.articleCount,
        },
      })
    },
    *tags({ payload }, { call, put }) {
      // const { code, data } = yield call(getTags, payload)
      // if (code === 200) {
      //   yield put({
      //     type: 'handle',
      //     payload: {
      //       tags: data,
      //     },
      //   })
      // }
      
      const data = ["javaScript", "react"];
      yield put({
        type: 'handle',
        payload: {
          tags: data,
        },
      })
    },
    *classes({ payload }, { call, put }) {
      // const { code,data } = yield call(getAllClasses,payload)
      // if(code===200) {
      //   yield put({
      //     type:'handle',
      //     payload: {
      //       classesList: data
      //     }
      //   })
      // }
      const data = [
        { name: "yi", number: 1 }, { name: "yi", number: 1 }, { name: "yi", number: 1 }
      ]
      yield put({
        type: 'handle',
        payload: {
          classesList: data
        }
      })
    }
  },
  reducers: {
    handle(state, { payload }) {
      return { ...state, ...payload }
    },
  },
}
import {
  getArticles,
  getTags,
  getAllClasses,
  getComments,
  getArticleDetail,
  createNoLoginComment,
  createComment
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
    },
    *detail({ payload }, { call, put }) {
      // const { status, data } = yield call(getArticleDetail, payload)
      // if (status === 200) {
      //   yield put({
      //     type: 'handle',
      //     payload: {
      //       detail: data,
      //       favoriteCount: data.favorite,
      //     },
      //   })
      // }
      const data = {
        "view": 123,
        "title": "标题1",
        "markdown": `## halloWorld!\nqweasd\n123qwe
        ~~~js
          console.log(123)
        ~~~
        `,
        "anchor": `[]`,
        "uid": 1,
        "user": {
          // "avatar": "123.jpg",
          "nickname": "kou1song",
          "profession": "学生",
          "total_view": 20,
          "total_like": 10,
          "total_comment": 5
        },
        "creatAt": "2022-6-27-10:10",
        "comment": 10,
        "favorite": 100
      }
      yield put({
        type: 'handle',
        payload: {
          detail: data,
          favoriteCount: data.favorite,
        },
      })
    },
    *comments({ payload }, { call, put }) {
      // const { status, data } = yield call(getComments, payload)
      // if (status === 200) {
      //   yield put({
      //     type: 'handle',
      //     payload: {
      //       comments: data,
      //     },
      //   })
      // }
      const data = {}
      yield put({
        type: 'handle',
        payload: {
          comments: data,
        },
      })
    },
    *addNoLoginComment({ payload }, { call, put }) {
      const { status, data } = yield call(createNoLoginComment, payload)
      if (status === 200) {
        yield put({
          type: 'createCommentHandle',
          payload: data,
        })
      }
    },

    *addComment({ payload }, { call, put }) {
      const { status, data } = yield call(createComment, payload)
      if (status === 200) {
        yield put({
          type: 'createCommentHandle',
          payload: data,
        })
      }
    },
  },

  reducers: {
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
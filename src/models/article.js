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
} from '@/service/article';

import { message } from 'antd';

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
      const { code, data } = yield call(getArticles, payload);
      if (code === 200) {
        yield put({
          type: 'handle',
          payload: {
            articles: data.articles,
            articleCount: data.count,
          },
        });
      }
      // data = {
      //   articles: [
      //     {
      //       title: 'title1',
      //       view: 10,
      //       favorite: 5,
      //       comment: 3,
      //       articleId: 1,
      //       createAt: '2022-6-24 2:55',
      //       tag: ['javaScript', 'react'],
      //       category: 'haha',
      //     },
      //     {
      //       title: 'title1',
      //       view: 10,
      //       favorite: 5,
      //       comment: 3,
      //       articleId: 1,
      //       createAt: '2022-6-24 2:55',
      //       tag: ['javaScript', 'react', 'javaScript', 'react'],
      //       category: 'haha',
      //     },
      //     {
      //       title: 'title1',
      //       view: 10,
      //       favorite: 5,
      //       comment: 3,
      //       articleId: 1,
      //       createAt: '2022-6-24 2:55',
      //       tag: ['javaScript', 'react'],
      //       category: 'haha',
      //     },
      //     {
      //       title: 'title1',
      //       view: 10,
      //       favorite: 5,
      //       comment: 3,
      //       articleId: 1,
      //       createAt: '2022-6-24 2:55',
      //       tag: ['javaScript', 'react'],
      //       category: 'haha',
      //     },
      //     {
      //       title: 'title1',
      //       view: 10,
      //       favorite: 5,
      //       comment: 3,
      //       articleId: 1,
      //       createAt: '2022-6-24 2:55',
      //       tag: ['javaScript', 'react'],
      //       category: 'haha',
      //     },
      //   ],
      //   articleCount: 10,
      // };
      // yield put({
      //   type: 'handle',
      //   payload: {
      //     articles: data.articles,
      //     articleCount: data.articleCount,
      //   },
      // });
    },
    *tags({ payload }, { call, put }) {
      const { code, data } = yield call(getTags, payload);
      if (code === 200) {
        yield put({
          type: 'handle',
          payload: {
            tags: data,
          },
        });
      }

      // const data = ["javaScript", "react"];
      // yield put({
      //   type: 'handle',
      //   payload: {
      //     tags: data,
      //   },
      // })
    },
    *classes({ payload }, { call, put }) {
      // const { code, data } = yield call(getAllClasses, payload);
      // if (code === 200) {
      //   yield put({
      //     type: 'handle',
      //     payload: {
      //       classesList: data,
      //     },
      //   });
      // }
      const data = [
        { name: 'yi', number: 1 },
        { name: 'yi', number: 1 },
        { name: 'yi', number: 1 },
      ];
      yield put({
        type: 'handle',
        payload: {
          classesList: data,
        },
      });
    },
    *detail({ payload }, { call, put }) {
      const { code, data } = yield call(getArticleDetail, payload);
      if (code === 200) {
        yield put({
          type: 'handle',
          payload: {
            detail: data,
            favoriteCount: data.favorite,
          },
        });
      }
      // const data = {
      //   "view": 123,
      //   "title": "标题1",
      //   "markdown": `## halloWorld!
      //   qweasd
      //   123qwe`,
      //   "anchor": `[]`,
      //   "uid": 1,
      //   "user": {
      //     // "avatar": "123.jpg",
      //     "nickname": "kou1song",
      //     "total_view": 20,
      //     "total_like": 10,
      //     "total_comment": 5
      //   },
      //   "creatAt": "2022-6-27-10:10",
      //   "comment": 10,
      //   "favorite": 100,
      //   "isFavorite": 1
      // }
      // yield put({
      //   type: 'handle',
      //   payload: {
      //     detail: data,
      //     favoriteCount: data.favorite,
      //   },
      // })
    },
    *comments({ payload }, { call, put }) {
      const { code, data } = yield call(getComments, payload);
      if (code === 200) {
        yield put({
          type: 'handle',
          payload: {
            comments: data,
          },
        });
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
      const { code, data } = yield call(createNoLoginComment, payload);
      if (code === 200) {
        yield put({
          type: 'createCommentHandle',
          payload: data,
        });
      }
    },

    *addComment({ payload }, { call, put }) {
      const { code, data } = yield call(createComment, payload);
      if (code === 200) {
        yield put({
          type: 'createCommentHandle',
          payload: data,
        });
      }
    },
    *comments({ payload }, { call, put }) {
      const { code, data } = yield call(createComment, payload);
      if (code === 200) {
        yield put({
          type: 'createCommentHandle',
          payload: data,
        });
      }
    },
    *favorite({ payload }, { call, put }) {
      const { code } = yield call(updateFavorite, payload);
      if (code === 200) {
        yield put({ type: 'changeFavorite' });
      }
    },
    *isFavorite({ payload }, { call, put }) {
      const { code, data } = yield call(getIsFavorite, payload);
      if (code === 200) {
        yield put({
          type: 'handle',
          payload: {
            isFavorite: data,
          },
        });
      }
    },
    *getByClass({ payload }, { call, put }) {
      const { code, data } = yield call(getListByClass, payload);
      if (code === 200) {
        yield put({
          type: 'handle',
          payload: {
            articleList: data.articles,
            articleCount: data.articleCount,
          },
        });
      }
    },
    *getByTag({ payload }, { call, put }) {
      const { code, data } = yield call(getListByTag, payload);
      if (code === 200) {
        yield put({
          type: 'handle',
          payload: {
            articleList: data.articles,
            articleCount: data.articleCount,
          },
        });
      }
    },
  },

  reducers: {
    changeFavorite(state) {
      console.log(state);
      const type = state.isFavorite ? 'reduce' : 'plus';
      let favoriteCount = state.favoriteCount;
      if (type === 'plus') {
        favoriteCount += 1;
      }
      if (type === 'reduce') {
        favoriteCount -= 1;
      }
      return {
        ...state,
        isFavorite: !state.isFavorite,
        favoriteCount,
      };
    },
    handle(state, { payload }) {
      return { ...state, ...payload };
    },
    createCommentHandle(state, { payload }) {
      return {
        ...state,
        comments: [payload, ...state.comments],
      };
    },
  },
};

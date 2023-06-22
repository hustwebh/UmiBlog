import { defineConfig } from 'umi'

export default defineConfig({
  antd: {},
  dva: {},
  locale: {
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  request: {},
  layout: {
    title: '@umijs/max',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '分类',
      path: '/categories',
      component: './categories',
    },
    {
      name: '标签',
      path: '/tags',
      component: './tags',
    },
    {
      name: '文章',
      path: '/articles',
      component: './articles',
    },
    {
      name: '评论',
      path: '/comments',
      component: './comments',
    },
  ],
  qiankun: {
    slave: {},
  },
  npmClient: 'yarn',
})


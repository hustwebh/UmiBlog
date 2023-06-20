import { defineConfig } from 'umi'

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
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
      path: '/admin/categories',
      component: '@/pages/categories',
    },
    {
      path: '/admin/tags',
      component: '@/pages/tags',
    },
    {
      path: '/admin/articles',
      component: '@/pages/articles',
    },
    {
      path: '/admin/comments',
      component: '@/pages/comments',
    },
  ],
  qiankun: {
    slave: {},
  },
  npmClient: 'yarn',
})


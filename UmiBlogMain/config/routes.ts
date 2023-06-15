export default [
  {
    path: '/',
    exact: true,
    // component: '@/pages',
    redirect: '/welcome/', 
  },
  {
    path: '/welcome/*',
    microApp: 'threeDimensional',
  },
  {
    path: '/write',
    component: '@/layouts/BlogLayouts/writePageLayout',
    routes: [
      {
        path: '/write/:key',
        component: '@/pages/write',
      },
    ],
  },
  {
    path: '/drafts',
    component: '@/layouts/BlogLayouts/writePageLayout',
    routes: [
      {
        path: '/drafts',
        component: '@/pages/drafts',
      },
    ],
  },
  {
    path: '/admin',
    component: '@/layouts/BlogLayouts/adminLayout',
    routes: [
      {
        path: '/admin',
        redirect: '/admin/categories',
      },
      {
        path: '/admin/categories',
        component: '@/pages/admin/categories',
      },
      {
        path: '/admin/tags',
        component: '@/pages/admin/tags',
      },
      {
        path: '/admin/articles',
        component: '@/pages/admin/articles',
      },
      {
        path: '/admin/comments',
        component: '@/pages/admin/comments',
      },
    ],
  },
  {
    path: '/',
    component: '@/layouts/BlogLayouts/webPageLayout/index',
    routes: [
      {
        path: '/blog',
        component: '@/pages/blog',
      },
      {
        path: '/search',
        component: '@/pages/search',
      },
      {
        path: '/classes',
        component: '@/pages/classes',
      },
      {
        path: '/tags',
        component: '@/pages/tags',
      },
      {
        path: '/friends',
        component: '@/pages/friends',
      },
      {
        path: '/about',
        component: '@/pages/about',
      },
      {
        path: '/detail/:articleId',
        component: '@/pages/articleDetail/[index]',
      },
      {
        path: '/getList',
        component: '@/pages/getList',
      },
    ],
  },
];

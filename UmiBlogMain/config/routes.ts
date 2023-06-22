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
    path: '/admin/*',
    microApp: 'websiteAdmin'
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
]

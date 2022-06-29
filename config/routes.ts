export default [
  {
    path: '/',
    component: '@/pages',
  },
  {
    path: '/write',
    component: '@/layouts/BlogLayouts/writePageLayout',
    routes: [
      {
        path: '/write/:key',
        component: '@/pages/write',
      }
    ]
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
        path: '/shortSpeak',
        component: '@/pages/shortSpeak',
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
    ],
  },
];

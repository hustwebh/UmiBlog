export default [
  {
    path: "/",
    component: "@/pages"
  },
  {
    path: "/",
    component: "@/layouts/BlogLayouts/index",
    routes: [
      {
        path: "/blog",
        component: "@/pages/blog",
      },
      {
        path: "/search",
        component: "@/pages/search",
      },
      {
        path: "/classes",
        component: "@/pages/classes",
      },
      {
        path:"/tags",
        component :"@/pages/tags",
      },
      {
        path: "/shortSpeak",
        component: "@/pages/shortSpeak",
      },
      {
        path: "/friends",
        component: "@/pages/friends",
      },
      {
        path: "/about",
        component: "@/pages/about",
      },
      
    ]
  }
];
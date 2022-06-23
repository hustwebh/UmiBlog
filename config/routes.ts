export default [
  {
    path: "/",
    component: "@/pages"
  },
  {
    path: "/blog",
    component: "@/layouts/BlogLayouts/index",
    routes: [
      {
        path: "/blog",
        component: "@/pages/blog",
      }
    ]
  }
];
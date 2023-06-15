import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    {
      path: "/",
      layout: "@/layouts",
      component: "index"
    },
  ],
  qiankun: {
    slave: {},
  },
  npmClient: 'yarn',
});

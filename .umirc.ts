import { defineConfig } from 'umi';
import { backstageUrl } from './config/const';
import RoutesConfig from './config/routes';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: RoutesConfig,
  fastRefresh: {},
  proxy: {
    api: {
      target: backstageUrl,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    },
  },
});

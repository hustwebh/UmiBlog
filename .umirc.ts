import { defineConfig } from 'umi';
import RoutesConfig from './config/routes'

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes:RoutesConfig,
  fastRefresh: {},
});

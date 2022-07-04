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
    '/api': {
      target: backstageUrl,
      changeOrigin: true,
      // pathRewrite: {
      //   '^/api': '',
      // },
    },
  },
  chainWebpack(config) {
    config.module // 配置 file-loader
      .rule('otf')
      .test(/.otf$/)
      .use('file-loader')
      .loader('file-loader');
  },
});

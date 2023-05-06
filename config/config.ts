import { defineConfig } from 'umi';
import { backstageUrl } from './const';
import RoutesConfig from './routes';

export default defineConfig({
  routes: RoutesConfig,
  fastRefresh: true,
  request: {},
  dva: {},
  monorepoRedirect: { peerDeps: true },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  proxy: {
    '/api': {
      target: backstageUrl,
      changeOrigin: true,
    },
  },
  // chainWebpack(config) {
  //   config.module // 配置 file-loader
  //     .rule('otf')
  //     .test(/.otf$/)
  //     .use('file-loader')
  //     .loader('file-loader');
  // },
});

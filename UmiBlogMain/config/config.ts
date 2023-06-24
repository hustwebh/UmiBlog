import { defineConfig } from 'umi'
import { backstageUrl } from './const'
import RoutesConfig from './routes'

export default defineConfig({
  routes: RoutesConfig,
  fastRefresh: true,
  request: {},
  dva: {},
  monorepoRedirect: { peerDeps: true },
  locale: {
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  proxy: {
    // '/api': {
    //   target: backstageUrl,
    //   changeOrigin: true,
    // },
    '/api': {
      'target': backstageUrl,
      'changeOrigin': true,
      'pathRewrite': { '^/api' : '' },
    }
  },
  qiankun:{
    master:{
      apps:[
        {
          name:'threeDimensional',
          entry:'//localhost:8001'
        },
        {
          name:'websiteAdmin',
          entry:'//localhost:8002'
        }
      ]
    }
  }
})

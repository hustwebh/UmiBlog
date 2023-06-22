import type { RequestConfig } from "@umijs/max"
import Cookies from 'js-cookie'
export const dva = {
  config: {
    onError(e: any) {
      e.preventDefault()
    }
  }
}

export const request: RequestConfig = {
  timeout: 1000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'token': Cookies.get('token') || ''
  },
  // other axios options you want
  errorConfig: {
    errorHandler() {
    },
    errorThrower() {
    }
  },
  requestInterceptors: [],
  responseInterceptors: []
};
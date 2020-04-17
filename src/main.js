// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Popup } from 'mint-ui'
import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = '/decision/'
axios.defaults.timeout = 15000
axios.defaults.headers.crossDomain = true
axios.defaults.withCredentials = true
axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'

const api = axios.create()

// 添加请求拦截
api.interceptors.request.use(function (config) {
  config.paramsSerializer = function (params) {
    let param = params || {}
    param.timestamp = (new Date()).getTime()
    param = qs.stringify(param, {arrayFormat: 'repeat'})
    return param
  }
  return config
}, function (error) {
  console.log(error)
  return Promise.reject(error)
})

// 添加响应拦截器
api.interceptors.response.use(function (response) {
  if (response.data.status === 4 || response.data.status === 5) {
    // router.push('/login')
  } else {
    return response.data
  }
}, function (error) {
  // base.toast('网络异常，请刷新重试')
  console.log(error)
  return Promise.reject(error.message)
})

Vue.component(Popup.name, Popup)

Vue.config.productionTip = false
Vue.prototype.$api = api

Vue.mixin({
  methods: {
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

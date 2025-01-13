import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
Vue.config.productionTip = false
//注入后，具体组件中即可直接使用this.$request()来发起网络请求。
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
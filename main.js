import Vue from 'vue'
import App from './App'
import uniRequest from 'uni-request'
// 引入vuex
import store from './store/index'

Vue.config.productionTip = false
Vue.prototype.$store = store

App.mpType = 'app'

uniRequest.defaults.baseURL = 'http://39.106.166.222:8080/phoneWeb'

const app = new Vue({
  ...App,
  store
})

app.$mount()

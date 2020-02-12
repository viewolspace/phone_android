import Vue from 'vue'
import App from './App'
import uniRequest from 'uni-request'

Vue.config.productionTip = false

App.mpType = 'app'

uniRequest.defaults.baseURL = 'http://39.106.166.222:8080/phoneWeb'

const app = new Vue({
  ...App
})

app.$mount()

import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import phone from './modules/phone'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    phone
  }
})
export default store

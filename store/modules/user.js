/**
 * user.js
 * @author Vivian
 * @version 1.0.0
 * copyright 2014-2019, gandxiaowei@gmail.com all rights reserved.
 */
import uniRequest from 'uni-request'

const state = {
  user: null,
  sessionId: null
}

const getters = {
  userId: state => (state.user ? state.user.userId : ''),
  isLogin: state => !!state.sessionId
}

const actions = {
  async getInformation ({ commit }, { phone, rand, idfa }) {
    const {
      data: { status, message, result, sessionId }
    } = await uniRequest.get('/user/login', {
      params: { phone, rand, idfa }
    })
    if (status === '0000') {
      commit('SET_SESSION_ID', sessionId)
      commit('SET_USER', result)
    }
    return { status, message }
  },

  async getToken () {
    const {
      data: { token, status }
    } = await uniRequest.get('/user/getToken', {
      params: {
        phone: this.phone
      }
    })

    if (status === '0000') {
      return token
    } else {
      return ''
    }
  },

  async getRand ({ commit }, { token, phone }) {
    const { data } = await uniRequest.get('/user/getRand', {
      params: { phone },
      headers: { token }
    })
    return data.message
  },

  async updateNickName ({ state, dispatch }, nickName) {
    const { data } = await uniRequest.post(
      '/user/updateNickName',
      {
        nickName
      },
      {
        headers: {
          userId: state.user.userId
        }
      }
    )
    // vue.set(state.user, 'nickName', nickName)
    dispatch('getUser')
    return data
  },

  async getUser ({ state, commit }) {
    const {
      data: { status, message, result, sessionId }
    } = await uniRequest.get('/user/getUser', {
      headers: { userId: state.user.userId }
    })
    if (status === '0000') {
      commit('SET_SESSION_ID', sessionId)
      commit('SET_USER', result)
    }
    return { status, message }
  },

  getLocalUser ({ commit }) {
    /*eslint-disable */
    uni.getStorage({
      key: 'session_id',
      success (e) {
        if (e.data) {
          commit('SET_SESSION_ID', e.data)
        }
      }
    })
    uni.getStorage({
      key: 'user',
      success (e) {
        if (e.data) {
          commit('SET_USER', e.data)
        }
      }
    })
  },

  setPolicyAgree ({ commit }, is_agree = true) {
    uni.setStorage({ key: 'policy', data: is_agree })
  },

  logout ({ commit }) {
    commit('SET_SESSION_ID', null)
    commit('SET_USER', null)
  }
}

const mutations = {
  SET_SESSION_ID (state, sessionId) {
    state.sessionId = sessionId
    /*eslint-disable */
    uni.setStorage({ key: 'session_id', data: sessionId })
  },

  SET_USER (state, user) {
    state.user = user
    /*eslint-disable */
    uni.setStorage({ key: 'user', data: user })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

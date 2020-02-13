/**
 * user.js
 * @author Vivian
 * @version 1.0.0
 * copyright 2014-2019, gandxiaowei@gmail.com all rights reserved.
 */
import uniRequest from 'uni-request'

const state = {
  user: {}
}

const getters = {}

const actions = {
  async getInformation ({ phone, rand, idfa }, { commit }) {
    const {
      data: { status, result, sessionId }
    } = await uniRequest.get('/user/login', {
      params: { phone, rand, idfa }
    })
    if (status === '0000') {
      commit('SET_SESSION_ID', sessionId)
      commit('SET_USER', result)
    }
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

  async getRand (token) {
    const {
      data: { message }
    } = await uniRequest.get('/user/getRand', {
      params: { phone: this.phone },
      headers: { token }
    })
    return message
  }
}

const mutations = {
  SET_SESSION_ID (state, sessionId) {
    state.sessionId = sessionId
    /*eslint-disable */
    plus.storage.setItem('session_id', sessionId)
  },

  SET_USER (state, user) {
    state.user = user
    /*eslint-disable */
    plus.storage.setItem('user', user)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

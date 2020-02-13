/**
 * user.js
 * @author Vivian
 * @version 1.0.0
 * copyright 2014-2019, gandxiaowei@gmail.com all rights reserved.
 */
import uniRequest from 'uni-request'

const state = {}

const getters = {}

const actions = {
  // 获取云通讯录,空表示还没有上传数据
  async getUserPhone (userId) {
    const { data } = await uniRequest.get('/userPhone/getUserPhone', {
      params: { userId }
    })
    return data
  },
  // 获取云通讯录
  async getUserPhoneList ({ userId, maxId, pageSize }) {
    const { data } = await uniRequest.get('/userPhone/listUserPhone', {
      params: { userId, maxId, pageSize }
    })
    return data
  },
  // 上传通讯录
  async uploadPhoneAddress ({ address, userId }) {
    const { data } = await uniRequest.post('/userPhone/uploadPhoneAddress', {
      data: { address, userId }
    })
    return data
  }
}

const mutations = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

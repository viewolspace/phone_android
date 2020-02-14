/**
 * user.js
 * @author Vivian
 * @version 1.0.0
 * copyright 2014-2019, gandxiaowei@gmail.com all rights reserved.
 */
import uniRequest from 'uni-request'
import pinyin from '../../tools/pinyin.js'

const state = {
  timeline: [],
  contacts: [],
  letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('')
}

const getters = {
  contactsWithLetter: ({ contacts, letters }) => {
    const result = {}
    for (const letter of letters) {
      result[letter] = []
    }
    contacts.forEach(contact => {
      let letter = pinyin.getCamelChars(contact.displayName[0])
      if (this.letters.indexOf(letter) === -1) letter = '#'
      result[letter].push(contact)
    })
    return result
  }
}

const actions = {
  // 获取云通讯录,空表示还没有上传数据
  async getUserPhone ({ commit }, userId) {
    const { data } = await uniRequest.get('/userPhone/getUserPhone', {
      params: { userId }
    })
    return data
  },
  // 获取云通讯录
  async getUserPhoneList ({ commit }, { userId, maxId, pageSize }) {
    const { data } = await uniRequest.get('/userPhone/listUserPhone', {
      params: { userId, maxId, pageSize }
    })
    if (data.status === '0000') {
      commit('SET_TIMELINE', data.result)
    }
    return data
  },
  // 上传通讯录
  async uploadPhoneAddress ({ commit }, { address, userId }) {
    const { data } = await uniRequest.post('/userPhone/uploadPhoneAddress', {
      address,
      userId
    })
    return data
  },

  getLocalContacts ({ commit }) {
    // #ifdef APP-PLUS
    /*eslint-disable */
    plus.contacts.getAddressBook(
      plus.contacts.ADDRESSBOOK_PHONE,
      addressbook => {
        addressbook.find(
          ['displayName', 'phoneNumbers'],
          contacts => {
            commit('SET_LOCAL_CONTACTS', contacts)
          },
          () => {},
          { multiple: true }
        )
      },
      e => {}
    )
    // #endif
  }
}

const mutations = {
  SET_TIMELINE (state, timeline) {
    state.timeline = state.timeline.concat(timeline)
  },
  SET_LOCAL_CONTACTS (state, contacts) {
    state.contacts = contacts
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

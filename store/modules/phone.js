/**
 * user.js
 * @author Vivian
 * @version 1.0.0
 * copyright 2014-2019, gandxiaowei@gmail.com all rights reserved.
 */
import uniRequest from 'uni-request'
import pinyin from '../../tools/pinyin.js'

const state = {
  lastest: [],
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
  async getUserPhone ({ state }, userId) {
    const { data } = await uniRequest.get('/userPhone/getUserPhone', {
      headers: { userId }
    })
    console.log(data)
    const { status, message, result } = data
    console.log(status === '0000')
    if (status === '0000') {
      state.lastest = JSON.parse(result.content)
      return { status, message }
    }
  },
  // 获取云通讯录
  async getUserPhoneList ({ commit }, { userId, maxId, pageSize }) {
    const {
      data: { status, message, result }
    } = await uniRequest.get('/userPhone/listUserPhone', {
      params: { maxId, pageSize },
      headers: { userId }
    })
    if (status === '0000') {
      console.log('获取通讯录成功')
      result.forEach((item, index) => {
        item.contacts = JSON.parse(item.content)
      })
      result.forEach((item, index) => {
        if (index !== result.length - 1) {
          item.increase =
            item.contacts.length - result[index + 1].contacts.length
        } else {
          item.increase = item.contacts.length
        }
        console.log(item.increase)
      })
      console.log(result)
      commit('SET_TIMELINE', result)
    }
    return { status, message }
  },
  // 上传通讯录
  async uploadPhoneAddress ({ state }, userId) {
    console.log('userId: ', userId)
    const { data } = await uniRequest.post(
      '/userPhone/uploadPhoneAddress',
      {
        address: JSON.stringify(state.contacts)
      },
      {
        headers: {
          userId
        }
      }
    )
    return data
  },

  getLocalContacts ({ commit }) {
    // #ifdef APP-PLUS
    /*eslint-disable */
    plus.contacts.getAddressBook(
      plus.contacts.ADDRESSBOOK_PHONE,
      addressbook => {
        addressbook.find(
          ['name', 'phoneNumbers'],
          contacts => {
            console.log(JSON.stringify(contacts))
            console.log('获取本地联系人:' + contacts.length)
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
    // state.timeline = state.timeline.concat(timeline)
    state.timeline = timeline
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

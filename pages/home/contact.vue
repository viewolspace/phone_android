<template>
  <view class="content d-flex flex-column ">
    <view class="d-flex title align-items-center">
      <view class="left d-flex align-items-center">
        <image class="back" src="../../static/img/icon_back.png"></image>
      </view>
      <view class="flex-grow-1 flex-shrink-1">&nbsp;</view>
      <view class="right text-right" @click="showPopup('confirm')">删除</view>
    </view>
    <view class="select-all ">
      <checkbox-group @change="handleCheckAllChange">
        <view class="d-flex align-items-center">
          <checkbox value="all" :checked="all" />
          <view style="margin-left:20upx;">
            全选
          </view>
        </view>
      </checkbox-group>
    </view>
    <view class="contract-container">
      <scroll-view
        class="contracts"
        :scroll-y="true"
        v-if="Object.keys(contactsWithLetter).length"
        :scroll-into-view="indexLetter"
      >
        <checkbox-group @change="handleCheckChange">
          <view
            class="contact-group"
            v-for="letter in letters"
            :key="letter"
            :id="letter"
          >
            <view
              v-if="contactsWithLetter[letter].length"
              :ref="'indexed-list-' + letter"
            >
              <view class="letter">
                {{ letter }}
              </view>
              <view
                v-for="contact in contactsWithLetter[letter]"
                :key="contact.id"
              >
                <view class="information d-flex align-items-center">
                  <view>
                    <checkbox :value="contact.id" :checked="contact.checked" />
                  </view>
                  <view class="d-flex align-items-center">
                    <image
                      class="icon"
                      src="../../static/img/home/icon_default.png"
                    />
                  </view>
                  <view class="ml-2 d-flex flex-column justify-content-center">
                    <view class="name">
                      {{
                        contact.displayName ||
                          contact.phoneNumbers[0]['value'] ||
                          '无信息'
                      }}
                    </view>
                    <view class="count text-left">
                      <text>{{ contact.phoneNumbers.length }} </text>个号码
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </checkbox-group>
      </scroll-view>
    </view>

    <view
      id="list_bar"
      class="indexed-list-bar d-flex flex-column"
      @touchmove.stop.prevent="touchmove"
      @click="touchmove"
    >
      <text
        class="flex-grow-1 flex-shrink-1 letter d-flex align-items-center"
        v-for="letter in letters"
        :key="letter"
      >
        {{ letter }}
      </text>
    </view>
    <uni-popup ref="show-confirm" :mask-click="false">
      <view class="uni-tip">
        <text class="uni-tip-title">警告</text>
        <view class="uni-tip-content text-center">
          确定删除已选择的联系人
        </view>
        <view class="uni-tip-group-button">
          <view class="uni-tip-button" @click="closePopup('confirm')">
            取消
          </view>
          <view class="uni-tip-button confirm" @click="removeSelected()">
            确定
          </view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import { uniPopup } from '@dcloudio/uni-ui'
export default {
  components: {
    uniPopup
  },
  data () {
    return {
      indexLetter: 'A',
      listBounding: {},
      itemHeight: 0,
      contacts: {},
      all: false
    }
  },
  computed: {
    ...mapState('phone', ['letters']),
    ...mapGetters('phone', ['contactsWithLetter'])
  },
  onLoad () {
    this.getLocalContacts()
    // #ifdef H5
    uni.showToast({
      icon: 'none',
      title: '无法获取通讯录',
      duration: 2000
    })
    // #endif
  },
  onReady () {
    uni
      .createSelectorQuery()
      .in(this)
      .select('#list_bar')
      .boundingClientRect()
      .exec(ret => {
        this.listBounding = ret[0]
        this.itemHeight = ret[0]['height'] / this.letters.length
      })
  },
  methods: {
    ...mapActions({
      getLocalContacts: 'phone/getLocalContacts'
    }),
    showPopup (type) {
      this.$refs[`show-${type}`].open()
    },
    closePopup (type) {
      this.$refs[`show-${type}`].close()
    },
    handleCheckAllChange (e) {
      for (const letter of this.letters) {
        let temp = this.contactsWithLetter[letter]
        for (let i = 0; i < temp.length; i++) {
          this.$set(temp[i], 'checked', e.detail.value.length === 1)
        }
      }
    },
    handleCheckChange (e) {
      let isAll = true
      const selected = e.detail.value
      for (const letter of this.letters) {
        let temp = this.contactsWithLetter[letter]
        for (let i = 0; i < temp.length; i++) {
          const isSelect = selected.indexOf(temp[i]['id']) !== -1
          isAll = isAll && isSelect
          this.$set(temp[i], 'checked', isSelect)
        }
      }
      this.all = isAll
    },
    removeSelected () {
      let selected = []
      for (const letter of this.letters) {
        let temp = this.contactsWithLetter[letter]
        for (let i = 0; i < temp.length; i++) {
          if (temp[i]['checked']) {
            selected.push({ logic: 'or', field: 'id', value: temp[i]['id'] })
          }
        }
      }

      // #ifdef APP-PLUS
      plus.contacts.getAddressBook(
        plus.contacts.ADDRESSBOOK_PHONE,
        addressbook => {
          addressbook.find(
            [],
            contacts => {
              console.log('contacts: ', contacts)
              for (let i = 0; i < contacts.length; i++) {
                contacts[i].remove()
              }
              this.closePopup('confirm')
              this.getLocalContacts()
            },
            () => {
              this.showFailed()
            },
            { filter: selected }
          )
        },
        e => {
          this.showFailed()
        }
      )
      // #endif
    },
    showFailed () {
      uni.showToast({
        icon: 'none',
        title: '删除失败',
        duration: 2000
      })
    },
    touchmove (event) {
      let pageY = event.touches[0].pageY
      let index = Math.floor(
        (pageY - this.listBounding['top']) / this.itemHeight
      )
      this.indexLetter = this.letters[index]
    }
  }
}
</script>

<style lang="scss">
uni-checkbox {
  display: flex;
  align-items: center;

  /deep/ .uni-checkbox-input {
    border-radius: 100% !important;

    &::before {
      color: #2bb9c1;
    }
  }
}

.content {
  display: flex;
  flex-direction: column;
  background: white;
  height: 100%;

  .title {
    width: 100%;
    padding: 40upx 25upx 25upx;
    color: white;
    font-size: 32upx;
    background: linear-gradient(
      90deg,
      rgba(36, 159, 219, 1),
      rgba(49, 210, 168, 1)
    );

    .back {
      width: 23upx;
      height: 41upx;
    }
  }

  .select-all {
    padding: 20upx 28upx 20upx;
  }
  .contract-container {
    flex: 1;
    .contracts {
      height: 100%;
    }
  }
  .contact-group {
    .letter {
      padding: 12upx 28upx;
      font-size: 26upx;
      font-weight: 400;
      color: #838383;
      background: #f7f4f8;
    }

    .information {
      padding: 17upx 28upx;

      .icon {
        width: 75upx;
        height: 75upx;
      }

      .name {
        font-size: 32upx;
        font-weight: 400;
        color: #282828;
      }

      .count {
        font-size: 22upx;
        font-weight: 400;
        color: #c5c5c5;
      }
    }
  }

  .indexed-list-bar {
    position: fixed;
    font-size: 24upx;
    font-weight: 400;
    color: #838383;
    right: 0;
    top: 118upx;
    bottom: 28upx;

    .letter {
      padding: 0 20upx;
    }
  }
}
</style>

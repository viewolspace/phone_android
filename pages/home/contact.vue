<template>
  <view class="content">
    <view class="d-flex title align-items-center">
      <view class="left d-flex align-items-center">
        <image class="back" src="../../static/img/icon_back.png"></image>
      </view>
      <view class="flex-grow-1 flex-shrink-1">&nbsp;</view>
      <view class="right text-right">删除</view>
    </view>
    <view class="select-all">
      <view>
        全选
      </view>
    </view>
    <scroll-view v-if="Object.keys(contactsWithLetter).length">
      <view class="contact-group" v-for="letter in letters" :key="letter">
        <view v-if="contactsWithLetter[letter].length">
          <view class="letter">
            {{ letter }}
          </view>
          <view v-for="contact in contactsWithLetter[letter]" :key="contact.id">
            <view class="information d-flex align-items-center">
              <view></view>
              <view class="d-flex align-items-center">
                <image
                  class="icon"
                  src="../../static/img/home/icon_default.png"
                />
              </view>
              <view
                class="ml-2 d-flex flex-column align-items-center justify-content-center"
              >
                <view class="name">{{ contact.displayName }}</view>
                <view class="count">
                  <text> {{ contact.phoneNumbers.length }} </text>个号码
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
    <view class="indexed-list-bar d-flex flex-column">
      <text
        class="flex-grow-1 flex-shrink-1 letter"
        v-for="letter in letters"
        :key="letter"
        >{{ letter }}</text
      >
    </view>
  </view>
</template>

<script>
import { mapState, mapGetter, mapActions } from 'vuex'

export default {
  data () {
    return {
      contacts: {}
    }
  },
  computed: {
    ...mapState('phone', ['letters']),
    ...mapGetter('phone', ['contactsWithLetter'])
  },
  onLoad () {
    // #ifdef H5
    uni.showToast({
      icon: 'none',
      title: '无法获取通讯录',
      duration: 2000
    })
    // #endif
  },
  methods: {
    ...mapActions({
      getLocalContacts: 'phone/getLocalContacts'
    })
  }
}
</script>

<style lang="scss">
.content {
  background: white;
  .title {
    position: fixed;
    z-index: 9999;
    width: 100%;
    top: 0;
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
    margin-top: 90upx;
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
      padding: 0 13upx;
    }
  }
}
</style>

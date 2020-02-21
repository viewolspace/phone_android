<template>
  <view class="content d-flex flex-column">
    <view class="account">
      <view class="title">联系人管理</view>
      <view class="d-flex align-items-center">
        <view @click="toMe()">
          <image
            class="icon-account"
            mode="aspectFit"
            src="../../static/img/home/icon_account.png"
          ></image>
        </view>
        <view class="flex-grow-1 flex-shrink-1 information">
          <view class="d-flex align-items-center">
            <view class="detail flex-grow-1 flex-shrink-1">
              <text v-if="user">账号:{{ user.phone }}</text>
              <text v-else>未登录</text>
            </view>
            <view v-if="isLogin">
              <view class="logout" @click="logout()">注销</view>
            </view>
          </view>
          <view>
            <view class="backup">备份通讯录</view>
          </view>
        </view>
      </view>
      <view class="d-flex align-items-center count">
        <view class="d-flex align-items-center">
          <image
            class="icon-local-count"
            src="../../static/img/home/icon_local.png"
          ></image>
        </view>
        <view class="flex-grow-1 flex-shrink-1" @click="toURL('contact')">
          本地通讯录 {{ contacts.length }} 人
        </view>
        <view class="d-flex align-items-center">
          <image
            class="icon-remote-count"
            src="../../static/img/home/icon_remote.png"
          ></image>
        </view>
        <view class="flex-grow-1 flex-shrink-1" @click="toTimeline()">
          网络通讯录 {{ lastest.length }} 人
        </view>
      </view>
    </view>
    <view class="operation-container flex-grow-1 flex-shrink-1">
      <button class="operation upload" @click="upload" :disabled="uploading">
        {{ uploading ? '上传中...' : '上传通讯录' }}
      </button>
      <button
        class="operation download"
        @click="toTimeline()"
        :disabled="uploading"
      >
        下载通讯录
      </button>
    </view>
    <uni-popup ref="show-policy-agreement" :mask-click="false">
      <view class="uni-tip">
        <text class="uni-tip-title">木瓜通讯助手隐私政策</text>
        <view class="uni-tip-content policy">
          欢迎使用“木瓜通讯助手”! 我们非常 重视您的个人信息和隐私保护。在您
          使用“木瓜通讯助手”服务之前，请仔 细阅读《木瓜通讯助手隐私政策》，
          我们将严格按照您同意的各项条款使 用您的个人信息，以便为您提供更好
          的服务。
          <view class="tip">
            如您同意此政策，请点击“同意”并开始使用我们的产品和服务，我们尽全力保
            护您的个人信息安全。
          </view>
        </view>
        <view class="uni-tip-group-button">
          <view class="uni-tip-button" @click="disagreePolicy()">
            不同意
          </view>
          <view class="uni-tip-button confirm" @click="agreePolicy()">
            同意
          </view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import { uniList, uniListItem, uniPopup } from '@dcloudio/uni-ui'
import { mapState, mapGetters, mapActions } from 'vuex'
// import permision from '@/js_sdk/wa-permission/permission.js'

export default {
  components: { uniPopup },
  data () {
    return {
      uploading: false,
      downloading: false
    }
  },
  computed: {
    ...mapState('user', ['user']),
    ...mapGetters('user', ['isLogin']),
    ...mapState('phone', ['contacts', 'lastest'])
  },
  onReady () {
    if (!uni.getStorageSync('policy')) {
      this.showPopup('policy-agreement')
    } else {
      this.getUserPhone(this.user.userId)
      this.getLocalContacts()
    }
  },
  methods: {
    ...mapActions({
      logout: 'user/logout',
      setPolicyAgree: 'user/setPolicyAgree',
      getLocalContacts: 'phone/getLocalContacts',
      getUserPhone: 'phone/getUserPhone',
      uploadPhoneAddress: 'phone/uploadPhoneAddress'
    }),
    showPopup (type) {
      this.$refs[`show-${type}`].open()
    },
    closePopup (type) {
      this.$refs[`show-${type}`].close()
    },
    agreePolicy () {
      // await permision.requestAndroidPermission(android.permission.READ_CONTACTS)
      // await permision.requestAndroidPermission(android.permission.WRITE_CONTACTS)
      this.setPolicyAgree()
      this.getLocalContacts()
      this.closePopup('policy-agreement')
    },
    disagreePolicy () {
      // #ifdef APP-PLUS
      plus.runtime.quit()
      // #endif
      this.closePopup('policy-agreement')
    },
    async upload () {
      if (!this.isLogin) {
        uni.showToast({
          title: '请先登录',
          icon: 'none',
          duration: 2000,
          mask: true
        })
        return uni.switchTab({ url: '/pages/me/index' })
      }
      try {
        this.uploading = true
        const { status, message } = await this.uploadPhoneAddress(
          this.user.userId
        )
        uni.showToast({
          icon: status === '0000' ? 'success' : 'none',
          title: message,
          duration: 2000
        })
      } catch (e) {
        uni.showToast({
          icon: 'none',
          title: '上传失败',
          duration: 2000
        })
      } finally {
        this.uploading = false
      }
    },
    toMe () {
      uni.switchTab({ url: '/pages/me/index' })
    },
    toTimeline () {
      if (!this.isLogin) {
        uni.showToast({
          title: '请先登录',
          icon: 'none',
          duration: 2000,
          mask: true
        })
        return uni.switchTab({ url: '/pages/me/index' })
      }
      this.toURL('timeline')
    },
    toURL (type) {
      uni.navigateTo({
        url: `/pages/home/${type}`
      })
    }
  }
}
</script>

<style lang="scss">
.content {
  height: 100%;
  .account {
    background: linear-gradient(
      90deg,
      rgba(36, 159, 219, 1),
      rgba(49, 210, 168, 1)
    );
    padding: 28upx;
    color: #ffffff;

    .title {
      padding: 20upx 0 28upx;
      font-size: 32upx;
    }

    .icon-account {
      width: 142upx;
      height: 142upx;
    }

    .information {
      margin-left: 39upx;
      .detail {
        font-size: 28upx;
        background: transparent;
      }

      .logout {
        border-radius: 38upx;
        font-size: 24upx;
        color: #2bb9c1;
        padding: 5upx 20upx;
        background: white;
      }

      .backup {
        margin-top: 15upx;
        font-size: 36upx;
        font-weight: 500;
        background: transparent;
      }
    }
  }
  .count {
    margin-top: 20upx;
    font-size: 28upx;

    .icon-local-count {
      width: 19upx;
      height: 26upx;
      margin-right: 26upx;
    }

    .icon-remote-count {
      width: 27upx;
      height: 23upx;
      margin-right: 26upx;
    }
  }

  .operation-container {
    padding: 0 29upx;
    background: #f6f6f6;
    .operation {
      margin-top: 26upx;
      color: #2bb9c1;
      font-size: 32upx;
      background: #ffffff;
      box-shadow: 0px 1px 2px 0px rgba(194, 194, 194, 0.4);
      border-radius: 44upx;
      border: 0;
      position: relative;

      &::before {
        content: '';
        background-size: 50upx 39upx;
        position: absolute;
        left: 28%;
        top: 20upx;
        display: inline-block;
        width: 50upx;
        height: 39upx;
      }

      &.upload::before {
        background-image: url(../../static/img/home/icon_upload.png);
      }

      &.download::before {
        background-image: url(../../static/img/home/icon_download.png);
      }

      &::after {
        border: none;
      }

      &.button-hover {
        background: #ffffff;
      }
    }
  }
}
</style>

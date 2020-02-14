<template>
  <view class="content">
    <view class="account" @click="login">
      <view class="text-center">
        <image class="icon" src="../../static/img/me/icon_account.png"></image>
      </view>
      <view>
        <view class="login text-center"
          ><text>{{ user ? user.nickName : '点击登录' }}</text>
        </view>
      </view>
    </view>
    <view>
      <uni-list class="item">
        <uni-list-item class="item-container" @click="showModifyNickname()">
          <view class="name">修改昵称</view>
        </uni-list-item>
      </uni-list>
      <uni-list class="item">
        <uni-list-item class="item-container" @click="showPopup('policy')">
          <view class="name">隐私协议</view>
        </uni-list-item>
        <uni-list-item class="item-container" @click="showPopup('undo')">
          <view class="name">撤销同意隐私协议</view>
        </uni-list-item>
      </uni-list>
      <!-- <uni-list class="item">
        <uni-list-item>
          <view class="name">注销账户</view>
        </uni-list-item>
      </uni-list> -->
      <uni-list class="logout">
        <uni-list-item
          class="item-container"
          :show-arrow="false"
          v-if="user"
          @click="logout"
        >
          <view class="name">注销账户</view>
        </uni-list-item>
      </uni-list>
    </view>
    <uni-popup ref="show-nickname" :mask-click="false">
      <view class="uni-tip">
        <text class="uni-tip-title">修改昵称</text>
        <view class="uni-tip-content new-nickname-container">
          <input type="text" class="new-nickname" v-model="nickname" />
        </view>
        <view class="uni-tip-group-button">
          <view class="uni-tip-button" @click="closePopup('nickname')">
            取消
          </view>
          <view class="uni-tip-button confirm" @click="modifyNickName()">
            确定
          </view>
        </view>
      </view>
    </uni-popup>
    <uni-popup ref="show-policy" :mask-click="false">
      <view class="uni-tip">
        <text class="uni-tip-title">木瓜通讯助手隐私政策</text>
        <view class="uni-tip-content policy">
          欢迎使用“木瓜通讯助手”! 我们非常 重视您的个人信息和隐私保护。在您
          使用“木瓜通讯助手”服务之前，请仔 细阅读《木瓜通讯助手隐私政策》，
          我们将严格按照您同意的各项条款使 用您的个人信息，以便为您提供更好
          的服务。
          <view class="tip">
            如您同意此政策，请点击“同意”并开始
            使用我们的产品和服务，我们尽全力保 护您的个人信息安全。
          </view>
        </view>
        <view class="uni-tip-group-button">
          <view class="uni-tip-button confirm" @click="closePopup('policy')">
            确定
          </view>
        </view>
      </view>
    </uni-popup>
    <uni-popup ref="show-undo" :mask-click="false">
      <view class="uni-tip">
        <text class="uni-tip-title">撤销隐私协议</text>
        <view class="uni-tip-content text-center">
          确定撤销隐私协议？
        </view>
        <view class="uni-tip-group-button">
          <view class="uni-tip-button" @click="closePopup('undo')">
            取消
          </view>
          <view class="uni-tip-button confirm" @click="undoPolicyAgree()">
            确定
          </view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import { uniList, uniListItem, uniPopup } from '@dcloudio/uni-ui'
import { mapState, mapActions } from 'vuex'
export default {
  components: { uniList, uniListItem, uniPopup },
  data () {
    return {
      nickname: ''
    }
  },
  computed: {
    ...mapState('user', ['user'])
  },

  onShow () {},

  methods: {
    ...mapActions({
      updateNickName: 'user/updateNickName',
      setPolicyAgree: 'user/setPolicyAgree',
      logout: 'user/logout'
    }),
    login () {
      if (!this.user) {
        uni.redirectTo({
          url: '/pages/login/index'
        })
      }
    },
    showModifyNickname () {
      this.nickname = this.user.nickName
      this.showPopup('nickname')
    },
    showPopup (type) {
      this.$refs[`show-${type}`].open()
    },
    closePopup (type) {
      this.$refs[`show-${type}`].close()
    },
    undoPolicyAgree () {
      this.setPolicyAgree(false)
      this.closePopup('undo')
    },
    async modifyNickName () {
      try {
        const { status, message } = await this.updateNickName(this.nickname)
        uni.showToast({
          title: message,
          duration: 2000
        })
        if (status === '0000') {
          this.$nextTick(() => {
            this.closePopup('nickname')
          })
        }
      } catch (e) {}
    }
  }
}
</script>

<style lang="scss">
.item-container {
  padding: 0 30upx;
  /deep/ .uni-list-item__container {
    padding-right: 0;
  }
}

.content {
  .account {
    background: linear-gradient(
      90deg,
      rgba(36, 159, 219, 1),
      rgba(49, 210, 168, 1)
    );
    padding: 114upx 0 49upx 0;
    .icon {
      width: 182upx;
      height: 182upx;
    }

    .login {
      margin-top: 26upx;
      font-size: 32upx;
      color: #ffffff;
    }
  }

  .item {
    margin-top: 20upx;

    .name {
      color: #241d1d;
      font-size: 32upx;
    }
  }

  .logout {
    margin-top: 63upx;

    .name {
      color: #ec4242;
      text-align: center;
      font-size: 32upx;
    }
  }
  .new-nickname-container {
    margin-top: 20upx;
    padding: 10upx;
    background: #f6f6f6;
    .new-nickname {
      background: #f6f6f6;
      text-align: center;
    }
  }

  .policy {
    line-height: 1.5;
    .tip {
      margin-top: 36upx;
      color: #c5c5c5;
    }
  }
}
</style>

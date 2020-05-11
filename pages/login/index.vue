<template>
  <view class="content">
    <view class="title-container">
      <view class="title">
        <navigator url="/pages/me/index" open-type="switchTab">
          <img class="close" src="../../static/img/icon_close.png" alt="" />
        </navigator>
        <view class="label">登录</view>
      </view>
    </view>
    <view class="login-form">
      <view class="phone-container">
        <input
          class="phone"
          v-model="phone"
          type="text"
          placeholder="请输入手机号"
        />
      </view>
      <view class="verification">
        <input
          class="code"
          v-model="rand"
          type="number"
          max-length="6"
          placeholder="请输入验证码"
        />
        <button class="verificate" :disabled="!phone" @click="getVerification">
          获取验证码
        </button>
      </view>
      <view>
        <button class="login" :disabled="!phone || !rand" @click="login">
          登录
        </button>
      </view>
      <view class="agreement">
        <label>
          <checkbox class="check" value="cb" checked="true" color="#2BB9C1" />
          同意
        </label>
        <text @click="toServiceWeb()">《服务协议》</text>
        和<text @click="toPrivacyWeb()"> 《隐私协议》</text>
      </view>
    </view>
  </view>
</template>

<script>
import { mapActions } from 'vuex'
import uniRequest from 'uni-request'
import { uniPopup } from '@dcloudio/uni-ui'

export default {
  data () {
    return {
      phone: '',
      rand: ''
    }
  },

  methods: {
    ...mapActions({
      getToken: 'user/getToken',
      getInformation: 'user/getInformation',
      getRand: 'user/getRand'
    }),
    async getVerification () {
      if (!this.phone) {
        return uni.showToast({
          title: '手机号码不能为空',
          icon: 'none',
          duration: 2000
        })
      }
      try {
        const token = await this.getToken(this.phone)
        const { message, status } = await this.getRand({
          token,
          phone: this.phone
        })
        uni.showToast({
          title: message,
          icon: status === '0000' ? 'success' : 'none',
          duration: 2000
        })
      } catch (e) {}
    },

    async login () {
      const { phone, rand } = this
      if (!phone) {
        return uni.showToast({
          title: '手机号码不能为空',
          icon: 'none',
          duration: 2000
        })
      }
      if (!rand) {
        return uni.showToast({
          title: '验证码1不能为空',
          icon: 'none',
          duration: 2000
        })
      }

      const { status, message } = await this.getInformation({
        phone,
        idfa: plus ? plus.device.imei : (Math.random() * 100).toFixed(0),
        rand
      })
      if (status === '0000') {
        uni.switchTab({
          url: '/pages/home/index'
        })
      } else {
        uni.showToast({
          icon: 'none',
          title: message,
          duration: 2000
        })
      }
    },

    toServiceWeb () {
      uni.navigateTo({
        url: '/pages/tools/web?url=http://www.chengheed.com/xy/nmdh_fwxy.htm'
      })
    },

    toPrivacyWeb () {
      uni.navigateTo({
        url: '/pages/tools/web?url=http://www.chengheed.com/xy/nmdh_ysxy.htm'
      })
    }
  }
}
</script>

<style lang="scss">
.content {
  height: 100%;
  position: relative;

  .title-container {
    background: linear-gradient(
      90deg,
      rgba(36, 159, 219, 1),
      rgba(49, 210, 168, 1)
    );
    .title {
      height: 457upx;
      position: relative;
      .close {
        width: 36upx;
        height: 36upx;
        position: absolute;
        right: 27upx;
        top: 75upx;
      }
      .label {
        position: absolute;
        bottom: 194upx;
        left: 64upx;
        font-size: 48upx;
        font-weight: 500;
        color: #ffffff;
      }
    }
  }

  .login-form {
    background: #ffffff;
    margin: -140upx 28upx 0;
    padding: 61upx;
    border-radius: 10upx;
    box-shadow: 2px 2px 10px 0px #e2e2e2;

    .phone-container {
      padding: 38upx 0;
      border-bottom: 1px solid #f6f6f6;

      .phone {
        font-size: 32upx;
      }
    }
    .verification {
      padding: 38upx 0;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #f6f6f6;
      .code {
        flex: 1;
        font-size: 32upx;
      }

      .verificate {
        border: none;
        background: transparent;
        color: #2bb9c1;
        font-size: 30upx;

        &[disabled] {
          color: #c2c2c2;
        }

        &::after {
          height: 0;
          width: 0;
          border: 0;
        }
      }
    }

    .login {
      margin-top: 140upx;
      color: #ffffff;
      background: #2bb9c1;
      border-radius: 44upx;
      font-size: 36upx;
      &[disabled] {
        background: #c2c2c2;
      }

      &::after {
        border: none;
      }
    }

    .agreement {
      text-align: center;
      margin-top: 110upx;
      color: #b2b2b2;
      font-size: 24upx;

      /deep/ .uni-checkbox-input {
        border-radius: 0;
        border-color: #2bb9c1;
      }
    }
  }
}
</style>

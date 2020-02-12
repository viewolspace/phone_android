<template>
  <view class="content">
    <view class="text-center title">手机号码查询</view>
    <view class="text-center">
      <image
        class="icon-phone"
        src="../../static/img/tools/icon_phone.png"
      ></image>
    </view>
    <view class="keywords">
      <input
        class="phone-input"
        v-model="phone_number"
        placeholder-style="color:#838383"
        confirm-type="search"
        type="number"
        placeholder="请输入电话号码"
      />
    </view>
    <view class="query-container">
      <button class="query" :disabled="!phone_number" @click="getPhoneLocation">
        查询
      </button>
    </view>
    <view class="result text-center" v-if="location">
      <view>手机号码"{{ result_phone }}" </view>
      <view>{{ location }}</view>
    </view>
  </view>
</template>

<script>
import uniRequest from 'uni-request'

export default {
  data () {
    return {
      phone_number: '',
      result_phone: '',
      location: ''
    }
  },
  methods: {
    async getPhoneLocation () {
      const {
        data: { message, status }
      } = await uniRequest.get('/tool/phoneSelect', {
        params: { phone: this.phone_number }
      })

      if (status === '0000') {
        this.result_phone = this.phone_number
        this.location = message
      } else {
        uni.showToast({
          icon: 'none',
          title: message,
          duration: 2000
        })
      }
    }
  }
}
</script>

<style lang="scss">
.content {
  height: 100%;
  padding: 0 28upx;
  background: #f6f6f6;

  .title {
    margin: 0 -28upx;
    padding: 25upx;
    color: white;
    font-size: 38upx;
    background: linear-gradient(
      90deg,
      rgba(36, 159, 219, 1),
      rgba(49, 210, 168, 1)
    );
  }

  .icon-phone {
    margin: 56upx 0 47upx;
    width: 68upx;
    height: 104upx;
  }

  .keywords {
    padding: 20upx 0;

    background: #ffffff;
    .phone-input {
      color: #282828;
      line-height: 80upx;
      font-size: 32upx;
      text-align: center;
    }
  }
  .query-container {
    margin-top: 82upx;

    .query {
      background: #2bb9c1;
      border-radius: 46upx;
      color: #ffffff;
      font-size: 32upx;
    }
  }

  .result {
    font-weight: 500;
    margin-top: 90upx;
    font-size: 38upx;
    color: #282828;
  }
}
</style>

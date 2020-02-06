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
        class="input"
        v-model="phone_number"
        placeholder-style="color:#838383"
        confirm-type="search"
        type="number"
        placeholder="请输入电话号码"
      />
    </view>
    <view class="query-container">
      <button class="query">查询</button>
    </view>
    <view class="result text-center">
      <view>手机号码"{{ phone_number }}" </view>
      <view>北京中国移动</view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      phone_number: '13816212176'
    }
  }
}
</script>

<style lang="scss">
.content {
  height: 100%;
  background: #f6f6f6;

  .title {
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
    padding: 0 28upx;
    .input {
      background: #ffffff;
      color: #282828;
      padding: 40upx 0;
      font-size: 32upx;
      color: #282828;
      text-align: center;
    }
  }
  .query-container {
    margin-top: 82upx;
    padding: 0 28upx;
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

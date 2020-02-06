<template>
  <view class="content">
    <view class="account">
      <view class="text-center">
        <image class="icon" src="../../static/img/me/icon_account.png"></image>
      </view>
      <view>
        <view class="login text-center"><text>点击登录</text> </view>
      </view>
    </view>
    <view>
      <uni-list class="item">
        <uni-list-item>
          <view class="name">修改昵称</view>
        </uni-list-item>
      </uni-list>
      <uni-list class="item">
        <uni-list-item>
          <view class="name">隐私协议</view>
        </uni-list-item>
        <uni-list-item>
          <view class="name">撤销同意隐私协议</view>
        </uni-list-item>
      </uni-list>
      <uni-list class="item">
        <uni-list-item>
          <view class="name">注销账户</view>
        </uni-list-item>
      </uni-list>
      <uni-list class="loginout">
        <uni-list-item :show-arrow="false">
          <view class="name">注销账户</view>
        </uni-list-item>
      </uni-list>
    </view>
  </view>
</template>

<script>
import { uniList, uniListItem } from '@dcloudio/uni-ui'

export default {
  components: { uniList, uniListItem },
  data () {
    return {}
  }
}
</script>

<style lang="scss">
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

  .loginout {
    margin-top: 63upx;

    .name {
      color: #ec4242;
      text-align: center;
      font-size: 32upx;
    }
  }
}
</style>

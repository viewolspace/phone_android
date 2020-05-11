<template>
  <view class="content">
    <view class="text-center title">工具箱</view>
    <uni-list class="item">
      <uni-list-item @click="toURL('query')">
        <view class="name">手机号码归属地查询</view>
      </uni-list-item>
    </uni-list>
    <uni-list class="item">
      <uni-list-item>
        <view class="name" @click="toURL('dial')">拨号</view>
      </uni-list-item>
    </uni-list>
  </view>
</template>

<script>
import { uniList, uniListItem } from '@dcloudio/uni-ui'

export default {
  components: { uniList, uniListItem },
  data () {
    return {}
  },
  methods: {
    toURL (type) {
      uni.navigateTo({
        url: `/pages/tools/${type}`
      })
    }
  }
}
</script>

<style lang="scss">
.content {
  height: 100%;
  background: #f6f6f6;

  .title {
	padding: calc(var(--status-bar-height) + 20upx) 25upx 20upx 25upx;
    color: white;
    font-size: 38upx;
    background: linear-gradient(
      90deg,
      rgba(36, 159, 219, 1),
      rgba(49, 210, 168, 1)
    );
  }
  .item {
    margin-top: 20upx;

    .name {
      color: #241d1d;
      font-size: 32upx;
    }
  }
}
</style>

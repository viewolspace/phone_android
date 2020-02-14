<template>
  <view class="content">
    <view class="title d-flex align-items-center">
      <image
        class="back"
        @click="back()"
        src="../../static/img/icon_back.png"
      ></image>
    </view>
    <view class="timeline">
      <view class="item d-flex" v-for="(item, index) in timeline" :key="index">
        <view class="time">18:33</view>
        <view class="point">
          <image class="icon" src="../../static/img/icon_point.png" />
        </view>
        <view class="flex-grow-1 flex-shrink-1">
          <view class="event">
            上传通讯录 <text class="number">153人</text>
          </view>
          <view class="change">网络: 增加22人</view>
          <view class="from">来自于iPhone</view>
          <view class="rollback">
            <button class="action">点击还原到此备份点</button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      pageSize: 50,
      timeline: [1, 2, 3, 4, 5]
    }
  },
  computed: {
    ...mapState('user', ['user'])
  },
  onLoad () {
    console.log(1)
    this.getUserPhoneList({
      userId: this.user.userId,
      maxId: 0,
      pageSize: this.pageSize
    })
  },
  methods: {
    ...mapActions({
      getUserPhoneList: 'phone/getUserPhoneList'
    }),
    back () {
      uni.navigateBack()
    }
  }
}
</script>

<style lang="scss">
.content {
  background: white;
  min-height: 100%;
  .title {
    position: fixed;
    z-index: 9999;
    width: 100%;
    top: 0;
    padding: 25upx;
    color: white;
    font-size: 38upx;
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
  .timeline {
    padding: 100upx 28upx 28upx 28upx;
    background: white;
    .item {
      .time {
        padding-top: 25upx;
        font-size: 32upx;
        font-weight: 400;
      }

      .point {
        position: relative;
        width: 70upx;
        padding-top: 25upx;
        .icon {
          position: absolute;
          top: 38upx;
          left: 27upx;
          width: 17upx;
          height: 17upx;
          z-index: 100;
        }

        &::after {
          content: '';
          position: absolute;
          width: 2upx;
          height: 100%;
          background: #ececec;
          left: 50%;
          transform: translateX(-50%);
          top: 0;
          bottom: 0;
        }
      }
      .event {
        padding-top: 25upx;
        font-size: 32upx;
        font-weight: 400;
        color: #282828;

        .number {
          color: #2bb9c1;
        }
      }
      .change {
        margin-top: 24upx;
        font-size: 28upx;
        font-weight: 400;
        color: #838383;
      }
      .from {
        margin-top: 24upx;
        color: #c5c5c5;
        font-size: 22upx;
        font-weight: 400;
      }
      .rollback {
        margin-top: 32upx;
        margin-bottom: 25upx;

        .action {
          padding: 0 75upx;
          display: inline-block;
          font-size: 30upx;
          color: #2bb9c1;
          border: 2px solid #2bb9c1;
          border-radius: 50upx;
        }
      }
    }
  }
}
</style>

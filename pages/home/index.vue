<template>
  <view class="content d-flex flex-column">
    <view class="account">
      <view class="title">联系人管理</view>
      <view class="d-flex align-items-center">
        <view>
          <image
            class="icon-account"
            mode="aspectFit"
            src="../../static/img/home/icon_account.png"
          ></image>
        </view>
        <view class="flex-grow-1 flex-shrink-1 information">
          <view class="d-flex align-items-center">
            <view class="detail flex-grow-1 flex-shrink-1">
              账号:{{ user_account }}
            </view>
            <view>
              <view class="signout">注销</view>
            </view>
          </view>
          <view>
            <view class="backup">备份通讯录</view>
          </view>
        </view>
      </view>
      <view class="d-flex align-items-center count">
        <image
          class="icon-local-count"
          mode="widthFix"
          src="../../static/img/home/icon_local.png"
        ></image>
        <view class="flex-grow-1 flex-shrink-1">
          本地通讯录 {{ local_concat_total }} 人
        </view>
        <image
          class="icon-remote-count"
          mode="widthFix"
          src="../../static/img/home/icon_remote.png"
        ></image>
        <view class="flex-grow-1 flex-shrink-1">
          网络通讯录 {{ remote_concat_total }} 人
        </view>
      </view>
    </view>
    <view class="operation-container flex-grow-1 flex-shrink-1">
      <button class="operation upload">
        上传通讯录
      </button>
      <button class="operation download">
        下载通讯录
      </button>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      user_account: '1234567890',
      local_concat_total: 0,
      remote_concat_total: 0
    }
  },
  onLoad () {},
  methods: {}
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
      padding: 0 0 28upx 0;
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

      .signout {
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
    font-size: 28upx;

    .icon-local-count {
      width: 19upx;
      margin-right: 26upx;
    }

    .icon-remote-count {
      width: 27upx;
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

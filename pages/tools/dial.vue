<template>
  <view class="content">
    <view class="text-center title">拨号</view>
    <view>
      <input class="phone-input" type="number" v-model="phone_number" />
    </view>
    <view>
      <uni-grid
        class="dial-number-items"
        :column="3"
        :show-border="false"
        :square="false"
      >
        <uni-grid-item>
          <view class="text-center">
            <view class="number">
              <view>1</view>
              <view class="char">&nbsp;</view>
            </view>
          </view>
        </uni-grid-item>
        <uni-grid-item>
          <view class="text-center">
            <view class="number">
              <view>2</view>
              <view class="char">ABC</view>
            </view>
          </view>
        </uni-grid-item>
        <uni-grid-item>
          <view class=" text-center">
            <view class="number">
              <view>3</view>
              <view class="char">DEF</view>
            </view>
          </view>
        </uni-grid-item>
        <uni-grid-item>
          <view class="text-center">
            <view class="number">
              <view>4</view>
              <view class="char">GHI</view>
            </view>
          </view>
        </uni-grid-item>
        <uni-grid-item>
          <view class="text-center">
            <view class="number">
              <view>5</view>
              <view class="char">JKL</view>
            </view>
          </view>
        </uni-grid-item>
        <uni-grid-item>
          <view class=" text-center">
            <view class="number">
              <view>6</view>
              <view class="char">MNO</view>
            </view>
          </view>
        </uni-grid-item>
        <uni-grid-item>
          <view class="text-center">
            <view class="number">
              <view>7</view>
              <view class="char">PQRS</view>
            </view>
          </view>
        </uni-grid-item>
        <uni-grid-item>
          <view class="text-center">
            <view class="number">
              <view>8</view>
              <view class="char">TUV</view>
            </view>
          </view>
        </uni-grid-item>
        <uni-grid-item>
          <view class=" text-center">
            <view class="number">
              <view>9</view>
              <view class="char">WXYZ</view>
            </view>
          </view>
        </uni-grid-item>
        <uni-grid-item>
          <view class="text-center">
            <view class="number single">
              <view>*</view>
            </view>
          </view>
        </uni-grid-item>
        <uni-grid-item>
          <view class="text-center">
            <view class="number">
              <view>0</view>
              <view class="char">+</view>
            </view>
          </view>
        </uni-grid-item>
        <uni-grid-item>
          <view class="text-center">
            <view class="number single">
              <view>#</view>
            </view>
          </view>
        </uni-grid-item>
        <uni-grid-item> </uni-grid-item>
        <uni-grid-item>
          <view class="text-center">
            <image
              class="dial"
              src="../../static/img/tools/icon_dial.png"
            ></image>
          </view>
        </uni-grid-item>
        <uni-grid-item> </uni-grid-item>
      </uni-grid>
    </view>
  </view>
</template>

<script>
import { uniGrid, uniGridItem } from '@dcloudio/uni-ui'

export default {
  components: { uniGrid, uniGridItem },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss">
.content {
  .title {
    padding: 40upx 25upx 25upx;
    color: white;
    font-size: 38upx;
    background: linear-gradient(
      90deg,
      rgba(36, 159, 219, 1),
      rgba(49, 210, 168, 1)
    );
  }

  .phone-input {
    margin: 22upx;
    text-align: center;
    font-size: 60upx;
    color: #282828;
  }

  .dial-number-items {
    padding: 0 40upx;
  }

  .number {
    margin: 22upx 0;
    width: 146upx;
    height: 146upx;
    padding-top: 12upx;
    background: #e6e6e6;
    color: #282828;
    border-radius: 50%;
    font-size: 60upx;
    font-weight: 500;
    display: inline-block;

    &.single {
      padding-top: 34upx;
    }

    .char {
      font-size: 26upx;
      font-weight: 500;
      margin-top: -10upx;
    }
  }

  .dial {
    margin: 22upx 0;
    width: 146upx;
    height: 146upx;
  }
}
</style>

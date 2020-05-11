<template>
  <view class="content">
    <web-view v-if="url" :src="url"></web-view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      url: null
    }
  },
  methods: {},
  onLoad (option) {
    this.url = option.url
  }
}
</script>

<style lang="scss">
.content {
  height: 100%;
  padding: 0 28upx;
  background: #f6f6f6;
}
</style>

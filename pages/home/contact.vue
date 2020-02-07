<template>
  <view class="content">
    <view></view>
    <view>
      <uni-indexed-list
        :options="contacts"
        :showSelect="true"
        @click="bindClick"
      ></uni-indexed-list>
    </view>
  </view>
</template>

<script>
import { uniIndexedList } from '@dcloudio/uni-ui'

export default {
  components: { uniIndexedList },
  data () {
    return {
      contacts: [
        {
          letter: 'A',
          data: [
            '阿克苏机场',
            '阿拉山口机场',
            '阿勒泰机场',
            '阿里昆莎机场',
            '安庆天柱山机场',
            '澳门国际机场'
          ]
        },
        {
          letter: 'B',
          data: [
            '保山机场',
            '包头机场',
            '北海福成机场',
            '北京南苑机场',
            '北京首都国际机场'
          ]
        }
      ]
    }
  },
  methods: {}
}
</script>

<style lang="scss">
.content {
}
</style>

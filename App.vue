<script>
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState(['user'])
  },
  onLaunch () {
    console.log('onLaunch')
  },

  onShow () {
    console.log('App Show')
  },

  onHide () {
    console.log('App Hide')
  }
}
</script>

<style>
/*每个页面公共css */
@import url('grid.css');
page {
  height: 100%;
  background: #f6f6f6;
}
</style>

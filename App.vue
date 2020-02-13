<script>
import { mapActions } from 'vuex'

export default {
  onLaunch () {
    this.getLocalUser()
  },
  methods: {
    ...mapActions({
      getLocalUser: 'user/getLocalUser'
    })
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

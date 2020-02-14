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
/* 提示窗口 */
.uni-tip {
  /* #ifndef APP-NVUE */
  display: flex;
  flex-direction: column;
  /* #endif */
  padding: 15px;
  width: 300px;
  background-color: #fff;
  border-radius: 10px;
}

.uni-tip-title {
  margin-bottom: 10px;
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  color: #333;
}

.uni-tip-content {
  /* padding: 15px;
 */
  font-size: 14px;
  color: #666;
}

.uni-tip-group-button {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  margin-top: 20px;
}

.uni-tip-button {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #3b4144;
}

.confirm {
  color: #2bb9c1;
}
</style>

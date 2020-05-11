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
        <view class="time">{{ item.cTime | time }}</view>
        <view class="point">
          <image class="icon" src="../../static/img/icon_point.png" />
        </view>
        <view class="flex-grow-1 flex-shrink-1">
          <view class="event">
            上传通讯录 <text class="number">{{ item.contacts.length }}人</text>
          </view>
          <view class="change">网络: 增加{{ item.increase }}人</view>
          <view class="from">来自于Android</view>
          <view class="rollback">
            <button class="action" @click="rollback(item.contacts)">
              点击还原到此备份点
            </button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  filters: {
    time (val) {
      const time = new Date(val)
      let month = time.getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      let date = time.getDate()
      if (date < 10) {
        date = '0' + date
      }
      return time.getFullYear() + '/' + month + '/' + date
    }
  },
  data () {
    return {
      pageSize: 50
    }
  },
  computed: {
    ...mapState('user', ['user']),
    ...mapState('phone', ['timeline'])
  },
  onLoad () {
    this.getUserPhoneList({
      userId: this.user.userId,
      maxId: 0,
      pageSize: this.pageSize
    })
  },
  methods: {
    ...mapActions({
      getUserPhoneList: 'phone/getUserPhoneList',
      getLocalContacts: 'phone/getLocalContacts'
    }),
    back () {
      uni.navigateBack()
    },
    rollback (contacts) {
      uni.showLoading({
        title: '还原中...'
      })
      plus.contacts.getAddressBook(
        plus.contacts.ADDRESSBOOK_PHONE,
        async addressbook => {
          try {
            console.log('开始删除联系人')
            await this.removeLocalContacts(addressbook)
            console.log('开始还原联系人')
            await this.addContactsToLocal(addressbook, contacts)
            this.getLocalContacts()
            uni.showToast({
              title: '还原成功',
              duration: 2000
            });
          } catch (e) {
            console.log(e)
          } finally {
            uni.hideLoading()
          }
        },
        e => {
          uni.hideLoading()
          console.log(e)
        }
      )
    },
    removeLocalContacts (addressbook) {
      return new Promise((reslove, reject) => {
        addressbook.find(
          ['name', 'phoneNumbers'],
          async contacts => {
            try {
              for (let i = 0; i < contacts.length; i++) {
                await this.removeLocalContact(contacts[i])
              }
              console.log('删除成功')
              reslove()
            } catch (e) {
              reject(e)
            }
          },
          e => {
            reject(e)
          },
          { multiple: true }
        )
      })
    },
    removeLocalContact (contact) {
      return new Promise((resolve, reject) => {
        contact.remove(resolve, reject)
      })
    },
    async addContactsToLocal (addressbook, contacts) {
      console.log(contacts)
      for (let i = 0; i < contacts.length; i++) {
        try {
          await this.addContactToLocal(addressbook, contacts[i])
        } catch (e) {}
      }
    },
    addContactToLocal (addressbook, data) {
      return new Promise((resolve, reject) => {
        let contact = addressbook.create()
        for (let key of [
          'name',
          'phoneNumbers',
          'emails',
          'addresses',
          'ims',
          'organizations',
          'birthday',
          'photos',
          'categories',
          'urls'
        ]) {
          if (data[key]) {
            contact[key] = data[key]
          }
        }
        contact.save(() => {
          resolve(contact), e => reject(e)
        })
      })
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
	
     padding: calc(var(--status-bar-height) + 25upx) 25upx 25upx 25upx;
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

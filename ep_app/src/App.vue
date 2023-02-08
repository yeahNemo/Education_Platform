<template>
  <div id="app">
    <!-- <keep-alive exclude="instHome">
      <router-view />
    </keep-alive> -->
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
import Toast from 'muse-ui-toast'
import { mapState } from 'vuex';
export default {
  name: 'App',
  components: {},
  mounted() {
    // 设置msgRecieveTimer
    this.msgRecieveTimer = setInterval(async () => {
      const userInfoId = this.userInfo.id
      if (userInfoId === undefined) {
        return
      }
      const res = await this.$http.get(`/inst/message-box/${this.userInfo.id}`)
      let messageList = res.data.data
      // 与现有的进行比较
      if (messageList.length > this.userMessageBox.length) {
        Toast.info('您有一条新消息，请前往收件箱查看')
        this.$store.commit('setUserMessageBox', res.data.data)
      }
    }, 5000);
  },
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      msgRecieveTimer: null,
      isRouterAlive: true,
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      })
    }
  },
  computed: {
    ...mapState(['userInfo', 'userMessageBox'])
  }
}
</script>

<style scoped>
#app {
  height: 100%;
}
</style>

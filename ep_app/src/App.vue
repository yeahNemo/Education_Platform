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
    // 设置移动端适配
    // 最近vue做个项目，发现按手机的返回键应用直接退出了，而不是返回上一页，为此特
    // 意解决了这一问题，具体代码如下：
    document.addEventListener('plusready', function () {
      const webview = plus.webview.currentWebview()
      plus.key.addEventListener('backbutton', function () {
        webview.canBack(function (e) {
          if (e.canBack) {
            webview.back()
          } else {
            // webview.close(); //hide,quit
            // plus.runtime.quit();
            // 首页返回键处理
            // 处理逻辑：1秒内，连续两次按返回键，则退出应用；
            let first = null
            plus.key.addEventListener(
              'backbutton',
              function () {
                // 首次按键，提示‘再按一次退出应用’
                if (!first) {
                  first = new Date().getTime()
                  Toast.info('再滑一次退出')
                  setTimeout(function () {
                    first = null
                  }, 1000)
                } else {
                  if (new Date().getTime() - first < 1500) {
                    plus.runtime.quit()
                  }
                }
              },
              false
            )
          }
        })
      })
    })

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

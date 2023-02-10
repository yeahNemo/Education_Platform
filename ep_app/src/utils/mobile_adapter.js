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
              Toast({ message: '再按一次退出应用' })
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

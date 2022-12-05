import Vue from "vue";
import App from "./App.vue";
import "./style.scss";
import router from "./router";
import store from "./store";
import MuseUI from "muse-ui";
import "muse-ui/dist/muse-ui.css";
// 引入Roboto字体
import "typeface-roboto";
// 使用Toast插件
import Toast from "muse-ui-toast";
// Toast.config({ position: "top" });
// 引入工具（动画等）
import Helpers from "muse-ui/lib/Helpers";
// 引入loading
import "muse-ui-loading/dist/muse-ui-loading.css"; // load css
import Loading from "muse-ui-loading";
// 引入 axios 并进行挂载
import http from "@/utils/http";

Vue.prototype.$http = http;

Vue.use(Loading);

Vue.use(Helpers);

Vue.use(Toast);

Vue.use(MuseUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
